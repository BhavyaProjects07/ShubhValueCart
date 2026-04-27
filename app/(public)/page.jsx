import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Shubh Value Cart | Grocery Store in Dholpur",
  description:
    "Trusted grocery and daily needs store in Dholpur offering groceries, fashion, toys and essentials.",
  alternates: {
    canonical: "https://www.shubhavaluecart.in/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <main className="sr-only">
        <h1>Shubh Value Cart – Best Grocery Store in Dholpur</h1>
        <p>
          Buy groceries, clothing, toys and daily essentials online from Shubh Value Cart in Dholpur.
        </p>
      </main>

      <HomeClient />
    </>
  );
}