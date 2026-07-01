import { NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export async function POST(req) {
  try {
    const { name, email, phone, password } = await req.json()

    // =========================
    // ✅ VALIDATION
    // =========================
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      )
    }

    if (!name) {
      return NextResponse.json(
        { error: "Name required" },
        { status: 400 }
      )
    }

    if (!phone) {
      return NextResponse.json(
        { error: "Phone required" },
        { status: 400 }
      )
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    // =========================
    // ✅ CLEAN DATA
    // =========================
    const cleanEmail = email.trim().toLowerCase()

    let normalizedPhone = phone.replace(/\s/g, "")
    if (!normalizedPhone.startsWith("+91")) {
      normalizedPhone = `+91${normalizedPhone}`
    }

    const client = await clerkClient()

    let user

    // =========================
    // ✅ CREATE / GET CLERK USER
    // =========================
    try {
      user = await client.users.createUser({
        emailAddress: [cleanEmail],
        password: password,
        firstName: name
      })
    } catch (error) {
      // 🔥 HANDLE EXISTING EMAIL
      if (error?.errors?.[0]?.code === "form_identifier_exists") {
        const existing = await client.users.getUserList({
          emailAddress: [cleanEmail]
        })

        user = existing.data[0]
      } else {
        throw error
      }
    }

    // =========================
    // ✅ UPSERT USER IN DB
    // =========================
    const dbUser = await prisma.user.upsert({
  where: { id: user.id },
  update: {
    phone: normalizedPhone,
    email: cleanEmail,
    name
  },
  create: {
    id: user.id,
    name,
    email: cleanEmail,
    phone: normalizedPhone,
    image: ""
  }
})

    return NextResponse.json({
      clerkId: user.id,
      dbUser
    })

  } catch (error) {
    console.error("CLERK FULL ERROR:", JSON.stringify(error, null, 2))

    return NextResponse.json(
      {
        error:
          error?.errors?.[0]?.message ||
          error?.message ||
          "Failed to create user"
      },
      { status: 500 }
    )
  }
}