import { AppShell } from "@/components/layout/AppShell";
import { LoadingState } from "@/components/ui/LoadingState";

export default function LoadingSimulation() {
  return (
    <AppShell>
      <LoadingState message="Buscando cenário de descarbonização do backend..." />
    </AppShell>
  );
}
