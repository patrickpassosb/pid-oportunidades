import { Button } from "@/components/ui/Button";
import { RiskBadge } from "@/components/ui/RiskBadge";
import type { InvestmentRegion } from "@/lib/types";

type RegionCardProps = {
  region: InvestmentRegion;
  rank: number;
};

export function RegionCard({ region, rank }: RegionCardProps) {
  const href =
    region.id === "boa-vista-mucajai" ? "/regiao/boa-vista-mucajai" : undefined;

  return (
    <article className="region-card">
      <div className="region-card__rank">{rank}</div>
      <div className="region-card__body">
        <div className="region-card__header">
          <h3>{region.name}</h3>
          <RiskBadge risk={region.risk} />
        </div>
        <dl className="region-card__metrics">
          <div>
            <dt>Score</dt>
            <dd>{region.score}</dd>
          </div>
          <div>
            <dt>Payback</dt>
            <dd>{region.payback} anos</dd>
          </div>
        </dl>
        <p>{region.recommendation}</p>
      </div>
      <Button disabled={!href} href={href} variant={href ? "secondary" : "soft"}>
        Ver análise
      </Button>
    </article>
  );
}
