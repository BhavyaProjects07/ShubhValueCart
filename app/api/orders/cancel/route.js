import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { sendBrevoEmail } from "@/lib/brevo";
export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // 🔐 Ownership check
    if (order.userId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // 🚚 Status check (GLOBAL)
    if (order.status !== "ORDER_PLACED") {
      return NextResponse.json(
        { message: "Order cannot be cancelled after shipping" },
        { status: 400 }
      );
    }

    /**
     * 💰 PAYMENT LOGIC
     * COD  → always cancellable (before shipped)
     * RAZORPAY → cancellable ONLY if payment NOT captured
     */
    if (order.paymentMethod === "RAZORPAY") {
      if (order.paymentStatus === "PAID") {
        return NextResponse.json(
          { message: "Paid orders cannot be cancelled. Contact support." },
          { status: 400 }
        );
      }
    }

    // ✅ Safe cancellation
    const cancelledOrder = await prisma.order.update({
  where: { id: orderId },
  data: {
    status: "CANCELLED",
  },
  include: {
    user: true,
    address: true,
    orderItems: { include: { product: true } },
    store: true,
  },
    });
    

    await sendBrevoEmail({
      to: cancelledOrder.user.email,
      subject: "Your ShubhValueCart order has been cancelled",
      htmlContent: `
        <p>Hello ${cancelledOrder.user.name || "Customer"},</p>
    
        <p>Your order on <strong>ShubhValueCart</strong> has been successfully cancelled.</p>
    
        <hr/>
    
        <p><strong>Order ID:</strong> ${cancelledOrder.id}</p>
        <p><strong>Payment Method:</strong> ${cancelledOrder.paymentMethod}</p>
        <p><strong>Status:</strong> CANCELLED</p>
    
        <hr/>
    
        <p>If this cancellation was not made by you, please contact us immediately.</p>
    
        <p>
          Regards,<br/>
          <strong>Team ShubhValueCart</strong><br/>
          <a href="https://www.shubhavaluecart.in">www.shubhavaluecart.in</a>
        </p>
      `,
          });
    
          await sendBrevoEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "Order Cancelled – Action Required",
      htmlContent: `
        <p>Hello Admin,</p>
    
        <p>An order has been cancelled by the customer.</p>
    
        <hr/>
    
        <p><strong>Order ID:</strong> ${cancelledOrder.id}</p>
        <p><strong>Customer:</strong> ${cancelledOrder.user.name} (${cancelledOrder.user.email})</p>
        <p><strong>Total:</strong> ₹${cancelledOrder.total}</p>
        <p><strong>Status:</strong> CANCELLED</p>
    
        <hr/>
    
        <p>Please ensure stock and internal records are updated.</p>
    
        <p>
          <a href="https://www.shubhavaluecart.in/admin">
            Open Admin Dashboard
          </a>
        </p>
      `,
          });


    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to cancel order" },
      { status: 500 }
    );
  }
}
