import dotenv from "dotenv";

dotenv.config();

export const otpExpiryTime = parseInt(process.env.OTP_EXPIRY_TIME!);
