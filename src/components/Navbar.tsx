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
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="#" className={styles.logo}>
          <img src="/logo.png" alt="Coal is King" />
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          <li><a href="#meny">{tr.menu}</a></li>
          <li><a href="#om-oss">{tr.about}</a></li>
          <li><a href="#galleri">{tr.gallery}</a></li>
          <li><a href="#kontakt">{tr.contact}</a></li>
        </ul>

        <div className={styles.right}>
          <div className={styles.langSwitch}>
            <button className={`${styles.langBtn} ${lang === "sv" ? styles.langActive : ""}`} onClick={() => setLang("sv")}>SE</button>
            <span className={styles.langDivider}>|</span>
            <button className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`} onClick={() => setLang("en")}>EN</button>
          </div>
          <a href="#kontakt" className={styles.bookBtn}>{tr.book}</a>
          <button className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Meny">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          <li><a href="#meny" onClick={() => setMenuOpen(false)}>{tr.menu}</a></li>
          <li><a href="#om-oss" onClick={() => setMenuOpen(false)}>{tr.about}</a></li>
          <li><a href="#galleri" onClick={() => setMenuOpen(false)}>{tr.gallery}</a></li>
          <li><a href="#kontakt" onClick={() => setMenuOpen(false)}>{tr.contact}</a></li>
        </ul>
        <div className={styles.mobileLang}>
          <button className={`${styles.mobileLangBtn} ${lang === "sv" ? styles.mobileLangActive : ""}`} onClick={() => setLang("sv")}>🇸🇪 Svenska</button>
          <button className={`${styles.mobileLangBtn} ${lang === "en" ? styles.mobileLangActive : ""}`} onClick={() => setLang("en")}>🇺🇸 English</button>
        </div>
        <a href="#kontakt" className={styles.mobileBookBtn} onClick={() => setMenuOpen(false)}>{tr.book}</a>
      </div>
      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
    </>
  );
}
