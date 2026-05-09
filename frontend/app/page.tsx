import { AppHeader } from "@/components/layout/AppHeader";
import { MapMock } from "@/components/map/MapMock";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="home-page">
      <AppHeader simple />
      <main className="home-main">
        <section className="home-hero">
          <div className="home-hero__content">
            <span className="eyebrow">PID — Onde Investir?</span>
            <h1>Onde investir em energia limpa?</h1>
            <p>
              Descubra regiões com maior potencial técnico, econômico e socioambiental para
              projetos de descarbonização.
            </p>

            <div className="search-panel" aria-label="Busca guiada de oportunidades">
              <label htmlFor="state-select">Estado</label>
              <select defaultValue="Roraima" id="state-select">
                <option>Roraima</option>
              </select>
              <Button href="/configuracao">Analisar oportunidades</Button>
            </div>

            <small className="home-hero__note">
              Primeira análise disponível: usinas solares fotovoltaicas em Roraima.
            </small>
          </div>
          <div className="home-hero__visual" aria-label="Prévia visual do mapa de oportunidades">
            <MapMock interactive={false} mode="compact" />
          </div>
        </section>
      </main>
    </div>
  );
}
