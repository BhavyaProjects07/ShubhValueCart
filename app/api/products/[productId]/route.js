import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req, context) {
  try {
    const { productId } = await context.params; // ✅ FIX (VERY IMPORTANT)

    console.log("🔥 PARAM:", productId);

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        rating: true,
        store: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}