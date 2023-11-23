import express, { Request, Response } from "express";
import { Idea, createIdeaDB } from "../model/ideas.model";
import { authenticateToken } from "../../../middlewares/auth.middleware";

export const IdeaDetail = async (req: Request, res: Response) => {
  // The authenticateToken middleware should be called here
  authenticateToken(req, res, (err: any) => {
    if (err) {
      // Handle any authentication errors if needed
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Continue with your route logic
    Idea.find()
      .then((data) => {
        res.json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" });
      });
  });
};

export const CreateIdea = async (req: Request, res: Response) => {
  authenticateToken(req, res, (err: any) => {
    if (err) {
      // Handle any authentication errors if needed
      return res.status(401).json({ message: "Authentication failed" });
    }

    const { title, description, status, skills, owner } = req.body;

    // Continue with your route logic
    const idea = createIdeaDB({
      owner,
      title,
      description,
      skills,
      status,
    });

    res.json(idea);
  });
};
