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
      title: "Scuba Diving",
      slug: "scuba-diving-goa",
      description: "Explore the underwater world guided by experts in Goa.",
      location: "Goa, India",
      priceCents: 450000,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661894232140-73d96a67731b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      durationMin: 180,
    },
    {
      title: "Hot Air Balloon",
      slug: "hot-air-balloon-jaipur",
      description: "Fly over Jaipur and enjoy surreal sunrise views.",
      location: "Jaipur, Rajasthan",
      priceCents: 1500000,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661884752233-eac0b5efe655?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1208",
      durationMin: 90,
    },
    {
      title: "River Rafting",
      slug: "river-rafting-rishikesh",
      description:
        "Experience thrilling white-water rafting on the Ganga river.",
      location: "Rishikesh, Uttarakhand",
      priceCents: 250000,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661868422376-df4cffb18311?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      durationMin: 120,
    },
    {
      title: "Skydiving",
      slug: "skydiving-dubai",
      description:
        "Skydive over Mysore’s stunning landscape for an unforgettable adrenaline rush..",
      location: "Mysore, Karanataka",
      priceCents: 2500000,
      imageUrl:
        "https://images.unsplash.com/photo-1664494130837-14e0473ed284?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      durationMin: 60,
    },
    {
      title: "Paragliding",
      slug: "paragliding-bir-billing",
      description:
        "Soar over beautiful Himalayan valleys in India's paragliding capital.",
      location: "Bir, Himachal Pradesh",
      priceCents: 180000,
      imageUrl:
        "https://images.unsplash.com/photo-1743194309431-36f0f8599638?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2080",
      durationMin: 45,
    },
    {
      title: "Desert Safari",
      slug: "desert-safari-dubai",
      description:
        "Ride dunes, enjoy camel safari & Rajanthani cultural evening.",
      location: "Jaiselmer, Rajasthan",
      priceCents: 400000,
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1661962564466-2fc5a2b5fba8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
      durationMin: 240,
    },
    {
      title: "Trek to Valley of Flowers",
      slug: "valley-of-flowers-trek",
      description: "Walk through paradise—UNESCO Himalayan flower valley.",
      location: "Uttarakhand, India",
      priceCents: 320000,
      imageUrl:
        "https://images.unsplash.com/photo-1723871493526-79bfa8d9402e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
      durationMin: 600,
    },
    {
      title: "Helicopter Ride",
      slug: "helicopter-ride-mumbai",
      description:
        "Enjoy breathtaking aerial views of Mumbai skyline & coastline.",
      location: "Mumbai, Maharashtra",
      priceCents: 550000,
      imageUrl:
        "https://images.unsplash.com/photo-1742931897852-233e8d38b5fc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
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
