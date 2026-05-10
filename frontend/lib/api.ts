import type {
  DecarbonizationScenario,
  InvestmentRegionsResponse,
  RestrictionLayersResponse,
  ReportData,
  DatasetsStatusResponse,
} from "@/lib/types";

// Base URL that respects environment variables, pointing to Railway in production
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      // Em dev, evitamos cache do Next.js para não mascarar problemas de conexão.
      // Em prod, podemos manter no-store para garantir dados frescos da ingestão.
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`API Error ${res.status} on ${path}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`Network Error on ${path}:`, err);
    return null;
  }
}

export async function getDecarbonizationScenario(): Promise<DecarbonizationScenario | null> {
  return await fetchJson<DecarbonizationScenario>("/api/decarbonization/scenario/roraima");
}

export async function getInvestmentRegions(): Promise<InvestmentRegionsResponse | null> {
  return await fetchJson<InvestmentRegionsResponse>("/api/decarbonization/regions/roraima");
}

export async function getRestrictionLayers(): Promise<RestrictionLayersResponse | null> {
  return await fetchJson<RestrictionLayersResponse>("/api/decarbonization/restrictions/roraima");
}

export async function getReportData(): Promise<ReportData | null> {
  return await fetchJson<ReportData>("/api/decarbonization/report/roraima");
}

export async function getDatasetsStatus(): Promise<DatasetsStatusResponse | null> {
  return await fetchJson<DatasetsStatusResponse>("/api/datasets/status");
}

export async function getMethodology(): Promise<any | null> {
  return await fetchJson<any>("/api/decarbonization/methodology");
}
