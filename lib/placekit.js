const API_URL = "https://api.placekit.co";

const API_KEY = process.env.PLACEKIT_API_KEY;

if (!API_KEY) {
  throw new Error("PLACEKIT_API_KEY is missing");
}

async function placekit(endpoint, body = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-placekit-api-key": API_KEY,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "PlaceKit request failed");
  }

  return json;
}

/**
 * Address autocomplete
 */
export async function searchAddress(query) {
  return placekit("/search", {
    query,
    countries: ["in"],
    maxResults: 5,
  });
}

/**
 * Reverse geocoding
 */
export async function reverseGeocode(lat, lng) {
  return placekit("/reverse", {
    coordinates: `${lat},${lng}`,
    countries: ["in"],
  });
}