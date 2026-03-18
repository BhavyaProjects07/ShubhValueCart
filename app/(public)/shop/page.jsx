'use client'

import { useEffect, Suspense, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "@/lib/features/product/productSlice"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon, SlidersHorizontal, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import FilterSidebar from "@/components/store/FilterSidebar"
import { motion, AnimatePresence } from "framer-motion"

function ShopContent() {
  const formatCategory = (category) => {
    if (!category) return "";
    return category.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase());
  };

  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || "";

  const dispatch = useDispatch()
  const products = useSelector(state => state.product.list) || []

  /* ---------------- FILTER STATE ---------------- */
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: 0,
    maxPrice: 100000,
    minRating: 0,
    minDiscount: 0,
  })

  const [showFilters, setShowFilters] = useState(false)

  /* ---------------- HELPERS ---------------- */
  const getDiscount = (product) => {
    const mrp = Number(product.mrp)
    const price = Number(product.price)
    if (!mrp || mrp <= price) return 0
    return Math.round(((mrp - price) / mrp) * 100)
  }

  const filteredProducts = products.filter(product => {
    const discount = getDiscount(product)

    if (filters.categories.length && !filters.categories.includes(product.category)) return false
    if (product.price > filters.maxPrice) return false
    if (filters.minRating > 0) {
      const avgRating = product.rating.length
        ? product.rating.reduce((a, r) => a + r.rating, 0) / product.rating.length
        : 0
      if (avgRating < filters.minRating) return false
    }
    if (filters.minDiscount > 0 && discount < filters.minDiscount) return false

    return true
  })

  useEffect(() => {
    dispatch(fetchProducts({ search, category }))
    setFilters({
      categories: [],
      minPrice: 0,
      maxPrice: 100000,
      minRating: 0,
      minDiscount: 0,
    })
  }, [search, category, dispatch])
  
  let heading = "All Products";
  if (search) {
    heading = `Search results for "${search}"`;
  } else if (category) {
    heading = formatCategory(category);
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-inter pt-24 pb-32">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24">

        {/* ---------- HEADING ---------- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <div 
            onClick={() => router.push("/shop")}
            className="inline-flex items-center gap-2 cursor-pointer group mb-4"
          >
            {search && (
              <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <MoveLeftIcon size={16} className="text-[#1D1D1F]" />
              </div>
            )}
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 group-hover:text-[#1D1D1F] transition-colors">
              {search ? "Back to Shop" : "Collections"}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.1] text-[#1D1D1F]">
              {heading}
            </h1>
            
            {/* ---------- MOBILE FILTER BUTTON ---------- */}
            <button
              onClick={() => setShowFilters(true)}
              className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-[#F5F5F7] text-[#1D1D1F] text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors w-full sm:w-auto"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </motion.div>

        <div className="flex gap-10 lg:gap-16">

          {/* ---------- DESKTOP SIDEBAR ---------- */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="sticky top-32">
              <h3 className="text-sm font-bold tracking-[0.15em] uppercase text-[#1D1D1F] mb-6">
                Filter By
              </h3>
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* ---------- PRODUCTS ---------- */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-32 bg-[#F5F5F7] rounded-[2rem]"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <SlidersHorizontal size={24} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F] mb-2">No products found</h2>
                <p className="text-gray-500 font-medium">Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={() => {
                    setFilters({ categories: [], minPrice: 0, maxPrice: 100000, minRating: 0, minDiscount: 0 })
                    router.push("/shop")
                  }}
                  className="mt-8 px-8 py-3 bg-white border border-gray-200 text-[#1D1D1F] text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12"
              >
                {filteredProducts.map(product => (
                  <motion.div variants={itemVariants} key={product.id}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* ---------- MOBILE FILTER MODAL ---------- */}
        <AnimatePresence>
          {showFilters && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowFilters(false)}
                className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:hidden"
              />

              {/* Panel */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-[2rem] max-h-[85vh] flex flex-col md:hidden shadow-2xl"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold tracking-tight text-[#1D1D1F]">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-8 h-8 bg-[#F5F5F7] rounded-full flex items-center justify-center text-gray-500 hover:text-[#1D1D1F] transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                  />
                </div>

                <div className="p-6 border-t border-gray-100 bg-white">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full bg-[#1D1D1F] text-white py-4 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg hover:bg-black active:scale-[0.98] transition-all"
                  >
                    Show {filteredProducts.length} Results
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#1D1D1F] rounded-full animate-spin"></div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
