import { AuthRequest } from "../../../interface/request.interface";
import { Response } from "express";
import { Calendar } from "../model/calendar.model";
import { ICalendar } from "../interface";
export async function getEventByUserId(req: AuthRequest, res: Response) {
  try {
    const date = Date.now();
    const userId = req.user?.userId;
    if (userId) {
      const events = await Calendar.find({
        assigned_id: { $in: [userId] },
      })
        .populate({
          path: "projectid",
          select: {
            _id: 1,
            title: 1,
          },
        })
        .sort({ start: -1 })
        .limit(6);

      res.sendResponse(events);
    }
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
}
