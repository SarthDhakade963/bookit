"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();

  const experience = params.get("experience");
  const date = params.get("date");
  const formattedDate =
    date &&
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const time = params.get("time");
  const price = Number(params.get("price") || 0);
  const qty = Number(params.get("qty") || 1);
  const slotId = params.get("slotId");
  const slug = params.get("experience");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [agree, setAgree] = useState(false);
  const [discount, setDiscount] = useState(0);

  const subtotal = price * qty - discount;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const applyPromo = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/promo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalPriceCents: price,
        promoCode: promo,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Promo successful!");
      setDiscount(data.discountApplied);
    }
  };

  const confirmBooking = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experienceSlug: slug,
          slotTimeId: slotId,
          userName: name,
          userEmail: email,
          seats: qty,
          promoCode: promo,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      router.push(`/booking?bookingId=${data.booking.id}`);
    } else {
      alert(data.message || "Booking failed");
    }
  };

  return (
    <div>
      <div className="flex gap-2 text-black items-center mb-1 mt-2">
        <button className="text-xl">←</button>
        <h2 className="font-medium text-lg">Checkout</h2>
      </div>
      <div className="px-10 py-4 max-w-7xl mx-auto flex gap-10">
        <div className="bg-gray-100 rounded-xl p-6 w-full max-w-2xl">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-600">Full name</label>
              <input
                className="w-full text-black bg-gray-300 rounded-lg px-3 py-2 mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                className="w-full text-black bg-gray-300 rounded-lg px-3 py-2 mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              className="w-full text-black bg-gray-300 rounded-lg px-3 py-2"
              placeholder="Promo code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button
              className="bg-black text-white px-5 rounded-lg"
              onClick={applyPromo}
            >
              Apply
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            I agree to the terms & safety policy
          </label>
        </div>

        <div className="bg-gray-50 text-gray-500 rounded-xl p-6 w-full max-w-sm">
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span>Experience</span>
              <span className="font-medium text-black">{experience}</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span className="font-medium text-black">{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span className="font-medium text-black">{time}</span>
            </div>
            <div className="flex justify-between">
              <span>Qty</span>
              <span className="font-medium text-black">{qty}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-black">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="font-medium text-black">₹{taxes}</span>
            </div>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            disabled={!agree}
            className="w-full bg-yellow-400 py-3 rounded-lg font-semibold disabled:opacity-40"
            onClick={confirmBooking}
          >
            Pay and Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
