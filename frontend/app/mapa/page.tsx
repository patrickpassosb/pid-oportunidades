import { RegionCard } from "@/components/dashboard/RegionCard";
import { AppShell } from "@/components/layout/AppShell";
import { LayerToggle } from "@/components/map/LayerToggle";
import { MapMock } from "@/components/map/MapMock";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { analysisLayers } from "@/data/layers";
import { getInvestmentRegions } from "@/lib/api";
import { ErrorState } from "@/components/ui/ErrorState";
import { DataQualityBadge } from "@/components/ui/DataQualityBadge";

export default async function MapPage() {
  const data = await getInvestmentRegions();
  
  if (!data || !data.regions) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto pt-12">
          <ErrorState message="Não foi possível carregar as regiões de investimento do backend." />
        </div>
      </AppShell>
    );
  }

  const bestRegions = data.regions.slice(0, 4);
  const featuredRegion = data.regions[0];

  return (
    <AppShell>
      <section className="page-heading page-heading--row">
        <div>
          <span className="eyebrow">Mapa de oportunidades</span>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="mb-0">Onde investir para executar esse plano?</h1>
            <DataQualityBadge quality={data.regions[0]?.dataQuality?.demand} />
          </div>
          <p>
            Regiões com maior potencial preliminar para projetos solares que
            contribuem para a descarbonização de Roraima.
          </p>
        </div>
        <div className="page-actions">
          <Button href="/restricoes" variant="secondary">
            Ver restrições
          </Button>
          <Button href="/comparativo" variant="secondary">
            Comparar
          </Button>
          <Button href="/copiloto">Copiloto PID</Button>
        </div>
      </section>

      <div className="best-option mb-6">
        <span>Plano selecionado</span>
        <h2>Descarbonização de Roraima</h2>
        <p>
          Energia solar e infraestrutura limpa — estimativa indicativa de custo,
          tempo e regiões prioritárias.
        </p>
      </div>

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
          <button className="more-filters" type="button">
            Mais filtros
          </button>
        </aside>

        <div className="map-stage">
          <MapMock />
        </div>

        <aside className="results-panel" aria-label="Melhores regiões">
          <div className="results-panel__summary">
            <span className="eyebrow">Melhor região identificada</span>
            <h2>{featuredRegion?.name}</h2>
            <div className="summary-metrics">
              <MetricCard
                label="Score"
                tone="navy"
                value={`${featuredRegion?.score}/100`}
              />
              <MetricCard
                label="Payback"
                value={`${featuredRegion?.payback} anos`}
              />
              <MetricCard
                label="Investimento"
                value={featuredRegion?.estimatedInvestmentFormatted ?? "Indeterminado"}
              />
            </div>
          </div>

          <div className="region-list">
            <h2>Melhores regiões</h2>
            {bestRegions.map((region, index) => (
              <RegionCard key={region.id} rank={index + 1} region={region} />
            ))}
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
