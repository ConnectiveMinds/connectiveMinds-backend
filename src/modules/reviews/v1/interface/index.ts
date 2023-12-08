import mongoose from "mongoose";

export interface IReview{
    userId: mongoose.Types.ObjectId;
    review: String;
}

export interface IGet{
    userId: mongoose.Types.ObjectId;
}