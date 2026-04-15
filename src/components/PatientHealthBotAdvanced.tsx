import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  options?: string[];
}

export function PatientHealthBotAdvanced() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "👋 Hello! I'm your AI Health Assistant. I can help you with:\n\n• Symptom assessment\n• Medication information\n• Health tips\n• Appointment booking\n• Emergency guidance\n\nHow can I help you today?",
      timestamp: new Date(),
      options: ['Check Symptoms', 'Medication Info', 'Book Appointment', 'Health Tips', 'Emergency']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const botResponses: { [key: string]: string } = {
    'check symptoms': "I can help assess your symptoms. Please describe what you're experiencing:\n\n• When did symptoms start?\n• What are you feeling?\n• Any fever or pain level?\n\nNote: For severe symptoms like chest pain, difficulty breathing, or severe bleeding, please call emergency services immediately!",
    'medication info': "I can provide information about:\n\n• Current medications\n• Drug interactions\n• Side effects\n• Dosage instructions\n\nWhat medication would you like to know about?",
    'book appointment': "I can help you schedule an appointment! What type of doctor would you like to see?\n\n• General Physician\n• Specialist (Cardiologist, Dermatologist, etc.)\n• Dentist\n• Mental Health Professional",
    'health tips': "Here are some daily health tips:\n\n💧 **Hydration**: Drink 8 glasses of water daily\n🏃 **Exercise**: 30 minutes of activity daily\n🥗 **Nutrition**: Eat colorful fruits and vegetables\n😴 **Sleep**: Aim for 7-8 hours nightly\n🧘 **Stress**: Practice mindfulness or meditation\n\nWhat specific area would you like tips about?",
    'emergency': "🚨 **EMERGENCY GUIDANCE**\n\nCall 911 immediately if experiencing:\n• Chest pain or pressure\n• Difficulty breathing\n• Severe bleeding\n• Loss of consciousness\n• Stroke symptoms (FAST)\n• Severe allergic reaction\n\nFor non-emergencies, would you like to:\n• Find nearest urgent care\n• Schedule same-day appointment\n• Speak with on-call nurse",
    'headache': "I understand you have a headache. Let me help assess this:\n\n**Questions:**\n1. How long have you had this headache?\n2. On a scale of 1-10, how severe is it?\n3. Is it accompanied by:\n   • Nausea/vomiting?\n   • Vision changes?\n   • Fever?\n   • Neck stiffness?\n\n**Common causes:**\n• Tension headache\n• Migraine\n• Dehydration\n• Eye strain\n\nWould you like me to help you book an appointment with a doctor?",
    'fever': "You mentioned having a fever. Let me gather some information:\n\n**Temperature Check:**\n• What is your current temperature?\n• Normal: 98.6°F (37°C)\n• Low fever: 99-100.4°F\n• Fever: Above 100.4°F (38°C)\n\n**Other symptoms?**\n• Chills or sweating?\n• Body aches?\n• Cough or sore throat?\n• Difficulty breathing?\n\n**Home care:**\n• Rest and stay hydrated\n• Acetaminophen or Ibuprofen\n• Monitor temperature\n\nShall I schedule a telehealth appointment for you?",
    'thank you': "You're very welcome! 😊\n\nIs there anything else I can help you with today?\n\n• More symptom checks\n• Medication questions\n• Health tips\n• Book appointment",
    'yes': "Great! I'm here to help. What would you like assistance with?",
    'no': "No problem! If you need anything later, just type your question.\n\nStay healthy! 🌟"
  };

  const getDefaultResponse = () => {
    return "I understand. While I can provide general health information, I recommend:\n\n1. **Consulting a healthcare provider** for specific medical advice\n2. **Scheduling an appointment** through our platform\n3. **Calling emergency services** if symptoms are severe\n\nWould you like me to:\n• Help you find a doctor?\n• Book an appointment?\n• Provide general health information?";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: inputText,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    const timeout = setTimeout(() => {
      const lowercaseInput = inputText.toLowerCase();
      let botResponse = getDefaultResponse();
      let options: string[] | undefined;

      // Check for keyword matches
      for (const [key, response] of Object.entries(botResponses)) {
        if (lowercaseInput.includes(key)) {
          botResponse = response;
          break;
        }
      }

      // Add contextual options
      if (lowercaseInput.includes('appointment') || lowercaseInput.includes('book')) {
        options = ['General Physician', 'Cardiologist', 'Dermatologist', 'Dentist'];
      } else if (lowercaseInput.includes('symptom')) {
        options = ['Headache', 'Fever', 'Cough', 'Stomach Pain', 'Other'];
      }

      const botResponseMessage: Message = {
        id: (messages.length + 2).toString(),
        type: 'bot',
        text: botResponse,
        timestamp: new Date(),
        options
      };

      setMessages((prev) => [...prev, botResponseMessage]);
      setIsTyping(false);
    }, 1500);
    timeoutRefs.current.push(timeout);
  };

  const handleQuickOption = (option: string) => {
    setInputText(option);
    const timeout = setTimeout(() => handleSendMessage(), 100);
    timeoutRefs.current.push(timeout);
  };

  const quickActions = [
    { icon: 'medical_services', text: 'Symptoms', action: 'Check Symptoms' },
    { icon: 'medication', text: 'Medications', action: 'Medication Info' },
    { icon: 'event', text: 'Book', action: 'Book Appointment' },
    { icon: 'emergency', text: 'Emergency', action: 'Emergency' }
  ];

  return (
    <div className="h-full bg-slate-50 dark:bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 px-4 md:px-8 py-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">smart_toy</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">AI Health Assistant</h1>
              <p className="text-purple-100 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online - Ready to help 24/7
              </p>
            </div>
          </div>
          <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-4">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickOption(action.action)}
              className="flex flex-col items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all"
            >
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">{action.icon}</span>
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{action.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] md:max-w-[70%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              {message.type === 'bot' && (
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white text-[16px]">smart_toy</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Health Assistant</span>
                </div>
              )}
              <div
                className={`rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white ml-auto'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                {message.options && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {message.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickOption(option)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                          message.type === 'user'
                            ? 'bg-white/20 hover:bg-white/30 text-white'
                            : 'bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-400'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 px-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[16px]">smart_toy</span>
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Health Assistant</span>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 md:px-8 py-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your health question..."
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="material-symbols-outlined">send</span>
            <span className="hidden md:inline">Send</span>
          </button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
          ⚠️ This is an AI assistant for general information only. For medical emergencies, call 911.
        </p>
      </div>
    </div>
  );
}