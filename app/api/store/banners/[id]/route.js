import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import imagekit from "@/configs/imageKit";
import { auth } from "@clerk/nextjs/server";

// =========================
// UPDATE BANNER
// =========================
export async function PUT(req, context) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Next.js 15 Compatible
    const { id } = await context.params;

    console.log("PUT Banner ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Banner id is missing." },
        { status: 400 }
      );
    }

    const banner = await prisma.banner.findUnique({
      where: {
        id,
      },
    });

    if (!banner) {
      return NextResponse.json(
        {
          error: "Banner not found.",
        },
        {
          status: 404,
        }
      );
    }

    const formData = await req.formData();

    const image = formData.get("image");
    const title = formData.get("title")?.toString() || "";
    const link = formData.get("link")?.toString() || "";
    const isActive =
      formData.get("isActive") === "true";

    const order = Number(
      formData.get("order") || banner.order
    );

    let imageUrl = banner.image;

    // =========================
    // Replace Image
    // =========================
    if (image && image.size > 0) {
      try {
        const oldPath = new URL(banner.image).pathname;
        const fileName =
          oldPath.split("/").pop();

        const files =
          await imagekit.listFiles({
            searchQuery: `name="${fileName}"`,
          });

        if (files.length > 0) {
          await imagekit.deleteFile(
            files[0].fileId
          );
        }
      } catch (err) {
        console.log(
          "Skipping old image delete:",
          err.message
        );
      }

      const buffer = Buffer.from(
        await image.arrayBuffer()
      );

      const upload =
        await imagekit.upload({
          file: buffer,
          fileName: `${Date.now()}-${image.name}`,
          folder: "banners",
        });

      imageUrl = imagekit.url({
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
    }

    const updated =
      await prisma.banner.update({
        where: {
          id,
        },
        data: {
          image: imageUrl,
          title,
          link,
          order,
          isActive,
        },
      });

    return NextResponse.json({
      success: true,
      banner: updated,
    });
  } catch (error) {
    console.error(
      "UPDATE BANNER ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error.message ||
          "Failed to update banner.",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// DELETE BANNER
// =========================
export async function DELETE(req, context) {
  try {
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

    // ✅ Next.js 15 Compatible
    const { id } = await context.params;

    console.log("DELETE Banner ID:", id);

    if (!id) {
      return NextResponse.json(
        {
          error: "Banner id is missing.",
        },
        {
          status: 400,
        }
      );
    }

    const banner =
      await prisma.banner.findUnique({
        where: {
          id,
        },
      });

    if (!banner) {
      return NextResponse.json(
        {
          error: "Banner not found.",
        },
        {
          status: 404,
        }
      );
    }

    // =========================
    // Delete ImageKit Image
    // =========================
    try {
      const oldPath = new URL(
        banner.image
      ).pathname;

      const fileName =
        oldPath.split("/").pop();

      const files =
        await imagekit.listFiles({
          searchQuery: `name="${fileName}"`,
        });

      if (files.length > 0) {
        await imagekit.deleteFile(
          files[0].fileId
        );
      }
    } catch (err) {
      console.log(
        "Skipping ImageKit delete:",
        err.message
      );
    }

    await prisma.banner.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Banner deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE BANNER ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error.message ||
          "Failed to delete banner.",
      },
      {
        status: 500,
      }
    );
  }
}