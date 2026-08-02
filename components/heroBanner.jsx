"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
  Wallet,
  LayoutGrid,
  BadgeCheck,
  RefreshCcw,
  CreditCard,
  Truck,
  ShoppingBasket,
  ShoppingBag,
  ShieldCheck,
  Grid2x2,
} from "lucide-react";
import axios from "axios";
import { assets } from "@/assets/assets";

const TRUST_FEATURES = [
  { icon: Wallet, title: "Lowest Prices", subtitle: "Everyday Low Price" },
  { icon: LayoutGrid, title: "Wide Range", subtitle: "5000+ Products" },
  { icon: BadgeCheck, title: "Best Quality", subtitle: "Trusted Brands" },
  { icon: RefreshCcw, title: "Easy Returns", subtitle: "Hassle Free Returns" },
  { icon: CreditCard, title: "Secure Payment", subtitle: "100% Secure" },
  { icon: Truck, title: "Fast Delivery", subtitle: "Quick & Reliable" },
];

export default function HeroSlider() {

  const CATEGORY_CONFIG = [
  {
    id: 1,
    name: "Groceries",
    slug: "food-grocery",
    href: "/category/food-grocery",
    image: "https://ik.imagekit.io/rr50hbc3l/download%20(2).jpg",
  },
  {
    id: 2,
    name: "Cooking",
    slug: "staples-cooking",
    href: "/category/staples-cooking",
    image: "https://ik.imagekit.io/rr50hbc3l/cooking.png",
  },
  {
    id: 3,
    name: "Body Care",
    slug: "personal-care",
    href: "/category/personal-care",
    image: "https://ik.imagekit.io/rr50hbc3l/body%20care.png",
  },
  {
    id: 4,
    name: "Home Cleaning",
    slug: "home-cleaning",
    href: "/category/home-cleaning",
    image: "https://ik.imagekit.io/rr50hbc3l/home%20CL.png",
  },
  {
    id: 5,
    name: "Baby Care",
    slug: "baby-care",
    href: "/category/baby-care",
    image: "https://ik.imagekit.io/rr50hbc3l/baby.png",
  },
  {
    id: 6,
    name: "Toys",
    slug: "toys-kids",
    href: "/category/toys-kids",
    image: "https://ik.imagekit.io/rr50hbc3l/3082060.png",
  },
  {
    id: 7,
    name: "Household",
    slug: "household",
    href: "/category/household",
    image: "https://ik.imagekit.io/rr50hbc3l/household.png",
  },
  {
    id: 8,
    name: "Stationery",
    slug: "stationery",
    href: "/category/stationery",
    image: "https://ik.imagekit.io/rr50hbc3l/stationery.png",
  },
  {
    id: 9,
    name: "Electronics",
    slug: "electronics",
    href: "/category/electronics",
    image: "https://ik.imagekit.io/rr50hbc3l/electronics.png",
  },
  {
    id: 10,
    name: "Fashion",
    slug: "fashion",
    href: "/category/fashion",
    image: "https://ik.imagekit.io/rr50hbc3l/fashion.png",
  },
  
];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [banners, setBanners] = useState([]);

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const MIN_SWIPE_DISTANCE = 50;

  useEffect(() => {
    if (paused || banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [paused, banners.length]);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  const onTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;

    if (distance > MIN_SWIPE_DISTANCE) next();
    if (distance < -MIN_SWIPE_DISTANCE) prev();
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await axios.get("/api/store/banners");

        const active = (data.banners || []).filter((b) => b.isActive);

setBanners(active);

        if (current >= active.length) {
          setCurrent(0);
        }
      } catch (err) {
        console.error("Failed to fetch hero banners:", err);
      }
    };

    fetchBanners();
  }, []);

  if (!banners.length) return null;

  return (
    <section className="relative w-full bg-[#ffffff] pb-2 pt-4">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ---------------------------------------------------------------- */}
        {/* Hero slide: the banner image already carries its own design      */}
        {/* (logo, headline, offers) — just show it full-width, no overlay.  */}
        {/* ---------------------------------------------------------------- */}
        <div
          className="relative w-full overflow-hidden rounded-2xl group shadow-lg border border-gray-100 bg-white touch-pan-y flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Link
            style={{ touchAction: "pan-y" }}
            href={banners[current].link || "/"}
            className="block w-full"
          >
            <Image
              key={banners[current].id}
              src={banners[current].image}
              alt="Banner"
              priority={current === 0}
              quality={90}
              sizes="100vw"
              width={1920}
              height={600}
              className="object-cover w-full h-auto select-none"
              draggable={false}
            />
          </Link>

          {/* Prev / Next controls */}
          {banners.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous banner"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-green-600 hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next banner"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-green-600 hover:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Indicators */}
          {banners.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to banner ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    current === index
                      ? "w-8 h-2 bg-green-600"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Trust features bar                                                */}
        {/* ---------------------------------------------------------------- */}
        <section className="mt-4 lg:hidden">
  <div className="rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
    <div className="flex items-start justify-between overflow-x-auto scrollbar-hide px-2 py-3">
      {CATEGORY_CONFIG.map((category) => (
        <Link
          key={category.id}
          href={category.href}
          className="group flex min-w-[68px] flex-col items-center gap-2 shrink-0"
        >
          {/* Circle */}
          <div
            className="
              relative
              flex
              h-[60px]
              w-[60px]
              items-center
              justify-center
              rounded-full
              bg-gradient-to-b
              from-[#F7FAFF]
              to-[#EEF4FF]
              border
              border-[#E7EEF9]
              transition-all
              duration-300
              group-active:scale-95
              group-hover:shadow-md
            "
          >
            {category.icon ? (
              <Grid2x2
                size={24}
                strokeWidth={1.8}
                className="text-slate-700"
              />
            ) : (
              <Image
                src={category.image}
                alt={category.name}
                width={42}
                height={42}
                className="object-contain"
                draggable={false}
              />
            )}
          </div>

          {/* Text */}
          <span
            className="
              text-[11px]
              font-medium
              text-[#1E293B]
              text-center
              leading-tight
              line-clamp-2
            "
          >
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  </div>
</section>

        {/* ---------------------------------------------------------------- */}
        {/* 3 promo banner cards                                              */}
        {/* Drop matching images into your assets file as promoWeekendSale /  */}
        {/* promoPrepaidOffer / promoQualityAssured to replace the icon       */}
        {/* watermark shown below with real product photography.             */}
        {/* ---------------------------------------------------------------- */}
        {/* Promo cards — swipeable slider on mobile, grid on desktop */}
<div className="mt-5 hidden md:block">
  <div
    className="
      flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2
      [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
      md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:snap-none md:pb-0
    "
  >
    {/* Card 1 — Weekend Super Saver Sale */}
    <div className="group relative overflow-hidden rounded-2xl bg-[#e7efe1] p-6 sm:p-7 min-h-[220px] flex flex-col justify-between shrink-0 w-[80%] sm:w-[55%] md:w-auto snap-center snap-always transition-all duration-300 motion-reduce:transition-none hover:shadow-xl hover:shadow-[#0a6c3d]/15 md:hover:-translate-y-1">
      <div className="pointer-events-none absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#0a6c3d]/10 blur-2xl" aria-hidden="true" />
      <div className="relative z-10 max-w-[72%]">
        <div className="text-xs font-bold uppercase tracking-widest text-[#0a6c3d] mb-1.5">
          Weekend
        </div>
        <h3 className="text-xl sm:text-[22px] font-extrabold text-gray-900 leading-snug mb-3">
          Super Saver Sale
        </h3>
        <div className="text-xs text-gray-500 mb-0.5">Up to</div>
        <div className="text-3xl sm:text-4xl font-extrabold mb-1">
          <span className="text-orange-500">50%</span>{" "}
          <span className="text-gray-900">OFF</span>
        </div>
        <div className="text-sm text-gray-600 mb-4">On Selected Products</div>
        <Link
          href="/shop?sale=weekend"
          className="inline-block bg-[#0a6c3d] hover:bg-[#085531] active:scale-95 text-white text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a6c3d]"
        >
          Shop Now
        </Link>
      </div>
      <div className="absolute right-2 bottom-2 w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-300 md:group-hover:scale-105">
        {assets?.promoWeekendSale ? (
          <Image src={assets.promoWeekendSale} alt="Weekend super saver sale" fill className="object-contain" />
        ) : (
          <ShoppingBasket className="w-full h-full text-[#0a6c3d]/15" strokeWidth={1} />
        )}
      </div>
    </div>

    {/* Card 2 — Smart Shoppers Save More */}
    <div className="group relative overflow-hidden rounded-2xl bg-[#fbe9d4] p-6 sm:p-7 min-h-[220px] flex flex-col justify-between shrink-0 w-[80%] sm:w-[55%] md:w-auto snap-center snap-always transition-all duration-300 motion-reduce:transition-none hover:shadow-xl hover:shadow-orange-500/15 md:hover:-translate-y-1">
      <div className="pointer-events-none absolute -right-8 -top-8 w-36 h-36 rounded-full bg-orange-400/15 blur-2xl" aria-hidden="true" />
      <div className="relative z-10 max-w-[72%]">
        <h3 className="text-xl sm:text-[22px] font-extrabold text-gray-900 leading-snug mb-3">
          Smart Shoppers
          <br />
          Save More!
        </h3>
        <div className="text-xs font-semibold text-orange-600 mb-0.5">Get Extra</div>
        <div className="text-3xl sm:text-4xl font-extrabold mb-1">
          <span className="text-orange-500">5%</span>{" "}
          <span className="text-gray-900">OFF</span>
        </div>
        <div className="text-sm text-gray-600 mb-4">On Prepaid Orders</div>
        <Link
          href="/shop"
          className="inline-block bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          Order Now
        </Link>
      </div>
      <div className="absolute right-2 bottom-2 w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-300 md:group-hover:scale-105">
        {assets?.promoPrepaidOffer ? (
          <Image src={assets.promoPrepaidOffer} alt="Prepaid order offer" fill className="object-contain" />
        ) : (
          <ShoppingBag className="w-full h-full text-orange-500/20" strokeWidth={1} />
        )}
      </div>
    </div>

    {/* Card 3 — 100% Quality Assured */}
    <div className="group relative overflow-hidden rounded-2xl bg-[#e7efe1] p-6 sm:p-7 min-h-[220px] flex flex-col justify-between shrink-0 w-[80%] sm:w-[55%] md:w-auto snap-center snap-always transition-all duration-300 motion-reduce:transition-none hover:shadow-xl hover:shadow-[#0a6c3d]/15 md:hover:-translate-y-1">
      <div className="pointer-events-none absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#0a6c3d]/10 blur-2xl" aria-hidden="true" />
      <div className="relative z-10 max-w-[72%]">
        <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#0a6c3d] leading-[1.15] mb-3">
          100%
          <br />
          Quality
          <br />
          Assured
        </h3>
        <div className="text-sm text-gray-600 mb-4">
          Branded Products
          <br />
          You Can Trust
        </div>
        <Link
          href="/shop"
          className="inline-block bg-[#0a6c3d] hover:bg-[#085531] active:scale-95 text-white text-xs font-bold uppercase tracking-wide px-5 py-2.5 rounded-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a6c3d]"
        >
          Explore Now
        </Link>
      </div>
      <div className="absolute right-2 bottom-2 w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-300 md:group-hover:scale-105">
        {assets?.promoQualityAssured ? (
          <Image src={assets.promoQualityAssured} alt="Quality assured products" fill className="object-contain" />
        ) : (
          <ShieldCheck className="w-full h-full text-[#0a6c3d]/15" strokeWidth={1} />
        )}
      </div>
    </div>
  </div>

  {/* Swipe hint — mobile only */}
  <p className="mt-2 text-center text-[11px] tracking-wide text-gray-400 md:hidden">
    Swipe to see more offers →
  </p>
</div>
      </div>
    </section>
  );
}