import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({
        authenticated: false,
        completed: false,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId, // Your User.id is the Clerk ID
      },
    });

    return NextResponse.json({
      authenticated: true,
      completed: !!user,
      user,
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}