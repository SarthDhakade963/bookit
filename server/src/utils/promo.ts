export function applyPromo(promoCode: string | undefined, totalCents: number) {
  const promoMap: Record<string, { type: "percent" | "flat"; value: number }> =
    {
      SAVE10: { type: "percent", value: 10 },
      FLAT100: { type: "flat", value: 100 },
    };

  if (!promoCode) return totalCents;

  const promo = promoMap[promoCode];
  if (!promo) return totalCents;

  if (promo.type === "percent") {
    return Math.round(totalCents * ((100 - promo.value) / 100));
  }
  if (promo.type === "flat") {
    return Math.max(0, totalCents - promo.value);
  }

  return totalCents;
}
