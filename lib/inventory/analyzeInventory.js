import {
  hasProductChanged,
  calculateStats,
} from "./helpers";

export default function analyzeInventory({
  excelRows,
  dbProducts,
  syncExisting,
  importNew,
}) {
  // ----------------------------------
  // FAST LOOKUP MAP
  // ----------------------------------

  const dbMap = new Map();

  for (const product of dbProducts) {
    dbMap.set(product.itemCode, product);
  }

  // ----------------------------------
  // TRACK EXCEL PRODUCTS
  // ----------------------------------

  const excelCodes = new Set();

  // ----------------------------------
  // OPERATIONS
  // ----------------------------------

  const updates = [];

  const creates = [];

  const outOfStock = [];

  // ----------------------------------
  // STATS
  // ----------------------------------

  let existing = 0;

  let unchanged = 0;

  let stockUpdates = 0;

  let priceUpdates = 0;

  // ----------------------------------
  // LOOP THROUGH EXCEL
  // ----------------------------------

  for (const row of excelRows) {
    excelCodes.add(row.itemCode);

    const dbProduct = dbMap.get(row.itemCode);

    // ==================================
    // EXISTING PRODUCT
    // ==================================

    if (dbProduct) {
      existing++;

      if (!syncExisting) {
        unchanged++;
        continue;
      }

      // Check individual changes
      const stockChanged =
        Number(dbProduct.stock) !== Number(row.stock);

      const priceChanged =
        Number(dbProduct.price) !== Number(row.price) ||
        Number(dbProduct.mrp) !== Number(row.mrp);

      // Nothing changed
      if (!hasProductChanged(dbProduct, row)) {
        unchanged++;
        continue;
      }

      // Track stock changes separately
      if (stockChanged) {
        stockUpdates++;
      }

      // Track price/MRP changes separately
      if (priceChanged) {
        priceUpdates++;
      }

      updates.push({
        id: dbProduct.id,

        stock: row.stock,

        inStock: row.stock > 0,

        // Price fields
        price: row.price,

        mrp: row.mrp,

        // Product information
        category: row.category,

        name: row.name,
      });

      continue;
    }

    // ==================================
    // NEW PRODUCT
    // ==================================

    if (importNew) {
      creates.push(row);
    }
  }

  // ----------------------------------
  // FIND PRODUCTS MISSING IN EXCEL
  // ----------------------------------

  if (syncExisting) {
    for (const product of dbProducts) {
      if (excelCodes.has(product.itemCode)) continue;

      // Already Out Of Stock
      if (product.stock === 0) continue;

      outOfStock.push({
        id: product.id,
      });
    }
  }

  // ----------------------------------
  // RETURN
  // ----------------------------------

  return {
    updates,

    creates,

    outOfStock,

    stats: calculateStats({
      existing,
      updates,
      creates,
      outOfStock,
      unchanged,

      // Separate statistics
      stockUpdates,
      priceUpdates,
    }),
  };
}