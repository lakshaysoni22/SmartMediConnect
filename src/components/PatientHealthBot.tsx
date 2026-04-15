import React, { useState, useRef, useEffect } from 'react';
import { PatientSectionHeader } from './PatientSectionHeader';

interface PatientHealthBotProps {
  onNavigate?: (page: string) => void;
}

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  timestamp: string;
  quickActions?: string[];
}

export function PatientHealthBot({ onNavigate }: PatientHealthBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hello Sarah. I hope you're having a good day. How are you feeling right now? Please describe your symptoms in detail so I can assist you better.",
      timestamp: '10:23 AM',
      quickActions: ['I have a headache', 'Fever symptoms', 'Side effects']
    },
    {
      id: 2,
      type: 'user',
      content: "Hi, I've had a persistent throbbing headache on the left side of my head for about 2 days now. It gets worse when I look at bright lights.",
      timestamp: '10:24 AM'
    },
    {
      id: 3,
      type: 'bot',
      content: "I understand. Sensitivity to light combined with a one-sided headache can be a sign of a migraine.\n\nAre you experiencing any nausea or dizziness along with the headache?",
      timestamp: '10:24 AM'
    },
    {
      id: 4,
      type: 'user',
      content: "A little bit of nausea, yes. No dizziness though.",
      timestamp: '10:25 AM'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    const timeout = setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: "I understand your concern. Let me help you with that. Could you provide more details about your symptoms?",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
    timeoutRefs.current.push(timeout);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: action,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setIsTyping(true);

    const timeout = setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: "Thank you for sharing that. Let me help you understand this better.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
    timeoutRefs.current.push(timeout);
  };

  return (
    <div className="flex h-full overflow-hidden bg-slate-50/50 dark:bg-black/50">
      {/* Main Content */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Header */}
        <header className="h-16 px-6 flex items-center justify-between shrink-0 z-30 bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[#137fec]">
                  <span className="material-symbols-outlined">smart_toy</span>
                </div>
                <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
              </div>
              <div>
                <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">Health Assistant Bot</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-green-500 inline-block"></span> Online
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate?.('emergency')}
              className="hidden sm:flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-md shadow-red-600/20 transition-all animate-pulse"
            >
              <span className="material-symbols-outlined text-[18px]">emergency</span>
              <span>Emergency: 911</span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
            <button className="size-10 rounded-full bg-cover bg-center border-2 border-white dark:border-slate-700 shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEyDIvYQPe_VDDNuU2m3KH7UYJe3yJkpIJDzS5V6gFougVZAU9hYyN3NHhwUYaUWguxiyiro7NpRf6HWRTIPnZ2pgrEQl_BiXQIDWziQsk1OaUEOAP-2PfyEvEKh9Z5g5ok6oAI4AUhxgs2d7Aw3zUxfJWHaZOt4-sz9oB2c8mXf7An_y02yAwFHQX5LxfHgshcqzAWU7FRkon39Ln6xQsEAwefdgITbcNKWohge6Vkry1cGCDzY3h3eFCa1Agboax3c-UwfQGVGNu')" }}></button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-32 scroll-smooth" id="chat-container">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {/* Disclaimer */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg p-3 flex gap-3 items-start">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 shrink-0">info</span>
              <p className="text-sm text-amber-900 dark:text-amber-100">
                <strong>Disclaimer:</strong> This is an AI assistant. It cannot diagnose medical conditions. If you are experiencing a medical emergency, please call 911 or visit the nearest emergency room immediately.
              </p>
            </div>

            {/* Date Divider */}
            <div className="flex items-center gap-4 my-2">
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
              <span className="text-xs text-slate-400 font-medium">Today, 10:23 AM</span>
              <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
            </div>

            {/* Messages */}
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                {message.type === 'bot' ? (
                  <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[#137fec] shrink-0 mt-1">
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                  </div>
                ) : (
                  <div className="size-8 rounded-full bg-cover bg-center shrink-0 mt-1" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFff8mops4PVWvpd7f59vD3JdihYj5UIpvhxhk7fNDRntMreMB8SpYCTBKMqTpDqSLtVeQJQY-hwJSv-3fb5mlbpgdnfajRaujp27HC8EZTcWp-O-rhLa2uCJfA4ByrWdoJ91zwcGUyFaSAOEVdZYgAV5WX0W4yJAeq82X9PogGRzxgaw4SfKupDIdevPc6DRNHydUz2xgIJLb-U_gqCxamiSt8x1hyd50Pl__fl63Agejg3gyC46N1kx-Dv38YH63FxNiWg7Q5SnO')" }}></div>
                )}

                {/* Message Content */}
                <div className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[75%] ${message.type === 'user' ? 'items-end' : ''}`}>
                  <span className={`text-xs text-slate-500 ${message.type === 'user' ? 'mr-1' : 'ml-1'}`}>
                    {message.type === 'bot' ? 'Health Assistant' : 'You'}
                  </span>
                  <div className={`p-4 rounded-2xl ${message.type === 'bot' ? 'bg-white dark:bg-slate-800 rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700' : 'bg-[#137fec] rounded-tr-none shadow-md shadow-blue-500/20'}`}>
                    <p className={`text-sm leading-relaxed whitespace-pre-line ${message.type === 'bot' ? 'text-slate-700 dark:text-slate-200' : 'text-white'}`}>
                      {message.content}
                    </p>
                  </div>

                  {/* Quick Actions */}
                  {message.quickActions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.quickActions.map((action, idx) => (
                        <button 
                          key={idx}
                          onClick={() => handleQuickAction(action)}
                          className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-[#137fec] transition-all"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[#137fec] shrink-0 mt-1">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-500 ml-1">Health Assistant</span>
                  <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700 w-24">
                    <div className="flex items-center gap-1.5 h-full justify-center">
                      <div className="size-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="size-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="size-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area (Fixed Bottom) */}
        <div className="absolute bottom-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800 px-6 py-4 z-40">
          <div className="max-w-3xl mx-auto flex gap-3 items-end">
            <button 
              className="p-3 text-slate-400 hover:text-[#137fec] hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full transition-colors flex-shrink-0" 
              title="Attach file"
            >
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <div className="flex-1 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-[#137fec]/20 focus-within:border-[#137fec] transition-all flex flex-col">
              <textarea 
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-transparent border-none rounded-2xl focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 p-3 resize-none text-sm max-h-32" 
                placeholder="Type your symptoms or question..." 
                rows={1}
              />
            </div>
            <button 
              onClick={handleSendMessage}
              className="p-3 bg-[#137fec] hover:bg-[#0f65bd] text-white rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center flex-shrink-0 group"
            >
              <span className="material-symbols-outlined group-hover:translate-x-0.5 transition-transform">send</span>
            </button>
          </div>
          <div className="text-center mt-2">
            <p className="text-[10px] text-slate-400">AI can make mistakes. Consider checking important information.</p>
          </div>
        </div>
      </main>
    </div>
  );
}