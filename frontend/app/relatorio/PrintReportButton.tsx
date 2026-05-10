"use client";

import { FileDown } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/Button";

export function PrintReportButton() {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <Button
      onClick={handlePrint}
      title="Abrir diálogo de impressão para salvar o relatório em PDF"
      type="button"
    >
      <FileDown aria-hidden="true" size={18} strokeWidth={2.4} />
      Baixar PDF
    </Button>
  );
}
