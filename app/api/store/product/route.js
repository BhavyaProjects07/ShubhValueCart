// add a new product to the store
import { verifyToken } from "@clerk/backend";

import imagekit from "@/configs/imageKit"
import authSeller from "@/middlewares/authSeller"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"


export async function POST(request) {
  try {
    // 🔥 STEP 1: GET ALL STORES (FOR DEBUG)
    const store = await prisma.store.findFirst();

      if (!store) {
        return NextResponse.json({ error: "No store found" }, { status: 400 });
      }

      const storeId = store.id;

    console.log("✅ USING STORE ID:", storeId);

    if (!storeId) {
      return NextResponse.json(
        { error: "No store found in DB" },
        { status: 400 }
      );
    }

    // ---------------- FORM DATA ----------------
    const formData = await request.formData();

    const name = formData.get("name")?.trim();
    const description = formData.get("description")?.trim();
    const price = Number(formData.get("price") || 0);
    const mrp = Number(formData.get("mrp") || 0);
    const category = formData.get("category")?.trim();
    const stock = Number(formData.get("stock") || 0);
    const hasSizes = formData.get("hasSizes") === "true";
    const sizesRaw = formData.get("sizes");
    const itemCode = formData.get("itemCode")?.trim();

    const offlineSoldQuantity = Number(
      formData.get("offlineSoldQuantity") || 0
    );

    let sizes = null;
    if (hasSizes && sizesRaw) {
      try {
        sizes = JSON.parse(sizesRaw);
      } catch {
        sizes = null;
      }
    }

    const images = formData.getAll("images") || [];
const imageUrlFromExcel = formData.get("imageUrl");

console.log("📸 Excel Image URL:", imageUrlFromExcel);

let imagesUrl = [];

// 🔥 PRIORITY 1: Excel Image URL
    if (imageUrlFromExcel && imageUrlFromExcel.trim() !== "") {
  imagesUrl = [imageUrlFromExcel.trim()];

  console.log("✅ Using Excel Image URL:", imageUrlFromExcel);
}
      
      

// 🔥 PRIORITY 2: Uploaded Images
else if (images.length > 0 && images[0]?.size > 0) {
  imagesUrl = await Promise.all(
    images.map(async (image) => {
      const buffer = Buffer.from(await image.arrayBuffer());

      const response = await imagekit.upload({
        file: buffer,
        fileName: image.name,
        folder: "products",
      });

      return imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "800" },
        ],
      });
    })
  );
}

// 🔥 PRIORITY 3: Placeholder
else {
  imagesUrl = ["/placeholder.png"];
    }
    

    const existingProduct = await prisma.product.findUnique({
  where: {
    itemCode,
  },
});

if (existingProduct) {
  return NextResponse.json(
    {
      error: `Item Code ${itemCode} already exists.`,
    },
    { status: 409 }
  );
}

    // ---------------- DB INSERT ----------------
    await prisma.product.create({
      data: {
  itemCode,

  name,
  description,

  mrp,
  price,

  images: imagesUrl,

  category,

  stock,
  offlineSoldQuantity,

  inStock: stock > 0,

  storeId,

  hasSizes,
  sizes,
},
    });

    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ PRODUCT CREATE ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// ---------------- GET PRODUCTS ----------------
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // ---------------- QUERY PARAMS ----------------
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 1000000;
    const inStock = searchParams.get("inStock");
    const sort = searchParams.get("sort") || "latest";
    const hasSizes = searchParams.get("hasSizes");

    // ---------------- STORE ----------------
    const store = await prisma.store.findFirst();
    const storeId = store?.id;

    if (!storeId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ---------------- FILTER OBJECT ----------------
    let where = {
      storeId,
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    };

    // 🔍 SEARCH (LIKE)
    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    // 📂 CATEGORY
    if (category) {
      where.category = category;
    }

    // 📦 STOCK
    if (inStock === "true") {
      where.inStock = true;
    }

    // 📏 SIZES
    if (hasSizes === "true") {
      where.hasSizes = true;
    }

    // ---------------- SORTING ----------------
    let orderBy = { createdAt: "desc" };

    if (sort === "price_low_high") {
      orderBy = { price: "asc" };
    } else if (sort === "price_high_low") {
      orderBy = { price: "desc" };
    } else if (sort === "oldest") {
      orderBy = { createdAt: "asc" };
    }

    // ---------------- QUERY ----------------
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),

      prisma.product.count({ where }),
    ]);

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
    console.error("GET PRODUCTS ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}