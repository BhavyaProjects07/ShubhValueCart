import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { phone } = await req.json()

    let normalizedPhone = phone.startsWith("+91")
      ? phone
      : `+91${phone}`

    const user = await prisma.user.findUnique({
      where: { phone: normalizedPhone }
    })

    return NextResponse.json({
      exists: !!user,
      user
    })

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}