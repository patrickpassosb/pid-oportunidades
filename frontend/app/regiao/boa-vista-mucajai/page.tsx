import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { featuredRegion } from "@/data/regions";
import { formatInvestment, formatPayback } from "@/lib/format";

export default function RegionDetailPage() {
  return (
    <AppShell active="mapa" summary="Boa Vista — Mucajaí">
      <section className="region-hero">
        <div>
          <span className="eyebrow">Análise da região selecionada</span>
          <h1>Boa Vista — Mucajaí</h1>
          <p>Análise preliminar para usina solar fotovoltaica de 5 MW</p>
        </div>
        <ScoreBadge score={featuredRegion.score} status={featuredRegion.status} />
      </section>

      <section className="metric-grid metric-grid--four" aria-label="Indicadores principais">
        <MetricCard
          label="Investimento estimado"
          tone="navy"
          value={formatInvestment(featuredRegion.investment)}
        />
        <MetricCard label="Payback estimado" value={formatPayback(featuredRegion.payback)} />
        <MetricCard label="Risco socioambiental" tone="wine" value={featuredRegion.risk} />
        <MetricCard label="CO₂ evitado" tone="olive" value={featuredRegion.co2Avoided} />
      </section>

      <section className="detail-layout">
        <div className="analysis-section">
          <h2>Decomposição do score</h2>
          <div className="score-bars">
            {featuredRegion.scoreBreakdown.map((item) => (
              <div className="score-row" key={item.label}>
                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
                <progress max="100" value={item.value} />
              </div>
            ))}
          </div>
        </div>

        <div className="analysis-section">
          <h2>Por que essa região?</h2>
          <ul className="check-list">
            {featuredRegion.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>

        <div className="analysis-section analysis-section--warning">
          <h2>Atenções necessárias</h2>
          <ul>
            {featuredRegion.cautions.map((caution) => (
              <li key={caution}>{caution}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="bottom-actions">
        <Button href="/relatorio">Gerar relatório</Button>
        <Button href="/comparativo" variant="secondary">Comparar regiões</Button>
        <Button href="/restricoes" variant="ghost">Ver restrições</Button>
      </div>
    </AppShell>
  );
}
