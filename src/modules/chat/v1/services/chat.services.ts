import { Idea } from "../../../ideas/v1/model/ideas.model";
import { IChat } from "../interface";
import { Chat } from "../model/chat.models";

export async function savemessage(body: IChat) {
  try {
    let message;
    let team = await Idea.findById({ _id: body.projectId });
    if (team) {
      message = await Chat.create({
        senderId: body.senderId,
        message: body.message,
        projectId: body.projectId,
      });
      return {
        success: true,
        data: message,
        message: "Success",
      };
    }
  } catch (e) {
    return {
      success: false,
      data: e,
      message: "Failed to save message",
    };
  }
}
