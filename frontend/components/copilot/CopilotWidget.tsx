"use client";

import { useState } from "react";

export function CopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-50 border-2 border-surface/20"
        aria-label="Abrir Copiloto PID"
      >
        <span className="material-symbols-outlined text-[28px] icon-fill">smart_toy</span>
      </button>
    );
  }

  return (
    <aside className="bg-surface-container-highest fixed right-6 bottom-6 h-[600px] max-h-[85vh] z-50 flex flex-col p-md shadow-2xl rounded-2xl border border-outline-variant w-[400px] max-w-[calc(100vw-3rem)] transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-start pb-md border-b border-outline-variant/50 mb-md flex-shrink-0">
        <div className="flex items-center gap-md">
          <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container text-[28px] icon-fill">
              smart_toy
            </span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-primary leading-tight">
              Copiloto PID
            </h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Inteligência Analítica Institucional
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-1 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto pr-sm flex flex-col gap-lg pb-lg">
        {/* Intro Text */}
        <div className="bg-surface/60 rounded-xl p-md border border-outline-variant/30 backdrop-blur-sm">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Pergunte sobre viabilidade, restrições, retorno estimado ou comparação
            entre regiões. Estou conectado aos dados mais recentes do dashboard.
          </p>
        </div>

        {/* User Prompt */}
        <div className="flex justify-end">
          <div className="bg-surface border border-outline-variant rounded-2xl rounded-tr-sm px-md py-sm max-w-[85%] shadow-sm">
            <p className="font-body-md text-body-md text-primary">
              Qual a avaliação geral do eixo Boa Vista — Mucajaí comparado ao
              restante do estado?
            </p>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex gap-sm">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              smart_toy
            </span>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl rounded-tl-sm p-md border border-outline-variant/50 shadow-sm w-full">
            <p className="font-body-md text-body-md text-primary mb-sm leading-relaxed">
              A região <strong className="font-semibold">Boa Vista — Mucajaí</strong>{" "}
              apresenta melhor equilíbrio para implementação inicial.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-md leading-relaxed">
              Com base nos dados espaciais atuais, ela possui um Score de Viabilidade
              de 78/100, significativamente superior à média estadual devido à
              proximidade com infraestrutura viária primária. O custo estimado de
              implantação é 14% menor que áreas no sul do estado.
            </p>

            <div className="bg-[#B5446E]/10 border-l-4 border-[#B5446E] p-sm rounded-r mb-sm">
              <p className="font-label-md text-label-md text-[#550C18] flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                Ponto de Atenção Crítico
              </p>
              <p className="font-body-md text-body-md text-[#550C18] text-sm mt-1">
                O principal gargalo é a validação fundiária. 42% das propriedades
                elegíveis apresentam inconformidades no CAR que requerem diligência
                prévia.
              </p>
            </div>

            <div className="mt-md flex gap-sm border-t border-outline-variant/30 pt-sm">
              <button className="flex items-center gap-xs text-secondary font-label-sm text-label-sm hover:underline">
                <span className="material-symbols-outlined text-[16px]">map</span>
                Ver no mapa
              </button>
              <button className="flex items-center gap-xs text-secondary font-label-sm text-label-sm hover:underline ml-auto">
                <span className="material-symbols-outlined text-[16px]">
                  content_copy
                </span>
                Copiar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="pt-md border-t border-outline-variant bg-surface-container-highest flex-shrink-0">
        <div className="flex flex-wrap gap-sm mb-md">
          <button className="px-3 py-1.5 rounded-full border border-outline-variant text-primary font-label-sm text-label-sm bg-surface hover:bg-surface-container-high transition-colors text-left flex-grow">
            Por que essa região tem score maior?
          </button>
          <button className="px-3 py-1.5 rounded-full border border-outline-variant text-primary font-label-sm text-label-sm bg-surface hover:bg-surface-container-high transition-colors text-left flex-grow">
            Gere um resumo executivo
          </button>
        </div>

        <div className="relative">
          <textarea
            className="w-full pl-md pr-12 py-md bg-surface border border-outline-variant rounded-xl font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none h-[100px]"
            placeholder="Faça uma pergunta sobre os dados..."
          ></textarea>
          <button className="absolute right-sm bottom-sm w-8 h-8 rounded-full bg-[#FA441A] text-white flex items-center justify-center hover:bg-[#de3002] transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
        <div className="text-center mt-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
            A IA pode cometer erros. Verifique os relatórios base.
          </span>
        </div>
      </div>
    </aside>
  );
}
