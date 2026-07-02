import { NextResponse } from "next/server";
import { reverse } from "@/lib/geoapify";

const REQUEST_TIMEOUT = 10000;

function withTimeout(promise) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Geoapify timeout")),
        REQUEST_TIMEOUT
      )
    ),
  ]);
}

export async function POST(req) {
  try {
    const { latitude, longitude } =
      await req.json();

    const response = await withTimeout(
      reverse(latitude, longitude)
    );

    const item = response.results?.[0];

    if (!item) {
      return NextResponse.json(
        {
          success: false,
          error: "Address not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,

      address: {
        street:
          item.street ||
          item.address_line1 ||
          "",

        city:
          item.city ||
          item.county ||
          item.state_district ||
          "",

        state:
          item.state ||
          "",

        zip:
          item.postcode ||
          "",

        country:
          item.country ||
          "",

        formattedAddress:
          item.formatted,

        latitude:
          item.lat,

        longitude:
          item.lon,

        landmark: "",
      },
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}