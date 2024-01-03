import express, { Request, Response } from "express";
import { Calendar } from "../model/calendar.model";
import { ICalendar, IGet } from "../interface";
import { AuthRequest } from "../../../interface/request.interface";
import { Idea } from "../../ideas/v1/model/ideas.model";
import { Iget } from "../../files/model/files";

export const getEvents = async (req: AuthRequest<{}, {}, Iget>, res: Response) => {
  const events = await Calendar.find({projectid: req.params?.projectId});
  try {
    if (events) {
      res.status(200).json(events);
    } else {
      res.status(404).json({ message: "No Evnets found" });
    }
  } catch (err) {
    res.send;
    {
      message: "No Event Found";`      `
    }
  }
};

export const CreateEvent = async (
  req: AuthRequest<ICalendar, IGet, IGet>,
  res: Response
) => {
  try {
    const projectid = req.params?.projectId;
    const idea = await Idea.find({
      _id: projectid,
    });
    if (idea) {
      const { title, allDay, start, end, isOwner, assigned_id } =
        req.body || {};
      const calendar = await Calendar.create({
        projectid: projectid,
        title: title,
        start: start,
        end: end,
        isOwner: isOwner,
        assigned_id: assigned_id,
      });
      console.log(calendar);
      res.sendResponse(calendar);
    } else {
      res.sendError(400, "Invalid ", "No Project Found");
    }
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
