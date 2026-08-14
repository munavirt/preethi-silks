"use client";
import { useEffect, useRef } from "react";

/**
 * Scroll-triggered reveal for `.reveal` elements inside the returned ref.
 * Loads GSAP + ScrollTrigger only in the browser, and respects reduced motion.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const targets = el.querySelectorAll<HTMLElement>(".reveal");
      const ctx = gsap.context(() => {
        targets.forEach((t) => {
          gsap.to(t, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: Number(t.dataset["delay"] ?? 0),
            scrollTrigger: { trigger: t, start: "top 88%", once: true },
          });
        });
      }, el);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return ref;
}
