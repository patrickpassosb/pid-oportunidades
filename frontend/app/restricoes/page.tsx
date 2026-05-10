export default function RestrictionsPage() {
  return (
    <div className="p-margin flex-1 flex flex-col max-w-[1400px] mx-auto w-full">
      {/* Page Header */}
      <div className="mb-lg max-w-4xl pt-6">
        <h1 className="font-display-lg text-display-lg text-primary mb-sm">
          Restrições socioambientais e fundiárias
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Avaliação técnica de territórios protegidos, áreas de embargo e zonas
          de restrição legal para identificação de riscos associados a projetos
          de descarbonização e uso da terra.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter mb-xl">
        {/* Map Container (Span 8) */}
        <div className="xl:col-span-8 bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden relative flex flex-col min-h-[600px]">
          {/* Map Header Bar */}
          <div className="bg-primary px-md py-sm flex justify-between items-center z-10">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-on-primary text-[20px]">
                map
              </span>
              <span className="font-label-md text-label-md text-on-primary">
                Visualizador Geoespacial Regional
              </span>
            </div>
            <div className="flex items-center gap-md">
              <span className="font-label-sm text-label-sm text-inverse-primary bg-primary-container px-2 py-1 rounded">
                Camadas Ativas: 3
              </span>
            </div>
          </div>

          {/* Simulated Map Canvas */}
          <div
            className="flex-grow relative bg-tertiary-fixed-dim bg-opacity-20 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfrykbWnIhGSOn7opSgehEQB6JAX2ORF3tdHPi-4XiGK_3rkT4IlVc8IVdFE7yTQGBLHXdxUuOd6vu-iIychxBcSmpjUVqqYEx5J5bU9Kh2C2vibX4nhVdt4lNHv2xeECCcbDtnQs9SvazipTuYhsa8dLDTce9wC2p4l4LuQVibeiZ7ohMtD7XHp5zEe_J5zgpgN54CV-5TGCPcwiW65UOGKq669FV8ILz_-0_Xzw88vltythT9YClBGKtjlTKNnhiLgzxSTqo5iB5')",
            }}
            aria-label="A highly detailed, professional satellite map view of a vast forest region in Brazil"
          >
            {/* Faded overlay */}
            <div className="absolute inset-0 bg-surface bg-opacity-40 backdrop-blur-[2px]"></div>

            {/* Simulated Data Polygons */}
            <div className="absolute top-1/4 left-1/3 w-64 h-48 border-2 border-secondary-container bg-secondary-container bg-opacity-20 rounded-tl-3xl rounded-br-full rotate-12 flex items-center justify-center backdrop-blur-sm">
              <span className="font-label-sm text-label-sm text-secondary-container font-bold bg-surface bg-opacity-80 px-2 py-1 rounded shadow-sm">
                TI Yanomami (Sobreposição)
              </span>
            </div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 border-2 border-tertiary-fixed-dim bg-tertiary-fixed-dim bg-opacity-30 rounded-full flex items-center justify-center"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-error bg-error bg-opacity-20 rounded shadow-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm">
              <span className="material-symbols-outlined text-error shadow-sm bg-surface rounded-full p-1">
                warning
              </span>
            </div>

            {/* Map Controls */}
            <div className="absolute top-md right-md flex flex-col gap-xs bg-surface border border-outline-variant rounded-lg shadow-sm p-xs z-20">
              <button className="p-1 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <div className="w-full h-px bg-outline-variant opacity-50"></div>
              <button className="p-1 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  remove
                </span>
              </button>
            </div>
            <div className="absolute top-md left-md bg-surface border border-outline-variant rounded-lg shadow-sm p-xs z-20 flex flex-col gap-xs">
              <button
                className="p-1 bg-surface-container-high rounded text-primary transition-colors"
                title="Camadas"
              >
                <span className="material-symbols-outlined text-[20px]">
                  layers
                </span>
              </button>
              <button
                className="p-1 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors"
                title="Filtros"
              >
                <span className="material-symbols-outlined text-[20px]">
                  filter_list
                </span>
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-md left-md bg-surface border border-outline-variant rounded-lg shadow-md p-md z-20 w-64">
              <h3 className="font-label-md text-label-md text-primary font-bold mb-sm flex items-center gap-xs border-b border-surface-variant pb-xs">
                <span className="material-symbols-outlined text-[16px]">
                  list
                </span>{" "}
                Legenda Ativa
              </h3>
              <div className="flex flex-col gap-sm">
                <div className="flex items-center gap-sm">
                  <div className="w-4 h-4 rounded border-2 border-secondary-container bg-secondary-container bg-opacity-40 shrink-0"></div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Terras Indígenas
                  </span>
                </div>
                <div className="flex items-center gap-sm">
                  <div className="w-4 h-4 rounded border-2 border-tertiary-fixed-dim bg-tertiary-fixed-dim bg-opacity-50 shrink-0"></div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Unidades de Conservação
                  </span>
                </div>
                <div className="flex items-center gap-sm">
                  <div className="w-4 h-4 rounded border-2 border-error bg-error bg-opacity-30 shrink-0"></div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Áreas Embargadas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lateral Panel (Span 4) */}
        <div className="xl:col-span-4 flex flex-col h-full">
          <div className="bg-surface rounded-xl border border-outline-variant shadow-sm flex flex-col h-full overflow-hidden">
            {/* Panel Header */}
            <div className="p-lg border-b border-surface-variant bg-surface-container-lowest">
              <h2 className="font-headline-md text-headline-md text-primary flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary icon-fill">
                  analytics
                </span>
                Classificação da área
              </h2>
              <p className="font-body-md text-label-sm text-on-surface-variant mt-xs">
                Síntese da viabilidade territorial baseada nas coordenadas
                selecionadas.
              </p>
            </div>

            {/* Status List */}
            <div className="p-md flex flex-col gap-md flex-grow bg-surface-container-lowest">
              {/* Status: Green (Inactive) */}
              <div className="p-md rounded-lg border border-surface-variant bg-surface-container-low flex gap-md items-start opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <div className="mt-xs shrink-0 w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center border border-tertiary">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">
                    check
                  </span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-primary font-bold">
                    Oportunidade (Livre)
                  </h4>
                  <p className="font-body-md text-label-sm text-on-surface-variant mt-xs leading-relaxed">
                    Área com baixo risco, sem sobreposições identificadas com
                    territórios protegidos na base de dados atual.
                  </p>
                </div>
              </div>

              {/* Status: Yellow (Inactive) */}
              <div className="p-md rounded-lg border border-surface-variant bg-surface-container-low flex gap-md items-start opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <div className="mt-xs shrink-0 w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center border border-outline">
                  <span className="material-symbols-outlined text-on-surface text-[20px]">
                    search
                  </span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-primary font-bold">
                    Due diligence (Atenção)
                  </h4>
                  <p className="font-body-md text-label-sm text-on-surface-variant mt-xs leading-relaxed">
                    Proximidade (&lt; 10km) com zonas sensíveis ou dados
                    pendentes de validação primária. Requer análise técnica in
                    loco.
                  </p>
                </div>
              </div>

              {/* Status: Red (Active Target State) */}
              <div className="p-md rounded-lg border border-error bg-error-container flex gap-md items-start shadow-sm relative overflow-hidden mt-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
                <div className="mt-xs shrink-0 w-8 h-8 rounded-full bg-error flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-on-error text-[20px]">
                    priority_high
                  </span>
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-start w-full">
                    <h4 className="font-label-md text-label-md text-on-error-container font-extrabold">
                      Restrição Crítica
                    </h4>
                    <span className="bg-surface text-error border border-error px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      Alto Risco
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-error-container mt-sm leading-relaxed border-b border-error border-opacity-20 pb-sm mb-sm">
                    <strong className="font-semibold">
                      Área com sobreposição ou proximidade crítica com
                      território protegido.
                    </strong>{" "}
                    Não recomendada para desenvolvimento ou estruturação de
                    projetos devido ao passivo socioambiental e impedimentos
                    legais severos.
                  </p>
                  <div className="flex flex-wrap gap-xs">
                    <span className="inline-flex items-center gap-xs px-2 py-1 rounded bg-surface border border-outline-variant text-label-sm font-label-md text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                      Sobreposição TI (14%)
                    </span>
                    <span className="inline-flex items-center gap-xs px-2 py-1 rounded bg-surface border border-outline-variant text-label-sm font-label-md text-on-surface">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      Embargo Ibama Ativo
                    </span>
                  </div>
                  <button className="mt-md w-full py-1.5 border border-error text-error font-label-md text-label-sm rounded hover:bg-error hover:text-on-error transition-colors flex items-center justify-center gap-xs bg-surface">
                    <span className="material-symbols-outlined text-[16px]">
                      summarize
                    </span>{" "}
                    Baixar Laudo Completo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Definition Cards Row */}
      <div className="mb-lg">
        <h3 className="font-headline-md text-headline-md text-primary mb-md">
          Glossário de Restrições Institucionais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Card 1 */}
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
              Porções do território nacional habitadas por povos indígenas,
              essenciais para a preservação de sua cultura e subsistência. A
              Constituição Federal garante o direito originário sobre essas
              terras, tornando-as inalienáveis e de posse permanente,
              configurando restrição absoluta para terceiros.
            </p>
          </div>

          {/* Card 2 */}
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
              com características naturais relevantes, visando a conservação da
              biodiversidade. Dividem-se em grupos de Proteção Integral
              (restrição total de uso direto) e Uso Sustentável, regidas por
              planos de manejo específicos.
            </p>
          </div>

          {/* Card 3 */}
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
              protegem recursos hídricos e a estabilidade geológica, sendo
              intocáveis. A <strong>Reserva Legal</strong> é o percentual do
              imóvel rural que deve manter vegetação nativa preservada,
              essencial para o uso econômico sustentável em conformidade com o
              Código Florestal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
