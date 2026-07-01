import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// add a new address

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    // 1. User must be logged in
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    // 2. Check if user has completed signup
    const user = await prisma.user.findUnique({
      where: {
        id: userId, // assuming your User model stores Clerk ID here
      },
    });

    if (!user) {
      return NextResponse.json(
  {
    code: "ACCOUNT_INCOMPLETE",
    error:
      "Please verify your mobile number and email to complete your account setup before adding a delivery address.",
  },
  { status: 403 }
);
    }

    // 3. Parse request
    const { address } = await request.json();

    // 4. Associate with the verified user
    address.userId = user.id; // or user.clerkId depending on your schema

    // 5. Create address
    const newAddress = await prisma.address.create({
      data: address,
    });

    return NextResponse.json({
      newAddress,
      message: "Address added successfully",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message || error.code },
      { status: 500 }
    );
  }
}

// get all addresses of a user


export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        const addresses = await prisma.address.findMany({
            where: { userId }
        })

        return NextResponse.json({addresses });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message || error.code }, { status: 500 });
    }
}