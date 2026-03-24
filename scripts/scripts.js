import XLSX from "xlsx";
import axios from "axios";
import FormData from "form-data";

// ---------------- LOAD EXCEL ----------------
const workbook = XLSX.readFile("./Updated_Final_Filtered_Stock2.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

console.log("📦 Total Products:", data.length);

// ---------------- GET TOP 5 VALID PRODUCTS ----------------
const products = data
  .filter(p => p.Name && p["Selling Price"])
  .slice(0, 25);

if (products.length === 0) {
  console.log("❌ No valid products found");
  process.exit();
}

// ---------------- MAIN FUNCTION ----------------
async function uploadProducts() {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    try {
      console.log(`\n🚀 Uploading (${i + 1}/5):`, product.Name);

      const formData = new FormData();

      // ---------------- CLEAN DATA ----------------
      const name = product.Name?.trim() || "Test Product";

      // ✅ FIXED DESCRIPTION
      let description = "";
      if (product.Description && product.Description.trim() !== "") {
        description = product.Description.trim();
      } else if (product["Variant Name"]) {
        description = `${product.Name} - ${product["Variant Name"]}`;
      } else {
        description = `${product.Name} - High quality product`;
      }

      const price = Number(product["Selling Price"]) || 0;
      const mrp = Number(product.MRP) || 0;

      const category = product.Parent_Category || "Food & Grocery";

      // ---------------- IMAGE HANDLING ----------------
      let imageUrl = "";

      if (
        product.Image &&
        typeof product.Image === "string" &&
        product.Image.trim().startsWith("http")
      ) {
        imageUrl = product.Image.trim();
        console.log("🖼️ Using Excel Image:", imageUrl);
      } else {
        imageUrl = `https://source.unsplash.com/800x800/?${encodeURIComponent(
          product.Name || "product"
        )}`;
        console.log("⚠️ Fallback Image Used:", imageUrl);
      }

      // ---------------- VALIDATION ----------------
      if (!name || price <= 0 || mrp <= 0 || !category) {
        console.log("⛔ Skipping invalid product");
        continue;
      }

      // ---------------- APPEND DATA ----------------
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("mrp", mrp);
      formData.append("category", category);

      formData.append("imageUrl", imageUrl);

      formData.append("hasSizes", "false");
      formData.append("sizes", JSON.stringify({}));

      // ✅ IMPORTANT (FOR PRODUCT VISIBILITY)
      formData.append("inStock", "true");

      // ---------------- API CALL ----------------
      const res = await axios.post(
        "http://localhost:3000/api/store/product",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      console.log("✅ SUCCESS:", res.data);

    } catch (err) {
      console.error(
        `❌ ERROR (${product.Name}):`,
        err.response?.data || err.message
      );
    }
  }

  console.log("\n🎉 TOP 5 PRODUCTS UPLOADED");
}

// ---------------- RUN ----------------
uploadProducts();