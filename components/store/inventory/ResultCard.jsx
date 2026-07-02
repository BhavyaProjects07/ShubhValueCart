"use client";

import {
  CheckCircle2,
  PlusCircle,
  RefreshCcw,
  PackageX,
  MinusCircle,
  Clock3,
} from "lucide-react";

export default function ResultCard({ result }) {
  const stats = [
    {
      title: "Updated",
      value: result.updated,
      icon: RefreshCcw,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "New Products",
      value: result.created,
      icon: PlusCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Out Of Stock",
      value: result.outOfStock,
      icon: PackageX,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Unchanged",
      value: result.unchanged,
      icon: MinusCircle,
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border shadow-sm">

      <div className="border-b p-6">

        <div className="flex items-center gap-3">

          <CheckCircle2 className="text-green-600 w-8 h-8" />

          <div>

            <h2 className="text-2xl font-bold">

              Inventory Synced Successfully

            </h2>

            <p className="text-gray-500">

              Your database has been updated successfully.

            </p>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 p-6">

        {stats.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="border rounded-xl p-5"
            >

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg}`}
              >

                <Icon className={`w-6 h-6 ${item.color}`} />

              </div>

              <p className="mt-4 text-gray-500">

                {item.title}

              </p>

              <h3
                className={`text-3xl font-bold mt-1 ${item.color}`}
              >

                {item.value.toLocaleString()}

              </h3>

            </div>
          );
        })}

      </div>

      <div className="border-t p-6 flex items-center justify-between">

        <div className="flex items-center gap-2 text-gray-500">

          <Clock3 size={18} />

          <span>

            Completed in {result.timeTaken}

          </span>

        </div>

        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
        >

          Sync Another File

        </button>

      </div>

    </div>
  );
}