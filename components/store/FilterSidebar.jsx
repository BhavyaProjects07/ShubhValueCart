"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import { X } from "lucide-react"

export default function FilterSidebar({
  filters,
  setFilters,
  isOpen = false,
  setIsOpen = () => {}
}) {
  const [categories, setCategories] = useState([])

  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get("category") || ""

  // =========================
  // FETCH CATEGORIES
  // =========================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories")
        setCategories(data.categories)
      } catch (error) {
        console.error("Category fetch error:", error)
      }
    }

    fetchCategories()
  }, [])

  // =========================
  // CATEGORY CLICK
  // =========================
  const handleCategoryClick = (slug) => {
    router.push(`/shop?page=1&category=${slug}`)
    setIsOpen(false)
  }

  // =========================
  // SIDEBAR CONTENT
  // =========================
  const SidebarContent = () => (
    <div className="p-4 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b pb-3">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button onClick={() => setIsOpen(false)}>
          <X size={20} />
        </button>
      </div>

      {/* CATEGORY */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Category</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {categories.map(cat => (
            <div
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`cursor-pointer text-sm ${
                currentCategory === cat.slug
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-500"
              }`}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Price</h4>

        <input
          type="range"
          min={100}
          max={10000}
          step={100}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters(prev => ({
              ...prev,
              maxPrice: Number(e.target.value),
            }))
          }
          className="w-full accent-black"
        />

        <p className="text-xs mt-2">
          Up to ₹{filters.maxPrice.toLocaleString()}
        </p>
      </div>

      {/* RATING */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Customer Rating</h4>

        {[4, 3, 2].map(r => (
          <label key={r} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={filters.minRating === r}
              onChange={() =>
                setFilters(prev => ({ ...prev, minRating: r }))
              }
            />
            {r}★ & above
          </label>
        ))}

        <button
          onClick={() =>
            setFilters(prev => ({ ...prev, minRating: 0 }))
          }
          className="text-xs text-blue-500 mt-2"
        >
          Clear Rating
        </button>
      </div>

      {/* DISCOUNT */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Discount</h4>

        {[10, 20, 30, 40, 50].map(d => (
          <label key={d} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={filters.minDiscount === d}
              onChange={() =>
                setFilters(prev => ({ ...prev, minDiscount: d }))
              }
            />
            {d}% or more
          </label>
        ))}

        <button
          onClick={() =>
            setFilters(prev => ({ ...prev, minDiscount: 0 }))
          }
          className="text-xs text-blue-500 mt-2"
        >
          Clear Discount
        </button>
      </div>

      {/* CLEAR ALL */}
      <button
        onClick={() => {
          setFilters({
            minPrice: 0,
            maxPrice: 10000,
            minRating: 0,
            minDiscount: 0,
          })
          router.push("/shop?page=1&maxPrice=10000")
          setIsOpen(false)
        }}
        className="w-full border py-2 rounded-md hover:bg-gray-100"
      >
        Clear All Filters
      </button>
    </div>
  )

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:block w-64 border rounded-lg p-4 bg-gray-100 sticky top-28 h-fit">
        <SidebarContent />
      </aside>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="fixed inset-0 z-50">

          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          {/* DRAWER */}
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl overflow-y-auto animate-slide-in">
            <SidebarContent />
          </div>

        </div>
      )}
    </>
  )
}