export default function HomePage() {
  return (
    <div className="p-margin flex-1 flex flex-col max-w-[1400px] mx-auto w-full">
      {/* Hero / Central Question */}
      <section className="mb-xl text-center py-xl">
        <h2 className="font-display-lg text-display-lg text-primary mb-sm">
          O que você quer analisar hoje?
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Acesse inteligência de dados, identifique oportunidades de
          investimento e monitore o impacto de projetos de descarbonização em
          tempo real.
        </p>
        <div className="mt-lg flex justify-center">
          <div className="relative w-full max-w-xl">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-[28px]">
              search
            </span>
            <input
              className="w-full pl-14 pr-4 py-4 rounded-full border-2 border-outline-variant focus:border-primary text-body-lg font-body-lg shadow-sm focus:ring-0 transition-colors bg-surface-container-lowest text-on-surface"
              placeholder="Busque por regiões, setores ou projetos..."
              type="text"
            />
          </div>
        </div>
      </section>

      {/* Main Actions (Bento Grid Style) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl">
        {/* Action Card 1 */}
        <a
          className="group block relative overflow-hidden rounded-xl bg-surface-container-lowest border border-tertiary-fixed-dim hover:border-primary hover:shadow-md transition-all duration-300 p-lg min-h-[240px] flex flex-col justify-between"
          href="/configuracao"
        >
          <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[80px] text-primary">
              rocket_launch
            </span>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined fill">rocket_launch</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-xs">
              Onde Investir?
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Descubra as regiões e setores com maior potencial de retorno e
              impacto na descarbonização.
            </p>
          </div>
          <div className="mt-md flex items-center text-secondary font-label-md text-label-md group-hover:translate-x-2 transition-transform">
            Explorar oportunidades{" "}
            <span className="material-symbols-outlined ml-xs text-[18px]">
              arrow_forward
            </span>
          </div>
        </a>

        {/* Action Card 2 */}
        <a
          className="group block relative overflow-hidden rounded-xl bg-surface-container-lowest border border-tertiary-fixed-dim hover:border-primary hover:shadow-md transition-all duration-300 p-lg min-h-[240px] flex flex-col justify-between"
          href="/relatorio"
        >
          <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[80px] text-primary">
              eco
            </span>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-primary-fixed text-primary flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined fill">eco</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-xs">
              Impacto de Projetos
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Analise o desempenho e a redução de emissões de projetos em
              andamento ou concluídos.
            </p>
          </div>
          <div className="mt-md flex items-center text-primary font-label-md text-label-md group-hover:translate-x-2 transition-transform">
            Ver relatórios de impacto{" "}
            <span className="material-symbols-outlined ml-xs text-[18px]">
              arrow_forward
            </span>
          </div>
        </a>

        {/* Action Card 3 */}
        <a
          className="group block relative overflow-hidden rounded-xl bg-surface-container-lowest border border-tertiary-fixed-dim hover:border-primary hover:shadow-md transition-all duration-300 p-lg min-h-[240px] flex flex-col justify-between"
          href="/restricoes"
        >
          <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[80px] text-primary">
              warning
            </span>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined fill">warning</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-xs">
              Riscos Regionais
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Mapeie vulnerabilidades climáticas e riscos de transição
              energética por geolocalização.
            </p>
          </div>
          <div className="mt-md flex items-center text-error font-label-md text-label-md group-hover:translate-x-2 transition-transform">
            Acessar matriz de risco{" "}
            <span className="material-symbols-outlined ml-xs text-[18px]">
              arrow_forward
            </span>
          </div>
        </a>
      </section>

      {/* High-Level KPIs */}
      <section>
        <div className="flex justify-between items-end mb-md">
          <h3 className="font-headline-md text-headline-md text-primary">
            Visão Global de Descarbonização
          </h3>
          <button className="font-label-md text-label-md text-primary flex items-center hover:underline">
            Ver painel completo{" "}
            <span className="material-symbols-outlined ml-xs text-[18px]">
              open_in_new
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          {/* KPI 1 */}
          <div className="bg-surface-container-lowest border border-tertiary-fixed-dim rounded-xl p-md flex flex-col justify-between">
            <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-sm">
              Redução Total (MtCO2e)
            </div>
            <div className="flex items-baseline gap-sm">
              <span className="font-display-lg text-display-lg text-primary">
                145.2
              </span>
              <span className="text-secondary font-label-md text-label-md flex items-center">
                <span className="material-symbols-outlined text-[16px]">
                  arrow_upward
                </span>{" "}
                12%
              </span>
            </div>
            <div className="w-full bg-surface-variant h-1 rounded-full mt-md overflow-hidden">
              <div className="bg-primary h-full w-[70%]"></div>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-surface-container-lowest border border-tertiary-fixed-dim rounded-xl p-md flex flex-col justify-between">
            <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-sm">
              Projetos Ativos
            </div>
            <div className="flex items-baseline gap-sm">
              <span className="font-display-lg text-display-lg text-primary">
                3,492
              </span>
            </div>
            <div className="mt-md flex gap-sm">
              <span className="px-2 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm text-[10px]">
                1,200 VERIFIED
              </span>
              <span className="px-2 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm text-[10px]">
                2,292 IN PROGRESS
              </span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-surface-container-lowest border border-tertiary-fixed-dim rounded-xl p-md flex flex-col justify-between md:col-span-2 group">
            <div className="flex justify-between items-start mb-sm">
              <div className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                Investimento Mobilizado (USD)
              </div>
              <span className="material-symbols-outlined text-outline">
                more_horiz
              </span>
            </div>
            <div className="flex items-baseline gap-sm">
              <span className="font-display-lg text-display-lg text-primary">
                $4.2B
              </span>
            </div>
            <div className="mt-md h-12 flex items-end gap-1 opacity-80 relative">
              {/* Faux Sparkline */}
              <div className="w-full bg-primary-fixed-dim rounded-t-sm h-[20%]"></div>
              <div className="w-full bg-primary-fixed-dim rounded-t-sm h-[30%]"></div>
              <div className="w-full bg-primary-fixed-dim rounded-t-sm h-[25%]"></div>
              <div className="w-full bg-primary-fixed-dim rounded-t-sm h-[40%]"></div>
              <div className="w-full bg-primary-fixed-dim rounded-t-sm h-[60%]"></div>
              <div className="w-full bg-primary-fixed-dim rounded-t-sm h-[50%]"></div>
              <div className="w-full bg-primary-fixed-dim rounded-t-sm h-[80%]"></div>
              <div className="w-full bg-primary rounded-t-sm h-[100%] relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface-inverse text-inverse-on-surface text-[10px] px-1 rounded whitespace-nowrap hidden group-hover:block">
                  Q4
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
