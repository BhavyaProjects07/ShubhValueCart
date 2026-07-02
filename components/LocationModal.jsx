"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  MapPin,
  Navigation,
  Search,
  X,
  Loader2,
} from "lucide-react";


export default function LocationModal({
  isOpen,
  onClose,
  onDetectLocation,
}) {
  const modalRef = useRef(null);
    const { getToken } = useAuth();
const { user } = useUser();
  
    const [step, setStep] = useState(1);

const [loading, setLoading] = useState(false);

const [search, setSearch] = useState("");

const [suggestions, setSuggestions] = useState([]);

const [address, setAddress] = useState({
  name: "",
  email: "",
  phone: "",

  street: "",
  city: "",
  state: "",
  zip: "",
  country: "",

  landmark: "",

  latitude: null,
  longitude: null,

  formattedAddress: "",

  isDefault: true,
});

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);
    
    useEffect(() => {
  if (!user) return;

  setAddress((prev) => ({
    ...prev,
    name: user.fullName || "",
    email:
      user.primaryEmailAddress?.emailAddress || "",
    phone:
      user.primaryPhoneNumber?.phoneNumber || "",
  }));
    }, [user]);
    
    useEffect(() => {
  if (search.trim().length < 3) {
    setSuggestions([]);
    return;
  }

  const timer = setTimeout(async () => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/address/search",
        {
          query: search,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuggestions(data.results || []);
    } catch (err) {
      console.error(err);
    }
  }, 400);

  return () => clearTimeout(timer);
}, [search , getToken]);

    if (!isOpen) return null;
    
    const handleSuggestion = (item) => {
  setAddress((prev) => ({
    ...prev,

    street: item.street,
    city: item.city,
    state: item.state,
    zip: item.zip,
    country: item.country,

    latitude: item.latitude,
    longitude: item.longitude,

    formattedAddress: item.label,
  }));

  setSuggestions([]);

  setSearch(item.label);

  setStep(2);
};

    const handleSaveAddress = async () => {
  try {
    setLoading(true);

    const token = await getToken();

    const { data } = await axios.post(
      "/api/address",
      {
        address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(data.message || "Address saved");

    onClose();

  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.error ||
      "Unable to save address"
    );
  } finally {
    setLoading(false);
  }
};
  const handleLocation = async () => {
  try {
    setLoading(true);

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const token = await getToken();

          const { data } = await axios.post(
            "/api/address/reverse",
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setAddress((prev) => ({
            ...prev,
            ...data.address,
          }));

          setSearch(data.address.formattedAddress || "");
          setStep(2);

          toast.success("Location detected");
        } catch (err) {
          console.error(err);
          toast.error("Unable to detect address");
        } finally {
          setLoading(false);
        }
      },
      () => {
        toast.error("Location permission denied");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-5">

      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
      >

        {/* HEADER */}

        <div className="flex items-center justify-between px-6 py-5 border-b">

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              Choose Delivery Location
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Deliver groceries to your doorstep.
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
          >
            <X size={20} />
          </button>

        </div>

        {/* CONTENT */}

        <div className="p-6">

  {step === 1 ? (
    <>
      {/* SEARCH */}
      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          placeholder="Search area, street or colony..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 h-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 max-h-72 overflow-y-auto rounded-2xl border bg-white shadow-xl z-50">

            {suggestions.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestion(item)}
                className="w-full border-b last:border-none px-4 py-3 text-left hover:bg-green-50 transition"
              >
                <p className="font-medium text-gray-900">
                  {item.label}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {item.city}, {item.state}
                </p>
              </button>
            ))}

          </div>
        )}

      </div>

      <div className="my-6 flex items-center">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-4 text-sm text-gray-400">
          OR
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* CURRENT LOCATION */}

      <button
        type="button"
        onClick={handleLocation}
        disabled={loading}
        className="w-full h-14 rounded-2xl bg-green-600 text-white font-semibold flex items-center justify-center gap-3 hover:bg-green-700 disabled:opacity-60 transition"
      >
        {loading ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />
            Detecting Location...
          </>
        ) : (
          <>
            <Navigation size={20} />
            Use Current Location
          </>
        )}
      </button>

      {/* INFO */}

      <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">

        <div className="flex gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
            <MapPin
              size={22}
              className="text-green-600"
            />
          </div>

          <div>

            <h3 className="font-semibold text-gray-800">
              Faster Delivery
            </h3>

            <p className="mt-1 text-sm text-gray-500 leading-relaxed">
              Detect your current location automatically or search manually to
              receive groceries faster.
            </p>

          </div>

        </div>

      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        Your precise location is only used to detect your delivery address.
      </div>
    </>
  ) : (
    <>
      {/* STEP 2 */}

      <div className="rounded-2xl border border-green-200 bg-green-50 p-4 mb-5">

        <h3 className="font-semibold text-green-700">
          ✓ Location Detected
        </h3>

        <p className="mt-1 text-sm text-gray-600">
          Review your address before saving.
        </p>

      </div>

      <div className="space-y-4">

        <input
          name="name"
          value={address.name}
          onChange={handleAddressChange}
          placeholder="Full Name"
          className="w-full rounded-xl border p-3"
        />

        <input
          name="phone"
          value={address.phone}
          onChange={handleAddressChange}
          placeholder="Phone Number"
          className="w-full rounded-xl border p-3"
        />

        <input
          name="street"
          value={address.street}
          onChange={handleAddressChange}
          placeholder="House No / Street"
          className="w-full rounded-xl border p-3"
        />

        <input
          name="landmark"
          value={address.landmark}
          onChange={handleAddressChange}
          placeholder="Landmark (Optional)"
          className="w-full rounded-xl border p-3"
        />

        <div className="grid grid-cols-2 gap-3">

          <input
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            placeholder="City"
            className="rounded-xl border p-3"
          />

          <input
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            placeholder="State"
            className="rounded-xl border p-3"
          />

        </div>

        <div className="grid grid-cols-2 gap-3">

          <input
            name="zip"
            value={address.zip}
            onChange={handleAddressChange}
            placeholder="PIN Code"
            className="rounded-xl border p-3"
          />

          <input
            name="country"
            value={address.country}
            onChange={handleAddressChange}
            placeholder="Country"
            className="rounded-xl border p-3"
          />

        </div>

        <textarea
          rows={3}
          readOnly
          value={address.formattedAddress}
          className="w-full rounded-xl border bg-gray-50 p-3 text-sm text-gray-600"
        />

        <div className="flex gap-3 pt-2">

          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 rounded-xl border border-gray-300 py-3 font-medium hover:bg-gray-100"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleSaveAddress}
            disabled={loading}
            className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Address"}
          </button>

        </div>

      </div>
    </>
  )}

</div>
      </div>
    </div>
  );
}