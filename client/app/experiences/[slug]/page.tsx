"use client";

import Image from "next/image";
import PaymentCard from "@/components/PaymentCard";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SlotTime {
  id: string;
  time: string;
  slotId: string;
  capacity: number;
}

interface SlotDate {
  id: string;
  date: string;
  times: SlotTime[];
}

interface Experience {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  priceCents: number;
  dates: SlotDate[];
}

export default function ExperienceDetails() {
  const { slug } = useParams();
  const router = useRouter();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function getExperience() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/experiences/${slug}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch experience");
        const data = await res.json();

        const formatted = data.experience;

        console.log(formatted);

        setExperience(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getExperience();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!experience) return <p className="text-center py-10">Not Found</p>;

  const selectedDateObj = experience.dates.find((d) => d.id === selectedDate);
  const selectedSlot = selectedDateObj?.times.find(
    (t) => t.id === selectedTime
  );

  const goToCheckout = () => {
    if (!selectedDate || !selectedTime) return;

    const url = `/checkout?experience=${experience.title}&slug=${slug}&price=${
      experience.priceCents / 100
    }&date=${selectedDateObj?.date}&time=${selectedSlot?.time}&qty=1&slotId=${
      selectedSlot?.id
    }`;

    router.push(url);
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex gap-8">
        <div className="flex-1">
          <Image
            src={experience.imageUrl}
            alt={experience.title}
            width={900}
            height={500}
            className="rounded-xl mb-6 object-cover"
          />

          <h1 className="text-3xl font-semibold mb-2 text-black">
            {experience.title}
          </h1>
          <p className="text-gray-600 mb-6">{experience.description}</p>

          <h2 className="font-semibold mb-2 text-xl text-black">Choose date</h2>
          <div className="flex gap-2 mb-6 text-gray-500 ">
            {experience.dates.map((dateObj) => (
              <button
                key={dateObj.id}
                onClick={() => {
                  setSelectedDate(dateObj.id);
                  setSelectedTime(null);
                }}
                className={`px-4 py-2 border rounded-lg text-sm ${
                  selectedDate === dateObj.id
                    ? "bg-yellow-400  text-black border-0"
                    : "hover:bg-yellow-300 hover:text-black hover:border-0"
                }`}
              >
                {new Date(dateObj.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </button>
            ))}
          </div>

          {selectedDate && (
            <>
              <h2 className="font-semibold mb-2 text-xl text-black">
                Choose time
              </h2>
              <div className="flex gap-2 mb-6 flex-wrap text-gray-500">
                {selectedDateObj!.times.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={slot.capacity === 0}
                    onClick={() => setSelectedTime(slot.id)}
                    className={`w-fit px-4 py-2 border  rounded-lg text-sm flex justify-between items-center ${
                      slot.capacity === 0
                        ? "opacity-40 cursor-not-allowed"
                        : selectedTime === slot.id
                        ? "bg-yellow-400 text-black border-0"
                        : "hover:bg-yellow-300 hover:text-black hover:border-0"
                    }`}
                  >
                    {slot.time}
                    <span className="ml-2 text-xs text-red-500">
                      {slot.capacity === 0
                        ? "Sold out"
                        : `${slot.capacity} left`}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          <h3 className="font-semibold mb-2 text-black text-xl">About</h3>
          <p className="bg-gray-100 p-3 rounded-md text-sm text-gray-400">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>

        <div className="w-80">
          <PaymentCard
            price={experience.priceCents / 100}
            experienceTitle={experience.title}
            selectedDate={selectedDateObj?.date ?? null}
            selectedTime={selectedSlot?.time ?? null}
            slotId={selectedSlot?.id ?? null}
          />
        </div>
      </div>
    </div>
  );
}
