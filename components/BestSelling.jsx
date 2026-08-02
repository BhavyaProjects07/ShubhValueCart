'use client'

import React from 'react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const BestSelling = () => {
  const products = useSelector((state) => state.product.list) || []

  return (
    <section className="bg-white py-3 text-[#1D1D1F] font-inter">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

            .font-inter {
              font-family: 'Inter', sans-serif;
            }

            .best-selling-scroll {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }

            .best-selling-scroll::-webkit-scrollbar {
              display: none;
            }
          `,
        }}
      />

      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1D1D1F] md:text-2xl">
            Recommended For You
          </h2>

          <Link
            href="/shop"
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Product Rail */}
        <div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-sm">
          <div className="best-selling-scroll flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1">

            {products
              .slice()
              .sort(
                (a, b) =>
                  (b.rating?.length || 0) - (a.rating?.length || 0)
              )
              .map((product) => (
                <div
                  key={product.id}
                  className="
                    snap-start
                    shrink-0
                    w-[24%]
                    sm:w-[180px]
                    lg:w-[220px]
                  "
                >
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BestSelling