import type { DecarbonizationScenario } from "@/lib/types";

export const decarbonizationScenario: DecarbonizationScenario = {
  state: "Roraima",
  sector: "Energia",
  objective: "Reduzir dependência de geração fóssil e expandir renováveis",
  baselineProblem:
    "Roraima depende fortemente de geração térmica fóssil devido à isolação do sistema elétrico nacional, com alto custo e emissões.",
  estimatedInvestment: 420000000,
  estimatedInvestmentFormatted: "R$ 420 milhões",
  estimatedTimeline: "6 a 8 anos",
  timelineMinYears: 6,
  timelineMaxYears: 8,
  avoidedEmissions: 180000,
  avoidedEmissionsFormatted: "180 mil tCO₂/ano",
  priorityProjects: [
    "Usinas solares distribuídas",
    "Armazenamento com baterias",
    "Modernização da rede",
    "Eficiência energética em cargas públicas",
  ],
  levers: [
    {
      id: "solar-distribuida",
      name: "Usinas solares distribuídas",
      impact: "Alto",
      cost: "Médio",
      timeline: "2 a 4 anos",
      timelineMinYears: 2,
      timelineMaxYears: 4,
      estimatedInvestment: 160000000,
      estimatedInvestmentFormatted: "R$ 160 milhões",
      description:
        "Implantação de usinas solares fotovoltaicas de médio e grande porte próximas aos centros de carga, reduzindo a dependência de geração térmica.",
    },
    {
      id: "baterias",
      name: "Armazenamento com baterias",
      impact: "Médio",
      cost: "Alto",
      timeline: "3 a 5 anos",
      timelineMinYears: 3,
      timelineMaxYears: 5,
      estimatedInvestment: 110000000,
      estimatedInvestmentFormatted: "R$ 110 milhões",
      description:
        "Sistemas de armazenamento de energia (BESS) para firmar a geração solar e atender picos de demanda noturna.",
    },
    {
      id: "modernizacao-rede",
      name: "Modernização da rede",
      impact: "Alto",
      cost: "Alto",
      timeline: "5 a 8 anos",
      timelineMinYears: 5,
      timelineMaxYears: 8,
      estimatedInvestment: 120000000,
      estimatedInvestmentFormatted: "R$ 120 milhões",
      description:
        "Reforço e digitalização da infraestrutura de transmissão e distribuição para absorver novas fontes renováveis e reduzir perdas.",
    },
    {
      id: "eficiencia-publica",
      name: "Eficiência energética em cargas públicas",
      impact: "Médio",
      cost: "Baixo",
      timeline: "1 a 2 anos",
      timelineMinYears: 1,
      timelineMaxYears: 2,
      estimatedInvestment: 30000000,
      estimatedInvestmentFormatted: "R$ 30 milhões",
      description:
        "Substituição de luminárias, eficientização de prédios públicos e gestão inteligente da demanda.",
    },
  ],
};
