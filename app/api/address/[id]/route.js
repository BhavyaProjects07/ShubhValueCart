import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request, { params }) {
  try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
    }

    await prisma.address.deleteMany({
      where: {
        id,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ADDRESS [id] ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete address" },
      { status: 500 }
    );
  }
}
