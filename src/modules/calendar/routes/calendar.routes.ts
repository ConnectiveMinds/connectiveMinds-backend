import express,{Request,Response} from "express";
import { getEvents,CreateEvent, DeleteEvent } from "../controller/calendar.controller";

const claendarroute = express.Router();
claendarroute.get("/:id",getEvents)
claendarroute.post("/create",CreateEvent)
claendarroute.delete("/:id",DeleteEvent)


export
{
    claendarroute
}