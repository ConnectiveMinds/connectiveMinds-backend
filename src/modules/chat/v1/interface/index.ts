import mongoose from "mongoose";

export interface IChat {
  senderId: mongoose.Schema.Types.ObjectId;
  projectId: mongoose.Schema.Types.ObjectId;
  message: String;
}
