import { decarbonizationScenario } from "@/data/decarbonizationScenario";
import { investmentRegionsFallback } from "@/data/regions";
import { restrictionLayersFallback } from "@/data/restrictions";
import { reportDataFallback } from "@/data/report";
import type {
  DecarbonizationScenario,
  InvestmentRegionsResponse,
  RestrictionLayersResponse,
  ReportData,
} from "@/lib/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getDecarbonizationScenario(): Promise<DecarbonizationScenario> {
  const data = await fetchJson<DecarbonizationScenario>(
    "/api/decarbonization/scenario/roraima"
  );
  return data ?? decarbonizationScenario;
}

export async function getInvestmentRegions(): Promise<InvestmentRegionsResponse> {
  const data = await fetchJson<InvestmentRegionsResponse>(
    "/api/decarbonization/regions/roraima"
  );
  return data ?? investmentRegionsFallback;
}

export async function getRestrictionLayers(): Promise<RestrictionLayersResponse> {
  const data = await fetchJson<RestrictionLayersResponse>(
    "/api/decarbonization/restrictions/roraima"
  );
  return data ?? restrictionLayersFallback;
}

export async function getReportData(): Promise<ReportData> {
  const data = await fetchJson<ReportData>(
    "/api/decarbonization/report/roraima"
  );
  return data ?? reportDataFallback;
}
