import mongoose from "mongoose";
import { ICalendar } from "../interface";
const CalendarSchema = new mongoose.Schema<ICalendar>
(
    {
        userid:
        {
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        },
       
        title:
        {
            type:String,
            required:true
        },
        allDay:
        {
            type:Boolean,
            required:false,
            default:false
        },
        start:
        {
            type:Date,
            required:true
        },
        end:
        {
            type:Date,
            required:true
        }
            
    },
    {
        timestamps:true,
    }
);

export const Calendar = mongoose.model<ICalendar>('Calendar',CalendarSchema);