"use client";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Footer.module.css";

export default function Footer() {
  const { lang } = useLang();
  const tr = t[lang].footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Coal is King" className={styles.logo} />
        <p className={styles.tagline}>{tr.tagline}</p>
        <div className={styles.divider} />
        <div className={styles.links}>
          <a href="#meny">{lang === "sv" ? "Meny" : "Menu"}</a>
          <a href="#om-oss">{lang === "sv" ? "Om oss" : "About"}</a>
          <a href="#galleri">{lang === "sv" ? "Galleri" : "Gallery"}</a>
          <a href="#kontakt">{lang === "sv" ? "Kontakt" : "Contact"}</a>
        </div>
        <div className={styles.bottom}>
          <span>{tr.copy}</span>
          <span>{tr.orgnr}</span>
        </div>
      </div>
    </footer>
  );
}
