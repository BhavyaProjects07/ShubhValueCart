'use client'
import { useDispatch } from "react-redux"
import { addProducts } from "@/lib/features/product/productSlice"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { motion } from "framer-motion"
import ProductCard from "@/components/ProductCard"

export default function Dealstrip() {

const dispatch = useDispatch()

  const [deals, setDeals] = useState([])
  const [visibleDeals, setVisibleDeals] = useState([])

  const scrollRef = useRef(null)

  // ✅ Fetch 24 deals
  useEffect(() => {
  const fetchDeals = async () => {
    try {
      const res = await fetch('/api/deals')
      const data = await res.json()

      const incomingDeals = data.deals || data.products || []

      const validDeals = incomingDeals
        .map((d) => ({
          ...d,
          id: d.id || d._id,
        }))
        .filter((d) => d.id)

      // ✅ LOCAL STATE
      setDeals(validDeals)

      // 🔥 GLOBAL STATE (THIS FIXES YOUR ISSUE)
      dispatch(addProducts(validDeals))

    } catch (err) {
      console.error("❌ DEAL FETCH ERROR:", err)
    }
  }

  fetchDeals()
}, [])

  // ✅ Rotate every 24 hours
  useEffect(() => {
    if (deals.length === 0) {
      console.warn("⚠️ No deals available")
      return
    }

    const getDailyDeals = () => {
      const now = new Date()

      const daysSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 24))
      const dayIndex = daysSinceEpoch % 4

      const start = dayIndex * 6
      const end = start + 6

      const sliced = deals.slice(start, end)

      console.log("📅 Day Index:", dayIndex)
      console.log("📊 Showing deals:", sliced)

      setVisibleDeals(sliced)
    }

    getDailyDeals()
  }, [deals])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount =
        direction === "left"
          ? -current.offsetWidth
          : current.offsetWidth

      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
  <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 sm:p-8 border border-gray-200 relative">

    {/* HEADER */}
    <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-gray-100 pb-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff9900]" />
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">
          Deal of the Day
        </h2>
      </div>

      <button className="bg-[#2874f0] hover:bg-[#1f5ed6] active:scale-95 transition-all text-white px-4 sm:px-5 py-2 rounded-lg font-semibold flex items-center gap-1 text-sm sm:text-base shadow-sm">
        View All Deals
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>

    {/* LEFT BUTTON */}
    <button
      onClick={() => scroll('left')}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md border hover:bg-gray-100 transition"
    >
      <ChevronLeft className="w-5 h-5 text-gray-700" />
    </button>

    {/* SCROLL AREA */}
    <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-4 sm:gap-5 scroll-smooth scrollbar-hide pb-2"
    >
      {visibleDeals?.map((deal) => {
        return (
          <div
            key={deal.id}
            className="shrink-0 hover:scale-[1.02] transition-transform duration-200"
          >
            <ProductCard product={deal} isScrollable />
          </div>
        )
      })}
    </div>

    {/* RIGHT BUTTON */}
    <button
      onClick={() => scroll('right')}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md border hover:bg-gray-100 transition"
    >
      <ChevronRight className="w-5 h-5 text-gray-700" />
    </button>

  </div>
</div>
  )
}