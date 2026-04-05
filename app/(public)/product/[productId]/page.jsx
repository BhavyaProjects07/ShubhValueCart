'use client'

import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Product() {

  const { productId } = useParams();

  const reduxProducts = useSelector(state => state.product.list);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        console.log("🔥 Product ID:", productId);

        // ✅ 1. Try Redux first (fast)
        const reduxProduct = reduxProducts.find(p => p.id === productId);

        if (reduxProduct) {
          console.log("⚡ Loaded from Redux");
          setProduct(reduxProduct);
          setLoading(false);
          return;
        }

        // ✅ 2. Fallback to API (reliable)
        console.log("🌐 Fetching from API...");
        const res = await fetch(`/api/products/${productId}`);

        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();

        console.log("✅ API Product:", data);

        setProduct(data.product);

      } catch (error) {
        console.error("❌ Product Fetch Error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) loadProduct();

    // scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

  }, [productId, reduxProducts]);

  // ✅ Loading State
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  // ✅ Not Found State
  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="mx-6">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="text-gray-600 text-sm mt-8 mb-5">
          Home / Products / {product.category}
        </div>

        {/* Product Details */}
        <ProductDetails product={product} />

        {/* Description */}
        <ProductDescription product={product} />

      </div>
    </div>
  );
}