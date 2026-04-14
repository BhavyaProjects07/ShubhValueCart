"use client"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import Loading from "@/components/Loading"
import { useRouter } from "next/navigation"
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios"

export default function StoreManageProducts() {
  const { getToken } = useAuth()
  const { user } = useUser()
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "$"
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // ✅ FILTER STATE (already present)
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    inStock: false,
    sort: "latest",
  })

  // ✅ BUILD QUERY STRING (NEW)
  const buildQuery = (pageNum) => {
    const params = new URLSearchParams()

    params.append("page", pageNum)

    if (filters.search) params.append("search", filters.search)
    if (filters.category) params.append("category", filters.category)
    if (filters.minPrice) params.append("minPrice", filters.minPrice)
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice)
    if (filters.inStock) params.append("inStock", "true")
    if (filters.sort) params.append("sort", filters.sort)

    return params.toString()
  }

  // ✅ UPDATED FETCH (ONLY CHANGE HERE)
  const fetchProducts = async (pageNum = 1) => {
    try {
      const token = await getToken()

      const { data } = await axios.get(
        `/api/store/product?${buildQuery(pageNum)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setProducts(data.products)
      setTotalPages(data.pagination.totalPages)

    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    }

    setLoading(false)
  }

  const toggleStock = async (productId) => {
    try {
      const token = await getToken()
      const { data } = await axios.post(
        "/api/store/stock-toggle",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, inStock: !p.inStock } : p
        )
      )

      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    }
  }

  // ✅ FETCH ON FILTER CHANGE (IMPORTANT)
  useEffect(() => {
    if (user) {
      fetchProducts(page)
    }
  }, [user, page, filters])

  if (loading) return <Loading />

  return (
    <>
      <h1 className="text-2xl text-[#9a8978] mb-5">
        Manage <span className="text-[#6b5d52] font-medium">Products</span>
      </h1>

      {/* 🔥 FILTER BAR (NEW - AMAZON STYLE MINIMAL) */}
      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) =>
            setFilters({ ...filters, minPrice: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
          className="border p-2 rounded"
        />

        <select
          value={filters.sort}
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="latest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price_low_high">Price Low → High</option>
          <option value="price_high_low">Price High → Low</option>
        </select>

        <label className="flex items-center gap-2 col-span-2 md:col-span-1">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) =>
              setFilters({ ...filters, inStock: e.target.checked })
            }
          />
          In Stock
        </label>

      </div>

      {/* ✅ ORIGINAL TABLE (UNCHANGED) */}
      <table className="w-full max-w-4xl text-left ring ring-[#ede6dd] rounded overflow-hidden text-sm">
        <thead className="bg-[#f0e8e0] text-[#6b5d52] uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3 hidden md:table-cell">Description</th>
            <th className="px-4 py-3 hidden md:table-cell">MRP</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-[#6b5d52]">
          {products.map((product) => (
            <tr key={product.id} className="border-t border-[#ede6dd] hover:bg-[#fefdfb]">
              <td className="px-4 py-3">
                <div className="flex gap-2 items-center">
                  <Image
                    width={40}
                    height={40}
                    className="p-1 shadow rounded cursor-pointer"
                    src={product.images[0] || "/placeholder.svg"}
                    alt=""
                  />
                  {product.name}
                </div>
              </td>

              <td className="px-4 py-3 max-w-md text-[#9a8978] hidden md:table-cell truncate">
                {product.description}
              </td>

              <td className="px-4 py-3 hidden md:table-cell">
                {currency} {product.mrp.toLocaleString()}
              </td>

              <td className="px-4 py-3">
                {currency} {product.price.toLocaleString()}
              </td>

              <td className="px-4 py-3 text-center">
                <label className="relative inline-flex items-center cursor-pointer text-[#6b5d52] gap-3">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={() =>
                      toast.promise(toggleStock(product.id), {
                        loading: "Updating data...",
                      })
                    }
                    checked={product.inStock}
                  />
                  <div className="w-9 h-5 bg-[#dcd2c8] rounded-full peer peer-checked:bg-[#6b5d52]"></div>
                  <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-4"></span>
                </label>

                <button
                  onClick={() =>
                    router.push(`/store/add-product?edit=${product.id}`)
                  }
                  className="text-xs px-3 py-1 border border-[#ede6dd] rounded hover:bg-[#f0e8e0]"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ PAGINATION (UNCHANGED) */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  )
}