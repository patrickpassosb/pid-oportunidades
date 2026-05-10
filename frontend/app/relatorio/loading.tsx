import { AppShell } from "@/components/layout/AppShell";
import { LoadingState } from "@/components/ui/LoadingState";

export default function LoadingReport() {
  return (
    <AppShell>
      <LoadingState message="Gerando relatório de descarbonização..." />
    </AppShell>
  );
}
