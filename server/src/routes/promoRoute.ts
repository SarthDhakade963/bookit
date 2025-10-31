import express from "express";
import { validatePromo } from "../controllers/promoController";

const router = express.Router();
router.post("/", validatePromo);

export default router;
