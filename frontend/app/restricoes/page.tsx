import { AppShell } from "@/components/layout/AppShell";
import { MapMock } from "@/components/map/MapMock";
import { Button } from "@/components/ui/Button";
import { restrictionCards } from "@/data/layers";

export default function RestrictionsPage() {
  return (
    <AppShell active="restricoes" summary="Restrições socioambientais">
      <section className="page-heading page-heading--row">
        <div>
          <span className="eyebrow">Due diligence preliminar</span>
          <h1>Restrições socioambientais</h1>
          <p>
            Camadas indicativas para orientar triagem territorial, análise jurídica e estudos
            ambientais posteriores.
          </p>
        </div>
        <Button href="/mapa" variant="secondary">Voltar ao mapa</Button>
      </section>

      <section className="restriction-layout">
        <div className="map-stage">
          <MapMock interactive={false} mode="restrictions" />
        </div>

        <aside className="restriction-panel">
          <h2>Legenda</h2>
          <div className="legend-stack">
            <span><i className="legend-dot legend-dot--good" />Verde: oportunidade preliminar</span>
            <span><i className="legend-dot legend-dot--attention" />Amarelo: requer due diligence</span>
            <span><i className="legend-dot legend-dot--critical" />Vinho: restrição crítica</span>
          </div>
          <p>
            A análise indica restrições preliminares e não substitui licenciamento ambiental,
            consulta adequada ou análise jurídica especializada.
          </p>
        </aside>
      </section>

      <section className="restriction-cards" aria-label="Tipos de restrição">
        {restrictionCards.map((card) => (
          <article className={`restriction-card restriction-card--${card.tone}`} key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
