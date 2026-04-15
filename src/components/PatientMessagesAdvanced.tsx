import React, { useState, useRef, useEffect } from 'react';

interface Conversation {
  id: string;
  doctor: string;
  doctorInitials: string;
  specialty: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  sender: 'patient' | 'doctor';
  content: string;
  timestamp: Date;
  read: boolean;
  attachment?: {
    type: 'image' | 'file';
    name: string;
    size: string;
  };
}

export function PatientMessagesAdvanced() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      doctor: 'Dr. Sarah Mitchell',
      doctorInitials: 'SM',
      specialty: 'Cardiologist',
      lastMessage: 'Your ECG results look good. Continue with current medication.',
      timestamp: '10 min ago',
      unread: 2,
      online: true
    },
    {
      id: '2',
      doctor: 'Dr. James Wilson',
      doctorInitials: 'JW',
      specialty: 'General Physician',
      lastMessage: 'Please schedule a follow-up appointment for next week.',
      timestamp: '2 hours ago',
      unread: 0,
      online: false
    },
    {
      id: '3',
      doctor: 'Dr. Emily Chen',
      doctorInitials: 'EC',
      specialty: 'Dermatologist',
      lastMessage: 'The treatment is showing good progress.',
      timestamp: 'Yesterday',
      unread: 0,
      online: true
    },
    {
      id: '4',
      doctor: 'Dr. Michael Brown',
      doctorInitials: 'MB',
      specialty: 'Orthopedic',
      lastMessage: 'Physical therapy twice a week is recommended.',
      timestamp: '2 days ago',
      unread: 1,
      online: false
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'patient',
      content: 'Good morning Dr. Mitchell. I wanted to follow up on my recent ECG test.',
      timestamp: new Date(2026, 0, 17, 9, 30),
      read: true
    },
    {
      id: '2',
      sender: 'doctor',
      content: 'Good morning! I\'ve reviewed your ECG results and they look very good. The slight irregularity we were monitoring has improved significantly.',
      timestamp: new Date(2026, 0, 17, 9, 45),
      read: true
    },
    {
      id: '3',
      sender: 'patient',
      content: 'That\'s great news! Should I continue with the current medication?',
      timestamp: new Date(2026, 0, 17, 10, 0),
      read: true
    },
    {
      id: '4',
      sender: 'doctor',
      content: 'Yes, please continue with your current medication. Keep monitoring your heart rate and blood pressure daily.',
      timestamp: new Date(2026, 0, 17, 10, 5),
      read: true
    },
    {
      id: '5',
      sender: 'doctor',
      content: 'I\'ve attached your ECG report. Let me know if you have any questions.',
      timestamp: new Date(2026, 0, 17, 10, 6),
      read: false,
      attachment: {
        type: 'file',
        name: 'ECG_Report_Jan2026.pdf',
        size: '2.4 MB'
      }
    }
  ]);

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
  }, [selectedConversation, messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: (Date.now()).toString(),
      sender: 'patient',
      content: inputText,
      timestamp: new Date(),
      read: true
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate doctor typing response
    const timeout = setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'doctor',
        content: "Thank you for your message. I'll review this and get back to you shortly.",
        timestamp: new Date(),
        read: false
      };
      setMessages(prev => [...prev, autoReply]);
    }, 2000);
    timeoutRefs.current.push(timeout);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedConversation ? (messages.filter(msg => msg.sender === 'doctor') || []) : [];

  return (
    <div className="h-full bg-slate-50 dark:bg-black flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-4xl">
                chat
              </span>
              Messages
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Communicate with your healthcare providers
            </p>
          </div>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">add</span>
            New Message
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Conversations List */}
        <div className={`${selectedConversation ? 'hidden lg:block lg:w-96' : 'flex-1'} border-r border-slate-200 dark:border-slate-800 overflow-y-auto bg-white dark:bg-slate-900`}>
          {/* Search */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Conversation Items */}
          <div>
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 text-left transition-all hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 ${
                  selectedConversation?.id === conv.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600'
                    : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {conv.doctorInitials}
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white truncate">{conv.doctor}</h3>
                        <p className="text-xs text-blue-600 dark:text-blue-400">{conv.specialty}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 dark:text-slate-400">{conv.timestamp}</span>
                        {conv.unread > 0 && (
                          <span className="inline-block mt-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{conv.lastMessage}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col bg-slate-50 dark:bg-black">
            {/* Chat Header */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="lg:hidden text-blue-600 dark:text-blue-400"
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedConversation.doctorInitials}
                    </div>
                    {selectedConversation.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{selectedConversation.doctor}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedConversation.online ? 'Online' : 'Offline'} • {selectedConversation.specialty}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">call</span>
                  </button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">videocam</span>
                  </button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">more_vert</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.sender === 'patient' ? 'order-2' : 'order-1'}`}>
                    {message.sender === 'doctor' && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {selectedConversation.doctorInitials}
                        </div>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                          {selectedConversation.doctor}
                        </span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-4 ${
                        message.sender === 'patient'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                      {message.attachment && (
                        <div className={`mt-3 p-3 rounded-lg flex items-center gap-3 ${
                          message.sender === 'patient'
                            ? 'bg-blue-700'
                            : 'bg-slate-50 dark:bg-slate-900'
                        }`}>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            message.sender === 'patient'
                              ? 'bg-blue-800'
                              : 'bg-blue-100 dark:bg-blue-900/30'
                          }`}>
                            <span className={`material-symbols-outlined ${
                              message.sender === 'patient'
                                ? 'text-white'
                                : 'text-blue-600 dark:text-blue-400'
                            }`}>
                              {message.attachment.type === 'image' ? 'image' : 'description'}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold truncate ${
                              message.sender === 'patient'
                                ? 'text-white'
                                : 'text-slate-900 dark:text-white'
                            }`}>
                              {message.attachment.name}
                            </p>
                            <p className={`text-xs ${
                              message.sender === 'patient'
                                ? 'text-blue-200'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}>
                              {message.attachment.size}
                            </p>
                          </div>
                          <button className={`p-2 rounded-lg ${
                            message.sender === 'patient'
                              ? 'bg-blue-800 hover:bg-blue-900'
                              : 'bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                          }`}>
                            <span className={`material-symbols-outlined text-[20px] ${
                              message.sender === 'patient'
                                ? 'text-white'
                                : 'text-blue-600 dark:text-blue-400'
                            }`}>
                              download
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                    <p className={`text-xs mt-1 px-2 ${
                      message.sender === 'patient'
                        ? 'text-right text-slate-500 dark:text-slate-400'
                        : 'text-left text-slate-500 dark:text-slate-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {message.sender === 'patient' && (
                        <span className="ml-2">
                          {message.read ? '✓✓' : '✓'}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-4">
              <div className="flex gap-3">
                <button className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">attach_file</span>
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-black">
            <div className="text-center">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-8xl mb-4">
                chat
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Select a conversation</h3>
              <p className="text-slate-600 dark:text-slate-400">Choose a doctor to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}