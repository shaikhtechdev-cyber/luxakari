"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ServiceCardProps {
  index: number;
  icon: ReactNode;
  title: string;
  text: string;
}

export default function ServiceCard({ index, icon, title, text }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="glass-card-hover group relative overflow-hidden rounded-2xl p-7"
    >
      <span className="absolute -right-4 -top-5 font-display text-6xl font-bold text-wine/5 transition-all duration-500 group-hover:text-gold/10">
        {String(index + 1).padStart(2, "0")}
      </span>

      <motion.div
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.6 }}
        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-gradient text-wine-deepest shadow-[0_8px_24px_-8px_rgba(188,109,31,0.7)]"
      >
        {icon}
      </motion.div>

      <h3 className="font-display text-base font-bold uppercase tracking-[0.12em] text-wine">
        {title}
      </h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-wine/70">{text}</p>

      <div className="mt-5 h-px w-0 bg-gold-gradient transition-all duration-700 group-hover:w-full" />
    </motion.div>
  );
}
