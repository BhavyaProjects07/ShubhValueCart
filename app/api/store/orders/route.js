import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendBrevoEmail } from "@/lib/brevo";

/* ---------------- HELPERS ---------------- */

function buildOrderItemsBlock(orderItems) {
  return orderItems
    .map(
      (item) =>
        `• ${item.product.name}${
          item.size ? ` (Size: ${item.size})` : ""
        } × ${item.quantity} — ₹${(item.price * item.quantity).toFixed(2)}`
    )
    .join("<br/>");
}

/* ---------------- UPDATE ORDER STATUS ---------------- */

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId, status } = await request.json();

    /* ---- UPDATE ORDER STATUS ---- */

    const order = await prisma.order.update({
      where: { id: orderId, storeId },
      data: { status },
      include: {
        user: true,
        address: true,
        orderItems: { include: { product: true } },
      },
    });

    /* ---- BUILD EMAIL DATA ---- */

    const orderItemsBlock = buildOrderItemsBlock(order.orderItems);

    const deliveryAddress = `
      ${order.address.name}<br/>
      ${order.address.street}, ${order.address.city}<br/>
      ${order.address.state}, India - ${order.address.pincode}<br/>
      Phone: ${order.address.phone}
    `;

    const statusLabel = status.replace("_", " ").toUpperCase();

    /* ---- CUSTOMER STATUS UPDATE EMAIL ---- */

    try {
      await sendBrevoEmail({
        to: order.user.email,
        subject: `Your ShubhValueCart order is now ${statusLabel}`,
        htmlContent: `
          <p>Hello ${order.user.name || "Customer"},</p>

          <p>
            We wanted to inform you that the status of your
            <strong>FrostWayne</strong> order has been updated.
          </p>

          <hr/>

          <h3>📦 Order Status Update</h3>
          <p>
            <strong>Order ID:</strong> ${order.id}<br/>
            <strong>Current Status:</strong>
            <span style="color:#2e7d32; font-weight:bold;">
              ${statusLabel}
            </span>
          </p>

          <hr/>

          <h3>🧾 Order Details</h3>
          <p>${orderItemsBlock}</p>

          <hr/>

          <h3>🚚 Delivery Address</h3>
          <p>${deliveryAddress}</p>

          <hr/>

          <p>
            If you have any questions, feel free to contact us at
            <a href="mailto:shubhvaluecart@gmail.com">
              shubhvaluecart@gmail.com
            </a>.
          </p>

          <p>
            Thank you for shopping with <strong>ShubhValueCart</strong>.
          </p>

          <p>
            Warm regards,<br/>
            <strong>Team ShubhValueCart</strong><br/>
            <a href="https://www.shubhvaluecart.com">
              https://www.shubhvaluecart.com
            </a>
          </p>
        `,
      });

      


    } catch (emailError) {
      console.error("Order status email failed:", emailError.message);
      // intentionally NOT throwing — order update must succeed
    }

    return NextResponse.json(
      { message: "Order status updated and customer notified" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || error.code },
      { status: 500 }
    );
  }
}

/* ---------------- GET : SELLER ORDERS ---------------- */

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    // ---------------- PAGINATION ----------------
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    // ---------------- FILTERS ----------------
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");
    const paymentMethod = searchParams.get("paymentMethod");
    const isPaid = searchParams.get("isPaid");
    const coupon = searchParams.get("coupon");

    const minTotal = Number(searchParams.get("minTotal")) || 0;
    const maxTotal = Number(searchParams.get("maxTotal")) || 1000000;

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const sort = searchParams.get("sort") || "latest";

    // ---------------- WHERE ----------------
    let where = {
      storeId,
      total: {
        gte: minTotal,
        lte: maxTotal,
      },
    };

    // 🔍 SEARCH (customer name / email / order id)
    if (search) {
      where.OR = [
        {
          id: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          user: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          user: {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    // 📦 STATUS
    if (status) {
      where.status = status;
    }

    // 💳 PAYMENT METHOD
    if (paymentMethod) {
      where.paymentMethod = paymentMethod;
    }

    // 💰 PAID FILTER
    if (isPaid === "true") {
      where.isPaid = true;
    } else if (isPaid === "false") {
      where.isPaid = false;
    }

    // 🎟 COUPON
    if (coupon === "true") {
      where.couponId = { not: null };
    }

    // 📅 DATE RANGE
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    // ---------------- SORT ----------------
    let orderBy = { createdAt: "desc" };

    if (sort === "oldest") orderBy = { createdAt: "asc" };
    if (sort === "total_high_low") orderBy = { total: "desc" };
    if (sort === "total_low_high") orderBy = { total: "asc" };

    // ---------------- QUERY ----------------
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
  user: true,
  address: true,
  orderItems: { include: { product: true } },
},
        orderBy,
        skip,
        take: limit,
      }),

      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
