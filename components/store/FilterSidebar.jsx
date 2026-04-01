'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"

export default function FilterSidebar({ filters, setFilters }) {

  const [categories, setCategories] = useState([])
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get("category") || ""

  // ✅ FETCH CATEGORIES
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

  /* ---------------- CATEGORY CLICK ---------------- */
  const handleCategoryClick = (slug) => {
    const url = `/shop?page=1&category=${slug}`
    router.push(url)
  }

  return (
    <aside className="w-full sm:w-64 border border-[#ede6dd] rounded-lg p-4 bg-gray-100 sticky top-28 h-fit">
      
      <h3 className="font-semibold text-[#6b5d52] mb-5 text-base">
        Filters
      </h3>

      {/* CATEGORY */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-[#6b5d52]">
          Category
        </h4>

        <div className="space-y-2">
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
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-[#6b5d52]">
          Price
        </h4>

        <input
          type="range"
          min={100}
          max={10000} // ✅ FIXED (10K)
          step={100}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters(prev => ({
              ...prev,
              maxPrice: Number(e.target.value),
            }))
          }
          className="w-full accent-[#6b5d52]"
        />

        <p className="text-xs text-slate-500 mt-2">
          Up to ₹{filters.maxPrice.toLocaleString()}
        </p>
      </div>

      {/* RATING */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-[#6b5d52]">
          Customer Rating
        </h4>

        {[4, 3, 2].map(r => (
          <label key={r} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === r}
              onChange={() =>
                setFilters(prev => ({
                  ...prev,
                  minRating: r,
                }))
              }
              className="accent-[#6b5d52]"
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
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-[#6b5d52]">
          Discount
        </h4>

        {[10, 20, 30, 40, 50].map(d => (
          <label key={d} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="discount"
              checked={filters.minDiscount === d}
              onChange={() =>
                setFilters(prev => ({
                  ...prev,
                  minDiscount: d,
                }))
              }
              className="accent-[#6b5d52]"
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
        onClick={() =>
          setFilters({
            minPrice: 0,
            maxPrice: 10000, // ✅ FIXED
            minRating: 0,
            minDiscount: 0,
          })
        }
        className="w-full text-sm text-[#6b5d52] border border-[#ede6dd] rounded-md py-2 hover:bg-[#ede6dd]"
      >
        Clear All Filters
      </button>

    </aside>
  )
}