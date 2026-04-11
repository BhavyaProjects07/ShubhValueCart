import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req) {
  try {
    const { id, name, email, phone } = await req.json()

    if (!id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // ✅ UPSERT (VERY IMPORTANT → avoids duplicates)
    const user = await prisma.user.upsert({
      where: { id },
      update: {
        name,
        email,
        phone
      },
      create: {
        id,
        name,
        email,
        phone,
        image: "", // since Clerk gives image later
      }
    })

    return NextResponse.json({
      user,
      message: "User synced successfully"
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: error.message || "Sync failed" },
      { status: 500 }
    )
  }
}