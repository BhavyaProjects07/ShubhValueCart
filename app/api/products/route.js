import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ SLUG → DB CATEGORY MAP (CRITICAL FIX)
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

    const search = searchParams.get("search") || "";
    const rawCategory = searchParams.get("category");

    // ---------- STEP 1: CLEAN SEARCH ----------
    const words = search
      .toLowerCase()
      .split(" ")
      .map(w => w.trim())
      .filter(w => w && !STOP_WORDS.includes(w));

    // ---------- STEP 2: FIX CATEGORY ----------
    let category = null;

    if (rawCategory) {
      const normalized = rawCategory.toLowerCase();

      // ✅ Convert slug → DB category
      category = CATEGORY_SLUG_MAP[normalized] || rawCategory;
    }

    // ---------- STEP 3: SEARCH KEYWORDS ----------
    const searchKeywords = words;

    // ---------- STEP 4: QUERY ----------
    const products = await prisma.product.findMany({
      where: {
        // ✅ safer than strict true
        inStock: { not: false },

        ...(category && {
          category: { equals: category },
        }),

        ...(searchKeywords.length > 0 && {
          OR: searchKeywords.map(word => ({
            OR: [
              { name: { contains: word, mode: "insensitive" } },
              { description: { contains: word, mode: "insensitive" } },
            ],
          })),
        }),
      },

      include: {
        rating: true,
        store: true,
      },

      orderBy: { createdAt: "desc" },
    });
    console.log("ALL PRODUCTS:", products);

    // ---------- STEP 5: STORE FILTER ----------
    const activeProducts = products.filter(
      p => p.store?.isActive !== false // ✅ safer check
    );

    return NextResponse.json({ products: activeProducts });

  } catch (error) {
    console.error("SEARCH ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}