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
          "linear-gradient(90deg, #723740, #BC6D1F, #FFBC7D, #FCCAA5, #FFBC7D, #BC6D1F, #723740)",
      }}
    />
  );
}
