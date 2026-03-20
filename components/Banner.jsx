'use client'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { X, Gift } from 'lucide-react'

export default function Banner() {
    const [isOpen, setIsOpen] = useState(true)
    const [coupon, setCoupon] = useState(null)
    const [showPopup, setShowPopup] = useState(false)

    // 1️⃣ Fetch REAL public coupon
    useEffect(() => {
        axios.get('/api/public/coupons')
            .then(res => {
                if (res.data?.length) {
                    setCoupon(res.data[0])
                }
            })
            .catch(err => {
                console.error('COUPON FETCH ERROR:', err)
            })
    }, []) // ✅ EMPTY ARRAY — NEVER CHANGE


    // 2️⃣ Auto close popup after 10s
    useEffect(() => {
        if (!showPopup) return

        const timer = setTimeout(() => {
            setShowPopup(false)
        }, 10000)

        return () => clearTimeout(timer)
    }, [showPopup]) // ✅ ALWAYS [showPopup]


    const handleClaim = () => {
        if (!coupon) return
        setShowPopup(true)
    }

    if (!isOpen || !coupon) return null

    return (
        <>
            {/* ===== Premium Banner ===== */}
            <div className="w-full px-4 sm:px-6 font-medium text-sm text-white text-center bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-lg relative overflow-hidden">
                {/* Animated background accent */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600/20 to-transparent animate-pulse" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {/* Coupon Description with Icon */}
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <Gift className="w-5 h-5 text-amber-300 flex-shrink-0" />
                        <p className="text-sm sm:text-base text-amber-100 font-semibold">
                            {coupon.description}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                        {/* Mobile Claim */}
                        <button
                            onClick={handleClaim}
                            type="button"
                            className="sm:hidden text-xs sm:text-sm font-bold text-amber-300 bg-amber-800/50 hover:bg-amber-700/70 px-4 py-2 rounded-full transition-all duration-200 border border-amber-600/50 hover:border-amber-500/80"
                        >
                            Claim Now
                        </button>

                        {/* Desktop Claim */}
                        <button
                            onClick={handleClaim}
                            type="button"
                            className="hidden sm:inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-bold text-sm hover:from-amber-300 hover:to-amber-200 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            <Gift className="w-4 h-4" />
                            Claim Offer
                        </button>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            type="button"
                            aria-label="Close banner"
                            className="p-2 text-amber-200/70 hover:text-amber-100 hover:bg-amber-800/50 rounded-full transition-all duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== Premium Glass Popup ===== */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
                    <div className="bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 backdrop-blur-xl border border-amber-500/30 rounded-2xl px-8 py-8 text-center max-w-sm w-full shadow-2xl transform transition-all duration-300 hover:border-amber-500/50">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-amber-500/20 rounded-full">
                                <Gift className="w-6 h-6 text-amber-300" />
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-amber-300 tracking-wider mb-2">
                            Your Coupon Code
                        </h3>

                        <div className="bg-amber-950/50 border-2 border-dashed border-amber-500/50 rounded-lg px-6 py-4 my-6">
                            <p className="text-3xl font-bold text-amber-100 font-mono tracking-widest">
                                {coupon.code}
                            </p>
                        </div>

                        <p className="text-sm text-amber-200 mb-6 leading-relaxed">
                            {coupon.description}
                        </p>

                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(coupon.code)
                                toast.success("Coupon copied!")
                            }}
                            className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-bold transition-all duration-300 hover:from-amber-300 hover:to-amber-200 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Copy Code
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
