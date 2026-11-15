import type { Document, Model } from "mongoose";

export const BOOKING_STATUSES = ["new", "contacted", "confirmed", "cancelled"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export interface IBookingHistory {
  action: "created" | "status" | "notes";
  status?: BookingStatus;
  by: string; // Amanavest userid, or "guest" / "public form"
  byName?: string;
  at: Date;
}

export interface IBooking extends Document {
  name: string;
  email: string;
  phone: string;
  property: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  message: string;
  status: BookingStatus;
  /** Amanavest userid when the guest was signed in while booking. */
  userid?: string;
  /** Internal notes, visible to admins only. */
  notes: string;
  history: IBookingHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export type BookingModel = Model<IBooking>;

/** Booking as returned by the admin API (JSON-serialised). */
export interface BookingDTO {
  _id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  message: string;
  status: BookingStatus;
  userid?: string;
  notes: string;
  history: { action: string; status?: BookingStatus; by: string; byName?: string; at: string }[];
  createdAt: string;
  updatedAt: string;
}
