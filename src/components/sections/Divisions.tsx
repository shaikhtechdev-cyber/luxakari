"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import CountUp from "@/components/CountUp";
import { media } from "@/lib/media";

const DIVISIONS = [
  {
    id: "lux-design",
    title: "Lux Design",
    image: media("/images/lux-design.png"),
    lead: "Turnkey interior design, FF&E, kitchen solutions, end-to-end design, procurement, installation and operational expertise — transforming residential buildings into professionally managed serviced residences across Madinah, Makkah, Jeddah and Riyadh.",
    points: [
      "Interior Design Excellence — bespoke interior concepts that combine functionality, aesthetics and modern residential living standards.",
      "Turnkey FF&E Solutions — complete procurement, supply and installation of furniture, fixtures and equipment tailored to each property type.",
      "Kitchen Design & Fit-Outs — end-to-end kitchen planning, manufacturing coordination, supply and installation for residential developments and serviced residences.",
      "Seamless Project Delivery — single-point management from concept development and material selection through installation and final handover.",
      "Residential & Hospitality Expertise — solutions for apartments, serviced residences, compounds, student housing and hospitality-driven communities.",
      "Value Enhancement — transform vacant or unfurnished units into move-in-ready residences that improve occupancy, rental yields and long-term asset value.",
    ],
  },
  {
    id: "lux-drive",
    title: "Lux Drive",
    image: media("/images/lux-drive.png"),
    lead: "Seamless, luxury transportation experiences designed for comfort, efficiency and style — our premium vehicle network and professional chauffeurs ensure every journey reflects the highest hospitality standards.",
    points: [
      "Executive Transfers — chauffeur-driven cars for VIPs and corporate guests, ensuring punctuality, elegance and discretion.",
      "Airport Transfers — smooth, reliable pick-up and drop-off at major airports with meticulous attention to detail.",
      "Ziyarat Tours — private and group Ziyarat tours in Makkah and Madinah covering key religious landmarks and historical sites, tailored to guest preferences.",
      "Event Transportation — luxury transportation solutions and professional drivers providing seamless mobility for groups and events.",
      "City-to-City Travel — comfortable intercity transfers across the Kingdom, ideal for business, leisure and pilgrimage journeys.",
      "Private & Group Tours — custom-curated transportation experiences showcasing Saudi Arabia's landmarks with personalized itineraries.",
    ],
  },
  {
    id: "lux-concierge",
    title: "Lux Concierge",
    image: media("/images/lux-concierge.png"),
    lead: "Elevating hospitality and increasing owner revenue with a personalized concierge solution — available as a white-label app under your brand.",
    points: [
      "Restaurant & Entertainment Reservations — booking tables at local restaurants and securing tickets for concerts, shows or sporting events.",
      "Local Recommendations — tailored suggestions for dining, sightseeing and unique local attractions and experiences.",
      "Transportation Assistance — arranging airport transfers, private jets, taxis, rental cars or chauffeur services for guests.",
      "Tour & Activity Planning — coordinating local tours, excursions and unique experiences with local partners.",
      "Special Requests — fulfilling unique guest requests such as arranging gift deliveries, planning proposals or sourcing specific services.",
      "Problem-Solving — addressing any issues or concerns guests may have to ensure a smooth and comfortable stay.",
      "General Information — answering questions about hotel services, directions and local information.",
      "Event & Business Services — providing or arranging business services, event planning and other special needs for guests.",
    ],
  },
  {
    id: "lux-spa",
    title: "Lux Spa",
    image: media("/images/lux-spa.png"),
    lead: "Increase your revenue and transform residential living into a hotel-inspired wellness experience.",
    points: [
      "Design Excellence — concept development and interior design blending modern wellness standards with cultural aesthetics.",
      "Turnkey Construction — end-to-end delivery of spa facilities, including treatment rooms, relaxation lounges, hydrotherapy areas and wellness amenities.",
      "Seamless Integration — tailored layouts to fit within residential compounds or buildings without disrupting existing functionality.",
      "Hotel-Level Operations — professional management of spa services, staffing, training and guest engagement programs.",
      "Wellness-Centric Lifestyle — curated treatments, fitness and relaxation offerings that elevate resident satisfaction and attract premium tenants.",
      "Value Enhancement — converts residential environments into holistic communities, strengthening property positioning and long-term returns.",
    ],
  },
  {
    id: "lux-hotel",
    title: "Lux Hotel",
    image: media("/images/lux-hotel.png"),
    lead: "Partnering with landowners to transform land into hospitality assets through modular innovation.",
    points: [
      "Hospitality-Inspired Communities — end-to-end development of hotels, serviced apartments, student housing, workforce accommodation and hospitality-led communities.",
      "Modular Construction — advanced off-site manufacturing and modular building systems that reduce construction timelines, improve quality control and accelerate delivery.",
      "Landowner Partnerships — joint venture and profit-sharing models that enable landowners to unlock the value of their land without requiring hospitality development expertise.",
      "Design & Engineering — integrated feasibility studies, master planning, architecture, engineering, interior design and hospitality concept development.",
      "Hotel Operations & Asset Management — professional hotel management, revenue optimization, guest experience programs and operational excellence aligned with international hospitality standards.",
      "Scalable Investment Platform — flexible development solutions for private investors, institutional partners, government partners and large-scale hospitality projects across Saudi Arabia and beyond.",
    ],
  },
  {
    id: "hospitality-technology",
    title: "Hospitality Technology",
    image: media("/images/hospitality-tech.png"),
    lead: "Our associated company ShaikhTech provides all-in-one hospitality solutions enhancing comfort, safety and efficiency.",
    points: [
      "High-Speed WiFi & HSIA — secure connectivity with real-time monitoring.",
      "IPTV & Interactive Portals — multilingual, on-demand and live channels.",
      "Property Management System — reservations, check-ins, billing and reporting.",
      "Smart Access & Safety — digital keys, smart locks, CCTV and access control.",
      "Building & Room Automation — smart controls for lighting, HVAC and housekeeping.",
    ],
  },
];

