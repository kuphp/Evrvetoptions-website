"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Cat, Dog } from "lucide-react";

/**
 * A playful cat being chased by a dog along the bottom of the viewport.
 * Their horizontal position is tied to page scroll progress, so they run
 * forward as you scroll down and their legs "run" only while scrolling.
 * Home page only, desktop only, purely decorative.
 */
export function ScrollPets() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    mass: 0.6,
  });

  // Cat leads, dog trails a little behind. Kept clear of the chat widget.
  const catX = useTransform(smooth, [0, 1], ["3vw", "80vw"]);
  const dogX = useTransform(smooth, [0, 1], ["-7vw", "68vw"]);

  const velocity = useVelocity(smooth);
  const [running, setRunning] = useState(false);

  useMotionValueEvent(velocity, "change", (v) => {
    setRunning(Math.abs(v) > 0.0015);
  });

  const bob = running
    ? { y: [0, -8, 0], rotate: [0, -3, 0] }
    : { y: [0, -2.5, 0], rotate: 0 };

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-3 z-30 hidden h-14 md:block"
    >
      {/* Dog — the chaser */}
      <motion.div style={{ x: dogX }} className="absolute bottom-0">
        <motion.div
          animate={bob}
          transition={{
            duration: running ? 0.34 : 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full border bg-card/85 shadow-soft backdrop-blur"
        >
          <Dog className="h-7 w-7 -scale-x-100 text-brand-blue" strokeWidth={2} />
        </motion.div>
      </motion.div>

      {/* Cat — the runner */}
      <motion.div style={{ x: catX }} className="absolute bottom-0">
        <motion.div
          animate={bob}
          transition={{
            duration: running ? 0.28 : 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full border bg-card/85 shadow-soft backdrop-blur"
        >
          <Cat className="h-6.5 w-6.5 -scale-x-100 text-brand-green" strokeWidth={2} />
        </motion.div>
      </motion.div>
    </div>
  );
}
