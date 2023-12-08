import { AuthRequest } from "../../../../interface/request.interface";
import { IIdea, IRequest, IUpdate, Iget } from "../interface";
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
    let project = await Idea.findOne({
      _id: req.params?.projectId,
      ownerId: { $ne: req.user?.userId },
      members: { $nin: [req.user?.userId] },
      joinRequest: { $nin: [req.user?.userId] },
    });
    if (!project) {
      res.sendError(
        400,
        "Invalid Request",
        "Request Already Sent or already a member"
      );
    }

    let newproject;
    newproject = await Idea.findByIdAndUpdate(
      {
        _id: req.params?.projectId,
        joinRequest: { $nin: [req.user?.userId] },
      },
      {
        $addToSet: { joinRequest: req.user?.userId },
      },
      {
        new: true,
      }
    );

    res.sendResponse(newproject);
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};

export const acceptRequset = async (
  req: AuthRequest<IRequest, {}, IUpdate>,
  res: Response
) => {
  try {
    let updatedRequest = await Idea.findOneAndUpdate(
      {
        _id: req.params?.projectId,
        ownerId: req.user?.userId,
        joinRequest: { $in: [req.body?.requestId] },
      },
      {
        $pull: { joinRequest: req.body?.requestId },
        $addToSet: { members: req.body?.requestId },
      },
      {
        new: true,
      }
    );
    res.sendResponse(updatedRequest!);
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};

export const declineRequset = async (
  req: AuthRequest<IRequest, {}, IUpdate>,
  res: Response
) => {
  try {
    let updatedRequest = await Idea.findOneAndUpdate(
      {
        _id: req.params?.projectId,
        ownerId: req.user?.userId,
        joinRequest: { $in: [req.body?.requestId] },
      },
      { $pull: { joinRequest: req.body?.requestId } },
      {
        new: true,
      }
    );

    if (updatedRequest == null) {
      res.sendError(400, "Unauthorized", "No request Found");
    } else {
      res.sendResponse(updatedRequest!);
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};
