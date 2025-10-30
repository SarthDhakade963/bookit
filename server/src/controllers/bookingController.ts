import { Request, Response } from "express";
import prisma from "../config/prismaClient";

export const createBooking = async (req: Request, res: Response) => {
  const { experienceId, slotId, date, userName, userEmail, seats, promoCode } =
    req.body;

  try {
    const availability = await prisma.slotAvailability.findFirst({
      where: { slotId, date: new Date(date) },
    });

    if (!availability) {
      return res
        .status(400)
        .json({ error: "Slot not available for this date" });
    }

    if (availability.capacity < seats) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
    });

    if (!experience)
      return res.status(404).json({ error: "Experience not found" });

    let totalPrice = experience.priceCents * seats;

    if (promoCode === "SAVE10") {
      totalPrice = Math.round(totalPrice * 0.9);
    } else if (promoCode === "FLAT100") {
      totalPrice -= 10000;
    }

    await prisma.slotAvailability.update({
      where: { id: availability.id },
      data: { capacity: availability.capacity - seats },
    });

    const booking = await prisma.booking.create({
      data: {
        experienceId,
        slotId,
        date: new Date(date),
        userName,
        userEmail,
        seats,
        promoCode,
        totalPriceCents: totalPrice,
        status: "CONFIRMED",
      },
    });

    res.json({ success: true, booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};
