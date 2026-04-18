import crypto from "crypto";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { createOrder } from "@/lib/services/createOrder";
import prisma from "@/lib/prisma";
import { sendBrevoEmail } from "@/lib/brevo";

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
export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = await req.json();

    // ---------------- VERIFY SIGNATURE ----------------
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // ---------------- AUTH ----------------
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ---------------- VALIDATION ----------------
    const { addressId, items, couponCode } = orderData;

    if (!addressId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }

    // ---------------- FETCH COUPON (SAME AS ORDERS API) ----------------
    let coupon = null;

    if (couponCode) {
      coupon = await prisma.coupon.findFirst({
        where: { code: couponCode },
      });
    }

    console.log("VERIFY DATA:", {
  paymentMethod: "RAZORPAY",
});
    // ---------------- CREATE ORDER (MAIN FIX) ----------------
    const result = await createOrder({
      userId,
      addressId,
      items,
      coupon,
      paymentMethod: "RAZORPAY",
      isPaid: true,
      razorpayPaymentId: razorpay_payment_id,
    });

    const { orderIds, fullAmount, subtotal, discountAmount, shippingFee } = result;

    // ---------------- FETCH DATA FOR EMAIL ----------------
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const address = await prisma.address.findUnique({
      where: { id: addressId },
    });

    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: { in: orderIds } },
      include: { product: true },
    });

    const orderItemsBlock = buildOrderItemsBlock(orderItems);
    const orderIdString = orderIds.join(", ");
    const orderDate = new Date().toLocaleString();

    const deliveryAddress = `
      ${address.name}<br/>
      ${address.street}, ${address.city}<br/>
      ${address.state}, India - ${address.pincode}<br/>
      Phone: ${address.phone}
    `;

    // ---------------- CUSTOMER EMAIL ----------------
    if (user?.email && user.email.includes("@")) {
      await sendBrevoEmail({
        to: user.email,
        subject: "Your ShubhValueCart order has been placed successfully",
        htmlContent: `
          <p>Hello ${user.name || "Customer"},</p>
          <p>Your order has been successfully placed.</p>

          <h3>Order ID(s):</h3>
          <p>${orderIdString}</p>

          <h3>Items:</h3>
          <p>${orderItemsBlock}</p>

          <h3>Total:</h3>
          <p>₹${fullAmount.toFixed(2)}</p>

          <h3>Address:</h3>
          <p>${deliveryAddress}</p>
        `,
      });
    }

    // ---------------- ADMIN EMAIL ----------------
    await sendBrevoEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Razorpay Order | ${orderIdString}`,
      htmlContent: `
        <h3>New Paid Order</h3>
        <p><strong>Order ID:</strong> ${orderIdString}</p>
        <p><strong>Amount:</strong> ₹${fullAmount.toFixed(2)}</p>
        <p><strong>Payment:</strong> RAZORPAY</p>

        <h3>Customer</h3>
        <p>${user.name} (${user.email})</p>

        <h3>Items</h3>
        <p>${orderItemsBlock}</p>
      `,
    });


    // ---------------- SUCCESS ----------------
    return NextResponse.json({
      success: true,
      message: "Payment verified & order created",
      ...result,
    });

  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}