"use client";

import { motion } from "framer-motion";
import { media } from "@/lib/media";

export default function CTA() {
  return (
    <section id="cta" className="relative">
      {/* Closing banner — dark (#3A0A12) with peach accents, as on the live site */}
      <div className="relative overflow-hidden bg-wine-cta py-28">
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
            <h2 className="font-heading text-4xl font-medium leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
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
