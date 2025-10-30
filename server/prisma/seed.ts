import { PrismaClient } from "@prisma/client";
import { addDays, startOfDay } from "date-fns";

const prisma = new PrismaClient();

const slotTimes = ["07:00", "09:00", "11:00", "13:00"];

function getNextSixDates() {
  const dates = [];
  for (let i = 0; i < 6; i++) {
    dates.push(startOfDay(addDays(new Date(), i)));
  }
  return dates;
}

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.booking.deleteMany();
  await prisma.slotAvailability.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.experience.deleteMany();

  const experiences = [
    {
      title: "Scuba Diving in Goa",
      slug: "scuba-diving-goa",
      description: "Explore the underwater world guided by experts in Goa.",
      location: "Goa, India",
      priceCents: 450000,
      imageUrl: "https://source.unsplash.com/600x400/?scuba,diving,sea",
      durationMin: 180,
    },
    {
      title: "Hot Air Balloon in Jaipur",
      slug: "hot-air-balloon-jaipur",
      description: "Fly over Jaipur and enjoy surreal sunrise views.",
      location: "Jaipur, Rajasthan",
      priceCents: 1500000,
      imageUrl: "https://source.unsplash.com/600x400/?hot-air-balloon,travel",
      durationMin: 90,
    },
    {
      title: "River Rafting in Rishikesh",
      slug: "river-rafting-rishikesh",
      description:
        "Experience thrilling white-water rafting on the Ganga river.",
      location: "Rishikesh, Uttarakhand",
      priceCents: 250000,
      imageUrl: "https://source.unsplash.com/600x400/?river-rafting,adventure",
      durationMin: 120,
    },
    {
      title: "Skydiving in Dubai",
      slug: "skydiving-dubai",
      description:
        "Jump from the skies over Palm Jumeirah—once-in-a-lifetime thrill.",
      location: "Dubai, UAE",
      priceCents: 2500000,
      imageUrl: "https://source.unsplash.com/600x400/?skydiving,dubai",
      durationMin: 60,
    },
    {
      title: "Paragliding in Bir Billing",
      slug: "paragliding-bir-billing",
      description:
        "Soar over beautiful Himalayan valleys in India's paragliding capital.",
      location: "Bir, Himachal Pradesh",
      priceCents: 180000,
      imageUrl: "https://source.unsplash.com/600x400/?paragliding,himachal",
      durationMin: 45,
    },
    {
      title: "Desert Safari in Dubai",
      slug: "desert-safari-dubai",
      description: "Ride dunes, enjoy camel safari & Arabian cultural evening.",
      location: "Dubai, UAE",
      priceCents: 400000,
      imageUrl: "https://source.unsplash.com/600x400/?desert-safari,dubai",
      durationMin: 240,
    },
    {
      title: "Trek to Valley of Flowers",
      slug: "valley-of-flowers-trek",
      description: "Walk through paradise—UNESCO Himalayan flower valley.",
      location: "Uttarakhand, India",
      priceCents: 320000,
      imageUrl: "https://source.unsplash.com/600x400/?himalayas,trek,nature",
      durationMin: 600,
    },
    {
      title: "Scenic Helicopter Ride in Mumbai",
      slug: "helicopter-ride-mumbai",
      description:
        "Enjoy breathtaking aerial views of Mumbai skyline & coastline.",
      location: "Mumbai, Maharashtra",
      priceCents: 550000,
      imageUrl: "https://source.unsplash.com/600x400/?helicopter,city,aerial",
      durationMin: 30,
    },
  ];

  for (const exp of experiences) {
    const experience = await prisma.experience.create({ data: exp });

    for (const time of slotTimes) {
      const slot = await prisma.slot.create({
        data: {
          experienceId: experience.id,
          time,
          capacity: 8,
        },
      });

      const dates = getNextSixDates();
      for (const date of dates) {
        await prisma.slotAvailability.create({
          data: {
            slotId: slot.id,
            date,
            capacity: 8,
          },
        });
      }
    }
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
