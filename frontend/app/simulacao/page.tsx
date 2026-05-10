import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { getDecarbonizationScenario } from "@/lib/api";

export default async function SimulationPage() {
  const scenario = await getDecarbonizationScenario();

  return (
    <AppShell>
      <section className="page-heading">
        <span className="eyebrow">Simulação preliminar</span>
        <h1>Roraima — Simulação preliminar de descarbonização</h1>
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

      <div className="bottom-actions">
        <Button href="/mapa">Ver onde investir</Button>
      </div>
    </AppShell>
  );
}
