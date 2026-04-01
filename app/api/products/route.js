import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ SLUG → DB CATEGORY MAP
const CATEGORY_SLUG_MAP = {
  "food-grocery": "Food & Grocery",
  "staples-cooking": "Staples & Cooking",
  "personal-care": "Personal Care",
  "home-cleaning": "Home & Cleaning",
  "baby-care": "Baby Care",
  "toys-kids": "Toys & Kids",
  "household": "Household Essentials",
  "stationery": "Stationery",
  "electronics": "Electronics",
  "fashion": "Fashion",
};

const STOP_WORDS = ["and", "or", "for", "the", "with", "to", "of", "in"];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // ✅ PAGINATION PARAMS
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 50;
    const skip = (page - 1) * limit;

    const minPrice = Number(searchParams.get("minPrice")) || 0
const maxPrice = Number(searchParams.get("maxPrice")) || 0
const minRating = Number(searchParams.get("minRating")) || 0
const minDiscount = Number(searchParams.get("minDiscount")) || 0

    const search = searchParams.get("search") || "";
    const rawCategory = searchParams.get("category");

    // ---------- CLEAN SEARCH ----------
    const words = search
      .toLowerCase()
      .split(" ")
      .map(w => w.trim())
      .filter(w => w && !STOP_WORDS.includes(w));

    // ---------- CATEGORY FIX ----------
    let category = null;
    if (rawCategory) {
      const normalized = rawCategory.toLowerCase();
      category = CATEGORY_SLUG_MAP[normalized] || rawCategory;
    }

    const searchKeywords = words;

    // ---------- WHERE CLAUSE ----------
    const whereClause = {
  inStock: { not: false },

  store: {
    isActive: true,
  },

  ...(category && {
    category: { equals: category },
  }),

  ...(minPrice || maxPrice
    ? {
        price: {
          ...(minPrice && { gte: minPrice }),
          ...(maxPrice && { lte: maxPrice }),
        },
      }
    : {}),

  ...(minDiscount && {
    discount: { gte: minDiscount },
  }),

  ...(minRating && {
    rating: {
      some: {
        value: { gte: minRating },
      },
    },
  }),

  ...(searchKeywords.length > 0 && {
    OR: searchKeywords.map(word => ({
      OR: [
        { name: { contains: word, mode: "insensitive" } },
        { description: { contains: word, mode: "insensitive" } },
      ],
    })),
  }),
}

    // ---------- PARALLEL QUERIES ----------
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
          rating: true,
          store: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),

      prisma.product.count({
        where: whereClause,
      }),
    ]);

    // ---------- RESPONSE ----------
    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error("SEARCH ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}