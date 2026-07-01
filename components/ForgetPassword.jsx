"use client";

import { useState } from "react";
import {
  Mail,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  X,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function ForgotPasswordModal({
  open,
  onClose,
}) {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================================
  // SEND EMAIL CODE
  // ================================

  const sendCode = async () => {
    if (!form.email.trim()) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);

      // TODO
      // POST /api/auth/forgot-password

      setStep(2);

      toast.success("Verification code sent.");
    } catch {
      toast.error("Failed to send code.");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // VERIFY CODE
  // ================================

  const verifyCode = async () => {
    if (form.code.length !== 6) {
      return toast.error("Enter a valid code.");
    }

    try {
      setLoading(true);

      // TODO
      // POST /api/auth/verify-reset-code

      setStep(3);

      toast.success("Code verified.");
    } catch {
      toast.error("Invalid code.");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // UPDATE PASSWORD
  // ================================

  const updatePassword = async () => {
    if (!form.password) {
      return toast.error("Password required");
    }

    if (form.password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords don't match");
    }

    try {
      setLoading(true);

      // TODO
      // POST /api/auth/update-password

      toast.success("Password updated successfully.");

      onClose();

      setStep(1);

      setForm({
        email: "",
        code: "",
        password: "",
        confirmPassword: "",
      });
    } catch {
      toast.error("Unable to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-5">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="relative bg-[#00a300] text-white p-7">

          <button
            onClick={onClose}
            className="absolute right-5 top-5"
          >
            <X size={22} />
          </button>

          <h2 className="text-3xl font-bold">
            Forgot Password
          </h2>

          <p className="mt-2 text-green-100">
            Recover your account securely.
          </p>

        </div>

        <div className="p-7">

          {/* STEP 1 */}

          {step === 1 && (
            <>

              <div className="flex justify-center mb-6">

                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">

                  <Mail
                    size={34}
                    className="text-[#00a300]"
                  />

                </div>

              </div>

              <label className="font-semibold">
                Email Address
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your registered email"
                className="mt-2 w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:ring-4 focus:ring-green-100 focus:border-[#00a300]"
              />

              <button
                onClick={sendCode}
                disabled={loading}
                className="mt-6 w-full h-12 rounded-xl bg-[#00a300] text-white font-semibold hover:bg-green-700 transition"
              >
                {loading
                  ? "Sending..."
                  : "Send Verification Code"}
              </button>

            </>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <>

              <div className="flex justify-center mb-6">

                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

                  <ShieldCheck
                    size={34}
                    className="text-blue-600"
                  />

                </div>

              </div>

              <label className="font-semibold">
                Verification Code
              </label>

              <input
                name="code"
                value={form.code}
                onChange={handleChange}
                maxLength={6}
                placeholder="123456"
                className="mt-2 w-full h-12 rounded-xl border border-gray-300 text-center tracking-[0.4em] text-xl font-bold outline-none focus:ring-4 focus:ring-green-100 focus:border-[#00a300]"
              />

              <button
                onClick={verifyCode}
                disabled={loading}
                className="mt-6 w-full h-12 rounded-xl bg-[#00a300] text-white font-semibold hover:bg-green-700"
              >
                {loading
                  ? "Verifying..."
                  : "Verify Code"}
              </button>

            </>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <>

              <div className="flex justify-center mb-6">

                <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">

                  <Lock
                    size={34}
                    className="text-yellow-600"
                  />

                </div>

              </div>

              <label className="font-semibold">
                New Password
              </label>

              <div className="relative mt-2">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="w-full h-12 rounded-xl border border-gray-300 px-4 pr-12 outline-none focus:ring-4 focus:ring-green-100 focus:border-[#00a300]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-3"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              <label className="font-semibold mt-5 block">
                Confirm Password
              </label>

              <div className="relative mt-2">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full h-12 rounded-xl border border-gray-300 px-4 pr-12 outline-none focus:ring-4 focus:ring-green-100 focus:border-[#00a300]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              <button
                onClick={updatePassword}
                disabled={loading}
                className="mt-6 w-full h-12 rounded-xl bg-[#00a300] text-white font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Updating..."
                ) : (
                  <>
                    Update Password
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </>
          )}

        </div>

      </div>

    </div>
  );
}