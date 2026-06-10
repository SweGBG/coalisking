"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { lang, setLang } = useLang();
  const tr = t[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        {/* Left links — desktop */}
        <ul className={styles.linksLeft}>
          <li><a href="#meny">{tr.menu}</a></li>
          <li><a href="#om-oss">{tr.about}</a></li>
        </ul>

        {/* Center home */}
        <a href="#" className={styles.homeBtn}>Coal is King</a>

        {/* Right links — desktop */}
        <ul className={styles.linksRight}>
          <li><a href="#galleri">{tr.gallery}</a></li>
          <li><a href="#kontakt">{tr.contact}</a></li>
        </ul>

        {/* Desktop actions */}
        <div className={styles.desktopActions}>
          <div className={styles.langSwitch}>
            <button className={`${styles.langBtn} ${lang === "sv" ? styles.langActive : ""}`} onClick={() => setLang("sv")}>SE</button>
            <span className={styles.langDivider}>|</span>
            <button className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`} onClick={() => setLang("en")}>EN</button>
          </div>
          <a href="#kontakt" className={styles.bookBtn}>{tr.book}</a>
        </div>

        {/* Hamburger — öppnar mobilmenyn */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(true)}
          aria-label="Öppna meny"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── FULLSKÄRMS MOBILMENY OVERLAY ── */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>

        {/* Meny-header med logga och kryss-knapp för att stänga */}
        <div className={styles.mobileMenuHeader}>
          <a href="#" className={styles.homeBtn} onClick={() => setMenuOpen(false)}>Coal is King</a>

          <button
            className={`${styles.hamburger} ${styles.hamburgerOpen}`}
            onClick={() => setMenuOpen(false)}
            aria-label="Stäng meny"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Menyval */}
        <ul className={styles.mobileLinks}>
          <li><a href="#meny" onClick={() => setMenuOpen(false)}>{tr.menu}</a></li>
          <li><a href="#om-oss" onClick={() => setMenuOpen(false)}>{tr.about}</a></li>
          <li><a href="#galleri" onClick={() => setMenuOpen(false)}>{tr.gallery}</a></li>
          <li><a href="#kontakt" onClick={() => setMenuOpen(false)}>{tr.contact}</a></li>
        </ul>

        {/* Språkval */}
        <div className={styles.mobileLang}>
          <button className={`${styles.mobileLangBtn} ${lang === "sv" ? styles.mobileLangActive : ""}`} onClick={() => setLang("sv")}>
            🇸🇪 Svenska
          </button>
          <button className={`${styles.mobileLangBtn} ${lang === "en" ? styles.mobileLangActive : ""}`} onClick={() => setLang("en")}>
            🇺🇸 English
          </button>
        </div>

        {/* Bokningsknapp */}
        <a href="#kontakt" className={styles.mobileBookBtn} onClick={() => setMenuOpen(false)}>{tr.book}</a>
      </div>
    </>
  );
}