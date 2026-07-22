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

    if (total >= 5) {
      return NextResponse.json(
        {
          error: "Maximum 5 banners allowed.",
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

    const image = formData.get("image");
    const title = formData.get("title") || "";
    const link = formData.get("link") || "";

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

    // ----------------------------
    // Upload ImageKit
    // ----------------------------
    const buffer = Buffer.from(await image.arrayBuffer());

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