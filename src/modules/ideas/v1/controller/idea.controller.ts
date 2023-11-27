import express, { Request, Response } from "express";
import { Idea, createIdeaDB } from "../model/ideas.model";
import { authenticateToken } from "../../../middlewares/auth.middleware";

export const IdeaDetail = async (req: Request, res: Response) => {

  authenticateToken(req, res, (err: any) => {
    if (err) {
     
      return res.status(401).json({ message: "Authentication failed" });
    }

    
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
  console.log("req");
  
console.log("dsad");
    const { title, description, status, skills, ownerId } = req.body;
    console.log(title);
    console.log(description)
    console.log(status)
    console.log(skills)
    console.log(ownerId)

    const idea = createIdeaDB({
      ownerId,
      title,
      description,
      skills,
      status,
    });

    res.json(idea);
  
};

export const findGroupsbyUserId = async (userId) => {
  try {
    const groups = await Idea.find({
      $or: [
        { ownerId: userId }, // Check if the user is the owner
        { members: { $in: [userId] } }, // Check if the user is a member
      ],
    });

    return groups;
  } catch (error: any) {
    throw new Error(`Error finding groups: ${error.message}`);
  }
};