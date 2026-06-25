"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck, MapPin, Users, Clock,
  Sparkles, Heart, IndianRupee, Award,
  ShoppingBag, Store, Tag,
} from "lucide-react";

const CATEGORIES = [
  {
    title: "Groceries",
    desc: "Staples, spices & essentials",
    tag: "buy grocery online",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop",
    link: "/shop?category=grocery",
    alt: "Fresh Indian groceries online shopping Dholpur",
  },
  {
    title: "Clothes",
    desc: "Ethnic wear & modern styles",
    tag: "clothes shopping online",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=600&auto=format&fit=crop",
    link: "/shop?category=clothes",
    alt: "Ethnic wear family clothes shopping online Dholpur",
  },
  {
    title: "Toys",
    desc: "Fun & learning for all ages",
    tag: "toy shop online",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=600&auto=format&fit=crop",
    link: "/shop?category=toys",
    alt: "Kids toys educational games online toy shop Dholpur",
  },
  {
    title: "Cosmetics",
    desc: "Skincare & wellness",
    tag: "cosmetics online",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop",
    link: "/shop?category=cosmetics",
    alt: "Beauty skincare cosmetics online shopping Dholpur",
  },
];

const WHY_US = [
  {
    icon: <Sparkles className="w-5 h-5 text-blue-700" />,
    bg: "bg-blue-50",
    title: "Curated selection",
    desc: "Every product hand-picked for quality, value and everyday reliability.",
  },
  {
    icon: <Heart className="w-5 h-5 text-red-700" />,
    bg: "bg-red-50",
    title: "Family-first store",
    desc: "From toddler toys to daily groceries — one trip covers it all.",
  },
  {
    icon: <IndianRupee className="w-5 h-5 text-green-700" />,
    bg: "bg-green-50",
    title: "Honest pricing",
    desc: "Competitive prices on everything, no hidden costs or surprises.",
  },
  {
    icon: <Store className="w-5 h-5 text-purple-700" />,
    bg: "bg-purple-50",
    title: "4,000 sq. ft. of variety",
    desc: "Dholpur's largest open-format store under one roof.",
  },
];

const TRUST = [
  { icon: <ShieldCheck className="w-6 h-6 text-[#2874f0]" />, title: "Trusted quality", sub: "Hand-picked products" },
  { icon: <MapPin className="w-6 h-6 text-[#2874f0]" />, title: "Local roots", sub: "Proudly from Dholpur" },
  { icon: <Users className="w-6 h-6 text-[#2874f0]" />, title: "25+ team members", sub: "Here to serve you" },
  { icon: <Clock className="w-6 h-6 text-[#2874f0]" />, title: "Open daily", sub: "Convenient store hours" },
];

const SEO_CARDS = [
  {
    title: "Best grocery store in Dholpur",
    desc: "Buy groceries online — fresh staples, snacks, grains and kitchen essentials with trusted value and same-day availability.",
  },
  {
    title: "Clothes & toys in Rajasthan",
    desc: "Shop ethnic wear, modern clothing and educational toys for kids at Dholpur's largest family retail destination.",
  },
  {
    title: "Cosmetics & beauty online",
    desc: "Skincare, ayurvedic wellness and beauty products from trusted brands — all at honest prices, only at Shubh Value Cart.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "Shubh Value Cart",
      description:
        "Dholpur's largest open-format retail store offering groceries, toys, clothes, and cosmetics.",
      url: "https://www.shubhavaluecart.in",
      telephone: "+918955497322",
      email: "shubhvaluecart@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "0, M/S Bajrang Agency, Shreeram Mandir Ke Pass, Gadarpura Road",
        addressLocality: "Dholpur",
        addressRegion: "Rajasthan",
        postalCode: "328001",
        addressCountry: "IN",
      },
      founder: { "@type": "Person", name: "Shubham Goyal" },
      numberOfEmployees: { "@type": "QuantitativeValue", value: 25 },
    },
    {
      "@type": "ItemList",
      name: "Shopping Categories at Shubh Value Cart",
      itemListElement: CATEGORIES.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.title,
        url: `https://www.shubhavaluecart.in${c.link}`,
      })),
    },
  ],
};

