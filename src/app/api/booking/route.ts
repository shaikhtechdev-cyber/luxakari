import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Health probe: /api/booking?probe=1. Bookings are listed via /api/admin/bookings. */
export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get("probe") !== "1") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const conn = await connectToDatabase();
    return NextResponse.json({ ok: conn.connection.readyState === 1 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

/** Public booking form submission. */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email and phone are required." }, { status: 400 });
    }
    if (!EMAIL.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Link the booking to the Amanavest account when the guest is signed in.
    const session = await getServerSession(authOptions);
    const userid = session?.user?.id;

    await connectToDatabase();
    const booking = await Booking.create({
      name: name.slice(0, 120),
      email: email.slice(0, 160),
      phone: phone.slice(0, 40),
      property: String(body.property || "General Enquiry").slice(0, 160),
      guests: Math.min(Math.max(Number(body.guests) || 1, 1), 50),
      checkIn: body.checkIn ? String(body.checkIn).slice(0, 20) : "—",
      checkOut: body.checkOut ? String(body.checkOut).slice(0, 20) : "—",
      message: body.message ? String(body.message).slice(0, 2000) : "",
      userid,
      history: [{ action: "created", status: "new", by: userid ?? "public form", byName: session?.user?.name ?? name, at: new Date() }],
    });

    return NextResponse.json({ success: true, id: String(booking._id) }, { status: 201 });
  } catch (err: unknown) {
    console.error("[booking] create failed", err);
    return NextResponse.json({ error: "Could not save your request. Please try again." }, { status: 500 });
  }
}
