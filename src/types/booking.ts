import type { Document, Model } from "mongoose";

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  property: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  message: string;
  status: "new" | "contacted" | "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export type BookingModel = Model<IBooking>;
