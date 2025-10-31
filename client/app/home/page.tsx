"use client";

import { useEffect, useState } from "react";
import ExperienceCard from "@/components/ExperienceCard";
import { Experience } from "@/types/type";

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!baseURL) {
          throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
        }

        const res = await fetch(`${baseURL}/experiences`);
        if (!res.ok) throw new Error("Failed to fetch experiences");

        const data = await res.json();
        setExperiences(data.experiences);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} {...exp} />
          ))}
        </div>
      </div>
    </div>
  );
}
