"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, MessageCircle, Phone, Trash2, X } from "lucide-react";
import type { BookingDTO, BookingStatus } from "@/types/booking";
import { BOOKING_STATUSES } from "@/types/booking";
import StatusBadge, { STATUS_LABEL } from "./StatusBadge";
import { formatDate } from "./format";

interface Props {
  booking: BookingDTO;
  onClose: () => void;
  onUpdated: (b: BookingDTO) => void;
  onDeleted: () => void;
}

export default function BookingDrawer({ booking, onClose, onUpdated, onDeleted }: Props) {
  const [notes, setNotes] = useState(booking.notes ?? "");
  const [busy, setBusy] = useState<"" | "status" | "notes" | "delete">("");
  const [error, setError] = useState("");

  useEffect(() => setNotes(booking.notes ?? ""), [booking._id, booking.notes]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function patch(body: Partial<Pick<BookingDTO, "status" | "notes">>, kind: "status" | "notes") {
    setBusy(kind);
    setError("");
    try {
      const res = await fetch(`/api/admin/bookings/${booking._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      onUpdated(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusy("");
    }
  }

  async function remove() {
    if (!window.confirm(`Delete the booking from ${booking.name}? This cannot be undone.`)) return;
    setBusy("delete");
    setError("");
    try {
      const res = await fetch(`/api/admin/bookings/${booking._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Delete failed");
      onDeleted();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
      setBusy("");
    }
  }

  const wa = booking.phone.replace(/[^\d]/g, "");
  const notesDirty = notes !== (booking.notes ?? "");

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={`Booking from ${booking.name}`}>
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-maroon/60" />
      <aside className="relative flex h-full w-full max-w-lg flex-col overflow-y-auto bg-cream shadow-2xl">
        <div className="bg-maroon px-6 py-5 text-cream">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-rosegold">Booking</span>
              <h2 className="mt-1 font-heading text-2xl text-cream">{booking.name}</h2>
              <p className="mt-1 text-xs text-sand">Received {formatDate(booking.createdAt)}</p>
            </div>
            <button onClick={onClose} aria-label="Close" className="rounded-full p-2 text-sand hover:text-rosegold">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={`mailto:${booking.email}`} className="flex items-center gap-1.5 rounded-full border border-maroon-line px-3 py-1.5 text-xs text-cream hover:border-rosegold">
              <Mail className="h-3.5 w-3.5" /> Email
            </a>
            <a href={`tel:${booking.phone}`} className="flex items-center gap-1.5 rounded-full border border-maroon-line px-3 py-1.5 text-xs text-cream hover:border-rosegold">
              <Phone className="h-3.5 w-3.5" /> Call
            </a>
            {wa.length >= 8 && (
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-maroon-line px-3 py-1.5 text-xs text-cream hover:border-rosegold"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-8 px-6 py-6">
          {error && (
            <p role="alert" className="border border-dustyrose/30 bg-ivory px-4 py-3 text-sm text-maroon-ink">
              {error}
            </p>
          )}

          <section>
            <h3 className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-dustyrose">Status</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {BOOKING_STATUSES.map((s) => (
                <button
                  key={s}
                  disabled={busy !== "" || booking.status === s}
                  onClick={() => patch({ status: s as BookingStatus }, "status")}
                  className={`rounded-full px-4 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors disabled:cursor-default ${
                    booking.status === s
                      ? "bg-maroon text-cream"
                      : "border border-maroon/20 text-maroon-ink hover:border-maroon disabled:opacity-50"
                  }`}
                >
                  {STATUS_LABEL[s as BookingStatus]}
                </button>
              ))}
              {busy === "status" && <Loader2 className="h-4 w-4 animate-spin self-center text-taupe" />}
            </div>
          </section>

          <dl className="divide-y divide-maroon/10 border-y border-maroon/10 text-sm">
            {[
              ["Email", booking.email],
              ["Phone", booking.phone],
              ["Property", booking.property],
              ["Check-in", booking.checkIn],
              ["Check-out", booking.checkOut],
              ["Guests", String(booking.guests)],
              ["Account", booking.userid ? `Amanavest user ${booking.userid}` : "Guest (not signed in)"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-3 py-3">
                <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-dustyrose">{k}</dt>
                <dd className="break-words text-warmbrown">{v}</dd>
              </div>
            ))}
          </dl>

          <section>
            <h3 className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-dustyrose">Message</h3>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-warmbrown">
              {booking.message || <span className="text-taupe">No message.</span>}
            </p>
          </section>

          <section>
            <label htmlFor="notes" className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-dustyrose">
              Internal notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Visible to admins only"
              className="input-field mt-3 !rounded-none"
            />
            <button
              disabled={!notesDirty || busy !== ""}
              onClick={() => patch({ notes }, "notes")}
              className="btn-dark mt-3 !px-5 !py-2.5 disabled:opacity-40"
            >
              {busy === "notes" && <Loader2 className="h-4 w-4 animate-spin" />} Save notes
            </button>
          </section>

          {booking.history?.length > 0 && (
            <section>
              <h3 className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-dustyrose">History</h3>
              <ol className="mt-3 space-y-2 text-xs text-taupe">
                {[...booking.history].reverse().map((h, i) => (
                  <li key={i} className="flex flex-wrap items-center gap-2">
                    <span className="whitespace-nowrap">{formatDate(h.at)}</span>
                    <span>·</span>
                    {h.action === "created" && <span>Received from {h.byName || "website"}</span>}
                    {h.action === "status" && h.status && (
                      <>
                        <StatusBadge status={h.status} /> <span>by {h.byName || h.by}</span>
                      </>
                    )}
                    {h.action === "notes" && <span>Notes updated by {h.byName || h.by}</span>}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <div className="border-t border-maroon/10 px-6 py-4">
          <button
            onClick={remove}
            disabled={busy !== ""}
            className="flex items-center gap-2 text-sm text-dustyrose hover:text-maroon disabled:opacity-40"
          >
            {busy === "delete" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Delete booking
          </button>
        </div>
      </aside>
    </div>
  );
}
