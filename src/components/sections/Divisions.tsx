"use client";

import { motion } from "framer-motion";
import {
  Armchair,
  BedDouble,
  Building2,
  CalendarDays,
  Car,
  Clock,
  ConciergeBell,
  Cpu,
  Landmark,
  MapPin,
  Plane,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CountUp from "@/components/CountUp";
import { media } from "@/lib/media";

/* ---------- content (from the Luxakari section mockups) ---------- */

const DESIGN_POINTS: [string, string][] = [
  ["Interior Design Excellence", "Bespoke interiors that combine the warmth of Madinah with modern, minimalistic living standards."],
  ["Turnkey FF&E Solution", "Complete procurement, setup, and installation of furniture, fixtures and equipment tailored to your property."],
  ["Built-in Cabinetry & Smart Storage", "Custom cabinetry and efficient storage solutions that maximize space, functionality, and the overall living experience."],
  ["Premium Finishes", "High-quality materials and thoughtful detailing that ensure durability, elegance, and long-term value."],
  ["Comfort & Hospitality Focus", "Residences prepared for a refined living experience, whether for personal use, seasonal stays, or rental income."],
];

const DRIVE_POINTS: [LucideIcon, string, string][] = [
  [Car, "Premium Chauffeurs", "Professional, courteous drivers trained to deliver a safe and refined travel experience."],
  [MapPin, "Madinah Focus", "Deep local knowledge for smooth, timely, and hassle-free travel across the city."],
  [Clock, "Flexible Booking", "On-demand, scheduled, and long-term options to suit your lifestyle and stay."],
  [Armchair, "Comfort & Privacy", "Modern, well-maintained vehicles with a focus on comfort, convenience, and discretion."],
  [Users, "For Residents & Guests", "Tailored services for residents, family, and visiting guests."],
  [ShieldCheck, "Reliable & Trusted", "A commitment to safety, punctuality, and a consistently high standard of service."],
];

const CONCIERGE_POINTS: [LucideIcon, string, string][] = [
  [ConciergeBell, "Dedicated Concierge Support", "a single point of contact for all your travel, stay, and lifestyle needs."],
  [Plane, "Seamless Travel Arrangements", "airport transfers, private chauffeur services, and city-to-city travel."],
  [Landmark, "Ziyarah Tours", "guided visits to the key historical and religious sites in and around Madinah."],
  [CalendarDays, "Event Assistance", "planning and coordination for group visits, gatherings, and special events."],
  [BedDouble, "Hotel & Dining Bookings", "curated accommodation and restaurant options to suit your preferences."],
  [Users, "Property & Stay Management", "value-added support for property owners and long-term residents."],
  [Route, "Personalised Itineraries", "tailor-made plans to make every stay in Madinah more meaningful and seamless."],
];

const MORE: [LucideIcon, string, string, string][] = [
  [Sparkles, "lux-spa", "Lux Spa", "Hotel-inspired wellness facilities designed, built and operated inside residential buildings."],
  [Building2, "lux-hotel", "Lux Hotel", "Partnering with landowners to turn land into hospitality assets through modular construction."],
  [Cpu, "hospitality-technology", "Hospitality Technology", "WiFi, IPTV, PMS, smart access and room automation through our associate company ShaikhTech."],
];

const MARQUEE_WORDS = ["Lux Design", "Lux Drive", "Lux Concierge", "Lux Spa", "Lux Hotel", "Hospitality Technology"];

/* ---------- building blocks ---------- */

const reveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
} as const;

function Title({ eyebrow, word, boxed = false }: { eyebrow: string; word: string; boxed?: boolean }) {
  return (
    <>
      <span className="section-label font-display">{eyebrow}</span>
      <h3 className="font-heading text-4xl font-semibold uppercase leading-none text-wine sm:text-5xl">
        Lux{" "}
        {boxed ? (
          <span className="inline-block bg-maroon px-3 pb-1 pt-2 text-cream">{word}</span>
        ) : (
          <span className="text-copper">{word}</span>
        )}
      </h3>
      <div className="divider-gold mt-5 w-20" />
    </>
  );
}

