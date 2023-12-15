import mongoose, { Document } from "mongoose";
import { ICalendar } from "../interface";

const CalendarSchema = new mongoose.Schema<ICalendar>(
  {
    userId: {
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
