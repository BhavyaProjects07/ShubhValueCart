import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getRegistrationSession, destroyRegistrationSession, createSession } from "@/lib/auth";

export async function POST(req) {
  try {
    const session = await getRegistrationSession();

    if (!session || !session.phone) {
      return NextResponse.json(
        { error: "Registration session expired or invalid. Please verify OTP again." },
        { status: 401 }
      );
    }

    const { firstName, lastName } = await req.json();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "Valid name is required" },
        { status: 400 }
      );
    }

    // Double check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { phone: session.phone }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this phone number." },
        { status: 400 }
      );
    }

    // We do NOT use clerkId anymore. We rely on Prisma cuid() default.
    const newUser = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: `${firstName.trim()} ${lastName.trim()}`,
        phone: session.phone,
        image: "",
      }
    });

    // Destroy registration session, create real session
    await destroyRegistrationSession();
    await createSession(newUser.id);

    return NextResponse.json({
      message: "Registration successful",
      user: {
        id: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
      }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
