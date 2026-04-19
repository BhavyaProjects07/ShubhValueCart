'use client'
import { useEffect, useState } from "react";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1200); // faster
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">

      {/* SIMPLE SPINNER */}
      <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />

      {/* BRAND TEXT */}
      <p className="mt-6 text-lg font-semibold text-gray-700">
        ShubhValueCart
      </p>

    </div>
  );
};

export default Preloader;