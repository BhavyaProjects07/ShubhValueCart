import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Shubh Value Cart (shubhavaluecart.in) | Grocery Store in Dholpur",
  description:
    "Shubh Value Cart is a trusted grocery and daily needs store in Dholpur offering best prices and fast delivery.",
};

export default function Page() {
  return (
    <>
      {/* ✅ SEO Content (SERVER SIDE) */}
      <main>
        <h1>Best Grocery Store in Dholpur</h1>
        <p>
          Shubh Value Cart is a trusted supermarket in Dholpur offering
          groceries, clothing, toys, and daily essentials at affordable prices.
        </p>
      </main>

      {/* ✅ Client UI */}
      <HomeClient />
    </>
  );
}