"use client";

import { UploadCloud } from "lucide-react";

export default function UploadZone({ file, setFile }) {

  function handleChange(e) {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
  }

  return (
    <label className="block">

      <div className="bg-white border-2 border-dashed border-green-300 rounded-2xl p-12 cursor-pointer hover:border-green-500 transition">

        <div className="flex flex-col items-center">

          <UploadCloud className="w-16 h-16 text-green-600" />

          <h2 className="mt-5 text-xl font-semibold">

            Upload Inventory Excel

          </h2>

          <p className="text-gray-500 mt-2">

            Drag & Drop or Click to Browse

          </p>

          <div className="mt-4 text-sm text-gray-400">

            Supported: .xlsx .xls

          </div>

        </div>

      </div>

      <input
        hidden
        type="file"
        accept=".xlsx,.xls"
        onChange={handleChange}
      />

    </label>
  );
}