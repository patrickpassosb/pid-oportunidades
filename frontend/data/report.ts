import { featuredRegion } from "./regions";

export const reportSections = [
  {
    title: "Localização recomendada",
    body: `${featuredRegion.name} concentra o melhor equilíbrio preliminar entre potencial solar, conexão elétrica e menor incidência aparente de restrições críticas para uma usina de 5 MW.`,
  },
  {
    title: "Justificativa",
    body: "A análise indicativa combina score técnico, distância estimada da rede, potencial de geração e sensibilidade socioambiental. O resultado recomenda avançar para estudo técnico, sem caracterizar viabilidade definitiva.",
  },
  {
    title: "Riscos principais",
    body: "Os principais pontos de atenção são validação fundiária, custo de conexão, consulta adequada quando aplicável e confirmação das camadas ambientais em fontes oficiais.",
  },
  {
    title: "Próximos passos",
    body: "Executar due diligence territorial, solicitar estudo de conexão, validar CAPEX com fornecedores locais e iniciar triagem jurídica e ambiental especializada.",
  },
  {
    title: "Fontes de dados",
    body: "Base mockada para demo de hackathon, simulando camadas de irradiação solar, infraestrutura elétrica, logística, restrições socioambientais e premissas financeiras preliminares.",
  },
];
