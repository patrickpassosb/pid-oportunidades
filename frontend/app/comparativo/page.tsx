import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { featuredRegion, regions } from "@/data/regions";
import { formatInvestment, formatPayback } from "@/lib/format";

export default function ComparisonPage() {
  return (
    <AppShell>
      <section className="page-heading page-heading--row">
        <div>
          <span className="eyebrow">Priorização executiva</span>
          <h1>Comparar regiões</h1>
          <p>
            Compare os principais critérios técnicos, econômicos e socioambientais para priorizar
            a próxima etapa de estudo.
          </p>
        </div>
        <Button href="/mapa" variant="secondary">Voltar ao mapa</Button>
      </section>

      <section className="best-option">
        <span>Melhor opção preliminar</span>
        <h2>{featuredRegion.name}</h2>
        <p>
          Score {featuredRegion.score}/100, payback estimado de {formatPayback(featuredRegion.payback)}
          {" "}e recomendação de avançar para estudo técnico.
        </p>
      </section>

      <div className="comparison-table-wrap">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Região</th>
              <th>Score</th>
              <th>Potencial solar</th>
              <th>Distância da rede</th>
              <th>Investimento estimado</th>
              <th>Payback estimado</th>
              <th>Risco socioambiental</th>
              <th>Recomendação</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region) => (
              <tr className={region.slug === featuredRegion.slug ? "is-highlighted" : ""} key={region.slug}>
                <td>{region.name}</td>
                <td><strong>{region.score}</strong></td>
                <td>{region.solarPotential}</td>
                <td>{region.gridDistance}</td>
                <td>{formatInvestment(region.investment)}</td>
                <td>{formatPayback(region.payback)}</td>
                <td><RiskBadge risk={region.risk} /></td>
                <td>{region.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
