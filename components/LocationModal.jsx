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
    
    const [savedAddresses, setSavedAddresses] = useState([]);
const [loadingAddresses, setLoadingAddresses] = useState(false);

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
    }, [search, getToken]);
    
  const handleDeleteAddress = async (id) => {
  try {
    const token = await getToken();

    await axios.delete(`/api/address/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Address deleted");

    loadAddresses();
  } catch (err) {
    console.error(err);

    toast.error("Unable to delete address");
  }
};
  
  
  const handleSelectAddress = (address) => {
  localStorage.setItem(
    "selectedAddress",
    JSON.stringify(address)
  );

  toast.success("Delivery address selected");

  onClose();

  window.location.reload();
        };
    useEffect(() => {
  if (!isOpen) return;

        loadAddresses();
        
        
        
}, [isOpen , getToken]);

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
    
    const handleAddressChange = (e) => {
  const { name, value } = e.target;

  setAddress((prev) => ({
    ...prev,
    [name]: value,
  }));
};

    const loadAddresses = async () => {
  try {
    setLoadingAddresses(true);

    const token = await getToken();

    const { data } = await axios.get("/api/address", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const addresses = data.addresses || [];

    setSavedAddresses(addresses);

    // If user already has addresses,
    // open Saved Addresses screen first
    if (addresses.length > 0) {
  setStep(0); // Show saved addresses
} else {
  setStep(1); // Show location detection screen
}

setSearch("");
setSuggestions([]);
  } catch (err) {
    console.error(err);
    setStep(1);
  } finally {
    setLoadingAddresses(false);
  }
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

    setSavedAddresses(prev => [...prev, data.newAddress]);

setStep(0);

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
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col"
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

        <div className="flex-1 overflow-y-auto p-6">

  {step === 0 ? (
  <>
    {/* SAVED ADDRESSES */}

    <h3 className="mb-5 text-xl font-bold text-gray-900">
      Saved Addresses
    </h3>

    {loadingAddresses ? (
      <div className="py-12 text-center">
        <Loader2 className="mx-auto animate-spin text-green-600" />
      </div>
    ) : savedAddresses.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
        <MapPin
          size={45}
          className="mx-auto text-gray-400"
        />
        <h4 className="mt-3 font-semibold text-gray-700">
          No Saved Address
        </h4>
        <p className="mt-1 text-sm text-gray-500">
          Add your first delivery address.
        </p>

        <button
          type="button"
          onClick={() => setStep(1)}
          className="mt-5 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Add Address
        </button>
      </div>
    ) : (
      <>
        <div className="space-y-4">

          {savedAddresses.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 p-5"
            >
              <div className="flex justify-between">

                <div>

                  <h4 className="font-semibold">
                    {item.name}
                  </h4>

                  <p className="mt-1 text-sm text-gray-600">
                    {item.street}
                  </p>

                  <p className="text-sm text-gray-600">
                    {item.city}, {item.state} - {item.zip}
                  </p>

                </div>

                {item.isDefault && (
                  <span className="h-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Default
                  </span>
                )}

              </div>

              <div className="mt-5 flex gap-3">

                <button
                  type="button"
                  onClick={() =>
                    handleSelectAddress(item)
                  }
                  className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                >
                  Deliver Here
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteAddress(item.id)
                  }
                  className="rounded-xl border border-red-300 px-5 text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

        <button
          type="button"
          onClick={() => setStep(1)}
          className="mt-6 w-full rounded-xl border-2 border-dashed border-green-500 py-3 font-semibold text-green-600 hover:bg-green-50"
        >
          + Add New Address
        </button>
      </>
    )}
  </>
) : step === 1 ? (
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
        className="h-12 w-full rounded-xl border border-gray-300 pl-12 pr-4 focus:ring-2 focus:ring-green-500"
      />

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-2xl border bg-white shadow-xl">

          {suggestions.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestion(item)}
              className="w-full border-b px-4 py-3 text-left hover:bg-green-50 last:border-none"
            >
              <p className="font-medium">
                {item.label}
              </p>

              <p className="text-xs text-gray-500">
                {item.city}, {item.state}
              </p>

            </button>
          ))}

        </div>
      )}

    </div>

    <div className="my-6 flex items-center">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="px-4 text-sm text-gray-400">
        OR
      </span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>

    <button
      type="button"
      onClick={handleLocation}
      disabled={loading}
      className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-green-600 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
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

    <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">

      <div className="flex gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">

          <MapPin
            size={22}
            className="text-green-600"
          />

        </div>

        <div>

          <h3 className="font-semibold">
            Faster Delivery
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Detect your current location or search
            manually.
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
    {/* REVIEW ADDRESS */}

    <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 p-4">

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
          className="flex-1 rounded-xl border py-3"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleSaveAddress}
          disabled={loading}
          className="flex-1 rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
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