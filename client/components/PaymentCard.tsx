"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  price: number;
  experienceTitle: string;
  selectedDate: string | null;
  selectedTime: string | null;
  slotId: string | null;
}

export default function PaymentCard({
  price,
  experienceTitle,
  selectedDate,
  selectedTime,
  slotId,
}: Props) {
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const subtotal = price * qty;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const handleCheckout = () => {
    if (!selectedDate || !selectedTime || !slotId) return; // make sure all exist

    router.push(
      `/checkout?experience=${encodeURIComponent(
        experienceTitle
      )}&date=${selectedDate}&time=${selectedTime}&qty=${qty}&price=${price}&slotId=${slotId}`
    );
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl w-full shadow-sm">
      <div className="flex justify-between mb-4">
        <span className="text-sm text-gray-600 ">Starts at</span>
        <span className="font-medium text-black">₹{price}</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">Quantity</span>
        <div className="flex items-center gap-2 text-black">
          <button
            disabled={qty === 1}
            onClick={() => setQty((q) => q - 1)}
            className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center"
          >
            −
          </button>
          <span>{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">Subtotal</span>
        <span className="text-black">₹{subtotal}</span>
      </div>
      <div className="flex justify-between text-sm mb-4">
        <span className="text-gray-600">Taxes</span>
        <span className="text-black">₹{taxes}</span>
      </div>

      <div className="flex justify-between font-semibold text-lg mb-4">
        <span className="text-black">Total</span>
        <span className="text-black">₹{total}</span>
      </div>

      <button
        className="w-full bg-yellow-400 py-3 rounded-lg font-semibold"
        onClick={handleCheckout}
      >
        Confirm
      </button>
    </div>
  );
}
