'use client'
import React from 'react'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const BestSelling = () => {
    const displayQuantity = 8
    const products = useSelector(state => state.product.list) || []

    return (
        <section className="py-24 lg:py-32 bg-white text-[#1D1D1F] font-inter">
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                .font-inter { font-family: 'Inter', sans-serif; }
            `}} />
            
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
                    <div className="max-w-2xl">
                        <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
                            Customer Favorites
                        </h3>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.1] text-[#1D1D1F]">
                            Best Sellers.
                        </h2>
                        <p className="mt-4 text-gray-500 font-medium text-sm sm:text-base">
                            Showing {products.length < displayQuantity ? products.length : displayQuantity} of {products.length} products
                        </p>
                    </div>
                    
                    {/* Desktop View All Button */}
                    <Link 
                        href="/shop" 
                        className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#1D1D1F] hover:text-gray-900 transition-colors group bg-gray-100 px-6 py-3 rounded-full hover:bg-gray-200"
                    >
                        View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
                    {products
                        .slice()
                        .sort((a, b) => (b.rating?.length || 0) - (a.rating?.length || 0))
                        .slice(0, displayQuantity)
                        .map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-10 md:hidden flex justify-center">
                    <Link 
                        href="/shop" 
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gray-100 text-[#1D1D1F] text-sm font-semibold hover:bg-gray-200 transition-colors"
                    >
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default BestSelling
