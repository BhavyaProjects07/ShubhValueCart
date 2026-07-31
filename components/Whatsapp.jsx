"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTimes, FaChevronRight } from "react-icons/fa";

export default function MarketingButton() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <>
        {/* Floating Image */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-5 right-4 z-50 group"
        >
          <div className="relative">
            <Image
              src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-07-26%20012224.png?updatedAt=1785009214170" // <-- Replace with your image
              alt="Saurabh Jain"
              width={40}
              height={40}
              className="rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-110"
            />

            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white animate-pulse"></span>
          </div>
        </button>
      </>
    );
  }

  return (
    <div className="fixed bottom-20 md:bottom-5 right-5 z-50">

      {/* Close */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-lg"
      >
        <FaTimes size={10} />
      </button>

      <Link href="/marketing">
        <div className="cursor-pointer flex items-center gap-3 rounded-full bg-white shadow-2xl border border-yellow-400 px-3 py-2 hover:shadow-yellow-400/30 transition-all duration-300">

          <Image
            src="https://ik.imagekit.io/rsjsqdge7/Screenshot%202026-07-26%20012224.png?updatedAt=1785009214170"
            alt="Saurabh Jain"
            width={24}
            height={24}
            className="rounded-full object-cover"
          />

          <div className="leading-tight">
            <p className="text-xs text-gray-500">
              Meet Saurabh Jain
            </p>

            <p className="font-bold text-yellow-600 text-sm">
              Crazy Marketing
            </p>
          </div>

          <FaChevronRight className="text-yellow-500" />
        </div>
      </Link>
    </div>
  );
}