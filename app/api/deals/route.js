import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        inStock: {
          not: false,
        },
        store: {
          isActive: true,
        },
        mrp: {
          gt: 0,
        },
        category: {
          equals: "Personal Care",
          mode: "insensitive",
        },
      },
      include: {
        rating: true,
        store: true,
      },
    });

    const withDiscount = products.map((p) => {
      const discount =
        p.mrp > 0
          ? Math.round(((p.mrp - p.price) / p.mrp) * 100)
          : 0;

      return {
        id: p.id,
        name: p.name,
        price: p.price,
        mrp: p.mrp,
        stock: p.stock,
        images: p.images,
        category: p.category,
        storeId: p.storeId,
        createdAt: p.createdAt,
        rating: p.rating || [],
        discount,
      };
    });

    const deals = withDiscount
      .filter(
        (p) =>
          p.discount > 5 &&
          p.id &&
          Array.isArray(p.images) &&
          p.images.length > 0 &&
          p.price > 0
      )
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 24);

    return NextResponse.json({ deals });
  } catch (error) {
    console.error("DEALS API ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}