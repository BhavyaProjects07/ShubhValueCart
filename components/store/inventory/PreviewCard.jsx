"use client";

import {
  CheckCircle2,
  PlusCircle,
  RefreshCcw,
  PackageX,
  MinusCircle,
  ArrowRight,
} from "lucide-react";

export default function PreviewCard({
  preview,
  onSync,
  loading = false,
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

      {/* Stats */}

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

      {/* Footer */}

      <div className="border-t px-6 py-5 flex justify-between items-center">

        <div className="text-sm text-gray-500">

          Please verify the summary before updating the inventory.

        </div>

        <button
          onClick={onSync}
          disabled={loading}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          {loading ? (
            <>
              Syncing...
            </>
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