import { Router } from "express";
import { checkOTP, createOTP } from "../services/index";
import { resendOTP, verifyOTP } from "../controllers";

export const crudOtp = Router();

crudOtp.post("/send", resendOTP, createOTP);
crudOtp.post("/verify", verifyOTP, checkOTP);
