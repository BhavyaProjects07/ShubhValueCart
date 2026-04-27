import ShopClient from "@/components/ShopClient";

const BASE_URL = "https://shubhavaluecart.in";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:
      "Shop Grocery, Toys, Clothes & Cosmetics Online | Shubh Value Cart",
    template: "%s | Shubh Value Cart",
  },

  description:
    "Buy groceries, toys, clothes, cosmetics and daily essentials online at best prices from Shubh Value Cart. Trusted shopping experience with quality products and smooth delivery.",

  keywords: [
    "shop online india",
    "buy grocery online",
    "online grocery store",
    "buy toys online",
    "kids toys online",
    "clothes shopping online",
    "cosmetics online shopping",
    "daily essentials online",
    "best grocery prices",
    "Shubh Value Cart",
    "Shubh Value Cart shop",
    "Dholpur grocery store",
    "Dholpur online shopping",
    "buy products in Dholpur",
    "local online store Rajasthan",
  ],

  category: "shopping",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: `${BASE_URL}/shop`,
  },

  openGraph: {
    title: "Shop Grocery, Toys, Clothes & Cosmetics Online",
    description:
      "Explore groceries, toys, clothes, cosmetics and daily essentials online at Shubh Value Cart.",
    url: `${BASE_URL}/shop`,
    siteName: "Shubh Value Cart",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Shubh Value Cart Shop",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Shubh Value Cart Shop",
    description:
      "Buy groceries, toys, clothes, cosmetics and essentials online at best prices.",
    images: [`${BASE_URL}/og-image.jpg`],
  },

  verification: {
    google: "ADD_YOUR_GOOGLE_VERIFICATION_CODE",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function ShopPage({ searchParams }) {
  const category = searchParams?.category || "";
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page || 1);

  const minPrice = Number(searchParams?.minPrice || 0);
  const maxPrice = Number(searchParams?.maxPrice || 10000);
  const minRating = Number(searchParams?.minRating || 0);
  const minDiscount = Number(searchParams?.minDiscount || 0);

  const initialFilters = {
    category,
    search,
    page,
    minPrice,
    maxPrice,
    minRating,
    minDiscount,
  };

  const canonicalUrl = `${BASE_URL}/shop`;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Shubh Value Cart Shop",
    url: canonicalUrl,
    description:
      "Buy groceries, toys, clothes, cosmetics and daily essentials online.",
    isPartOf: {
      "@type": "WebSite",
      name: "Shubh Value Cart",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Shubh Value Cart",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: canonicalUrl,
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shubh Value Cart",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What products are available at Shubh Value Cart?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can shop groceries, toys, clothes, cosmetics and daily essentials.",
        },
      },
      {
        "@type": "Question",
        name: "Why shop from Shubh Value Cart?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We focus on value pricing, quality products and a smooth online shopping experience.",
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Semantic SEO Heading */}
      <header className="sr-only">
        <h1>Shop Grocery, Toys, Clothes & Cosmetics Online</h1>
        <p>
          Buy groceries, toys, clothing, cosmetics and daily essentials from
          Shubh Value Cart.
        </p>
      </header>

      {/* Main Shop UI */}
      <ShopClient initialFilters={initialFilters} />

      {/* Rich SEO Content */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24 py-14">
        <h2 className="text-3xl font-bold mb-5">
          Buy Best Products Online at Shubh Value Cart
        </h2>

        <p className="text-gray-600 leading-8 mb-6">
          Welcome to Shubh Value Cart, your trusted online destination for
          groceries, toys, clothes, cosmetics and daily essentials. We aim to
          provide affordable pricing, quality products and a smooth shopping
          experience for every customer.
        </p>

        <p className="text-gray-600 leading-8 mb-6">
          Browse multiple categories, compare products and shop with confidence.
          Whether you need home essentials, kids toys, beauty products or
          fashion items, our collection is designed for convenience and value.
        </p>

        <h3 className="text-2xl font-semibold mb-4">
          Why Choose Shubh Value Cart?
        </h3>

        <ul className="list-disc pl-6 text-gray-600 leading-8 space-y-2">
          <li>Affordable prices on daily essentials</li>
          <li>Wide selection across categories</li>
          <li>Trusted quality products</li>
          <li>Simple and smooth online shopping</li>
          <li>Growing local brand with customer focus</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-10 mb-4">
          Popular Categories
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/shop?category=grocery" className="underline">
            Grocery Products
          </a>
           
          <a href="/shop?category=toys" className="underline">
            Toys Collection
          </a>
          <a href="/shop?category=clothes" className="underline">
            Clothes & Fashion
          </a>
          <a href="/shop?category=cosmetics" className="underline">
            Cosmetics & Beauty
          </a>
        </div>
      </section>
    </>
  );
}