export default async function sitemap() {
  const baseUrl = "https://shubhavaluecart.in";

  const res = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store",
  });

  const data = await res.json();

  // ✅ FIX: extract array properly
  const products = data.products || [];

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/product/${p.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}