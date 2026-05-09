export const analysisLayers = [
  {
    name: "Potencial solar",
    description: "Radiação GHI, horas de sol pleno e sazonalidade.",
    active: true,
  },
  {
    name: "Infraestrutura elétrica",
    description: "Distância estimada de subestações e linhas de transmissão.",
    active: true,
  },
  {
    name: "Restrições socioambientais",
    description: "Camadas preliminares de sensibilidade territorial e legal.",
    active: true,
  },
];

export const restrictionCards = [
  {
    title: "Terras indígenas",
    description:
      "Camada indicativa para evitar sobreposição e apoiar consulta adequada nos estudos posteriores.",
    tone: "critical",
  },
  {
    title: "Unidades de conservação",
    description:
      "Áreas protegidas que exigem avaliação legal, ambiental e de compatibilidade do projeto.",
    tone: "attention",
  },
  {
    title: "Áreas embargadas",
    description:
      "Sinalizam necessidade de due diligence antes de qualquer decisão de prospecção.",
    tone: "critical",
  },
  {
    title: "APP / Reserva Legal",
    description:
      "Indicadores de restrição de uso do solo que precisam ser confirmados em base oficial.",
    tone: "attention",
  },
  {
    title: "Conflitos fundiários",
    description:
      "Alertas preliminares para validação de titularidade, posse e governança territorial.",
    tone: "critical",
  },
];
