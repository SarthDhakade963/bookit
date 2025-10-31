import Link from "next/link";
import Image from "next/image";
import { Experience } from "@/types/type";

export default function ExperienceCard({
  id,
  title,
  description,
  location,
  slug,
  priceCents,
  imageUrl,
}: Experience) {
  const price = (priceCents / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition hover:shadow-lg w-[280px] h-auto">
      <div className="relative w-full h-[150px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="280px"
        />
      </div>

      <div className="p-4 flex flex-col gap-2 h-[162px] justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-black text-[15px]">{title}</h3>
            <span className="text-xs bg-gray-100 text-black px-2 py-1 rounded-md whitespace-nowrap">
              {location}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium text-sm text-black ">
            From <span className="font-bold text-lg ">{price}</span>
          </p>

          <Link href={`/experiences/${slug}`}>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm px-4 py-2 rounded-md font-medium">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
