import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { getDecarbonizationScenario } from "@/lib/api";
import { ErrorState } from "@/components/ui/ErrorState";
import { DataQualityBadge } from "@/components/ui/DataQualityBadge";

export default async function SimulationPage() {
  const scenario = await getDecarbonizationScenario();

  if (!scenario) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto pt-12">
          <ErrorState message="Não foi possível carregar o cenário de descarbonização do backend. Verifique se o servidor está rodando." />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="page-heading">
        <span className="eyebrow">Simulação preliminar</span>
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <h1 className="mb-0">Roraima — Simulação preliminar de descarbonização</h1>
          <DataQualityBadge quality={scenario.dataQuality?.overallConfidence === 'high' ? 'real' : 'estimated'} />
        </div>
        <p>
          Estimativa indicativa de custo, tempo e projetos prioritários para
          reduzir emissões e acelerar a transição energética no estado.
        </p>
      </section>

      <section
        className="metric-grid metric-grid--four mb-6"
        aria-label="Indicadores principais"
      >
        <MetricCard
          label="Investimento estimado"
          tone="navy"
          value={scenario.estimatedInvestmentFormatted}
        />
        <MetricCard
          label="Tempo estimado"
          tone="orange"
          value={scenario.estimatedTimeline}
        />
        <MetricCard
          label="Emissões evitáveis"
          tone="olive"
          value={scenario.avoidedEmissionsFormatted}
        />
        <MetricCard
          label="Projetos prioritários"
          tone="neutral"
          value={`${scenario.priorityProjects.length}`}
        />
      </section>

      <section className="mb-8">
        <h2 className="font-headline-md text-headline-md text-primary mb-4">
          Principais alavancas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenario.levers.map((lever) => (
            <div
              className="card p-6"
              key={lever.id}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[var(--navy-dark)] font-bold text-lg">
                  {lever.name}
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-[var(--gray-green-soft)] text-[var(--muted)]">
                  {lever.impact} impacto
                </span>
              </div>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
                {lever.description}
              </p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="block text-[var(--muted)] text-xs font-bold uppercase">
                    Custo
                  </span>
                  <span className="block text-[var(--navy-dark)] font-bold">
                    {lever.cost}
                  </span>
                </div>
                <div>
                  <span className="block text-[var(--muted)] text-xs font-bold uppercase">
                    Prazo
                  </span>
                  <span className="block text-[var(--navy-dark)] font-bold">
                    {lever.timeline}
                  </span>
                </div>
                <div>
                  <span className="block text-[var(--muted)] text-xs font-bold uppercase">
                    Investimento
                  </span>
                  <span className="block text-[var(--navy-dark)] font-bold">
                    {lever.estimatedInvestmentFormatted}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {scenario.dataQuality && (
        <section className="card p-6 mb-8">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Qualidade dos dados
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(scenario.dataQuality)
              .filter(([key]) => key !== "overallConfidence")
              .map(([key, value]) => {
                const mappedValue = value === "high" ? "real" : value === "medium" ? "partial" : (value as string);
                return (
                  <div key={key} className="flex items-center gap-2">
                    <DataQualityBadge quality={mappedValue} />
                    <span className="text-xs text-[var(--muted)] capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                );
              })}
          </div>
          <p className="text-[var(--muted)] text-sm mt-4">
            Os dados de geração vêm da ANEEL, irradiação solar da NASA POWER.
            Custos são estimados com base em referências de mercado.
            <a href="/metodologia" className="text-[var(--navy)] hover:underline ml-1">
              Ver metodologia completa →
            </a>
          </p>
        </section>
      )}

      <div className="bottom-actions">
        <Button href="/mapa">Ver onde investir</Button>
      </div>
    </AppShell>
  );
}
