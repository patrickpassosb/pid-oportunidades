import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const projectTypes = [
  {
    title: "Usina solar fotovoltaica",
    description: "Disponível para a primeira análise em Roraima.",
    available: true,
  },
  {
    title: "Bateria / armazenamento",
    description: "Em breve",
    available: false,
  },
  {
    title: "Transmissão",
    description: "Em breve",
    available: false,
  },
  {
    title: "Outro projeto",
    description: "Em breve",
    available: false,
  },
];

const sizes = ["1 MW", "5 MW", "10 MW", "30 MW"];

export default function ConfigurationPage() {
  return (
    <AppShell>
      <section className="page-heading">
        <span className="eyebrow">Configure sua análise</span>
        <h1>Que tipo de projeto você quer analisar?</h1>
        <p>Defina os parâmetros essenciais para gerar um mapa preliminar de oportunidades.</p>
      </section>

      <div className="config-layout">
        <section className="config-main" aria-label="Configuração da análise">
          <div className="option-grid">
            {projectTypes.map((project) => (
              <article
                className={`option-card ${project.available ? "option-card--selected" : "option-card--disabled"}`}
                key={project.title}
              >
                <span className="option-card__status">
                  {project.available ? "Selecionado" : "Em breve"}
                </span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </article>
            ))}
          </div>

          <section className="size-section">
            <h2>Qual porte do projeto?</h2>
            <div className="segmented-control" role="list">
              {sizes.map((size) => (
                <button className={size === "5 MW" ? "is-selected" : ""} key={size} type="button">
                  {size}
                </button>
              ))}
            </div>
          </section>

          <div className="config-actions">
            <Button href="/mapa">Gerar mapa</Button>
          </div>
        </section>

        <Card className="context-card">
          <h2>O que será analisado?</h2>
          <ul>
            <li>Potencial solar e horas de sol pleno</li>
            <li>Infraestrutura elétrica próxima</li>
            <li>Estimativa preliminar de investimento e retorno</li>
            <li>Restrições socioambientais para due diligence</li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
