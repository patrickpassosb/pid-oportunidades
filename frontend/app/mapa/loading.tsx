import { AppShell } from "@/components/layout/AppShell";
import { LoadingState } from "@/components/ui/LoadingState";

export default function LoadingMap() {
  return (
    <AppShell>
      <LoadingState message="Carregando regiões do mapa..." />
    </AppShell>
  );
}
