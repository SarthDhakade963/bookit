import { Request, Response } from "express";
import prisma from "../config/prismaClient";

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        location: true,
        priceCents: true,
        imageUrl: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ experiences });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const { experienceId } = req.params;
    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        location: true,
        priceCents: true,
        imageUrl: true,

        slots: {
          select: {
            id: true,
            time: true,

            availability: {
              select: {
                id: true,
                date: true,
                capacity: true,
              },
              orderBy: { date: "asc" },
            },
          },
          orderBy: { time: "asc" },
        },
      },
    });

    if (!experience) {
      return res.status(400).json({ message: "Experience does not exists" });
    }

    return res.status(200).json({ experience });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
