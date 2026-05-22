import XLSX from "xlsx";
import axios from "axios";

// ---------------- SETTINGS ----------------
const API_BASE =
  "http://localhost:3000/api/store";

// ---------------- LOAD EXCEL ----------------
const workbook =
  XLSX.readFile("./stocks2_with_images.xlsx");

const sheet =
  workbook.Sheets[
    workbook.SheetNames[0]
  ];

const data =
  XLSX.utils.sheet_to_json(sheet);

console.log(
  `📦 Total Rows: ${data.length}`
);

// ---------------- NORMALIZE EXCEL ----------------
const excelProducts = data
  .map((p) => ({
    name:
      p.Products
      ?.toString()
      .trim()
      .toLowerCase(),

    category:
      p.Parent_Category
      ?.toString()
      .trim()
  }))
  .filter(
    p =>
    p.name &&
    p.category
  );

console.log(
  `✅ Excel Products: ${excelProducts.length}`
);

// ---------------- MAIN ----------------
async function updateCategories() {

  try {

    console.log(
      "📥 Fetching products from API..."
    );

    // fetch all existing products
    const response =
      await axios.get(
        `${API_BASE}/product`
      );

    const dbProducts =
      response.data;

    console.log(
      `✅ DB Products: ${dbProducts.length}`
    );

    // name -> db product map
    const productMap =
      new Map();

    dbProducts.forEach(
      product => {

        const key =
          product.name
          ?.trim()
          .toLowerCase();

        if(key){
          productMap.set(
            key,
            product
          );
        }

      }
    );

    let updated = 0;
    let skipped = 0;

    // update products
    for(
      let i=0;
      i<excelProducts.length;
      i++
    ){

      const excelProduct =
        excelProducts[i];

      const dbProduct =
        productMap.get(
          excelProduct.name
        );

      if(
        !dbProduct
      ){

        skipped++;

        console.log(
          `⛔ Not Found: ${excelProduct.name}`
        );

        continue;
      }

      try{

        console.log(
          `🔄 Updating (${i+1}/${excelProducts.length}) ${dbProduct.name}`
        );

        await axios.patch(
          `${API_BASE}/product/${dbProduct._id}`,
          {
            category:
            excelProduct.category
          }
        );

        updated++;

        console.log(
          `✅ ${dbProduct.name} → ${excelProduct.category}`
        );

      }
      catch(err){

        console.log(
          `❌ Failed: ${dbProduct.name}`
        );

        console.log(
          err.response?.data ||
          err.message
        );

      }

    }

    console.log(
      `\n🎉 Done`
    );

    console.log(
      `Updated: ${updated}`
    );

    console.log(
      `Skipped: ${skipped}`
    );

  }
  catch(err){

    console.log(
      err.response?.data ||
      err.message
    );

  }

}

updateCategories();