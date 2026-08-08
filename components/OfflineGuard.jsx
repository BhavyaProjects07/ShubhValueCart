"use client";

import { useEffect, useState } from "react";
import OfflineScreen from "./OfflineScreen";

export default function OfflineGuard({ children }) {
  const [isOnline, setIsOnline] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    setChecked(true);

    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!checked) return null;

  if (!isOnline) {
    return <OfflineScreen />;
  }

  return children;
}