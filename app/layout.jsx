import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  metadataBase: new URL("https://shubhavaluecart.in"),

  title: {
    default: "Shubh Value Cart - Best Grocery Store in Dholpur",
    template: "%s | Shubh Value Cart",
  },

  description:
    "Shop groceries, clothing, toys & daily essentials at Shubh Value Cart, Dholpur. Best prices with fast delivery.",

  keywords: [
    "Shubh Value Cart",
    "Grocery store Dholpur",
    "Online shopping Dholpur",
    "Daily essentials India",
    "Best mart in Dholpur",
    "cheap grocery India",
    "best supermarket near me",
  ],

 verification: {
  google: "ABkkgK6T2caUmUVZh8fG6gXk02XftfWPBeC8zyVQEkc",
},

  alternates: {
    canonical: "https://shubhavaluecart.in",
  },

  openGraph: {
    title: "Shubh Value Cart",
    description:
      "Best grocery & daily needs store in Dholpur with great prices.",
    url: "https://shubhavaluecart.in",
    siteName: "Shubh Value Cart",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shubh Value Cart",
    description:
      "Best grocery & daily needs store in Dholpur with great prices.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
  },
},
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased`}>
          <StoreProvider>
            <Toaster />
            {children}
            <Analytics />
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}