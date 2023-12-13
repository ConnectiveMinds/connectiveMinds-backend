import { AuthRequest } from "../../../../interface/request.interface";
import { IIdea, IUpdate } from "../interface";
import { Idea } from "../model/ideas.model";
import { Response } from "express";
export const CreateIdea = async (
  req: AuthRequest<IIdea, {}, {}>,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (userId) {
      const { title, description, status, joinRequest, skills } =
        req.body || {};
      const idea = await Idea.create({
        ownerId: userId,
        title: title,
        description: description,
        skills: skills,
        joinRequest: joinRequest,
        status: status,
      });

      res.sendResponse(idea);
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};

export const updateRequest = async (
  req: AuthRequest<{}, {}, IUpdate>,
  res: Response
) => {
  try {
    let project = await Idea.findById({
      _id: req.params?.projectId,
    });

    if (project?.ownerId != req.user?.userId) {
      let newproject;
      newproject = await Idea.findByIdAndUpdate(
        {
          _id: req.params?.projectId,
        },
        {          
          $addToSet: { joinRequest: req.user?.userId },
        },
        {
          new: true,
        }
      );

      res.sendResponse(newproject);
    } else {
      res.sendResponse(project!);
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};
