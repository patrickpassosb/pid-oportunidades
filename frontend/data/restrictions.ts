import type { RestrictionLayersResponse } from "@/lib/types";

export const restrictionLayersFallback: RestrictionLayersResponse = {
  state: "Roraima",
  layers: [
    {
      id: "terras-indigenas",
      name: "Terras indígenas",
      type: "territorial",
      severity: "critical",
      description:
        "Camada indicativa para evitar sobreposição e apoiar consulta adequada nos estudos posteriores.",
    },
    {
      id: "unidades-conservacao",
      name: "Unidades de conservação",
      type: "ambiental",
      severity: "attention",
      description:
        "Áreas protegidas que exigem avaliação legal, ambiental e de compatibilidade do projeto.",
    },
    {
      id: "areas-embargadas",
      name: "Áreas embargadas",
      type: "legal",
      severity: "critical",
      description:
        "Sinalizam necessidade de due diligence antes de qualquer decisão de prospecção.",
    },
    {
      id: "app-reserva-legal",
      name: "APP / Reserva Legal",
      type: "legal",
      severity: "attention",
      description:
        "Indicadores de restrição de uso do solo que precisam ser confirmados em base oficial.",
    },
    {
      id: "conflitos-fundiarios",
      name: "Conflitos fundiários",
      type: "territorial",
      severity: "critical",
      description:
        "Alertas preliminares para validação de titularidade, posse e governança territorial.",
    },
  ],
};
