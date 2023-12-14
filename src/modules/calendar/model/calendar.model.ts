import mongoose, { Document } from "mongoose";

interface ICalendar extends Document {
  userid: mongoose.Schema.Types.ObjectId;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  isOwner: boolean;
  assigned_id?: mongoose.Schema.Types.ObjectId[];
}

const CalendarSchema = new mongoose.Schema<ICalendar>(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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