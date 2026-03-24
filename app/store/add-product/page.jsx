"use client"

import { assets } from "@/assets/assets"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import Image from "next/image"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { useSearchParams, useRouter } from "next/navigation"

export default function StoreAddProduct() {
  const router = useRouter()
  const { getToken } = useAuth()

  /* ---------------- SIZE STATES ---------------- */
  const [enableSizes, setEnableSizes] = useState(false)

  const [sizes, setSizes] = useState({
    XS: false,
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false,
    "UK-5": false,
    "UK-6": false,
    "UK-7": false,
    "UK-8": false,
    "UK-9": false,
    "UK-10": false,
    "UK-11": false,
  })

  /* ---------------- CATEGORY SYSTEM ---------------- */

  const [categories, setCategories] = useState([])

  const categoryMap = {
    SNACKS: "Food & Grocery",
    BISCUITS: "Food & Grocery",
    CHOCOLATE: "Food & Grocery",
    FOOD: "Food & Grocery",
    DRINKS: "Food & Grocery",
    ICE_CREAM: "Food & Grocery",

    MASALAS: "Staples & Cooking",
    GRAIN: "Staples & Cooking",
    FLOUR: "Staples & Cooking",
    DRY_FRUITS: "Staples & Cooking",

    BODY_CARE: "Personal Care",
    FACE_CARE: "Personal Care",
    HAIR_CARE: "Personal Care",

    CLEANING_ITEMS: "Home & Cleaning",

    BABY_CARE: "Baby Care",
    TOYS: "Toys & Kids",
    KIDS_TOY: "Toys & Kids",

    BULB: "Household Essentials",
    POOJA_ITEMS: "Household Essentials",

    STATIONERY: "Stationery",
  }

  /* ---------------- PRODUCT STATE ---------------- */

  const searchParams = useSearchParams()
  const editProductId = searchParams.get("edit")
  const isEditMode = !!editProductId

  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })

  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    mrp: 0,
    price: 0,
    category: "",
  })

  const [loading, setLoading] = useState(false)
  const [aiUsed, setAiUsed] = useState(false)

  /* ---------------- FETCH CATEGORIES ---------------- */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/categories")

        if (!data?.categories) {
          throw new Error("No categories from API")
        }

        setCategories(data.categories)
      } catch (err) {
        console.error("Category API failed → using fallback")

        setCategories([
          "Food & Grocery",
          "Staples & Cooking",
          "Personal Care",
          "Home & Cleaning",
          "Baby Care",
          "Toys & Kids",
          "Household Essentials",
          "Stationery",
          "Electronics",
          "Fashion",
        ])
      }
    }

    fetchCategories()
  }, [])

  /* ---------------- HANDLERS ---------------- */

  const onChangeHandler = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
  }

  const handleImageUpload = async (key, file) => {
    setImages(prev => ({ ...prev, [key]: file }))

    if (key == "1" && file && !aiUsed) {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onloadend = async () => {
        try {
          const token = await getToken()
          const base64String = reader.result.split(",")[1]

          await toast.promise(
            axios.post(
              "/api/store/ai",
              {
                base64Image: base64String,
                mimeType: file.type,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            ),
            {
              loading: "Analyzing Image with AI...",
              success: (res) => {
                if (res.data?.name && res.data?.description) {
                  setProductInfo(prev => ({
                    ...prev,
                    name: res.data.name,
                    description: res.data.description,
                  }))
                  setAiUsed(true)
                  return "AI filled product info"
                }
                return "AI could not analyze image"
              },
              error: err => err?.response?.data?.error || err.message,
            }
          )
        } catch (err) {
          console.error(err)
        }
      }
    }
  }

  /* ---------------- SUBMIT ---------------- */

  const onSubmitHandler = async (e) => {
  e.preventDefault()

  try {
    setLoading(true)

    const token = await getToken()
    console.log("TOKEN:", token) // 🔥 ADD THIS

    const formData = new FormData()

    const mappedCategory =
      categoryMap[productInfo.category?.toUpperCase()] ||
      productInfo.category

    Object.entries({
      ...productInfo,
      category: mappedCategory,
    }).forEach(([k, v]) => formData.append(k, v))

    Object.keys(images).forEach((key) => {
      if (images[key] && typeof images[key] !== "string") {
        formData.append("images", images[key])
      }
    })

    formData.append("hasSizes", enableSizes)
    formData.append("sizes", JSON.stringify(sizes))

    const endpoint = isEditMode
      ? `/api/store/product/${editProductId}`
      : "/api/store/product"

    const method = isEditMode ? "put" : "post"

    const promise = axios[method](endpoint, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })

    await toast.promise(promise, {
      loading: "Saving Product...",
      success: "Product added successfully",
      error: "Failed to add product",
    })

    router.push("/store/manage-product")
  } catch (err) {
    console.error(err)
    toast.error(err.response?.data?.error || err.message)
  } finally {
    setLoading(false)
  }
}

  /* ---------------- EDIT PREFILL ---------------- */

  useEffect(() => {
    if (!isEditMode) return

    const fetchProduct = async () => {
      try {
        const token = await getToken()
        const { data } = await axios.get(
          `/api/store/product/${editProductId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const product = data.product

        setProductInfo({
          name: product.name,
          description: product.description,
          mrp: product.mrp,
          price: product.price,
          category: product.category,
        })

        setEnableSizes(product.hasSizes || false)
        if (product.sizes) setSizes(product.sizes)

        setImages(
          product.images.reduce((acc, url, i) => {
            acc[i + 1] = url
            return acc
          }, {})
        )
      } catch {
        toast.error("Failed to load product")
      }
    }

    fetchProduct()
  }, [editProductId])

  /* ---------------- UI ---------------- */

  return (
    <form onSubmit={onSubmitHandler}>
      <h1 className="text-2xl mb-8">
        {isEditMode ? "Update" : "Add New"}{" "}
        <span className="text-[#6b5d52] font-medium">Product</span>
      </h1>

      <div className="flex gap-14 items-start">
        <div className="flex-1 max-w-xl">
          <p>Product Images</p>

          <div className="flex gap-3 mt-4">
            {Object.keys(images).map((key) => (
              <label key={key}>
                <Image
                  width={120}
                  height={120}
                  className="h-20 w-auto border rounded cursor-pointer"
                  src={
                    typeof images[key] === "string"
                      ? images[key]
                      : images[key]
                      ? URL.createObjectURL(images[key])
                      : "/placeholder.png"
                  }
                  alt=""
                />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(key, e.target.files[0])
                  }
                />
              </label>
            ))}
          </div>

          <input
            type="text"
            name="name"
            value={productInfo.name}
            onChange={onChangeHandler}
            placeholder="Product Name"
            className="w-full p-2 my-4 border rounded"
            required
          />

          <textarea
            name="description"
            value={productInfo.description}
            onChange={onChangeHandler}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          />

          <div className="flex gap-4 my-4">
            <input
              type="number"
              name="mrp"
              value={productInfo.mrp}
              onChange={onChangeHandler}
              placeholder="MRP"
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="number"
              name="price"
              value={productInfo.price}
              onChange={onChangeHandler}
              placeholder="Price"
              className="w-1/2 p-2 border rounded"
            />
          </div>

          {/* ✅ FIXED CATEGORY DROPDOWN */}
          <select
            value={productInfo.category}
            onChange={(e) =>
              setProductInfo({ ...productInfo, category: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat.slug || cat} value={cat.name || cat}>
                {cat.name || cat}
              </option>
            ))}
          </select>
        </div>

        <div className="w-[320px] border border-[#ede6dd] rounded-xl p-5 bg-white">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={enableSizes}
              onChange={() => setEnableSizes(v => !v)}
            />
            Enable Size Parameters
          </label>

          {enableSizes && (
            <div className="grid grid-cols-3 gap-3 mt-5">
              {Object.keys(sizes).map(size => (
                <label
                  key={size}
                  className="flex items-center gap-2 border p-2 rounded cursor-pointer text-sm"
                >
                  <input
                    type="checkbox"
                    checked={sizes[size]}
                    onChange={() =>
                      setSizes(prev => ({
                        ...prev,
                        [size]: !prev[size],
                      }))
                    }
                  />
                  {size}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>


      

      <button className="mt-6 px-6 py-2 bg-black text-white">
        {isEditMode ? "Update" : "Add Product"}
      </button>
    </form>
  )
}