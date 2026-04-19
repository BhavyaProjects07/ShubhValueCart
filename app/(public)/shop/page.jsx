'use client'

import { useEffect, Suspense, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "@/lib/features/product/productSlice"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import FilterSidebar from "@/components/store/FilterSidebar"
import { motion, AnimatePresence } from "framer-motion"
import Loading from "@/components/Loading"

function ShopContent() {

  const router = useRouter()
  const searchParams = useSearchParams()

  // ✅ URL STATE (SOURCE OF TRUTH)
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""
  const page = Number(searchParams.get("page")) || 1

  const minPrice = Number(searchParams.get("minPrice")) || 0
  const maxPrice = Number(searchParams.get("maxPrice")) || 10000
  const minRating = Number(searchParams.get("minRating")) || 0
  const minDiscount = Number(searchParams.get("minDiscount")) || 0

  const dispatch = useDispatch()
  const products = useSelector(state => state.product.list) || []
  const pagination = useSelector(state => state.product.pagination) || {}

  /* ---------------- LOCAL FILTER UI STATE ---------------- */
  const [filters, setFilters] = useState({
    minPrice,
    maxPrice,
    minRating,
    minDiscount,
  })

  const [showFilters, setShowFilters] = useState(false)

  /* ---------------- SYNC URL → FILTER STATE ---------------- */
  useEffect(() => {
    setFilters({
      minPrice,
      maxPrice,
      minRating,
      minDiscount,
    })
  }, [minPrice, maxPrice, minRating, minDiscount])

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
  dispatch(fetchProducts({
    search,
    category,
    page,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minRating: filters.minRating,
    minDiscount: filters.minDiscount
  }))
}, [
  search,
  category,
  page,
  filters.minPrice,
  filters.maxPrice,
  filters.minRating,
  filters.minDiscount,
  dispatch
  ])
  
  /* ---------------- APPLY FILTER → UPDATE URL ---------------- */
  useEffect(() => {
    const url =
      `/shop?page=1` +
      (category ? `&category=${category}` : "") +
      (search ? `&search=${search}` : "") +
      (filters.minPrice ? `&minPrice=${filters.minPrice}` : "") +
      (filters.maxPrice ? `&maxPrice=${filters.maxPrice}` : "") +
      (filters.minRating ? `&minRating=${filters.minRating}` : "") +
      (filters.minDiscount ? `&minDiscount=${filters.minDiscount}` : "")

    router.push(url)
  }, [
    filters.minPrice,
    filters.maxPrice,
    filters.minRating,
    filters.minDiscount
  ])

  /* ---------------- UI ---------------- */

  const totalPages = pagination?.totalPages || 1

  const heading = search
    ? `Search results for "${search}"`
    : category
    ? category.replace("-", " ").toUpperCase()
    : "All Products"

  /* ---------------- URL BUILDER ---------------- */

  const buildUrl = (newPage) => {
    let url = `/shop?page=${newPage}`

    if (category) url += `&category=${category}`
    if (search) url += `&search=${search}`

    if (minPrice) url += `&minPrice=${minPrice}`
    if (maxPrice) url += `&maxPrice=${maxPrice}`
    if (minRating) url += `&minRating=${minRating}`
    if (minDiscount) url += `&minDiscount=${minDiscount}`

    return url
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-32">

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-24">

        {/* HEADER */}
        <motion.div className="mb-12">

          <div onClick={() => router.push("/shop")} className="cursor-pointer mb-4">
            {search && <MoveLeftIcon size={16} />}
          </div>

          <h1 className="text-4xl font-bold">{heading}</h1>

          <button
  onClick={() => setShowFilters(true)}
  className="md:hidden mt-4 px-4 py-2 bg-black text-white rounded-lg"
>
  Filters
</button>

        </motion.div>

        <div className="flex gap-10">

          {/* SIDEBAR */}
          
            <FilterSidebar
  filters={filters}
  setFilters={setFilters}
  isOpen={showFilters}
  setIsOpen={setShowFilters}
/>
          

          {/* PRODUCTS */}
          <div className="flex-1">

            {products.length === 0 ? (
              <div className="text-center py-20">
                No products found
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {products.map(product => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </motion.div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-2">

                <button
                  onClick={() => router.push(buildUrl(Math.max(1, page - 1)))}
                  disabled={page === 1}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(Math.max(page - 2, 0), page + 2)
                  .map(p => (
                    <button
                      key={p}
                      onClick={() => router.push(buildUrl(p))}
                      className={p === page ? "font-bold text-blue-500" : ""}
                    >
                      {p}
                    </button>
                  ))}

                <button
                  onClick={() => router.push(buildUrl(Math.min(totalPages, page + 1)))}
                  disabled={page === totalPages}
                >
                  Next
                </button>

              </div>
            )}

          </div>
        </div>

        {/* MOBILE FILTER */}
        

      </div>
    </div>
  )
}

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  )
}