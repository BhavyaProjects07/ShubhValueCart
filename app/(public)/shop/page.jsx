import ShopClient from "@/components/ShopClient";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";


const categories = [
  {
    title: "Fresh Grocery",
    desc: "Rice, pulses, snacks & essentials",
    slug: "grocery",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=900&auto=format&fit=crop",
    priority: true,
  },
  {
    title: "Kids Toys",
    desc: "Cars, games & learning toys",
    slug: "toys",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Fashion Wear",
    desc: "Men, women & kids fashion",
    slug: "clothes",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Beauty Care",
    desc: "Makeup, skincare & wellness",
    slug: "cosmetics",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop",
  },
];

const CategoryCard = memo(function CategoryCard({ item, priority = false }) {
  return (
    <Link
      href={`/shop?category=${item.slug}`}
      prefetch={true}
      className="min-w-[280px] sm:min-w-[320px] rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 group will-change-transform"
      aria-label={item.title}
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width:768px) 280px, 320px"
          quality={72}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-xl mb-1 text-gray-900">
          {item.title}
        </h3>

        <p className="text-sm text-gray-500 leading-6">
          {item.desc}
        </p>
      </div>
    </Link>
  );
});

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
  const sliderItems = [...categories, ...categories];
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
      <section className="max-w-[1550px] mx-auto px-4 sm:px-6  xl:px-24 py-0 overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto mb-14">
        <span className="inline-flex px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
          Explore Shubh Value Cart
        </span>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5 text-gray-900">
          Buy Best Products Online at{" "}
          <span className="text-green-600">
            Shubh Value Cart
          </span>
        </h2>

        <p className="text-gray-600 text-lg leading-8">
          Shop groceries, toys, clothes, cosmetics and daily essentials
          with trusted quality, affordable prices and smooth delivery.
        </p>
      </div>

      {/* Sliding Categories */}
      <div className="relative mb-24">
  <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

  {/* Non-clickable slider */}
  <div className="flex gap-6 w-max animate-shopslide pointer-events-none select-none">
    {sliderItems.map((item, index) => (
      <div key={`${item.slug}-${index}`}>
        <CategoryCard
          item={item}
          priority={index === 0}
        />
      </div>
    ))}
  </div>
</div>

      {/* Lower Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Why Customers Choose Us
          </h3>

          <ul className="space-y-4 text-gray-600 leading-7">
            <li>✅ Affordable pricing across categories</li>
            <li>✅ Trusted quality products</li>
            <li>✅ Smooth and secure shopping</li>
            <li>✅ Grocery, toys, fashion & cosmetics</li>
            <li>✅ Growing trusted local brand</li>
          </ul>
        </div>

        {/* Right */}
        <div className="rounded-3xl p-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl">
          <h4 className="text-3xl font-bold mb-4">
            Trusted by Smart Shoppers
          </h4>

          <p className="leading-8 text-white/90 mb-6">
            Shubh Value Cart is becoming a preferred destination for
            quality products, affordable pricing and family shopping
            convenience.
          </p>

          <Link
            href="/shop"
            prefetch={true}
            className="inline-flex px-6 py-3 bg-white text-green-700 rounded-xl font-semibold hover:scale-105 transition-transform"
          >
            Start Shopping
          </Link>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-16 text-center max-w-4xl mx-auto">
        <p className="text-gray-500 leading-8">
          Buy groceries online, toys for kids, cosmetics, clothes and
          everyday essentials at Shubh Value Cart. Trusted local online
          store serving smart shoppers with quality and value.
        </p>
      </div>

      {/* Optimized Animation */}
      
    </section>
    </>
  );
}