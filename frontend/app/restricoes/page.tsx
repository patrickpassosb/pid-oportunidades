import { getRestrictionLayers } from "@/lib/api";
import { ErrorState } from "@/components/ui/ErrorState";
import { DataQualityBadge } from "@/components/ui/DataQualityBadge";

export default async function RestrictionsPage() {
  const data = await getRestrictionLayers();

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto pt-12">
        <ErrorState message="Não foi possível carregar as restrições do backend." />
      </div>
    );
  }

  return (
    <div className="p-margin flex-1 flex flex-col max-w-[1400px] mx-auto w-full">
      {/* Page Header */}
      <div className="mb-lg max-w-4xl pt-6">
        <h1 className="font-display-lg text-display-lg text-primary mb-sm">
          Restrições socioambientais
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          A análise indica restrições preliminares e não substitui
          licenciamento ambiental, consulta adequada ou análise jurídica
          especializada.
        </p>
      </div>

      <div className="restriction-cards mb-lg">
        {data.layers.map((layer) => (
          <div
            className={`restriction-card restriction-card--${layer.severity}`}
            key={layer.id}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="mb-0">{layer.name}</h2>
              <DataQualityBadge quality={layer.dataQuality} sourceName={layer.source} />
            </div>
            <p>{layer.description}</p>
          </div>
        ))}
      </div>

      {/* Definition Cards Row */}
      <div className="mb-lg">
        <h3 className="font-headline-md text-headline-md text-primary mb-md">
          Glossário de Restrições Institucionais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="bg-surface border border-outline-variant rounded-xl p-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low border border-surface-variant flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-secondary-container text-[28px]">
                diversity_3
              </span>
            </div>
            <h4 className="font-headline-md text-body-lg text-primary font-bold mb-sm">
              Terras Indígenas
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Porções do território nacional habitadas por povos indígenas.
              A Constituição Federal garante o direito originário sobre essas
              terras, tornando-as inalienáveis e de posse permanente.
            </p>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low border border-surface-variant flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-[28px] text-primary-container">
                park
              </span>
            </div>
            <h4 className="font-headline-md text-body-lg text-primary font-bold mb-sm">
              Unidades de Conservação
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Espaços territoriais legalmente instituídos pelo poder público,
              visando a conservação da biodiversidade. Regidas por planos de
              manejo específicos.
            </p>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low border border-surface-variant flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-primary-container text-[28px]">
                forest
              </span>
            </div>
            <h4 className="font-headline-md text-body-lg text-primary font-bold mb-sm">
              APP & Reserva Legal
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              As <strong>Áreas de Preservação Permanente (APPs)</strong>{" "}
              protegem recursos hídricos. A <strong>Reserva Legal</strong> é o
              percentual do imóvel rural que deve manter vegetação nativa
              preservada, em conformidade com o Código Florestal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
