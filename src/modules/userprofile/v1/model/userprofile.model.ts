import mongoose from "mongoose";

import { IProfile } from "../interface";

const ProfileSchema = new mongoose.Schema<IProfile>(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
    },
    address: {
      type: String,
    },

    institution: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model<IProfile>("UserProfile", ProfileSchema);
