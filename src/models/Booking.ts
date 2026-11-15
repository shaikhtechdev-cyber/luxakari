import { Schema, models, model, type Model } from "mongoose";
import { BOOKING_STATUSES, type IBooking } from "@/types/booking";

const historySchema = new Schema(
  {
    action: { type: String, enum: ["created", "status", "notes"], required: true },
    status: { type: String, enum: BOOKING_STATUSES },
    by: { type: String, required: true },
    byName: String,
    at: { type: Date, default: Date.now },
  },
  { _id: false },
);

const bookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    phone: { type: String, required: true, trim: true },
    property: { type: String, required: true, trim: true, index: true },
    guests: { type: Number, required: true, min: 1 },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    message: { type: String, default: "" },
    status: { type: String, enum: BOOKING_STATUSES, default: "new", index: true },
    userid: { type: String, index: true },
    notes: { type: String, default: "" },
    history: { type: [historySchema], default: [] },
  },
  // Lives in the shared Amanavest database, so the collection name is
  // prefixed to keep it apart from other apps' "bookings"/"reservations".
  { timestamps: true, collection: "luxakari_bookings" },
);

bookingSchema.index({ createdAt: -1 });

export const Booking: Model<IBooking> = models.Booking || model<IBooking>("Booking", bookingSchema);
