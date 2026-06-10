"use client";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Gallery.module.css";

const photos = [
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80&fit=crop&crop=center", span: "wide" },
  { src: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80&fit=crop&crop=center", span: "" },
  { src: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80&fit=crop&crop=center", span: "" },
  { src: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80&fit=crop&crop=center", span: "" },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80&fit=crop&crop=center", span: "wide" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop&crop=center", span: "" },
];

export default function Gallery() {
  const { lang } = useLang();
  const tr = t[lang].gallery;

  return (
    <section className={styles.section} id="galleri">
      <div className={styles.header}>
        <div className={styles.eyebrow}>{tr.eyebrow}</div>
        <h2 className={styles.title}>{tr.title}</h2>
      </div>
      <div className={styles.grid}>
        {photos.map((p, i) => (
          <div key={i} className={`${styles.cell} ${p.span === "wide" ? styles.wide : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={`Coal is King foto ${i + 1}`} />
            <div className={styles.cellOverlay} />
          </div>
        ))}
      </div>
    </section>
  );
}
