"use client"
 
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useClerk, useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
 
export default function PhoneSignupPage() {
  const router = useRouter()
  const { openSignIn } = useClerk()
  const { signIn, setActive, isLoaded } = useSignIn()
 
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState("")
  const [cooldown, setCooldown] = useState(0)
  const timerRef = useRef(null)
 
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: ""
  })
 
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])
 
  const normalizePhone = (phone) => {
    let p = phone.replace(/\s/g, "")
    if (p.startsWith("+91")) return p
    if (/^\d{10}$/.test(p)) return `+91${p}`
    if (/^91\d{10}$/.test(p)) return `+${p}`
    return null
  }
 
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
 
  // ─────────────────────────────────────────
  // SEND OTP
  // ─────────────────────────────────────────
  const sendOtp = async () => {
    const normalizedPhone = normalizePhone(form.phone)
    if (!normalizedPhone) return toast.error("Enter a valid 10-digit phone number")
    if (!form.name.trim()) return toast.error("Name is required")
    if (!form.email.trim() || !form.email.includes("@")) return toast.error("Valid email is required")
    if (!form.password || form.password.length < 6) return toast.error("Password must be at least 6 characters")
 
    try {
      setLoading(true)
      setLoadingMsg("Sending OTP...")
      await axios.post("/api/auth/send_otp", { phone: normalizedPhone })
      toast.success("OTP sent to your phone 🚀")
      setStep(2)
 
      setCooldown(60)
      timerRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) { clearInterval(timerRef.current); return 0 }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to send OTP")
    } finally {
      setLoading(false)
      setLoadingMsg("")
    }
  }
 
  // ─────────────────────────────────────────
  // AUTO SIGN-IN helper (reused in two places)
  // ─────────────────────────────────────────
  const autoSignIn = async (email, password) => {
  setLoadingMsg("Signing you in...")
  
  try {
    const result = await signIn.create({
      identifier: email.trim().toLowerCase(),
      password,
    })

    console.log("🔍 signIn.create result:", result.status, result) // ← ADD THIS

    if (result.status === "complete") {
      await setActive({ session: result.createdSessionId })
      toast.success("Welcome! You're logged in 🎉")
      router.push("/")
      return true
    }

    
    return false

  } catch (err) {
    console.error("❌ signIn.create() threw:", JSON.stringify(err, null, 2))
    throw err // re-throw so verifyOtp catch block shows the real error
  }
}
 
  // ─────────────────────────────────────────
  // VERIFY OTP
  // ─────────────────────────────────────────
  const verifyOtp = async () => {
    if (!isLoaded) return toast.error("Auth not ready, please wait")
 
    const normalizedPhone = normalizePhone(form.phone)
    if (!normalizedPhone) return toast.error("Invalid phone number")
    if (!form.otp.trim()) return toast.error("Enter the OTP")
 
    try {
      setLoading(true)
 
      // ── STEP 1: Verify OTP ──────────────────────────────────────────
      setLoadingMsg("Verifying OTP...")
      await axios.post("/api/auth/verify_otp", {
        phone: normalizedPhone,
        otp: form.otp.trim()
      })
 
      // ── STEP 2: Check if user exists (by phone AND email) ───────────
      setLoadingMsg("Checking account...")
      const { data: checkData } = await axios.post("/api/auth/check-user", {
        phone: normalizedPhone,
        email: form.email.trim().toLowerCase()
      })
 
      // ── CASE A: Fully exists in DB → just sign in ───────────────────
      if (checkData.exists && !checkData.clerkOnly) {
        toast("Account already exists — logging you in")
        const ok = await autoSignIn(form.email, form.password)
        if (!ok) {
          // password may differ — open clerk modal as last resort
          openSignIn({ redirectUrl: "/" })
        }
        return
      }
 
      // ── CASE B: Exists in Clerk but NOT in DB (partial failure) ─────
      // create-clerk-user will updateUser password + upsert DB
      if (checkData.clerkOnly) {
        toast("Recovering your account...")
      }
 
      // ── STEP 3: Create Clerk user (handles both new + clerkOnly) ────
      setLoadingMsg("Creating your account...")
      const { data: createData } = await axios.post("/api/auth/create-clerk-user", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: normalizedPhone,
        password: form.password
      })
 
      if (!createData.clerkId) {
        throw new Error("Account creation failed — no Clerk ID returned")
      }
 
      // ── STEP 4: Auto sign-in ────────────────────────────────────────
      toast.success("Account ready! Signing you in...")
      const ok = await autoSignIn(form.email, form.password)
 
      if (!ok) {
        // Clerk returned non-complete status (e.g. MFA required)
        toast("One more step needed to complete login")
        openSignIn({ redirectUrl: "/" })
      }
 
    } catch (err) {
      console.error("verifyOtp error:", err)
 
      // Clerk JS errors (from signIn.create) come on err.errors[]
      const clerkMsg = err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message
      // Axios errors come on err.response.data.error
      const axiosMsg = err?.response?.data?.error
      // Plain errors
      const plainMsg = err?.message
 
      toast.error(clerkMsg || axiosMsg || plainMsg || "Something went wrong")
    } finally {
      setLoading(false)
      setLoadingMsg("")
    }
  }
 
  // ─────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/80 border border-gray-200 shadow-2xl rounded-2xl p-8 space-y-6 transition-all">
 
        {/* HEADER */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-500">Join us and start your journey 🚀</p>
        </div>
 
        {/* STEP 1 — Details */}
        {step === 1 && (
          <div className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create Password (min 6 chars)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone (10 digits or +91XXXXXXXXXX)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
            />
            <button
              onClick={sendOtp}
              disabled={loading || cooldown > 0}
              className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? loadingMsg || "Please wait..." : cooldown > 0 ? `Resend in ${cooldown}s` : "Send OTP"}
            </button>
          </div>
        )}
 
        {/* STEP 2 — OTP */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-center text-gray-500">
              OTP sent to <span className="font-semibold text-gray-800">{form.phone}</span>
            </p>
 
            <input
              name="otp"
              value={form.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              maxLength={6}
              className="w-full px-4 py-3 text-center tracking-[0.4em] text-xl font-bold rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
            />
 
            <button
              onClick={verifyOtp}
              disabled={loading || !form.otp.trim()}
              className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    {loadingMsg || "Please wait..."}
                  </span>
                : "Verify & Create Account"
              }
            </button>
 
            {/* Resend */}
            <button
              onClick={sendOtp}
              disabled={loading || cooldown > 0}
              className="w-full text-sm text-gray-500 hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
            </button>
 
            <button
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-400 hover:text-black transition"
            >
              ← Change details
            </button>
          </div>
        )}
 
        {/* DIVIDER */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
 
        {/* LOGIN CTA */}
        <div className="text-center">
          <p className="text-sm text-gray-600">Already registered?</p>
          <button
            onClick={() => openSignIn({ redirectUrl: "/" })}
            className="mt-2 w-full py-3 rounded-lg border border-gray-300 font-semibold hover:bg-gray-100 transition"
          >
            Login with Google / Email
          </button>
        </div>
 
      </div>
    </div>
  )
}