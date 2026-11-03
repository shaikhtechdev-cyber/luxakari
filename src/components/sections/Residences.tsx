"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { media } from "@/lib/media";

interface Residence {
  id: string;
  name: string;
  location: string;
  image: string;
  bullets: string[];
}

const RESIDENCES: Residence[] = [
  {
    id: "kec-madinah",
    name: "KEC Madinah",
    location: "Madinah • Saudi Arabia",
    image: media("/images/kec-madinah.png"),
    bullets: [
      "92 premium serviced residences in the Al Aya project, Knowledge Economic City (KEC), professionally managed for short- to long-term rentals.",
      "Available as 2, 3 and 4-bedroom apartments plus 4-bedroom penthouses ranging from 101 sqm to 353 sqm — many with maid's suites, private balconies and generous terraces.",
      "Fully furnished residences with quality finishes, housekeeping, maintenance and Luxakari's dedicated concierge and guest services — plus an Owner Stay Program allowing personal use alongside rental income.",
      "Prime location within the Haram Boundary: 7 minutes from Masjid an-Nabawi and 2 minutes from the Haramain High-Speed Rail Station, with convenient access to Quba, Mount Uhud, retail destinations and Prince Mohammad bin Abdulaziz International Airport.",
      "Ideally located 200m from the Al Mutqa Almadiniah Mall, a new retail and lifestyle destination in KEC.",
      "Residents enjoy reception, a large lobby, segregated fitness and swimming facilities, a guest majlis and indoor gardens within a masterplanned district of parks, schools, retail and world-class hospitality.",
      "A strong investment opportunity supported by limited supply within the Haram Boundary and Madinah's continued growth.",
    ],
  },
  {
    id: "ayn-al-khaif",
    name: "Ayn Al Khaif",
    location: "Madinah • Saudi Arabia",
    image: media("/images/ayn-al-khaif.png"),
    bullets: [
      "56 premium three-bedroom serviced residences in the Ayn Al Khaif area of Madinah, professionally managed for short- to long-term rentals.",
      "Available in 113 sqm, 183.81 sqm and 223.35 sqm duplex penthouse layouts with private rooftop terraces designed for both lifestyle and investment.",
      "Prime location within the Haram Boundary with convenient access to Masjid an-Nabawi, major road networks, schools, universities, healthcare facilities, retail destinations and public transportation — residents benefit from a private shuttle service to all five daily prayers at Masjid an-Nabawi.",
      "Fully furnished residences featuring quality finishes, housekeeping, maintenance and Luxakari's dedicated concierge and guest services for a seamless living experience.",
      "Owner Stay Program allows owners to enjoy personal use of their residence while benefiting from rental income opportunities.",
      "Strong investment opportunity supported by limited residential supply within the Haram Boundary, year-round demand and Madinah's continued growth.",
    ],
  },
  {
    id: "al-qasr",
    name: "Al Qasr",
    location: "Madinah • Saudi Arabia",
    image: media("/images/al-qasr.png"),
    bullets: [
      "60 premium two-bedroom serviced residences in the Al Qasr area of Madinah, professionally managed by Luxakari for short- to mid-term rentals.",
      "Fully furnished in 76.56 sqm and 84.03 sqm layouts designed for comfortable living and long-term investment.",
      "Prime location within the Haram Boundary with easy access to Masjid an-Nabawi, major road networks, educational institutions, healthcare facilities, retail destinations and public transportation — plus a private shuttle service to all five daily prayers at Masjid an-Nabawi.",
      "Fully managed serviced residences with quality finishes, housekeeping, maintenance, concierge services and Luxakari's hospitality-driven management platform.",
      "Owner Stay Program offers owners personal usage while generating income through professional rental management.",
      "Attractive investment opportunity supported by limited residential supply within the Haram Boundary, strong year-round demand and Luxakari's serviced residence model.",
    ],
  },
];

export default function Residences() {
  const [active, setActive] = useState(0);

  return (
    <section id="lux-residences" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeading
          label="Portfolio"
          title="Lux Residences"
          titleClassName="text-gold-gradient"
        />

        {/* Tabs */}
        <div className="mb-12 flex flex-wrap gap-3">
          {RESIDENCES.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-7 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
                active === i ? "text-wine-deepest" : "text-wine/75 hover:text-gold"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="activePill"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-gold-gradient"
                />
              )}
              <span className="relative z-10">{r.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={RESIDENCES[active].id}
            id={`lux-residences-${RESIDENCES[active].id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className="group relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-wine/15">
                <motion.img
                  key={RESIDENCES[active].image}
                  src={RESIDENCES[active].image}
                  alt={RESIDENCES[active].name}
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream/70 via-transparent to-transparent" />
              </div>
              <motion.a
                href="#hubspot-form"
                whileHover={{ scale: 1.06, rotate: 8 }}
                className="absolute -bottom-5 -right-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-wine-deepest shadow-[0_16px_40px_-10px_rgba(188,109,31,0.8)]"
                aria-label="Enquire"
              >
                <ArrowUpRight className="h-6 w-6" />
              </motion.a>
            </div>

            <div>
              <p className="flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.3em] text-gold-dark">
                <MapPin className="h-3.5 w-3.5" />
                {RESIDENCES[active].location}
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold uppercase text-wine lg:text-4xl">
                Lux Residences {RESIDENCES[active].name}
              </h3>
              <ul className="mt-7 space-y-4">
                {RESIDENCES[active].bullets.map((b, i) => (
                  <Reveal
                    as="li"
                    index={i}
                    key={b}
                    className="flex items-start gap-4 font-body text-base leading-relaxed text-wine/85"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold shadow-[0_0_10px_#BC6D1F]" />
                    {b}
                  </Reveal>
                ))}
              </ul>
              <Reveal index={6} className="mt-9">
                <a href="#hubspot-form" className="btn-cream btn-shine">
                  Book Now
                </a>
              </Reveal>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
