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
  const isDev = process.env.NODE_ENV === "development";
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      // Em dev: sem cache. Em build/prod: cache agressivo para SSG
      cache: isDev ? "no-store" : "force-cache",
      next: {
        // Revalida a cada 1h em produção (ISR)
        revalidate: isDev || isBuild ? false : 3600,
        tags: [path],
      },
    });
    if (!res.ok) {
      console.warn(`API Error ${res.status} on ${path} - Using fallback data`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    if (isBuild) {
      console.warn(`[BUILD] API unreachable on ${path} - Using fallback data`);
    } else {
      console.warn(`Network Error on ${path} - Using fallback data`);
    }
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
  return data ?? { sources: [] };
}

export async function getMethodology(): Promise<any | null> {
  const data = await fetchJson<any>("/api/decarbonization/methodology");
  return data ?? { content: "Metodologia em desenvolvimento." };
}
