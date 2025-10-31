"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

export default function BookingSuccess() {
  const params = useSearchParams();
  const router = useRouter();
  const ref = params.get("bookingId");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <FaCheckCircle className="text-green-500" size={60} />

      <h1 className="text-2xl font-semibold text-black mt-4">
        Booking Confirmed
      </h1>

      <p className="text-gray-600 mt-2">
        Ref ID: <span className="font-medium">{ref}</span>
      </p>

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
      >
        Back to Home
      </button>
    </div>
  );
}
