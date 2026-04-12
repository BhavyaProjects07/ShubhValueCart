
"use client";
 
import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
 
// ─── Banner Data ─────────────────────────────────────────────────────────────
const BANNERS = [
  {
    id: 1,
    image: "https://ik.imagekit.io/rsjsqdge7/Shubh_Value_Cart_cosmetic_1600x366.png?q=80&w=2070&auto=format&fit=crop",
    badge: "Limited Time",
    accentColor: "#F59E0B",
  },
  {
    id: 2,
    image: "https://ik.imagekit.io/rsjsqdge7/Shubh%20Value%20Cart%20clothes%20_20251223_220603_0000.png",
    badge: "New Arrivals",
    accentColor: "#EC4899",
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/rsjsqdge7/Shubh%20Value%20Cart%20fmcg_20251223_233359_0000.png",
    badge: "Bestsellers",
    accentColor: "#10B981",
  },
  {
    id: 4,
    image: "https://ik.imagekit.io/rsjsqdge7/Shubh%20Value%20Cart%20grocery%20_20251223_231109_0000.png",
    badge: "Top Rated",
    accentColor: "#3B82F6",
  },
  {
    id: 5,
    image: "https://ik.imagekit.io/rsjsqdge7/Shubh%20Value%20Cart%20cosmetic%20_20251223_225607_0000.png",
    badge: "Flash Sale",
    accentColor: "#A78BFA",
  },
  {
    id: 6,
    image: "https://ik.imagekit.io/rsjsqdge7/Subah%20value%20Cart%20toys.._20251221_124858_0000.png",
    badge: "Family Favorites",
    accentColor: "#F43F5E",
  },
];
 
const INTERVAL_MS = 2500;
 
// ─── Single Slide ─────────────────────────────────────────────────────────────
const BannerSlide = memo(({ banner, isVisible, isPriority }) => (
  <div
    className="absolute inset-0 transition-opacity duration-500 ease-in-out"
    style={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? "auto" : "none" }}
    aria-hidden={!isVisible}
  >
    <Image
      src={banner.image}
      alt={banner.badge}
      fill
      sizes="100vw"
      quality={70}
      priority={isPriority}
      className="object-cover object-center select-none"
      draggable={false}
    />
 
    {/* Badge only — small, bottom-left */}
    <div className="absolute bottom-3 left-3 z-10">
      <span
        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
        style={{
          backgroundColor: banner.accentColor + "dd",
          color: "#fff",
          boxShadow: `0 2px 8px ${banner.accentColor}66`,
        }}
      >
        <span className="w-1 h-1 rounded-full bg-white opacity-90" />
        {banner.badge}
      </span>
    </div>
  </div>
));
 
BannerSlide.displayName = "BannerSlide";
 
// ─── Nav Dots ─────────────────────────────────────────────────────────────────
const NavDots = memo(({ count, current, onChange, accentColor }) => (
  <div
    className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20"
    role="tablist"
    aria-label="Banner navigation"
  >
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        role="tab"
        aria-selected={i === current}
        aria-label={`Banner ${i + 1}`}
        onClick={() => onChange(i)}
        className="h-1.5 rounded-full transition-all duration-300 ease-in-out focus-visible:outline-none"
        style={{
          width: i === current ? "18px" : "6px",
          backgroundColor: i === current ? accentColor : "rgba(255,255,255,0.45)",
        }}
      />
    ))}
  </div>
));
 
NavDots.displayName = "NavDots";
 
// ─── Arrow Button ─────────────────────────────────────────────────────────────
const ArrowButton = memo(({ direction, onClick }) => (
  <button
    onClick={onClick}
    aria-label={direction === "left" ? "Previous" : "Next"}
    className={[
      "absolute top-1/2 -translate-y-1/2 z-20",
      "flex items-center justify-center w-7 h-7 rounded-full",
      "bg-black/25 text-white backdrop-blur-sm border border-white/10",
      "transition-opacity duration-200",
      "opacity-0 group-hover:opacity-100",
      "hover:bg-black/45 active:scale-95",
      "focus-visible:outline-none",
      direction === "left" ? "left-2" : "right-2",
    ].join(" ")}
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
      {direction === "left"
        ? <polyline points="15 18 9 12 15 6" />
        : <polyline points="9 18 15 12 9 6" />}
    </svg>
  </button>
));
 
ArrowButton.displayName = "ArrowButton";
 
// ─── Main Component ───────────────────────────────────────────────────────────
export default function Advertisement() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const intervalRef = useRef(null);
  const total = BANNERS.length;
 
  const goTo = useCallback((i) => { setCurrent(i); setProgressKey((k) => k + 1); }, []);
  const goNext = useCallback(() => { setCurrent((c) => (c + 1) % total); setProgressKey((k) => k + 1); }, [total]);
  const goPrev = useCallback(() => { setCurrent((c) => (c - 1 + total) % total); setProgressKey((k) => k + 1); }, [total]);
 
  // Auto-slide, pause on hover
  useEffect(() => {
    if (isHovered) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(goNext, INTERVAL_MS);
    return () => clearInterval(intervalRef.current);
  }, [isHovered, goNext]);
 
  // Preload next image only
  useEffect(() => {
    const nextIndex = (current + 1) % total;
    const img = new window.Image();
    img.src = BANNERS[nextIndex].image;
  }, [current, total]);
 
  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);
 
  const accentColor = BANNERS[current].accentColor;
 
  return (
    <section
      className="relative w-full overflow-hidden group bg-gray-100"
      style={{ height: "clamp(120px, 20vw, 220px)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Promotions"
      aria-roledescription="carousel"
    >
      {BANNERS.map((banner, i) => (
        <BannerSlide
          key={banner.id}
          banner={banner}
          isVisible={i === current}
          isPriority={i === 0}
        />
      ))}
 
      <ArrowButton direction="left" onClick={goPrev} />
      <ArrowButton direction="right" onClick={goNext} />
 
      <NavDots count={total} current={current} onChange={goTo} accentColor={accentColor} />
 
      {/* Thin progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/10 z-20 overflow-hidden">
        <div
          key={progressKey}
          className="h-full"
          style={{
            backgroundColor: accentColor,
            width: isHovered ? "0%" : "100%",
            transition: isHovered ? "none" : `width ${INTERVAL_MS}ms linear`,
          }}
        />
      </div>
    </section>
  );
}