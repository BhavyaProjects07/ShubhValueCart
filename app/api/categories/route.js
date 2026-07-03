export async function GET() {
  return Response.json({
    categories: [
      { name: "Groceries", slug: "food-grocery" },
      { name: "Cooking", slug: "staples-cooking" },
      { name: "Body Care", slug: "personal-care" },
      { name: "Home Cleaning", slug: "home-cleaning" },
      { name: "Baby Care", slug: "baby-care" },
      { name: "Toys", slug: "toys-kids" },
      { name: "Household", slug: "household" },
      { name: "Stationery", slug: "stationery" },
      { name: "Electronics", slug: "electronics" },
      { name: "Fashion", slug: "fashion" },
    ],
  })
}

