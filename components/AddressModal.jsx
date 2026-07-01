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
    console.log(error);

    if (
        error?.response?.status === 403 ||
        error?.response?.data?.code === "ACCOUNT_INCOMPLETE"
    ) {
        setShowAddressModal(false);
        setShowCompleteAccountModal(true);
        return;
    }

    toast.error(
        error?.response?.data?.error || "Something went wrong."
    );
} finally {
            setLoading(false)
        }
    }

    return (
  <>
    {/* Address Modal */}
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="relative flex flex-col gap-5 text-slate-700 w-full max-w-sm mx-6 bg-white p-6 rounded-2xl shadow-2xl">

        {/* Close */}
        <button
          type="button"
          onClick={() => setShowAddressModal(false)}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 transition"
        >
          <XIcon size={24} />
        </button>

        <h2 className="text-3xl font-bold">
          Add New <span className="text-[#00a300]">Address</span>
        </h2>

        {/* INPUTS */}

        <input
          name="name"
          onChange={handleAddressChange}
          value={address.name}
          className="p-3 px-4 border border-slate-200 rounded-lg w-full focus:ring-2 focus:ring-[#00a300] outline-none"
          type="text"
          placeholder="Enter your name"
          required
        />

        <input
          name="email"
          onChange={handleAddressChange}
          value={address.email}
          className="p-3 px-4 border border-slate-200 rounded-lg w-full focus:ring-2 focus:ring-[#00a300] outline-none"
          type="email"
          placeholder="Email address"
          required
        />

        <input
          name="street"
          onChange={handleAddressChange}
          value={address.street}
          className="p-3 px-4 border border-slate-200 rounded-lg w-full focus:ring-2 focus:ring-[#00a300] outline-none"
          type="text"
          placeholder="Street Address"
          required
        />

        <div className="flex gap-4">
          <input
            name="city"
            onChange={handleAddressChange}
            value={address.city}
            className="p-3 px-4 border border-slate-200 rounded-lg w-full focus:ring-2 focus:ring-[#00a300] outline-none"
            type="text"
            placeholder="City"
            required
          />

          <input
            name="state"
            onChange={handleAddressChange}
            value={address.state}
            className="p-3 px-4 border border-slate-200 rounded-lg w-full focus:ring-2 focus:ring-[#00a300] outline-none"
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="flex gap-4">
          <input
            name="zip"
            onChange={handleAddressChange}
            value={address.zip}
            className="p-3 px-4 border border-slate-200 rounded-lg w-full focus:ring-2 focus:ring-[#00a300] outline-none"
            type="number"
            placeholder="PIN Code"
            required
          />

          <input
            name="country"
            onChange={handleAddressChange}
            value={address.country}
            className="p-3 px-4 border border-slate-200 rounded-lg w-full focus:ring-2 focus:ring-[#00a300] outline-none"
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          name="phone"
          onChange={handleAddressChange}
          value={address.phone}
          className="p-3 px-4 border border-slate-200 rounded-lg w-full focus:ring-2 focus:ring-[#00a300] outline-none"
          type="text"
          placeholder="Mobile Number"
          required
        />

        <button
          className="bg-[#00a300] hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-95"
        >
          {loading ? "Saving Address..." : "SAVE ADDRESS"}
        </button>

      </div>
    </form>

    {/* Complete Account Modal */}
    {showCompleteAccountModal && (
      <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center">

        <div className="w-full max-w-md mx-5 rounded-3xl bg-white p-8 shadow-2xl">

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
            onClick={() => {
              setShowCompleteAccountModal(false);
              router.push("/complete-registration");
            }}
            className="mt-8 w-full rounded-xl bg-[#00a300] py-3 text-white font-semibold hover:bg-green-700 transition"
          >
            Complete Registration
          </button>

          <button
            onClick={() => setShowCompleteAccountModal(false)}
            className="mt-3 w-full rounded-xl border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Maybe Later
          </button>

        </div>
  
      </div>
    )}
  </>
);
}

export default AddressModal