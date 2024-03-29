import express, { Request, Response } from "express";
import {
  getEvents,
  CreateEvent,
  DeleteEvent,
} from "../controller/calendar.controller";

const calendarroute = express.Router();
calendarroute.get("/:projectId", getEvents);
calendarroute.post("/create/:projectId", CreateEvent);
calendarroute.delete("/:id", DeleteEvent);

export { calendarroute };
