import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="app-shell__main home-main flex items-center justify-center">
      <section className="home-hero">
        <div className="home-hero__content">
          <h1>Quanto custa descarbonizar uma região?</h1>
          <p>
            Estime custo, tempo e oportunidades de investimento para acelerar a
            transição energética em estados, setores e regiões.
          </p>

          <div className="search-panel">
            <div>
              <label>Estado</label>
              <select disabled>
                <option>Roraima</option>
              </select>
            </div>
            <Button href="/configuracao">Simular descarbonização</Button>
          </div>

          <span className="home-hero__note">
            Primeiro caso disponível: Roraima — energia solar e substituição de
            geração fóssil.
          </span>
        </div>
      </section>
    </div>
  );
}
