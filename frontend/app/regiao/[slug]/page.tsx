import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { MetricCard } from "@/components/ui/MetricCard";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { ErrorState } from "@/components/ui/ErrorState";
import { getInvestmentRegions } from "@/lib/api";
import { regions } from "@/data/regions";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export default async function RegionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getInvestmentRegions();

  if (!data || !data.regions) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto pt-12">
          <ErrorState message="Não foi possível carregar os dados da região." />
        </div>
      </AppShell>
    );
  }

  const region = data.regions.find((r) => r.id === slug);

  if (!region) {
    notFound();
  }

  return (
    <AppShell>
      <section className="region-hero">
        <div>
          <span className="eyebrow">Região prioritária do plano</span>
          <h1>{region.name}</h1>
          <p>
            Região prioritária para projetos solares dentro do plano preliminar
            de descarbonização de Roraima.
          </p>
        </div>
        <ScoreBadge score={region.score} status="good" />
      </section>

      <section
        className="metric-grid metric-grid--four"
        aria-label="Indicadores principais"
      >
        <MetricCard
          label="Investimento estimado"
          tone="navy"
          value={region.estimatedInvestmentFormatted ?? "Indeterminado"}
        />
        <MetricCard
          label="Payback estimado"
          value={`${region.payback} anos`}
        />
        <MetricCard
          label="Contribuição para o plano"
          tone="olive"
          value={region.contributionToPlan}
        />
        <MetricCard label="Risco socioambiental" tone="wine" value={region.risk} />
      </section>

      <section className="detail-layout">
        <div className="analysis-section">
          <h2>Como essa região contribui para a descarbonização?</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Projetos solares nessa região podem reduzir emissões associadas à
            geração fóssil, apoiar a expansão de energia limpa e atender o eixo
            de maior demanda do estado.
          </p>
        </div>

        <div className="analysis-section analysis-section--warning">
          <h2>Atenções necessárias</h2>
          <ul>
            <li>Requer validação fundiária</li>
            <li>Requer análise de conexão</li>
            <li>Não substitui licenciamento ambiental</li>
          </ul>
        </div>
      </section>

      <div className="bottom-actions">
        <Button href="/relatorio">Gerar relatório</Button>
        <Button href="/comparativo" variant="secondary">
          Comparar regiões
        </Button>
        <Button href="/restricoes" variant="ghost">
          Ver restrições
        </Button>
      </div>
    </AppShell>
  );
}
