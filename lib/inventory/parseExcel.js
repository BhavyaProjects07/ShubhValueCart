import * as XLSX from "xlsx";

import {
  normalizeItemCode,
  normalizeString,
  normalizeNumber,
  normalizeStock,
  normalizeCategory,
} from "./helpers";

export default async function parseExcel(file) {
  // ============================
  // READ EXCEL FILE
  // ============================
  const buffer = Buffer.from(await file.arrayBuffer());

  // ============================
  // PARSE WORKBOOK
  // ============================
  const workbook = XLSX.read(buffer, {
    type: "buffer",
  });

  // ============================
  // FIRST SHEET
  // ============================
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // ============================
  // CONVERT TO JSON
  // ============================
  const rawRows = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
  });

  // ============================
  // NORMALIZE ALL COLUMN NAMES
  // Removes:
  // - Tabs
  // - Extra spaces
  // - New lines
  // - Case differences
  // ============================
  const rows = rawRows.map((row) => {
    const normalized = {};

    for (const key of Object.keys(row)) {
      const cleanKey = key
        .replace(/\s+/g, " ") // collapse tabs/newlines/multiple spaces
        .trim()
        .toLowerCase();

      normalized[cleanKey] = row[key];
    }

    return normalized;
  });

  const products = [];

  // ============================
  // PARSE PRODUCTS
  // ============================
  for (const row of rows) {
    const itemCode = normalizeItemCode(row["item code"]);

    if (!itemCode) continue;

    products.push({
      itemCode,

      name: normalizeString(row["name"]),

      category: normalizeCategory(row["category"]),

      mrp: normalizeNumber(row["mrp"]),

      price: normalizeNumber(row["selling price"]),

      stock: normalizeStock(row["qty"]),

      discount: normalizeNumber(row["discount"]),

      description: normalizeString(row["description"]),

      subCategory: normalizeString(row["sub category"]),

      purchasePrice: normalizeNumber(row["purchase price"]),

      imageUrl: normalizeString(row["image url"]),

      imagePlaceholder: `placeholder://${encodeURIComponent(
        normalizeString(row["name"])
      )}`,
    });
  }

  return products;
}