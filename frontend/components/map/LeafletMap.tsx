"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import type { Region } from "@/data/regions";

const STATUS_COLORS: Record<Region["status"], string> = {
  good: "#4d4e03",
  attention: "#d9b300",
  critical: "#550c18",
};

function createRegionIcon(status: Region["status"]) {
  const color = STATUS_COLORS[status] ?? "#52606c";
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `<span class="leaflet-marker-dot" style="background:${color};border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,0.25);"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
}

const CENTER: [number, number] = [2.5, -60.5];
const ZOOM = 7;

type ActiveLayers = {
  solar: boolean;
  infra: boolean;
  restrictions: boolean;
};

type LeafletMapProps = {
  regions: Region[];
  activeLayers: ActiveLayers;
};

function parseKm(value: string): number {
  const match = value.match(/(\d+)/);
  return match && match[1] ? parseInt(match[1], 10) : 999;
}

export function LeafletMap({ regions, activeLayers }: LeafletMapProps) {
  const router = useRouter();

  const visibleRegions = useMemo(() => {
    return regions.filter((region) => {
      if (activeLayers.solar) {
        if (region.solarPotential === "Médio") return false;
      }
      if (activeLayers.infra) {
        if (parseKm(region.gridDistance) > 40) return false;
      }
      if (activeLayers.restrictions) {
        if (region.risk === "Alto") return false;
      }
      return true;
    });
  }, [regions, activeLayers]);

  const handleMarkerClick = useCallback(
    (slug: string) => {
      router.push(`/regiao/${slug}`);
    },
    [router]
  );

  return (
    <MapContainer
      center={CENTER}
      zoom={ZOOM}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", minHeight: "560px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {visibleRegions.map((region) => (
        <Marker
          key={region.slug}
          position={region.latLng}
          icon={createRegionIcon(region.status)}
          eventHandlers={{
            click: () => handleMarkerClick(region.slug),
          }}
        >
          <Popup>
            <div className="leaflet-popup-content-inner">
              <strong>{region.name}</strong>
              <div className="leaflet-popup-meta">
                <span>Score: {region.score}/100</span>
                <span>Payback: {region.payback} anos</span>
              </div>
              <button
                className="leaflet-popup-btn"
                onClick={() => handleMarkerClick(region.slug)}
                type="button"
              >
                Ver análise
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
