import { Request, Response } from "express";
import prisma from "../config/prismaClient";
import { applyPromo } from "../utils/promo";
import { bookingSchema } from "../utils/types";

export const createBooking = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const parsed = bookingSchema.safeParse(req.body);

    console.log("Parsed: ", parsed);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.issues,
      });
    }

    const {
      experienceSlug,
      slotTimeId,
      userName,
      userEmail,
      seats,
      promoCode,
    } = parsed.data;

    console.log(parsed.data);

    const result = await prisma.$transaction(async (tx) => {
      const slotTime = await tx.slotAvailability.findUnique({
        where: { id: slotTimeId },
      });

      console.log("Slot time: ", slotTime);

      if (!slotTime) throw new Error("Selected time slot does not exist");

      if (slotTime.capacity < seats)
        throw new Error("Not enough seats available");

      const experience = await tx.experience.findUnique({
        where: { slug: experienceSlug },
      });

      if (!experience) throw new Error("Experience not found");

      const total = experience.priceCents * seats;
      const discounted = applyPromo(promoCode, total);

      await tx.slotAvailability.update({
        where: { id: slotTime.id },
        data: { capacity: slotTime.capacity - seats },
      });

      const booking = await tx.booking.create({
        data: {
          experienceId: experience.id,
          slotId: slotTime.slotId,
          slotTimeId: slotTime.id,
          date: new Date(),
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

    console.log(result);

    return res.status(200).json({ success: true, booking: result });
  } catch (err: unknown) {
    if (err instanceof Error) {
      const status =
        typeof (err as { status?: number }).status === "number"
          ? (err as unknown as { status: number }).status
          : 500;

      console.error("Booking Error:", err);

      return res.status(status).json({
        success: false,
        message: err.message || "Something went wrong",
      });
    }

    console.error("Unknown booking error:", err);
    return res.status(500).json({
      success: false,
      message: "Unknown error occurred",
    });
  }
};
