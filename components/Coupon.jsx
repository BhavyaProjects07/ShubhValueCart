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
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute right-0 bottom-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-6">

        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">

          {/* LEFT */}

          <div className="flex w-full items-center gap-5">

            <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur sm:flex">
              <span className="text-5xl">🎁</span>
            </div>

            <div>

              <div className="inline-flex items-center rounded-full bg-yellow-400 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-black shadow">

                LIMITED TIME OFFER

              </div>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">

                Save Big on
                <span className="text-yellow-300">
                  {" "}Your Grocery Shopping
                </span>

              </h2>

              <p className="mt-2 max-w-2xl text-sm text-blue-100 md:text-base">

                {coupon
                  ? coupon.description
                  : "Loading latest offers..."}

              </p>

              {coupon && (

                <div className="mt-5 flex flex-wrap items-center gap-3">

                  <div className="rounded-xl border-2 border-dashed border-yellow-300 bg-white px-5 py-3 shadow-lg">

                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">

                      Coupon Code

                    </div>

                    <div className="mt-1 text-xl font-black tracking-[0.25em] text-[#2874f0]">

                      {coupon.code}

                    </div>

                  </div>

                  <button
                    onClick={copyCoupon}
                    className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black shadow-lg transition hover:scale-105 hover:bg-yellow-300 active:scale-95"
                  >
                    Copy Coupon
                  </button>

                </div>

              )}

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex flex-col items-center">

            <div className="rounded-3xl bg-white px-8 py-6 text-center shadow-2xl">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500">

                EXTRA SAVINGS

              </p>

              <h2 className="mt-2 text-5xl font-black text-[#2874f0]">

                SALE

              </h2>

              <p className="mt-2 text-sm text-gray-500">

                Apply Coupon During Checkout

              </p>

              {coupon && (

                <button
                  onClick={copyCoupon}
                  className="mt-5 w-full rounded-xl bg-[#2874f0] px-6 py-3 font-bold text-white transition hover:bg-[#1458c4]"
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
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25"
        >
          ✕
        </button>

      </div>

    </div>
  );
}