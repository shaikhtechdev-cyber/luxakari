"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Loader2, RefreshCw, Search } from "lucide-react";
import type { BookingDTO, BookingStatus } from "@/types/booking";
import { BOOKING_STATUSES } from "@/types/booking";
import BookingDrawer from "./BookingDrawer";
import StatusBadge, { STATUS_LABEL } from "./StatusBadge";
import { formatDate } from "./format";

interface ListResponse {
  items: BookingDTO[];
  total: number;
  page: number;
  pageSize: number;
  stats: Record<BookingStatus | "all" | "lastWeek", number>;
  properties: string[];
}

export default function BookingsDashboard() {
  const [q, setQ] = useState("");
  const [query, setQuery] = useState(""); // debounced
  const [status, setStatus] = useState<BookingStatus | "">("");
  const [property, setProperty] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<BookingDTO | null>(null);
  const reqId = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setQuery(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => setPage(1), [query, status, property]);

  const params = useCallback(() => {
    const p = new URLSearchParams();
    if (query) p.set("q", query);
    if (status) p.set("status", status);
    if (property) p.set("property", property);
    return p;
  }, [query, status, property]);

  const load = useCallback(async () => {
    const id = ++reqId.current;
    setLoading(true);
    setError("");
    try {
      const p = params();
      p.set("page", String(page));
      const res = await fetch(`/api/admin/bookings?${p}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not load bookings");
      if (id === reqId.current) setData(json);
    } catch (e) {
      if (id === reqId.current) setError(e instanceof Error ? e.message : "Could not load bookings");
    } finally {
      if (id === reqId.current) setLoading(false);
    }
  }, [params, page]);

  useEffect(() => {
    void load();
  }, [load]);

  function onUpdated(b: BookingDTO) {
    setSelected(b);
    void load();
  }

  function onDeleted() {
    setSelected(null);
    void load();
  }

  const stats = data?.stats;
  const pages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  const STAT_CARDS: { key: BookingStatus | ""; label: string; value?: number }[] = [
    { key: "", label: "All bookings", value: stats?.all },
    ...BOOKING_STATUSES.map((s) => ({ key: s, label: STATUS_LABEL[s], value: stats?.[s] })),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="section-label">Reservations</span>
          <h1 className="font-heading text-3xl text-maroon-ink sm:text-4xl">Bookings</h1>
          <div className="divider-gold mt-5 w-20" />
        </div>
        <p className="text-sm text-taupe">
          {stats ? (
            <>
              <span className="font-semibold text-warmbrown">{stats.lastWeek}</span> received in the last 7 days
            </>
          ) : (
            " "
          )}
        </p>
      </div>

      {/* Stat cards double as status filters */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {STAT_CARDS.map((c) => {
          const active = status === c.key;
          return (
            <button
              key={c.label}
              onClick={() => setStatus(c.key)}
              aria-pressed={active}
              className={`border-t-[3px] p-4 text-left transition-colors ${
                active ? "border-t-copper bg-maroon text-cream" : "border-t-rosegold bg-ivory text-maroon-ink hover:bg-white"
              }`}
            >
              <span className={`block font-display text-[10px] font-semibold uppercase tracking-[0.25em] ${active ? "text-rosegold" : "text-dustyrose"}`}>
                {c.label}
              </span>
              <span className={`mt-2 block font-heading text-3xl ${active ? "text-cream" : "text-copper"}`}>
                {c.value ?? "–"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search bookings</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, phone or message"
            className="input-field !rounded-none !pl-11"
          />
        </label>
        <select
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          aria-label="Filter by property"
          className="input-field !rounded-none md:!w-72"
        >
          <option value="">All properties</option>
          {data?.properties.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <div className="flex gap-3">
          <button onClick={() => void load()} className="btn-outline !px-4 !py-3" aria-label="Refresh">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <a href={`/api/admin/bookings/export?${params()}`} className="btn-dark !px-5 !py-3">
            <Download className="h-4 w-4" /> CSV
          </a>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-6 border border-dustyrose/30 bg-ivory px-4 py-3 text-sm text-maroon-ink">
          {error}
        </p>
      )}

      {/* List */}
      <div className="mt-6 border-t-[3px] border-t-rosegold bg-ivory">
        {!data && loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-taupe">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading bookings
          </div>
        ) : data && data.items.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <p className="font-heading text-xl text-maroon-ink">No bookings {query || status || property ? "match these filters" : "yet"}</p>
            <p className="mt-2 text-sm text-taupe">
              {query || status || property ? "Try clearing the search or filters." : "Requests sent from the booking form on the website appear here."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <table className="hidden w-full text-left text-sm lg:table">
              <thead>
                <tr className="border-b border-maroon/10 font-display text-[10px] uppercase tracking-[0.25em] text-dustyrose">
                  <th className="px-5 py-4 font-semibold">Received</th>
                  <th className="px-5 py-4 font-semibold">Guest</th>
                  <th className="px-5 py-4 font-semibold">Property</th>
                  <th className="px-5 py-4 font-semibold">Stay</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.items.map((b) => (
                  <tr
                    key={b._id}
                    onClick={() => setSelected(b)}
                    className="cursor-pointer border-b border-maroon/10 text-warmbrown transition-colors last:border-0 hover:bg-white"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-taupe">{formatDate(b.createdAt)}</td>
                    <td className="px-5 py-4">
                      <button className="text-left" onClick={() => setSelected(b)}>
                        <span className="block font-semibold text-maroon-ink">{b.name}</span>
                        <span className="block text-xs text-taupe">
                          {b.email} · {b.phone}
                        </span>
                      </button>
                    </td>
                    <td className="px-5 py-4">{b.property}</td>
                    <td className="whitespace-nowrap px-5 py-4">
                      {stayLabel(b)}
                      <span className="block text-xs text-taupe">
                        {b.guests} guest{b.guests === 1 ? "" : "s"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile cards */}
            <ul className="divide-y divide-maroon/10 lg:hidden">
              {data?.items.map((b) => (
                <li key={b._id}>
                  <button onClick={() => setSelected(b)} className="w-full px-4 py-4 text-left hover:bg-white">
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-semibold text-maroon-ink">{b.name}</span>
                      <StatusBadge status={b.status} />
                    </span>
                    <span className="mt-1 block text-sm text-warmbrown">{b.property}</span>
                    <span className="mt-1 block text-xs text-taupe">
                      {stayLabel(b)} · {b.guests} guest{b.guests === 1 ? "" : "s"} · received {formatDate(b.createdAt)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Pagination */}
      {data && data.total > data.pageSize && (
        <div className="mt-5 flex items-center justify-between text-sm text-taupe">
          <span>
            {(data.page - 1) * data.pageSize + 1}–{Math.min(data.page * data.pageSize, data.total)} of {data.total}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="btn-outline !px-3 !py-2 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
              className="btn-outline !px-3 !py-2 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {selected && (
        <BookingDrawer booking={selected} onClose={() => setSelected(null)} onUpdated={onUpdated} onDeleted={onDeleted} />
      )}
    </div>
  );
}

function stayLabel(b: BookingDTO) {
  const fmt = (d: string) => {
    if (!d || d === "—") return "—";
    const t = new Date(d);
    return isNaN(t.getTime()) ? d : t.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };
  return b.checkIn === "—" && b.checkOut === "—" ? "Dates not set" : `${fmt(b.checkIn)} → ${fmt(b.checkOut)}`;
}
