import prisma from "@/lib/prisma";
import { PaymentMethod } from "@prisma/client";

// ---------------- RATE LIMIT (PER USER) ----------------
const rateLimitMap = new Map();

function checkRateLimit(userId) {
  const now = Date.now();
  const windowMs = 10 * 1000; // 10 sec
  const maxRequests = 3;

  if (!rateLimitMap.has(userId)) {
    rateLimitMap.set(userId, []);
  }

  const timestamps = rateLimitMap
    .get(userId)
    .filter((t) => now - t < windowMs);

  if (timestamps.length >= maxRequests) {
    throw new Error("Too many order attempts. Please wait a few seconds.");
  }

  timestamps.push(now);
  rateLimitMap.set(userId, timestamps);
}

// ---------------- IDEMPOTENCY ----------------
async function checkDuplicate(razorpayPaymentId) {
  if (!razorpayPaymentId) return;

  const existing = await prisma.order.findFirst({
    where: { razorpayPaymentId },
  });

  if (existing) {
    throw new Error("Order already created for this payment");
  }
}

// ---------------- MAIN SERVICE ----------------
export async function createOrder({
  userId,
  addressId,
  items,
  coupon,
  paymentMethod,
  isPaid = false,
  razorpayPaymentId = null,
}) {
  // ---------------- VALIDATION ----------------
  if (!userId) throw new Error("Unauthorized");
  if (!addressId) throw new Error("Address required");
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error("Invalid items");
  }

  // 🔥 VALIDATE PAYMENT METHOD ENUM
  if (!Object.values(PaymentMethod).includes(paymentMethod)) {
  throw new Error("Invalid payment method");
}

  // ---------------- RATE LIMIT ----------------
  checkRateLimit(userId);

  // ---------------- IDEMPOTENCY ----------------
  await checkDuplicate(razorpayPaymentId);

  const ordersByStore = new Map();

  // ---------------- GROUP ITEMS ----------------
  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.id },
    });

    if (!product) {
      throw new Error(`Product not found: ${item.id}`);
    }

    if (!ordersByStore.has(product.storeId)) {
      ordersByStore.set(product.storeId, []);
    }

    ordersByStore
      .get(product.storeId)
      .push({
        ...item,
        price: product.price,
      });
  }

  let orderIds = [];
  let fullAmount = 0;
  let subtotal = 0;
  let discountAmount = 0;
  let shippingFee = 5;
  let isShippingFeeAdded = false;

  // ---------------- CREATE ORDERS ----------------
  for (const [storeId, sellerItems] of ordersByStore.entries()) {
    let total = sellerItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    subtotal += total;

    // ---------------- APPLY COUPON ----------------
    if (coupon) {
      const discount = (total * coupon.discount) / 100;
      discountAmount += discount;
      total -= discount;
    }

    // ---------------- SHIPPING ----------------
    if (!isShippingFeeAdded) {
      total += shippingFee;
      isShippingFeeAdded = true;
    }

    total = Number(total.toFixed(2));
    fullAmount += total;

    // ---------------- CREATE ORDER ----------------
    const order = await prisma.order.create({
      data: {
        userId,
        storeId,
        addressId,
        total,

        // 🔥 FIXED ENUM ISSUE
        paymentMethod: PaymentMethod[paymentMethod],

        isPaid,
        razorpayPaymentId,

        isCouponUsed: !!coupon,

        coupon: coupon
          ? {
              id: coupon.id,
              code: coupon.code,
              discount: coupon.discount,
              forNewUsers: coupon.forNewUsers,
            }
          : null,

        orderItems: {
          create: sellerItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            hasSize: item.hasSize,
            size: item.size,
          })),
        },
      },
    });

    orderIds.push(order.id);
  }

  // ---------------- CLEAR CART ----------------
  await prisma.user.update({
    where: { id: userId },
    data: { cart: {} },
  });

  return {
    orderIds,
    fullAmount,
    subtotal,
    discountAmount,
    shippingFee,
  };
}