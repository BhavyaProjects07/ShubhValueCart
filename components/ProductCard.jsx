import React from 'react';
import { Star, ArrowUpRight } from 'lucide-react';
import Link from "next/link"
import Loading from './Loading';
/**
 * Luxury Editorial Product Card
 * High-end, sophisticated, and elegant aesthetic.
 */
const ProductCard = ({ product }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '';
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

    if (!product) return <Loading />
    return (
        <Link 
  href={`/product/${productId}`} prefetch
  className="group flex flex-col w-full max-w-[320px] mx-auto ..."
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

                <span className="text-[9px] tracking-[0.25em] text-gray-400 uppercase mb-2.5 font-medium">
                    Signature
                </span>
                
                <h3 className="font-serif text-lg sm:text-xl text-gray-900 line-clamp-2 mb-2 font-medium tracking-tight group-hover:text-[#2874f0] transition-colors">
                    {productName}
                </h3>

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
      In Stock ({product.stock})
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
    );
};

export default ProductCard;