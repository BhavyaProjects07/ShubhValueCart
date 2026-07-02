import prisma from "@/lib/prisma"

export async function GET(req, { params }) {
  // ✅ FIX: params is async
  const { orderId } = await params

  if (!orderId) {
    return Response.json(
      { message: "Order ID missing" },
      { status: 400 }
    )
  }

  const order = await prisma.order.findUnique({
  where: { id: orderId },
  include: {
    user: true,

    address: true,

    orderItems: {
      include: {
        product: {
          select: {
            id: true,
            itemCode: true,
            name: true,
            images: true,
            price: true,
            mrp: true,
            category: true,
          },
        },
      },
    },

    returnRequest: true,

    store: {
      select: {
        id: true,
        name: true,
      },
    },
  },
});

  if (!order) {
    return Response.json(
      { message: "Order not found" },
      { status: 404 }
    )
  }

  return Response.json({ order })
}
