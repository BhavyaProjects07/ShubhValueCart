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
        { error: "Phone and OTP are required" },
        { status: 400 }
      )
    }

    // =========================
    // ✅ NORMALIZE PHONE
    // =========================
    let normalizedPhone = phone.replace(/\s/g, "")

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
    // ✅ ONLY ADMIN PHONE
    // =========================
    const adminPhone = process.env.ADMIN_PHONE?.replace(/\s/g, "")

    if (normalizedPhone !== adminPhone) {
      return NextResponse.json(
        { error: "Unauthorized phone number" },
        { status: 403 }
      )
    }

    // =========================
    // ✅ FIND OTP
    // =========================
    const otpRecord = await prisma.otp.findFirst({
      where: {
        phone: normalizedPhone
      }
    })

    if (!otpRecord) {
      return NextResponse.json(
        { error: "OTP not found. Please request a new OTP." },
        { status: 404 }
      )
    }

    // =========================
    // ✅ OTP EXPIRED
    // =========================
    if (new Date() > otpRecord.expiresAt) {
      await prisma.otp.delete({
        where: {
          id: otpRecord.id
        }
      })

      return NextResponse.json(
        { error: "OTP has expired" },
        { status: 400 }
      )
    }

    // =========================
    // ✅ MAX ATTEMPTS
    // =========================
    if (otpRecord.attempts >= 5) {
      await prisma.otp.delete({
        where: {
          id: otpRecord.id
        }
      })

      return NextResponse.json(
        {
          error:
            "Maximum verification attempts exceeded. Please request a new OTP."
        },
        { status: 429 }
      )
    }

    // =========================
    // ❌ WRONG OTP
    // =========================
    if (otpRecord.otp !== otp) {
      await prisma.otp.update({
        where: {
          id: otpRecord.id
        },
        data: {
          attempts: {
            increment: 1
          }
        }
      })

      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      )
    }

    // =========================
    // ✅ DELETE OTP
    // =========================
    await prisma.otp.delete({
      where: {
        id: otpRecord.id
      }
    })

    // =========================
    // ✅ SET ADMIN VERIFIED COOKIE
    // =========================
    const response = NextResponse.json({
      success: true,
      message: "OTP verified successfully"
    })

    response.cookies.set("admin_verified", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15, // 15 minutes
      path: "/"
    })

    return response

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error)

    return NextResponse.json(
      {
        error: error.message || "Internal server error"
      },
      { status: 500 }
    )
  }
}