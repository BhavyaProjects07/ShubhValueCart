import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json(
        { isSeller: false, isActive: false },
        { status: 401 }
      );
    }

    const storeInfo = await prisma.store.findFirst({
      where: { userId },
      select: {
        id: true,
        name: true,
        isActive: true,
      },
    });

    if (!storeInfo) {
      return NextResponse.json({
        isSeller: false,
        isActive: false,
      });
    }

    return NextResponse.json({
      isSeller: true,
      isActive: storeInfo.isActive,
      storeInfo,
    });

  } catch (error) {
    console.error("IS-SELLER ERROR:", error);

    return NextResponse.json(
      { isSeller: false, error: error.message },
      { status: 500 }
    );
  }
}