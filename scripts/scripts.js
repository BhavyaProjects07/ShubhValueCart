import XLSX from "xlsx";
import axios from "axios";
import FormData from "form-data";

// ---------------- LOAD EXCEL ----------------
const workbook = XLSX.readFile("./output.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

console.log("📦 Total Products:", data.length);

// ---------------- FILTER VALID PRODUCTS ----------------
const products = data
  .filter(p => p.Products && p.price)
  .slice(0, 2631);

if (products.length === 0) {
  console.log("❌ No valid products found");
  process.exit();
}

// ---------------- MAIN FUNCTION ----------------
async function uploadProducts() {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    try {
      console.log(`\n🚀 Uploading (${i + 1}/${products.length}):`, product.Products);

      const formData = new FormData();

      // ---------------- CLEAN DATA ----------------
      const name = product.Products?.trim() || "Test Product";

      const description =
        product.description?.trim() ||
        `${name} - High quality product`;

      const price = Number(product.price) || 0;
      const mrp = Number(product.mrp) || 0;

      const category = product.category || "General";

      // ---------------- IMAGE HANDLING ----------------
      let imageUrl = "";

      if (
        product.images &&
        typeof product.images === "string" &&
        product.images.trim().startsWith("http")
      ) {
        imageUrl = product.images.trim();
        console.log("🖼️ Using Excel Image:", imageUrl);
      } else {
        imageUrl = `https://source.unsplash.com/800x800/?${encodeURIComponent(name)}`;
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
      formData.append("inStock", "true");

      // OPTIONAL (if required by backend)
      if (product.storeId) {
        formData.append("storeId", product.storeId);
      }

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
        `❌ ERROR (${product.Products}):`,
        err.response?.data || err.message
      );
    }
  }

  console.log("\n🎉 PRODUCTS UPLOADED");
}

// ---------------- RUN ----------------
uploadProducts();