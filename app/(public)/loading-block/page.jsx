"use client";

export default function LoadingBlockPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Spinner */}
      <div className="relative mb-10">
        <div
          className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-gray-700 animate-spin"
        />
      </div>

      {/* Loading text with animated dots */}
      <p className="text-gray-500 text-base tracking-widest uppercase animate-pulse">
        Loading&nbsp;&nbsp;please wait&hellip;
      </p>
    </main>
  );
}
