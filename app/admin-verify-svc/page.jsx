import { Suspense } from "react";
import VerifyForm from "./VerifyForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyForm />
    </Suspense>
  );
}