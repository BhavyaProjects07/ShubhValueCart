import prisma from "@/lib/prisma";
import executeBatch from "./executeBatch";

export default async function syncInventory({
  analysis,
  storeId,
}) {
  // ============================================================
  // FETCH EXISTING PRODUCTS
  // ============================================================
  //
  // itemCode is treated as the unique identity of a product
  // within a store.
  //
  // This prevents:
  //
  // OLD:
  // itemCode 123459 → ₹10
  // itemCode 123459 → ₹20  ❌ duplicate
  //
  // NEW:
  // itemCode 123459 → ₹20  ✅ existing product updated
  //
  // ============================================================

  const existingProducts =
    await prisma.product.findMany({
      select: {
        id: true,
        itemCode: true,
      },
    });

  // ------------------------------------------------------------
  // Create itemCode → product map
  // ------------------------------------------------------------

  const productMap = new Map();

  for (const product of existingProducts) {
    if (!product || !product.itemCode) continue;

    const itemCode = String(product.itemCode)
      .trim()
      .replace(/\.0+$/, "")
      .trim();

    if (!itemCode) continue;

    productMap.set(itemCode, product);
  }

  // ============================================================
  // UPDATE EXISTING PRODUCTS
  // ============================================================

  const updates = [];

  for (const product of analysis.updates || []) {
    if (!product || !product.id) {
      console.warn(
        `⚠️ Update skipped: missing product ID for ${product?.name || "unknown"}`
      );
      continue;
    }

    updates.push(
      prisma.product.update({
        where: {
          id: product.id,
        },

        data: {
          // ----------------------------------------------------
          // STOCK
          // ----------------------------------------------------

          stock: product.stock,

          inStock:
            product.stock > 0,

          // ----------------------------------------------------
          // PRICE
          // ----------------------------------------------------

          price: product.price,

          mrp: product.mrp,

          // ----------------------------------------------------
          // PRODUCT INFORMATION
          // ----------------------------------------------------

          name:
            product.name,

          description:
            product.description || "",

          category:
            product.category,

          subCategory:
            product.subCategory || "",

          purchasePrice:
            product.purchasePrice || null,

          // ----------------------------------------------------
          // IMAGE
          // ----------------------------------------------------

          ...(product.imageUrl &&
          product.imageUrl.trim() !== ""
            ? {
                images: [
                  product.imageUrl,
                ],
              }
            : {}),
        },
      })
    );
  }

  // ============================================================
  // CREATE / UPDATE PRODUCTS FROM analysis.creates
  // ============================================================
  //
  // IMPORTANT:
  //
  // Even if the analysis says "create", we check itemCode AGAIN.
  //
  // If itemCode already exists in DB:
  //     → UPDATE (only if existing.id is valid)
  //
  // If itemCode is duplicated within this batch:
  //     → SKIP duplicate to prevent null id update or unique violation
  //
  // If itemCode does not exist:
  //     → CREATE
  // ============================================================

  const creates = [];
  const createAsUpdates = [];
  const queuedCreates = new Set();

  for (const product of analysis.creates || []) {
    if (!product) continue;

    const itemCode =
      product.itemCode != null
        ? String(product.itemCode).trim().replace(/\.0+$/, "").trim()
        : "";

    // ----------------------------------------------------------
    // Existing itemCode in DB → UPDATE
    // ----------------------------------------------------------

    if (itemCode && productMap.has(itemCode)) {
      const existing = productMap.get(itemCode);

      // Only perform update if existing product has a valid database ID!
      if (existing && existing.id) {
        console.log(
          `🔄 Existing item detected: ${itemCode} → updating ${product.name}`
        );

        createAsUpdates.push(
          prisma.product.update({
            where: {
              id: existing.id,
            },

            data: {
              // PRICE
              price: product.price,
              mrp: product.mrp,

              // STOCK
              stock: product.stock,

              inStock:
                product.stock > 0,

              // PRODUCT DATA
              name:
                product.name,

              description:
                product.description || "",

              category:
                product.category,

              subCategory:
                product.subCategory || "",

              purchasePrice:
                product.purchasePrice || null,

              // IMAGE
              ...(product.imageUrl &&
              product.imageUrl.trim() !== ""
                ? {
                    images: [
                      product.imageUrl,
                    ],
                  }
                : {}),
            },
          })
        );
      } else {
        console.warn(
          `⚠️ Duplicate itemCode in new creations batch: ${itemCode} → skipping redundant update without id`
        );
      }

      continue;
    }

    // ----------------------------------------------------------
    // Guard against duplicates within this batch of creates
    // ----------------------------------------------------------

    if (itemCode) {
      if (queuedCreates.has(itemCode)) {
        console.warn(
          `⚠️ Duplicate itemCode in creates batch: ${itemCode} → skipping duplicate create`
        );
        continue;
      }
      queuedCreates.add(itemCode);
      // Register in productMap with id: null so later items hit the check
      productMap.set(itemCode, {
        id: null,
        itemCode,
      });
    }

    // ----------------------------------------------------------
    // New itemCode → CREATE
    // ----------------------------------------------------------

    const image =
      product.imageUrl &&
      product.imageUrl.trim() !== ""
        ? product.imageUrl
        : `search://${encodeURIComponent(
            `${product.itemCode || ""} ${product.name || ""} ${product.category || ""}`
          )}`;

    creates.push(
      prisma.product.create({
        data: {
          itemCode:
            product.itemCode,

          name:
            product.name,

          description:
            product.description || "",

          mrp:
            product.mrp,

          price:
            product.price,

          purchasePrice:
            product.purchasePrice || null,

          images: [
            image,
          ],

          category:
            product.category,

          subCategory:
            product.subCategory || "",

          stock:
            product.stock,

          inStock:
            product.stock > 0,

          hasSizes:
            false,

          sizes:
            null,

          offlineSoldQuantity:
            0,

          storeId,
        },
      })
    );
  }

  // ============================================================
  // MARK MISSING PRODUCTS OUT OF STOCK
  // ============================================================

  const outOfStock = (analysis.outOfStock || [])
    .filter((product) => product && product.id)
    .map((product) =>
      prisma.product.update({
        where: {
          id: product.id,
        },

        data: {
          stock: 0,

          inStock: false,
        },
      })
    );

  // ============================================================
  // EXECUTE DATABASE OPERATIONS
  // ============================================================

  console.log(
    `📊 Inventory Sync`
  );

  console.log(
    `🔄 Normal Updates: ${updates.length}`
  );

  console.log(
    `💰 Price/Existing Updates: ${createAsUpdates.length}`
  );

  console.log(
    `🆕 New Products: ${creates.length}`
  );

  console.log(
    `📦 Out Of Stock: ${outOfStock.length}`
  );

  // Existing products
  if (updates.length > 0) {
    await executeBatch(updates);
  }

  // Products incorrectly classified as "creates"
  // but already exist by itemCode
  if (createAsUpdates.length > 0) {
    await executeBatch(createAsUpdates);
  }

  // Truly new products
  if (creates.length > 0) {
    await executeBatch(creates);
  }

  // Missing products
  if (outOfStock.length > 0) {
    await executeBatch(outOfStock);
  }

  console.log(
    "✅ Inventory sync completed"
  );
}