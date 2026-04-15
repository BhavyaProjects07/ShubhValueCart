import crypto from "crypto";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData // 🔥 ADD THIS
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // ✅ 🔥 CREATE ORDER HERE AFTER VERIFICATION

    const { userId, addressId, items, paymentMethod } = orderData;

    let total = 0;

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
      });

      if (!product) continue;

      total += product.price * item.quantity;
    }

    total += 5;

    const order = await prisma.order.create({
      data: {
        userId,
        addressId,
        total,
        paymentMethod,
        isPaid: true, // 🔥 IMPORTANT
        razorpayPaymentId: razorpay_payment_id, // optional but recommended
        orderItems: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            size: item.size,
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}