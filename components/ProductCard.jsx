import React from 'react';
import { Star } from 'lucide-react';

/**
 * Luxury Editorial Product Card
 * High-end, sophisticated, and elegant aesthetic.
 */
const ProductCard = ({ product }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const productName = product?.name || "Signature Collection";
    const productPrice = product?.price || "0.00";
    const productMrp = product?.mrp;
    const productImage = product?.images?.[0] || "https://picsum.photos/seed/luxury/800/1000";
    const productId = product?.id || "000";
    
    // Calculate rating safely
    const ratingArray = Array.isArray(product?.rating) ? product.rating : [];
    const avgRating = ratingArray.length > 0 
        ? Math.round(ratingArray.reduce((acc, curr) => acc + (curr.rating || 0), 0) / ratingArray.length)
        : 0;

    const hasDiscount = productMrp && parseFloat(productMrp) > parseFloat(productPrice);

    return (
        <a 
            href={`/product/${productId}`} 
            className="group flex flex-col bg-white transition-all duration-700 hover:-translate-y-1"
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F8F8]">
                <img 
                    src={productImage} 
                    alt={productName}
                    className="w-full h-full object-cover object-center transition-transform duration-[2s] ease-out group-hover:scale-110"
                />
                
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                
                {/* Badges */}
                {hasDiscount && (
                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-medium tracking-widest uppercase">
                        Sale
                    </div>
                )}

                {/* Quick Action Overlay */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div className="bg-white/95 backdrop-blur-sm text-black px-8 py-3 text-xs font-medium tracking-[0.15em] uppercase border border-gray-100 shadow-sm hover:bg-black hover:text-white transition-colors duration-300">
                        Discover
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="pt-5 pb-3 flex flex-col items-center text-center px-2">
                <span className="text-[9px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                    Signature
                </span>
                
                <h3 className="font-serif text-lg text-gray-900 line-clamp-1 mb-1.5">
                    {productName}
                </h3>

                <div className="flex items-center gap-3 mt-1">
                    {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through decoration-gray-300 font-light">
                            {currency}{productMrp}
                        </span>
                    )}
                    <span className="text-sm font-medium text-gray-900">
                        {currency}{productPrice}
                    </span>
                </div>
                
                {/* Minimalist Rating */}
                {ratingArray.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                        <Star size={10} className="fill-gray-900 text-gray-900" />
                        <span className="text-[11px] text-gray-600 font-medium">
                            {avgRating.toFixed(1)}
                        </span>
                    </div>
                )}
            </div>
        </a>
    );
};

export default ProductCard;