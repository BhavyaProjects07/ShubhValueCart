"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function CouponBanner() {
  const [showOffer, setShowOffer] = useState(true);
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    // const hidden = localStorage.getItem("hideOffer");

    // if (hidden === "true") {
    //   setShowOffer(false);
    // }

    axios
      .get("/api/public/coupons")
      .then((res) => {
        if (res.data?.length) {
          setCoupon(res.data[0]);
        }
      })
      .catch((err) => {
        console.error("COUPON FETCH ERROR:", err);
      });
  }, []);

  const copyCoupon = () => {
    if (!coupon) return;

    navigator.clipboard.writeText(coupon.code);
    toast.success("Coupon copied!");
  };

  if (!showOffer) return null;

  return (
  <div className="relative overflow-hidden bg-gradient-to-r from-[#0057d9] via-[#2874f0] to-[#4a90ff] text-white shadow-md">

    {/* Background */}
    <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute right-0 bottom-0 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.15),transparent_45%)]" />

    <div className="relative mx-auto max-w-6xl px-4 py-3 sm:py-4 md:px-6 md:py-6">

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">

        {/* LEFT */}
        <div className="flex w-full items-center gap-3 pr-8 lg:w-[68%] lg:gap-4 lg:pr-0">

          <div className="hidden sm:flex h-14 w-14 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur">
            <span className="text-3xl md:text-5xl">
              🎁
            </span>
          </div>

          <div className="min-w-0">

            <div className="inline-flex items-center rounded-full bg-yellow-400 px-2.5 py-0.5 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-black shadow">
              Limited Time Offer
            </div>

            <h2 className="mt-1.5 text-lg font-black leading-tight sm:text-2xl lg:text-4xl">

              Save Big on{" "}

              <span className="text-yellow-300">
                Grocery Shopping
              </span>

            </h2>

            <p className="mt-1 max-w-xl text-xs text-blue-100 sm:text-sm">

              {coupon
                ? coupon.description
                : "Loading latest offers..."}

            </p>

            {coupon && (

              <div className="mt-2.5 sm:mt-3">

                <div className="flex flex-wrap items-center gap-2">

                  {/* Coupon */}
                  <div className="rounded-lg border-2 border-dashed border-yellow-300 bg-white px-3 py-1.5 shadow">

                    <div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-gray-500">

                      Coupon Code

                    </div>

                    <div className="text-sm font-black tracking-[0.18em] text-[#2874f0] sm:text-base">

                      {coupon.code}

                    </div>

                  </div>

                  <button
                    onClick={copyCoupon}
                    className="rounded-lg bg-yellow-400 px-4 py-2 text-xs font-bold text-black shadow-md transition hover:scale-105 hover:bg-yellow-300 active:scale-95 sm:text-sm"
                  >
                    Copy Coupon
                  </button>

                </div>

                {/* Compact mobile-only note, replaces the separate SALE card below lg */}
                <p className="mt-1.5 text-[11px] text-blue-100/90 lg:hidden">
                  Apply at checkout for extra savings
                </p>

              </div>

            )}

          </div>

        </div>

        {/* RIGHT — desktop showcase card only; folded into the note above on mobile */}
        {coupon && (
          <div className="hidden lg:block lg:w-[240px] lg:flex-shrink-0">

            <div className="rounded-2xl bg-white px-5 py-4 text-center shadow-xl">

              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">

                Extra Savings

              </p>

              <h2 className="mt-1 text-3xl font-black text-[#2874f0]">

                SALE

              </h2>

              <p className="mt-1 text-xs text-gray-500">

                Apply Coupon During Checkout

              </p>

              <button
                onClick={copyCoupon}
                className="mt-3 w-full rounded-xl bg-[#2874f0] py-2 text-sm font-bold text-white transition hover:bg-[#1458c4]"
              >
                Apply Now
              </button>

            </div>

          </div>
        )}

      </div>

      {/* Close */}

      <button
        onClick={() => {
          setShowOffer(false);
          localStorage.setItem("hideOffer", "true");
        }}
        className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25 md:right-5 md:top-5 md:h-9 md:w-9"
      >
        ✕
      </button>

    </div>

  </div>
);
}