"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, Minus, Plus, Search, UserRound } from "lucide-react";
import { media } from "@/lib/media";
import type { BookingPrefill } from "./Booking";

type Filter = "all" | "madinah" | "short" | "long" | "owner";

interface Stay {
  id: string;
  name: string;
  /** Must match an option in the booking form's property list. */
  bookingName: string;
  area: string;
  tag: string;
  meta: string;
  image: string;
  city: "madinah";
  short: boolean;
  long: boolean;
  owner: boolean;
}

const STAYS: Stay[] = [
  {
    id: "kec-madinah",
    name: "KEC Madinah",
    bookingName: "KEC Madinah — Lux Residences",
    area: "Madinah · Al Alyaa",
    tag: "Short & long stay",
    meta: "2–4 bedrooms · 101–353 sqm",
    image: media("/images/stay-kec-madinah.jpg"),
    city: "madinah",
    short: true,
    long: true,
    owner: true,
  },
  {
    id: "ayn-al-khaif",
    name: "Ayn Al Khaif",
    bookingName: "Ayn Al Khaif — Lux Residences",
    area: "Madinah · Haram",
    tag: "Rooftop terraces",
    meta: "3 bedrooms · 113–223 sqm",
    image: media("/images/stay-ayn-al-khaif.jpg"),
    city: "madinah",
    short: true,
    long: true,
    owner: true,
  },
  {
    id: "al-qasr",
    name: "Al Qasr",
    bookingName: "Al Qasr — Lux Residences",
    area: "Madinah · Haram",
    tag: "Short to mid-term",
    meta: "2 bedrooms · 77–84 sqm",
    image: media("/images/stay-al-qasr.jpg"),
    city: "madinah",
    short: true,
    long: false,
    owner: true,
  },
  {
    id: "project-12",
    name: "Project 12",
    bookingName: "Project 12 — Lux Residences",
    area: "Madinah · Haram",
    tag: "Fully leased",
    meta: "2–3 bedrooms · 82–263 sqm",
    image: media("/images/stay-project-12.jpg"),
    city: "madinah",
    short: false,
    long: true,
    owner: false,
  },
];

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All properties" },
  { id: "madinah", label: "Madinah" },
  { id: "short", label: "Short stay" },
  { id: "long", label: "Long stay" },
  { id: "owner", label: "Owner Stay Program" },
];

function matches(s: Stay, f: Filter) {
  if (f === "all") return true;
  if (f === "madinah") return s.city === "madinah";
  return s[f];
}

const today = () => new Date().toISOString().slice(0, 10);

