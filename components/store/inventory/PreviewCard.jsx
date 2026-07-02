"use client";

import {
  CheckCircle2,
  PlusCircle,
  RefreshCcw,
  PackageX,
  MinusCircle,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

export default function PreviewCard({
  preview,
  onSync,
  loading = false,
  syncExisting,
  importNew,
}) {
  const cards = [
    {
      title: "Existing Products",
      value: preview.existing,
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: CheckCircle2,
    },
    {
      title: "New Products",
      value: preview.newProducts,
      color: "text-green-600",
      bg: "bg-green-50",
      icon: PlusCircle,
    },
    {
      title: "Stock Updates",
      value: preview.stockUpdates,
      color: "text-orange-600",
      bg: "bg-orange-50",
      icon: RefreshCcw,
    },
    {
      title: "Out Of Stock",
      value: preview.outOfStock,
      color: "text-red-600",
      bg: "bg-red-50",
      icon: PackageX,
    },
    {
      title: "Unchanged",
      value: preview.unchanged,
      color: "text-gray-600",
      bg: "bg-gray-100",
      icon: MinusCircle,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border shadow-sm">

      {/* Header */}

      <div className="border-b px-6 py-5">

        <h2 className="text-2xl font-bold">
          Inventory Preview
        </h2>

        <p className="text-gray-500 mt-1">
          Review the changes before syncing your inventory.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 p-6">

        {cards.map((card) => {

          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="border rounded-xl p-5 hover:shadow-md transition"
            >

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg}`}
              >

                <Icon className={`w-6 h-6 ${card.color}`} />

              </div>

              <h3 className="mt-4 text-sm text-gray-500">
                {card.title}
              </h3>

              <div className={`text-3xl font-bold mt-1 ${card.color}`}>
                {card.value.toLocaleString()}
              </div>

            </div>
          );
        })}

      </div>

      {/* Selected Options */}

      <div className="px-6 pb-6">

        <div className="rounded-xl border bg-gray-50 p-5">

          <h3 className="font-semibold mb-4">
            Selected Inventory Operations
          </h3>

          <div className="space-y-3">

            <div className="flex items-center gap-3">

              <CheckCircle2
                className={`w-5 h-5 ${
                  syncExisting
                    ? "text-green-600"
                    : "text-gray-300"
                }`}
              />

              <span className="text-sm">
                Update stock of existing products
                {syncExisting && (
                  <span className="text-gray-500">
                    {" "}
                    (includes marking products missing from Excel as Out Of Stock)
                  </span>
                )}
              </span>

            </div>

            <div className="flex items-center gap-3">

              <CheckCircle2
                className={`w-5 h-5 ${
                  importNew
                    ? "text-green-600"
                    : "text-gray-300"
                }`}
              />

              <span className="text-sm">
                Add new products automatically
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Warning */}

      <div className="px-6 pb-6">

        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">

          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />

          <div className="text-sm text-amber-800">

            This operation will update your inventory database.
            Please verify the preview before continuing.

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t px-6 py-5 flex justify-between items-center">

        <div className="text-sm text-gray-500">

          Review the summary carefully before syncing.

        </div>

        <button
          onClick={onSync}
          disabled={loading}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-xl font-semibold transition"
        >

          {loading ? (
            "Syncing..."
          ) : (
            <>
              Sync Inventory
              <ArrowRight size={18} />
            </>
          )}

        </button>

      </div>

    </div>
  );
}