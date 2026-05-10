import { MetricCard } from "@/components/ui/MetricCard";
import { getReportData } from "@/lib/api";
import { ErrorState } from "@/components/ui/ErrorState";
import { DataQualityBadge } from "@/components/ui/DataQualityBadge";

export async function ReportPreview() {
  const report = await getReportData();

  if (!report) {
    return (
      <div className="max-w-4xl mx-auto pt-12">
        <ErrorState message="Não foi possível gerar o relatório executivo. Tente novamente mais tarde." />
      </div>
    );
  }

  return (
    <article className="report-preview">
      <header className="report-preview__header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="PID" src="/assets/pid-logo.svg" />
        <div>
          <span>Plano Preliminar de Descarbonização</span>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="mb-0">{report.title} — Roraima</h1>
            <DataQualityBadge quality={report.dataQuality?.overallConfidence === 'high' ? 'real' : 'estimated'} />
          </div>
          <p>
            Estimativa indicativa de custo, tempo, alavancas e regiões
            prioritárias para acelerar a transição energética no estado.
          </p>
        </div>
      </header>

      <section
        className="report-preview__metrics"
        aria-label="Indicadores principais"
      >
        <MetricCard
          label="Investimento total estimado"
          tone="navy"
          value={report.estimatedInvestmentFormatted}
        />
        <MetricCard
          label="Tempo estimado"
          tone="orange"
          value={report.estimatedTimeline}
        />
        <MetricCard
          label="Emissões evitáveis"
          tone="olive"
          value={report.avoidedEmissionsFormatted}
        />
        <MetricCard
          label="Região prioritária"
          tone="neutral"
          value={report.priorityRegion?.name || "Indeterminada"}
        />
      </section>

      <div className="report-preview__sections">
        <section className="report-section">
          <span>1</span>
          <div>
            <h2>Resumo executivo</h2>
            <p>{report.executiveSummary}</p>
          </div>
        </section>

        <section className="report-section">
          <span>2</span>
          <div>
            <h2>Custo e prazo estimados</h2>
            <p>
              O investimento estimado indicativo é de{" "}
              {report.estimatedInvestmentFormatted}, com prazo preliminar de{" "}
              {report.estimatedTimeline}. Esses valores dependem de validação
              com fornecedores e não substituem análise técnica detalhada.
            </p>
          </div>
        </section>

        <section className="report-section">
          <span>3</span>
          <div>
            <h2>Alavancas de descarbonização</h2>
            <p>
              As principais alavancas identificadas são:{" "}
              {report.levers.map((l) => l.name).join(", ")}.
            </p>
          </div>
        </section>

        <section className="report-section">
          <span>4</span>
          <div>
            <h2>Projetos recomendados</h2>
            <p>
              A região prioritária é {report.priorityRegion?.name || "N/A"}, com score de{" "}
              {report.priorityRegion?.score || 0}/100. Recomendação: {" "}
              {report.priorityRegion?.recommendation || "N/A"}.
            </p>
          </div>
        </section>

        <section className="report-section">
          <span>5</span>
          <div>
            <h2>Regiões prioritárias</h2>
            <p>
              {report.priorityRegion?.name || "A região"} foi identificada como região prioritária
              preliminar para projetos solares, considerando potencial
              indicativo, infraestrutura e sensibilidade socioambiental
              aparente.
            </p>
          </div>
        </section>

        <section className="report-section">
          <span>6</span>
          <div>
            <h2>Riscos socioambientais</h2>
            <p>
              Os principais riscos identificados são:{" "}
              {report.risks.map((r) => r.name).join(", ")}. Essa triagem
              preliminar não substitui due diligence especializada.
            </p>
          </div>
        </section>

        <section className="report-section">
          <span>7</span>
          <div>
            <h2>Próximos passos</h2>
            <ul className="list-disc pl-5 text-[var(--muted)] leading-relaxed">
              {report.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}
