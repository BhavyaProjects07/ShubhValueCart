import React from 'react';
import { Star, ArrowUpRight, ShoppingCart } from 'lucide-react';

/**
 * Neo-Brutalist Product Card
 * High-contrast, bold, creative tool aesthetic.
 */
const ProductCard = ({ product }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const productName = product?.name || "UNTITLED_OBJ";
    const productPrice = product?.price || "0.00";
    const productMrp = product?.mrp;
    const productImage = product?.images?.[0] || "https://picsum.photos/seed/tech/800/800";
    const productId = product?.id || "000";
    
    // Calculate rating safely
    const ratingArray = Array.isArray(product?.rating) ? product.rating : [];
    const avgRating = ratingArray.length > 0 
        ? Math.round(ratingArray.reduce((acc, curr) => acc + (curr.rating || 0), 0) / ratingArray.length)
        : 0;

    return (
        <a 
            href={`/product/${productId}`} 
            className="group block w-full max-w-[320px] mx-auto bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200"
        >
            {/* Top Bar */}
            <div className="flex justify-between items-center border-b-2 border-black px-3 py-2 bg-[#E4FF00] group-hover:bg-black group-hover:text-[#E4FF00] transition-colors duration-200">
                <span className="font-mono text-xs font-bold tracking-widest uppercase">
                    ID:{productId.toString().padStart(4, '0').slice(0,4)}
                </span>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-black group-hover:bg-[#E4FF00] animate-pulse"></span>
                    <span className="font-mono text-[10px] font-bold uppercase">Active</span>
                </div>
            </div>

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-100 border-b-2 border-black">
                {/* Scanline overlay */}
                <div className="absolute inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <img 
                    src={productImage} 
                    alt={productName}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-sm">
                    <div className="bg-[#E4FF00] text-black border-2 border-black px-4 py-2 font-bold font-mono uppercase flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Details <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 bg-white">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-sans font-black text-xl text-black uppercase leading-none tracking-tight line-clamp-2">
                        {productName}
                    </h3>
                </div>

                <div className="flex items-center gap-1 mb-4">
                    {Array(5).fill('').map((_, index) => (
                        <Star 
                            key={index} 
                            size={14} 
                            className={`${ratingArray.length > 0 && avgRating >= index + 1 ? "fill-black text-black" : "fill-transparent text-gray-300"} transition-colors duration-300`} 
                        />
                    ))}
                    <span className="font-mono text-xs text-gray-500 ml-2">
                        ({ratingArray.length})
                    </span>
                </div>

                {/* Bottom Bar */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-gray-300 group-hover:border-black transition-colors duration-300">
                    <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-gray-500 uppercase font-bold">Price</span>
                        <div className="flex items-baseline gap-2">
                            <span className="font-mono text-xl font-black text-black">
                                {currency}{productPrice}
                            </span>
                            {productMrp && (
                                <span className="font-mono text-xs font-bold text-gray-400 line-through">
                                    {currency}{productMrp}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <button className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-[#E4FF00] hover:text-black border-2 border-transparent hover:border-black transition-colors duration-200">
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </a>
    );
};

export default ProductCard;