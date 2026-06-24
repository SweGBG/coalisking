"use client";
import { useEffect } from "react";

/**
 * Global reveal-observer.
 * Hanterar .fade-in (legacy), [data-reveal] (riktningsstyrt) och .ember-sheen.
 * Re-observerar vid DOM-byten (språkbyte, menyfilter). Respekterar reducerad rörelse.
 */
export default function ScrollFadeIn() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SEL = ".fade-in, [data-reveal], .ember-sheen";

    if (reduce) {
      document.querySelectorAll<HTMLElement>(SEL)
        .forEach(el => el.classList.add("visible", "is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("visible", "is-visible");
          obs.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const observe = () =>
      document.querySelectorAll<HTMLElement>(SEL).forEach(el => {
        if (!el.classList.contains("visible") && !el.classList.contains("is-visible")) {
          io.observe(el);
        }
      });

    observe();
    const mo = new MutationObserver(() => observe());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  return null;
}
