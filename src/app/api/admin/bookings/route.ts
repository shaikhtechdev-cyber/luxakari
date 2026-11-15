import { NextResponse, type NextRequest } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { buildBookingFilter } from "@/lib/booking-filter";
import { connectToDatabase } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";
import { BOOKING_STATUSES } from "@/types/booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

/** GET /api/admin/bookings?q=&status=&property=&page= */
export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if ("response" in auth) return auth.response;

  const params = request.nextUrl.searchParams;
  const page = Math.max(1, Number(params.get("page")) || 1);
  const filter = buildBookingFilter(params);

  await connectToDatabase();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [items, total, byStatus, lastWeek, properties] = await Promise.all([
    Booking.find(filter).sort({ createdAt: -1 }).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).lean(),
    Booking.countDocuments(filter),
    Booking.aggregate<{ _id: string; n: number }>([{ $group: { _id: "$status", n: { $sum: 1 } } }]),
    Booking.countDocuments({ createdAt: { $gte: weekAgo } }),
    Booking.distinct("property"),
  ]);

  const counts = Object.fromEntries(BOOKING_STATUSES.map((s) => [s, 0])) as Record<string, number>;
  for (const row of byStatus) if (row._id in counts) counts[row._id] = row.n;

  return NextResponse.json({
    items,
    total,
    page,
    pageSize: PAGE_SIZE,
    stats: { ...counts, all: Object.values(counts).reduce((a, b) => a + b, 0), lastWeek },
    properties: (properties as string[]).sort(),
  });
}
