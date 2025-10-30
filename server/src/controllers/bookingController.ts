import { Request, Response } from "express";
import prisma from "../config/prismaClient";
import { z } from "zod";
import { applyPromo } from "../utils/promo";
import { bookingSchema } from "../utils/types";



export const createBooking = async (req: Request, res: Response) => {
  try {
    const parsed = bookingSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.issues,
      });
    }

    const {
      experienceId,
      slotId,
      date,
      userName,
      userEmail,
      seats,
      promoCode,
    } = parsed.data;

    const result = await prisma.$transaction(async (tx) => {
      const availability = await tx.slotAvailability.findFirst({
        where: { slotId, date: new Date(date) },
      });

      if (!availability) throw new Error("Slot not available for this date");
      if (availability.capacity < seats)
        throw new Error("Not enough seats available");

      const experience = await tx.experience.findUnique({
        where: { id: experienceId },
      });

      if (!experience) throw new Error("Experience not found");

      let total = experience.priceCents * seats;

      const discounted = applyPromo(promoCode, total);

      await tx.slotAvailability.update({
        where: { id: availability.id },
        data: { capacity: availability.capacity - seats },
      });

      const booking = await tx.booking.create({
        data: {
          experienceId,
          slotId,
          date: new Date(date),
          userName,
          userEmail,
          seats,
          promoCode,
          totalPriceCents: discounted,
          status: "CONFIRMED",
        },
      });

      return booking;
    });

    return res.status(200).json({ success: true, booking: result });
  } catch (err: any) {
    console.error("Booking Error:", err);
    return res.status(400).json({ success: false, message: err.message });
  }
};
