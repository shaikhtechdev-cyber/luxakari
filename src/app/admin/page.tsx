"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogIn, RefreshCw, ShieldCheck } from "lucide-react";

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [savedToken, setSavedToken] = useState("");
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = sessionStorage.getItem("luxa_admin_token");
    if (t) {
      setSavedToken(t);
      void load(t);
    }
  }, []);

  async function load(t: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/booking", { headers: { "x-admin-token": t } });
      if (!res.ok) throw new Error(res.status === 401 ? "Unauthorized" : "Request failed");
      setBookings(await res.json());
      sessionStorage.setItem("luxa_admin_token", t);
    } catch (err: unknown) {
      setBookings(null);
      sessionStorage.removeItem("luxa_admin_token");
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  if (!savedToken) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSavedToken(token);
            void load(token);
          }}
          className="glass-card w-full max-w-sm rounded-[2rem] p-9"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne/10 text-champagne">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <h1 className="mt-5 font-display text-xl font-bold uppercase tracking-[0.1em] text-cream">
            Admin Access
          </h1>
          <p className="mt-2 font-body text-sm text-cream/60">
            Enter the admin token defined in <code className="text-champagne">ADMIN_TOKEN</code>.
          </p>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="input-field mt-6"
            placeholder="Admin token"
          />
          {error && <p className="mt-3 font-body text-sm text-red-300">{error}</p>}
          <button type="submit" className="btn-cream btn-shine mt-5 w-full">
            <LogIn className="h-4 w-4" />
            Sign In
          </button>
        </motion.form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-28 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="section-label font-display">Dashboard</span>
          <h1 className="font-display text-2xl font-bold uppercase text-cream sm:text-3xl">
            Booking Requests
          </h1>
        </div>
        <div className="flex gap-3">
          <button onClick={() => load(savedToken)} className="btn-outline">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("luxa_admin_token");
              setSavedToken("");
              setBookings(null);
            }}
            className="btn-outline"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="divider-gold my-8" />

      {loading && !bookings && <p className="font-body text-cream/60">Loading…</p>}
      {error && <p className="font-body text-red-300">{error}</p>}

      {bookings && (
        <div className="space-y-4">
          <p className="font-body text-sm text-cream/50">
            {bookings.length} request{bookings.length === 1 ? "" : "s"} found
          </p>
          {bookings.length === 0 && (
            <p className="glass-card rounded-2xl p-8 text-center font-body text-cream/60">
              No booking requests yet.
            </p>
          )}
          {bookings.map((b) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card-hover rounded-2xl p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-base font-bold text-cream">{b.name}</h2>
                  <p className="font-body text-sm text-champagne">{b.property}</p>
                </div>
                <span className="rounded-full border border-champagne/30 px-3 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-champagne">
                  {b.status}
                </span>
              </div>
              <div className="mt-4 grid gap-2 font-body text-sm text-cream/70 sm:grid-cols-2 lg:grid-cols-4">
                <p>Email: {b.email}</p>
                <p>Phone: {b.phone}</p>
                <p>
                  Stay: {b.checkIn} → {b.checkOut}
                </p>
                <p>Guests: {b.guests}</p>
              </div>
              {b.message && (
                <p className="mt-3 rounded-xl bg-white p-4 font-body text-sm italic leading-relaxed text-cream/60">
                  “{b.message}”
                </p>
              )}
              <p className="mt-3 font-display text-[10px] uppercase tracking-[0.2em] text-cream/35">
                {new Date(b.createdAt).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
