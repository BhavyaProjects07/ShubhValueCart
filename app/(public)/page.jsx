import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Shubh Value Cart (shubhavaluecart.in) | Grocery Store in Dholpur",
  description:
    "Shubh Value Cart is a trusted grocery and daily needs store in Dholpur offering best prices and fast delivery.",
};

export default function Page() {
  return (
    <>
      {/* ✅ Structured Data (SEO BOOST) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Shubh Value Cart",
            url: "https://shubhavaluecart.in",
            telephone: "+91XXXXXXXXXX",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Infront of Kalimai Temple",
              addressLocality: "Dholpur",
              addressRegion: "Rajasthan",
              postalCode: "328001",
              addressCountry: "IN",
            },
          }),
        }}
      />

      {/* ✅ Client Component */}
      <HomeClient />
    </>
  );
}