export default function StaySearch() {
  const [destination, setDestination] = useState("all");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [applied, setApplied] = useState("all"); // destination applied by the Search button
  const guestsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!guestsOpen) return;
    const close = (e: MouseEvent) => {
      if (!guestsRef.current?.contains(e.target as Node)) setGuestsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [guestsOpen]);

  const results = useMemo(
    () => STAYS.filter((s) => matches(s, filter) && (applied === "all" || s.id === applied)),
    [filter, applied],
  );

  function search() {
    setApplied(destination);
    setFilter("all");
  }

  function book(stay: Stay) {
    const detail: BookingPrefill = {
      property: stay.bookingName,
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      guests: adults + children,
    };
    window.dispatchEvent(new CustomEvent("luxakari:prefill-booking", { detail }));
    document.getElementById("hubspot-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const fieldLabel = "block font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-dustyrose";
  const fieldInput = "mt-1 w-full bg-transparent font-body text-sm text-maroon-ink outline-none";

  return (
    <section id="stay" className="relative scroll-mt-20 bg-maroon py-20 text-cream lg:py-28">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-rosegold">
              Stay With Luxakari
            </span>
            <h2 className="mt-4 font-heading text-4xl font-medium leading-[1.1] text-cream sm:text-5xl lg:text-[3.4rem]">
              Search, discover and <span className="text-rosegold">book your stay.</span>
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm leading-relaxed text-sand lg:text-right">
            Serviced residences with hotel-grade care — housekeeping, concierge and LuxDrive transfers included in
            every stay.
          </p>
        </div>

        {/* Search bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
          className="mt-10 grid grid-cols-1 divide-y divide-maroon/10 bg-cream text-maroon-ink sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_auto]"
        >
          <label className="flex items-center gap-3 px-5 py-4 lg:border-r lg:border-maroon/10">
            <MapPin className="h-4 w-4 shrink-0 text-copper" />
            <span className="min-w-0 flex-1">
              <span className={fieldLabel}>Destination</span>
              <select value={destination} onChange={(e) => setDestination(e.target.value)} className={fieldInput}>
                <option value="all">All Luxakari properties</option>
                {STAYS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <label className="flex items-center gap-3 px-5 py-4 lg:border-r lg:border-maroon/10">
            <CalendarDays className="h-4 w-4 shrink-0 text-copper" />
            <span className="min-w-0 flex-1">
              <span className={fieldLabel}>Check-in</span>
              <input
                type="date"
                min={today()}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  if (checkOut && e.target.value > checkOut) setCheckOut("");
                }}
                className={fieldInput}
              />
            </span>
          </label>
          <label className="flex items-center gap-3 px-5 py-4 lg:border-r lg:border-maroon/10">
            <CalendarDays className="h-4 w-4 shrink-0 text-copper" />
            <span className="min-w-0 flex-1">
              <span className={fieldLabel}>Check-out</span>
              <input
                type="date"
                min={checkIn || today()}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className={fieldInput}
              />
            </span>
          </label>
          <div ref={guestsRef} className="relative flex items-center gap-3 px-5 py-4">
            <UserRound className="h-4 w-4 shrink-0 text-copper" />
            <button
              type="button"
              onClick={() => setGuestsOpen((v) => !v)}
              aria-expanded={guestsOpen}
              className="min-w-0 flex-1 text-left"
            >
              <span className={fieldLabel}>Guests</span>
              <span className="mt-1 block font-body text-sm text-maroon-ink">
                {adults} adult{adults === 1 ? "" : "s"} · {children} child{children === 1 ? "" : "ren"}
              </span>
            </button>
            <AnimatePresence>
              {guestsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute left-0 right-0 top-full z-20 border border-maroon/10 bg-ivory p-4 shadow-xl"
                >
                  {(
                    [
                      ["Adults", adults, setAdults, 1],
                      ["Children", children, setChildren, 0],
                    ] as const
                  ).map(([label, value, set, min]) => (
                    <div key={label} className="flex items-center justify-between py-2">
                      <span className="font-body text-sm text-maroon-ink">{label}</span>
                      <span className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label={`Fewer ${label.toLowerCase()}`}
                          disabled={value <= min}
                          onClick={() => set(value - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-maroon/20 disabled:opacity-30"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-4 text-center font-body text-sm">{value}</span>
                        <button
                          type="button"
                          aria-label={`More ${label.toLowerCase()}`}
                          disabled={value >= 12}
                          onClick={() => set(value + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-maroon/20 disabled:opacity-30"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="p-3 sm:col-span-2 lg:col-span-1">
            <button
              type="submit"
              className="flex h-full min-h-[48px] w-full items-center justify-center gap-2 bg-rosegold px-7 font-display text-[11px] font-bold uppercase tracking-[0.25em] text-maroon transition-colors hover:bg-[#d69a7c]"
            >
              <Search className="h-4 w-4" /> Search
            </button>
          </div>
        </form>

        {/* Filter chips */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFilter(f.id);
                  setApplied("all");
                  setDestination("all");
                }}
                aria-pressed={filter === f.id && applied === "all"}
                className={`border px-4 py-2.5 font-body text-xs transition-colors ${
                  filter === f.id && applied === "all"
                    ? "border-rosegold bg-rosegold text-maroon"
                    : "border-maroon-line text-cream hover:border-rosegold"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="font-body text-xs text-sand">
            {results.length} {results.length === 1 ? "property" : "properties"} · Sort by: Recommended
          </p>
        </div>

        {/* Cards */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {results.map((s) => (
              <motion.article
                layout
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col border border-rosegold/40 bg-maroon-raised/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={`${s.name} residences`} className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 bg-maroon/90 px-2.5 py-1 font-display text-[9px] font-semibold uppercase tracking-[0.2em] text-rosegold">
                    {s.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-sand">
                    {s.area}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-medium text-cream">{s.name}</h3>
                  <p className="mt-1 font-body text-xs text-sand">{s.meta}</p>
                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-maroon-line pt-4">
                    <span>
                      <span className="block font-body text-[11px] text-sand">From</span>
                      <span className="font-body text-sm font-semibold text-cream">Rate on request</span>
                    </span>
                    <button
                      onClick={() => book(s)}
                      className="bg-rosegold px-4 py-2.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-maroon transition-colors hover:bg-[#d69a7c]"
                    >
                      Book now
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
          {results.length === 0 && (
            <p className="col-span-full py-10 text-center font-body text-sm text-sand">
              No properties match this filter.
            </p>
          )}
        </div>

        <p className="mt-6 font-body text-xs text-sand/80">
          Rates, availability and minimum stay vary by property and season. Final pricing is confirmed by our
          reservations team.
        </p>
      </div>
    </section>
  );
}
