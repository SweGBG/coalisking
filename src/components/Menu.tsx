"use client";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Menu.module.css";

export default function Menu() {
  const { lang } = useLang();
  const tr = t[lang].menu;
  const [active, setActive] = useState(0);

  const filtered = active === 0 ? tr.items : tr.items.filter(i => i.cat === tr.cats[active]);

  return (
    <section className={styles.section} id="meny">
      <div className={styles.header}>
        <div className={styles.eyebrow}>{tr.eyebrow}</div>
        <h2 className={styles.title}>{tr.title}</h2>
        <p className={styles.sub}>{tr.sub}</p>
      </div>

      <div className={styles.filters}>
        {tr.cats.map((cat, i) => (
          <button key={cat} className={`${styles.filter} ${active === i ? styles.filterActive : ""}`} onClick={() => setActive(i)}>
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((item, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.cardName}>{item.name}</div>
              {item.tag && <span className={`${styles.tag} ${item.tag === "Kung" || item.tag === "King" ? styles.tagKing : item.tag === "Signatur" || item.tag === "Signature" ? styles.tagSig : styles.tagPop}`}>{item.tag}</span>}
            </div>
            <div className={styles.cardDesc}>{item.desc}</div>
            <div className={styles.cardFooter}>
              <div className={styles.cardCat}>{item.cat}</div>
              <div className={styles.cardPrice}>{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
