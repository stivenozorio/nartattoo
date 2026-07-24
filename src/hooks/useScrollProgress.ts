"use client";

import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";

/** Returns a spring-smoothed 0-1 scroll progress value and a scrolled flag for header blur. */
export function useScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    mass: 0.3,
  });
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return { scaleX, scrolled };
}
