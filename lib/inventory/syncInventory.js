import prisma from "@/lib/prisma";
import executeBatch from "./executeBatch";

export default async function syncInventory({
  analysis,
  storeId,
}) {
  // -----------------------------
  // UPDATE EXISTING PRODUCTS
  // -----------------------------
  const updates = analysis.updates.map((product) =>
    prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: product.stock,
        inStock: product.inStock,
      },
    })
  );

  // -----------------------------
  // CREATE NEW PRODUCTS
  // -----------------------------
  const creates = analysis.creates.map((product) => {
    // If Excel already contains an image URL, use it.
    // Otherwise create a searchable placeholder.
    const image =
      product.imageUrl && product.imageUrl.trim() !== ""
        ? product.imageUrl
        : `search://${encodeURIComponent(
            `${product.itemCode} ${product.name} ${product.category}`
          )}`;

    return prisma.product.create({
      data: {
        itemCode: product.itemCode,

        name: product.name,

        description: product.description || "",

        mrp: product.mrp,

        price: product.price,

        purchasePrice: product.purchasePrice || null,

        images: [image],

        category: product.category,

        subCategory: product.subCategory || "",

        stock: product.stock,

        inStock: product.stock > 0,

        hasSizes: false,

        sizes: null,

        offlineSoldQuantity: 0,

        storeId,
      },
    });
  });

  // -----------------------------
  // MARK MISSING PRODUCTS OUT OF STOCK
  // -----------------------------
  const outOfStock = analysis.outOfStock.map((product) =>
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

  // -----------------------------
  // EXECUTE IN BATCHES
  // -----------------------------
  await executeBatch(updates);

  await executeBatch(creates);

  await executeBatch(outOfStock);
}