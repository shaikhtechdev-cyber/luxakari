"use client";

import { motion } from "framer-motion";

const TAGS = {
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
};

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
  once = true,
  as = "span",
}: SplitTextProps) {
  const words = text.split(" ");
  const Tag = TAGS[as];

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0, rotate: 3 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once, margin: "-40px" }}
            transition={{
              duration: 0.85,
              delay: delay + wi * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {wi < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
