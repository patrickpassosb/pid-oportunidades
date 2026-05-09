import Link from "next/link";

import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", label: "Início", key: "inicio" },
  { href: "/configuracao", label: "Configuração", key: "configuracao" },
  { href: "/mapa", label: "Mapa", key: "mapa" },
  { href: "/restricoes", label: "Restrições", key: "restricoes" },
  { href: "/comparativo", label: "Comparativo", key: "comparativo" },
  { href: "/copiloto", label: "Copiloto PID", key: "copiloto" },
  { href: "/relatorio", label: "Relatório", key: "relatorio" },
];

export function Sidebar({ active }: { active?: string }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__title">
        <span className="sidebar__icon">P</span>
        <div>
          <strong>PID</strong>
          <span>Plataforma Interativa de Descarbonização</span>
        </div>
      </div>
      <nav aria-label="Fluxo Onde Investir" className="sidebar__nav">
        {navItems.map((item) => (
          <Link
            className={cn("sidebar__link", active === item.key && "sidebar__link--active")}
            href={item.href}
            key={item.key}
          >
            <span aria-hidden="true" className="sidebar__dot" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="sidebar__note">
        <strong>Análise indicativa</strong>
        <span>Dados mockados para demonstração funcional de hackathon.</span>
      </div>
    </aside>
  );
}
