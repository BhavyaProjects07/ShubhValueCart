import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth";import { NextResponse } from "next/server"

export async function GET(request) {
  const session = await getSession();
    const userId = session?.userId;if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const store = await prisma.store.findUnique({
    where: { userId },
  })

  if (!store) {
    return NextResponse.json(
      { message: "Store not found" },
      { status: 404 }
    )
  }

  const returns = await prisma.returnRequest.findMany({
    where: {
      order: {
        storeId: store.id,
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return NextResponse.json({ returns })
}
