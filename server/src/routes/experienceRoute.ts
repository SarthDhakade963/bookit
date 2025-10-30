import express from "express";
import {
  getAllExperiences,
  getExperienceById,
} from "../controllers/experienceController";

const router = express.Router();
router.get("/", getAllExperiences);
router.get("/:experienceId", getExperienceById);

export default router;
