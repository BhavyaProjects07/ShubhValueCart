import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req) {
  try {
    const { phone } = await req.json()

    // =========================
    // ✅ VALIDATION + NORMALIZATION
    // =========================
    if (!phone) {
      return NextResponse.json({ error: "Phone required" }, { status: 400 })
    }

    let normalizedPhone = phone.replace(/\s/g, "")

    // Convert to +91 format
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
    // ✅ RATE LIMIT (1 OTP / 60 sec)
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
        { error: "Wait 60 seconds before requesting OTP again" },
        { status: 429 }
      )
    }

    // =========================
    // ✅ DELETE OLD OTPs
    // =========================
    await prisma.otp.deleteMany({
      where: { phone: normalizedPhone }
    })

    // =========================
    // 🔢 GENERATE OTP
    // =========================
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // =========================
    // 💾 SAVE OTP (STORE CLEAN FORMAT)
    // =========================
    await prisma.otp.create({
      data: {
        phone: normalizedPhone,
        otp,
        attempts: 0,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      }
    })

    // =========================
    // 📩 SMS (REMOVE + FOR API)
    // =========================
    const smsPhone = normalizedPhone.slice(1) // remove +

    const message = `Dear User, ${otp} is Your OTP for login to Shubh Value Cart. Valid for 10 mins. Do not share. -Shubh Value Cart`

    const url = `https://api.amazesms.com/api/sms?key=${process.env.SMS_KEY}&from=${process.env.SMS_SENDER}&to=${smsPhone}&body=${encodeURIComponent(message)}&templateid=${process.env.SMS_TEMPLATE}&entityid=${process.env.SMS_ENTITY}`

    console.log("SMS URL:", url)

    const res = await fetch(url)
    const text = await res.text()

    console.log("SMS RESPONSE:", text)

    if (!res.ok) {
      return NextResponse.json(
        { error: "SMS failed", details: text },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: "OTP sent successfully" })

  } catch (error) {
    console.error("SEND OTP ERROR:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}