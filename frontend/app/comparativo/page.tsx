export const dynamic = "force-static";
export const revalidate = 3600;

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { getInvestmentRegions } from "@/lib/api";
import { ErrorState } from "@/components/ui/ErrorState";

export default async function ComparisonPage() {
  const data = await getInvestmentRegions();

  if (!data || !data.regions) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto pt-12">
          <ErrorState message="Não foi possível carregar as regiões para comparação." />
        </div>
      </AppShell>
    );
  }
  const featuredRegion = data.regions[0];

  return (
    <AppShell>
      <section className="page-heading page-heading--row">
        <div>
          <span className="eyebrow">Priorização executiva</span>
          <h1>Comparar regiões</h1>
          <p>
            Compare os principais critérios técnicos, econômicos e
            socioambientais para priorizar a próxima etapa de estudo.
          </p>
        </div>
        <Button href="/mapa" variant="secondary">
          Voltar ao mapa
        </Button>
      </section>

      <section className="best-option">
        <span>Melhor opção preliminar</span>
        <h2>{featuredRegion?.name}</h2>
        <p>
          Score {featuredRegion?.score}/100, payback estimado de{" "}
          {featuredRegion?.payback} anos e recomendação de avançar para estudo
          técnico.
        </p>
      </section>

      <div className="comparison-table-wrap">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Região</th>
              <th>Score</th>
              <th>Contribuição para o plano</th>
              <th>Investimento estimado</th>
              <th>Payback</th>
              <th>Risco socioambiental</th>
              <th>Recomendação</th>
            </tr>
          </thead>
          <tbody>
            {data.regions.map((region) => (
              <tr
                className={
                  region.id === featuredRegion?.id ? "is-highlighted" : ""
                }
                key={region.id}
              >
                <td>{region.name}</td>
                <td>
                  <strong>{region.score}</strong>
                </td>
                <td>{region.contributionToPlan}</td>
                <td>{region.estimatedInvestmentFormatted}</td>
                <td>{region.payback} anos</td>
                <td>
                  <RiskBadge risk={region.risk} />
                </td>
                <td>{region.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
