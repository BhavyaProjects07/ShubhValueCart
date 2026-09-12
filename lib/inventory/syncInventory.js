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
      where: {
        storeId,
      },
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
    if (!product.itemCode) continue;

    const itemCode =
      String(product.itemCode).trim();

    if (!itemCode) continue;

    productMap.set(itemCode, product);
  }

  // ============================================================
  // UPDATE EXISTING PRODUCTS
  // ============================================================

  const updates = [];

  for (const product of analysis.updates || []) {
    if (!product.id) {
      console.warn(
        `⚠️ Update skipped: missing product ID for ${product.name}`
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
  // If itemCode already exists:
  //     → UPDATE
  //
  // If itemCode does not exist:
  //     → CREATE
  //
  // This is the protection against duplicate products.
  // ============================================================

  const creates = [];
  const createAsUpdates = [];

  for (const product of analysis.creates || []) {
    const itemCode =
      product.itemCode != null
        ? String(product.itemCode).trim()
        : "";

    // ----------------------------------------------------------
    // Existing itemCode → UPDATE
    // ----------------------------------------------------------

    if (
      itemCode &&
      productMap.has(itemCode)
    ) {
      const existing =
        productMap.get(itemCode);

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

      continue;
    }

    // ----------------------------------------------------------
    // New itemCode → CREATE
    // ----------------------------------------------------------

    const image =
      product.imageUrl &&
      product.imageUrl.trim() !== ""
        ? product.imageUrl
        : `search://${encodeURIComponent(
            `${product.itemCode} ${product.name} ${product.category}`
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

    // Add to map immediately so duplicate itemCodes
    // inside the same Excel file cannot create multiple
    // products during this sync.
    if (itemCode) {
      productMap.set(
        itemCode,
        {
          id: null,
          itemCode,
        }
      );
    }
  }

  // ============================================================
  // MARK MISSING PRODUCTS OUT OF STOCK
  // ============================================================

  const outOfStock =
    (analysis.outOfStock || []).map(
      (product) =>
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
  await executeBatch(
    updates
  );

  // Products incorrectly classified as "creates"
  // but already exist by itemCode
  await executeBatch(
    createAsUpdates
  );

  // Truly new products
  await executeBatch(
    creates
  );

  // Missing products
  await executeBatch(
    outOfStock
  );

  console.log(
    "✅ Inventory sync completed"
  );
}