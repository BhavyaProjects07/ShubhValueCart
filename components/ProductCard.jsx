'use client'

import React from 'react'
import Link from 'next/link'
import { Star, ArrowUpRight , Plus} from 'lucide-react';

/**
 * Flash-Deal Product Card
 * Contains ONLY: image, name, price, MRP, discount badge, add (+) button.
 */
const ProductCard = ({ product, onAdd }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹'

  if (!product) {
    return (
      <div className="h-full w-full rounded-xl border border-gray-200 bg-gray-50 animate-pulse" />
    )
  }

  const id = product.id || product._id || '000'
  const name = product.name || 'Product'
  const image =
    product?.images?.[0] || product?.image || 'https://picsum.photos/seed/p/300/300'

  const price = Number(product.price) || 0
  const mrp = Number(product.mrp ?? product.originalPrice ?? product.original) || 0
  const hasMrp = mrp > price

  const discount = hasMrp
    ? Math.round(((mrp - price) / mrp) * 100)
    : Number(product.discount) || 0

  const fmt = (v) => `${currency}${v}`

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onAdd?.(product)
  }
    
    
    // dekstop 

    const productName = product?.name || "Signature Collection";
    const loading = !product;
    const rawPrice = product?.price || "0.00";
    const productPrice = typeof rawPrice === 'string' && rawPrice.includes('₹') ? rawPrice : `${currency}${rawPrice}`;
    
    const rawMrp = product?.mrp || product?.original;
    const productMrp = rawMrp ? (typeof rawMrp === 'string' && rawMrp.includes('₹') ? rawMrp : `${currency}${rawMrp}`) : null;
    
    const productImage = product?.images?.[0] || product?.image || "https://picsum.photos/seed/luxury/800/1000";
    const productId = product?.id || "000";

    const discountPercentage =
        product.mrp > product.price
            ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
            : 0;
    
    // Calculate rating safely
    let avgRating = 0;
let reviewCount = 0;

if (Array.isArray(product?.rating)) {
  reviewCount = product.rating.length;

  if (reviewCount > 0) {
    const total = product.rating.reduce(
      (acc, curr) => acc + (Number(curr.rating) || 0),
      0
    );

    avgRating = total / reviewCount; // ✅ keep decimal
  }
}
    const isDiscounted = !!productMrp;

    return (
        <>
            {/* Mobile product Card */}
            <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors duration-200 hover:border-gray-300 lg:hidden">
            {/* Discount badge */}
            {discount > 0 && (
                <span className="absolute left-1.5 top-1.5 z-10 rounded-[5px] bg-[#EF4444] px-1.5 py-[3px] text-[9px] font-bold leading-none tracking-tight text-white shadow-sm sm:text-[10px]">
                {discount}% OFF
                </span>
            )}

            <Link href={`/product/${id}`} prefetch className="flex flex-1 flex-col px-2 pb-1 pt-6 sm:px-2.5 sm:pt-7">
                {/* Image */}
                <div className="flex h-[62px] items-center justify-center sm:h-[92px]">
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                </div>

                {/* Name */}
                <h3 className="mt-2 line-clamp-2 min-h-[26px] text-[10px] font-normal leading-[13px] text-gray-700 sm:min-h-[32px] sm:text-[12px] sm:leading-4">
                {name}
                </h3>
            </Link>

            {/* Price row + add button */}
            <div className="mt-auto flex items-center justify-between gap-1 px-2 pb-2 sm:px-2.5 sm:pb-2.5">
            <div className="flex flex-1 items-baseline gap-1 overflow-hidden">
                <span className="text-[12px] font-bold leading-none text-gray-900 sm:text-[14px]">
                    {fmt(price)}
                </span>
                {hasMrp && (
                    <span className="text-[9px] font-normal leading-none text-gray-400 line-through sm:text-[11px]">
                    {fmt(mrp)}
                    </span>
                )}
                </div>

                <button
                type="button"
                onClick={handleAdd}
                aria-label={`Add ${name}`}
                className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border border-[#C7D2FE] bg-white text-[#4F46E5] transition-colors hover:bg-[#EEF2FF] active:scale-95 sm:h-6 sm:w-6"
                >
                <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                </button>
            </div>
            </div>

            {/* Desktop product Card */}
            <Link 
  href={`/product/${productId}`} prefetch
  className="group hidden w-full max-w-[320px] mx-auto flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl lg:flex"
>
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f4f6] p-6 flex items-center justify-center">
                <img 
                    src={productImage} 
                    alt={productName}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Badges */}
                {isDiscounted && (
                    <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded shadow-lg">
                        Sale
                    </div>
                )}

                {/* Quick Action Overlay */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div className="w-full bg-white/95 backdrop-blur-md text-black px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase border border-gray-200 shadow-xl hover:bg-black hover:text-white transition-colors duration-300 text-center rounded-lg flex items-center justify-center gap-2">
                        Discover <ArrowUpRight size={14} />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="pt-6 pb-5 flex flex-col items-center text-center px-4 relative">
                {/* Decorative line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                <h3
  className="font-serif text-[11px] sm:text-[13px] font-medium leading-4 tracking-[0.01em] 
             text-[#1f2937] line-clamp-2 text-center transition-colors duration-300 
             group-hover:text-[#2874f0]"
>
  {productName}
</h3>



                {product.itemCode && (
  <div className="mt-1">
    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-gray-700 border border-gray-200">
      {product.itemCode}
    </span>
  </div>
)}

                <div className="flex items-center justify-center gap-3 mt-1">
                    {isDiscounted && (
                        <span className="text-sm text-gray-400 line-through decoration-gray-300 font-light">
                            {productMrp}
                        </span>
                    )}
                    <span className="text-base font-semibold text-gray-900">
                        {productPrice}
                    </span>

                    
                </div>
                <div className="mt-2">
                    {product?.stock > 10 ? (
                        <span className="text-green-600 text-xs font-medium">
                        In Stock 
                        </span>
                    ) : product?.stock > 0 ? (
                        <span className="text-orange-600 text-xs font-medium">
                        Only {product.stock} left
                        </span>
                    ) : (
                        <span className="text-red-600 text-xs font-medium">
                        Out of Stock
                        </span>
                    )}
                    </div>

                {discountPercentage > 0 && (
                    <div className="mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-bold tracking-wide rounded">
                        {discountPercentage}% OFF
                    </div>
                )}
                
                
                {/* Minimalist Rating */}
                <div className="flex items-center justify-center gap-1.5 mt-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                    <Star size={12} className="fill-[#ff9900] text-[#ff9900]" />
                    <span className="text-xs text-gray-600 font-medium tracking-wide">
                        {reviewCount > 0 ? avgRating.toFixed(1) : 'No rating'}
{reviewCount > 0 && (
  <span className="text-gray-400 ml-1">({reviewCount})</span>
)}
                    </span>
                </div>
            </div>
        </Link>
      
      </>
  )
}

export default ProductCard
