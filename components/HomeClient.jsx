'use client'

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchProducts } from "@/lib/features/product/productSlice"
import ShubhamGoyal from "@/components/ShubhamGoyal"

import Hero from "@/components/Hero"


import LatestProducts from "@/components/LatestProducts"

import WhatsAppButton from "@/components/Whatsapp"
export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    // ✅ Always load default products for Home
    dispatch(fetchProducts({}))
  }, [])

  return (
    <div>
      <Hero />
      
      
      <LatestProducts />
      
      <ShubhamGoyal />
      
      
    </div>
  )
}
