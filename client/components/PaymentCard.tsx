"use client";

import React, { useState } from "react";

interface Props {
  price: number; // in rupees (not cents)
}

export default function PaymentCard({ price }: Props) {
  const [qty, setQty] = useState(1);

  const subtotal = price * qty;
  const taxes = Math.round(subtotal * 0.06); // ~6% like Figma
  const total = subtotal + taxes;

  return (
    <div className="bg-gray-50 p-6 rounded-xl w-full shadow-sm">
      <div className="flex justify-between mb-4">
        <span className="text-sm text-gray-600">Starts at</span>
        <span className="font-medium">₹{price}</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            disabled={qty === 1}
            onClick={() => setQty((q) => q - 1)}
            className="w-7 h-7 border rounded flex items-center justify-center"
          >
            −
          </button>
          <span>{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-7 h-7 border rounded flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>
      <div className="flex justify-between text-sm mb-4">
        <span>Taxes</span>
        <span>₹{taxes}</span>
      </div>

      <div className="flex justify-between font-semibold text-lg mb-4">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button className="w-full bg-yellow-400 py-3 rounded-lg font-semibold disabled:bg-gray-300">
        Confirm
      </button>
    </div>
  );
}
