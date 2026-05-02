"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const heroBanners = [
  {
    id: 1,
    image: "https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-04-12%20195306.png?tr=w-1600,q-60",
    badge: "Mega Sale",
    title: "Shubh Value Cart",
    subtitle: "Up to 20% OFF on Groceries and SkinCare",
    color: "from-black/70 via-black/70 to-black/70",
    accent: "bg-blue-500",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=60",
    badge: "Trending Now",
    title: "Fashion Carnival",
    subtitle: "Min 50% OFF on Premium Brands",
    color: "from-orange-900/95 via-orange-900/80 to-transparent",
    accent: "bg-orange-500",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1600&q=60",
    badge: "New Arrivals",
    title: "Home Essentials",
    subtitle: "Upgrade Your Living Space Today",
    color: "from-purple-900/95 via-purple-900/80 to-transparent",
    accent: "bg-purple-500",
  },
  {
    id: 4,
    image: "https://ik.imagekit.io/rsjsqdge7/Shubh%20Value%20Cart%20cosmetic%20_20251223_225607_0000.png?tr=w-1600,q-60",
    badge: "Cosmetics Sale",
    title: "Beauty Bliss",
    subtitle: "Discover Your Perfect Look with 10% OFF",
    color: "from-red-900/95 via-red-900/80 to-transparent",
    accent: "bg-red-500",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slide (optimized)
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroBanners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="relative w-full h-[350px] sm:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ✅ OPTIMIZED IMAGE */}
      <Image
        key={heroBanners[current].id}
        src={heroBanners[current].image}
        alt={heroBanners[current].title}
        fill
        priority={current === 0}
        sizes="100vw"
        quality={50}
        className="object-cover transition-opacity duration-500 opacity-100"
      />

      {/* OVERLAY */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${heroBanners[current].color} flex items-center`}
      >
        <div className="max-w-[1600px] w-full mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl text-white">
            <span
              className={`inline-block ${heroBanners[current].accent} text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider`}
            >
              {heroBanners[current].badge}
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight drop-shadow-2xl">
              {heroBanners[current].title}
            </h2>

            <p className="text-lg sm:text-2xl font-medium mb-8 text-white/90">
              {heroBanners[current].subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <button className="bg-[#ff9900] hover:bg-[#e68a00] active:scale-95 transition-all duration-150 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-lg font-bold text-lg shadow-lg flex items-center gap-2">
                  Shop Now <ChevronRight className="w-5 h-5" />
                </button>
              </Link>

              <Link href="#deals">
                <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-white/20 active:scale-95 transition-all duration-150">
                  View Offers
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center gap-3 z-20">
        {heroBanners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-200 ${
              current === idx
                ? "w-10 bg-[#ff9900]"
                : "w-3 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* LEFT */}
      <button
        onClick={() =>
          setCurrent(
            (prev) => (prev - 1 + heroBanners.length) % heroBanners.length
          )
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200 z-20 shadow-md"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* RIGHT */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev + 1) % heroBanners.length)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200 z-20 shadow-md"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HeroSlider;
