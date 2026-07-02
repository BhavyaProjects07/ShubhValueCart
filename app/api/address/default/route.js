import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function PATCH(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { addressId } = await req.json();

    if (!addressId) {
      return NextResponse.json(
        {
          success: false,
          error: "Address ID is required",
        },
        { status: 400 }
      );
    }

    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
      },
    });

    if (!address) {
      return NextResponse.json(
        {
          success: false,
          error: "Address not found",
        },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      prisma.address.updateMany({
        where: {
          userId,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      }),

      prisma.address.update({
        where: {
          id: addressId,
        },
        data: {
          isDefault: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Default address updated",
    });

  } catch (error) {
    console.error("DEFAULT ADDRESS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "production"
            ? "Unable to update default address"
            : error.message,
      },
      { status: 500 }
    );
  }
}