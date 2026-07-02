import { FileSpreadsheet } from "lucide-react";

export default function SelectedFileCard({ file }) {

  return (
    <div className="bg-white border rounded-2xl p-6">

      <div className="flex items-center gap-5">

        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">

          <FileSpreadsheet className="w-8 h-8 text-green-600" />

        </div>

        <div className="flex-1">

          <h3 className="font-semibold text-lg">

            {file.name}

          </h3>

          <p className="text-gray-500">

            {(file.size / 1024).toFixed(1)} KB

          </p>

        </div>

        <button
          className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Preview Inventory
        </button>

      </div>

    </div>
  );
}