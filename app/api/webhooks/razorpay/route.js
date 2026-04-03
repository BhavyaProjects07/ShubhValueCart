import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    // 🔥 PAYMENT SUCCESS
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const order = await prisma.order.findFirst({
        where: {
          razorpayOrderId: payment.order_id,
        },
      });

      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            isPaid: true,
            razorpayPaymentId: payment.id,
          },
        });
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}