"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  Loader2,
  Send,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { media } from "@/lib/media";

const PROPERTIES = [
  "General Enquiry",
  "KAFD — One Bedroom Apartment",
  "KAFD — Two Bedroom Apartment",
  "KEC Madinah — Lux Residences",
  "Ayn Al Khaif — Lux Residences",
  "Al Qasr — Lux Residences",
  "Project 12 — Lux Residences",
  "Lux Drive — Transportation",
  "Lux Design — Interior Solutions",
];

const OFFICES = [
  {
    city: "Madinah Office",
    lines: [
      "Building #7416, Office #6, Street Prince Mohammad Bin Abdul Aziz, District Al-Aridh, Madinah, Saudi Arabia",
    ],
    phone: "+966 53 731 6108",
    wa: "https://wa.link/257bub",
  },
  {
    city: "Riyadh Office",
    lines: ["Level 7, Building 4.07, King Abdullah Financial District, Riyadh, Saudi Arabia"],
    phone: "+966 57 935 7572",
    wa: "https://wa.link/257bub",
  },
  {
    city: "Dubai Office",
    lines: ["Myedan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba, Dubai, United Arab Emirates"],
    phone: "+971 58 615 9899",
    wa: "https://wa.link/257bub",
  },
];

const SOCIALS = [
  { icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/company/luxakari/" },
  { icon: <Instagram className="h-4 w-4" />, href: "https://www.instagram.com/luxakari/" },
  { icon: <Facebook className="h-4 w-4" />, href: "https://www.facebook.com/luxakarihospitalitygroup" },
  { icon: <Youtube className="h-4 w-4" />, href: "https://www.youtube.com/@Luxakari" },
];

export interface BookingPrefill {
  property?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

const PAYMENTS = ["pay-1.png", "pay-2.png", "pay-3.png", "pay-4.png", "pay-5.png", "pay-6.png"];

export default function Booking() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  // Filled in by the stay search ("Book now" on a property card) via a window event.
  useEffect(() => {
    function onPrefill(e: Event) {
      const d = (e as CustomEvent<BookingPrefill>).detail ?? {};
      setStatus("idle");
      // wait a tick so the form is mounted again if the success screen was showing
      setTimeout(() => {
        const form = document.querySelector<HTMLFormElement>("#hubspot-form form");
        if (!form) return;
        const set = (name: string, value?: string | number) => {
          const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
          if (el && value !== undefined && value !== "") el.value = String(value);
        };
        if (d.property && PROPERTIES.includes(d.property)) set("property", d.property);
        set("checkIn", d.checkIn);
        set("checkOut", d.checkOut);
        set("guests", d.guests);
        (form.elements.namedItem("name") as HTMLInputElement | null)?.focus({ preventScroll: true });
      }, 50);
    }
    window.addEventListener("luxakari:prefill-booking", onPrefill);
    return () => window.removeEventListener("luxakari:prefill-booking", onPrefill);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      property: fd.get("property"),
      guests: Number(fd.get("guests")),
      checkIn: fd.get("checkIn"),
      checkOut: fd.get("checkOut"),
      message: fd.get("message"),
    };

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }
      setStatus("success");
      form.reset();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <section id="hubspot-form" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(64,18,21,0.10)_0%,transparent_50%)]" />

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeading
          label="Reservations"
          title="Booking Request"
          titleClassName="text-gold-gradient"
        />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Form */}
          <Reveal index={0} className="glass-card relative overflow-hidden rounded-none p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#C98A6B]/20 blur-[80px]" />
            <h3 className="font-heading text-lg font-medium tracking-[0.15em] text-wine">
              Contact Details
            </h3>
            <div className="divider-gold my-6" />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 py-16 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient text-wine-deepest"
                  >
                    <CheckCircle2 className="h-10 w-10" />
                  </motion.span>
                  <h4 className="font-heading text-2xl font-medium text-wine">Request Received</h4>
                  <p className="max-w-sm font-body text-sm leading-relaxed text-wine/70">
                    Thank you — your booking request has been saved to our system. Our reservations
                    team will contact you within 24 hours.
                  </p>
                  <button onClick={() => setStatus("idle")} className="btn-outline mt-2">
                    New Request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <div className="sm:col-span-1">
                    <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.25em] text-gold">
                      Full Name *
                    </label>
                    <input name="name" required className="input-field" placeholder="John Doe" />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.25em] text-gold">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="input-field"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.25em] text-gold">
                      Phone *
                    </label>
                    <input name="phone" required className="input-field" placeholder="+966 ..." />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.25em] text-gold">
                      Property
                    </label>
                    <select name="property" defaultValue={PROPERTIES[0]} className="input-field">
                      {PROPERTIES.map((p) => (
                        <option key={p} value={p} className="bg-wine-dark text-cream">
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.25em] text-gold">
                      Check In
                    </label>
                    <input name="checkIn" type="date" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.25em] text-gold">
                      Check Out
                    </label>
                    <input name="checkOut" type="date" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.25em] text-gold">
                      Guests
                    </label>
                    <input
                      name="guests"
                      type="number"
                      min={1}
                      defaultValue={2}
                      className="input-field"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block font-display text-[10px] uppercase tracking-[0.25em] text-gold">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Tell us about your stay, dates and any special requests..."
                    />
                  </div>

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="sm:col-span-2 rounded-none border border-dustyrose/40 bg-ivory px-4 py-3 font-body text-sm text-maroon-ink"
                    >
                      {error}
                    </motion.p>
                  )}

                  <div className="sm:col-span-2">
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-cream btn-shine w-full disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Request
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          {/* Offs directory */}
          <div id="contact" className="space-y-5">
            <Reveal index={1} className="glass-card rounded-none p-8">
              <span className="section-label font-display">Get In Touch</span>
              <div className="mt-4 space-y-3">
                {[
                  { icon: <Mail className="h-4 w-4" />, label: "Email", value: "connect@luxakari.com", href: "mailto:connect@luxakari.com" },
                  { icon: <Phone className="h-4 w-4" />, label: "KSA", value: "+966 55 761 0430", href: "tel:+966557610430" },
                  { icon: <Phone className="h-4 w-4" />, label: "UAE", value: "+971 58 615 9899", href: "tel:+971586159899" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="group flex items-center gap-4 rounded-none border border-wine/15 bg-white p-5 transition-all duration-400 hover:border-gold/40"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-wine group-hover:text-cream">
                      {c.icon}
                    </span>
                    <span>
                      <span className="block font-display text-[10px] uppercase tracking-[0.25em] text-wine/70">
                        {c.label}
                      </span>
                      <span className="font-body text-base text-wine">{c.value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            {OFFICES.map((o, i) => (
              <Reveal index={i + 2} key={o.city} className="glass-card-hover rounded-none p-8">
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-wine">
                      {o.city}
                    </h4>
                    {o.lines.map((l) => (
                      <p key={l} className="mt-2 font-body text-sm leading-relaxed text-wine/70">
                        {l}
                      </p>
                    ))}
                    <a
                      href={o.wa}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 font-body text-sm font-semibold text-gold-dark transition-colors hover:text-peach"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {o.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal index={5} className="glass-card rounded-none p-8">
              <h4 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-wine">
                Let&apos;s Connect
              </h4>
              <div className="mt-5 flex flex-wrap gap-3">
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-wine/20 text-wine/75 transition-colors duration-300 hover:border-wine hover:bg-wine hover:text-cream"
                  >
                    {s.icon}
                  </motion.a>
                ))}
                <motion.a
                  href="https://wa.link/257bub"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="flex h-11 items-center gap-2 rounded-full border border-wine/20 px-5 font-display text-[10px] uppercase tracking-[0.2em] text-wine/75 transition-colors duration-300 hover:border-wine hover:bg-wine hover:text-cream"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </motion.a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Payments */}
        <Reveal index={6} className="mt-16">
          <p className="mb-6 text-center font-display text-[10px] uppercase tracking-[0.4em] text-wine/70">
            Payment Options
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {PAYMENTS.map((p, i) => (
              <motion.div
                key={p}
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex h-16 w-24 items-center justify-center rounded-none border border-wine/15 bg-cream/90 p-3"
              >
                <img src={media(`/images/${p}`)} alt={`Payment option ${i + 1}`} className="h-full w-full object-contain" />
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
