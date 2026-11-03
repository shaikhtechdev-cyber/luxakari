import { Schema, models, model, type Model } from "mongoose";
import type { IBooking } from "@/types/booking";

const bookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    property: { type: String, required: true, trim: true },
    guests: { type: Number, required: true, min: 1 },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "confirmed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true, collection: "web_bookings" },
);

export const Booking: Model<IBooking> =
  models.Booking || model<IBooking>("Booking", bookingSchema);
