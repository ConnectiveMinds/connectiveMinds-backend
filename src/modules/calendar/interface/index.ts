import mongoose from "mongoose";
export interface ICalendar extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  isOwner: boolean;
  assigned_id?: mongoose.Schema.Types.ObjectId[];
}

export interface IGet {
  projectId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}
