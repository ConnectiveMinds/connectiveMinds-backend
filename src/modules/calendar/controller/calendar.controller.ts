import express, { Request, Response } from "express";
import { Calendar } from "../model/calendar.model";
import { ICalendar } from "../interface";

export const getEvents = async (req: Request, res: Response) => {
  const events = await Calendar.find({
    assigned_id: { $in: req.params.id },
  });
  try {
    if (events) {
      res.status(200).json(events);
    } else {
      res.status(404).json({ message: "No Evnets found" });
    }
  } catch (err) {
    res.send;
    {
      message: "No Event Found";
    }
  }
};

export const CreateEvent = async (req: Request, res: Response) => {
  try {
    const { title, userId, allDay, start, end, isOwner, assigned_id } =
      req.body;
    console.log("Hello");
    const calendar = new Calendar({
      title: title,
      userId: userId,
      allDay: allDay,
      start: start,
      end: end,
      isOwner: isOwner,
      assigned_id: assigned_id,
    });
    await calendar.save();

    res.sendResponse(calendar);
  } catch (e) {
    res.sendError(500, e, "Internal Server Error");
  }
};

export const DeleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Calendar.findById(req.params.id);
    if (!event) {
      return res.status(500).json({ msg: "No such post" });
    } else {
      await Calendar.findByIdAndDelete(req.params.id);
      return res.status(200).json({ msg: "Post is successfully deleted" });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err); // Log the error for debugging (optional)
      return res.status(500).json({ error: (err as Error).message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
