import type { NextRequest } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { buildBookingFilter } from "@/lib/booking-filter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cell(v: unknown): string {
  let s = v == null ? "" : String(v);
  // Neutralise spreadsheet formula injection from public form input.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

/** GET /api/admin/bookings/export — CSV of bookings matching the current filters. */
export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if ("response" in auth) return auth.response;

  await connectToDatabase();
  const rows = await Booking.find(buildBookingFilter(request.nextUrl.searchParams)).sort({ createdAt: -1 }).limit(10000).lean();

  const header = ["Received", "Status", "Name", "Email", "Phone", "Property", "Guests", "Check-in", "Check-out", "Message", "Notes", "Amanavest user"];
  const lines = rows.map((b) =>
    [
      new Date(b.createdAt).toISOString(),
      b.status,
      b.name,
      b.email,
      b.phone,
      b.property,
      b.guests,
      b.checkIn,
      b.checkOut,
      b.message,
      b.notes,
      b.userid ?? "",
    ]
      .map(cell)
      .join(","),
  );
  const csv = "﻿" + [header.map(cell).join(","), ...lines].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="luxakari-bookings-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
