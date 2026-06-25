"use client";
import { useEffect } from "react";

/**
 * Global reveal-observer.
 * Hanterar .fade-in (legacy), [data-reveal] (riktningsstyrt) och .ember-sheen.
 * Re-observerar vid DOM-byten (språkbyte, menyfilter). Respekterar reducerad rörelse.
 *
 * Robusthet:
 *  - element som redan är i/ovanför vyn visas direkt (annars fastnar de osynliga
 *    om de aldrig genererar ett "entering"-event — t.ex. nya kort efter filterbyte).
 *  - låg tröskel så höga element på små skärmar hinner triggas.
 *  - failsafe tvingar fram synlighet om något ändå skulle missas.
 */
export default function ScrollFadeIn() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SEL = ".fade-in, [data-reveal], .ember-sheen";

    const show = (el: HTMLElement) => {
      el.classList.add("visible", "is-visible");
    };

    if (reduce) {
      document.querySelectorAll<HTMLElement>(SEL).forEach(show);
      return;
    }

    const isDone = (el: HTMLElement) =>
      el.classList.contains("visible") || el.classList.contains("is-visible");

    // visa direkt det som redan är synligt (eller redan scrollats förbi)
    const revealInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll<HTMLElement>(SEL).forEach((el) => {
        if (isDone(el)) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.96 && r.bottom > 0) {
          show(el);
          io.unobserve(el);
        }
      });
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          show(el);
          obs.unobserve(el);
        });
      },
      // låg tröskel: stora kort/sektioner på mobil triggas pålitligt
      { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
    );

    const observe = () => {
      document.querySelectorAll<HTMLElement>(SEL).forEach((el) => {
        if (!isDone(el)) io.observe(el);
      });
    };

    // ordning: observera för framtida scroll, visa sedan allt som redan är inne
    observe();
    revealInView();

    // nya noder (språkbyte, menyfilter): observera + visa direkt det som är inne
    const mo = new MutationObserver(() => {
      observe();
      revealInView();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // visa även det som hamnar i vyn via vanlig scroll (backup till observern)
    const onScroll = () => revealInView();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // failsafe: inget får fastna osynligt
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(SEL).forEach((el) => {
        if (!isDone(el)) show(el);
      });
    }, 1800);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(failsafe);
    };
  }, []);

  return null;
}
