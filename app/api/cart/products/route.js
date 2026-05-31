import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { products: [] },
        { status: 200 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
        inStock: {
          not: false,
        },
      },
      include: {
        rating: true,
        store: true,
      },
    });

    return NextResponse.json(
      { products },
      { status: 200 }
    );
  } catch (error) {
    console.error("CART PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}