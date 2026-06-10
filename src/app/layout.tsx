import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";

export const metadata: Metadata = {
  title: "Coal is King — Authentic Charcoal Grill Stockholm",
  description: "Äkta kolgrillat kött i hjärtat av Stockholm. Ribeye, T-bone, revbensspjäll — grillat över riktigt kol vid 800°C.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body><LangProvider>{children}</LangProvider></body>
    </html>
  );
}