const AboutSection = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section
        aria-labelledby="svc-about-heading"
        className="bg-[#f0f2f5] py-5 px-5 flex flex-col gap-4"
      >
        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[340px]"
        >
          {/* Left */}
          <div className="flex flex-col justify-center px-10 py-12 lg:py-16">
            <p className="text-m font-bold tracking-[0.14em] uppercase text-[#2874f0] mb-4">
              Dholpur's #1 Retail Store
            </p>
            <h1
              id="svc-about-heading"
              className="text-4xl font-bold text-gray-900 leading-tight mb-4"
            >
              Your family's{" "}
              <span className="text-[#2874f0]">everything store</span>
            </h1>
            <p className="text-[15px] text-gray-500 leading-7 mb-8 max-w-sm">
              One destination for groceries, toys, clothes and cosmetics —
              built for modern families in Dholpur, Rajasthan.
            </p>
            <div className="flex gap-8">
              {[
                { val: "₹20Cr+", lbl: "Business value" },
                { val: "4,000", lbl: "Sq. ft." },
                { val: "25+", lbl: "Team" },
              ].map((s) => (
                <div key={s.lbl}>
                  <p className="text-3xl font-bold text-[#2874f0]">{s.val}</p>
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mt-1.5">
                    {s.lbl}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="relative bg-[#0d0d1a] min-h-[260px]">
            <Image
              src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-04-12%20000842.png?q=80&w=1000&auto=format&fit=crop"
              alt="Shubh Value Cart retail store interior Dholpur Rajasthan"
              fill
              className="object-cover opacity-75"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">Shubh Value Cart</p>
                <p className="text-white/60 text-xs mt-0.5">
                  Gadarpura Road, Dholpur, Rajasthan 328001
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Trust bar ── */}
        <div className="bg-white rounded-2xl grid grid-cols-2 md:grid-cols-4">
          {TRUST.map((t, i) => (
            <div
              key={t.title}
              className={`flex items-center gap-4 px-6 py-6 ${
                i < TRUST.length - 1 ? "border-r border-gray-100" : ""
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                {t.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{t.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Categories ── */}
        <div className="bg-white rounded-2xl p-8">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-gray-400 mb-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-gray-100" />
            Shop by category
            <span className="flex-1 h-px bg-gray-100" />
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.title}
                href={cat.link}
                className="group rounded-2xl overflow-hidden bg-gray-50 hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
                aria-label={`${cat.tag} at Shubh Value Cart Dholpur`}
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-base font-bold text-gray-900">{cat.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-semibold text-[#2874f0] bg-blue-50 px-2.5 py-1 rounded-md">
                    <Tag className="w-3 h-3" /> {cat.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Why us + Founder ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Why us */}
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Why families choose us
            </h2>
            <div className="flex flex-col gap-5">
              {WHY_US.map((w) => (
                <div key={w.title} className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl ${w.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    {w.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">
                      {w.title}
                    </p>
                    <p className="text-sm text-gray-500 leading-6">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Founder */}
          <div className="bg-[#0d0d1a] rounded-2xl overflow-hidden flex flex-col">
            <div className="relative h-56">
              <Image
                src="https://ik.imagekit.io/rsjsqdge7/IMG_8116.JPEG?q=80&w=700&auto=format&fit=crop"
                alt="Shubham Goyal founder CEO Shubh Value Cart Dholpur"
                fill
                className="object-cover object-top opacity-85"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] to-transparent" />
            </div>
            <div className="px-7 pb-8 flex flex-col flex-1">
              <span className="inline-flex items-center gap-1.5 bg-white/8 border border-white/12 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/60 mb-4 w-fit">
                <Award className="w-3 h-3" /> Our founder
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                Shubham Goyal
              </h3>
              <p className="text-sm text-white/55 leading-7 mb-4">
                From personal hardship to building Dholpur's most trusted
                business empire — leading in steel, cement, and now modern
                retail.
              </p>
              <div className="border-l-2 border-[#2874f0] pl-4 text-sm italic text-white/75 leading-7">
                "Courage, clarity of vision, and relentless effort turn even
                the hardest beginnings into remarkable success."
              </div>
              <div className="flex gap-6 mt-6 pt-5 border-t border-white/8">
                {[
                  { val: "₹20Cr+", lbl: "Valuation" },
                  { val: "4,000", lbl: "Sq. ft." },
                  { val: "25+", lbl: "Team" },
                ].map((s) => (
                  <div key={s.lbl}>
                    <p className="text-xl font-bold text-[#2874f0]">{s.val}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35 mt-1">
                      {s.lbl}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="bg-[#2874f0] rounded-2xl px-10 py-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-[22px] font-bold text-white mb-1.5">
              Visit us or shop online
            </h3>
            <p className="text-sm text-blue-200">
              Gadarpura Road, near Shreeram Mandir · Dholpur 328001 · +91 89554 97322
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 bg-white text-[#2874f0] font-bold text-[15px] px-7 py-3.5 rounded-xl hover:scale-105 transition-transform whitespace-nowrap"
          >
            <ShoppingBag className="w-5 h-5" /> Start shopping
          </Link>
        </div>

        {/* ── SEO strip ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SEO_CARDS.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl px-6 py-5">
              <h4 className="text-sm font-bold text-gray-900 mb-2">{s.title}</h4>
              <p className="text-[13px] text-gray-500 leading-6">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutSection;