import mongoose from "mongoose";
import { IIdea } from "../interface";

const IdeaSchema = new mongoose.Schema<IIdea>(
  {
    ownerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "close"],
    },
    skills: {
      type: [String],
    },
    members: {
      type: [mongoose.Schema.ObjectId],
      ref: "User",
    },
    joinRequest: {
      type: [mongoose.Schema.ObjectId],
      ref: "User",
    },
  },
);

export const Idea = mongoose.model<IIdea>("Idea", IdeaSchema);
