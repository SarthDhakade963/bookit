import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use(express.json());
app.use(cookieParser());

app.use("/experiences", experienceRoutes);
app.use("/bookings", bookingRoutes);
app.use("/promo", promoRoutes);

export default app;
