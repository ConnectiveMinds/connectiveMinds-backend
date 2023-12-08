import mongoose from "mongoose";

import { IReview } from "../interface";

const ReviewSchema = new mongoose.Schema<IReview>(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review=mongoose.model<IReview>("Review",ReviewSchema)
