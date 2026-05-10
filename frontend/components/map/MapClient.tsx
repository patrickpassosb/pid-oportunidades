"use client";

import dynamic from "next/dynamic";
import type { Region } from "@/data/regions";

type ActiveLayers = {
  solar: boolean;
  infra: boolean;
  restrictions: boolean;
};

type MapClientProps = {
  regions: Region[];
  activeLayers: ActiveLayers;
};

const LeafletMap = dynamic(
  () => import("./LeafletMap").then((mod) => mod.LeafletMap),
  { ssr: false }
);

export function MapClient({ regions, activeLayers }: MapClientProps) {
  return (
    <div className="leaflet-map-wrapper">
      <div className="leaflet-map-toolbar">
        <span>Roraima</span>
        <small>Solar fotovoltaica • 5 MW</small>
      </div>
      <div className="leaflet-map-canvas">
        <LeafletMap regions={regions} activeLayers={activeLayers} />
      </div>
      <div className="map-legend" aria-label="Legenda do mapa">
        <span><i className="legend-dot legend-dot--good" />Oportunidade preliminar</span>
        <span><i className="legend-dot legend-dot--attention" />Requer due diligence</span>
        <span><i className="legend-dot legend-dot--critical" />Restrição crítica</span>
      </div>
    </div>
  );
}
