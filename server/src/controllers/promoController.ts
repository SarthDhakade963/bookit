import { Request, Response } from "express";
import { applyPromo } from "../utils/promo";
import { promoSchema } from "../utils/types";


export const validatePromo = async (req: Request, res: Response) => {
  try {
    const parsed = promoSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.issues,
      });
    }

    const { promoCode, totalPriceCents } = parsed.data;

    const discounted = applyPromo(promoCode, totalPriceCents);

    if (discounted === totalPriceCents) {
      return res.status(404).json({
        success: false,
        message: "Invalid promo code",
      });
    }

    return res.status(200).json({
      success: true,
      promoCode,
      originalPrice: totalPriceCents,
      discountedPrice: discounted,
      discountApplied: totalPriceCents - discounted,
    });
  } catch (err) {
    console.error("Promo validation error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error validating promo",
    });
  }
};