"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import { media } from "@/lib/media";

const HERO_POINTS = [
  "World-class hospitality within reach of the Haram — Makkah and Madinah.",
  "Premium serviced residences, furnished and managed to hotel standards.",
  "Services that enhance property value, drive occupancy and foster long-term tenant loyalty.",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* Background — full-bleed muted video + dark wash. Phones get a 720p file;
          visitors who prefer reduced motion see the still poster frame instead. */}
      <div className="absolute inset-0 -z-10">
        {reduce ? (
          <img
            src={media("/images/hero-poster.jpg")}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={media("/images/hero-poster.jpg")}
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          >
            <source media="(min-width: 768px)" src={media("/videos/hero-1080.mp4")} type="video/mp4" />
            <source src={media("/videos/hero-720.mp4")} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 via-maroon/65 to-maroon/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/50 via-transparent to-maroon/70" />
      </div>

      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="relative mx-auto w-full max-w-[1400px] px-5 lg:px-10"
      >
        <div className="max-w-3xl">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-champagne/40 bg-champagne/10 px-5 py-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-champagne" />
              <span className="font-display text-[10px] font-semibold uppercase tracking-[0.35em] text-champagne">
                Makkah • Madinah • Hospitality
              </span>
            </motion.div>

            <SplitText
              as="h1"
              text="Redefining Urban Living Through Hospitality"
              className="font-heading text-4xl font-medium leading-[1.08] tracking-[0.01em] text-cream sm:text-5xl lg:text-[4.2rem] xl:text-[4.6rem]"
              delay={0.4}
              stagger={0.07}
            />

            <motion.ul
              className="mt-9 space-y-4"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 1.1 } } }}
            >
              {HERO_POINTS.map((point) => (
                <motion.li
                  key={point}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
                  }}
                  className="flex items-start gap-4 font-body text-base leading-relaxed text-cream/85 lg:text-lg"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-champagne shadow-[0_0_12px_#C98A6B]" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="mt-11 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a href="#hubspot-form" className="btn-cream btn-shine">
                  Book Now
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="#about-arabia" className="btn-outline border-cream/50 text-cream hover:bg-cream/10">
                  Discover More
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-cream/20 pt-8"
            >
              {[
                { n: "92", l: "KEC Residences" },
                { n: "56", l: "Ayn Al Khaif" },
                { n: "60", l: "Al Qasr Units" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-heading text-3xl font-medium text-champagne">{s.n}</div>
                  <div className="mt-1 font-display text-[10px] uppercase tracking-[0.2em] text-cream/60">
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </motion.div>

      <motion.a
        href="#stay"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/60 transition-colors hover:text-champagne"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
      >
        <span className="font-display text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/30"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
