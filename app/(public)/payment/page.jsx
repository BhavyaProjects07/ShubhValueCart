const BASE_URL = "https://www.shubhavaluecart.in";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: "Temporary Maintenance | Shubh Value Cart",

  description:
    "Shubh Value Cart is temporarily unavailable and will return shortly.",

  applicationName: "Shubh Value Cart",

  authors: [{ name: "Shubh Value Cart" }],

  creator: "Shubh Value Cart",

  publisher: "Shubh Value Cart",

  category: "eCommerce",

  alternates: {
    canonical: `${BASE_URL}/`,
  },

  robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: false,
      follow: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Temporary Maintenance",
    description:
      "Shubh Value Cart is temporarily unavailable and will return shortly.",
    url: `${BASE_URL}/maintenance`,
    siteName: "Shubh Value Cart",
    locale: "en_IN",
    type: "website",
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
    title: "Temporary Maintenance",
    description:
      "Shubh Value Cart is temporarily unavailable and will return shortly.",
    images: [`${BASE_URL}/og-image.jpg`],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  verification: {
    google: "uPaS5EP9TRR7BAzZNK7IR6oR8BeJoh47xHoydYAFJXU",
  },
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8">
          Website Temporarily Unavailable
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8">
          This website is currently unavailable due to Payment not done to devloper
        </p>

        <p className="text-lg text-slate-500 leading-8 mb-12">
          Pehle 8000Rs pay karo developer ko , fir website pehle jaise chalne lagegi
        </p>

        <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200">
          <p className="text-slate-800 text-lg font-medium">
            If you are the website owner, please contact the developer to
            restore full access.
          </p>
        </div>
      </div>
    </main>
  );
}