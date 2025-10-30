import express from "express";
import {
  getAllExperiences,
  getExperienceById,
} from "../controllers/experienceController";
import { validatePromo } from "../controllers/promoController";

const router = express.Router();
router.post("/", validatePromo);

export default router;
