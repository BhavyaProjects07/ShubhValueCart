"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function CouponBanner() {
  const [coupon, setCoupon] = useState(null);
   const [showOffer, setShowOffer] = useState(true);
  

  useEffect(() => {
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

  return (
    <>
    <div
      id="offers"
      className="relative mt-3 mx-4 bg-white sm:mx-6 lg:mx-8 xl:mx-auto flex w-auto max-w-4xl items-center justify-between gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#050a1f] via-[#0a1030] to-[#050a1f] px-4 py-3 shadow-lg sm:px-6 sm:py-4 lg:hidden"
      style={{ minHeight: "84px" }}
    >
      {/* soft glow accents like the reference */}
      <div className="absolute -right-4 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-yellow-400/10 blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(255,255,255,.04),transparent_60%)]" />

      {/* LEFT - Hexagon badge */}
      <div className="relative z-10 flex shrink-0 items-center justify-center">
        <div
          className="flex h-[62px] w-[68px] items-center justify-center bg-gradient-to-b from-yellow-300 to-yellow-500 sm:h-[72px] sm:w-[78px]"
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        >
          <div
            className="flex h-[calc(100%-4px)] w-[calc(100%-4px)] items-center justify-center bg-[#0a0e2e]"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          >
            <span className="text-lg sm:text-xl">🎁</span>
          </div>
        </div>
      </div>

      {/* MIDDLE - Coupon text */}
      <div className="relative z-10 min-w-0 flex-1 px-1">
        <h3 className="truncate text-sm font-bold text-white sm:text-base">
          Save Big on Grocery Shopping
        </h3>
        <p className="mt-0.5 truncate text-xs text-slate-300 sm:text-sm">
          {coupon
            ? `Use code ${coupon.code} — ${coupon.description}`
            : "Loading latest offers..."}
        </p>
      </div>

      {/* RIGHT - Action button */}
      <button
        onClick={copyCoupon}
        disabled={!coupon}
        className="relative z-10 flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-b from-yellow-300 to-yellow-400 px-4 py-2.5 text-xs font-bold text-[#0a0e2e] shadow-md transition hover:scale-105 hover:from-yellow-200 hover:to-yellow-300 active:scale-95 disabled:opacity-60 sm:px-6 sm:py-3 sm:text-sm"
      >
        COPY CODE
        <span aria-hidden>→</span>
      </button>
      </div>
{/*       
      Dekstop Coupon Banner */}

<div
  id="offers"
  className="hidden md:block relative overflow-hidden bg-gradient-to-r from-[#053a22] via-[#0a6c3d] to-[#1a8f52] text-white shadow-md"
>
    {/* Background */}
    <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute right-0 bottom-0 h-44 w-44 rounded-full bg-yellow-300/10 blur-3xl" />
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

            <p className="mt-1 max-w-xl text-xs text-green-100 sm:text-sm">

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

                    <div className="text-sm font-black tracking-[0.18em] text-[#0a6c3d] sm:text-base">

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
                <p className="mt-1.5 text-[11px] text-green-100/90 lg:hidden">
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

              <h2 className="mt-1 text-3xl font-black text-[#0a6c3d]">

                SALE

              </h2>

              <p className="mt-1 text-xs text-gray-500">

                Apply Coupon During Checkout

              </p>

              <button
                onClick={copyCoupon}
                className="mt-3 w-full rounded-xl bg-[#0a6c3d] py-2 text-sm font-bold text-white transition hover:bg-[#085531]"
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
    
    </>
  );
}
