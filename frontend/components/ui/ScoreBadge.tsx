import type { RegionStatus } from "@/data/regions";
import { cn } from "@/lib/cn";

const labelByStatus: Record<RegionStatus, string> = {
  good: "Boa oportunidade preliminar",
  attention: "Requer análise",
  critical: "Restrição crítica",
};

export function ScoreBadge({
  score,
  status,
  label,
}: {
  score: number;
  status: RegionStatus;
  label?: string;
}) {
  return (
    <div className={cn("score-badge", `score-badge--${status}`)}>
      <span className="score-badge__score">{score}/100</span>
      <span className="score-badge__label">{label ?? labelByStatus[status]}</span>
    </div>
  );
}
