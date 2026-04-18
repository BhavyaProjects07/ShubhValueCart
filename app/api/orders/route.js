import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import  prisma from "@/lib/prisma";
import { PaymentMethod } from "@prisma/client";
import { sendBrevoEmail } from "@/lib/brevo";
import Razorpay from "razorpay";
import { createOrder } from "@/lib/services/createOrder";

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


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
/* ---------------- POST : CREATE ORDER ---------------- */

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { addressId, items, couponCode, paymentMethod } =
      await request.json();

    if (
      !addressId ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }

    let coupon = null;

    if (couponCode) {
      coupon = await prisma.coupon.findFirst({
        where: { code: couponCode },
      });

      if (!coupon) {
        return NextResponse.json(
          { message: "Invalid or expired coupon" },
          { status: 404 }
        );
      }
    }

    if (coupon?.forNewUsers) {
      const userOrders = await prisma.order.findMany({
        where: { userId },
      });

      if (userOrders.length > 0) {
        return NextResponse.json(
          { message: "Coupon valid only for new users" },
          { status: 400 }
        );
      }
    }

    for (const item of items) {
      if (item.hasSize && !item.size) {
        return NextResponse.json(
          { message: `Please select a size for ${item.name}` },
          { status: 400 }
        );
      }
    }

  if (paymentMethod === "RAZORPAY" && !request.headers.get("x-verify")) {

  let total = 0;

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.id },
    });

    // 🔥 FIX: check product existence
    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${item.id}` },
        { status: 404 }
      );
    }

    total += product.price * item.quantity;
  }

  total += 5;

  const razorpayOrder = await razorpay.orders.create({
    amount: total * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  });

  return NextResponse.json({
    razorpayOrderId: razorpayOrder.id,
    amount: total,
  });
}

    /* -------- GROUP ITEMS BY STORE -------- */

    const result = await createOrder({
  userId,
  addressId,
  items,
  coupon,
  paymentMethod,
  isPaid: false, // COD flow
});

const { orderIds, fullAmount, subtotal, discountAmount, shippingFee } = result;

    /* -------- CREATE ORDERS -------- */

    
    /* -------- CLEAR CART -------- */

    

    /* -------- FETCH DATA FOR EMAIL -------- */

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

    /* -------- CUSTOMER EMAIL (EXACT FORMAT) -------- */


    if (user?.email && user.email.includes("@")) {
      await sendBrevoEmail({
        to: user.email,
        subject: "Your ShubhValueCart order has been placed successfully",
        htmlContent: `
          <p>Hello ${user.name || "Customer"},</p>
  
          <p>Thank you for shopping with <strong>ShubhValueCart</strong>.</p>
  
          <p>
            We're happy to confirm that your order has been placed successfully.
            Below are your order details for reference.
          </p>
  
          <hr/>
  
          <h3>🧾 Order Summary</h3>
          <p>
            <strong>Order ID(s):</strong> ${orderIdString}<br/>
            <strong>Order Date:</strong> ${orderDate}<br/>
            <strong>Payment Method:</strong> ${paymentMethod}
          </p>
  
          <hr/>
  
          <h3>📦 Items Ordered</h3>
          <p>${orderItemsBlock}</p>
  
          <hr/>
  
          <h3>💰 Price Details</h3>
          <p>
            <strong>Subtotal:</strong> ₹${subtotal.toFixed(2)}<br/>
            <strong>Discount:</strong> ₹${discountAmount.toFixed(2)}<br/>
            <strong>Shipping Fee:</strong> ₹${shippingFee.toFixed(2)}<br/>
            <strong>Total Amount Paid:</strong>
            <strong>₹${fullAmount.toFixed(2)}</strong>
          </p>
  
          <hr/>
  
          <h3>🚚 Delivery Address</h3>
          <p>${deliveryAddress}</p>
  
          <hr/>
  
          <h3>⏱ What happens next?</h3>
          <ul>
            <li>Your order is being processed by the seller</li>
            <li>You will receive another email once it is shipped</li>
            <li>Delivery usually takes <strong>3–7 business days</strong></li>
          </ul>
  
          <p>
            If you have any questions, feel free to contact us at
            <a href="mailto:shubhvaluecart@gmail.com">
              shubhvaluecart@gmail.com
            </a>.
          </p>
  
          <p>
            Thank you for choosing <strong>ShubhValueCart</strong>.<br/>
            We appreciate your trust in our brand.
          </p>
  
          <p>
            Warm regards,<br/>
            <strong>Team ShubhValueCart</strong><br/>
            <a href="https://www.shubhavaluecart.in">
              https://www.shubhavaluecart.in
            </a>
          </p>
        `,
      });
      
    }

    else {
      console.error("Invalid user email:", user?.email);
    }

    /* -------- ADMIN EMAIL (ALREADY FORMATTED) -------- */


    
      await sendBrevoEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Order Received | ${orderIdString}`,
        htmlContent: `
          <p>Hello Admin,</p>
  
          <p>
            A new order has been placed on <strong>ShubhValueCart</strong>.
            Please find the details below.
          </p>
  
          <hr/>
  
          <h3>📌 Order Information</h3>
          <p>
            <strong>Order ID(s):</strong> ${orderIdString}<br/>
            <strong>Order Date:</strong> ${orderDate}<br/>
            <strong>Payment Method:</strong> ${paymentMethod}<br/>
            <strong>Total Amount:</strong> ₹${fullAmount.toFixed(2)}
          </p>
  
          <hr/>
  
          <h3>👤 Customer Details</h3>
          <p>
            <strong>Name:</strong> ${user.name || "N/A"}<br/>
            <strong>Email:</strong> ${user.email}
          </p>
  
          <hr/>
  
          <h3>📦 Items Ordered</h3>
          <p>${orderItemsBlock}</p>
  
          <hr/>
  
          <h3>🚚 Shipping Address</h3>
          <p>${deliveryAddress}</p>
  
          <hr/>
  
          <h3>⚠ Action Required</h3>
          <ul>
            <li>Review the order in the admin panel</li>
            <li>Assign shipment</li>
            <li>Update order status when dispatched</li>
          </ul>
  
          <p>
            Admin Dashboard:<br/>
            <a href="https://www.shubhavaluecart.in/admin">
              https://www.shubhavaluecart.in/admin
            </a>
          </p>
  
          <p>
            —<br/>
            <strong>System Notification</strong><br/>
            ShubhValueCart Order Management
          </p>
        `,
      });
      
    
    

    return NextResponse.json(
      { message: "Order placed successfully", orderIds, fullAmount },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

/* ---------------- GET : USER ORDERS ---------------- */

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const orders = await prisma.order.findMany({
      where: {
        userId,
        OR: [
          { paymentMethod: PaymentMethod.COD },
          {
          AND: [
            { paymentMethod: PaymentMethod.RAZORPAY },
            { isPaid: true },
          ],
        },
        ],
      },
      include: {
        orderItems: {
          include: { product: true },
        },
        address: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
