import type { SocioEnvironmentalRisk } from "@/data/regions";
import { cn } from "@/lib/cn";

const riskTone: Record<SocioEnvironmentalRisk, string> = {
  Baixo: "risk-badge--low",
  Médio: "risk-badge--medium",
  Alto: "risk-badge--high",
};

export function RiskBadge({ risk }: { risk: SocioEnvironmentalRisk }) {
  return <span className={cn("risk-badge", riskTone[risk])}>{risk}</span>;
}
