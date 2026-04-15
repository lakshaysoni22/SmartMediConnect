import React, { useState, useRef, useEffect } from 'react';

interface Conversation {
  id: string;
  patient: string;
  patientInitials: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  urgent: boolean;
}

interface Message {
  id: string;
  sender: 'me' | 'patient';
  text: string;
  timestamp: Date;
  read: boolean;
  attachment?: {
    type: 'image' | 'file';
    name: string;
    size: string;
  };
}

export function DoctorMessagesAdvanced() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      patient: 'Sarah Jenkins',
      patientInitials: 'SJ',
      lastMessage: 'Thank you for the ECG results, Doctor.',
      timestamp: '5 min ago',
      unread: 1,
      online: true,
      urgent: false
    },
    {
      id: '2',
      patient: 'Marcus Wright',
      patientInitials: 'MW',
      lastMessage: 'I\'m experiencing chest pain again.',
      timestamp: '1 hour ago',
      unread: 2,
      online: true,
      urgent: true
    },
    {
      id: '3',
      patient: 'Emily Chen',
      patientInitials: 'EC',
      lastMessage: 'The incision is healing well.',
      timestamp: 'Yesterday',
      unread: 0,
      online: false,
      urgent: false
    },
    {
      id: '4',
      patient: 'David Miller',
      patientInitials: 'DM',
      lastMessage: 'My glucose levels are stable now.',
      timestamp: '2 days ago',
      unread: 0,
      online: false,
      urgent: false
    },
    {
      id: '5',
      patient: 'Jennifer Lopez',
      patientInitials: 'JL',
      lastMessage: 'The migraine medication is working great!',
      timestamp: '3 days ago',
      unread: 1,
      online: true,
      urgent: false
    }
  ]);

  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
    '1': [
      {
        id: '1',
        sender: 'patient',
        text: 'Good morning Dr. Mitchell. Did you get a chance to review my ECG results?',
        timestamp: new Date(2026, 0, 17, 9, 0),
        read: true
      },
      {
        id: '2',
        sender: 'me',
        text: 'Good morning Sarah! Yes, I\'ve reviewed your ECG and the results look very promising. The irregularity we were monitoring has improved significantly.',
        timestamp: new Date(2026, 0, 17, 9, 15),
        read: true
      },
      {
        id: '3',
        sender: 'patient',
        text: 'That\'s wonderful news! What should I do next?',
        timestamp: new Date(2026, 0, 17, 9, 20),
        read: true
      },
      {
        id: '4',
        sender: 'me',
        text: 'Continue with your current medication regimen. I\'ve attached your detailed report. Let\'s schedule a follow-up in 3 months.',
        timestamp: new Date(2026, 0, 17, 9, 25),
        read: true,
        attachment: {
          type: 'file',
          name: 'ECG_Report_SarahJenkins_Jan2026.pdf',
          size: '2.8 MB'
        }
      },
      {
        id: '5',
        sender: 'patient',
        text: 'Thank you for the ECG results, Doctor.',
        timestamp: new Date(2026, 0, 17, 9, 30),
        read: false
      }
    ],
    '2': [
      {
        id: '1',
        sender: 'patient',
        text: 'Doctor, I\'m experiencing chest pain again. It started about an hour ago.',
        timestamp: new Date(2026, 0, 17, 8, 0),
        read: false
      },
      {
        id: '2',
        sender: 'patient',
        text: 'The pain is moderate, around 6/10. Should I come to the ER?',
        timestamp: new Date(2026, 0, 17, 8, 5),
        read: false
      }
    ],
    '3': [
      {
        id: '1',
        sender: 'patient',
        text: 'Hi Doctor, just wanted to update you that the incision is healing well.',
        timestamp: new Date(2026, 0, 16, 14, 0),
        read: true
      },
      {
        id: '2',
        sender: 'me',
        text: 'That\'s great to hear Emily! Continue with the antibiotics and keep the area clean. See you at your follow-up next week.',
        timestamp: new Date(2026, 0, 16, 14, 30),
        read: true
      }
    ]
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation, messages]);

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText,
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage]
    }));

    setInputText('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.patient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedConversation ? (messages[selectedConversation.id] || []) : [];

  return (
    <div className="h-full bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-4xl">
                chat
              </span>
              Patient Messages
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Communicate with your patients securely
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {conversations.filter(c => c.unread > 0).length} unread
            </span>
          </div>
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
                placeholder="Search patients..."
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
                    : conv.urgent ? 'bg-red-50 dark:bg-red-900/10' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {conv.patientInitials}
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white truncate flex items-center gap-2">
                          {conv.patient}
                          {conv.urgent && (
                            <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-[16px]">
                              priority_high
                            </span>
                          )}
                        </h3>
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
          <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950">
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
                      {selectedConversation.patientInitials}
                    </div>
                    {selectedConversation.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{selectedConversation.patient}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedConversation.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all text-sm">
                    View Patient Record
                  </button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">call</span>
                  </button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">videocam</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedConversation.urgent && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-600 dark:text-red-400">warning</span>
                  <div>
                    <h4 className="font-bold text-red-900 dark:text-red-300">Urgent Message</h4>
                    <p className="text-sm text-red-700 dark:text-red-200">This patient requires immediate attention</p>
                  </div>
                </div>
              )}

              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                    {message.sender === 'patient' && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {selectedConversation.patientInitials}
                        </div>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                          {selectedConversation.patient}
                        </span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-4 ${
                        message.sender === 'me'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <p className="leading-relaxed">{message.text}</p>
                      {message.attachment && (
                        <div className={`mt-3 p-3 rounded-lg flex items-center gap-3 ${
                          message.sender === 'me'
                            ? 'bg-blue-700'
                            : 'bg-slate-50 dark:bg-slate-900'
                        }`}>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            message.sender === 'me'
                              ? 'bg-blue-800'
                              : 'bg-blue-100 dark:bg-blue-900/30'
                          }`}>
                            <span className={`material-symbols-outlined ${
                              message.sender === 'me'
                                ? 'text-white'
                                : 'text-blue-600 dark:text-blue-400'
                            }`}>
                              description
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold truncate ${
                              message.sender === 'me'
                                ? 'text-white'
                                : 'text-slate-900 dark:text-white'
                            }`}>
                              {message.attachment.name}
                            </p>
                            <p className={`text-xs ${
                              message.sender === 'me'
                                ? 'text-blue-200'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}>
                              {message.attachment.size}
                            </p>
                          </div>
                          <button className={`p-2 rounded-lg ${
                            message.sender === 'me'
                              ? 'bg-blue-800 hover:bg-blue-900'
                              : 'bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                          }`}>
                            <span className={`material-symbols-outlined text-[20px] ${
                              message.sender === 'me'
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
                      message.sender === 'me'
                        ? 'text-right text-slate-500 dark:text-slate-400'
                        : 'text-left text-slate-500 dark:text-slate-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {message.sender === 'me' && (
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
              <div className="flex gap-3 mb-3">
                <button className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">prescription</span>
                  Send Prescription
                </button>
                <button className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-all text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">lab_profile</span>
                  Request Tests
                </button>
              </div>
              <div className="flex gap-3">
                <button className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">attach_file</span>
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message to patient..."
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
          <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="text-center">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-8xl mb-4">
                chat
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Select a conversation</h3>
              <p className="text-slate-600 dark:text-slate-400">Choose a patient to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}