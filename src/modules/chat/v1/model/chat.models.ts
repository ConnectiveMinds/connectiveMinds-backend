import mongoose from "mongoose";
import { IChat } from "../interface";

const ChatSchema = new mongoose.Schema<IChat>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idea",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Chat = mongoose.model("Chat", ChatSchema);
