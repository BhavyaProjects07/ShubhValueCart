'use client'

import { useDispatch } from 'react-redux'
import { addProducts } from '@/lib/features/product/productSlice'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

function splitClock(ms) {
  if (ms < 0) ms = 0
  const total = Math.floor(ms / 1000)
  const pad = (n) => String(n).padStart(2, '0')
  return [
    pad(Math.floor(total / 3600)),
    pad(Math.floor((total % 3600) / 60)),
    pad(total % 60),
  ]
}

export default function Dealstrip() {
  const dispatch = useDispatch()

  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [msLeft, setMsLeft] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const scrollRef = useRef(null)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch('/api/deals')
        const data = await res.json()
        const valid = (data.deals || [])
          .map((d) => ({ ...d, id: d.id || d._id }))
          .filter((d) => d.id)

        setDeals(valid)
        dispatch(addProducts(valid))
      } catch (err) {
        console.error('DEAL FETCH ERROR:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchDeals()
  }, [dispatch])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const midnight = new Date(now)
      midnight.setHours(24, 0, 0, 0)
      setMsLeft(midnight.getTime() - now.getTime())
    }
    tick()
    const i = setInterval(tick, 1000)
    return () => clearInterval(i)
  }, [])

  const updateEdges = () => {
    const el = scrollRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }

  useEffect(() => {
    updateEdges()
  }, [deals])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({
      left: dir === 'left' ? -el.offsetWidth * 0.9 : el.offsetWidth * 0.9,
      behavior: 'smooth',
    })
  }

  const [hh, mm, ss] = splitClock(msLeft)

  const TimeBox = ({ value }) => (
    <span className="rounded-[4px] bg-[#FEF2F2] px-[5px] py-[2px] text-[12px] font-bold leading-none tabular-nums text-[#EF4444] sm:text-[13px]">
      {value}
    </span>
  )

  return (
    <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-6 lg:px-8 bg-white">
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-[#F9FAFB] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-2 px-3 pb-2.5 pt-3 sm:px-5 sm:pt-4">
          <div className="flex items-center gap-1.5">
            <Zap
              className="h-[17px] w-[17px] text-[#F59E0B] sm:h-5 sm:w-5"
              fill="#F59E0B"
              strokeWidth={1.5}
            />
            <h2 className="text-[15px] font-bold tracking-tight text-gray-900 sm:text-[17px]">
              Flash Deals
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-normal text-gray-400 sm:text-[12px]">
              Ends in
            </span>
            <div className="flex items-center gap-[2px]">
              <TimeBox value={hh} />
              <span className="text-[12px] font-bold text-[#EF4444]">:</span>
              <TimeBox value={mm} />
              <span className="text-[12px] font-bold text-[#EF4444]">:</span>
              <TimeBox value={ss} />
            </div>
          </div>
        </div>

        {/* PRODUCT RAIL */}
        <div className="relative">
          {!atStart && (
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="absolute left-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition hover:bg-gray-50 active:scale-95 md:flex"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={updateEdges}
            className="deal-rail flex snap-x snap-mandatory gap-1 overflow-x-auto px-4 sm:px-5 pb-4 sm:gap-3 sm:pb-5"
          >
            {loading &&
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`sk-${i}`}
                  className="h-[150px] w-[calc((100%-24px)/4)] shrink-0 animate-pulse rounded-xl border border-gray-100 bg-gray-100 sm:h-[215px] sm:w-[160px] lg:w-[180px]"
                />
              ))}

            {!loading && deals.length === 0 && (
              <div className="w-full py-8 text-center text-sm text-gray-500">
                No deals live right now — check back soon.
              </div>
            )}

            {!loading &&
              deals.map((deal) => (
                <div
                  key={deal.id}
                  className="w-[calc((100%-24px)/3.5)] shrink-0 snap-start sm:w-[160px] lg:w-[180px]"
                >
                  <ProductCard product={deal} />
                </div>
              ))}
          </div>

          {!atEnd && (
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="absolute right-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition hover:bg-gray-50 active:scale-95 md:flex"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .deal-rail {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .deal-rail::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
