import mongoose, { Document, Schema } from "mongoose";

// Base interface for calendar data
export interface ICalendarBase extends Document {
  userId: string;
  user: string;
  months: {
    [key: string]: {
      selectedDays?: number[];
      target?: number;
      achieved?: number;
      countOfDates?: number;
    };
  };
  lastUpdated: Date;
}

const calendarSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  user: {
    type: String,
    required: true
  },
  months: {
    type: Map,
    of: new Schema({
      selectedDays: [Number],
      target: { type: Number, default: 0 },
      achieved: { type: Number, default: 0 },
      countOfDates: { type: Number, default: 0 }
    }),
    default: {}
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for userId and user
calendarSchema.index({ userId: 1, user: 1 }, { unique: true });

// Use mongoose.models.Calendar || mongoose.model to prevent model recompilation error
const Calendar = mongoose.models.Calendar || mongoose.model<ICalendarBase>("Calendar", calendarSchema);

export default Calendar;