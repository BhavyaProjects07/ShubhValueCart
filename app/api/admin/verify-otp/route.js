import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { otp } = await req.json();

    if (!otp) {
      return NextResponse.json(
        { error: "OTP is required" },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL2;

    if (!adminEmail) {
      return NextResponse.json(
        { error: "ADMIN_EMAIL2 not configured" },
        { status: 500 }
      );
    }

    // =========================
    // FIND OTP
    // =========================
    const otpRecord = await prisma.otp.findFirst({
      where: {
        phone: adminEmail,
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "OTP not found. Please request a new one." },
        { status: 404 }
      );
    }

    // =========================
    // EXPIRED
    // =========================
    if (otpRecord.expiresAt < new Date()) {
      await prisma.otp.delete({
        where: {
          id: otpRecord.id,
        },
      });

      return NextResponse.json(
        { error: "OTP has expired." },
        { status: 400 }
      );
    }

    // =========================
    // TOO MANY ATTEMPTS
    // =========================
    if (otpRecord.attempts >= 5) {
      await prisma.otp.delete({
        where: {
          id: otpRecord.id,
        },
      });

      return NextResponse.json(
        {
          error: "Too many incorrect attempts. Request a new OTP.",
        },
        { status: 429 }
      );
    }

    // =========================
    // INVALID OTP
    // =========================
    if (otpRecord.otp !== otp) {
      await prisma.otp.update({
        where: {
          id: otpRecord.id,
        },
        data: {
          attempts: {
            increment: 1,
          },
        },
      });

      return NextResponse.json(
        { error: "Invalid OTP." },
        { status: 400 }
      );
    }

    // =========================
    // SUCCESS
    // =========================
    await prisma.otp.delete({
      where: {
        id: otpRecord.id,
      },
    });

    const response = NextResponse.json({
      success: true,
      message: "Admin verified successfully.",
    });

    response.cookies.set("admin_verified", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 30, // 30 minutes
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("VERIFY OTP:", error);

    return NextResponse.json(
      {
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}