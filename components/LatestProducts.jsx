'use client'
import React from 'react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const LatestProducts = () => {
    const displayQuantity = 36
    const products = useSelector(state => state.product.list) || []

    const visibleProducts = products
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, displayQuantity)

    return (
        <section className="py-12 lg:py-16  text-[#1D1D1F] font-inter">
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                .font-inter { font-family: 'Inter', sans-serif; }
            `}} />

            <div className="max-w-[1600px] mx-auto px-3 sm:px-6 md:px-10">
                {/* Widget Card — Flipkart style container */}
                <div className="bg-white rounded-lg sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">

                    {/* Header Section */}
                    <div className="flex flex-row justify-between items-center gap-4 mb-5 sm:mb-8">
                        <div>
                            <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-1 sm:mb-2">
                                New Arrivals
                            </h3>
                            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-[#1D1D1F]">
                                Latest Pieces
                            </h2>
                        </div>

                        <Link
                            href="/shop"
                            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-[#1D1D1F] hover:text-black transition-colors group whitespace-nowrap shrink-0"
                        >
                            VIEW ALL <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Product Grid — dense, Flipkart-style tiles */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
                        {visibleProducts.map((product, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-md sm:rounded-lg p-2 sm:p-3 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 text-center text-gray-400 font-medium text-xs sm:text-sm">
                        Showing {visibleProducts.length} of {products.length} products
                    </p>
                </div>
            </div>
        </section>
    )
}

export default LatestProducts