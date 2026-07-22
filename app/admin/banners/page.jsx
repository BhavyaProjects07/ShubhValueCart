const uploadBanner = async (e) => {
  e.preventDefault();

  if (!form.image) {
    toast.error("Please choose a banner.");
    return;
  }

  try {
    setUploading(true);

    // ==============================
    // IMAGE DEBUG
    // ==============================
    console.group("🖼️ Banner Upload Debug");

    console.log("Selected File:", form.image);
    console.log("Name:", form.image.name);
    console.log("Type:", form.image.type);
    console.log("Bytes:", form.image.size);
    console.log(
      "KB:",
      (form.image.size / 1024).toFixed(2)
    );
    console.log(
      "MB:",
      (form.image.size / 1024 / 1024).toFixed(2)
    );

    const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

    if (form.image.size > MAX_SIZE) {
      console.error("❌ IMAGE TOO LARGE");
      console.error(
        `Selected: ${(form.image.size / 1024 / 1024).toFixed(2)} MB`
      );
      console.error("Allowed : 10 MB");

      toast.error(
        `Image is ${(form.image.size / 1024 / 1024).toFixed(
          2
        )} MB.\nMaximum allowed is 10 MB.`
      );

      console.groupEnd();
      return;
    }

    const token = await getToken();

    console.log("Clerk Token:", token ? "✅ Received" : "❌ Missing");

    const fd = new FormData();

    fd.append("image", form.image);
    fd.append("title", form.title);
    fd.append("link", form.link);

    console.log("----------- FormData -----------");

    for (const [key, value] of fd.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`);
        console.log("  Name :", value.name);
        console.log("  Type :", value.type);
        console.log("  Size :", value.size);
        console.log(
          "  MB   :",
          (value.size / 1024 / 1024).toFixed(2)
        );
      } else {
        console.log(`${key}:`, value);
      }
    }

    console.log("-------------------------------");
    console.log("🚀 Uploading banner...");

    const response = await axios.post(
      "/api/store/banners",
      fd,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Upload Success");
    console.log("Status:", response.status);
    console.log("Response:", response.data);

    console.groupEnd();

    toast.success("Banner uploaded.");

    setForm({
      title: "",
      link: "",
      image: null,
    });

    setPreview(null);

    fetchBanners();

  } catch (err) {

    console.group("❌ Banner Upload Failed");

    console.error("Message:", err.message);

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Headers:", err.response.headers);
      console.error("Data:", err.response.data);
    } else {
      console.error("No response received.");
    }

    console.error("Full Error:", err);

    console.groupEnd();

    toast.error(
      err?.response?.data?.error || "Upload failed."
    );

  } finally {

    setUploading(false);

  }

    


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

          {banners.length}/10 Banners

        </div>

      </div>

      {/* Upload */}

      {banners.length < 10 && (

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
          
          {editBanner && (
  <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-5">

    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8">

      <h2 className="text-2xl font-bold mb-6">
        Edit Banner
      </h2>

      <label className="block font-semibold mb-2">
        Title
      </label>

      <input
        value={editBanner.title || ""}
        onChange={(e) =>
          setEditBanner({
            ...editBanner,
            title: e.target.value,
          })
        }
        className="w-full border rounded-xl px-4 py-3 mb-5"
      />

      <label className="block font-semibold mb-2">
        Redirect URL
      </label>

      <input
        value={editBanner.link || ""}
        onChange={(e) =>
          setEditBanner({
            ...editBanner,
            link: e.target.value,
          })
        }
        className="w-full border rounded-xl px-4 py-3 mb-5"
      />

      <label className="block font-semibold mb-2">
        Replace Banner
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setEditBanner({
            ...editBanner,
            newImage: e.target.files[0],
          })
        }
        className="mb-8"
      />

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setEditBanner(null)}
          className="px-6 py-3 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={updateBanner}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-xl"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}