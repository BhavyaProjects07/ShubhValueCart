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
  <div className="relative overflow-hidden bg-gradient-to-r from-[#0057d9] via-[#2874f0] to-[#4a90ff] text-white shadow-lg">

    {/* Background */}
    <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.15),transparent_45%)]" />

    <div className="relative mx-auto max-w-6xl px-4 py-5 md:px-6 md:py-6">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}
        <div className="flex w-full lg:w-[68%] items-center gap-4">

          <div className="hidden sm:flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur">
            <span className="text-4xl md:text-5xl">
              🎁
            </span>
          </div>

          <div>

            <div className="inline-flex items-center rounded-full bg-yellow-400 px-3 py-1 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-black shadow">
              LIMITED TIME OFFER
            </div>

            <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">

              Save Big on{" "}

              <span className="text-yellow-300">
                Grocery Shopping
              </span>

            </h2>

            <p className="mt-2 max-w-xl text-sm text-blue-100">

              {coupon
                ? coupon.description
                : "Loading latest offers..."}

            </p>

            {coupon && (

              <div className="mt-4 flex flex-wrap items-center gap-3">

                {/* Coupon */}
                <div className="rounded-xl border-2 border-dashed border-yellow-300 bg-white px-4 py-2 shadow-lg">

                  <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-500">

                    Coupon Code

                  </div>

                  <div className="mt-1 text-lg md:text-xl font-black tracking-[0.22em] text-[#2874f0]">

                    {coupon.code}

                  </div>

                </div>

                <button
                  onClick={copyCoupon}
                  className="rounded-xl bg-yellow-400 px-5 py-2.5 text-sm font-bold text-black shadow-lg transition hover:scale-105 hover:bg-yellow-300 active:scale-95"
                >
                  Copy Coupon
                </button>

              </div>

            )}

          </div>

        </div>

        {/* RIGHT */}
        <div className="mx-auto w-full max-w-[250px] lg:w-[270px] lg:flex-shrink-0">

          <div className="rounded-3xl bg-white px-5 py-5 text-center shadow-2xl">

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500">

              EXTRA SAVINGS

            </p>

            <h2 className="mt-2 text-4xl md:text-5xl font-black text-[#2874f0]">

              SALE

            </h2>

            <p className="mt-2 text-xs md:text-sm text-gray-500">

              Apply Coupon During Checkout

            </p>

            {coupon && (

              <button
                onClick={copyCoupon}
                className="mt-4 w-full rounded-xl bg-[#2874f0] py-2.5 text-sm font-bold text-white transition hover:bg-[#1458c4]"
              >
                Apply Now
              </button>

            )}

          </div>

        </div>

      </div>

      {/* Close */}

      <button
        onClick={() => {
          setShowOffer(false);
          localStorage.setItem("hideOffer", "true");
        }}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25 md:right-5 md:top-5 md:h-9 md:w-9"
      >
        ✕
      </button>

    </div>

  </div>
);
}