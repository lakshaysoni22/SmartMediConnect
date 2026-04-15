import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  timestamp: string;
  recommendation?: {
    title: string;
    items: string[];
  };
  quickActions?: {
    label: string;
    action: string;
  }[];
  additionalContent?: string;
}

interface ChatSession {
  id: number;
  title: string;
  date: string;
}

interface PatientHealthBotPageProps {
  onNavigateToEmergency?: () => void;
}

export function PatientHealthBotPage({ onNavigateToEmergency }: PatientHealthBotPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hello, John. I noticed you have an appointment next Tuesday. How can I help you regarding your health today?",
      timestamp: '09:41 AM'
    },
    {
      id: 2,
      type: 'user',
      content: "I'm feeling a bit dizzy after taking my new medication. Is this normal?",
      timestamp: '09:42 AM'
    },
    {
      id: 3,
      type: 'bot',
      content: "Dizziness can be a common side effect of certain medications, especially when starting a new prescription.",
      timestamp: '09:43 AM',
      recommendation: {
        title: 'Recommendation',
        items: [
          'Sit or lie down until the feeling passes.',
          'Stay hydrated.',
          'Avoid driving or operating heavy machinery.'
        ]
      },
      additionalContent: "If the dizziness persists for more than 24 hours or is accompanied by fainting, please visit the ER. Would you like me to notify your doctor about this symptom?",
      quickActions: [
        { label: 'Yes, notify doctor', action: 'notify' },
        { label: "No, I'm okay", action: 'dismiss' }
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  const recentSessions: ChatSession[] = [
    { id: 1, title: 'Flu Symptoms', date: '2 days ago' },
    { id: 2, title: 'Prescription Refill', date: '1 week ago' }
  ];

  const suggestedQueries = [
    'Check Interaction',
    'Book Appointment',
    'Side Effects'
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    const timeout = setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: "I understand your concern. Based on what you've shared, I recommend scheduling an appointment with your doctor to discuss this further. Would you like me to help you book an appointment?",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: 'Book Now', action: 'book' },
          { label: 'Maybe Later', action: 'later' }
        ]
      };
      setMessages(prev => [...prev, botResponse]);
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
    if (action === 'notify') {
      const confirmMessage: Message = {
        id: messages.length + 1,
        type: 'bot',
        content: "I've notified Dr. Sarah Admin about your dizziness symptom. She will review it and may reach out to you soon.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, confirmMessage]);
    }
  };

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full bg-white/30 backdrop-blur-sm">
      {/* Messages List */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Disclaimer Banner */}
        <div className="w-full flex justify-center sticky top-0 z-10 mb-4">
          <div className="px-4 py-2 rounded-full shadow-sm border border-yellow-200/50 bg-yellow-50/80 backdrop-blur-md flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-600 text-sm">info</span>
            <p className="text-yellow-800 text-xs font-medium text-center">
              AI Assistant. For medical emergencies, call 911 immediately.
            </p>
          </div>
        </div>

        {/* Timestamp */}
        <div className="text-center">
          <span className="text-xs font-medium text-gray-400 bg-gray-100/50 px-3 py-1 rounded-full">Today, 9:41 AM</span>
        </div>

        {/* Messages */}
        {messages.map((message, index) => (
          <div key={message.id}>
            {message.type === 'bot' ? (
              <div className="flex items-end gap-3 max-w-3xl">
                <div className="bg-gradient-to-br from-blue-50 to-white flex items-center justify-center rounded-full w-10 h-10 shrink-0 shadow-sm border border-blue-100">
                  <span className="material-symbols-outlined text-[#137fec] text-xl">smart_toy</span>
                </div>
                <div className="flex flex-col gap-1 items-start w-full max-w-[500px]">
                  <div className="p-4 rounded-2xl rounded-bl-sm flex flex-col gap-3" style={{
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                  }}>
                    <p className="text-[#111418] text-sm leading-relaxed">
                      {message.content}
                    </p>

                    {message.recommendation && (
                      <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
                        <h4 className="text-xs font-bold text-blue-800 mb-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">medication</span>
                          {message.recommendation.title}
                        </h4>
                        <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 ml-1">
                          {message.recommendation.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {message.additionalContent && (
                      <p className="text-[#111418] text-sm leading-relaxed">
                        {message.additionalContent}
                      </p>
                    )}
                  </div>

                  {message.quickActions && (
                    <div className="flex items-center gap-4 pl-1">
                      <span className="text-xs text-gray-400">{message.timestamp}</span>
                      <div className="flex gap-2 flex-wrap">
                        {message.quickActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickAction(action.action)}
                            className={`text-xs bg-white/60 hover:bg-white border border-gray-200 px-3 py-1 rounded-full font-medium transition-colors ${
                              idx === 0 ? 'text-[#137fec]' : 'text-gray-600'
                            }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!message.quickActions && (
                    <span className="text-xs text-gray-400 pl-1">{message.timestamp}</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-end gap-3 max-w-3xl ml-auto justify-end">
                <div className="flex flex-col gap-1 items-end">
                  <div className="bg-[#137fec] text-white p-4 rounded-2xl rounded-br-sm shadow-md shadow-blue-500/20">
                    <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                  </div>
                  <span className="text-xs text-gray-400 pr-1">{message.timestamp}</span>
                </div>
                <div className="bg-gradient-to-br from-[#137fec] to-blue-600 rounded-full w-10 h-10 shrink-0 border-2 border-white shadow-sm flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-xl">person</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-end gap-3 max-w-3xl">
            <div className="bg-gradient-to-br from-blue-50 to-white flex items-center justify-center rounded-full w-10 h-10 shrink-0 shadow-sm border border-blue-100">
              <span className="material-symbols-outlined text-[#137fec] text-xl">smart_toy</span>
            </div>
            <div className="p-4 rounded-2xl rounded-bl-sm shadow-sm" style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.4)'
            }}>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Spacer for bottom input area */}
        <div className="h-4"></div>
      </div>

      {/* Input Area */}
      <footer className="p-6 pt-2 shrink-0 relative z-20">
        {/* Suggested Chips */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {suggestedQueries.map((query, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestedQuery(query)}
              className="whitespace-nowrap bg-white/40 hover:bg-white/70 backdrop-blur-sm border border-white/50 px-3 py-1.5 rounded-full text-xs font-medium text-[#137fec] transition-colors shadow-sm"
            >
              {query}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg rounded-2xl p-2 flex items-end gap-2 transition-shadow focus-within:shadow-xl focus-within:ring-1 ring-[#137fec]/20">
          <button className="p-3 text-gray-400 hover:text-[#137fec] transition-colors rounded-xl hover:bg-blue-50">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full bg-transparent border-0 focus:ring-0 text-[#111418] text-sm placeholder:text-gray-400 resize-none py-3 max-h-32 outline-none"
            placeholder="Type your symptoms or question here..."
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />
          
          <div className="flex gap-1 pb-1">
            <button
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
              title="Voice Input"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-[#137fec] hover:bg-blue-600 text-white p-2 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px] ml-0.5">send</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}