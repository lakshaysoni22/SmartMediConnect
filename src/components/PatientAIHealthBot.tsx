import React, { useState, useRef, useEffect } from 'react';
import { getHealthcareAssistantReply } from '../utils/geminiHealthBot';
import { logHealthBotExchange } from '../lib/supabaseWrites';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

interface PatientAIHealthBotProps {
  onNavigate?: (page: string) => void;
}

export function PatientAIHealthBot({ onNavigate }: PatientAIHealthBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hello Sarah. I hope you're having a good day. How are you feeling right now? Please describe your symptoms in detail so I can assist you better.",
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'user',
      text: "Hi, I've had a persistent throbbing headache on the left side of my head for about 2 days now. It gets worse when I look at bright lights.",
      timestamp: new Date()
    },
    {
      id: '3',
      type: 'bot',
      text: "I understand. Sensitivity to light combined with a one-sided headache can be a sign of a migraine.\n\nAre you experiencing any nausea or dizziness along with the headache?",
      timestamp: new Date()
    },
    {
      id: '4',
      type: 'user',
      text: "A little bit of nausea, yes. No dizziness though.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userText = inputMessage.trim();
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiReply = await getHealthcareAssistantReply(userText);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: aiReply,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botResponse]);
      void logHealthBotExchange(userText, aiReply);
    } catch {
      const fallback = 'Sorry, I am unable to respond right now. Please try again.';
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: fallback,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botResponse]);
      void logHealthBotExchange(userText, fallback);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (text: string) => {
    setInputMessage(text);
  };

  const handleTopicClick = (topic: string) => {
    const topicMessages: Record<string, string> = {
      'Common Symptoms': 'Can you help me understand common symptoms like fever, headache, and cough?',
      'Chronic Diseases': 'I would like to know more about managing chronic diseases like diabetes and hypertension.',
      'Medications': 'I have questions about medication interactions and proper dosage.',
      'Prevention Tips': 'What are some healthy lifestyle tips for disease prevention?',
      'Mental Health': 'I need advice on managing stress, anxiety, and mental wellbeing.',
      'Nutrition': 'Can you provide guidance on diet and nutrition for better health?'
    };

    if (topicMessages[topic]) {
      setInputMessage(topicMessages[topic]);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#137fec] rounded-lg flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white text-[22px]">smart_toy</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Health AI Assistant</h1>
                <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800/30">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  Online
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Ask about symptoms, medications, or wellness tips</p>
            </div>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white p-2.5 hover:px-6 rounded-full font-bold flex items-center justify-center gap-0 hover:gap-2 shadow-lg shadow-red-600/20 transition-all duration-300 hover:scale-105 active:scale-95 group">
            <span className="material-symbols-outlined text-[20px]">emergency</span>
            <span className="hidden group-hover:inline-block whitespace-nowrap">Emergency: 911</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden px-6 py-4 space-y-4">
        <div className="max-w-7xl mx-auto space-y-4 h-full flex flex-col">
          {/* Medical Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-3 rounded-xl flex gap-2">
            <span className="material-symbols-outlined text-amber-500 flex-shrink-0 text-[18px]">info</span>
            <p className="text-xs text-amber-800 dark:text-amber-200">
              <span className="font-bold underline decoration-amber-500/50">Medical Disclaimer:</span> This AI assistant provides general information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician for health concerns.
            </p>
          </div>

          {/* Topic Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => handleTopicClick('Common Symptoms')}
              className="bg-white dark:bg-slate-800 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-3 rounded-2xl text-left hover:ring-2 ring-primary transition-all duration-300 group shadow-sm h-auto flex flex-col items-center justify-center"
            >
              <div className="w-11 h-11 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center transition-all duration-300">
                <span className="material-symbols-outlined text-[22px]">coronavirus</span>
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mt-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300">Common Symptoms</h3>
            </button>

            <button
              onClick={() => handleTopicClick('Chronic Diseases')}
              className="bg-white dark:bg-slate-800 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-3 rounded-2xl text-left hover:ring-2 ring-primary transition-all duration-300 group shadow-sm h-auto flex flex-col items-center justify-center"
            >
              <div className="w-11 h-11 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center transition-all duration-300">
                <span className="material-symbols-outlined text-[22px]">favorite</span>
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mt-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300">Chronic Diseases</h3>
            </button>

            <button
              onClick={() => handleTopicClick('Medications')}
              className="bg-white dark:bg-slate-800 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-3 rounded-2xl text-left hover:ring-2 ring-primary transition-all duration-300 group shadow-sm h-auto flex flex-col items-center justify-center"
            >
              <div className="w-11 h-11 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center transition-all duration-300">
                <span className="material-symbols-outlined text-[22px]">medication</span>
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mt-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300">Medications</h3>
            </button>

            <button
              onClick={() => handleTopicClick('Prevention Tips')}
              className="bg-white dark:bg-slate-800 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-3 rounded-2xl text-left hover:ring-2 ring-primary transition-all duration-300 group shadow-sm h-auto flex flex-col items-center justify-center"
            >
              <div className="w-11 h-11 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center transition-all duration-300">
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mt-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300">Prevention Tips</h3>
            </button>

            <button
              onClick={() => handleTopicClick('Mental Health')}
              className="bg-white dark:bg-slate-800 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-3 rounded-2xl text-left hover:ring-2 ring-primary transition-all duration-300 group shadow-sm h-auto flex flex-col items-center justify-center"
            >
              <div className="w-11 h-11 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center transition-all duration-300">
                <span className="material-symbols-outlined text-[22px]">psychology</span>
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mt-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300">Mental Health</h3>
            </button>

            <button
              onClick={() => handleTopicClick('Nutrition')}
              className="bg-white dark:bg-slate-800 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-3 rounded-2xl text-left hover:ring-2 ring-primary transition-all duration-300 group shadow-sm h-auto flex flex-col items-center justify-center"
            >
              <div className="w-11 h-11 bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 rounded-xl flex items-center justify-center transition-all duration-300">
                <span className="material-symbols-outlined text-[22px]">restaurant</span>
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mt-2 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300">Nutrition</h3>
            </button>
          </div>

          {/* Chat Container */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 rounded-[2rem] overflow-hidden flex flex-col shadow-xl shadow-slate-200/50 dark:shadow-none flex-1">
            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="overflow-y-auto p-3 space-y-3 custom-scrollbar flex-1"
            >
              {/* Timestamp Divider */}
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] bg-slate-200 dark:bg-slate-700 flex-1"></div>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}, {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </span>
                <div className="h-[1px] bg-slate-200 dark:bg-slate-700 flex-1"></div>
              </div>

              {/* Messages */}
              {messages.map((message) => (
                message.type === 'bot' ? (
                  <div key={message.id} className="flex gap-4 max-w-[80%]">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-400 ml-1">Health AI Assistant</span>
                      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm">
                        <p className="leading-relaxed text-sm text-slate-900 dark:text-slate-100 whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="flex flex-row-reverse gap-4 max-w-[80%] ml-auto">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="text-xs font-semibold text-slate-400 mr-1">You</span>
                      <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-lg shadow-primary/20">
                        <p className="leading-relaxed text-sm">{message.text}</p>
                      </div>
                    </div>
                  </div>
                )
              ))}

              {isTyping && (
                <div className="flex gap-4 max-w-[80%]">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-400 ml-1">Health AI Assistant</span>
                    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm">
                      <p className="leading-relaxed text-sm text-slate-900 dark:text-slate-100">Typing...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
              {/* Quick Reply Buttons */}
              <div className="flex flex-wrap gap-2 mb-2">
                <button
                  onClick={() => handleQuickReply('I have a headache')}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm text-slate-900 dark:text-slate-100"
                >
                  I have a headache
                </button>
                <button
                  onClick={() => handleQuickReply('Fever symptoms')}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm text-slate-900 dark:text-slate-100"
                >
                  Fever symptoms
                </button>
                <button
                  onClick={() => handleQuickReply('Side effects')}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm text-slate-900 dark:text-slate-100"
                >
                  Side effects
                </button>
                <button className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm text-slate-900 dark:text-slate-100 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  Book appointment
                </button>
              </div>

              {/* Message Input */}
              <div className="relative flex items-center gap-2">
                <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">attach_file</span>
                </button>
                <div className="flex-1 relative">
                  <input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full pl-4 pr-12 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white placeholder:text-slate-400 transition-all shadow-inner text-sm"
                    placeholder="Type your symptoms or question..."
                    type="text"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-primary/30"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-center text-slate-400 mt-2">
                AI can make mistakes. Consider checking important information.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Help Button */}
      <div className="fixed bottom-8 right-8 z-50">
        {/* Button removed */}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
        }
      `}</style>
    </div>
  );
}