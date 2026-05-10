import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { CopilotWidget } from "@/components/copilot/CopilotWidget";

import "./globals.css";

export const metadata: Metadata = {
  title: "PID — Onde Investir?",
  description:
    "Plataforma inteligente de predicação do custo da descarbonização em Roraima",
icons: {
    icon: "/assets/favicon-32x32.png",
    apple: "/assets/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-background text-on-background antialiased flex font-body-md"
        suppressHydrationWarning
      >
        <Sidebar />
        <main className="flex-1 min-h-screen flex flex-col ml-0 md:ml-72 transition-all">
          <AppHeader />
          {children}
        </main>
        <CopilotWidget />
      </body>
    </html>
  );
}
