"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function FounderFloatingCard() {
  const [collapsed, setCollapsed] = useState(false);

  // Collapsed State (Only Image)
  if (collapsed) {
    return (
      <div className="fixed right-4 bottom-35 md:bottom-24 z-[999]">
        <button
          onClick={() => setCollapsed(false)}
          className="relative h-10 w-10 overflow-hidden rounded-full shadow-xl ring-2 ring-white transition-all duration-300 hover:scale-105"
        >
          <Image
            src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-07-23%20025124.png" // Put founder image inside /public
            alt="Shubham Goyal"
            fill
            className="object-cover"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-35 md:bottom-24 right-4 z-[999] animate-in slide-in-from-right-8 duration-500">
      {/* Close Button */}
      <button
        onClick={() => setCollapsed(true)}
        className="absolute -top-2 -right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-white shadow-md transition hover:scale-110 hover:bg-black"
      >
        <X size={10} />
      </button>

      {/* Founder Card */}
      <Link
        href="/about"
        className="group flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        {/* Founder Image */}
        <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow">
          <Image
            src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-07-23%20025124.png"
            alt="Shubham Goyal"
            fill
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="leading-tight">
          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Meet the Founder
          </p>

          <h3 className="text-sm font-bold text-slate-900">
            Shubham Goyal
          </h3>
        </div>
      </Link>
    </div>
  );
}