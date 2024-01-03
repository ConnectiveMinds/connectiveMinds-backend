import { AuthRequest } from "../../../../interface/request.interface";
import { User } from "../model/user.model";
import { Response } from "express";
export const getuser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById({ _id: req.user?.userId });
    if (user) {
      res.sendResponse(user);
    } else {
      res.sendError(400, "Invalid Credentials", "User doesn't exist");
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};
