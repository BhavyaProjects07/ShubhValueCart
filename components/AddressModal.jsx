'use client'
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs"
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"

import axios from "axios"
import { addAddress } from "@/lib/features/address/addressSlice"

const AddressModal = ({ setShowAddressModal }) => {

    const { getToken, isSignedIn } = useAuth()
    const dispatch = useDispatch()
const [showCompleteAccountModal, setShowCompleteAccountModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: ''
    })

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // 🚨 NOT LOGGED IN
        if (!isSignedIn) {
            toast.error("Please login to add address")
            return
        }

        try {
            setLoading(true)

            const token = await getToken()

            const { data } = await axios.post(
                "/api/address",
                { address },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            dispatch(addAddress(data.newAddress))
            toast.success(data.message)

            setShowAddressModal(false)

        } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    if (
    error.response?.status === 403 &&
    error.response?.data?.code === "ACCOUNT_INCOMPLETE"
) {
    setShowCompleteAccountModal(true);
    return;
}

    toast.error(error.response?.data?.error || "Something went wrong.");
} finally {
            setLoading(false)
        }
    }

    return (
  <form
    onSubmit={handleSubmit}
    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
  >
    <div className="relative w-full max-w-md mx-5 rounded-3xl bg-white shadow-2xl p-7">

      {/* Close */}
      <button
        type="button"
        onClick={() => setShowAddressModal(false)}
        className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition"
      >
        <XIcon size={24} />
      </button>

      {/* ===================================================== */}
      {/* ADDRESS FORM */}
      {/* ===================================================== */}
      {!showCompleteAccountModal && (
        <>
          <h2 className="text-3xl font-bold text-slate-800">
            Add New{" "}
            <span className="text-[#00a300]">
              Address
            </span>
          </h2>

          <div className="mt-6 flex flex-col gap-4">

            <input
              name="name"
              value={address.name}
              onChange={handleAddressChange}
              className="p-3 px-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00a300]"
              type="text"
              placeholder="Enter your name"
              required
            />

            <input
              name="email"
              value={address.email}
              onChange={handleAddressChange}
              className="p-3 px-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00a300]"
              type="email"
              placeholder="Email address"
              required
            />

            <input
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              className="p-3 px-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00a300]"
              type="text"
              placeholder="Street Address"
              required
            />

            <div className="flex gap-3">

              <input
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                className="flex-1 p-3 px-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00a300]"
                type="text"
                placeholder="City"
                required
              />

              <input
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                className="flex-1 p-3 px-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00a300]"
                type="text"
                placeholder="State"
                required
              />

            </div>

            <div className="flex gap-3">

              <input
                name="zip"
                value={address.zip}
                onChange={handleAddressChange}
                className="flex-1 p-3 px-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00a300]"
                type="number"
                placeholder="PIN Code"
                required
              />

              <input
                name="country"
                value={address.country}
                onChange={handleAddressChange}
                className="flex-1 p-3 px-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00a300]"
                type="text"
                placeholder="Country"
                required
              />

            </div>

            <input
              name="phone"
              value={address.phone}
              onChange={handleAddressChange}
              className="p-3 px-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00a300]"
              type="text"
              placeholder="Mobile Number"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-[#00a300] hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition active:scale-95"
            >
              {loading ? "Saving Address..." : "SAVE ADDRESS"}
            </button>

          </div>
        </>
      )}

      {/* ===================================================== */}
      {/* COMPLETE ACCOUNT SCREEN */}
      {/* ===================================================== */}
      {showCompleteAccountModal && (
        <div className="py-4">

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">

              <AlertTriangle
                size={42}
                className="text-yellow-600"
              />

            </div>

          </div>

          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Complete Your Account
          </h2>

          <p className="mt-4 text-center text-gray-600 leading-7">
            Before adding a delivery address, please verify your mobile
            number and complete your account setup.
          </p>

          <button
            type="button"
            onClick={() => {
              router.push("/phone-signup");
            }}
            className="mt-8 w-full rounded-xl bg-[#00a300] py-3 text-white font-semibold hover:bg-green-700 transition"
          >
            Complete Registration
          </button>

          <button
            type="button"
            onClick={() => setShowCompleteAccountModal(false)}
            className="mt-3 w-full rounded-xl border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Back to Address Form
          </button>

        </div>
      )}

    </div>
  </form>
);
}

export default AddressModal