import prisma from "../lib/prisma.js"

async function main() {

  // ✅ USER (ALL REQUIRED FIELDS)
  const user = await prisma.user.create({
    data: {
      id: "test-user-id",
      name: "Test User",
      email: "test@gmail.com",
      image: "https://via.placeholder.com/150", // ✅ REQUIRED
    }
  })

  // ✅ STORE
  const store = await prisma.store.create({
    data: {
      name: "Demo Store",
      userId: user.id,
      username: "demo-store",
      description: "Test store",
      logo: "https://via.placeholder.com/150",
      email: "test@gmail.com",
      contact: "9999999999",
      address: "India"
    }
  })

  // ✅ PRODUCT
  const product = await prisma.product.create({
    data: {
      name: "Test Product",
      description: "Sample product",
      mrp: 1299,
      price: 999,
      images: ["https://via.placeholder.com/300"], // ✅ ARRAY
      category: "electronics",
      storeId: store.id
    }
  })

  console.log("✅ FULL SEED SUCCESS")
}

main()