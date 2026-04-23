import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductClient from "./ProductClient";

const baseUrl = "https://www.shubhavaluecart.in";

async function getProduct(productId) {
  return prisma.product.findFirst({
    where: {
      id: productId,
      inStock: { not: false },
      store: { isActive: true },
    },
    include: {
      rating: true,
      store: true,
    },
  });
}

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    return {
      title: "Product not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    product.description?.replace(/\s+/g, " ").slice(0, 155) ||
    `Buy ${product.name} online from Shubh Value Cart in Dholpur.`;
  const image = product.images?.[0] || "/logo.png";

  return {
    title: `${product.name} - Shubh Value Cart`,
    description,
    alternates: {
      canonical: `${baseUrl}/product/${product.id}`,
    },
    openGraph: {
      title: product.name,
      description,
      url: `${baseUrl}/product/${product.id}`,
      images: [image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function Product({ params }) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return <ProductClient productId={productId} initialProduct={product} />;
}
