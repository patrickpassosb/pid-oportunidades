import Link from "next/link";

import { Button } from "@/components/ui/Button";

type AppHeaderProps = {
  summary?: string;
  simple?: boolean;
};

export function AppHeader({ summary, simple = false }: AppHeaderProps) {
  return (
    <header className="app-header">
      <Link aria-label="Ir para o início" className="app-header__brand" href="/">
        <img alt="PID" className="app-header__logo" src="/assets/pid-logo.svg" />
      </Link>
      <div className="app-header__center">
        <span className="app-header__feature">Onde Investir?</span>
        {summary ? <span className="app-header__summary">{summary}</span> : null}
      </div>
      {!simple ? (
        <nav aria-label="Navegação principal" className="app-header__nav">
          <Link href="/mapa">Mapa</Link>
          <Link href="/comparativo">Comparativo</Link>
          <Link href="/copiloto">Copiloto PID</Link>
        </nav>
      ) : null}
      <Button className="app-header__cta" href="/configuracao" variant="primary">
        Analisar
      </Button>
    </header>
  );
}
