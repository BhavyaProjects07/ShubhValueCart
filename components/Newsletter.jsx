"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const COLLECTIONS = [
  {
    title: "Heritage Textiles",
    subtitle: "Authentic Indian Wear",
    desc: "Premium clothing, ethnic wear and modern family fashion.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop",
    link: "/shop?category=clothes",
    alt: "Heritage textiles clothing collection online shopping fashion wear",
  },
  {
    title: "The Spice Reserve",
    subtitle: "Premium Groceries",
    desc: "Fresh groceries, kitchen staples, snacks and household essentials.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=900&auto=format&fit=crop",
    link: "/shop?category=grocery",
    alt: "Premium grocery products online fresh groceries shopping store",
  },
  {
    title: "Artisanal Play",
    subtitle: "Kids Toys Collection",
    desc: "Learning toys, educational games and fun products for children.",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=900&auto=format&fit=crop",
    link: "/shop?category=toys",
    alt: "Kids toys collection educational toys shopping online",
  },
  {
    title: "Ayurvedic Wellness",
    subtitle: "Beauty & Cosmetics",
    desc: "Skincare, cosmetics and wellness essentials for families.",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop",
    link: "/shop?category=cosmetics",
    alt: "Beauty cosmetics skincare wellness products online shopping",
  },
  {
    title: "Festive Living",
    subtitle: "Home Essentials",
    desc: "Home utility, décor and everyday essentials for smart living.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=900&auto=format&fit=crop",
    link: "/shop",
    alt: "Home essentials decor utility products online shopping",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ExtraUI = () => {
  const sectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Shopping Collections",
    itemListElement: COLLECTIONS.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `https://www.shubhavaluecart.in${item.link}`,
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sectionSchema),
        }}
      />

      {/* Semantic SEO Section */}
      <section
        aria-labelledby="featured-collections-heading"
        className="relative py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/40 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-100/40 blur-3xl rounded-full translate-x-1/3 translate-y-1/3" />

        <main className="relative max-w-[1550px] mx-auto px-6 md:px-12 xl:px-24">
          {/* Heading Cluster */}
          <motion.header
            variants={fadeUp}
            initial="hidden"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row justify-between lg:items-end gap-8 mb-16"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-bold tracking-[0.25em] uppercase text-slate-500 mb-4">
                Discover Excellence
              </p>

              <h2
                id="featured-collections-heading"
                className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-slate-900"
              >
                Featured Collections for Smart Shopping
              </h2>

              <h3 className="mt-5 text-xl md:text-2xl font-semibold text-slate-700">
                Groceries, Fashion, Toys, Cosmetics & Home Essentials
              </h3>

              <p className="mt-5 text-slate-600 text-lg leading-8">
                Explore premium categories selected for quality,
                affordability and family convenience. Shop trusted
                products online from Shubh Value Cart.
              </p>
            </div>

            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-700 transition-colors"
            >
              View All Collections
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.header>

          {/* Article Grid */}
          <section
            aria-label="Shopping categories"
            className="grid sm:grid-cols-2 xl:grid-cols-5 gap-6"
          >
            {COLLECTIONS.map((item, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-[2rem]"
              >
                <Link
                  href={item.link}
                  className="group block rounded-[2rem] overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-6">
                      <p className="text-white/80 text-[11px] uppercase tracking-[0.22em] font-bold mb-2">
                        {item.subtitle}
                      </p>

                      <h3 className="text-white text-2xl font-bold leading-tight mb-3">
                        {item.title}
                      </h3>

                      <p className="text-white/80 text-sm leading-6 mb-4">
                        {item.desc}
                      </p>

                      <span className="inline-flex items-center gap-2 text-white font-semibold">
                        Explore
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </section>

          {/* Rich SEO Bottom Content */}
          <section className="mt-20 grid lg:grid-cols-2 gap-10 items-start">
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-black text-slate-900 mb-5">
                Why Customers Choose Shubh Value Cart
              </h3>

              <ul className="space-y-4 text-slate-600 leading-8">
                <li>✅ Trusted grocery store in Dholpur</li>
                <li>✅ Affordable prices across categories</li>
                <li>✅ Family shopping convenience</li>
                <li>✅ Toys, fashion, beauty & essentials in one place</li>
                <li>✅ Smooth and secure online shopping</li>
              </ul>
            </motion.article>

            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="rounded-3xl bg-slate-900 text-white p-8 md:p-10 shadow-2xl"
            >
              <h3 className="text-2xl font-black mb-4">
                Shop Best Products Online in Dholpur
              </h3>

              <p className="text-slate-300 leading-8 mb-6">
                Buy groceries online, kids toys, clothes,
                cosmetics and daily essentials from Shubh Value Cart.
                Trusted by local shoppers for quality and value.
              </p>

              <Link
                href="/shop"
                className="inline-flex px-6 py-3 rounded-xl bg-white text-slate-900 font-bold hover:scale-105 transition-transform"
              >
                Start Shopping
              </Link>
            </motion.article>
          </section>

          {/* Mobile CTA */}
          <div className="md:hidden mt-10">
            <Link
              href="/shop"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-slate-900 text-white font-semibold"
            >
              View All Collections
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
      </section>
    </>
  );
};

export default ExtraUI;