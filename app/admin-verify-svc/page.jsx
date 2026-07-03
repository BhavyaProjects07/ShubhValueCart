"use client";

import { useState } from "react";
import { ShieldCheck, Smartphone, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/admin";

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post("/api/admin/send-otp", {
        phone,
      });

      toast.success(data.message);
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      setVerifying(true);

      const { data } = await axios.post("/api/admin/verify-otp", {
        phone,
        otp,
      });

      toast.success(data.message);

      router.replace(redirect);
      router.refresh();
    } catch (err) {
      toast.error(err.response?.data?.error || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border">

        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full">
            <ShieldCheck
              className="text-green-600"
              size={42}
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">
          Admin Verification
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Verify your phone number before accessing the dashboard.
        </p>

        {!otpSent ? (
          <form
            onSubmit={sendOtp}
            className="space-y-5"
          >
            <div>
              <label className="font-medium mb-2 block">
                Admin Phone Number
              </label>

              <div className="relative">
                <Smartphone
                  className="absolute left-4 top-3.5 text-gray-400"
                  size={18}
                />

                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="+91XXXXXXXXXX"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold transition disabled:opacity-60 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        ) : (
          <form
            onSubmit={verifyOtp}
            className="space-y-5"
          >
            <div>
              <label className="font-medium mb-2 block">
                Enter OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                placeholder="••••••"
                className="w-full text-center tracking-[10px] text-2xl rounded-xl border py-3 outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              disabled={verifying}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold transition disabled:opacity-60 flex justify-center items-center gap-2"
            >
              {verifying ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtp("");
                setOtpSent(false);
              }}
              className="w-full text-green-600 font-medium hover:underline"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}