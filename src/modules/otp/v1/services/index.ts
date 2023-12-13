import { otpExpiryTime } from "../../../../config/otp.config";
import { sendOTPMail } from "../../../../handler/nodeMailer.handler";
import { OTP } from "../models/otp.model";

export function generateOTP(): number {
  var minm = 1000;
  var maxm = 9999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

export const createOTP = ({ email }: { email: string }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userExists = await OTP.findOne({ email });
      let otp: number;
      otp = generateOTP();
      if (userExists) {
        await OTP.findOneAndUpdate({ email: email }, { otp: otp });
      } else {
        await OTP.create({ email, otp: otp });
      }
      sendOTPMail({ to: email, otp: otp });
      return resolve(otp);
    } catch (err) {
      reject(err);
    }
  });
};

export const checkOTP = ({ email, otp }: { email: string; otp: number }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fOtp = await OTP.findOne({ email });

      if (
        fOtp?.otp === otp &&
        new Date().getTime() - fOtp?.updatedAt.getTime()! < otpExpiryTime
      ) {
        return resolve(true);
      }
      return resolve(false);
    } catch (err) {
      reject(err);
    }
  });
};
