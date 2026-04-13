"use client"

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Gift } from "lucide-react"
import ProductCard from "./ProductCard"
import { fetchProducts } from "@/lib/features/product/productSlice"

export default function Recommended({ productId }) {
  const dispatch = useDispatch()
  const { recommended, loading } = useSelector((state) => state.product)

  const sectionRef = useRef(null)

  const [page, setPage] = useState(1)
  const [hasLoaded, setHasLoaded] = useState(false)

  // =========================
  // 🚀 FETCH WITH PAGINATION
  // =========================
  useEffect(() => {
    if (productId) {
      dispatch(fetchProducts({
        recommendedFor: productId,
        page,
        limit: 50
      }))
    }
  }, [productId, page])

  // =========================
  // 🟡 LOADING
  // =========================
  if (loading && !recommended.length) {
    return (
      <div ref={sectionRef} className="mt-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Gift size={18} /> Recommended For You
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  // =========================
  // 🔴 EMPTY
  // =========================
  if (!loading && recommended.length === 0) return null

  // =========================
  // 🟢 UI
  // =========================
  return (
    <div ref={sectionRef} className="mt-16">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <Gift size={20} className="text-[#C7511F]" />
        <h2 className="text-xl font-bold text-[#0F1111]">
          Recommended For You
        </h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recommended.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-8 gap-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Prev
        </button>

        <span className="px-4 py-2 font-semibold">
          Page {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Next
        </button>
      </div>

    </div>
  )
}