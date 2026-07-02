"use client";

import { useState } from "react";

import UploadZone from "@/components/admin/inventory/UploadZone";
import SelectedFileCard from "@/components/admin/inventory/SelectedFileCard";
import PreviewCard from "@/components/admin/inventory/PreviewCard";
import ProgressCard from "@/components/admin/inventory/ProgressCard";
import ResultCard from "@/components/admin/inventory/ResultCard";

export default function InventoryPage() {
  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState(null);

  const [syncing, setSyncing] = useState(false);

  const [progress, setProgress] = useState(0);

  const [currentStep, setCurrentStep] = useState("");

  const [result, setResult] = useState(null);

  // Temporary Preview
  const handlePreview = () => {
    setPreview({
      existing: 2450,
      newProducts: 36,
      stockUpdates: 412,
      outOfStock: 187,
      unchanged: 2038,
    });
  };

  // Temporary Sync
  const handleInventorySync = async () => {
    setSyncing(true);
    setProgress(0);

    const steps = [
      "Reading Excel...",
      "Finding existing products...",
      "Updating inventory...",
      "Creating new products...",
      "Marking missing products as Out of Stock...",
      "Finalizing...",
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);

      await new Promise((resolve) => setTimeout(resolve, 700));

      setProgress(Math.round(((i + 1) / steps.length) * 100));
    }

    setSyncing(false);

    setResult({
      updated: 412,
      created: 36,
      outOfStock: 187,
      unchanged: 2038,
      timeTaken: "2.8 sec",
    });
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Page Title */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Inventory Management
        </h1>

        <p className="text-gray-500 mt-2">
          Upload your supplier's Excel file to automatically synchronize
          inventory, create new products, and mark unavailable products as
          out of stock.
        </p>

      </div>

      {/* Upload */}

      <UploadZone
        file={file}
        setFile={setFile}
      />

      {/* Selected File */}

      {file && (
        <div className="mt-6">
          <SelectedFileCard
            file={file}
            onPreview={handlePreview}
          />
        </div>
      )}

      {/* Preview */}

      {preview && !syncing && !result && (
        <div className="mt-8">

          <PreviewCard
            preview={preview}
            onSync={handleInventorySync}
            loading={syncing}
          />

        </div>
      )}

      {/* Progress */}

      {syncing && (
        <div className="mt-8">

          <ProgressCard
            progress={progress}
            currentStep={currentStep}
          />

        </div>
      )}

      {/* Result */}

      {result && (
        <div className="mt-8">

          <ResultCard
            result={result}
          />

        </div>
      )}

    </div>
  );
}