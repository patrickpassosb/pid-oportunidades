import type {
  DecarbonizationScenario,
  InvestmentRegionsResponse,
  RestrictionLayersResponse,
  ReportData,
  DatasetsStatusResponse,
} from "@/lib/types";

import { decarbonizationScenario as fallbackScenario } from "@/data/decarbonizationScenario";
import { investmentRegionsFallback } from "@/data/regions";
import { restrictionLayersFallback } from "@/data/restrictions";
import { reportDataFallback } from "@/data/report";

// Base URL that respects environment variables, pointing to Railway in production
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      // Usa no-store em dev, mas permite cache em prod para build estático
      cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    });
    if (!res.ok) {
      console.warn(`API Error ${res.status} on ${path} - Using fallback data`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`Network Error on ${path} - Using fallback data`);
    return null;
  }
}

export async function getDecarbonizationScenario(): Promise<DecarbonizationScenario | null> {
  const data = await fetchJson<DecarbonizationScenario>("/api/decarbonization/scenario/roraima");
  return data ?? fallbackScenario;
}

export async function getInvestmentRegions(): Promise<InvestmentRegionsResponse | null> {
  const data = await fetchJson<InvestmentRegionsResponse>("/api/decarbonization/regions/roraima");
  return data ?? investmentRegionsFallback;
}

export async function getRestrictionLayers(): Promise<RestrictionLayersResponse | null> {
  const data = await fetchJson<RestrictionLayersResponse>("/api/decarbonization/restrictions/roraima");
  return data ?? restrictionLayersFallback;
}

export async function getReportData(): Promise<ReportData | null> {
  const data = await fetchJson<ReportData>("/api/decarbonization/report/roraima");
  return data ?? reportDataFallback;
}

export async function getDatasetsStatus(): Promise<DatasetsStatusResponse | null> {
  const data = await fetchJson<DatasetsStatusResponse>("/api/datasets/status");
  return data ?? { status: "ok", last_update: new Date().toISOString(), datasets: [] };
}

export async function getMethodology(): Promise<any | null> {
  const data = await fetchJson<any>("/api/decarbonization/methodology");
  return data ?? { content: "Metodologia em desenvolvimento." };
}
