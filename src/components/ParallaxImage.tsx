"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface ParallaxImageProps extends Omit<ImageProps, "className"> {
  wrapperClassName?: string;
  className?: string;
  speed?: number;
}

export default function ParallaxImage({
  wrapperClassName = "",
  className = "",
  speed = 0.15,
  alt,
  ...rest
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${wrapperClassName}`}>
      <motion.div
        className="absolute inset-[-12%]"
        style={reduce ? undefined : { y }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        <Image alt={alt} className={`h-full w-full object-cover ${className}`} {...rest} />
      </motion.div>
    </div>
  );
}
