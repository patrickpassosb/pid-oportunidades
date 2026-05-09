import { MetricCard } from "@/components/ui/MetricCard";
import { reportSections } from "@/data/report";
import { featuredRegion } from "@/data/regions";
import { formatInvestment, formatPayback } from "@/lib/format";

export function ReportPreview() {
  return (
    <article className="report-preview">
      <header className="report-preview__header">
        <img alt="PID" src="/assets/pid-logo.svg" />
        <div>
          <span>Investment Brief</span>
          <h1>Investment Brief — Solar Fotovoltaica em Roraima</h1>
          <p>
            Análise preliminar para implantação de usina solar de 5 MW na região{" "}
            {featuredRegion.name}.
          </p>
        </div>
      </header>

      <section className="report-preview__metrics" aria-label="Indicadores principais">
        <MetricCard label="Score" tone="navy" value={`${featuredRegion.score}/100`} />
        <MetricCard label="Investimento" value={formatInvestment(featuredRegion.investment)} />
        <MetricCard label="Payback" value={formatPayback(featuredRegion.payback)} />
        <MetricCard label="Risco" tone="wine" value={featuredRegion.risk} />
      </section>

      <div className="report-preview__sections">
        {reportSections.map((section, index) => (
          <section className="report-section" key={section.title}>
            <span>{index + 1}</span>
            <div>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
