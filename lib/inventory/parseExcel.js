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

  const productMap = new Map();

  // ============================
  // PARSE PRODUCTS (DEDUPLICATED BY ITEM CODE)
  // ============================
  for (const row of rows) {
    const itemCode = normalizeItemCode(row["item code"]);

    if (!itemCode) continue;

    const name = normalizeString(row["name"]) || itemCode;
    const category = normalizeCategory(row["category"]) || "GENERAL";
    const imageUrl = normalizeString(row["image url"]);
    const description = normalizeString(row["description"]);
    const subCategory = normalizeString(row["sub category"]);

    const product = {
      itemCode,
      name,
      category,
      mrp: normalizeNumber(row["mrp"]),
      price: normalizeNumber(row["selling price"]),
      stock: normalizeStock(row["qty"]),
      discount: normalizeNumber(row["discount"]),
      description,
      subCategory,
      purchasePrice: normalizeNumber(row["purchase price"]),
      imageUrl,
      imagePlaceholder: `placeholder://${encodeURIComponent(name)}`,
    };

    if (productMap.has(itemCode)) {
      const prev = productMap.get(itemCode);
      if (!product.imageUrl && prev.imageUrl) {
        product.imageUrl = prev.imageUrl;
      }
      if (!product.description && prev.description) {
        product.description = prev.description;
      }
    }

    productMap.set(itemCode, product);
  }

  return Array.from(productMap.values());
}