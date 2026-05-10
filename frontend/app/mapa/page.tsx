import { RegionCard } from "@/components/dashboard/RegionCard";
import { AppShell } from "@/components/layout/AppShell";
import { LayerToggle } from "@/components/map/LayerToggle";
import { MapMock } from "@/components/map/MapMock";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { analysisLayers } from "@/data/layers";
import { featuredRegion, regions } from "@/data/regions";
import { formatPayback, formatShortInvestment } from "@/lib/format";

export default function MapPage() {
  const bestRegions = regions.slice(0, 3);

  return (
    <AppShell>
      <section className="page-heading page-heading--row">
        <div>
          <span className="eyebrow">Mapa de oportunidades</span>
          <h1>Roraima</h1>
          <p>
            Visualização indicativa para priorizar regiões de estudo técnico em usinas solares
            fotovoltaicas.
          </p>
        </div>
        <div className="page-actions">
          <Button href="/restricoes" variant="secondary">Ver restrições</Button>
          <Button href="/comparativo" variant="secondary">Comparar</Button>
          <Button href="/copiloto">Copiloto PID</Button>
        </div>
      </section>

      <section className="map-layout">
        <aside className="filter-panel" aria-label="Camadas de análise">
          <h2>Camadas</h2>
          {analysisLayers.map((layer) => (
            <LayerToggle
              active={layer.active}
              description={layer.description}
              key={layer.name}
              label={layer.name}
            />
          ))}
          <button className="more-filters" type="button">Mais filtros</button>
        </aside>

        <div className="map-stage">
          <MapMock />
        </div>

        <aside className="results-panel" aria-label="Melhores regiões">
          <div className="results-panel__summary">
            <span className="eyebrow">Melhor região identificada</span>
            <h2>{featuredRegion.name}</h2>
            <div className="summary-metrics">
              <MetricCard label="Score" tone="navy" value={`${featuredRegion.score}/100`} />
              <MetricCard label="Payback" value={formatPayback(featuredRegion.payback)} />
              <MetricCard
                label="Investimento"
                value={formatShortInvestment(featuredRegion.investment)}
              />
            </div>
          </div>

          <div className="region-list">
            <h2>Melhores regiões</h2>
            {bestRegions.map((region, index) => (
              <RegionCard key={region.slug} rank={index + 1} region={region} />
            ))}
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
