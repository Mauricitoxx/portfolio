'use client';

import { useState, useRef, useEffect } from 'react';
import { BotMessageSquare, X, Send } from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
};

export default function ChatAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', content: '¡Hola! Soy el asistente virtual de Mauro. ¿En qué te puedo ayudar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // 💡 EASTER EGG: "7 y 72"
    if (input.toLowerCase().includes('7 y 72')) {
      const easterEggMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: '🌳 ¡Ah! El Bosque... Tierra de diagonales y buen código. Si andás por ahí, avísame y nos tomamos unos mates analizando sistemas. 🧉'
      };
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: input }]);
      setInput('');
      setIsLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, easterEggMsg]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content }),
      });
      
      const data = await response.json();
      
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'bot', 
        content: data.reply || 'Hubo un error de conexión.' 
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'bot', 
        content: 'Hubo un error de conexión.' 
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      {/* Botón para abrir el chat */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
        >
          <BotMessageSquare className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Ventana del Chat (Apple Glassmorphism Style) */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[500px] bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300">
          <div className="bg-white/5 p-4 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-inner">
                <BotMessageSquare size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-white/90 font-medium text-sm tracking-tight">Suchus AI</h3>
                <p className="text-white/40 text-[10px]">Asistente Virtual</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] text-sm px-4 py-2.5 rounded-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-sm shadow-md' : 'bg-white/10 text-white/90 rounded-bl-sm border border-white/5 shadow-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-white/90 px-4 py-2.5 rounded-2xl rounded-bl-sm border border-white/5 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="p-4 bg-white/5 border-t border-white/5 flex gap-3 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mensaje..."
              className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:bg-white/10 transition-colors"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-blue-500 hover:bg-blue-400 text-white p-2.5 rounded-full disabled:opacity-50 transition-colors shadow-md"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
