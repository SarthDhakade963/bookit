import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import experienceRoute from "./routes/experienceRoute";
import bookingRoute from "./routes/bookingRoute";
import promoRoute from "./routes/promoRoute";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use(express.json());
app.use(cookieParser());

app.use("/api/experiences", experienceRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/promo", promoRoute);

export default app;
