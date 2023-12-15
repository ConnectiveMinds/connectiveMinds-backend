import { AuthRequest } from "../../../interface/request.interface";
import { Response } from "express";
import { Calendar } from "../model/calendar.model";
export async function getEventByUserId(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    if (userId) {
      const events = await Calendar.find({
        assigned_id: { $in: [userId] },
      })
        .populate({
          path: "assigned_id",
          select: {
            name: 1,
            email: 1,
            _id: 1,
          },
        })
        .populate({
          path: "projectid",
          select: {
            title: 1,
          },
        });
      res.sendResponse(events);
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
}
