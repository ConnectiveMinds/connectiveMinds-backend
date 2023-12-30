import mongoose from "mongoose";

enum gender {
  M = "M",
  F = "F",
}

export interface IProfile {
  userId: mongoose.Types.ObjectId;
  name: String;
  gender: gender;
  address: String;
  institution: String;
  skills: string[];
}

export interface IGet {
  userId: mongoose.Types.ObjectId;
}
