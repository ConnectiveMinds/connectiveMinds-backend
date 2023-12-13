import { Request, Response } from "express";
import { Chat } from "../model/chat.models";
import { IChat } from "../interface";
import { Idea } from "../../../ideas/v1/model/ideas.model";
import { AuthRequest } from "../../../../interface/request.interface";

export const savemessage = async (
  req: AuthRequest<IChat, {}>,
  res: Response
) => {
  try {
    let message;

    message = await Chat.create({
      senderId: req?.user?.userId,
      message: req?.body?.message,
      projectId: req?.body?.projectId,
    });
    const data = await message.populate({
      path: "senderId",
      select: {
        name: 1,
        _id: 1,
      },
    });

    res.sendResponse(data);
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};

export const getallMessages = async (
  req: AuthRequest<{}, {}, IChat>,
  res: Response
) => {
  try {
    let project = await Idea.findById({ _id: req?.params?.projectId });
    if (project) {
      const messages = await Chat.find({
        projectId: req?.params?.projectId,
      }).populate({
        path: "senderId",
        select: {
          name: 1,
          _id: 1,
        },
      });
      res.sendResponse(messages);
    } else {
      res.sendError(400, "Invalid Credentials", "Project Not Found");
    }
  } catch (err) {
    res.sendError(500, err, "Internal Server Error");
  }
};
