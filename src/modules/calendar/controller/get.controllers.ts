import { AuthRequest } from "../../../interface/request.interface";
import { Response } from "express";
import { Calendar } from "../model/calendar.model";
export async function getEventByUserId(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (userId) {
      const events = await Calendar.find({
        userId: userId,
      }).populate({
        path: "userId",
        select: {
          name: 1,
          email: 1,
          _id: 1,
        },
      });
      res.sendResponse(events);
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
}
