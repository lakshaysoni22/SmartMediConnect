import React, { useState } from 'react';
import { PatientSectionHeader } from './PatientSectionHeader';

interface PatientMessagesProps {
  onNavigate?: (page: string) => void;
}

interface Message {
  id: number;
  sender: 'me' | 'doctor';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}

interface Conversation {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  initials?: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  online?: boolean;
  selected?: boolean;
}

export function PatientMessages({ onNavigate }: PatientMessagesProps) {
  const [activeTab, setActiveTab] = useState('inbox');
  const [messageText, setMessageText] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<number>(1);

  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'Dr. James Wilson',
      role: 'Cardiology',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      lastMessage: 'Please continue the medication for...',
      time: '10:42 AM',
      online: true,
      selected: true
    },
    {
      id: 2,
      name: 'Dr. Emily Chen',
      role: 'Laboratory',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      lastMessage: 'Lab results are ready for review.',
      time: 'Yesterday',
      unread: true,
      online: false
    },
    {
      id: 3,
      name: 'Front Desk - Reception',
      role: 'Administration',
      initials: 'FD',
      lastMessage: 'Your appointment has been confirmed.',
      time: 'Oct 22',
      online: false
    },
    {
      id: 4,
      name: 'Nurse Practitioner Davis',
      role: 'Nursing',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      lastMessage: 'How is your recovery going?',
      time: 'Oct 18',
      online: false
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: 'doctor',
      text: "Hello Lakshay, I've reviewed your latest stress test results. Everything looks stable compared to last month.",
      time: '09:30 AM',
      status: 'read'
    },
    {
      id: 2,
      sender: 'me',
      text: "That's great news, Dr. Wilson! I've been feeling much better lately. Should I continue with the current dosage of Atenolol?",
      time: '09:35 AM',
      status: 'read'
    },
    {
      id: 3,
      sender: 'doctor',
      text: "Yes, please continue for another 2 weeks. I'm attaching the updated prescription plan just in case you need a refill.",
      time: '09:38 AM',
      status: 'read',
      attachment: {
        name: 'Prescription_Refill_Oct24.pdf',
        size: '145 KB',
        type: 'PDF'
      }
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 dark:bg-black">
      {/* Content Container */}
      <div className="flex-1 overflow-hidden p-6">
        <div className="max-w-[1400px] mx-auto h-full flex gap-6">
          {/* Conversations List */}
          <div className="w-full md:w-80 lg:w-96 rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 flex flex-col h-full overflow-hidden shrink-0">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-800 dark:text-white">Messages</h2>
                <button 
                  className="p-2 text-[#137fec] hover:bg-[#137fec]/10 rounded-lg transition-colors" 
                  title="New Message"
                >
                  <span className="material-symbols-outlined text-[20px]">edit_square</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button 
                  onClick={() => setActiveTab('inbox')}
                  className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
                    activeTab === 'inbox' 
                      ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  Inbox
                </button>
                <button 
                  onClick={() => setActiveTab('unread')}
                  className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
                    activeTab === 'unread' 
                      ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  Unread
                </button>
                <button 
                  onClick={() => setActiveTab('archived')}
                  className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-all ${
                    activeTab === 'archived' 
                      ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  Archived
                </button>
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    conv.id === selectedConversation
                      ? 'border-l-4 border-[#137fec] bg-[#137fec]/5'
                      : 'border-l-4 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      {conv.avatar ? (
                        <div 
                          className="bg-center bg-no-repeat bg-cover rounded-full size-12"
                          style={{ backgroundImage: `url(${conv.avatar})` }}
                        />
                      ) : (
                        <div className="relative flex items-center justify-center size-12 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                          <span className="material-symbols-outlined">support_agent</span>
                        </div>
                      )}
                      {conv.online !== undefined && (
                        <div className={`absolute bottom-0 right-0 size-3 border-2 border-white dark:border-slate-800 rounded-full ${
                          conv.online ? 'bg-green-500' : 'bg-slate-400'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{conv.name}</h3>
                        <span className={`text-xs font-medium ${
                          conv.id === selectedConversation ? 'text-[#137fec]' : 'text-slate-400'
                        }`}>
                          {conv.time}
                        </span>
                      </div>
                      <p className={`text-xs truncate ${
                        conv.unread 
                          ? 'text-slate-900 dark:text-white font-bold' 
                          : 'text-slate-600 dark:text-slate-300 font-medium'
                      }`}>
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread && (
                      <div className="flex items-center">
                        <div className="size-2 bg-[#137fec] rounded-full" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Thread */}
          <div className="flex-1 rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 flex flex-col h-full overflow-hidden shadow-xl relative hidden md:flex">
            {/* Thread Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {selectedConv?.avatar ? (
                    <div 
                      className="bg-center bg-no-repeat bg-cover rounded-full size-10"
                      style={{ backgroundImage: `url(${selectedConv.avatar})` }}
                    />
                  ) : (
                    <div className="relative flex items-center justify-center size-10 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                      <span className="material-symbols-outlined">support_agent</span>
                    </div>
                  )}
                  {selectedConv?.online && (
                    <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{selectedConv?.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedConv?.role} • {selectedConv?.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-500 hover:text-[#137fec] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Video Call">
                  <span className="material-symbols-outlined">videocam</span>
                </button>
                <button className="p-2 text-slate-500 hover:text-[#137fec] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Voice Call">
                  <span className="material-symbols-outlined">call</span>
                </button>
                <button className="p-2 text-slate-500 hover:text-[#137fec] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="More Options">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-slate-50/50 dark:bg-slate-900/20">
              {/* Date Separator */}
              <div className="flex justify-center">
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Today
                </span>
              </div>

              {/* Messages */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 max-w-[80%] ${
                    message.sender === 'me' ? 'flex-row-reverse ml-auto' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div 
                    className="bg-center bg-no-repeat bg-cover rounded-full size-8 mt-auto shrink-0"
                    style={{ 
                      backgroundImage: message.sender === 'me' 
                        ? 'url(https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop)' 
                        : `url(${selectedConv?.avatar})`
                    }}
                  />

                  {/* Message Bubble */}
                  <div className={`flex flex-col gap-1 ${message.sender === 'me' ? 'items-end' : ''}`}>
                    <div className={`p-4 rounded-2xl shadow-sm ${
                      message.sender === 'me'
                        ? 'bg-[#137fec] text-white shadow-[#137fec]/20 rounded-br-sm'
                        : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-bl-sm'
                    }`}>
                      <p className={`text-sm ${
                        message.sender === 'me' ? 'text-white' : 'text-slate-700 dark:text-slate-200'
                      }`}>
                        {message.text}
                      </p>

                      {/* Attachment */}
                      {message.attachment && (
                        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer group mt-3">
                          <div className="size-10 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center">
                            <span className="material-symbols-outlined">picture_as_pdf</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {message.attachment.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {message.attachment.size} • {message.attachment.type}
                            </p>
                          </div>
                          <button className="text-slate-400 hover:text-[#137fec]">
                            <span className="material-symbols-outlined">download</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Time & Status */}
                    <span className={`text-[10px] text-slate-400 flex items-center gap-1 ${
                      message.sender === 'me' ? 'pr-1' : 'pl-1'
                    }`}>
                      {message.time}
                      {message.sender === 'me' && message.status === 'read' && (
                        <span className="material-symbols-outlined text-[12px]">done_all</span>
                      )}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              <div className="flex gap-4 max-w-[80%]">
                <div 
                  className="bg-center bg-no-repeat bg-cover rounded-full size-8 mt-auto shrink-0"
                  style={{ backgroundImage: `url(${selectedConv?.avatar})` }}
                />
                <div className="flex flex-col gap-1">
                  <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100 dark:border-slate-700 w-fit">
                    <div className="flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 pl-1">Typing...</span>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white/60 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-700 backdrop-blur-md">
              <form className="flex items-end gap-3" onSubmit={handleSendMessage}>
                <button 
                  className="p-2.5 text-slate-500 hover:text-[#137fec] hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors shrink-0" 
                  type="button"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                </button>

                <div className="flex-1 relative">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border-0 rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#137fec]/50 resize-none max-h-32 text-slate-900 dark:text-white placeholder:text-slate-500 outline-none"
                    placeholder="Type your message..."
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                  <button 
                    className="absolute right-2 bottom-2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg" 
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
                  </button>
                </div>

                <button 
                  className="p-3 bg-[#137fec] text-white rounded-full shadow-lg shadow-[#137fec]/30 hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center" 
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </form>

              <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[10px]">lock</span>
                Messages are end-to-end encrypted and HIPAA compliant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}