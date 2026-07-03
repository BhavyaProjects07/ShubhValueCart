import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req) {
  try {
    const { phone } = await req.json()

    // =========================
    // ✅ VALIDATION
    // =========================
    if (!phone) {
      return NextResponse.json(
        { error: "Phone required" },
        { status: 400 }
      )
    }

    let normalizedPhone = phone.replace(/\s/g, "")

    // =========================
    // ✅ NORMALIZE
    // =========================
    if (normalizedPhone.startsWith("+91")) {
      // already correct
    } else if (/^\d{10}$/.test(normalizedPhone)) {
      normalizedPhone = `+91${normalizedPhone}`
    } else if (/^91\d{10}$/.test(normalizedPhone)) {
      normalizedPhone = `+${normalizedPhone}`
    } else {
      return NextResponse.json(
        { error: "Invalid Indian phone number" },
        { status: 400 }
      )
    }

    // =========================
    // ✅ ONLY ALLOW ADMIN PHONE
    // =========================
    const adminPhone = process.env.ADMIN_PHONE?.replace(/\s/g, "")

    if (!adminPhone) {
      return NextResponse.json(
        { error: "ADMIN_PHONE not configured" },
        { status: 500 }
      )
    }

    if (normalizedPhone !== adminPhone) {
      return NextResponse.json(
        {
          error: "This phone number is not authorized."
        },
        { status: 403 }
      )
    }

    // =========================
    // ✅ RATE LIMIT (60 sec)
    // =========================
    const recentOtp = await prisma.otp.findFirst({
      where: {
        phone: normalizedPhone,
        createdAt: {
          gt: new Date(Date.now() - 60 * 1000)
        }
      }
    })

    if (recentOtp) {
      return NextResponse.json(
        {
          error: "Wait 60 seconds before requesting OTP again"
        },
        { status: 429 }
      )
    }

    // =========================
    // ✅ DELETE OLD OTP
    // =========================
    await prisma.otp.deleteMany({
      where: {
        phone: normalizedPhone
      }
    })

    // =========================
    // 🔢 GENERATE OTP
    // =========================
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString()

    // =========================
    // 💾 SAVE OTP
    // =========================
    await prisma.otp.create({
      data: {
        phone: normalizedPhone,
        otp,
        attempts: 0,
        expiresAt: new Date(
          Date.now() + 10 * 60 * 1000
        )
      }
    })

    // =========================
    // 📩 SEND SMS
    // =========================
    const smsPhone = normalizedPhone.slice(1)

    const message = `Dear Admin, ${otp} is your OTP for Admin Dashboard Verification. Valid for 10 mins. Do not share. -Shubh Value Cart`

    const url = `https://api.amazesms.com/api/sms?key=${process.env.SMS_KEY}&from=${process.env.SMS_SENDER}&to=${smsPhone}&body=${encodeURIComponent(message)}&templateid=${process.env.SMS_TEMPLATE}&entityid=${process.env.SMS_ENTITY}`

    console.log("SMS URL:", url)

    const res = await fetch(url)
    const text = await res.text()

    console.log("SMS RESPONSE:", text)

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "SMS failed",
          details: text
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully"
    })

  } catch (error) {
    console.error("ADMIN OTP ERROR:", error)

    return NextResponse.json(
      {
        error:
          error.message || "Internal server error"
      },
      { status: 500 }
    )
  }
}