import { ReportPreview } from "@/components/dashboard/ReportPreview";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { PrintReportButton } from "./PrintReportButton";

export default async function ReportPage() {
  return (
    <AppShell>
      <section className="report-page-actions">
        <Button href="/mapa" variant="secondary">
          Voltar ao mapa
        </Button>
        <PrintReportButton />
      </section>
      <ReportPreview />
    </AppShell>
  );
}