function IconRows({ items }: { items: [LucideIcon, string, string][] }) {
  return (
    <ul className="mt-7 divide-y divide-wine/10">
      {items.map(([Icon, title, text]) => (
        <li key={title} className="flex items-center gap-5 py-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-copper/15 bg-ivory text-copper shadow-[0_6px_14px_-8px_rgba(58,10,18,0.35)]">
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <p className="font-body text-[15px] leading-relaxed text-warmbrown">
            <strong className="font-semibold text-wine">{title}</strong> – {text}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- section ---------- */

export default function Divisions() {
  return (
    <section id="divisions" className="relative overflow-hidden py-24 lg:py-32">
      {/* Marquee */}
      <div className="mb-20 border-y border-wine/15 py-6">
        <div className="mask-fade-x flex overflow-hidden">
          <div className="flex min-w-max animate-marquee items-center gap-14 pr-14">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
              <span key={i} className="flex items-center gap-14">
                <span className="font-heading text-2xl font-medium tracking-[0.15em] text-wine/75 sm:text-4xl">{w}</span>
                <span className="h-2 w-2 shrink-0 rotate-45 bg-copper/70" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeading label="Divisions" title="A Complete Hospitality Ecosystem" />

        {/* Stats strip */}
        <div className="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: 208, l: "Serviced Residences" },
            { v: 6, l: "Divisions" },
            { v: 4, l: "KSA Cities" },
            { v: 24, s: "/7", l: "Concierge" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="glass-card p-6 text-center"
            >
              <div className="font-heading text-3xl font-medium text-copper lg:text-4xl">
                <CountUp to={s.v} suffix={s.s ?? ""} />
              </div>
              <div className="mt-2 font-display text-[10px] uppercase tracking-[0.22em] text-taupe">{s.l}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-28 lg:space-y-36">
          {/* 01 · Lux Design — collage left, text right */}
          <motion.div id="lux-design" {...reveal} className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="relative overflow-hidden rounded-[1.75rem]">
              <img
                src={media("/images/lux-design-collage.jpg")}
                alt="Lux Design interiors: living room, dressing room and bedroom"
                className="w-full"
              />
              <span className="absolute left-7 top-7 rounded-full bg-white/90 px-4 py-1.5 font-display text-xs font-semibold text-wine shadow">
                01 / 03
              </span>
            </div>
            <div>
              <Title eyebrow="Interior" word="Design" />
              <p className="mt-6 font-body text-[17px] leading-relaxed text-warmbrown">
                Timeless interior design, FF&amp;E, built-in cabinetry, and in-rental design, which ensures hotel-level
                quality combined with long-term durability. From refined building finishes to fully fitted residences
                across Madinah, each detail reflects Luxakari&apos;s commitment to comfort, quality, and value.
              </p>
              <ul className="mt-6 divide-y divide-wine/10">
                {DESIGN_POINTS.map(([title, text]) => (
                  <li key={title} className="flex items-start gap-4 py-3.5">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rotate-45 bg-copper" />
                    <p className="font-body text-[15px] leading-relaxed text-warmbrown">
                      <strong className="font-semibold text-wine">{title}</strong> – {text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* 02 · Lux Drive — text left, photo right with gold corner brackets */}
          <motion.div id="lux-drive" {...reveal} className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <Title eyebrow="Division" word="Drive" />
              <p className="mt-6 font-body text-[17px] leading-relaxed text-warmbrown">
                Lux Drive is our premium chauffeur service in Madinah, offering reliable, comfortable, and discreet
                transportation for residents, visitors, and business travellers.
              </p>
              <IconRows items={DRIVE_POINTS} />
            </div>
            <div className="relative order-1 px-5 py-5 lg:order-2">
              <div className="pointer-events-none absolute left-0 top-0 h-32 w-36 rounded-tl-[2rem] border-l-2 border-t-2 border-copper/70" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-36 rounded-br-[2rem] border-b-2 border-r-2 border-copper/70" />
              <div className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem]">
                <img
                  src={media("/images/lux-drive-desert.jpg")}
                  alt="A Lux Drive chauffeur holding the rear door of a black luxury car among desert dunes"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="absolute left-10 top-10 rounded-full bg-white/90 px-4 py-1.5 font-display text-xs font-semibold text-wine shadow">
                02 / 03
              </span>
            </div>
          </motion.div>

          {/* 03 · Lux Concierge — photo left, text right (shown once, right after Lux Drive) */}
          <motion.div id="lux-concierge" {...reveal} className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border-4 border-white shadow-[0_30px_60px_-25px_rgba(58,10,18,0.45)]">
                <img
                  src={media("/images/lux-concierge-desk.jpg")}
                  alt="A concierge desk with a brass service bell and white flowers"
                  className="h-full w-full object-cover object-left"
                />
              </div>
              <span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-1.5 font-display text-xs font-semibold text-wine shadow">
                03 / 03
              </span>
            </div>
            <div>
              <Title eyebrow="Division" word="Concierge" boxed />
              <p className="mt-6 font-body text-[17px] leading-relaxed text-warmbrown">
                Elevating your stay in Madinah with a premium concierge service that combines comfort, convenience,
                and local expertise.
              </p>
              <IconRows items={CONCIERGE_POINTS} />
            </div>
          </motion.div>
        </div>

        {/* Other divisions — short boxes only */}
        <div className="mt-28 lg:mt-36">
          <span className="section-label font-display">Also From Luxakari</span>
          <div className="mt-2 grid gap-5 md:grid-cols-3">
            {MORE.map(([Icon, id, title, text], i) => (
              <motion.div
                key={id}
                id={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="glass-card p-7"
              >
                <Icon className="h-6 w-6 text-copper" strokeWidth={1.75} />
                <h4 className="mt-4 font-heading text-xl font-semibold text-wine">{title}</h4>
                <p className="mt-2 font-body text-sm leading-relaxed text-warmbrown">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
