"use client";

import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";
import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflineScreen() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let listener;

    const initializeNetwork = async () => {
      const status = await Network.getStatus();

      setIsOffline(!status.connected);

      listener = await Network.addListener(
        "networkStatusChange",
        (status) => {
          setIsOffline(!status.connected);
        }
      );
    };

    initializeNetwork();

    return () => {
      listener?.remove();
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          <WifiOff className="h-9 w-9 text-blue-600" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Oops! You're offline
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Please check your internet connection and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>

      </div>
    </div>
  );
}