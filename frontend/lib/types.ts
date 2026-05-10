export type DecarbonizationLever = {
  id: string;
  name: string;
  impact: "Alto" | "Médio" | "Baixo";
  cost: "Alto" | "Médio" | "Baixo";
  timeline: string;
  timelineMinYears: number;
  timelineMaxYears: number;
  estimatedInvestment: number;
  estimatedInvestmentFormatted: string;
  description: string;
};

export type DecarbonizationScenario = {
  state: string;
  sector: string;
  objective: string;
  baselineProblem: string;
  estimatedInvestment: number;
  estimatedInvestmentFormatted: string;
  estimatedTimeline: string;
  timelineMinYears: number;
  timelineMaxYears: number;
  avoidedEmissions: number;
  avoidedEmissionsFormatted: string;
  priorityProjects: string[];
  levers: DecarbonizationLever[];
};

export type InvestmentRegion = {
  id: string;
  name: string;
  score: number;
  project: string;
  estimatedInvestment: number | null;
  estimatedInvestmentFormatted: string;
  payback: number;
  risk: "Baixo" | "Médio" | "Alto";
  contributionToPlan: "Alta" | "Média" | "Baixa";
  recommendation: string;
  explanation: string;
};

export type InvestmentRegionsResponse = {
  state: string;
  sector: string;
  regions: InvestmentRegion[];
};

export type RestrictionLayer = {
  id: string;
  name: string;
  type: string;
  severity: "critical" | "attention" | "info";
  description: string;
};

export type RestrictionLayersResponse = {
  state: string;
  layers: RestrictionLayer[];
};

export type ReportRisk = {
  id: string;
  name: string;
  severity: "critical" | "attention" | "info";
  description: string;
};

export type ReportLever = {
  id: string;
  name: string;
  impact: "Alto" | "Médio" | "Baixo";
  cost: "Alto" | "Médio" | "Baixo";
  timeline: string;
  estimatedInvestment: number;
  estimatedInvestmentFormatted: string;
};

export type ReportPriorityRegion = {
  id: string;
  name: string;
  score: number;
  recommendation: string;
};

export type ReportData = {
  title: string;
  subtitle: string;
  executiveSummary: string;
  estimatedInvestment: number;
  estimatedInvestmentFormatted: string;
  estimatedTimeline: string;
  timelineMinYears: number;
  timelineMaxYears: number;
  avoidedEmissions: number;
  avoidedEmissionsFormatted: string;
  priorityRegion: ReportPriorityRegion;
  levers: ReportLever[];
  risks: ReportRisk[];
  nextSteps: string[];
};
