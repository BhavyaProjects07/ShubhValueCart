import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Shubh Value Cart - Dholpur's Largest Retail Store",
  description:
    "Learn about Shubh Value Cart and founder Shubham Goyal. Discover Dholpur's largest retail store offering groceries, clothing, toys, and daily essentials at affordable prices.",

  keywords: [
    "Shubh Value Cart",
    "Shubham Goyal",
    "Dholpur supermarket",
    "best store in Dholpur",
    "grocery store Rajasthan",
    "retail store Dholpur",
  ],

  alternates: {
    canonical: "https://www.shubhavaluecart.in/about",
  },

  openGraph: {
    title: "About Shubh Value Cart",
    description:
      "Explore the journey of Shubh Value Cart and founder Shubham Goyal in Dholpur.",
    url: "https://www.shubhavaluecart.in/about",
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

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return <AboutClient />;
}