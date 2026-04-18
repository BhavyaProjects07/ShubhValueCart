"use client";

import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full text-center animate-scaleIn">

        {/* ICON */}
        <div className="flex justify-center mb-5">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="text-green-600 w-14 h-14" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-gray-800">
          Order Confirmed 🎉
        </h1>

        {/* SUBTEXT */}
        <p className="text-gray-500 mt-2 text-sm">
          Your order has been successfully placed.
        </p>

        {/* STATUS CARD */}
        <div className="bg-gray-50 rounded-xl p-4 mt-6 flex items-center gap-3 text-left">
          <Package className="text-green-600" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              Preparing your order
            </p>
            <p className="text-xs text-gray-400">
              You can track status anytime
            </p>
          </div>
        </div>

        {/* TRACK BUTTON */}
        <button
          onClick={() => router.push("/orders")}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
        >
          Track Your Order
          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
}