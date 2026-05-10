import { ReportPreview } from "@/components/dashboard/ReportPreview";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";

export default async function ReportPage() {
  return (
    <AppShell>
      <section className="report-page-actions">
        <Button href="/mapa" variant="secondary">
          Voltar ao mapa
        </Button>
        <Button disabled title="Geração de PDF em desenvolvimento" type="button">
          Baixar PDF
        </Button>
      </section>
      <ReportPreview />
    </AppShell>
  );
}
