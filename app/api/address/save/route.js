import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

function clean(value) {
  return typeof value === "string" ? value.trim() : value;
}

export async function POST(req) {
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

    const body = await req.json();

    const address = {
      name: clean(body.name),
      email: clean(body.email),
      phone: clean(body.phone),

      street: clean(body.street),
      city: clean(body.city),
      state: clean(body.state),
      zip: clean(body.zip),
      country: clean(body.country),

      landmark: clean(body.landmark),
      locality: clean(body.locality),

      latitude:
        body.latitude !== undefined
          ? Number(body.latitude)
          : null,

      longitude:
        body.longitude !== undefined
          ? Number(body.longitude)
          : null,

      formatted: clean(body.formattedAddress),

      isDefault: body.isDefault ?? true,
    };

    // --------------------------
    // VALIDATION
    // --------------------------

    if (!address.name)
      return NextResponse.json(
        {
          success: false,
          error: "Name is required",
        },
        { status: 400 }
      );

    if (!address.phone)
      return NextResponse.json(
        {
          success: false,
          error: "Phone number is required",
        },
        { status: 400 }
      );

    if (!address.street)
      return NextResponse.json(
        {
          success: false,
          error: "Street address is required",
        },
        { status: 400 }
      );

    if (!address.city)
      return NextResponse.json(
        {
          success: false,
          error: "City is required",
        },
        { status: 400 }
      );

    if (!address.state)
      return NextResponse.json(
        {
          success: false,
          error: "State is required",
        },
        { status: 400 }
      );

    if (!address.zip)
      return NextResponse.json(
        {
          success: false,
          error: "PIN Code is required",
        },
        { status: 400 }
      );

    if (!address.country)
      return NextResponse.json(
        {
          success: false,
          error: "Country is required",
        },
        { status: 400 }
      );

    // --------------------------
    // DEFAULT ADDRESS
    // --------------------------

    if (address.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    // --------------------------
    // CREATE
    // --------------------------

    const savedAddress = await prisma.address.create({
      data: {
        userId,

        name: address.name,
        email: address.email,
        phone: address.phone,

        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country,

        landmark: address.landmark,
        locality: address.locality,

        latitude: address.latitude,
        longitude: address.longitude,

        formatted: address.formatted,

        isDefault: address.isDefault,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Address saved successfully",
      address: savedAddress,
    });

  } catch (error) {
    console.error("SAVE ADDRESS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "production"
            ? "Unable to save address"
            : error.message,
      },
      { status: 500 }
    );
  }
}