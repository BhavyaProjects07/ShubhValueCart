import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function DELETE(req) {
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

    const { searchParams } = new URL(req.url);

    const addressId = searchParams.get("id");

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

    await prisma.address.delete({
      where: {
        id: addressId,
      },
    });

    // If deleted address was default,
    // make another address default automatically.

    if (address.isDefault) {
      const latest = await prisma.address.findFirst({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (latest) {
        await prisma.address.update({
          where: {
            id: latest.id,
          },
          data: {
            isDefault: true,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Address deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "production"
            ? "Unable to delete address"
            : error.message,
      },
      { status: 500 }
    );
  }
}