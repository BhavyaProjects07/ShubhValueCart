import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req) {
  try {
    const { phone, otp } = await req.json()

    // =========================
    // ✅ VALIDATION
    // =========================
    if (!phone || !otp) {
      return NextResponse.json(
        { error: "Phone and OTP required" },
        { status: 400 }
      )
    }

    // =========================
    // ✅ NORMALIZE PHONE (CRITICAL FIX)
    // =========================
    let normalizedPhone = phone.replace(/\s/g, "")

    if (normalizedPhone.startsWith("+91")) {
      // ok
    } else if (/^\d{10}$/.test(normalizedPhone)) {
      normalizedPhone = `+91${normalizedPhone}`
    } else if (/^91\d{10}$/.test(normalizedPhone)) {
      normalizedPhone = `+${normalizedPhone}`
    } else {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      )
    }

    console.log("VERIFY PHONE:", normalizedPhone)

    // =========================
    // 🔍 FIND OTP
    // =========================
    const record = await prisma.otp.findFirst({
      where: { phone: normalizedPhone },
      orderBy: { createdAt: "desc" } // ✅ important
    })

    console.log("DB RECORD:", record)

    if (!record) {
      return NextResponse.json(
        { error: "No OTP found. Please request again." },
        { status: 400 }
      )
    }

    // =========================
    // ❌ EXPIRED
    // =========================
    if (record.expiresAt < new Date()) {
      await prisma.otp.delete({ where: { id: record.id } })
      return NextResponse.json(
        { error: "OTP expired" },
        { status: 400 }
      )
    }

    // =========================
    // ❌ ATTEMPTS LIMIT
    // =========================
    if (record.attempts >= 5) {
      await prisma.otp.delete({ where: { id: record.id } })
      return NextResponse.json(
        { error: "Too many attempts. Request new OTP." },
        { status: 429 }
      )
    }

    // =========================
    // ❌ WRONG OTP
    // =========================
    if (record.otp !== otp) {
      await prisma.otp.update({
        where: { id: record.id },
        data: { attempts: record.attempts + 1 }
      })

      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      )
    }

    // =========================
    // ✅ SUCCESS
    // =========================
    await prisma.otp.delete({
      where: { id: record.id }
    })

    return NextResponse.json({
      message: "OTP verified successfully"
    })

  } catch (error) {
    console.error("VERIFY ERROR:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
