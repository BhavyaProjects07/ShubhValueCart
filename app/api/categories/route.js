export async function GET() {
  return Response.json({
    categories: [
      { name: "Food & Grocery", slug: "food-grocery" },
      { name: "Staples & Cooking", slug: "staples-cooking" },
      { name: "Personal Care", slug: "personal-care" },
      { name: "Home & Cleaning", slug: "home-cleaning" },
      { name: "Baby Care", slug: "baby-care" },
      { name: "Toys & Kids", slug: "toys-kids" },
      { name: "Household Essentials", slug: "household" },
      { name: "Stationery", slug: "stationery" },
      { name: "Electronics", slug: "electronics" },
      { name: "Fashion", slug: "fashion" },
    ],
  })
}

