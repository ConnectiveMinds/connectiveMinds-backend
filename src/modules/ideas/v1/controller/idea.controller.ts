import { Request } from "express";
import { Idea, createIdeaDB } from "../model/ideas.model";

import { AuthRequest } from "../../../../interface/request.interface";
import { Iget } from "../interface";
import { User } from "../../../user/v1";
import { Response } from "express";
export const CreateIdea = async (req: Request, res: Response) => {
  console.log("req");

  console.log("dsad");
  const { title, description, status, skills, ownerId } = req.body;
  console.log(title);
  console.log(description);
  console.log(status);
  console.log(skills);
  console.log(ownerId);

  const idea = createIdeaDB({
    ownerId,
    title,
    description,
    skills,
    status,
  });

  res.json(idea);
};

export const getideasbyUserId = async (
  req: AuthRequest<Iget>,
  res: Response
) => {
  try {
    let user;
    let userId = req.user?.userId;
    user = await User.findById({ _id: userId });

    if (user) {
      const groups = await Idea.find({
        $or: [
          { ownerId: userId },
          {
            members: {
              $in: [userId],
            },
          },
        ],
      });
      res.sendResponse(groups);
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};
