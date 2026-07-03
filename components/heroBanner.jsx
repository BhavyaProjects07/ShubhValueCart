"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

export default function HeroSlider() {
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

        const active = (data.banners || [])
          .filter((b) => b.isActive)
          .sort((a, b) => a.order - b.order);

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
    <section
      className="relative w-full bg-white py-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rectangle Container */}
        <div
  className="relative w-full overflow-hidden group shadow-lg touch-pan-y flex items-center justify-center"
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
      className="object-contain w-full h-auto select-none"
      draggable={false}
    />
  </Link>

          {/* Previous */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-20 rounded bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-20 rounded bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`transition-all duration-300 rounded-full ${
                  current === index
                    ? "w-8 h-2 bg-[#00a300]"
                    : "w-2 h-2 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
