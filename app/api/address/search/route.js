import { NextResponse } from "next/server";
import { autocomplete } from "@/lib/geoapify";

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
    const { query } = await req.json();

    if (!query || query.trim().length < 3) {
      return NextResponse.json({
        success: true,
        results: [],
      });
    }

    const response = await withTimeout(
      autocomplete(query)
    );

    const results = (response.results || []).map((item) => ({
      label: item.formatted,

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

      latitude:
        item.lat,

      longitude:
        item.lon,
    }));

    return NextResponse.json({
      success: true,
      results,
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