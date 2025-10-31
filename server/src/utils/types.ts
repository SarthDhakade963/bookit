import z from "zod";

export const promoSchema = z.object({
  promoCode: z.string().trim().toUpperCase(),
  totalPriceCents: z.number().min(1),
});

export const bookingSchema = z.object({
  experienceId: z.string().uuid(),
  slotId: z.string().uuid(),
  slotTimeId: z.string(),
  userName: z.string().min(2),
  userEmail: z.string().email(),
  seats: z.number().min(1),
  promoCode: z.string().trim().toUpperCase().optional(),
});
