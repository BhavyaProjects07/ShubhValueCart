import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

import parseExcel from "@/lib/inventory/parseExcel";
import analyzeInventory from "@/lib/inventory/analyzeInventory";

export async function POST(request) {
  const startTime = Date.now();

  try {
    // -----------------------------
    // FORM DATA
    // -----------------------------
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "Excel file is required.",
        },
        { status: 400 }
      );
    }

    const syncExisting =
      formData.get("syncExisting") === "true";

    const importNew =
      formData.get("importNew") === "true";

    // At least one operation must be selected
    if (!syncExisting && !importNew) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select at least one inventory operation.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // PARSE EXCEL
    // -----------------------------
    const excelRows = await parseExcel(file);

    // -----------------------------
    // FETCH PRODUCTS (ONE QUERY)
    // -----------------------------
    const dbProducts = await prisma.product.findMany({
      select: {
        id: true,
        itemCode: true,
        stock: true,
        name: true,
        category: true,
        price: true,
        mrp: true,
      },
    });

    // -----------------------------
    // ANALYZE INVENTORY
    // -----------------------------
    const analysis = analyzeInventory({
      excelRows,
      dbProducts,
      syncExisting,
      importNew,
    });

    // -----------------------------
    // RESPONSE
    // -----------------------------
    return NextResponse.json({
      success: true,

      summary: {
        existing: analysis.stats.existing,
        stockUpdates: analysis.stats.stockUpdates,
        newProducts: analysis.stats.newProducts,
        outOfStock: analysis.stats.outOfStock,
        unchanged: analysis.stats.unchanged,
      },

      totalRows: excelRows.length,

      options: {
        syncExisting,
        importNew,
      },

      analyzeTime: `${Date.now() - startTime} ms`,
    });

  } catch (error) {
    console.error("Inventory Preview Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}