import { useState } from 'react'
import type { FormEvent } from "react";
import './App.css'

import orbit from "./assets/orbit_logo_var_neon_noBack.png";

type ChatMessage = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

let nextId = 0;

function App() {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  //This removes spaces from the beginning and end
  const isEmpty = text.trim().length === 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty == true) {
      return;
    }
  
    const userMessage: ChatMessage = {
      id: nextId++,
      text,
      sender: "user",
    };

    const aiReply: ChatMessage = {
      id: nextId++,
      text: "Message sent!",
      sender: "ai",
    };

    //Prev makes so that the previous messages dont disappear while adding a new one
    setMessages((prev) => [...prev, userMessage, aiReply]);
    //setText(""); // Clears the input field after sending the message
    setText("");
  };

  return (
    <div className="bg-black h-screen overflow-hidden flex flex-col">
      <h1 className="text-orange-500 text-4xl font-bold mt-4 text-center">
        Orbit
      </h1>
      <div className="flex justify-center mt-4">
        <img src={orbit} alt="Orbit" className="w-32 h-32" />
      </div>

      {/* Área das mensagens */}
      <div className="flex-1 overflow-y-auto px-6 mt-6 flex flex-col gap-3 max-w-2xl w-full mx-auto">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            Ainda não há mensagens. Escreve algo abaixo.
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <p
              className={`rounded-2xl px-4 py-2 text-sm max-w-xs break-words ${msg.sender === "user"
                  ? "text-white bg-gradient-to-br from-pink-500 to-orange-400 rounded-br-sm"
                  : "text-white bg-gray-800 rounded-bl-sm"
                }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      {/* Formulário fixo em baixo */}
      <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4">
        <div className="flex justify-center items-end gap-3 max-w-2xl mx-auto">
          <input
            className="border rounded px-3 py-2 text-gray-700 flex-1 bg-white"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreve a tua mensagem"
          />

          <button
            type="submit"
            disabled={isEmpty}
            title={isEmpty ? "Escreve algo antes de enviar" : undefined}
            className={`rounded px-4 py-2 text-sm font-medium transition-colors ${isEmpty
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "text-white bg-gradient-to-br from-pink-500 to-orange-400 cursor-pointer"
              }`}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;