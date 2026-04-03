import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        inStock: { not: false },
        store: {
          isActive: true,
        },
        mrp: { gt: 0 },
      },
      include: {
        rating: true,
        store: true,
      },
    });

    // ✅ compute discount
    const withDiscount = products.map(p => {
      const discount = ((p.mrp - p.price) / p.mrp) * 100;

      return {
        ...p,
        discount,
      };
    });

    // ✅ filter + sort + take 24
    const deals = withDiscount
      .filter(p => p.discount > 0)
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