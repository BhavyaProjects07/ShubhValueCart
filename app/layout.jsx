
import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";

if (typeof window !== "undefined") {
  window.onerror = function (msg, url, line, col, error) {
    document.body.innerHTML = `
      <pre style="
        padding:16px;
        background:#0f172a;
        color:#ff4d4f;
        white-space:pre-wrap;
        font-size:14px;
      ">
ERROR:
${msg}

FILE:
${url}:${line}:${col}

STACK:
${error?.stack}
      </pre>
    `
  }
}

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
    "Best mart in Dholpur"
  ],

  openGraph: {
    title: "Shubh Value Cart",
    description:
      "Best grocery & daily needs store in Dholpur with great prices.",
    url: "https://shubhavaluecart.in",
    siteName: "Shubh Value Cart",
    images: [
      {
        url: "/logo.png", // make sure this exists
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
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

            {/* Vercel Web Analytics */}
            <Analytics />
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
