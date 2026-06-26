"use client";

import { useState } from "react";
import { FaWhatsapp, FaTimes, FaCommentDots } from "react-icons/fa";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
      >
        <FaWhatsapp size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md"
      >
        <FaTimes size={10} />
      </button>

      {/* Widget */}
      <a
        href="https://wa.me/918955497322"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-2 bg-white border border-green-500 rounded-full px-3 py-2 shadow-xl hover:shadow-2xl transition">
          <FaWhatsapp className="text-green-500 text-3xl" />

          <div className="leading-tight">
            <p className="text-[10px] text-gray-500">
              Contact us on
            </p>
            <p className="text-green-600 font-semibold text-sm">
              WhatsApp
            </p>
          </div>

          <FaCommentDots className="text-green-500 text-sm" />
        </div>
      </a>
    </div>
  );
}