import { Response } from "express";
import { Idea } from "../model/ideas.model";
import { AuthRequest } from "../../../../interface/request.interface";
import { Iget } from "../interface";
import { User } from "../../../user/v1";

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

export const getallprojects = async (req: AuthRequest<Iget>, res: Response) => {
  try {
    const ideas = await Idea.find({});
    res.sendResponse(ideas);
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};
