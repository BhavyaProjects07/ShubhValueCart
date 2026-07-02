"use client";

import { useState } from "react";
import axios from "axios";

import UploadZone from "@/components/store/inventory/UploadZone";
import SelectedFileCard from "@/components/store/inventory/SelectedFileCard";
import PreviewCard from "@/components/store/inventory/PreviewCard";
import ProgressCard from "@/components/store/inventory/ProgressCard";
import ResultCard from "@/components/store/inventory/ResultCard";

export default function InventoryPage() {
  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState(null);

  const [result, setResult] = useState(null);

  const [syncExisting, setSyncExisting] = useState(true);
  const [importNew, setImportNew] = useState(false);

  const [previewLoading, setPreviewLoading] = useState(false);

  const [syncing, setSyncing] = useState(false);

  const [progress, setProgress] = useState(0);

  const [currentStep, setCurrentStep] = useState("");

  // -----------------------------
  // PREVIEW INVENTORY
  // -----------------------------
  const handlePreview = async () => {
    if (!file) {
      alert("Please select an Excel file.");
      return;
    }

    try {
      setPreviewLoading(true);
      setPreview(null);
      setResult(null);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("syncExisting", syncExisting);
      formData.append("importNew", importNew);

      const { data } = await axios.post(
        "/api/store/inventory/preview",
        formData
      );

      if (!data.success) {
        throw new Error(data.error);
      }

      setPreview(data.summary);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
          error.message ||
          "Failed to preview inventory."
      );
    } finally {
      setPreviewLoading(false);
    }
  };

  // -----------------------------
  // SYNC INVENTORY
  // -----------------------------
  const handleInventorySync = async () => {
    if (!file) return;

    try {
      setSyncing(true);
      setResult(null);

      setProgress(10);
      setCurrentStep("Uploading Excel...");

      const formData = new FormData();

      formData.append("file", file);
      formData.append("syncExisting", syncExisting);
      formData.append("importNew", importNew);

      setProgress(30);
      setCurrentStep("Analyzing inventory...");

      const { data } = await axios.post(
        "/api/store/inventory/sync",
        formData
      );

      setProgress(90);
      setCurrentStep("Finalizing...");

      if (!data.success) {
        throw new Error(data.error);
      }

      setProgress(100);

      setCurrentStep("Completed");

      setResult({
        ...data.summary,
        timeTaken: data.timeTaken,
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
          error.message ||
          "Inventory sync failed."
      );
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Inventory Management
        </h1>

        <p className="text-gray-500 mt-2">
          Upload your supplier's Excel file to synchronize inventory,
          update stock and optionally import new products.
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

            syncExisting={syncExisting}
            setSyncExisting={setSyncExisting}

            importNew={importNew}
            setImportNew={setImportNew}

            loading={previewLoading}
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
  syncExisting={syncExisting}
  importNew={importNew}
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