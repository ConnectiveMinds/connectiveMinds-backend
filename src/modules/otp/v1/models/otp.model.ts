import mongoose from "mongoose";
import { IOtp } from "../interface";

const OTPSchema = new mongoose.Schema<IOtp>(
  {
    email: {
      type: String,
    },
    otp: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

export const OTP = mongoose.model("OTP", OTPSchema);
