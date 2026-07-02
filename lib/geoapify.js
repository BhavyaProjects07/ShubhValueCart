const API_KEY = process.env.GEOAPIFY_API_KEY;

if (!API_KEY) {
  throw new Error("GEOAPIFY_API_KEY is missing");
}

const BASE_URL = "https://api.geoapify.com/v1";

async function request(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      url.searchParams.append(key, value);
    }
  });

  url.searchParams.append("apiKey", API_KEY);

  const response = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function autocomplete(text) {
  return request("/geocode/autocomplete", {
    text,
    limit: 5,
    format: "json",
  });
}

export async function reverse(lat, lon) {
  return request("/geocode/reverse", {
    lat,
    lon,
    format: "json",
  });
}