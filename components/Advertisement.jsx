"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const INTERVAL_MS = 3000;

export default function Advertisement() {
  // -----------------------------
  // State
  // -----------------------------
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editBanner, setEditBanner] = useState(null);
const [saving, setSaving] = useState(false);
const [deleting, setDeleting] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  // -----------------------------
  // Refs
  // -----------------------------
  const intervalRef = useRef(null);

  // -----------------------------
  // Total Banners
  // -----------------------------
  const total = banners.length;

  // -----------------------------
  // Fetch Banners
  // -----------------------------
  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/store/banners");

      const activeBanners = (data.banners || [])
        .filter((banner) => banner.isActive)
        .sort((a, b) => a.order - b.order);

      setBanners(activeBanners);

      if (current >= activeBanners.length) {
        setCurrent(0);
      }
    } catch (error) {
      console.error("Banner Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [current]);

  // -----------------------------
  // Initial Fetch
  // -----------------------------
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // -----------------------------
  // Navigation
  // -----------------------------
  const goTo = useCallback((index) => {
    if (!total) return;

    setCurrent(index);
    setProgressKey((prev) => prev + 1);
  }, [total]);

  const goNext = useCallback(() => {
    if (!total) return;

    setCurrent((prev) => (prev + 1) % total);
    setProgressKey((prev) => prev + 1);
  }, [total]);

  const goPrev = useCallback(() => {
    if (!total) return;

    setCurrent((prev) => (prev - 1 + total) % total);
    setProgressKey((prev) => prev + 1);
  }, [total]);

  // -----------------------------
  // Auto Slide
  // -----------------------------
  useEffect(() => {
    if (isHovered || total <= 1) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(goNext, INTERVAL_MS);

    return () => clearInterval(intervalRef.current);
  }, [goNext, isHovered, total]);

  // -----------------------------
  // Keyboard Navigation
  // -----------------------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goPrev();
      }

      if (e.key === "ArrowRight") {
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // -----------------------------
  // Preload Next Banner
  // -----------------------------
  useEffect(() => {
    if (!banners.length) return;

    const nextIndex = (current + 1) % banners.length;

    const img = new window.Image();
    img.src = banners[nextIndex].image;
  }, [current, banners]);

  // -----------------------------
  // Banner Click
  // -----------------------------
  const handleBannerClick = (banner) => {
    if (!banner?.link) return;

    if (
      banner.link.startsWith("http://") ||
      banner.link.startsWith("https://")
    ) {
      window.open(banner.link, "_blank");
    } else {
      window.location.href = banner.link;
    }
  };

  // -----------------------------
  // Refresh Every Minute
  // (Admin updates banners)
  // -----------------------------
  useEffect(() => {
    const refresh = setInterval(() => {
      fetchBanners();
    }, 60000);

    return () => clearInterval(refresh);
  }, [fetchBanners]);

  // -----------------------------
  // Current Banner
  // -----------------------------
  const currentBanner =
    banners[current] || null;

  return (
  <div className="px-4 md:px-6 lg:px-8">

    <section
      className="relative overflow-hidden rounded-3xl bg-white shadow-sm group"
      style={{ height: "clamp(180px,30vw,420px)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* Loading */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="text-gray-500 text-lg font-medium">
            Loading banners...
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && banners.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-gray-500 font-semibold">
            No banners available.
          </p>
        </div>
      )}

      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{
            opacity: current === index ? 1 : 0,
            pointerEvents: current === index ? "auto" : "none",
          }}
        >

          <button
            onClick={() => handleBannerClick(banner)}
            className="w-full h-full cursor-pointer"
          >
            <img
              src={banner.image}
              alt={banner.title || "Banner"}
              className="w-full h-full object-cover object-center select-none"
              draggable={false}
            />
          </button>

          {/* Dark Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />

          {/* Title */}
          {banner.title && (
            <div className="absolute left-8 bottom-8 z-20 max-w-xl">

              <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
                {banner.title}
              </h2>

            </div>
          )}

        </div>
      ))}

      {/* Left */}
      {banners.length > 1 && (
        <button
          onClick={goPrev}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-20 rounded-xl bg-white/90 shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
        >

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="w-5 h-5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>

        </button>
      )}

      {/* Right */}
      {banners.length > 1 && (
        <button
          onClick={goNext}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-20 rounded-xl bg-white/90 shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
        >

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="w-5 h-5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>

        </button>
      )}

      {/* Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">

          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                current === i
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white"
              }`}
            />
          ))}

        </div>
      )}

      {/* Progress */}
      {banners.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20 overflow-hidden z-20">

          <div
            key={progressKey}
            className="h-full bg-[#00a300]"
            style={{
              width: isHovered ? "0%" : "100%",
              transition: isHovered
                ? "none"
                : `width ${INTERVAL_MS}ms linear`,
            }}
          />

        </div>
      )}

    </section>

  </div>
);
}