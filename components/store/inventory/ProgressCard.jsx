"use client";

import { Loader2 } from "lucide-react";

export default function ProgressCard({
  progress = 0,
  currentStep = "Preparing inventory...",
}) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm">

      <div className="p-6">

        <div className="flex items-center gap-3">

          <Loader2 className="w-6 h-6 text-green-600 animate-spin" />

          <div>

            <h2 className="text-xl font-bold">
              Syncing Inventory
            </h2>

            <p className="text-gray-500 text-sm">
              Please don't close this page while syncing.
            </p>

          </div>

        </div>

        <div className="mt-8">

          <div className="flex justify-between text-sm mb-2">

            <span>{currentStep}</span>

            <span>{progress}%</span>

          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}