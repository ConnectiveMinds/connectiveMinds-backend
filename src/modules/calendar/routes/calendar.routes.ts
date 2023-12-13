import express, { Request, Response } from "express";
import {
  getEvents,
  CreateEvent,
  DeleteEvent,
} from "../controller/calendar.controller";

const calendarroute = express.Router();
calendarroute.get("/:id", getEvents);
calendarroute.post("/create", CreateEvent);
calendarroute.delete("/:id", DeleteEvent);

export { calendarroute };
