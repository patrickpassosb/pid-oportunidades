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

const PRODUCTION_API_URL = "https://pid-oportunidades.onrender.com";
const LOCAL_API_URL = "http://localhost:8000";
const REVALIDATE_SECONDS = 3600;

function normalizeBaseUrl(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

function getBaseUrl(): string {
  const fallbackUrl =
    process.env.NODE_ENV === "production" ? PRODUCTION_API_URL : LOCAL_API_URL;

  return normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL || fallbackUrl);
}

export const API_BASE_URL = getBaseUrl();

async function fetchJson<T>(path: string): Promise<T | null> {
  const isDev = process.env.NODE_ENV === "development";
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      // Em dev: sem cache. Em produção: cache com ISR para manter dados do backend atualizados.
      cache: isDev ? "no-store" : "force-cache",
      next: isDev
        ? undefined
        : {
            revalidate: REVALIDATE_SECONDS,
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
