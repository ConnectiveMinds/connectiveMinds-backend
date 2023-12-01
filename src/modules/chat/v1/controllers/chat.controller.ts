import { Request, Response } from "express";
import { Chat } from "../model/chat.models";
import { IChat } from "../interface";
import { Idea } from "../../../ideas/v1/model/ideas.model";
import { AuthRequest } from "../../../../interface/request.interface";

interface request<T> extends Request {
  body: T;
}
export const savemessage = async (req: request<IChat>, res: Response) => {
  try {
    let message;

    message = await Chat.create({
      senderId: req.query.senderId,
      message: req.body.message,
    });
    return res.status(200).json({
      success: true,
      data: message,
      message: "Success",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e,
      message: "Error",
    });
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
      });
      res.sendResponse(messages);
    } else {
      res.sendError(400, "Invalid Credentials", "Project Not Found");
    }
  } catch (err) {
    res.sendError(500, err, "Internal Server Error");
  }
};
