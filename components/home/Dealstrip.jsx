'use client'

import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProducts } from "@/lib/features/product/productSlice";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function Dealstrip() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/deals");
        const data = await res.json();

        const items = (data.deals || [])
          .map((p) => ({
            ...p,
            id: p.id || p._id,
          }))
          .filter((p) => p.id);

        setProducts(items);

        dispatch(addProducts(items));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left:
        direction === "left"
          ? -scrollRef.current.offsetWidth
          : scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 pb-10">

      <div className="rounded-3xl bg-white border border-green-100 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-100">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <HeartHandshake
                className="w-6 h-6 text-[#00a300]"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Personal Care Essentials
              </h2>

              <p className="text-sm text-gray-500">
                Premium skincare, haircare & daily essentials.
              </p>
            </div>

          </div>

          <Link
            href="/shop?category=personal-care"
            className="hidden sm:flex items-center gap-2 bg-[#00a300] hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            Explore Collection
            <ChevronRight size={18} />
          </Link>

        </div>

        <div className="relative">

          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-green-200 shadow hover:bg-green-50 items-center justify-center"
          >
            <ChevronLeft className="text-[#00a300]" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide p-6 scroll-smooth"
          >
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[220px] h-[330px] rounded-2xl bg-gray-100 animate-pulse shrink-0"
                />
              ))
            ) : products.length === 0 ? (
              <div className="w-full text-center py-20 text-gray-500 font-medium">
                No Personal Care products available.
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="shrink-0 transition hover:scale-[1.02]"
                >
                  <ProductCard
                    product={product}
                    isScrollable
                  />
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-green-200 shadow hover:bg-green-50 items-center justify-center"
          >
            <ChevronRight className="text-[#00a300]" />
          </button>

        </div>

      </div>

    </section>
  );
}