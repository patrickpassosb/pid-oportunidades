import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "PID — Onde Investir?",
  description:
    "Simulação frontend para identificar oportunidades preliminares de investimento em energia limpa em Roraima.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
