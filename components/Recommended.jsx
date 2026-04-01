import { Gift } from "lucide-react"
import ProductCard from "./ProductCard"

export default function Recommended({ products }) {
  return (
    <ProductGrid
      title="Recommended For You"
      products={products}
      icon={Gift}
    />
  )
}