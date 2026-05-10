import { ChatMock } from "@/components/dashboard/ChatMock";
import { AppShell } from "@/components/layout/AppShell";
import { MapMock } from "@/components/map/MapMock";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { getDecarbonizationScenario } from "@/lib/api";

export default async function CopilotPage() {
  const scenario = await getDecarbonizationScenario();

  return (
    <AppShell>
      <section className="page-heading">
        <span className="eyebrow">Inteligência analítica institucional</span>
        <h1>Copiloto PID</h1>
        <p>
          Pergunte sobre custo, tempo, alavancas e regiões prioritárias para
          descarbonização.
        </p>
      </section>

      <section className="copilot-layout">
        <div className="copilot-context">
          <h2>Contexto da análise</h2>
          <MapMock interactive={false} mode="compact" />
          <div className="metric-grid metric-grid--three">
            <MetricCard
              label="Investimento estimado"
              value={scenario.estimatedInvestmentFormatted}
            />
            <MetricCard
              label="Prazo estimado"
              value={scenario.estimatedTimeline}
            />
            <MetricCard
              label="Emissões evitáveis"
              value={scenario.avoidedEmissionsFormatted}
            />
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
