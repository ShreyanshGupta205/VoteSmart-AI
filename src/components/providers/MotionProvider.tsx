"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
