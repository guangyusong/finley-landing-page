"use client";

import { MotionConfig } from "framer-motion";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  // Respect the user's OS-level reduced motion preference for all framer-motion animations
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

