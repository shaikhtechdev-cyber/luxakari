"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #401215, #C98A6B, #E2AC8C, #C98A6B, #E2AC8C, #C98A6B, #401215)",
      }}
    />
  );
}
