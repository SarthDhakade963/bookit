import ExperienceCard from "@/components/ExperienceCard";
import { Experience } from "@/types/type";

async function getExperiences() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/experiences`,
    {
      cache: "default",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch experiences");
  const data = await res.json();
  return data.experiences as Experience[];
}

export default async function Home() {
  const experiences = await getExperiences();

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} {...exp} />
          ))}
        </div>
      </div>
    </div>
  );
}
