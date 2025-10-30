import { Request, Response } from "express";
import { z } from "zod";

const promoSchema = z.object({
  promoCode: z.string().trim().toUpperCase(),
  totalPriceCents: z.number().min(1), // price before discount
});

const promoMap: Record<string, { type: "percent" | "flat"; value: number }> = {
  SAVE10: { type: "percent", value: 10 },
  FLAT100: { type: "flat", value: 10000 },
};

export const validatePromo = async (req: Request, res: Response) => {
  try {
    const parsed = promoSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.issues,
      });
    }

    const { promoCode, totalPriceCents } = parsed.data;
    const promo = promoMap[promoCode];

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: "Invalid promo code",
      });
    }

    let discountedPrice = totalPriceCents;

    if (promo.type === "percent") {
      discountedPrice = Math.round(
        totalPriceCents * ((100 - promo.value) / 100)
      );
    } else if (promo.type === "flat") {
      discountedPrice = Math.max(0, totalPriceCents - promo.value);
    }

    return res.status(200).json({
      success: true,
      promoCode,
      originalPrice: totalPriceCents,
      discountedPrice,
      discountApplied: totalPriceCents - discountedPrice,
    });
  } catch (error) {
    console.error("Promo validation error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error validating promo" });
  }
};
