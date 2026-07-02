"use client";

import { FileSpreadsheet, PackageCheck, PlusCircle } from "lucide-react";

export default function SelectedFileCard({
  file,
  onPreview,

  syncExisting,
  setSyncExisting,

  importNew,
  setImportNew,

  loading = false,
}) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">

      {/* File Information */}
      <div className="flex items-center gap-5">

        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">

          <FileSpreadsheet className="w-8 h-8 text-green-600" />

        </div>

        <div className="flex-1">

          <h3 className="font-semibold text-lg break-all">
            {file.name}
          </h3>

          <p className="text-gray-500">
            {(file.size / 1024).toFixed(1)} KB
          </p>

        </div>

      </div>

      {/* Divider */}

      <div className="my-6 border-t" />

      {/* Inventory Options */}

      <div className="space-y-4">

        <h4 className="font-semibold text-lg">
          Inventory Options
        </h4>

        {/* Existing Products */}

        <label className="flex items-start gap-4 border rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition">

          <input
            type="checkbox"
            checked={syncExisting}
            onChange={(e) =>
              setSyncExisting(e.target.checked)
            }
            className="mt-1 h-5 w-5 accent-green-600"
          />

          <PackageCheck className="w-6 h-6 text-green-600 mt-0.5" />

          <div>

            <p className="font-medium">
              Update stock of existing products
            </p>

            <p className="text-sm text-gray-500 mt-1">
              • Update stock if Qty has changed
              <br />
              • Skip products whose stock is unchanged
              <br />
              • Mark products missing from Excel as Out Of Stock
            </p>

          </div>

        </label>

        {/* New Products */}

        <label className="flex items-start gap-4 border rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition">

          <input
            type="checkbox"
            checked={importNew}
            onChange={(e) =>
              setImportNew(e.target.checked)
            }
            className="mt-1 h-5 w-5 accent-green-600"
          />

          <PlusCircle className="w-6 h-6 text-blue-600 mt-0.5" />

          <div>

            <p className="font-medium">
              Add new products automatically
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Create products whose Item Code is present
              in the Excel file but not found in the
              database.
            </p>

          </div>

        </label>

      </div>

      {/* Preview Button */}

      <div className="mt-8 flex justify-end">

        <button
          onClick={onPreview}
          disabled={loading || (!syncExisting && !importNew)}
          className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {loading ? "Analyzing..." : "Preview Inventory"}
        </button>

      </div>

    </div>
  );
}