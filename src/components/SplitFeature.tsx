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
        {/* Rounded photo with an offset gold corner frame, per the section mockups */}
        <div className="group relative z-10 aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-copper/30">
          <motion.img
            src={image}
            alt={alt}
            className="h-full w-full object-cover"
            whileHover={reduce ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-br-[2rem] border-b border-r border-copper/60" />
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
