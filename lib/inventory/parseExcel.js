import * as XLSX from "xlsx";

import {
  normalizeItemCode,
  normalizeString,
  normalizeNumber,
  normalizeStock,
  normalizeCategory,
} from "./helpers";

export default async function parseExcel(file) {
  // Read uploaded file
  const buffer = Buffer.from(await file.arrayBuffer());

  // Parse workbook
  const workbook = XLSX.read(buffer, {
    type: "buffer",
  });

  // First sheet
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // Convert sheet to JSON
  const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
  });

  const products = [];

  for (const row of rows) {
    const itemCode = normalizeItemCode(row["Item Code"]);

    // Skip invalid rows
    if (!itemCode) continue;

    products.push({
  itemCode,

  name: normalizeString(row["Name"]),

  category: normalizeCategory(row["Category"]),

  mrp: normalizeNumber(row["MRP"]),

  price: normalizeNumber(row["Selling Price"]),

  stock: normalizeStock(row["Qty"]),

  discount: normalizeNumber(row["Discount"]),

  description: normalizeString(row["Description"]),

  subCategory: normalizeString(row["Sub Category"]),

  purchasePrice: normalizeNumber(row["Purchase Price"]),

  imageUrl: normalizeString(row["Image URL"]),

  // NEW
  imagePlaceholder: `placeholder://${encodeURIComponent(
    normalizeString(row["Name"])
  )}`,
});
  }

  return products;
}