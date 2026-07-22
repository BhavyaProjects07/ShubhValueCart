import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import imagekit from "@/configs/imageKit";
import { auth } from "@clerk/nextjs/server";

// GET -> Fetch all banners
export async function GET() {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json({ banners });
  } catch (error) {
    console.error("GET BANNERS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch banners.",
      },
      {
        status: 500,
      }
    );
  }
}

// POST -> Create Banner
export async function POST(req) {
  try {
    // ----------------------------
    // Auth
    // ----------------------------
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // ----------------------------
    // Maximum 5 banners
    // ----------------------------
    const total = await prisma.banner.count();

    if (total >= 10) {
      return NextResponse.json(
        {
          error: "Maximum 10 banners allowed.",
        },
        {
          status: 400,
        }
      );
    }

    // ----------------------------
    // Parse FormData
    // ----------------------------
    const formData = await req.formData();

    const title = formData.get("title") || "";
    const link = formData.get("link") || "";
    
    const image = formData.get("image");

console.log("========== IMAGE DEBUG ==========");
console.log("Name:", image?.name);
console.log("Type:", image?.type);
console.log("Size (Bytes):", image?.size);
console.log("Size (KB):", (image?.size / 1024).toFixed(2));
console.log("Size (MB):", (image?.size / 1024 / 1024).toFixed(2));
console.log("================================");

if (!image || image.size === 0) {
  return NextResponse.json(
    {
      error: "Banner image is required.",
    },
    {
      status: 400,
    }
  );
}

// Optional size limit (10 MB example)
const MAX_SIZE = 10 * 1024 * 1024;

if (image.size > MAX_SIZE) {
  console.error("Image exceeds allowed size.");
  console.error(`Uploaded: ${(image.size / 1024 / 1024).toFixed(2)} MB`);
  console.error(`Allowed : ${(MAX_SIZE / 1024 / 1024).toFixed(2)} MB`);

  return NextResponse.json(
    {
      error: `Image too large (${(
        image.size /
        1024 /
        1024
      ).toFixed(2)} MB). Maximum allowed is 10 MB.`,
    },
    {
      status: 413,
    }
  );
}

    // ----------------------------
    // Upload ImageKit
    // ----------------------------
    const buffer = Buffer.from(await image.arrayBuffer());

    console.log("Buffer Size:", buffer.length);
console.log(
  "Buffer MB:",
  (buffer.length / 1024 / 1024).toFixed(2)
);
    const upload = await imagekit.upload({
      file: buffer,
      fileName: `${Date.now()}-${image.name}`,
      folder: "banners",
    });

    const imageUrl = imagekit.url({
      path: upload.filePath,
      transformation: [
        {
          quality: "auto",
        },
        {
          format: "webp",
        },
        {
          width: "1600",
        },
      ],
    });

    // ----------------------------
    // Order Number
    // ----------------------------
    const lastBanner = await prisma.banner.findFirst({
      orderBy: {
        order: "desc",
      },
    });

    const nextOrder = lastBanner ? lastBanner.order + 1 : 1;

    // ----------------------------
    // Save
    // ----------------------------
    const banner = await prisma.banner.create({
      data: {
        image: imageUrl,
        title,
        link,
        order: nextOrder,
        isActive: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Banner uploaded successfully.",
        banner,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("CREATE BANNER ERROR:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to upload banner.",
      },
      {
        status: 500,
      }
    );
  }
}