import { NextResponse } from "next/server";
import { reverseGeocode } from "@/lib/placekit";

const REQUEST_TIMEOUT = 10000;

function isValidLatitude(lat) {
  return Number.isFinite(lat) && lat >= -90 && lat <= 90;
}

function isValidLongitude(lng) {
  return Number.isFinite(lng) && lng >= -180 && lng <= 180;
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("PlaceKit request timed out")), ms)
    ),
  ]);
}

function normalizeAddress(result, lat, lng) {
  return {
    house: "",

    apartment: "",

    landmark: "",

    street:
      result.street ||
      result.road ||
      result.address?.road ||
      "",

    locality:
      result.locality ||
      result.suburb ||
      result.neighbourhood ||
      result.address?.suburb ||
      "",

    city:
      result.city ||
      result.town ||
      result.village ||
      result.address?.city ||
      result.address?.town ||
      "",

    state:
      result.state ||
      result.address?.state ||
      "",

    country:
      result.country ||
      result.address?.country ||
      "",

    zip:
      result.postcode ||
      result.postalCode ||
      result.address?.postcode ||
      "",

    formattedAddress:
      result.formatted ||
      result.display_name ||
      result.label ||
      "",

    latitude: lat,

    longitude: lng,
  };
}

export async function POST(req) {
  try {
    const body = await req.json();

    const lat = Number(body.latitude);
    const lng = Number(body.longitude);

    if (!isValidLatitude(lat)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid latitude",
        },
        { status: 400 }
      );
    }

    if (!isValidLongitude(lng)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid longitude",
        },
        { status: 400 }
      );
    }

    const placekitResponse = await withTimeout(
      reverseGeocode(lat, lng),
      REQUEST_TIMEOUT
    );

    if (!placekitResponse) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to detect address",
        },
        { status: 404 }
      );
    }

    const result =
      placekitResponse.features?.[0]?.properties ||
      placekitResponse.features?.[0] ||
      placekitResponse.result ||
      placekitResponse;

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          error: "Address not found",
        },
        { status: 404 }
      );
    }

    const address = normalizeAddress(result, lat, lng);

    return NextResponse.json({
      success: true,

      address,
    });
  } catch (error) {
    console.error("ADDRESS REVERSE ERROR");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "production"
            ? "Unable to detect address"
            : error.message,
      },
      { status: 500 }
    );
  }
}