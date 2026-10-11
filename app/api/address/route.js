import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function cleanStr(val) {
  return typeof val === "string" ? val.trim() : (val ?? "");
}

// Add a new address
export async function POST(request) {
  try {
    const session = await getSession();
    const userId = session?.userId;

    // 1. User must be logged in
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    // 2. Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        {
          code: "ACCOUNT_INCOMPLETE",
          error: "Please complete your account profile before adding a delivery address.",
        },
        { status: 403 }
      );
    }

    // 3. Parse request
    const body = await request.json();
    const address = body.address || body;

    if (!address) {
      return NextResponse.json(
        { error: "Address data is required." },
        { status: 400 }
      );
    }

    // 4. Validate required fields
    const street = cleanStr(address.street);
    const city = cleanStr(address.city);
    const state = cleanStr(address.state);
    const zip = String(cleanStr(address.zip));

    if (!street || !city || !state || !zip) {
      return NextResponse.json(
        { error: "Street, city, state, and PIN code are required." },
        { status: 400 }
      );
    }

    // 5. Check if this should be default address
    const addressCount = await prisma.address.count({
      where: { userId: user.id },
    });

    const isDefault = address.isDefault !== undefined ? Boolean(address.isDefault) : (addressCount === 0);

    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // 6. Build clean address object matching Prisma schema
    const addressData = {
      userId: user.id,
      name: cleanStr(address.name) || user.name || "Customer",
      email: cleanStr(address.email) || "",
      phone: cleanStr(address.phone) || user.phone || "",
      street,
      city,
      state,
      zip,
      country: cleanStr(address.country) || "India",
      landmark: address.landmark ? String(address.landmark).trim() : null,
      formattedAddress: address.formattedAddress ? String(address.formattedAddress).trim() : null,
      latitude: address.latitude !== undefined && address.latitude !== null && !isNaN(address.latitude) ? Number(address.latitude) : null,
      longitude: address.longitude !== undefined && address.longitude !== null && !isNaN(address.longitude) ? Number(address.longitude) : null,
      isDefault,
    };

    // 7. Save to database
    const newAddress = await prisma.address.create({
      data: addressData,
    });

    return NextResponse.json({
      success: true,
      newAddress,
      message: "Address added successfully",
    });

  } catch (error) {
    console.error("ADD ADDRESS ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add address" },
      { status: 500 }
    );
  }
}

// Get all addresses for logged-in user
export async function GET() {
  try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ addresses: [] });
    }

    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ addresses });
  } catch (error) {
    console.error("GET ADDRESSES ERROR:", error);
    return NextResponse.json({ addresses: [] }, { status: 500 });
  }
}

// Delete address
export async function DELETE(request) {
  try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    let addressId = searchParams.get("id");

    if (!addressId) {
      try {
        const body = await request.json();
        addressId = body.id || body.addressId;
      } catch {}
    }

    if (!addressId) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 });
    }

    await prisma.address.deleteMany({
      where: {
        id: addressId,
        userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete address" },
      { status: 500 }
    );
  }
}