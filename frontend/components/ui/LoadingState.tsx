import { Loader2 } from "lucide-react";

export function LoadingState({ message = "Carregando dados..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-[var(--muted)]">
      <Loader2 className="h-10 w-10 animate-spin text-[var(--navy)] mb-4" />
      <p className="font-medium text-lg">{message}</p>
    </div>
  );
}
