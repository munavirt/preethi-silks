"use client";

import { useEffect } from "react";

export function MotionInit() {
  // Enables the hidden-until-revealed state only when JS can animate it back in.
  useEffect(() => {
    document.documentElement.classList.add("js-motion");
    return () => document.documentElement.classList.remove("js-motion");
  }, []);

  return null;
}
