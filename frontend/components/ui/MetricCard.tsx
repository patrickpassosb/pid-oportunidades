import { cn } from "@/lib/cn";

type MetricCardProps = {
  label: string;
  value: string;
  helper?: string;
  tone?: "navy" | "orange" | "olive" | "wine" | "neutral";
};

export function MetricCard({
  label,
  value,
  helper,
  tone = "neutral",
}: MetricCardProps) {
  return (
    <div className={cn("metric-card", `metric-card--${tone}`)}>
      <span className="metric-card__label">{label}</span>
      <strong className="metric-card__value">{value}</strong>
      {helper ? <span className="metric-card__helper">{helper}</span> : null}
    </div>
  );
}
