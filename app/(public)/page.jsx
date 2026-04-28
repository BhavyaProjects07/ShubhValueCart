import HomeClient from "@/components/HomeClient";


const BASE_URL = "https://www.shubhavaluecart.in";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:
      "Shubh Value Cart | Grocery Store in Dholpur | Online Shopping for Daily Needs",
    template: "%s | Shubh Value Cart",
  },

  description:
    "Shubh Value Cart is a trusted grocery store in Dholpur offering groceries, fashion, toys, cosmetics and daily essentials online at affordable prices.",

  keywords: [
    "grocery store in dholpur",
    "best supermarket dholpur",
    "online grocery dholpur",
    "daily needs store dholpur",
    "buy groceries online dholpur",
    "toy shop dholpur",
    "cosmetics shop dholpur",
    "fashion shopping dholpur",
    "Shubh Value Cart",
    "local shopping Rajasthan",
  ],

  alternates: {
    canonical: `${BASE_URL}/`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Shubh Value Cart | Best Grocery Store in Dholpur",
    description:
      "Buy groceries, toys, fashion, cosmetics and daily essentials online from Shubh Value Cart.",
    url: BASE_URL,
    siteName: "Shubh Value Cart",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Shubh Value Cart",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Shubh Value Cart",
    description:
      "Trusted grocery and daily needs store in Dholpur.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

export default function Page() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Shubh Value Cart",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-image.jpg`,
    telephone: "+91 89554 97322",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Infront of Kalimai Temple, Defence Colony",
      addressLocality: "Dholpur",
      addressRegion: "Rajasthan",
      postalCode: "328001",
      addressCountry: "IN",
    },
    areaServed: "Dholpur",
    priceRange: "₹₹",
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
          text: "Groceries, toys, fashion products, cosmetics and daily essentials are available.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Shubh Value Cart located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shubh Value Cart is located in Defence Colony, Dholpur, Rajasthan.",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shubh Value Cart",
    url: BASE_URL,
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* Hidden SEO Semantic Content */}
      <main className="sr-only">
        <h1>Shubh Value Cart – Best Grocery Store in Dholpur</h1>

        <p>
          Buy groceries, clothing, toys, cosmetics and daily
          essentials online from Shubh Value Cart in Dholpur.
        </p>

        <h2>Popular Shopping Categories</h2>
        <ul>
          <li>Grocery Products</li>
          <li>Kids Toys</li>
          <li>Fashion Wear</li>
          <li>Beauty & Cosmetics</li>
          <li>Home Essentials</li>
        </ul>

        <h2>Why Choose Shubh Value Cart</h2>
        <p>
          Affordable prices, trusted quality, local service,
          smooth online shopping and family-friendly product range.
        </p>
      </main>

      {/* Main UI */}
      <HomeClient />

      {/* GOD LEVEL INDEXABLE EXTRA SECTION */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1550px] mx-auto px-6 md:px-12 xl:px-24">
          {/* Heading */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div className="max-w-3xl">
              <p className="uppercase tracking-[0.25em] text-sm font-bold text-slate-500 mb-4">
                Discover Excellence
              </p>

              <h2 className="text-4xl md:text-6xl font-black leading-tight text-slate-900">
                Curated for the modern lifestyle.
              </h2>

              <p className="mt-5 text-slate-600 leading-8 text-lg">
                Explore premium groceries, fashion, toys,
                wellness and home essentials selected for
                quality, convenience and value.
              </p>
            </div>
          </div>

          {/* SEO Cards Grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-6">
            {[
              {
                title: "Heritage Textiles",
                subtitle: "Authentic Indian Wear",
                
                image:
                  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop",
              },
              {
                title: "The Spice Reserve",
                subtitle: "Premium Groceries",
               
                image:
                  "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=900&auto=format&fit=crop",
              },
              {
                title: "Artisanal Play",
                subtitle: "Kids Toys",
               
                image:
                  "https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=900&auto=format&fit=crop",
              },
              {
                title: "Ayurvedic Wellness",
                subtitle: "Natural Cosmetics",
                
                image:
                  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop",
              },
              {
                title: "Festive Living",
                subtitle: "Home Essentials",
               
                image:
                  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=900&auto=format&fit=crop",
              },
            ].map((item, index) => (
              <a
                key={index}
               
                className="group rounded-[2rem] overflow-hidden bg-slate-100 shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-[420px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 w-full p-7">
                    <p className="text-white/75 text-xs tracking-[0.2em] uppercase mb-2 font-bold">
                      {item.subtitle}
                    </p>

                    <h3 className="text-white text-2xl font-bold">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom SEO Text */}
          <div className="mt-16 max-w-5xl">
            <h3 className="text-3xl font-bold text-slate-900 mb-5">
              Shop Smart in Dholpur with Shubh Value Cart
            </h3>

            <p className="text-slate-600 leading-8 mb-5">
              Shubh Value Cart is a growing trusted local shopping
              destination for groceries, fashion, toys, cosmetics
              and daily essentials. We focus on affordable pricing,
              quality products and customer convenience.
            </p>

            <p className="text-slate-600 leading-8">
              Whether you are searching for a grocery store in
              Dholpur, toy shop, cosmetics store or online shopping
              for family essentials, Shubh Value Cart brings trusted
              value to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Optional existing component */}
      
    </>
  );
}