import { Request, Response } from "express";
import { ChatModel } from "../model/chat.models";
import { IChat } from "../interface";

interface request<T> extends Request {
  body: T;
}
export const savemessage = async (req: request<IChat>, res: Response) => {
  try {
    let message;
    console.log(req);
    message = await ChatModel.create({
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
export const getallMessages = async (req: Request, res: Response) => {
  try {
    console.log("sds");
    console.log(req);
    const messages = await ChatModel.find({
      projectId: req.params.projectId,
    }).populate("messageId");
    return res.status(200).json({
      success: true,
      data: messages,
      message: "Success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Error",
    });
  }
};
