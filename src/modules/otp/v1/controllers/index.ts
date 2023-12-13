import { Request, Response } from "express";
import { checkOTP, createOTP } from "../services";
import { User } from "../../../user/v1";
export const resendOTP = async (req: Request, res: Response) => {
  try {
    await createOTP({ email: req.body.email });
    return res.sendResponse({ msg: "Sent Response" });
  } catch (e) {
    return res.sendError(500, e, "Internal Server Error");
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    let otpvalid = await checkOTP({ email: req.body.email, otp: req.body.otp });
    if (!otpvalid) {
      res.sendError(403, "Invalid Otp", "Invalid or Expired OTP");
    } else {
      return res.sendResponse({ msg: "OTP Verified" });
    }
  } catch (e) {
    return res.sendError(500, e, "Internal Server Error");
  }
};
