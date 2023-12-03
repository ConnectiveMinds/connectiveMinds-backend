import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, IPayload } from "../interface/request.interface";

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      req.url?.includes("auth") ||
      req.url?.includes("user") ||
      req.url?.includes("otp")
    ) {
      return next();
    }
    const authHeader = req?.headers?.authorization;
    const token = authHeader?.split(" ")[1];

    if (token == null)
      return res.status(401).json({ message: "Token not found" });

    const user = jwt.verify(token as string, process.env.JWT_TOKEN as string);

    req.user = user as IPayload;
    next();
  } catch (err) {
    res.send(err);
  }
};
