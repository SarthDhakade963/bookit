import express from "express";
import {
  getAllExperiences,
  getExperienceBySlug,
} from "../controllers/experienceController";

const router = express.Router();

router.get("/", getAllExperiences);
router.get("/:slug", getExperienceBySlug);

export default router;
