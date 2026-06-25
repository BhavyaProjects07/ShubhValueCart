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
      {/* SEO FAQ SECTION */}
<section className="bg-gradient-to-b from-slate-50 to-white py-24 lg:py-32 border-t border-slate-200">
  <div className="max-w-6xl mx-auto px-6 md:px-10">

    <div className="text-center mb-16">
      <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
        Frequently Asked Questions
      </span>

      <h2 className="mt-6 text-4xl md:text-5xl font-black text-slate-900">
        Everything You Need to Know About
        <span className="text-[#ff6b00]"> Shubh Value Cart</span>
      </h2>

      <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto leading-8">
        Find answers to the most common questions about grocery shopping,
        fashion, cosmetics, toys, household essentials, delivery and online
        shopping with Shubh Value Cart in Dholpur.
      </p>
    </div>

    <div className="space-y-5">

      {[
  {
    q: "Can I cancel my order after it has been shipped?",
    a: "No. Orders can only be cancelled before they are shipped. Once an order is marked as 'Shipped', cancellation requests cannot be accepted under any circumstances."
  },
  {
    q: "How many days do I have to report a damaged or defective product?",
    a: "Customers must report any damaged, defective or incorrect product within 48 hours of delivery. Requests submitted after the 48-hour period are not eligible for return or replacement."
  },
  {
    q: "Is an unboxing video required for return requests?",
    a: "Yes. A continuous, unedited unboxing video along with clear photographs of the product, packaging and the reported issue is mandatory for verification. Claims without the required proof may be rejected."
  },
  {
    q: "Which products are eligible for return or replacement?",
    a: "Products that are damaged, defective or incorrectly delivered may qualify for return or replacement after successful verification. Eligibility is determined based on the evidence submitted by the customer."
  },
  {
    q: "Which return requests are not accepted?",
    a: "Returns are not accepted for change of mind, products that have been used, washed or altered, items without original tags or packaging, minor colour variations caused by lighting or display settings, or requests submitted after 48 hours."
  },
  {
    q: "How long does Shubh Value Cart take to review a return request?",
    a: "Our verification team generally reviews return and replacement requests within 24 to 48 hours after receiving all the required proof and supporting information."
  },
  {
    q: "How will I receive my refund or replacement?",
    a: "Approved refunds are processed to the original payment method used during checkout. Replacements are provided subject to product availability."
  },
  {
    q: "What happens if someone submits false or fraudulent return requests?",
    a: "To protect genuine customers, Shubh Value Cart reserves the right to reject fraudulent claims and restrict or suspend accounts involved in repeated misuse of the return policy."
  }
].map((faq, index) => (
        <details
          key={index}
          className="group bg-white border border-slate-200 rounded-2xl shadow-sm open:shadow-md transition-all"
        >
          <summary className="cursor-pointer list-none flex justify-between items-center px-7 py-6">
            <h3 className="text-lg font-bold text-slate-900 pr-8">
              {faq.q}
            </h3>

            <span className="text-2xl text-[#ff6b00] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>

          <div className="px-7 pb-6">
            <p className="text-slate-600 leading-8">
              {faq.a}
            </p>
          </div>
        </details>
      ))}

    </div>

    {/* SEO Content */}

    <div className="mt-20 bg-orange-50 border border-orange-100 rounded-3xl p-10 md:p-14">

      <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
        Shop Smart in Dholpur with
        <span className="text-[#ff6b00]">
          {" "}Shubh Value Cart
        </span>
      </h3>

      <p className="text-slate-700 text-lg leading-9 mb-6">
        Shubh Value Cart is a growing trusted local shopping destination
        for groceries, fashion, toys, cosmetics and daily essentials.
        We focus on affordable pricing, quality products and customer
        convenience. Whether you need fresh groceries, personal care
        products, household essentials or fashion accessories, we aim
        to provide a seamless shopping experience for every customer in
        Dholpur.
      </p>

      <p className="text-slate-700 text-lg leading-9">
        Whether you are searching for a grocery store in Dholpur,
        toy shop, cosmetics store, fashion store or online shopping
        for family essentials, Shubh Value Cart brings trusted value
        to your doorstep. Our mission is to make everyday shopping
        simple, affordable and reliable while offering a wide range
        of quality products under one trusted local platform.
      </p>

    </div>

  </div>
</section>

      {/* Optional existing component */}
      
    </>
  );
}