import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ErrorState({ message, retryUrl }: { message?: string, retryUrl?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl bg-[var(--surface-color)] border border-[var(--gray-green-soft)]">
      <div className="w-16 h-16 rounded-full bg-[var(--error-surface)] flex items-center justify-center mb-6 text-[var(--error)]">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-xl font-bold text-[var(--navy-dark)] mb-2">
        Não foi possível carregar os dados
      </h2>
      <p className="text-[var(--muted)] max-w-md mb-6">
        {message || "Ocorreu um erro de comunicação com os serviços de dados. Verifique sua conexão e se os serviços externos estão operacionais."}
      </p>
      {retryUrl && (
        <Button href={retryUrl} variant="primary">
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
