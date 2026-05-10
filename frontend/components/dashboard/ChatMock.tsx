"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";

const suggestions = [
  "Por que essa região tem score maior?",
  "Quais são os principais riscos socioambientais?",
  "Compare Boa Vista e Rorainópolis para uma usina de 5 MW.",
  "Explique o payback estimado.",
  "Gere um resumo executivo para investidores.",
];

const mockAnswer =
  "A região Boa Vista — Mucajaí apresenta melhor equilíbrio entre potencial solar, proximidade de infraestrutura elétrica e menor incidência de restrições críticas. O principal ponto de atenção é a validação fundiária e o custo de conexão.";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export function ChatMock() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Pergunte sobre viabilidade, restrições, retorno estimado ou comparação entre regiões.",
    },
  ]);
  const [input, setInput] = useState("");

  function submitQuestion(question: string) {
    const trimmed = question.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "assistant", text: mockAnswer },
    ]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(input);
  }

  return (
    <div className="chat-mock">
      <div className="chat-mock__suggestions" aria-label="Sugestões de perguntas">
        {suggestions.map((question) => (
          <button key={question} onClick={() => submitQuestion(question)} type="button">
            {question}
          </button>
        ))}
      </div>

      <div className="chat-mock__messages" aria-live="polite">
        {messages.map((message, index) => (
          <div className={`chat-message chat-message--${message.role}`} key={`${message.role}-${index}`}>
            {message.text}
          </div>
        ))}
      </div>

      <form className="chat-mock__form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="copiloto-message">
          Mensagem para o Copiloto PID
        </label>
        <input
          id="copiloto-message"
          onChange={(event) => setInput(event.target.value)}
          placeholder="Faça uma pergunta sobre a análise..."
          value={input}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
}
