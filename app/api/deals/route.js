import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        inStock: { not: false },
        store: { isActive: true },
        mrp: { gt: 0 },
      },
      include: {
        rating: true,
        store: true,
      },
    });

   const withDiscount = products.map(p => {
  const discount = Math.round(
    ((p.mrp - p.price) / p.mrp) * 100
  );

  return {
    id: p.id,
    name: p.name,
    price: p.price,
    mrp: p.mrp,
    images: p.images,
    category: p.category,
    storeId: p.storeId,
    createdAt: p.createdAt,

    // 🔥 CRITICAL FIX
    rating: p.rating || [],

    discount,
  };
});

    // ✅ STRICT FILTER (CRITICAL FIX)
    const deals = withDiscount
      .filter(p => 
        p.discount > 5 &&
        p.id &&                    // 🔥 MUST HAVE
        p.images?.length > 0 &&    // 🔥 MUST HAVE IMAGE
        p.price > 0                // 🔥 VALID PRICE
      )
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 24);

    

    return NextResponse.json({ deals });

  } catch (error) {
    console.error("DEALS API ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}