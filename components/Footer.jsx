"use client";

import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { motion } from "framer-motion";

const Footer = () => {
  /* ---------------- DATA ---------------- */
  const productLinks = [
    { text: "Buy Grocery Online", path: "/shop?category=grocery" },
    { text: "Kids Toys Store", path: "/shop?category=toys" },
    { text: "Clothes Shopping", path: "/shop?category=clothes" },
    { text: "Cosmetics Online", path: "/shop?category=cosmetics" },
    { text: "Daily Essentials", path: "/shop" },
    { text: "Best Deals Today", path: "/shop" },
  ];

  const companyLinks = [
    { text: "Home", path: "/" },
    { text: "Shop", path: "/shop" },
    { text: "About Us", path: "/about" },
    { text: "Contact Us", path: "/contact" },
    { text: "Privacy Policy", path: "/privacy-policy" },
    { text: "Terms & Conditions", path: "/terms" },
  ];

  const localSeoLinks = [
    { text: "Grocery Store in Dholpur", path: "/shop" },
    { text: "Best Supermarket Dholpur", path: "/shop" },
    { text: "Online Shopping Dholpur", path: "/shop" },
    { text: "Cosmetics Shop Dholpur", path: "/shop" },
    { text: "Toy Shop Dholpur", path: "/shop" },
    { text: "Daily Needs Store Rajasthan", path: "/shop" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <footer className="relative bg-[#1f2937] text-white overflow-hidden border-t border-slate-700">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-slate-500/10 blur-3xl opacity-30 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-100 blur-3xl opacity-30 rounded-full translate-x-1/3 translate-y-1/3" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-[1550px] mx-auto px-6 md:px-12 xl:px-24 pt-20 pb-10"
      >
        {/* TOP CTA */}
        <motion.div
          variants={fadeUp}
          className="mb-16 rounded-3xl bg-gradient-to-r from-slate-700 via-slate-600 to-indigo-600 text-white p-8 md:p-12 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="uppercase tracking-[0.25em] text-sm text-white mb-3">
                Trusted Local Shopping Brand
              </p>

              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4">
                Shop Smart With Shubh Value Cart
              </h2>

              <p className="text-white/90 leading-8 max-w-xl">
                Buy groceries, toys, clothes, cosmetics and daily
                essentials at affordable prices with trusted quality.
              </p>
            </div>

            <div className="flex md:justify-end">
              <Link
                href="/shop"
                className="inline-flex px-8 py-4 rounded-2xl bg-white text-green-700 font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-14 mb-16">
          {/* BRAND */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              {assets?.logo ? (
                <Image
                  src={assets.logo}
                  alt="Shubh Value Cart"
                  width={180}
                  height={55}
                  className="object-contain"
                />
              ) : (
                <span className="text-3xl font-black">
                  SHUBH VALUE CART
                </span>
              )}
            </Link>

            <p className="text-gray-600 leading-8 max-w-md mb-8">
              Shubh Value Cart is a trusted online shopping destination
              for groceries, toys, clothes, cosmetics and daily needs.
              Built for value, convenience and smart family shopping.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-gray-200 p-4">
                <p className="text-2xl font-black text-green-600">149+</p>
                <p className="text-sm text-gray-500">Google Reviews</p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-200 p-4">
                <p className="text-2xl font-black text-green-600">4.9★</p>
                <p className="text-sm text-gray-500">Customer Rating</p>
              </div>
            </div>
          </motion.div>

          {/* LINKS */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* PRODUCTS */}
            <motion.div variants={fadeUp}>
              <h3 className="font-black text-sm tracking-[0.2em] uppercase mb-6">
                Shop Categories
              </h3>

              <ul className="space-y-3">
                {productLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* COMPANY */}
            <motion.div variants={fadeUp}>
              <h3 className="font-black text-sm tracking-[0.2em] uppercase mb-6">
                Company
              </h3>

              <ul className="space-y-3">
                {companyLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* LOCAL SEO */}
            <motion.div variants={fadeUp}>
              <h3 className="font-black text-sm tracking-[0.2em] uppercase mb-6">
                Popular Searches
              </h3>

              <ul className="space-y-3">
                {localSeoLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* CONTACT SEO BLOCK */}
        <motion.div
          variants={fadeUp}
          className="grid md:grid-cols-3 gap-6 mb-14"
        >
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <h4 className="font-bold mb-2">Address</h4>
            <p className="text-gray-600 text-sm leading-7">
              Infront of Kalimai Temple, Defence Colony,
              Dholpur, Rajasthan 328001, India
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <h4 className="font-bold mb-2">Email</h4>
            <p className="text-gray-600 text-sm">
              shubhvaluecart@gmail.com
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <h4 className="font-bold mb-2">Phone</h4>
            <p className="text-gray-600 text-sm">
              +91 89554 97322
            </p>
          </div>
        </motion.div>

        {/* BOTTOM */}
        <motion.div
          variants={fadeUp}
          className="pt-8 border-t border-gray-200 flex flex-col lg:flex-row gap-4 lg:items-center justify-between"
        >
          <p className="text-sm text-gray-500 leading-7">
            © 2026 <span className="font-bold text-gray-900">
              Shubh Value Cart
            </span>. All rights reserved. Trusted online grocery,
            toys, cosmetics and shopping store in Dholpur.
          </p>

          <p>Developed by Bhavya Sharma</p>

          <div className="flex flex-wrap gap-5 text-sm">
            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-green-600"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-gray-500 hover:text-green-600"
            >
              Terms
            </Link>

            <Link
              href="/shop"
              className="text-gray-500 hover:text-green-600"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;