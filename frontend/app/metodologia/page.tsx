import { AppShell } from "@/components/layout/AppShell";
import { getMethodology } from "@/lib/api";
import { ErrorState } from "@/components/ui/ErrorState";
import { DataQualityBadge } from "@/components/ui/DataQualityBadge";

export default async function MethodologyPage() {
  const methodology = await getMethodology();

  if (!methodology) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto pt-12">
          <ErrorState message="Não foi possível carregar a metodologia. Verifique se o backend está rodando." />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="page-heading">
        <span className="eyebrow">Metodologia</span>
        <h1>{methodology.title}</h1>
        <p>Versão {methodology.version} — {methodology.description}</p>
      </section>

      <div className="max-w-4xl space-y-8">
        {/* Fontes de dados */}
        <section className="card p-6">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Fontes de dados
          </h2>
          <div className="space-y-4">
            {methodology.sources?.map((source: any) => (
              <div key={source.name} className="flex items-start gap-3 pb-4 border-b border-[var(--gray-green-soft)] last:border-0 last:pb-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[var(--navy-dark)]">{source.name}</h3>
                    <DataQualityBadge quality={source.dataQuality} />
                  </div>
                  <p className="text-[var(--muted)] text-sm">{source.use}</p>
                  {source.url && (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--navy)] text-sm hover:underline mt-1 inline-block"
                    >
                      Acessar fonte →
                    </a>
                  )}
                  {source.tables && (
                    <p className="text-[var(--muted)] text-xs mt-1">
                      Tabelas: {source.tables.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modelo de scoring */}
        {methodology.scoring_model && (
          <section className="card p-6">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Modelo de scoring
            </h2>
            <p className="text-[var(--muted)] mb-4">{methodology.scoring_model.description}</p>
            <div className="bg-[var(--gray-green-soft)] p-4 rounded-lg mb-4">
              <code className="text-sm text-[var(--navy-dark)]">{methodology.scoring_model.formula}</code>
            </div>
            {methodology.scoring_model.components && (
              <ul className="space-y-2">
                {Object.entries(methodology.scoring_model.components).map(([key, value]) => (
                  <li key={key} className="flex items-start gap-2 text-sm">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--navy)] mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-[var(--navy-dark)] capitalize">{key}:</strong>{" "}
                      <span className="text-[var(--muted)]">{value as string}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Modelo de custos */}
        {methodology.cost_model && (
          <section className="card p-6">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Modelo de custos
            </h2>
            <p className="text-[var(--muted)]">{methodology.cost_model.description}</p>
            {methodology.cost_model.note && (
              <p className="text-[var(--muted)] text-sm mt-2 italic">{methodology.cost_model.note}</p>
            )}
          </section>
        )}

        {/* Limitações */}
        {methodology.limitations && (
          <section className="card p-6">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Limitações
            </h2>
            <ul className="space-y-2">
              {methodology.limitations.map((limitation: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <span className="text-[var(--muted)]">{limitation}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Política de cache */}
        {methodology.cache_policy && (
          <section className="card p-6">
            <h2 className="font-headline-md text-headline-md text-primary mb-4">
              Política de cache
            </h2>
            <p className="text-[var(--muted)]">{methodology.cache_policy}</p>
          </section>
        )}
      </div>
    </AppShell>
  );
}
