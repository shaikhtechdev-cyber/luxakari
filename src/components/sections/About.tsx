"use client";

import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import SplitFeature from "@/components/SplitFeature";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { media } from "@/lib/media";

const GLOBAL_POINTS = [
  "Benchmarked against Four Seasons, Mandarin Oriental and Waldorf Astoria — extended with butler-trained staff and a 24/7 personalised concierge designed around the modern guest.",
  "Proven expertise in property enhancement: from renovation and upgrades to premium furnishings and curated amenities.",
  "Culturally attuned to Middle Eastern values and taste, ensuring offerings resonate in KSA, UAE and beyond.",
  "Dedicated to eco-conscious practices and sustainable operations.",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Tenants expect more */}
        <div className="mb-28 lg:mb-36">
          <SplitFeature image={media("/images/today.jpg")} alt="Modern residential living">
            <span className="section-label font-display">The Shift</span>
            <SplitText
              as="h2"
              text="Today's Tenants Expect More Than Just A Home..."
              className="font-display text-3xl font-bold uppercase leading-[1.15] text-wine sm:text-4xl lg:text-[2.75rem]"
            />
          </SplitFeature>

          <SplitFeature image={media("/images/seek.jpg")} alt="Lifestyle experiences" reverse>
            <span className="section-label font-display">Lifestyle</span>
            <SplitText
              as="h2"
              text="They Seek Lifestyle Experiences"
              className="font-display text-3xl font-bold uppercase leading-[1.15] text-gold-gradient sm:text-4xl lg:text-[2.75rem]"
            />
            <ul className="mt-7 space-y-4">
              {[
                "Rising demand for elevated amenities, personalized services and community-oriented living.",
                "Hospitality-inspired residential offerings command premium rents and higher occupancy rates.",
                "Tenants increasingly value cultural sensitivity, wellness features, experiential offerings and sustainability.",
              ].map((t, i) => (
                <Reveal as="li" index={i} key={t} className="flex items-start gap-4 text-wine/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  <span className="font-body text-base leading-relaxed">{t}</span>
                </Reveal>
              ))}
            </ul>
          </SplitFeature>
        </div>

        {/* Global standard */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <motion.img
              src={media("/images/arbi.png")}
              alt="Global standard"
              className="relative z-10 w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-6 -z-0 rounded-full bg-[#723740]/50 blur-[70px]" />
          </motion.div>

          <div>
            <SectionHeading
              label="Our Standard"
              title="A Global Standard In Hospitality-Infused Residential Living"
              titleClassName="text-gold-gradient"
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {GLOBAL_POINTS.map((point, i) => (
                <Reveal
                  as="li"
                  index={i}
                  key={point}
                  className="glass-card-hover rounded-2xl p-6 font-body text-sm leading-relaxed text-wine/85"
                >
                  <span className="mb-3 block font-display text-xs font-bold tracking-[0.3em] text-gold-dark">
                    0{i + 1}
                  </span>
                  {point}
                </Reveal>
              ))}
            </ul>

            <Reveal index={4} className="mt-10">
              <a href="#hubspot-form" className="btn-cream btn-shine">
                Book Now
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
