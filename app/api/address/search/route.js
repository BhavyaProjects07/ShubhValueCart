import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { searchAddress } from "@/lib/placekit";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const query = body.query?.trim();

    if (!query || query.length < 3) {
      return NextResponse.json(
        {
          results: [],
        },
        { status: 200 }
      );
    }

    const data = await searchAddress(query);

    const results = (data.results || []).map((item) => ({
      label: item.name,
      street: item.name,
      city: item.city || "",
      state: item.administrative || "",
      country: item.country || "",
      zip: item.zipcode?.[0] || "",
      coordinates: item.coordinates,
      latitude: Number(item.coordinates?.split(",")[0]),
      longitude: Number(item.coordinates?.split(",")[1]),
    }));

    return NextResponse.json({
      success: true,
      results,
    });

  } catch (error) {
    console.error("ADDRESS SEARCH:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}