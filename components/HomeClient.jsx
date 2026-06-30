'use client'

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchProducts } from "@/lib/features/product/productSlice"

import BestSelling from "@/components/BestSelling"
import Hero from "@/components/Hero"

import OurSpecs from "@/components/OurSpec"
import LatestProducts from "@/components/LatestProducts"
import Lookbook from "@/components/ExtraUI"
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
      <BestSelling />
      
      <WhatsAppButton />
    </div>
  )
}
