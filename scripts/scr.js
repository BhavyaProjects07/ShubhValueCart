import * as XLSX from "xlsx";
import fs from "fs";

// =======================================
// CHANGE THIS TO YOUR EXCEL FILE
// =======================================
const FILE = "STOCK DETEILS (3).xlsx";

// =======================================
// READ EXCEL
// =======================================
const buffer = fs.readFileSync(FILE);

const workbook = XLSX.read(buffer, {
  type: "buffer",
});

const sheet = workbook.Sheets[workbook.SheetNames[0]];

const rows = XLSX.utils.sheet_to_json(sheet, {
  defval: "",
});

console.log("\n======================================");
console.log("TOTAL ROWS :", rows.length);
console.log("======================================\n");

// =======================================
// ALL COLUMN NAMES
// =======================================

console.log("DETECTED COLUMN NAMES\n");

Object.keys(rows[0]).forEach((col, index) => {
  console.log(`${index + 1}. [${col}]`);
});

console.log("\n======================================\n");

// =======================================
// FIRST 10 ROWS
// =======================================

console.log("FIRST 10 ROWS\n");

rows.slice(0, 10).forEach((row, i) => {
  console.log(`ROW ${i + 1}`);

  console.log({
    itemCode: row["Item Code"],
    name: row["Name"],
    category: row["Category"],
    mrp: row["MRP"],
    sellingPrice: row["Selling Price"],
    qty: row["Qty"],
    discount: row["Discount"],
    purchasePrice: row["Purchase Price"],
    description: row["Description"],
    subCategory: row["Sub Category"],
    imageUrl: row["Image URL"],
  });

  console.log("----------------------------------------");
});

// =======================================
// CHECK SELLING PRICE
// =======================================

console.log("\n======================================");
console.log("CHECKING SELLING PRICE");
console.log("======================================\n");

let invalid = 0;

rows.forEach((row, index) => {
  const value = row["Selling Price"];

  if (
    value === "" ||
    value === undefined ||
    value === null ||
    Number(value) === 0 ||
    Number.isNaN(Number(value))
  ) {
    invalid++;

    console.log({
      excelRow: index + 2,
      itemCode: row["Item Code"],
      name: row["Name"],
      sellingPrice: value,
      type: typeof value,
    });
  }
});

console.log("\n----------------------------------------");
console.log("INVALID PRICE ROWS :", invalid);
console.log("----------------------------------------");

// =======================================
// CHECK RAW VALUES OF FIRST ROW
// =======================================

console.log("\n======================================");
console.log("RAW FIRST ROW");
console.log("======================================\n");

console.dir(rows[0], { depth: null });

// =======================================
// FIND SIMILAR COLUMN NAMES
// =======================================

console.log("\n======================================");
console.log("COLUMN SEARCH");
console.log("======================================\n");

const keys = Object.keys(rows[0]);

const targets = [
  "Selling Price",
  "SellingPrice",
  "Selling price",
  "selling price",
  "Price",
];

targets.forEach((target) => {
  console.log(`\nSearching for "${target}"`);

  const found = keys.find(
    (k) => k.trim().toLowerCase() === target.trim().toLowerCase()
  );

  console.log(found ? `FOUND -> [${found}]` : "NOT FOUND");
});

console.log("\n======================================");
console.log("DONE");
console.log("======================================");