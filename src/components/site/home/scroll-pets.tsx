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

/**
 * A cat fleeing a dog along the bottom of the viewport. Their horizontal
 * position is tied to page scroll, so they run as you scroll down. The run
 * (bounce + squash/stretch + ground shadow) only plays while scrolling.
 * Home page only, desktop only, purely decorative.
 */

const RUN = {
  body: {
    y: [0, -13, 0],
    scaleY: [0.9, 1.06, 0.9],
    scaleX: [1.08, 0.97, 1.08],
    rotate: [-3, 3, -3],
  },
  shadow: { scaleX: [1, 0.6, 1], opacity: [0.3, 0.12, 0.3] },
};

const IDLE = {
  body: { y: [0, -3, 0], scaleY: 1, scaleX: 1, rotate: 0 },
  shadow: { scaleX: 1, opacity: 0.22 },
};

function Pet({
  emoji,
  running,
  runDuration,
}: {
  emoji: string;
  running: boolean;
  runDuration: number;
}) {
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="text-[2rem] leading-none will-change-transform"
        style={{ transformOrigin: "bottom center" }}
        animate={running ? RUN.body : IDLE.body}
        transition={{
          duration: running ? runDuration : 2.4,
          repeat: Infinity,
          ease: running ? "easeInOut" : "easeInOut",
        }}
      >
        {emoji}
      </motion.div>
      {/* ground shadow */}
      <motion.div
        className="mt-0.5 h-1.5 w-7 rounded-[50%] bg-black/40 blur-[1.5px] dark:bg-black/60"
        style={{ transformOrigin: "center" }}
        animate={running ? RUN.shadow : IDLE.shadow}
        transition={{
          duration: running ? runDuration : 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export function ScrollPets() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    mass: 0.6,
  });

  // They flee to the LEFT as you scroll down (emoji face left by default).
  // The dog trails behind the cat (to its right).
  const catX = useTransform(smooth, [0, 1], ["80vw", "4vw"]);
  const dogX = useTransform(smooth, [0, 1], ["90vw", "16vw"]);

  const velocity = useVelocity(smooth);
  const [running, setRunning] = useState(false);

  useMotionValueEvent(velocity, "change", (v) => {
    setRunning(Math.abs(v) > 0.0015);
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-2 z-30 hidden h-16 md:block"
    >
      {/* Dog — the chaser */}
      <motion.div style={{ x: dogX }} className="absolute bottom-0">
        <Pet emoji="🐕" running={running} runDuration={0.34} />
      </motion.div>

      {/* Cat — the runner */}
      <motion.div style={{ x: catX }} className="absolute bottom-0">
        <Pet emoji="🐈" running={running} runDuration={0.28} />
      </motion.div>
    </div>
  );
}
