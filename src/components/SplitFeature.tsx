"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface SplitFeatureProps {
  image: string;
  alt: string;
  reverse?: boolean;
  children: React.ReactNode;
}

export default function SplitFeature({ image, alt, reverse = false, children }: SplitFeatureProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-wine/15">
          <motion.img
            src={image}
            alt={alt}
            className="h-full w-full object-cover"
            whileHover={reduce ? undefined : { scale: 1.08 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-wine-cta/50 via-transparent to-gold/10" />
          <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-wine/10 transition-all duration-500 group-hover:ring-gold/40" />
        </div>
        <div className="absolute -bottom-5 -right-5 -z-10 h-28 w-28 rounded-2xl border border-wine/25" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
