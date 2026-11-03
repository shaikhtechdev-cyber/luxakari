"use client";

import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import ParallaxImage from "@/components/ParallaxImage";
import { media } from "@/lib/media";

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 lg:py-32">
      {/* Journey */}
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="section-label font-display">Get Started</span>
            <SplitText
              as="h2"
              text="Begin Your Transformation"
              className="font-display text-3xl font-bold uppercase leading-[1.12] text-wine sm:text-4xl lg:text-5xl"
            />
            <Reveal index={2}>
              <p className="mt-5 font-body text-xl text-gold-dark">
                Let&apos;s elevate your building together.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {[
                "Contact information for initial consultations and property assessments.",
                "Timeline overview: from discovery and planning to launch and ongoing management.",
                "Custom proposals developed to address specific property challenges and opportunities.",
              ].map((t, i) => (
                <Reveal as="li" index={i + 3} key={t} className="flex items-start gap-4 text-wine/75">
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                  <span className="font-body text-base leading-relaxed">{t}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal index={6} className="mt-9">
              <Magnetic>
                <a href="#hubspot-form" className="btn-cream btn-shine">
                  Book Now
                </a>
              </Magnetic>
            </Reveal>
          </div>

          <Reveal index={1}>
            <ParallaxImage
              src={media("/images/luxakari.jpg")}
              alt="Luxakari lifestyle"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              wrapperClassName="aspect-[4/5] rounded-[2rem] border border-wine/15"
            />
          </Reveal>
        </div>
      </div>

      {/* Closing banner — dark (#430000) with peach accents, as on the live site */}
      <div className="relative mt-32 overflow-hidden bg-wine-cta py-28 lg:mt-40">
        <div className="absolute inset-0 -z-10 opacity-25">
          <img src={media("/images/choose.jpg")} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-wine-cta via-wine-cta/85 to-wine-cta/40" />
        </div>

        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="section-label text-peach">The Future</span>
            <h2 className="font-display text-4xl font-bold uppercase leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              Choose Luxakari,{" "}
              <span className="text-peach">Elevate Your Property</span>
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-cream/80">
              Join the future of residential hospitality and community living.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} className="mt-10 inline-block">
              <a href="#hubspot-form" className="btn-cream btn-shine !px-10 !py-4 text-sm">
                Book Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
