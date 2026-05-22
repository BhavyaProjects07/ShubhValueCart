import XLSX from "xlsx";
import axios from "axios";
import FormData from "form-data";

// ---------------- SETTINGS ----------------
const CONCURRENT_UPLOADS = 5;
const BATCH_DELAY = 1500;
const API_URL = "http://localhost:3000/api/store/product";

// ---------------- HELPER ----------------
const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

// ---------------- LOAD EXCEL ----------------
const workbook = XLSX.readFile("./stocks2_with_images.xlsx");

const sheet =
  workbook.Sheets[
    workbook.SheetNames[0]
  ];

const data =
  XLSX.utils.sheet_to_json(sheet);

console.log(
  "📦 Total Rows:",
  data.length
);

// ---------------- NORMALIZE EXCEL DATA ----------------
const products = data
  .map((p) => ({
    name:
      p.Products?.toString().trim() || "",

    description:
      p.Description?.toString().trim() || "",

    price:
      Number(
        p["Selling Price"]
      ) || 0,

    mrp:
      Number(
        p.MRP
      ) || 0,

    parentCategory:
      p.Parent_Category
        ?.toString()
        .trim() || "General",

    childCategory:
      p.Category
        ?.toString()
        .trim() || "Misc",

    qty:
      Number(
        p.Qty
      ) || 0,

    stockValue:
      Number(
        p["Stock Value"]
      ) || 0,

    image:
      p.images
        ?.toString()
        .trim() || "",

    department:
      p.Department
        ?.toString()
        .trim() || "",

    branch:
      p["Branch Name"]
        ?.toString()
        .trim() || "",

    unit:
      p.Unit
        ?.toString()
        .trim() || "",

    itemCode:
      p["Item Code"]
        ?.toString()
        .trim() || "",
  }))
  .filter(
    (p) =>
      p.name &&
      p.price > 0
  );

console.log(
  "✅ Valid Products:",
  products.length
);

if (products.length === 0) {
  console.log(
    "❌ No valid products found"
  );

  process.exit();
}

// ---------------- SINGLE PRODUCT ----------------
async function uploadSingleProduct(
  product,
  index
) {
  try {

    console.log(
      `🚀 Uploading (${index + 1}/${products.length}): ${product.name}`
    );

    const formData =
      new FormData();

    const category = product.parentCategory;

    const description =
      product.description ||
      `${product.name} - Premium Quality Product`;

      
    // actual image only
    const imageUrl =
      product.image &&
      product.image.startsWith(
        "http"
      )
        ? product.image
        : "";

    const stock =
      product.stockValue;

    // validation
    if (
      !product.name ||
      product.price <= 0 ||
      product.mrp <= 0 ||
      !imageUrl
    ) {
      console.log(
        `⛔ Skipped: ${product.name}`
      );

      return;
    }

    formData.append(
      "name",
      product.name
    );

    formData.append(
      "description",
      description
    );

    formData.append(
      "price",
      product.price.toString()
    );

    formData.append(
      "mrp",
      product.mrp.toString()
    );

    formData.append(
      "category",
      category
    );

    formData.append(
      "stock",
      stock.toString()
    );

    formData.append(
      "inStock",
      stock > 0
        ? "true"
        : "false"
    );

    formData.append(
      "hasSizes",
      "false"
    );

    formData.append(
      "sizes",
      JSON.stringify({})
    );

    formData.append(
      "imageUrl",
      imageUrl
    );

    formData.append(
      "department",
      product.department
    );

    formData.append(
      "branch",
      product.branch
    );

    formData.append(
      "unit",
      product.unit
    );

    formData.append(
      "itemCode",
      product.itemCode
    );

    const res =
      await axios.post(
        API_URL,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
          timeout: 30000,
          maxBodyLength:
            Infinity,
        }
      );

    console.log(
      `✅ Success: ${product.name}`
    );

    return res.data;

  } catch (err) {

    console.error(
      `❌ ERROR (${product.name})`
    );

    console.error(
      err.response?.data ||
      err.message
    );

    return null;
  }
}

// ---------------- BATCH UPLOAD ----------------
async function uploadProducts() {

  for (
    let i = 0;
    i < products.length;
    i += CONCURRENT_UPLOADS
  ) {

    const batch =
      products.slice(
        i,
        i +
        CONCURRENT_UPLOADS
      );

    console.log(
      `\n📦 Processing Batch ${
        Math.floor(
          i /
          CONCURRENT_UPLOADS
        ) + 1
      }`
    );

    await Promise.all(
      batch.map(
        (
          product,
          index
        ) =>
          uploadSingleProduct(
            product,
            i +
            index
          )
      )
    );

    console.log(
      `⏳ Waiting ${BATCH_DELAY}ms`
    );

    await sleep(
      BATCH_DELAY
    );
  }

  console.log(
    "\n🎉 ALL PRODUCTS UPLOADED"
  );
}

// ---------------- START ----------------
uploadProducts();