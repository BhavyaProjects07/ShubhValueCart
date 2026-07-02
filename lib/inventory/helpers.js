// Remove ".00", spaces and always return string
export function normalizeItemCode(itemCode) {
  return String(itemCode || "")
    .replace(".00", "")
    .trim();
}

// Safe string
export function normalizeString(value) {
  return String(value || "").trim();
}

// Safe number
export function normalizeNumber(value) {
  const number = Number(value);

  return Number.isNaN(number) ? 0 : number;
}

// Stock can never be negative
export function normalizeStock(value) {
  const stock = normalizeNumber(value);

  return stock < 0 ? 0 : stock;
}

// Normalize category
export function normalizeCategory(category) {
  return normalizeString(category).toUpperCase();
}

/**
 * Compare inventory fields.
 * Current business rule:
 * Only stock changes should trigger an update.
 */
export function hasProductChanged(dbProduct, excelProduct) {
  return dbProduct.stock !== excelProduct.stock;
}

// Calculate preview statistics
export function calculateStats({
  existing,
  updates,
  creates,
  outOfStock,
  unchanged,
}) {
  return {
    existing,
    stockUpdates: updates.length,
    newProducts: creates.length,
    outOfStock: outOfStock.length,
    unchanged,
  };
}

// Split array into batches
export function chunkArray(array, size = 250) {
  const chunks = [];

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}