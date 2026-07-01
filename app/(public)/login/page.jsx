"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ForgotPasswordModal from "@/components/auth/ForgetPassword";
import { useSignIn } from "@clerk/nextjs";
import axios from "axios";


export default function LoginPage() {
  const router = useRouter();

    const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
const [showForgotModal, setShowForgotModal] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // LOGIN (API WILL BE ADDED LATER)
  // ==========================================
  const handleLogin = async (e) => {
  e.preventDefault();

  if (!isLoaded) return;

  if (!form.email.trim()) {
    return toast.error("Email is required");
  }

  if (!form.password.trim()) {
    return toast.error("Password is required");
  }

  try {
    setLoading(true);

    // 1️⃣ Check if user exists in your DB
    const { data } = await axios.post("/api/auth/login", {
      email: form.email.trim().toLowerCase(),
    });

    if (!data.exists) {
      return toast.error(data.error || "Account not found.");
    }

    // 2️⃣ Authenticate with Clerk
    const result = await signIn.create({
      identifier: form.email.trim().toLowerCase(),
      password: form.password,
    });

    if (result.status !== "complete") {
      return toast.error("Unable to sign in.");
    }

    // 3️⃣ Create Clerk session
    await setActive({
      session: result.createdSessionId,
    });

    toast.success(data.message || "Welcome back 👋");

    router.push("/");

  } catch (error) {
    console.error(error);

    const clerkError =
      error?.errors?.[0]?.longMessage ||
      error?.errors?.[0]?.message;

    const apiError = error?.response?.data?.error;

    toast.error(
      clerkError ||
      apiError ||
      "Invalid email or password."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00a300] text-white text-3xl font-bold shadow-xl">
            S
          </div>

          <h1 className="mt-5 text-4xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to continue shopping with Shubh Value Cart
          </p>

        </div>

        {/* Card */}

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8"
        >

          {/* Email */}

          <div>

            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="mt-2 relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-12 rounded-xl border border-gray-300 pl-11 pr-4 outline-none focus:border-[#00a300] focus:ring-4 focus:ring-green-100 transition"
              />

            </div>

          </div>

          {/* Password */}

          <div className="mt-6">

            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>

            <div className="mt-2 relative">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 rounded-xl border border-gray-300 pl-11 pr-12 outline-none focus:border-[#00a300] focus:ring-4 focus:ring-green-100 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          {/* Forgot Password */}

          <div className="mt-4 flex justify-end">

            <button
  type="button"
  onClick={() => setShowForgotModal(true)}
  className="text-sm font-medium text-[#00a300] hover:underline"
>
  Forgot Password?
</button>

          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full h-12 rounded-xl bg-[#00a300] hover:bg-green-700 text-white font-semibold transition flex items-center justify-center gap-2 disabled:opacity-60"
          >

            {loading ? (

              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </>

            ) : (

              <>
                Login
                <ArrowRight size={18} />
              </>

            )}

          </button>

          {/* Divider */}

          <div className="flex items-center gap-4 my-8">

            <div className="flex-1 h-px bg-gray-200" />

            <span className="text-sm text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200" />

          </div>

          {/* Signup */}

          <div className="text-center">

            <p className="text-gray-600">

              Don't have an account?{" "}

              <Link
                href="/phone-signup"
                className="font-semibold text-[#00a300] hover:underline"
              >
                Create Account
              </Link>

            </p>

          </div>

              </form>
              <ForgotPasswordModal
  open={showForgotModal}
  onClose={() => setShowForgotModal(false)}
/>

      </div>

    </div>
  );
}