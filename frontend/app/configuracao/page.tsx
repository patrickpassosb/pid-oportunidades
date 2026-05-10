import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const questions = [
  {
    title: "Quanto custa descarbonizar Roraima?",
    description: "Simulação preliminar disponível.",
    available: true,
  },
  {
    title: "Onde investir em solar fotovoltaica?",
    description: "Disponível",
    available: true,
  },
  {
    title: "Quais projetos reduzem mais emissões?",
    description: "Em breve",
    available: false,
  },
  {
    title: "Quanto tempo levaria para atingir a meta?",
    description: "Em breve",
    available: false,
  },
];

export default function ConfigurationPage() {
  return (
    <AppShell>
      <section className="page-heading">
        <span className="eyebrow">Configuração do cenário</span>
        <h1>O que você quer entender?</h1>
        <p>Defina os parâmetros essenciais para gerar uma simulação preliminar de descarbonização.</p>
      </section>

      <div className="config-layout">
        <section className="config-main" aria-label="Configuração da análise">
          <div className="option-grid">
            {questions.map((q) => (
              <article
                className={`option-card ${q.available ? "option-card--selected" : "option-card--disabled"}`}
                key={q.title}
              >
                <span className="option-card__status">
                  {q.available ? "Disponível" : "Em breve"}
                </span>
                <h2>{q.title}</h2>
                <p>{q.description}</p>
              </article>
            ))}
          </div>

          <section className="size-section">
            <h2>Configuração simples</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--navy)]">Estado</span>
                <span className="text-[var(--muted)]">Roraima</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--navy)]">Setor</span>
                <span className="text-[var(--muted)]">Energia</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--navy)]">Projeto prioritário</span>
                <span className="text-[var(--muted)]">Solar fotovoltaica</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--navy)]">Porte de referência</span>
                <span className="text-[var(--muted)]">5 MW</span>
              </div>
            </div>
          </section>

          <div className="config-actions">
            <Button href="/simulacao">Gerar simulação</Button>
          </div>
        </section>

        <Card className="context-card">
          <h2>O que será analisado?</h2>
          <ul>
            <li>Custo estimado indicativo de descarbonização</li>
            <li>Prazo preliminar para execução do plano</li>
            <li>Alavancas de redução de emissões</li>
            <li>Regiões prioritárias para investimento inicial</li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