const MARQUEE_WORDS = [
  "Lux Design",
  "Lux Drive",
  "Lux Concierge",
  "Lux Spa",
  "Lux Hotel",
  "Hospitality Technology",
];

export default function Divisions() {
  return (
    <section id="divisions" className="relative overflow-hidden py-24 lg:py-32">
      {/* Marquee */}
      <div className="mb-20 border-y border-wine/15 py-6">
        <div className="mask-fade-x flex overflow-hidden">
          <div className="flex min-w-max animate-marquee items-center gap-14 pr-14">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
              <span key={i} className="flex items-center gap-14">
                <span className="font-display text-2xl font-bold uppercase tracking-[0.15em] text-wine/75 transition-colors duration-500 hover:text-gold sm:text-4xl">
                  {w}
                </span>
                <span className="h-2 w-2 shrink-0 rotate-45 bg-gold/70" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeading
          label="Divisions"
          title="A Complete Hospitality Ecosystem"
          titleClassName="text-gold-gradient"
        />

        {/* Stats strip */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
              className="glass-card-hover rounded-2xl p-6 text-center"
            >
              <div className="font-display text-3xl font-bold text-gold lg:text-4xl">
                <CountUp to={s.v} suffix={s.s ?? ""} />
              </div>
              <div className="mt-2 font-display text-[10px] uppercase tracking-[0.22em] text-wine/70">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-24 lg:space-y-32">
          {DIVISIONS.map((d, i) => (
            <motion.div
              key={d.id}
              id={d.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="group relative">
                <motion.div
                  whileHover={{ scale: 1.03, rotate: i % 2 ? -1 : 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-wine/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
                >
                  <img
                    src={d.image}
                    alt={d.title}
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cream/75 via-cream/10 to-transparent" />
                  <span className="absolute left-6 top-6 rounded-full bg-cream/70 px-4 py-1.5 font-display text-[10px] uppercase tracking-[0.3em] text-gold-dark backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              </div>

              <div>
                <span className="section-label font-display">Division</span>
                <h3 className="font-display text-3xl font-bold uppercase text-wine sm:text-4xl">
                  {d.title.split(" ").map((word, wi) => (
                    <span key={wi} className={wi === 1 ? "text-gold-gradient" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </h3>
                <p className="mt-4 font-body text-lg leading-relaxed text-wine/85">{d.lead}</p>
                <ul className="mt-7 space-y-3.5">
                  {d.points.map((p, pi) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * pi, duration: 0.5 }}
                      className="group flex items-start gap-3.5 font-body text-sm leading-relaxed text-wine/70 transition-colors hover:text-wine"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold transition-transform duration-300 group-hover:scale-150" />
                      {p}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
