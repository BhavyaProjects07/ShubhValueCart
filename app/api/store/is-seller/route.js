import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ✅ correct import

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    // ✅ Not logged in
    if (!userId) {
      return NextResponse.json(
        { isSeller: false, isActive: false },
        { status: 401 }
      );
    }

    // ✅ Use findFirst (NOT findUnique)
    const storeInfo = await prisma.store.findFirst({
      where: { userId },
      select: {
        id: true,
        name: true,
        isActive: true,
      },
    });

    // ✅ No store → not a seller
    if (!storeInfo) {
      return NextResponse.json({
        isSeller: false,
        isActive: false,
      });
    }

    // ✅ Seller found
    return NextResponse.json({
      isSeller: true,
      isActive: storeInfo.isActive,
      storeInfo,
    });

  } catch (error) {
    console.error("IS-SELLER ERROR:", error);

    return NextResponse.json(
      {
        isSeller: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}