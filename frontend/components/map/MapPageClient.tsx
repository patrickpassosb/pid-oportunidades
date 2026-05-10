"use client";

import { useState } from "react";
import { MapClient } from "./MapClient";
import { LayerToggle } from "./LayerToggle";
import { RegionCard } from "@/components/dashboard/RegionCard";
import { MetricCard } from "@/components/ui/MetricCard";
import { analysisLayers } from "@/data/layers";
import type { Region } from "@/data/regions";
import type { InvestmentRegion } from "@/lib/types";

type MapPageClientProps = {
  mapRegions: Region[];
  featuredRegion: InvestmentRegion;
  bestRegions: InvestmentRegion[];
};

const LAYER_KEYS = ["solar", "infra", "restrictions"] as const;
type LayerKey = (typeof LAYER_KEYS)[number];

export function MapPageClient({
  mapRegions,
  featuredRegion,
  bestRegions,
}: MapPageClientProps) {
  const [activeLayers, setActiveLayers] = useState<Record<LayerKey, boolean>>({
    solar: true,
    infra: true,
    restrictions: true,
  });

  return (
    <>
      <section className="map-layout">
        <aside className="filter-panel" aria-label="Camadas de análise">
          <h2>Camadas</h2>
          {analysisLayers.map((layer, index) => {
            const key = LAYER_KEYS[index] as LayerKey;
            return (
              <LayerToggle
                active={activeLayers[key]}
                description={layer.description}
                key={layer.name}
                label={layer.name}
                onChange={(checked) =>
                  setActiveLayers((prev) => ({ ...prev, [key]: checked }))
                }
              />
            );
          })}
          <button className="more-filters" type="button">
            Mais filtros
          </button>
        </aside>

        <div className="map-stage">
          <MapClient
            regions={mapRegions}
            activeLayers={{
              solar: activeLayers.solar,
              infra: activeLayers.infra,
              restrictions: activeLayers.restrictions,
            }}
          />
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
    </>
  );
}
