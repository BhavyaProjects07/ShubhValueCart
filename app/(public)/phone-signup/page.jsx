"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function PhoneSignupPage() {
  const router = useRouter()
  const { openSignIn } = useClerk()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const timerRef = useRef(null)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: ""
  })

  // ================= CLEAN TIMER =================
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // ================= PHONE NORMALIZER =================
  const normalizePhone = (phone) => {
    let p = phone.replace(/\s/g, "")
    if (p.startsWith("+91")) return p
    if (/^\d{10}$/.test(p)) return `+91${p}`
    if (/^91\d{10}$/.test(p)) return `+${p}`
    return null
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ================= SEND OTP =================
  const sendOtp = async () => {
    const normalizedPhone = normalizePhone(form.phone)

    if (!normalizedPhone) return toast.error("Enter valid phone")
    if (!form.name || !form.email || !form.password)
      return toast.error("All fields required")

    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters")

    try {
      setLoading(true)

      await axios.post("/api/auth/send_otp", {
        phone: normalizedPhone
      })

      toast.success("OTP sent 🚀")
      setStep(2)

      // cooldown
      setCooldown(60)
      timerRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)

    } catch (err) {
      toast.error(err?.response?.data?.error || "Error sending OTP")
    } finally {
      setLoading(false)
    }
  }

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    const normalizedPhone = normalizePhone(form.phone)

    if (!normalizedPhone) return toast.error("Invalid phone")
    if (!form.otp) return toast.error("Enter OTP")

    try {
      setLoading(true)

      // ✅ VERIFY OTP
      await axios.post("/api/auth/verify_otp", {
        phone: normalizedPhone,
        otp: form.otp
      })

      // ✅ CHECK USER
      const { data } = await axios.post("/api/auth/check-user", {
        phone: normalizedPhone
      })

      // =========================
      // 🚫 USER EXISTS
      // =========================
      if (data.exists) {
        toast.error("User already exists. Please login.")

        openSignIn({
          redirectUrl: "/"
        })

        return
      }

      // =========================
      // 🆕 CREATE USER
      // =========================
      await axios.post("/api/auth/create-clerk-user", {
        name: form.name,
        email: form.email,
        phone: normalizedPhone,
        password: form.password
      })

      // =========================
      // ✅ SUCCESS (NO AUTO LOGIN)
      // =========================
      toast.success("Account created successfully 🎉")
      toast("Please login to continue")

      // 👉 reset form
      setStep(1)
      setForm({
        name: "",
        email: "",
        phone: "",
        otp: "",
        password: ""
      })

      // 👉 auto open login modal
      setTimeout(() => {
        openSignIn({
          redirectUrl: "/"
        })
      }, 1200)

    } catch (err) {
      console.error(err)

      toast.error(
        err?.response?.data?.error ||
        err?.errors?.[0]?.message ||
        "Verification failed"
      )
    } finally {
      setLoading(false)
    }
  }

  // ================= UI =================
  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
    
    {/* CARD */}
    <div className="w-full max-w-md backdrop-blur-xl bg-white/80 border border-gray-200 shadow-2xl rounded-2xl p-8 space-y-6 transition-all">

      {/* HEADER */}
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-bold text-gray-900">
          Create Account
        </h2>
        <p className="text-sm text-gray-500">
          Join us and start your journey 🚀
        </p>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">

          <input
            name="name"
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
          />

          <input
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
          />

          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Create Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
          />

          <input
            name="phone"
            onChange={handleChange}
            placeholder="Phone (+91XXXXXXXXXX)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
          />

          <button
            onClick={sendOtp}
            disabled={loading || cooldown > 0}
            className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cooldown > 0 ? `Wait ${cooldown}s` : "Send OTP"}
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">

          <input
            name="otp"
            onChange={handleChange}
            placeholder="Enter OTP"
            className="w-full px-4 py-3 text-center tracking-widest text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
          />

          <button
            onClick={verifyOtp}
            disabled={loading || !form.otp}
            className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* Back button */}
          <button
            onClick={() => setStep(1)}
            className="w-full text-sm text-gray-500 hover:text-black transition"
          >
            ← Change details
          </button>
        </div>
      )}

      {/* DIVIDER */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-xs text-gray-400">OR</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* LOGIN CTA */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already registered?
        </p>

        <button
          onClick={() =>
            openSignIn({
              redirectUrl: "/"
            })
          }
          className="mt-2 w-full py-3 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100 transition"
        >
          Login with Google / Email
        </button>
      </div>

    </div>
  </div>
)
}