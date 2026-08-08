"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBasket,
  Building2,
  Headphones,
  Mail,
  ChevronRight,
  ArrowRight,
  Truck,
  ShieldCheck,
  Award,
  RefreshCw,
  Leaf,
} from "lucide-react";

/* ---------------- INLINE SOCIAL ICONS ---------------- */
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.94 9.94 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2Zm0 18.2a8.17 8.17 0 0 1-4.17-1.14l-.3-.18-3.02.79.81-2.94-.2-.3A8.18 8.18 0 1 1 12.02 20.2Zm4.5-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.4-.12-.56.13-.17.25-.65.8-.79.96-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.45-1.37-1.7-.14-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.9 2.42 1.02 2.58c.13.17 1.77 2.71 4.29 3.8.6.26 1.07.42 1.44.53.6.19 1.16.16 1.59.1.49-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z"/>
  </svg>
);
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 22v-8.44h2.83l.42-3.28h-3.25V8.16c0-.95.26-1.6 1.62-1.6h1.74V3.63C16.55 3.55 15.53 3.46 14.34 3.46c-2.48 0-4.18 1.51-4.18 4.29v2.53H7.32v3.28h2.84V22h3.34Z"/>
  </svg>
);
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 8.4s-.2-1.5-.8-2.2c-.8-.8-1.7-.8-2.1-.9C16.4 5 12 5 12 5h0s-4.4 0-7.1.3c-.4 0-1.3.1-2.1.9C2.2 6.9 2 8.4 2 8.4S1.8 10.2 1.8 12v1.9c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.2c.8.8 1.8.8 2.3.9 1.6.1 6.9.3 6.9.3s4.4 0 7.1-.3c.4 0 1.3-.1 2.1-.9.6-.7.8-2.2.8-2.2s.2-1.8.2-3.6V12c0-1.8-.2-3.6-.2-3.6ZM9.9 15.4V8.9l5.8 3.3-5.8 3.2Z"/>
  </svg>
);

