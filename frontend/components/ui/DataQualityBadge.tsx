import { CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import type { DataQuality } from "@/lib/types";

export function DataQualityBadge({
  quality,
  sourceName,
}: {
  quality?: DataQuality | string;
  sourceName?: string;
}) {
  if (!quality) return null;

  if (quality === "real") {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-50 text-green-700 text-xs font-medium border border-green-200"
        title={sourceName ? `Dados em tempo real via API: ${sourceName}` : "Dados reais"}
      >
        <CheckCircle2 size={12} className="text-green-600" />
        <span>Dados reais</span>
      </div>
    );
  }

  if (quality === "partial") {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200"
        title="Dados parciais ou processados com ressalvas"
      >
        <AlertTriangle size={12} className="text-amber-600" />
        <span>Dados parciais</span>
      </div>
    );
  }

  if (quality === "estimated") {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium border border-blue-200"
        title="Estimativa matemática ou paramétrica"
      >
        <HelpCircle size={12} className="text-blue-600" />
        <span>Estimativa</span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200"
      title="Dados simulados por falta de disponibilidade nas APIs fonte"
    >
      <AlertTriangle size={12} className="text-gray-500" />
      <span>Simulado (Fallback)</span>
    </div>
  );
}
