import mongoose, { Document, Mongoose } from "mongoose";

interface ICalendar extends Document {
  projectid: mongoose.Schema.Types.ObjectId;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  isOwner: boolean;
  assigned_id?: mongoose.Schema.Types.ObjectId;
}

const CalendarSchema = new mongoose.Schema<ICalendar>(
  {
    projectid: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    allDay: {
      type: Boolean,
      required: false,
      default: false,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    isOwner: {
      type: Boolean,
      required: true,
    },
    assigned_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Calendar = mongoose.model<ICalendar>("Calendar", CalendarSchema);
