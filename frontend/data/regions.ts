export type RegionStatus = "good" | "attention" | "critical";
export type SocioEnvironmentalRisk = "Baixo" | "Médio" | "Alto";

export type Region = {
  slug: string;
  name: string;
  shortName: string;
  score: number;
  payback: number;
  investment: number;
  risk: SocioEnvironmentalRisk;
  status: RegionStatus;
  recommendation: string;
  solarPotential: string;
  gridDistance: string;
  co2Avoided: string;
  annualGeneration: string;
  estimatedRevenue: string;
  coordinates: {
    x: number;
    y: number;
  };
  scoreBreakdown: Array<{
    label: string;
    value: number;
  }>;
  reasons: string[];
  cautions: string[];
};

export const regions: Region[] = [
  {
    slug: "boa-vista-mucajai",
    name: "Boa Vista — Mucajaí",
    shortName: "Boa Vista — Mucajaí",
    score: 78,
    payback: 6.8,
    investment: 18.5,
    risk: "Médio",
    status: "good",
    recommendation: "Avançar para estudo técnico",
    solarPotential: "Alto",
    gridDistance: "18 km",
    co2Avoided: "4.200 t/ano",
    annualGeneration: "8.700 MWh/ano",
    estimatedRevenue: "R$ 2,7 milhões/ano",
    coordinates: { x: 47, y: 31 },
    scoreBreakdown: [
      { label: "Potencial solar", value: 88 },
      { label: "Infraestrutura elétrica", value: 82 },
      { label: "Socioambiental", value: 64 },
      { label: "Logística", value: 76 },
      { label: "Demanda local", value: 71 },
      { label: "Retorno estimado", value: 74 },
    ],
    reasons: [
      "Bom potencial solar",
      "Proximidade relativa da infraestrutura elétrica",
      "Menor sobreposição aparente com áreas de restrição crítica",
    ],
    cautions: [
      "Requer validação fundiária",
      "Não substitui licenciamento ambiental",
    ],
  },
  {
    slug: "rorainopolis",
    name: "Rorainópolis",
    shortName: "Rorainópolis",
    score: 71,
    payback: 7.4,
    investment: 19.2,
    risk: "Médio",
    status: "good",
    recommendation: "Avaliar conexão",
    solarPotential: "Alto",
    gridDistance: "26 km",
    co2Avoided: "3.950 t/ano",
    annualGeneration: "8.300 MWh/ano",
    estimatedRevenue: "R$ 2,5 milhões/ano",
    coordinates: { x: 58, y: 71 },
    scoreBreakdown: [
      { label: "Potencial solar", value: 84 },
      { label: "Infraestrutura elétrica", value: 68 },
      { label: "Socioambiental", value: 61 },
      { label: "Logística", value: 69 },
      { label: "Demanda local", value: 66 },
      { label: "Retorno estimado", value: 72 },
    ],
    reasons: [
      "Irradiação solar favorável",
      "Potencial para atender demanda regional",
      "Possibilidade de conexão mediante estudo dedicado",
    ],
    cautions: [
      "Requer estudo de capacidade de rede",
      "Requer due diligence fundiária",
    ],
  },
  {
    slug: "caracarai",
    name: "Caracaraí",
    shortName: "Caracaraí",
    score: 64,
    payback: 8.1,
    investment: 20.4,
    risk: "Médio",
    status: "attention",
    recommendation: "Requer análise logística",
    solarPotential: "Médio-alto",
    gridDistance: "34 km",
    co2Avoided: "3.650 t/ano",
    annualGeneration: "7.900 MWh/ano",
    estimatedRevenue: "R$ 2,3 milhões/ano",
    coordinates: { x: 49, y: 51 },
    scoreBreakdown: [
      { label: "Potencial solar", value: 76 },
      { label: "Infraestrutura elétrica", value: 62 },
      { label: "Socioambiental", value: 58 },
      { label: "Logística", value: 61 },
      { label: "Demanda local", value: 63 },
      { label: "Retorno estimado", value: 66 },
    ],
    reasons: [
      "Posição intermediária no estado",
      "Potencial solar adequado para estudo preliminar",
      "Pode atender cargas distribuídas",
    ],
    cautions: [
      "Distância de conexão pode elevar CAPEX",
      "Requer análise logística detalhada",
    ],
  },
  {
    slug: "pacaraima",
    name: "Pacaraima",
    shortName: "Pacaraima",
    score: 49,
    payback: 9.2,
    investment: 22.1,
    risk: "Alto",
    status: "critical",
    recommendation: "Evitar prospecção inicial",
    solarPotential: "Médio",
    gridDistance: "41 km",
    co2Avoided: "3.100 t/ano",
    annualGeneration: "7.100 MWh/ano",
    estimatedRevenue: "R$ 2,0 milhões/ano",
    coordinates: { x: 43, y: 16 },
    scoreBreakdown: [
      { label: "Potencial solar", value: 68 },
      { label: "Infraestrutura elétrica", value: 49 },
      { label: "Socioambiental", value: 32 },
      { label: "Logística", value: 52 },
      { label: "Demanda local", value: 47 },
      { label: "Retorno estimado", value: 51 },
    ],
    reasons: [
      "Pode ser relevante em cenários específicos",
      "Existe demanda isolada a avaliar",
      "Potencial solar ainda aproveitável",
    ],
    cautions: [
      "Risco socioambiental alto na triagem preliminar",
      "Não recomendada para prospecção inicial da demo",
    ],
  },
];

export const featuredRegion = regions[0]!;

export function getRegionBySlug(slug: string) {
  return regions.find((region) => region.slug === slug);
}
