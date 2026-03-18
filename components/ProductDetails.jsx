'use client'

import { addToCart } from "@/lib/features/cart/cartSlice"
import {
  StarIcon,
  TagIcon,
  EarthIcon,
  CreditCardIcon,
  UserIcon,
  ShoppingBag
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Counter from "./Counter"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

const ProductDetails = ({ product }) => {
  const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]
  const FootSizes = ["UK-5", "UK-6", "UK-7", "UK-8", "UK-9", "UK-10", "UK-11"]
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$"
  const productId = product.id

  const isFootwear = product?.category?.toLowerCase().includes("footwear")
  const sizeList = isFootwear ? FootSizes : SIZES

  const cart = useSelector(state => state.cart.cartItems)
  const dispatch = useDispatch()
  const router = useRouter()

  const [mainImage, setMainImage] = useState(product.images[0])
  const [selectedSize, setSelectedSize] = useState(null)

  const discountPercentage =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0

  const averageRating =
    product.rating.length > 0
      ? product.rating.reduce((acc, item) => acc + item.rating, 0) /
        product.rating.length
      : 0

  const addToCartHandler = () => {
    if (product.hasSizes && !selectedSize) {
      return toast.error("Please select a size")
    }

    dispatch(addToCart({
      productId,
      size: selectedSize || null,
      hasSize: true
    }))
    toast.success("Added to cart")
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24 py-12 lg:py-24 font-inter">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* IMAGES SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col-reverse sm:flex-row gap-4 lg:w-1/2"
        >
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto pb-2 sm:pb-0 scrollbar-hide">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setMainImage(image)}
                className={`relative shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden bg-[#F5F5F7] transition-all duration-300 ${
                  mainImage === image ? 'ring-2 ring-[#1D1D1F] ring-offset-2' : 'hover:opacity-80'
                }`}
              >
                <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full aspect-[4/5] sm:aspect-auto sm:flex-1 bg-[#F5F5F7] rounded-[2rem] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={mainImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image src={mainImage} alt={product.name} fill className="object-cover" priority />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* DETAILS SECTION */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-center"
        >
          {/* Category / Brand Label */}
          <div className="mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
              {product.category || "Premium Collection"}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter text-[#1D1D1F] leading-[1.1]">
            {product.name}
          </h1>

          {/* RATING */}
          <div className="flex items-center mt-4 gap-4">
            <div className="flex items-center gap-1">
              {Array(5).fill("").map((_, i) => (
                <StarIcon
                  key={i}
                  size={16}
                  fill={averageRating >= i + 1 ? "#1D1D1F" : "transparent"}
                  className={averageRating >= i + 1 ? "text-[#1D1D1F]" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-[#1D1D1F] transition-colors">
              {product.rating.length} Reviews
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-end gap-4 mt-8 mb-6">
            <p className="text-4xl font-extrabold text-[#1D1D1F] tracking-tight">
              {currency}{product.price}
            </p>
            {product.mrp > product.price && (
              <p className="text-xl text-gray-400 line-through font-medium mb-1">
                {currency}{product.mrp}
              </p>
            )}
          </div>

          {discountPercentage > 0 && (
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold w-fit mb-8">
              <TagIcon size={14} />
              <span>Save {discountPercentage}% today</span>
            </div>
          )}

          {/* SIZES */}
          {product.hasSizes && product.sizes && (
            <div className="mt-2 mb-10">
              <div className="flex justify-between items-end mb-4">
                <p className="text-sm font-bold text-[#1D1D1F] uppercase tracking-wider">
                  Select Size
                </p>
                <button className="text-xs font-medium text-gray-500 underline underline-offset-4 hover:text-[#1D1D1F] transition-colors">
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {sizeList.map(size => {
                  const available = product.sizes[size]

                  return (
                    <button
                      key={size}
                      disabled={!available}
                      onClick={() => available && setSelectedSize(size)}
                      className={`
                        relative h-12 min-w-[3.5rem] px-4 rounded-full border
                        text-sm font-semibold tracking-wide
                        flex items-center justify-center
                        transition-all duration-200
                        ${
                          selectedSize === size
                            ? "border-[#1D1D1F] bg-[#1D1D1F] text-white shadow-md scale-105"
                            : "border-gray-200 text-gray-600 bg-white"
                        }
                        ${available ? "hover:border-[#1D1D1F] hover:text-[#1D1D1F]" : "opacity-40 cursor-not-allowed bg-gray-50"}
                      `}
                    >
                      {size}
                      {!available && (
                        <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
                          <span className="absolute w-[150%] h-[1px] bg-gray-300 rotate-[-45deg] top-1/2 left-[-25%]" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* CART ACTIONS */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            {cart[productId] && (
              <div className="flex items-center bg-[#F5F5F7] rounded-full p-1 h-14 shrink-0">
                <Counter productId={productId} />
              </div>
            )}

            <button
              onClick={() =>
                !cart[productId] ? addToCartHandler() : router.push("/cart")
              }
              className="flex-1 w-full h-14 bg-[#1D1D1F] text-white px-8 text-sm font-bold tracking-wide uppercase rounded-full hover:bg-black hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-300 flex items-center justify-center gap-3"
            >
              {!cart[productId] ? (
                <>
                  <ShoppingBag size={18} />
                  Add to Cart
                </>
              ) : (
                "View Cart"
              )}
            </button>
          </div>

          <hr className="border-gray-100 my-10" />

          {/* TRUST BADGES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6">
            <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
              <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] shrink-0">
                <EarthIcon size={20} />
              </div>
              Free worldwide shipping
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
              <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] shrink-0">
                <CreditCardIcon size={20} />
              </div>
              Secure payments
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-gray-600 sm:col-span-2">
              <div className="w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] shrink-0">
                <UserIcon size={20} />
              </div>
              Trusted by premium brands globally
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetails
