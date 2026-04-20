export default async function sitemap() {
  const products = await fetch("https://shubhavaluecart.in/api/products")
    .then(res => res.json());

  const productUrls = products.map((p) => ({
    url: `https://shubhavaluecart.in/product/${p.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: "https://shubhavaluecart.in",
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}