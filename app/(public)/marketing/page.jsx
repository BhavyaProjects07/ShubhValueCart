"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  TrendingUp,
  Users,
  Youtube,
  PlayCircle,
  Building2,
  ArrowRight,
  Sparkles,
  Truck,
  Apple,
} from "lucide-react";

export default function Marketing() {
  const stats = [
    { icon: <Award className="w-5 h-5 text-amber-500" />, value: "9+", label: "Years Experience" },
    { icon: <Users className="w-5 h-5 text-amber-500" />, value: "100+", label: "Happy Clients" },
    { icon: <Youtube className="w-5 h-5 text-amber-500" />, value: "20+", label: "YouTube Channels" },
    { icon: <PlayCircle className="w-5 h-5 text-amber-500" />, value: "10K+", label: "Videos Created" },
    { icon: <TrendingUp className="w-5 h-5 text-amber-500" />, value: "37M+", label: "Monthly Organic Reach" },
    { icon: <Building2 className="w-5 h-5 text-amber-500" />, value: "3", label: "Office Locations" },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-8  pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left content */}
          <motion.div
            className="lg:col-span-6 order-2 lg:order-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-amber-600 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Jain Digital Agency
            </span>

            <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
              Saurabh Jain — Digital Marketing Expert
              <span className="block text-amber-600">Grow your business, not just followers</span>
            </h1>

            <p className="mt-4 text-gray-600 max-w-xl">
              Based in Dholpur with offices in Jaipur and Delhi. We deliver creative campaigns,
              customer-first strategies and measurable growth for local businesses across Rajasthan.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/919509086545"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-3 rounded-lg font-semibold shadow hover:bg-amber-700 transition"
                aria-label="Book consultation on WhatsApp"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 border border-gray-200 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                View Portfolio
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-3 text-sm text-gray-700">
              <div className="flex flex-col items-start">
                <span className="text-amber-600 font-semibold">Jaipur</span>
                <span className="text-gray-500 text-xs">Vaishali Nagar</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-amber-600 font-semibold">Delhi</span>
                <span className="text-gray-500 text-xs">Laxmi Nagar</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-amber-600 font-semibold">Dholpur</span>
                <span className="text-gray-500 text-xs">Rajasthan</span>
              </div>
            </div>
          </motion.div>

          {/* Right images column */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-6">
            {/* Image option 1 - portrait 9:16 */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="w-full max-w-md mx-auto sm:mx-0"
            >
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white aspect-[9/16]">
                {/* 9:16 portrait image */}
                <Image
                  src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-07-26%20010717.png"
                  alt="Saurabh Jain portrait (9:16)"
                  fill
                  
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-3 text-center text-sm text-gray-600">Portrait option (9:16) — ideal for reels & stories</div>
            </motion.div>

            {/* Image option 2 - landscape 16:9 */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="w-full"
            >
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white aspect-video">
                {/* 16:9 landscape image */}
                <Image
                  src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-07-26%20010814.png"
                  alt="Saurabh Jain landscape (16:9)"
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 text-center text-sm text-gray-600">Landscape option (16:9) — ideal for website banners & YouTube</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services / Why choose */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Services that drive real growth</h2>
              <p className="mt-3 text-gray-600 max-w-2xl">
                Complete business consultation, customer magnet strategies, social media marketing,
                brand growth, news & podcast coverage — tailored for small and medium businesses in Rajasthan.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Content & Video Production</h3>
                  <p className="mt-2 text-sm text-gray-600">Short-form videos, YouTube channels, ad creatives.</p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Strategy & Growth</h3>
                  <p className="mt-2 text-sm text-gray-600">Customer-first funnels, organic reach and paid campaigns.</p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900">Personal Branding</h3>
                  <p className="mt-2 text-sm text-gray-600">Position leaders as trusted voices in their industry.</p>
                </div>

                <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900">News & Podcast Coverage</h3>
                  <p className="mt-2 text-sm text-gray-600">PR, podcast features and media outreach.</p>
                </div>
              </div>
            </div>

            <aside className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Trusted by</div>
                  <div className="font-semibold text-gray-900">100+ happy clients</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                10,000+ videos created · 37M+ monthly organic reach · Rajasthan's fastest growing team
              </div>

              <a
                href="https://wa.me/919509086545"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-md text-sm shadow hover:bg-emerald-700"
              >
                Contact on WhatsApp
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-lg bg-white border border-gray-200 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                {s.icon}
              </div>
              <div>
                <div className="text-xl font-extrabold text-gray-900">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials (simple) */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <h3 className="text-xl font-bold text-gray-900">What business owners say</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-700">"Helped us double leads in 3 months."</div>
              <div className="mt-3 text-xs text-gray-500">— Local Retailer, Jaipur</div>
            </div>
            <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-700">"Creative team delivered consistent results."</div>
              <div className="mt-3 text-xs text-gray-500">— Restaurant Owner, Delhi</div>
            </div>
            <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-700">"Professional, fast and reliable."</div>
              <div className="mt-3 text-xs text-gray-500">— Service Provider, Dholpur</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky WhatsApp CTA */}
      <a
        href="https://wa.me/919509086545"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-3 bg-emerald-600 text-white px-4 py-3 rounded-full shadow-lg lg:hidden"
        aria-label="Contact on WhatsApp"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.52 3.48A11.88 11.88 0 0012 .5C6.21.5 1.5 5.21 1.5 11c0 1.95.51 3.86 1.48 5.55L.5 23.5l6.2-2.03A11.5 11.5 0 0012 22c5.79 0 10.5-4.71 10.5-10.5 0-1.98-.56-3.83-1.98-5.02zM12 20.5c-1.1 0-2.18-.18-3.18-.52l-.23-.08-3.68 1.2 1.2-3.58-.08-.24A8.5 8.5 0 113.5 11 8.5 8.5 0 0112 20.5z" />
        </svg>
        <span className="text-sm font-medium">WhatsApp</span>
      </a>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Jain Digital Agency — Saurabh Jain. Jaipur | Delhi | Dholpur
          </div>

          <div className="flex items-center gap-4">
            <a href="#about" className="text-sm text-gray-600 hover:text-gray-800">About</a>
            <a href="#stats" className="text-sm text-gray-600 hover:text-gray-800">Stats</a>
            <a href="https://wa.me/919509086545" className="text-sm text-emerald-600 font-medium">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
