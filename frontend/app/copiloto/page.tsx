import { ChatMock } from "@/components/dashboard/ChatMock";
import { AppShell } from "@/components/layout/AppShell";
import { MapMock } from "@/components/map/MapMock";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { featuredRegion } from "@/data/regions";

export default function CopilotPage() {
  return (
    <AppShell active="copiloto" summary="Copiloto PID">
      <section className="page-heading">
        <span className="eyebrow">Inteligência analítica institucional</span>
        <h1>Copiloto PID</h1>
        <p>Pergunte sobre viabilidade, restrições, retorno estimado ou comparação entre regiões.</p>
      </section>

      <section className="copilot-layout">
        <div className="copilot-context">
          <h2>Contexto da análise</h2>
          <MapMock interactive={false} mode="compact" />
          <div className="metric-grid metric-grid--three">
            <MetricCard label="Região foco" value={featuredRegion.name} />
            <MetricCard label="Score" tone="navy" value={`${featuredRegion.score}/100`} />
            <MetricCard label="Risco" tone="wine" value={featuredRegion.risk} />
          </div>
          <Button href="/relatorio">Gerar relatório</Button>
        </div>

        <aside className="copilot-chat" aria-label="Chat mockado do Copiloto PID">
          <ChatMock />
        </aside>
      </section>
    </AppShell>
  );
}
