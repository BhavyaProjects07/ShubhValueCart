"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Truck } from "lucide-react";

const COLLECTIONS = [
  {
    title: "Heritage Textiles",
    subtitle: "Authentic Indian Wear",
    keyword: "clothes shopping online",
    desc: "Premium family fashion, ethnic wear and modern clothing.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    link: "/shop?category=clothes",
    alt: "Heritage textiles clothes shopping online fashion wear collection",
  },
  {
    title: "The Spice Reserve",
    subtitle: "Premium Groceries",
    keyword: "buy grocery online",
    desc: "Fresh groceries, staples, snacks and kitchen essentials.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    link: "/shop?category=grocery",
    alt: "Premium grocery products online fresh grocery shopping store",
  },
  {
    title: "Artisanal Play",
    subtitle: "Kids Toys",
    keyword: "toy shop online",
    desc: "Learning toys, games and fun products for children.",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=1200&auto=format&fit=crop",
    link: "/shop?category=toys",
    alt: "Kids toys collection educational toys online shopping",
  },
  {
    title: "Ayurvedic Wellness",
    subtitle: "Beauty & Cosmetics",
    keyword: "cosmetics online shopping",
    desc: "Skincare, beauty and wellness essentials.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    link: "/shop?category=cosmetics",
    alt: "Beauty cosmetics skincare products online shopping",
  },
];

const ExtraUI = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Shopping Categories",
    itemListElement: COLLECTIONS.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.title,
      url: `https://www.shubhavaluecart.in${item.link}`,
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* SEO SECTION */}
      <section
        aria-labelledby="seo-featured-shopping"
        className="relative py-24 lg:py-32 overflow-hidden bg-[#f8fafc]"
      >
        {/* Unique layered backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_35%)]" />
        <div className="absolute top-20 left-10 w-56 h-56 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-cyan-200/20 blur-3xl" />

        <main className="relative max-w-[1600px] mx-auto px-6 md:px-12 xl:px-24">
          {/* HEADER */}
          <header className="grid lg:grid-cols-2 gap-10 items-end mb-16">
            <article>
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-slate-500 font-bold mb-4">
                AI Optimized Shopping Collections
              </p>

              <h2
                id="seo-featured-shopping"
                className="text-4xl md:text-6xl font-black text-slate-900 leading-tight"
              >
                Discover Products
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                  Built for Modern Families
                </span>
              </h2>

              <h3 className="mt-5 text-xl md:text-2xl font-semibold text-slate-700">
                Grocery, Toys, Clothes & Cosmetics in One Destination
              </h3>

              <p className="mt-6 text-slate-600 leading-8 max-w-2xl">
                Explore expertly curated categories designed for value,
                convenience and trust. Structured for users and optimized for
                modern AI search indexing.
              </p>
            </article>

            <article className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
                <Sparkles className="w-6 h-6 text-indigo-600 mb-3" />
                <h3 className="font-bold text-slate-900">Trending Picks</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Fast moving products across categories.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-cyan-600 mb-3" />
                <h3 className="font-bold text-slate-900">Trusted Quality</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Products selected for reliability.
                </p>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
                <Truck className="w-6 h-6 text-indigo-600 mb-3" />
                <h3 className="font-bold text-slate-900">Easy Shopping</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Smooth browsing and family convenience.
                </p>
              </div>
            </article>
          </header>

          {/* UNIQUE ASYMMETRIC GRID */}
          <section
            aria-label="Featured category cards"
            className="grid lg:grid-cols-12 gap-6"
          >
            {/* Large Feature Card */}
            <article className="lg:col-span-5 rounded-[2rem] overflow-hidden bg-slate-900 text-white relative min-h-[620px] group">
              <Image
                src={COLLECTIONS[1].image}
                alt={COLLECTIONS[1].alt}
                fill
                className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width:1024px) 100vw, 40vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

              <div className="absolute bottom-0 p-8 md:p-10">
                <p className="uppercase tracking-[0.25em] text-xs text-white/75 mb-3 font-bold">
                  {COLLECTIONS[1].subtitle}
                </p>

                <h3 className="text-4xl font-black mb-4">
                  {COLLECTIONS[1].title}
                </h3>

                <p className="text-white/80 leading-8 mb-6">
                  Buy grocery online with trusted staples, snacks,
                  grains and kitchen essentials for everyday living.
                </p>

                <Link
                  href={COLLECTIONS[1].link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-bold"
                >
                  Shop Grocery
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>

            {/* Side Grid */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {COLLECTIONS.filter((_, i) => i !== 1).map((item, i) => (
                <article
                  key={i}
                  className="group rounded-[2rem] overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-2xl transition-all"
                >
                  <Link href={item.link} className="block">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                      <div className="absolute bottom-0 p-6">
                        <p className="text-white/75 text-xs tracking-[0.22em] uppercase font-bold mb-2">
                          {item.subtitle}
                        </p>

                        <h3 className="text-white text-2xl font-bold mb-2">
                          {item.title}
                        </h3>

                        <p className="text-white/80 text-sm leading-6">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">
                        {item.keyword}
                      </span>

                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* SEO CONTENT STRIP */}
          <section className="mt-16 grid lg:grid-cols-3 gap-6">
            <article className="rounded-3xl bg-white border border-slate-200 p-8">
              <h3 className="text-xl font-black text-slate-900 mb-4">
                Best Grocery Store in Dholpur
              </h3>
              <p className="text-slate-600 leading-8">
                Shop groceries, snacks, staples and daily essentials with
                convenience and trusted value.
              </p>
            </article>

            <article className="rounded-3xl bg-white border border-slate-200 p-8">
              <h3 className="text-xl font-black text-slate-900 mb-4">
                Family Shopping Categories
              </h3>
              <p className="text-slate-600 leading-8">
                Explore toys, clothes, cosmetics and household needs from one
                destination.
              </p>
            </article>

            <article className="rounded-3xl bg-slate-900 text-white p-8">
              <h3 className="text-xl font-black mb-4">
                Start Smart Shopping
              </h3>
              <p className="text-slate-300 leading-8 mb-5">
                Browse trending collections and premium essentials online.
              </p>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 font-bold"
              >
                Visit Shop
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          </section>
        </main>
      </section>
    </>
  );
};

export default ExtraUI;