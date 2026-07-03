import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";

export async function GET(req) {
  try {
    // =========================
    // AUTH
    // =========================
    const { userId } = getAuth(req);

    const isAdmin = await authAdmin(userId);

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // =========================
    // FETCH USERS
    // =========================
    const users = await prisma.user.findMany({
      include: {
        Address: true,
        buyerOrders: {
  orderBy: {
    createdAt: "desc",
  },
},
        store: true,
        ratings: true,
        usedCoupons: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    // =========================
    // FORMAT USERS
    // =========================
    const formattedUsers = users.map((user) => {
      const completedOrders = user.buyerOrders.filter(
  (order) => order.status !== "CANCELLED"
);

      const totalSpent = completedOrders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      );

      const lastOrder =
        completedOrders.length > 0
          ? completedOrders[0].createdAt
          : null;

      return {
        id: user.id,

        name: user.name,

        email: user.email,

        phone: user.phone || "-",

        image: user.image,

        addresses: user.Address.length,

        orders: user.buyerOrders.length,

        completedOrders: completedOrders.length,

        totalSpent,

        lastOrder,

        ratings: user.ratings.length,

        couponsUsed: user.usedCoupons.length,

        isSeller: !!user.store,

        sellerStatus: user.store?.status || null,

        storeName: user.store?.name || null,

        storeId: user.store?.id || null,

        defaultAddress:
          user.Address.find((a) => a.isDefault) ||
          user.Address[0] ||
          null,

        addressList: user.Address,

        recentOrders: user.buyerOrders.slice(0, 5),
      };
    });

    // =========================
    // STATS
    // =========================
    const totalUsers = formattedUsers.length;

    const sellers = formattedUsers.filter(
      (u) => u.isSeller
    ).length;

    const buyers = totalUsers - sellers;

    const verifiedStores = formattedUsers.filter(
      (u) => u.sellerStatus === "approved"
    ).length;

    const totalRevenue = formattedUsers.reduce(
      (sum, user) => sum + user.totalSpent,
      0
    );

    return NextResponse.json({
      success: true,

      stats: {
        totalUsers,
        buyers,
        sellers,
        verifiedStores,
        totalRevenue,
      },

      users: formattedUsers,
    });
  } catch (error) {
    console.error("ADMIN USERS API:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}