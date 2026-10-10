import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession, destroySession } from "@/lib/auth";

export async function DELETE(req) {
  try {
    const session = await getSession();

    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.userId;

    // Prisma Transaction to safely delete user and all related required data
    await prisma.$transaction(async (tx) => {
      // 1. Delete Address
      await tx.address.deleteMany({ where: { userId } });

      // 2. Delete Ratings
      await tx.rating.deleteMany({ where: { userId } });

      // 3. Delete Return Requests
      await tx.returnRequest.deleteMany({ where: { userId } });

      // 4. Delete UserCoupons
      await tx.userCoupon.deleteMany({ where: { userId } });

      // 5. Handle Orders (Since userId is required on Order, we must delete them)
      // First delete OrderItems for those orders
      const userOrders = await tx.order.findMany({ where: { userId }, select: { id: true } });
      const orderIds = userOrders.map(o => o.id);
      
      if (orderIds.length > 0) {
        await tx.orderItem.deleteMany({ where: { orderId: { in: orderIds } } });
        await tx.order.deleteMany({ where: { id: { in: orderIds } } });
      }

      // 6. Handle Store (If user is a seller, delete their store and products)
      const store = await tx.store.findUnique({ where: { userId } });
      if (store) {
        await tx.product.deleteMany({ where: { storeId: store.id } });
        await tx.store.delete({ where: { id: store.id } });
      }

      // 7. Finally, delete the User
      await tx.user.delete({ where: { id: userId } });
    });

    // Destroy the auth session cookie
    await destroySession();

    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("DELETE ACCOUNT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
