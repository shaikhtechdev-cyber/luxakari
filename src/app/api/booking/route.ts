import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Health-check style probe: /api/booking?probe=1
  if (searchParams.get("probe") === "1") {
    try {
      const { connectToDatabase } = await import("@/lib/mongodb");
      const conn = await connectToDatabase();
      return NextResponse.json({
        ok: true,
        database: conn.connection.db?.databaseName ?? null,
        state: conn.connection.readyState,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
  }

  // Guarded listing for the admin dashboard
  const token = request.headers.get("x-admin-token");
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { connectToDatabase } = await import("@/lib/mongodb");
    await connectToDatabase();
    const { Booking } = await import("@/models/Booking");
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(bookings);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: "Name, email and phone are required." },
        { status: 400 },
      );
    }

    const { connectToDatabase } = await import("@/lib/mongodb");
    await connectToDatabase();
    const { Booking } = await import("@/models/Booking");

    const booking = await Booking.create({
      name: String(body.name).slice(0, 120),
      email: String(body.email).slice(0, 160),
      phone: String(body.phone).slice(0, 40),
      property: String(body.property ?? "General enquiry").slice(0, 160),
      guests: Number(body.guests) || 1,
      checkIn: body.checkIn ? String(body.checkIn) : "—",
      checkOut: body.checkOut ? String(body.checkOut) : "—",
      message: body.message ? String(body.message).slice(0, 2000) : "",
    });

    return NextResponse.json({ success: true, id: String(booking._id) }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
