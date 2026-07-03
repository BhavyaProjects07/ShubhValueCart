import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendBrevoEmail } from "@/lib/brevo";

export async function POST() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL2;

    if (!adminEmail) {
      return NextResponse.json(
        { error: "ADMIN_EMAIL2 not configured" },
        { status: 500 }
      );
    }

    // =========================
    // RATE LIMIT (60 sec)
    // =========================
    const recentOtp = await prisma.otp.findFirst({
      where: {
        phone: adminEmail,
        createdAt: {
          gt: new Date(Date.now() - 60 * 1000),
        },
      },
    });

    if (recentOtp) {
      return NextResponse.json(
        {
          error: "Wait 60 seconds before requesting OTP again.",
        },
        { status: 429 }
      );
    }

    // =========================
    // DELETE OLD OTP
    // =========================
    await prisma.otp.deleteMany({
      where: {
        phone: adminEmail,
      },
    });

    // =========================
    // GENERATE OTP
    // =========================
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // =========================
    // SAVE OTP
    // =========================
    await prisma.otp.create({
      data: {
        phone: adminEmail,
        otp,
        attempts: 0,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    // =========================
    // SEND EMAIL
    // =========================
    await sendBrevoEmail({
      to: adminEmail,
      subject: "Admin Dashboard Verification OTP",
      htmlContent: `
        <div style="font-family:Arial,sans-serif;padding:30px;background:#f7f7f7">
          <div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:40px">

            <h2 style="color:#16a34a;margin-bottom:10px">
              Admin Verification
            </h2>

            <p>
              Your OTP for accessing the
              <strong>Shubh Value Cart Admin Dashboard</strong>
              is:
            </p>

            <div style="
              font-size:34px;
              font-weight:bold;
              letter-spacing:8px;
              text-align:center;
              background:#f0fdf4;
              color:#15803d;
              padding:20px;
              border-radius:10px;
              margin:30px 0;
            ">
              ${otp}
            </div>

            <p>This OTP is valid for <b>10 minutes</b>.</p>

            <p>
              If you didn't request this verification,
              you can safely ignore this email.
            </p>

            <hr style="margin:30px 0">

            <small style="color:#777">
              Shubh Value Cart
            </small>

          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.error("ADMIN EMAIL OTP:", error);

    return NextResponse.json(
      {
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}