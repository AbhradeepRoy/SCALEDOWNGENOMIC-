
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Languages, Globe } from 'lucide-react';
import { ScaleDownAI } from '../services/geminiService';
import { Chat } from '@google/genai';

const GeneBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const chatRef = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const languages = ["English", "Hindi (हिन्दी)", "Bengali (বাংলা)", "Telugu (తెలుగు)", "Tamil (தமிழ்)", "Marathi (मराठी)", "Kannada (ಕನ್ನಡ)"];

  // Initialize or re-initialize chat when language changes
  useEffect(() => {
    const ai = new ScaleDownAI();
    chatRef.current = ai.createChat(selectedLang);
  }, [selectedLang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // Use the chat session to maintain context
      const response = await chatRef.current.sendMessage({ message: userMsg });
      const botResponse = response.text || "I processed that, but I'm having trouble phrasing the synthesis. Let's try another angle.";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (e: any) {
      console.error("GeneBot Chat Error:", e);
      setMessages(prev => [...prev, { role: 'bot', content: "नमस्ते! I ran into a technical hurdle. Please try asking again. (त्रुटि: " + e.message + ")" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group border border-blue-400"
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">G</div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-bold pr-2">Ask Gene</span>
          <MessageSquare size={24} />
        </button>
      ) : (
        <div className="w-96 h-[550px] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="p-4 bg-blue-600 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xl shadow-inner">G</div>
              <div>
                <h3 className="font-bold text-sm">Gene Assistant</h3>
                <p className="text-[10px] opacity-90 flex items-center gap-1 font-medium">
                   <Globe size={10} className="animate-pulse" /> All Indian Languages Supported
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-500 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Lang Selector */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar">
             <Languages size={14} className="text-blue-500 shrink-0" />
             {languages.map(l => (
               <button 
                key={l}
                onClick={() => setSelectedLang(l)}
                className={`text-[10px] px-3 py-1 rounded-full transition-all font-semibold ${selectedLang === l ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
               >
                 {l}
               </button>
             ))}
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-slate-900/10 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center mt-12 space-y-4 px-6">
                 <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
                    <Bot size={32} />
                 </div>
                 <div className="space-y-2">
                   <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Namaste! I am Gene.</p>
                   <p className="text-xs text-slate-500 dark:text-slate-400 italic">"Helping you resolve multi-omics challenges in your native tongue."</p>
                 </div>
                 <div className="grid grid-cols-1 gap-2">
                    <button onClick={() => setInput("What is Semantic Genomic Compression?")} className="text-[10px] bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-2 rounded-lg text-left hover:border-blue-500 transition-colors">Explain Semantic Compression...</button>
                    <button onClick={() => setInput("Can you explain VEP scores in Hindi?")} className="text-[10px] bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-2 rounded-lg text-left hover:border-blue-500 transition-colors">VEP explain in Hindi...</button>
                 </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-600'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-600 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium italic">Gene is synthesizing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg">
            <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Gene anything..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-2xl py-3 px-5 pr-12 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white transition-all group-focus-within:shadow-md"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-md"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneBot;
