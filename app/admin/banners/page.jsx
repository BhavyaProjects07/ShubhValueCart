"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  Upload,
  ImagePlus,
  ExternalLink,
  Loader2,
  Plus,
} from "lucide-react";

export default function AdminBanners() {
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [banners, setBanners] = useState([]);

  const [form, setForm] = useState({
    title: "",
    link: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const fetchBanners = async () => {
    try {
      const { data } = await axios.get("/api/store/banners");
      setBanners(data.banners || []);
    } catch (err) {
      toast.error("Failed to fetch banners.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const uploadBanner = async (e) => {
    e.preventDefault();

    if (!form.image)
      return toast.error("Please choose a banner.");

    try {
      setUploading(true);

      const token = await getToken();

      const fd = new FormData();

      fd.append("image", form.image);
      fd.append("title", form.title);
      fd.append("link", form.link);

      await axios.post("/api/store/banners", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Banner uploaded.");

      setForm({
        title: "",
        link: "",
        image: null,
      });

      setPreview(null);

      fetchBanners();
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "Upload failed."
      );
    } finally {
      setUploading(false);
    }
    };
    
    const updateBanner = async () => {
  try {
    setSaving(true);

    const token = await getToken();

    const fd = new FormData();

    fd.append("title", editBanner.title || "");
    fd.append("link", editBanner.link || "");
    fd.append("order", editBanner.order);
    fd.append("isActive", editBanner.isActive);

    if (editBanner.newImage) {
      fd.append("image", editBanner.newImage);
    }

    await axios.put(
      `/api/store/banners/${editBanner.id}`,
      fd,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Banner updated.");

    setEditBanner(null);

    fetchBanners();

  } catch (err) {
    toast.error(
      err?.response?.data?.error || "Update failed."
    );
  } finally {
    setSaving(false);
  }
    };
    

    const deleteBanner = async (id) => {
  if (!confirm("Delete this banner?")) return;

  try {

    setDeleting(true);

    const token = await getToken();

    await axios.delete(
      `/api/store/banners/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Banner deleted.");

    fetchBanners();

  } catch (err) {

    toast.error(
      err?.response?.data?.error || "Delete failed."
    );

  } finally {

    setDeleting(false);

  }
    };
    


  if (loading)
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-green-600" />
      </div>
    );

  return (
    <div className="max-w-7xl">

      {/* Header */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Banner Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage homepage promotional banners.
          </p>

        </div>

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">

          {banners.length}/5 Banners

        </div>

      </div>

      {/* Upload */}

      {banners.length < 5 && (

        <form
          onSubmit={uploadBanner}
          className="bg-white rounded-3xl border border-green-100 p-8 shadow-sm mb-10"
        >

          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left */}

            <div>

              <label className="block mb-2 font-semibold">

                Banner Title

              </label>

              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
                placeholder="Summer Sale"
              />

              <label className="block mt-6 mb-2 font-semibold">

                Redirect Link

              </label>

              <input
                value={form.link}
                onChange={(e) =>
                  setForm({
                    ...form,
                    link: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
                placeholder="/shop"
              />

              <label className="block mt-6 mb-2 font-semibold">

                Banner Image

              </label>

              <label className="h-52 border-2 border-dashed border-green-300 rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:bg-green-50 transition">

                <ImagePlus className="w-12 h-12 text-green-600 mb-4" />

                <p className="font-semibold">

                  Click to upload

                </p>

                <p className="text-sm text-gray-500">

                  JPG PNG WEBP

                </p>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />

              </label>

            </div>

            {/* Right */}

            <div>

              <h3 className="font-semibold mb-3">

                Preview

              </h3>

              <div className="aspect-[16/6] rounded-2xl overflow-hidden bg-gray-100 border">

                {preview ? (

                  <Image
                    src={preview}
                    alt=""
                    fill={false}
                    width={1000}
                    height={500}
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <div className="w-full h-full flex items-center justify-center text-gray-400">

                    No Preview

                  </div>

                )}

              </div>

            </div>

          </div>

          <button
            disabled={uploading}
            className="mt-8 bg-[#00a300] hover:bg-green-700 text-white rounded-xl px-8 py-3 flex items-center gap-2 font-semibold transition"
          >

            {uploading ? (

              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Uploading...
              </>

            ) : (

              <>
                <Upload size={18} />
                Upload Banner
              </>

            )}

          </button>

        </form>

      )}

      {/* Banner Grid */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {banners.map((banner) => (

          <div
            key={banner.id}
            className="rounded-3xl overflow-hidden bg-white border border-green-100 shadow-sm"
          >

            <Image
              src={banner.image}
              width={900}
              height={450}
              alt=""
              className="w-full aspect-[16/7] object-cover"
            />

            <div className="p-5">

              <h3 className="font-bold text-lg">

                {banner.title || "Untitled"}

              </h3>

              <p className="text-gray-500 text-sm mt-2 truncate">

                {banner.link || "No redirect"}

              </p>

              <div className="mt-5 flex items-center gap-3">

                <button
    onClick={() => setEditBanner(banner)}
    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 font-semibold transition"
>
    Edit
</button>

                <button
    onClick={() => deleteBanner(banner.id)}
    disabled={deleting}
    className="w-11 h-11 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 flex items-center justify-center transition"
>
    🗑️
</button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}