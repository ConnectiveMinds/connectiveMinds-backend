import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    console.log(token);

    if (token == null)
      return res.status(401).json({ message: "Token not found" });

    const user = jwt.verify(token as string, process.env.JWT_TOKEN as string);
    console.log(user);

    next();
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
