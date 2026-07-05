import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const DEALS_PER_DAY = 15;
const TOTAL_DEALS = 180;
const TOTAL_DAYS = TOTAL_DEALS / DEALS_PER_DAY; // 12

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        inStock: true,
        store: {
          isActive: true,
        },
        mrp: {
          gt: 0,
        },
      },
      include: {
        rating: true,
        store: true,
      },
    });

    const withDiscount = products.map((p) => {
      const discount = Math.round(
        ((p.mrp - p.price) / p.mrp) * 100
      );

      return {
        id: p.id,
        name: p.name,
        price: p.price,
        mrp: p.mrp,
        images: p.images,
        category: p.category,
        storeId: p.storeId,
        createdAt: p.createdAt,
        rating: p.rating || [],
        discount,
        stock: p.stock,
      };
    });

    // Top discounted products
    const topDeals = withDiscount
      .filter(
        (p) =>
          p.discount > 5 &&
          p.price > 0 &&
          p.images?.length > 0 &&
          p.id
      )
      .sort((a, b) => {
        if (b.discount !== a.discount) {
          return b.discount - a.discount;
        }

        // Tie breaker: newest product first
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      })
      .slice(0, TOTAL_DEALS);

    // -------------------------------------
    // DAY ROTATION (12 day loop)
    // -------------------------------------

    const MS_PER_DAY = 24 * 60 * 60 * 1000;

    const epochDay = Math.floor(Date.now() / MS_PER_DAY);

    // 0 → 11
    const cycleDay = epochDay % TOTAL_DAYS;

    const start = cycleDay * DEALS_PER_DAY;

    const deals = topDeals.slice(
      start,
      start + DEALS_PER_DAY
    );

    return NextResponse.json({
      deals,
      cycleDay: cycleDay + 1,
      totalCycleDays: TOTAL_DAYS,
    });

  } catch (error) {
    console.error("DEALS API ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}