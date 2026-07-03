"use client";

import { useState } from "react";
import { ShieldCheck, Mail, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/admin";

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const sendOtp = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/admin/send-otp");

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
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-2xl">

        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 p-5">
            <ShieldCheck
              size={42}
              className="text-green-600"
            />
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold">
          Admin Verification
        </h1>

        <p className="mt-2 mb-8 text-center text-gray-500">
          A verification code will be sent to the registered admin email.
        </p>

        {!otpSent ? (
          <div className="space-y-6">

            <div className="rounded-2xl border border-green-100 bg-green-50 p-4">

              <div className="flex items-center gap-3">

                <div className="rounded-full bg-white p-3 shadow-sm">
                  <Mail
                    size={20}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <p className="font-semibold">
                    Admin Email Verification
                  </p>

                  <p className="text-sm text-gray-500">
                    We'll send a one-time verification code to the configured admin email.
                  </p>
                </div>

              </div>

            </div>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </button>

          </div>
        ) : (
          <form
            onSubmit={verifyOtp}
            className="space-y-5"
          >

            <div>

              <label className="mb-2 block font-medium">
                Enter Email OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                required
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
                placeholder="••••••"
                className="w-full rounded-xl border py-3 text-center text-2xl tracking-[10px] outline-none transition focus:ring-2 focus:ring-green-500"
              />

              <p className="mt-3 text-center text-sm text-gray-500">
                Check your inbox (and Spam folder if needed).
              </p>

            </div>

            <button
              disabled={verifying}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
            >
              {verifying ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
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
              className="w-full font-medium text-green-600 hover:underline"
            >
              Resend OTP
            </button>

          </form>
        )}
      </div>
    </div>
  );
}