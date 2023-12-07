import express, { Request, Response } from "express";
import { Calendar } from "../model/calendar.model";
import { ICalendar } from "../interface";

export const getEvents = async (req:Request,res:Response)=>
{
    const events = await Calendar.find({userid:req.params.id})
    try{
    if(events)
    {
        res.status(200).json(events);

    }
    else
    {
        res.status(404).json({ message: 'No Evnets found' });
    }
    }
    catch(err)
    {
        res.send
        {
            
            message:"No Event Found"
        }
    }
};


export const CreateEvent = async (req:Request,res:Response)=>
{
    const {title,userid,allDay,start,end} = req.body;
    const calendar = new Calendar(
        {
            title:title,
            userid:userid,
            allDay:allDay,
            start:start,
            end:end,

        }
    );
    try{
        console.log("event adding")
        await calendar.save();
        res.json(calendar);
    }
    catch(err)
    {
        console.log(err);
    }

}

export const DeleteEvent = async (req:Request,res:Response,)=>
{
    try{
        const event = await Calendar.findById(req.params.id);
        if(!event)
        {
            return res.status(500).json({ msg: "No such post" })
        } 
        else
        {
            await Calendar.findByIdAndDelete(req.params.id)
            return res.status(200).json({ msg: "Post is successfully deleted" })
        }
    }
    catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err); // Log the error for debugging (optional)
          return res.status(500).json({ error: (err as Error).message });
        } else {
          return res.status(500).json({ error: "An unknown error occurred" });
        }
      }
}
