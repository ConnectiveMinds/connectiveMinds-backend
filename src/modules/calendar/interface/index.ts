import mongoose from "mongoose";
export interface ICalendar extends Document {
    userid: mongoose.Types.ObjectId;
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
    isOwner:Boolean,
    assigned_id:[mongoose.Types.ObjectId]
  }