import { featuredRegion } from "./regions";
import type { ReportData } from "@/lib/types";

export const reportSections = [
  {
    title: "Localização recomendada",
    body: `${featuredRegion.name} concentra o melhor equilíbrio preliminar entre potencial solar, conexão elétrica e menor incidência aparente de restrições críticas para uma usina de 5 MW.`,
  },
  {
    title: "Justificativa",
    body: "A análise indicativa combina score técnico, distância estimada da rede, potencial de geração e sensibilidade socioambiental. O resultado recomenda avançar para estudo técnico, sem caracterizar viabilidade definitiva.",
  },
  {
    title: "Riscos principais",
    body: "Os principais pontos de atenção são validação fundiária, custo de conexão, consulta adequada quando aplicável e confirmação das camadas ambientais em fontes oficiais.",
  },
  {
    title: "Próximos passos",
    body: "Executar due diligence territorial, solicitar estudo de conexão, validar CAPEX com fornecedores locais e iniciar triagem jurídica e ambiental especializada.",
  },
  {
    title: "Fontes de dados",
    body: "Base mockada para demo de hackathon, simulando camadas de irradiação solar, infraestrutura elétrica, logística, restrições socioambientais e premissas financeiras preliminares.",
  },
];

export const reportDataFallback: ReportData = {
  title: "Plano Preliminar de Descarbonização",
  subtitle: "Setor de Energia — Estado de Roraima",
  executiveSummary:
    "Roraima apresenta dependência crítica de geração térmica fóssil devido à isolação do SIN. A trajetória preliminar de descarbonização envolve a expansão de usinas solares distribuídas, armazenamento com baterias, modernização da rede e eficiência energética em cargas públicas. O investimento estimado é de R$ 420 milhões, com prazo de 6 a 8 anos e potencial de evitar 180 mil tCO₂/ano.",
  estimatedInvestment: 420000000,
  estimatedInvestmentFormatted: "R$ 420 milhões",
  estimatedTimeline: "6 a 8 anos",
  timelineMinYears: 6,
  timelineMaxYears: 8,
  avoidedEmissions: 180000,
  avoidedEmissionsFormatted: "180 mil tCO₂/ano",
  priorityRegion: {
    id: "boa-vista-mucajai",
    name: "Boa Vista — Mucajaí",
    score: 78,
    recommendation: "Avançar para estudo técnico",
  },
  levers: [
    {
      id: "solar-distribuida",
      name: "Usinas solares distribuídas",
      impact: "Alto",
      cost: "Médio",
      timeline: "2 a 4 anos",
      estimatedInvestment: 160000000,
      estimatedInvestmentFormatted: "R$ 160 milhões",
    },
    {
      id: "baterias",
      name: "Armazenamento com baterias",
      impact: "Médio",
      cost: "Alto",
      timeline: "3 a 5 anos",
      estimatedInvestment: 110000000,
      estimatedInvestmentFormatted: "R$ 110 milhões",
    },
    {
      id: "modernizacao-rede",
      name: "Modernização da rede",
      impact: "Alto",
      cost: "Alto",
      timeline: "5 a 8 anos",
      estimatedInvestment: 120000000,
      estimatedInvestmentFormatted: "R$ 120 milhões",
    },
    {
      id: "eficiencia-publica",
      name: "Eficiência energética em cargas públicas",
      impact: "Médio",
      cost: "Baixo",
      timeline: "1 a 2 anos",
      estimatedInvestment: 30000000,
      estimatedInvestmentFormatted: "R$ 30 milhões",
    },
  ],
  risks: [
    {
      id: "terras-indigenas",
      name: "Terras indígenas",
      severity: "critical",
      description: "Requer consulta adequada e evitar sobreposição em estudos posteriores.",
    },
    {
      id: "custo-conexao",
      name: "Custo de conexão elétrica",
      severity: "attention",
      description: "Distância da rede pode elevar CAPEX em regiões mais remotas.",
    },
    {
      id: "validacao-fundiaria",
      name: "Validação fundiária",
      severity: "attention",
      description: "Due diligence de titularidade e posse necessária antes de investimentos.",
    },
  ],
  nextSteps: [
    "Executar due diligence territorial nas regiões prioritárias",
    "Solicitar estudo de conexão à concessionária local",
    "Validar CAPEX com fornecedores e EPCs locais",
    "Iniciar triagem jurídica e ambiental especializada",
    "Elaborar estudo técnico detalhado para Boa Vista — Mucajaí",
  ],
};
