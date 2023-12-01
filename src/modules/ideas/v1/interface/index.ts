import mongoose from "mongoose";

export interface IIdea {
  ownerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: "open" | "close";
  skills: [string];
  members: [mongoose.Types.ObjectId];
  joinRequest: [mongoose.Types.ObjectId];
}

export interface Iget {
  userId: mongoose.Types.ObjectId;
}

export interface IUpdate extends IIdea {
  projectId: mongoose.Types.ObjectId;
}
