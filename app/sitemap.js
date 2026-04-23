import prisma from "@/lib/prisma";

export const revalidate = 3600;

const baseUrl = "https://www.shubhavaluecart.in";

export default async function sitemap() {
  let products = [];

  try {
    products = await prisma.product.findMany({
      where: {
        inStock: { not: false },
        store: { isActive: true },
      },
      select: {
        id: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: "desc" },
      take: 5000,
    });
  } catch (error) {
    console.error("SITEMAP_PRODUCTS_ERROR", error);
  }

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...productUrls,
  ];
}
