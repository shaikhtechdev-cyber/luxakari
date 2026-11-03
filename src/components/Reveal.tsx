"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const TAGS = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
};

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.12 * i,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

interface RevealProps {
  children: ReactNode;
  index?: number;
  className?: string;
  id?: string;
  as?: "div" | "section" | "li" | "span" | "p" | "h2" | "h3";
}

export default function Reveal({ children, index = 0, className, id, as = "div" }: RevealProps) {
  const Tag = TAGS[as];
  return (
    <Tag
      className={className}
      id={id}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
    >
      {children}
    </Tag>
  );
}
