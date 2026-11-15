import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { requireAdminApi } from "@/lib/admin";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { BOOKING_STATUSES, type BookingStatus } from "@/types/booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

/** PATCH { status?, notes? } — update a booking and record who changed it. */
export async function PATCH(request: Request, { params }: Ctx) {
  const auth = await requireAdminApi();
  if ("response" in auth) return auth.response;
  if (!isValidObjectId(params.id)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const by = auth.session.user.id;
  const byName = auth.session.user.name ?? undefined;
  const set: Record<string, unknown> = {};
  const history: Record<string, unknown>[] = [];

  if (body.status !== undefined) {
    if (!(BOOKING_STATUSES as readonly string[]).includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    set.status = body.status as BookingStatus;
    history.push({ action: "status", status: body.status, by, byName, at: new Date() });
  }
  if (body.notes !== undefined) {
    set.notes = String(body.notes).slice(0, 5000);
    history.push({ action: "notes", by, byName, at: new Date() });
  }
  if (!history.length) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  await connectToDatabase();
  const updated = await Booking.findByIdAndUpdate(
    params.id,
    { $set: set, $push: { history: { $each: history } } },
    { new: true },
  ).lean();
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

/** DELETE — admins only; removes the booking permanently. */
export async function DELETE(_request: Request, { params }: Ctx) {
  const auth = await requireAdminApi();
  if ("response" in auth) return auth.response;
  if (!isValidObjectId(params.id)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await connectToDatabase();
  const res = await Booking.findByIdAndDelete(params.id);
  if (!res) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
