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

    const hasSizes = formData.get("hasSizes") === "true";
    const sizesRaw = formData.get("sizes");

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

    // ---------------- DB INSERT ----------------
    await prisma.product.create({
      data: {
        name,
        description,
        mrp,
        price,
        images: imagesUrl,
        category,
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
export async function GET(request) {
  try {
    const stores = await prisma.store.findMany();
    const storeId = stores[0]?.id;

    const products = await prisma.product.findMany({
      where: { storeId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}