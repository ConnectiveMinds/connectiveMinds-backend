import { Response } from "express";
import { Idea } from "../model/ideas.model";
import { AuthRequest } from "../../../../interface/request.interface";
import { IIdea, Iget } from "../interface";
import { User } from "../../../user/v1";

import { recommendProjects } from "../services/similarity.service";

import { IUser } from "../../../user/v1/interface";

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
      console.log(groups);
      res.sendResponse(groups);
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};
export const getprojectforlandingpage = async (req: Request, res: Response) => {
  try {
    const ideas = await Idea.find({}).limit(4);

    res.sendResponse(ideas);
  } catch (e) {
    console.log(e);
    res.sendError(500, e, "Internal Server Error");
  }
};

export const getallprojects = async (
  req: AuthRequest<IUser, IUser, Iget>,
  res: Response
) => {
  try {
    const userId = req.user?.userId;
    let skills: string[] = [];
    //@ts-ignore
    const user: IUser = await User.findById({
      _id: req.user?.userId,
    });
    const joinedprojectskills: IIdea[] = await Idea.find({
      members: {
        $in: [userId],
      },
    });
    if (user) {
      skills.push(...user.skills);
    }
    joinedprojectskills.forEach((project) => {
      project.skills.map((skill) => {
        let smallskill = skill.toLowerCase();
        skills.push(smallskill);
      });
    });

    const ideas: IIdea[] = await Idea.find({
      ownerId: { $ne: req.user?.userId },
      members: { $nin: [req.user?.userId] },
    });

    const data = recommendProjects(skills, ideas);
    res.sendResponse(data);
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};

export const getIncomingRequest = async (
  req: AuthRequest<Iget>,
  res: Response
) => {
  try {
    let userId = req.user?.userId;
    if (userId) {
      const request = await Idea.find({
        ownerId: userId,
        joinRequest: { $ne: [] },
      }).populate({
        path: "joinRequest",
        select: {
          name: 1,
          email: 1,
          _id: 1,
        },
      });

      if (!request) {
        res.sendError(400, "Empty", "No Request Found");
      }
      res.sendResponse(request);
    } else {
      res.sendError(401, "Unauthorized", "User Empty");
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};

export const getallMember = async (
  req: AuthRequest<{}, {}, Iget>,
  res: Response
) => {
  try {
    let userId = req.user?.userId;
    if (userId) {
      const project = await Idea.findOne({
        _id: req.params?.projectId,
      }).populate({
        path: "members",
        select: {
          name: 1,
          email: 1,
          _id: 1,
        },
      });

      if (!project) {
        res.sendError(400, "Empty", "No Project Found");
      }
      res.sendResponse(project!);
    } else {
      res.sendError(401, "Unauthorized", "User Empty");
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};

export const getSentRequest = async (req: AuthRequest<Iget>, res: Response) => {
  try {
    let userId = req.user?.userId;
    if (userId) {
      const request = await Idea.find({
        joinRequest: { $in: [userId] },
        ownerId: { $ne: req.user?.userId },
      }).populate({
        path: "joinRequest",
        select: {
          name: 1,
          email: 1,
          _id: 1,
        },
      });

      if (!request) {
        res.sendError(400, "Empty", "No Request Found");
      }
      res.sendResponse(request);
    } else {
      res.sendError(401, "Unauthorized", "User Empty");
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};
