import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-margin max-w-4xl mx-auto w-full text-center">
      <h2 className="font-display-lg text-display-lg text-primary mb-6 max-w-3xl">
        Quanto custa descarbonizar uma região?
      </h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl">
        Estime custo, tempo e oportunidades de investimento para acelerar a
        transição energética em estados, setores e regiões.
      </p>

      {/* Search/Simulation Pill */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-full p-2 pl-6 flex items-center w-full max-w-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col items-start flex-1 text-left">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
            ESTADO
          </span>
          <span className="font-body-md text-body-md text-primary font-semibold">
            Roraima
          </span>
        </div>
        <div className="h-10 w-px bg-outline-variant mx-4" />
        <Link
          href="/configuracao"
          className="bg-secondary text-on-secondary px-8 py-3 rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity whitespace-nowrap flex items-center gap-2"
        >
          Simular descarbonização
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      <p className="font-label-sm text-label-sm text-on-surface-variant mt-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">info</span>
        Primeiro caso disponível: Roraima — energia solar e substituição de
        geração fóssil.
      </p>
    </div>
  );
}
