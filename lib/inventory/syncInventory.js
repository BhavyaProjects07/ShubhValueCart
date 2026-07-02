import prisma from "@/lib/prisma";

import executeBatch from "./executeBatch";

export default async function syncInventory({
  analysis,
}) {
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

  const creates = analysis.creates.map((product) =>
    prisma.product.create({
      data: {
        itemCode: product.itemCode,

        name: product.name,

        description: "",

        mrp: product.mrp,

        price: product.price,

        purchasePrice: null,

        images: ["/placeholder.png"],

        category: product.category,

        subCategory: "",

        stock: product.stock,

        inStock: product.stock > 0,

        hasSizes: false,

        sizes: null,

        offlineSoldQuantity: 0,

        storeId:
          process.env.DEFAULT_STORE_ID,
      },
    })
  );

  const outOfStock = analysis.outOfStock.map(
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

  await executeBatch(updates);

  await executeBatch(creates);

  await executeBatch(outOfStock);
}