"use client";

import { WifiOff, RefreshCw, ShoppingBag } from "lucide-react";

export default function OfflineScreen() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <main className="fixed inset-0 z-[99999] flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm text-center">

        {/* Icon */}
        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <WifiOff
              className="h-8 w-8 text-blue-600"
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* Logo / Brand */}
        <div className="mb-5 flex items-center justify-center gap-2">
          <ShoppingBag className="h-5 w-5 text-blue-600" />

          <span className="text-lg font-extrabold tracking-tight text-gray-900">
            Shubh Value Cart
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-gray-900">
          Oops! You're Offline
        </h1>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-[290px] text-sm leading-6 text-gray-500">
          It looks like you're not connected to the internet.
          Please check your Wi-Fi or mobile data and try again.
        </p>

        {/* Retry */}
        <button
          onClick={handleRetry}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition active:scale-95 hover:bg-blue-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>

        {/* Bottom message */}
        <p className="mt-6 text-[11px] text-gray-400">
          Your connection will be checked automatically.
        </p>
      </div>
    </main>
  );
}