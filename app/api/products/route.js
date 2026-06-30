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
    const recommendedFor = searchParams.get("recommendedFor")

    const minPrice = Number(searchParams.get("minPrice")) || 0
const maxPrice = Number(searchParams.get("maxPrice")) || 10000
const minRating = Number(searchParams.get("minRating")) || 0
const minDiscount = Number(searchParams.get("minDiscount")) || 0

    const search = searchParams.get("search") || "";
    const rawCategory = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");

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

    // ==========================================================
// 🚀 RECOMMENDATION MODE
// ==========================================================
if (recommendedFor) {
  const product = await prisma.product.findUnique({
    where: { id: recommendedFor },
    include: {
      rating: true,
      store: true
    }
  })

  if (!product) {
    return NextResponse.json({ products: [] })
  }

  // ==========================================================
// 🚀 PAGINATION SETUP
// ==========================================================
const limit = Number(searchParams.get("limit")) || 50
const page = Number(searchParams.get("page")) || 1
const skip = (page - 1) * limit

// ---------- EXTRACT CHILD CATEGORY ----------
const extractChildCategory = (desc) => {
  if (!desc) return null
  const match = desc.match(/Category\s*:\s*(.+)/i)
  return match ? match[1].trim().toLowerCase() : null
}

const childCategory = extractChildCategory(product.description)

// ---------- NAME WORDS ----------
const words = product.name
  ?.toLowerCase()
  .split(" ")
  .filter(w => w.length > 3) || []

// ==========================================================
// 🚀 SINGLE OPTIMIZED QUERY
// ==========================================================
const recommendedRaw = await prisma.product.findMany({
  where: {
    AND: [
      { id: { not: recommendedFor } },
      { inStock: { not: false } },
      { store: { isActive: true } },

      {
        OR: [
          // 🟢 LEVEL 1 → CHILD CATEGORY
          ...(childCategory
            ? [{
                description: {
                  contains: childCategory,
                  mode: "insensitive"
                }
              }]
            : []),

          // 🟡 LEVEL 2 → CATEGORY
          {
            category: product.category
          },

          // 🔵 LEVEL 3 → NAME MATCH
          ...(words.length
            ? words.map(word => ({
                name: {
                  contains: word,
                  mode: "insensitive"
                }
              }))
            : [])
        ]
      }
    ]
  },
  include: {
    rating: true,
    store: true
  }
})

// ==========================================================
// 🚀 SCORING SYSTEM (IMPORTANT)
// ==========================================================
const scored = recommendedRaw.map((p) => {
  let score = 0

  const desc = p.description?.toLowerCase() || ""
  const name = p.name?.toLowerCase() || ""

  // 🟢 Strong: child category
  if (childCategory && desc.includes(childCategory)) {
    score += 50
  }

  // 🟡 Medium: category
  if (p.category === product.category) {
    score += 20
  }

  // 🔵 Weak: name match
  words.forEach(word => {
    if (name.includes(word)) score += 10
  })

  return { ...p, score }
})

// ==========================================================
// 🚀 SORT + PAGINATE
// ==========================================================
const sorted = scored
  .filter(p => p.score > 0)
  .sort((a, b) => b.score - a.score)

const paginated = sorted.slice(skip, skip + limit)

// ==========================================================
// 🚀 RESPONSE
// ==========================================================
return NextResponse.json({
  products: paginated,
  pagination: {
    total: sorted.length,
    page,
    limit,
    totalPages: Math.ceil(sorted.length / limit)
  }
})
}

    const searchKeywords = words;

    // ---------- WHERE CLAUSE ----------
    const whereClause = {
  inStock: { not: false },

  store: {
    isActive: true,
  },

  ...(category && {
    category: {
      equals: category,
      mode: "insensitive",
    },
  }),

  ...(subCategory && {
    subCategory: {
      equals: subCategory,
      mode: "insensitive",
    },
  }),

  ...(minPrice > 0 || maxPrice > 0
    ? {
        price: {
          ...(minPrice > 0 && { gte: minPrice }),
          ...(maxPrice > 0 && { lte: maxPrice }),
        },
      }
    : {}),

  ...(searchKeywords.length > 0 && {
    OR: searchKeywords.map((word) => ({
      name: {
        contains: word,
        mode: "insensitive",
      },
    })),
  }),
};

    
    // ---------- PARALLEL QUERIES ----------
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
  rating: {
    include: {
      user: true, // ✅ THIS IS THE FIX
    },
  },
  store: true,
},
        orderBy: { createdAt: "desc" },
        skip,
        take: Math.min(limit * 4, 200),
      }),

      prisma.product.count({
        where: whereClause,
      }),
    ]);

    // ---------- LEVEL 2: RELEVANCE SCORING ----------
// ---------- LEVEL 2: RELEVANCE SCORING ----------
let finalProducts = products;

// =========================
// 🔥 DISCOUNT FILTER (FIX)
// =========================
if (minDiscount > 0) {
  finalProducts = finalProducts.filter(p => {
    if (!p.mrp || p.mrp === 0) return false;

    const discount =
      ((p.mrp - p.price) / p.mrp) * 100;

    return discount >= minDiscount;
  });
}

   if (minRating > 0) {
  finalProducts = finalProducts.filter(p => {
    if (!p.rating || p.rating.length === 0) return false;

    const validRatings = p.rating.filter(r =>
      typeof r.rating === "number"
    );

    if (validRatings.length === 0) return false;

    const avg =
      validRatings.reduce((sum, r) => sum + r.rating, 0) /
      validRatings.length;

    return avg >= minRating;
  });
}
if (searchKeywords.length > 0) {
  const searchText = search.toLowerCase();

  finalProducts = finalProducts
    .map((product) => {
      let score = 0;

      const name = product.name?.toLowerCase() || "";
      const desc = product.description?.toLowerCase() || "";

      let strongMatch = false; // 🔥 NEW

      // 🔥 Exact match
      if (name === searchText) {
        score += 100;
        strongMatch = true;
      }

      // 🔥 Full phrase match
      if (name.includes(searchText)) {
        score += 60;
        strongMatch = true;
      }

      // 🔥 Word match
      searchKeywords.forEach((word) => {
        if (name.includes(word)) {
          score += 15;

          // 🔥 VERY IMPORTANT: strong keyword logic
          if (word.length > 3) {
            strongMatch = true;
          }
        }

        if (desc.includes(word)) score += 5;
      });

      // 🔥 Category boost
      if (
        product.category &&
        searchKeywords.some((word) =>
          product.category.toLowerCase().includes(word)
        )
      ) {
        score += 10;
      }

      return { ...product, score, strongMatch };
    })
    // 🔥 FINAL FILTER (THIS FIXES YOUR ISSUE)
    .filter((p) => p.score > 0 && p.strongMatch)
    .sort((a, b) => b.score - a.score);

}
    
    // ---------- RESPONSE ----------
   return NextResponse.json({
  products: finalProducts.slice(0, limit), // ✅ FIX
  pagination: {
    total: finalProducts.length,
    page,
    limit,
    totalPages: Math.ceil(finalProducts.length / limit),
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