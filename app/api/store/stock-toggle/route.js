// toggle stock of a product
import { getAuth } from "@clerk/nextjs/server"
import  authSeller from "@/middlewares/authSeller"
import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"



export async function POST(request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Missing Product ID" }, { status: 400 });
    }

    // ✅ SAME LOGIC AS CREATE API
    const store = await prisma.store.findFirst();

    if (!store) {
      return NextResponse.json({ error: "No store found" }, { status: 400 });
    }

    const storeId = store.id;

    // 🔥 NOW MATCHES
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        storeId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.update({
      where: { id: productId },
      data: {
        inStock: !product.inStock,
      },
    });

    return NextResponse.json({ message: "Stock updated" });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}