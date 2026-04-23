"use client";

import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProductClient({ productId, initialProduct }) {
  const reduxProducts = useSelector((state) => state.product.list);

  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const reduxProduct = reduxProducts.find((p) => p.id === productId);

        if (reduxProduct) {
          setProduct(reduxProduct);
          setLoading(false);
          return;
        }

        if (initialProduct) {
          setProduct(initialProduct);
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/products/${productId}`);

        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Product fetch error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) loadProduct();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId, reduxProducts, initialProduct]);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center text-red-500">Product not found</div>;
  }

  return (
    <div className="mx-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-gray-600 text-sm mt-8 mb-5">
          Home / Products / {product.category}
        </div>

        <ProductDetails product={product} />
        <ProductDescription product={product} />
      </div>
    </div>
  );
}
