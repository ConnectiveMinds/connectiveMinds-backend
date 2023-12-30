import mongoose, { model } from "mongoose";
import { IUser } from "../interface";
import jwt from "jsonwebtoken";
import { string } from "zod";

export interface IUserSchema extends IUser {
  createToken: () => string;
}

const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    // gender: {
    //   type: String,
    //   enum: ["M", "F", "O"],
    //   required: true,
    // },
    // address: {
    //   type: String,
    // },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

UserSchema.methods.createToken = function (): String {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
    },
    process.env.JWT_TOKEN as string,
    {
      expiresIn: process.env.JWT_TOKEN_LIFETIME,
    }
  );
};

export const User = model("User", UserSchema);
