"use client";

import Image from "next/image";
import PaymentCard from "@/components/PaymentCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ExperienceSlot {
  startTime: string;
  capacity: number;
}

interface Experience {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  priceCents: number;
  availableDates: string[];
  slots: ExperienceSlot[];
}

export default function ExperienceDetails() {
  const { slug } = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

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

        console.log(data.experience);
        setExperience(data.experience);
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

          <h1 className="text-3xl font-semibold mb-2">{experience.title}</h1>
          <p className="text-gray-600 mb-6">{experience.description}</p>

          <h2 className="font-semibold mb-2">Choose date</h2>
          <div className="flex gap-2 mb-6">
            {experience.slots.availability.map((date: string, i: number) => (
              <button
                key={i}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-black hover:text-white"
              >
                {date}
              </button>
            ))}
          </div>

          <h2 className="font-semibold mb-2">Choose time</h2>
          <div className="flex gap-2 mb-6">
            {experience.slots.map((s, i) => (
              <button
                key={i}
                disabled={s.capacity === 0}
                className={`px-4 py-2 border rounded-lg text-sm ${
                  s.capacity === 0 ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                {s.startTime} {s.capacity === 0 && "(Sold out)"}
              </button>
            ))}
          </div>

          <h3 className="font-semibold mb-2">About</h3>
          <p className="bg-gray-100 p-3 rounded-md text-sm">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>

        <div className="w-80">
          <PaymentCard price={experience.priceCents / 100} />
        </div>
      </div>
    </div>
  );
}