const Footer = () => {
  /* ---------------- DATA ---------------- */
  const shopLinks = [
    { text: "Groceries", path: "/shop?category=grocery" },
    { text: "Personal Care", path: "/shop?category=cosmetics" },
    { text: "Home & Kitchen", path: "/shop?category=home-kitchen" },
    { text: "Baby Care", path: "/shop?category=baby-care" },
    { text: "Electronics", path: "/shop?category=electronics" },
    { text: "All Categories", path: "/shop" },
    { text: "Top Offers", path: "/shop" },
    { text: "Daily Deals", path: "/shop" },
  ];

  const companyLinks = [
    { text: "About Us", path: "/about" },
    { text: "Careers", path: "/careers" },
    { text: "Blog", path: "/blog" },
    { text: "SVC Plus", path: "/svc-plus" },
    { text: "Become a Seller", path: "/become-a-seller" },
    { text: "Franchise", path: "/franchise" },
    { text: "Sitemap", path: "/sitemap" },
  ];

  const helpLinks = [
    { text: "Contact Us", path: "/contact" },
    { text: "FAQs", path: "/faqs" },
    { text: "Shipping & Delivery", path: "/shipping-delivery" },
    { text: "Returns & Refunds", path: "/returns-refunds" },
    { text: "Cancellation Policy", path: "/cancellation-policy" },
    { text: "Privacy Policy", path: "/privacy-policy" },
    { text: "Terms & Conditions", path: "/terms" },
  ];

  const trustItems = [
    { icon: Truck, title: "Free Delivery", sub: "On orders above ₹599" },
    { icon: ShieldCheck, title: "Secure Payments", sub: "100% safe & secure" },
    { icon: Award, title: "Best Quality", sub: "Genuine products" },
    { icon: RefreshCw, title: "Easy Returns", sub: "Hassle-free returns" },
    { icon: Headphones, title: "24/7 Support", sub: "We're here to help" },
  ];

  const socials = [
    { icon: WhatsAppIcon, color: "text-green-500", href: "#" },
    { icon: FacebookIcon, color: "text-blue-600", href: "#" },
    { icon: InstagramIcon, color: "text-pink-500", href: "#" },
    { icon: YoutubeIcon, color: "text-red-600", href: "#" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-[#eef3fb] pt-10 pb-6 px-3 sm:px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1550px] mx-auto"
      >
        {/* ================= MAIN WHITE CARD ================= */}
        <motion.div
          variants={fadeUp}
          className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
        >
          {/* ---- 4 COLUMN GRID ---- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 p-6 sm:p-10 md:p-12">
            {/* SHOP */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <ShoppingBasket className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-[15px] text-slate-900">
                  Shop
                </h3>
              </div>
              <ul className="space-y-3.5">
                {shopLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="flex items-center justify-between text-[15px] text-slate-600 hover:text-blue-600 transition-colors group"
                    >
                      {item.text}
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-[15px] text-slate-900">
                  Company
                </h3>
              </div>
              <ul className="space-y-3.5">
                {companyLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="text-[15px] text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* HELP & SUPPORT */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <Headphones className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-[15px] text-slate-900">
                  Help &amp; Support
                </h3>
              </div>
              <ul className="space-y-3.5">
                {helpLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="text-[15px] text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <Mail className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-[15px] text-slate-900">
                  Get Exclusive Offers
                </h3>
              </div>
              <p className="text-[15px] text-slate-500 mb-4 leading-6">
                Sign up &amp; get the best offers delivered to your inbox.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2 mb-6"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="shrink-0 w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </form>

              <p className="text-[15px] font-bold text-blue-600 mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {socials.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={i}
                      href={s.href}
                      aria-label="social link"
                      className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:scale-110 hover:shadow-md transition-transform"
                    >
                      <Icon className={`w-4.5 h-4.5 ${s.color}`} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ---- DIVIDER ---- */}
          <div className="border-t border-gray-100" />

          {/* ---- TRUST BADGES ---- */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 px-6 sm:px-10 md:px-12 py-8">
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 lg:border-r lg:last:border-r-0 lg:border-gray-100 lg:pr-4"
                >
                  <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13.5px] sm:text-sm font-bold text-slate-900 leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[12px] sm:text-[13px] text-slate-500 leading-tight">
                      {item.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ================= ECO-FRIENDLY BANNER ================= */}
        <motion.div
          variants={fadeUp}
          className="mt-6 rounded-2xl sm:rounded-3xl bg-white border border-blue-100 px-6 sm:px-10 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center md:text-left flex-col sm:flex-row">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-lg">
                We care for the environment
              </h4>
              <p className="text-slate-500 text-sm mt-0.5">
                Eco-friendly packaging for a better tomorrow.
              </p>
            </div>
          </div>

          {/* simple globe + leaves illustration */}
          <svg
            viewBox="0 0 160 100"
            className="w-32 sm:w-40 h-auto text-blue-500 shrink-0"
            fill="none"
          >
            <circle cx="80" cy="50" r="34" fill="currentColor" opacity="0.9" />
            <path
              d="M55 35c8-6 20-8 30-4M50 55c10 4 22 4 32-2M58 70c8 4 18 4 26 0"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M25 70c6-10 18-12 22-2-6 8-16 10-22 2Z"
              fill="currentColor"
              opacity="0.35"
            />
            <path
              d="M118 30c8-8 20-6 22 4-8 6-18 4-22-4Z"
              fill="currentColor"
              opacity="0.35"
            />
            <path
              d="M126 62c-2-8 4-16 12-14 2 8-4 16-12 14Z"
              fill="currentColor"
              opacity="0.25"
            />
          </svg>
        </motion.div>

        {/* ================= COPYRIGHT ================= */}
        <motion.p
          variants={fadeUp}
          className="text-center text-[13px] sm:text-sm text-slate-500 mt-6 px-2"
        >
          © {new Date().getFullYear()} Shubh Value Cart. All rights reserved.
        </motion.p>

        <motion.p
          variants={fadeUp}
          onClick={() => window.open("https://linkedin.com/in/bhavya-sharma-b34179315", "_blank")}
          className="text-center text-[13px] sm:text-sm text-slate-500 mt-6 px-2"
        >
          © {new Date().getFullYear()} Developed by Bhavya Sharma
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default Footer;