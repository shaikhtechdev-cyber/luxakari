import type { FilterQuery } from "mongoose";
import { BOOKING_STATUSES, type IBooking } from "@/types/booking";

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Mongo filter from admin query params (?q=&status=&property=), shared by list and CSV export. */
export function buildBookingFilter(params: URLSearchParams): FilterQuery<IBooking> {
  const filter: FilterQuery<IBooking> = {};
  const status = params.get("status");
  if (status && (BOOKING_STATUSES as readonly string[]).includes(status)) filter.status = status;
  const property = params.get("property");
  if (property) filter.property = property;
  const q = params.get("q")?.trim();
  if (q) {
    const rx = new RegExp(escapeRegex(q.slice(0, 100)), "i");
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }, { message: rx }];
  }
  return filter;
}
