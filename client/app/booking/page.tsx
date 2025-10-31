import BookingClient from "@/components/BookingClient";
import { Suspense } from "react";

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading booking...</div>}>
      <BookingClient />
    </Suspense>
  );
}
