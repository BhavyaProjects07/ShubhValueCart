'use client'

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { motion } from "framer-motion"
import ProductCard from "@/components/ProductCard"

export default function Dealstrip() {

  const [deals, setDeals] = useState([])
  const [visibleDeals, setVisibleDeals] = useState([])

  const scrollRef = useRef(null)

  // ✅ Fetch 24 deals
  useEffect(() => {
    const fetchDeals = async () => {
      const res = await fetch('/api/deals')
      const data = await res.json()

      setDeals(data.deals || [])
    }

    fetchDeals()
  }, [])

  // ✅ Rotate every 24 hours
  useEffect(() => {
    if (deals.length === 0) return

    const getDailyDeals = () => {
      const now = new Date()

      // 🔥 days since epoch
      const daysSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 24))

      const dayIndex = daysSinceEpoch % 4 // 0–3

      const start = dayIndex * 6
      const end = start + 6

      setVisibleDeals(deals.slice(start, end))
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
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-8 border border-gray-200 relative group overflow-hidden">

        <div className="flex items-center justify-between mb-6 sm:mb-8 border-b border-gray-100 pb-4 relative z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff9900]" />
              Deal of the Day
            </h2>
          </div>

          <motion.button whileHover={{ x: 5 }} className="bg-[#2874f0] text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-1 text-sm sm:text-base">
            View All Deals <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex">
          <ChevronLeft />
        </button>

        <div ref={scrollRef} className="flex overflow-x-auto gap-4">
          {visibleDeals?.map((deal, idx) => (
            <div key={idx} className="shrink-0">
              <ProductCard product={deal} isScrollable />
            </div>
          ))}
        </div>

        <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex">
          <ChevronRight />
        </button>

      </div>
    </div>
  )
}