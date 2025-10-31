import CheckoutClient from "@/components/CheckoutClient";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <Suspense fallback={<div>Loading checkout...</div>}>
        <CheckoutClient />
      </Suspense>
    </div>
  );
}
