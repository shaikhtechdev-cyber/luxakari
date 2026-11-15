import type { BookingStatus } from "@/types/booking";

export const STATUS_LABEL: Record<BookingStatus, string> = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

// Brand colours only (§03): Rose Gold for attention, Deep Maroon for done.
const STYLE: Record<BookingStatus, string> = {
  new: "bg-rosegold text-maroon",
  contacted: "bg-sand text-maroon-ink",
  confirmed: "bg-maroon text-cream",
  cancelled: "border border-taupe/50 text-taupe",
};

export default function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.2em] ${STYLE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
