import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { DoctorNotificationCenter } from './DoctorNotificationCenter';

interface Message {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
  read?: boolean;
  attachment?: {
    type: 'image' | 'pdf';
    url: string;
    name?: string;
    size?: string;
  };
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  urgent?: boolean;
  online?: boolean;
}

export function DoctorMessages() {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'patients' | 'staff'>('patients');
  const [showNotifications, setShowNotifications] = useState(false);

  const conversations: Conversation[] = [
    {
      id: 1,
      name: 'Jane Doe',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQEE7Y7zDLMuUpxYuxyGCqmicsxSnRRxgL-YHpTR9FibqUZLh91TdLZgQ6iTOhtbWR9gNo3DMyTeHmlCUP4dg2iKKHd5kMf-Ex7ZbE1txHCy9mmYinnYNgiOYnDpGZl4mP04CD7hlyRWpF5Hx4N_ShZgSXWTq087nCZkXYxrbkrBBItjjZS7t0hS0uJ1G6_LsEb8U9EGRVh3y_ky3-_QqA0E-bwLp4bswAKwPAuQXc8hvY5W2Wc6uatgJdMCUeu88d5i7FekjURAyv',
      lastMessage: 'I have a question about my dosage...',
      time: '10:30 AM',
      online: true,
    },
    {
      id: 2,
      name: 'Michael Brown',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC53Ynqv5MMVsL9remYRnx_71JAvCyPzHTRZ9mtPDwtmtnOlRTPcebhlu0JXISaKVot2Qs5qDKmAosYQB6moBJ8oYkEgwWhsT0v5-GulgjE4rFUjmR8ulBuOTqdS2wXwfEyeR5Pw1Msp6YEtoMriOUgduHSoE1Q8be4JPtihByxN2fRDsw7tMgTfz82fzS1VznDXe0t9cWB_9YZFwaV1h_7oY8s3G-w_wqqTXYkylx4Jol1Tdwg4shGBpQVZpNKdgk3BlaGDTSOtzuF',
      lastMessage: 'Lab results attached for review.',
      time: '9:15 AM',
      unread: true,
    },
    {
      id: 3,
      name: 'Sarah Connors',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa_cFnPkfkmprGApMNZe1uREAGlY9sDnXAJuQ_FwoZ-VlqoOaf514jXphwHSNNJOpMxsROZR-q1bztxjg_WNn1iZX35Zc0l7lroIkSEKBxoXSGNzV60j9EeL8HYw70sfzL5r3BvmsN_js2tjpOhxoSAfxdl0IJ_BWngP8YQCtejePCsDhUYwfJywmL4ss5qDSV3-sJeuWc_zihXo4PZNA2g8q6P2oSxfa96ekq0tVkuhiauVQ7Q-dceCt_Wk_wkPVuhYWdLP5pxitr',
      lastMessage: 'Experiencing severe side effects...',
      time: 'Yesterday',
      urgent: true,
    },
    {
      id: 4,
      name: 'Robert Fox',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAopkZLxOET3BsAYAyb3dF76e6WDlJvBAF3pPq4fivNkLnpmpFScjxnQmfFqKqdyo0y99ucX6qV06ecbdobZjW2LYD1ahhEa-mvYESi7ehvu7FunY8si909GwUJPNVmqzJtxzpHn3HpZEN531L-R3A-EWi_76HDdx9vRxNN2FKNJUB1s29mj9Mn0nzG2uODRcDolKeQ7r0eAHRjKApDYMsjFtVnO88RlToZTTKlR_iwSuUeBgPFu-aj2TChyq5hqFuwmFV9ZGPGjBLc',
      lastMessage: 'Appointment confirmed for next week.',
      time: 'Tue',
    },
    {
      id: 5,
      name: 'Emily Wilson',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa8mfN5Zr1VpLsvjiq1O6P5EmBJxudohaE-gsphHBhIiPpUFp4w30UhHQkVkYeiK9IN9DUh6nf0P6z6FkGmNM656ag0qzhWwt-ALgNBxTUzKRh-de80h3-YE8KP4uDoNBDLkTzo5cnrMtJ1vCcecLlYPuCY5a8CSUFjRN0G_YOc9XG5Fb-Ri7pIsK_m4b8sRGFm6RI4bzqpJrYCo-cBRNM-MVNlA7GRNfQuqJsNVZ7090z2L95tALKU4CBkDtMpGS7rdpzepKDcNdD',
      lastMessage: 'Thanks doctor!',
      time: 'Mon',
    },
  ];

  const messages: Message[] = [
    {
      id: 1,
      text: "Hi Dr. Chen, I'm feeling much better today but I noticed some slight swelling around the incision site. Is this normal?",
      time: '10:15 AM',
      isOwn: false,
    },
    {
      id: 2,
      text: 'Hello Jane. That is completely normal at this stage of recovery. Please keep it elevated and ice it for 15 minutes if needed.',
      time: '10:22 AM',
      isOwn: true,
      read: true,
    },
    {
      id: 3,
      text: 'I also took a photo just in case.',
      time: '10:25 AM',
      isOwn: false,
      attachment: {
        type: 'image',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaMkptOiUMI8fm5-vgcOFIqHjMFxlF1sWHCTx3Y-J2Ny8ae9vhcLtapIpfxKXke0clvhgAdqzhJiHbj2G8axMTzWXNZAE1USku01uhGMsAf_e6aZqFY00kWZV56AH6yl4GsDKcEl1xXcJHuSyHlHTUWGmgg39Zs4sUtScRiC-l5QZbcplkE1pKfLQipd_i14lpeu_hR3Yu-KNH8jQtFmJIS5blZeaE26JhdZQthB2dUg6ehrIOIqHl3-c7hNM18tcHXfIuF9QCbSau',
      },
    },
    {
      id: 4,
      text: 'Thanks for the photo. It looks clean and healing well. No redness indicates no infection. Continue with the antibiotics as prescribed.',
      time: '10:28 AM',
      isOwn: true,
      read: true,
    },
  ];

  const activeConv = conversations.find((c) => c.id === activeConversation);

  return (
    <div className="flex flex-col min-w-0 bg-slate-50/50 dark:bg-slate-950 h-screen overflow-hidden">
      {/* Main Messages Content */}
      <div className="flex overflow-hidden flex-1">
        <div className="flex overflow-hidden w-full">{/* Left Pane: Conversation List */}
          <div className="w-full md:w-[340px] bg-white dark:bg-slate-800 flex flex-col border-r border-slate-200 dark:border-slate-700 shrink-0">
            {/* Search & Filter Header */}
            <div className="px-4 pt-4 pb-3 space-y-3 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Messages</h2>
              
              {/* Search Bar */}
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 border-none placeholder-gray-500"
                  placeholder="Search patients..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Segmented Control */}
              <div className="bg-slate-50 dark:bg-slate-700 p-1 rounded-lg flex gap-1">
                <button
                  className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'patients'
                      ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab('patients')}
                >
                  Patients
                </button>
                <button
                  className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'staff'
                      ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                  onClick={() => setActiveTab('staff')}
                >
                  Staff
                </button>
              </div>
            </div>
            
            {/* List of Conversations */}
            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-2.5 rounded-lg cursor-pointer flex gap-2.5 relative group transition-colors ${
                    activeConversation === conv.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800'
                      : conv.urgent
                      ? 'border-l-4 border-red-500 bg-red-50/50 dark:bg-red-900/10 hover:bg-slate-50 dark:hover:bg-slate-700'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                  onClick={() => setActiveConversation(conv.id)}
                >
                  <div className="relative">
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                    )}
                    {conv.urgent && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                        URGENT
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                        {conv.name}
                      </h3>
                      <span
                        className={`text-[11px] font-medium ${
                          activeConversation === conv.id || conv.urgent
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {conv.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p
                        className={`text-xs truncate ${
                          activeConversation === conv.id
                            ? 'text-slate-900 dark:text-gray-200 font-medium'
                            : conv.urgent
                            ? 'text-red-600/80 dark:text-red-400/80 font-medium'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {conv.lastMessage}
                      </p>
                      {conv.unread && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 ml-2"></span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Pane: Active Chat */}
          <div className="flex-1 flex flex-col relative bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Chat Header */}
            <header className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl px-5 py-3 flex items-center justify-between shadow-sm border-b border-slate-200 dark:border-slate-700 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={activeConv?.avatar}
                    alt={activeConv?.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  {activeConv?.online && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {activeConv?.name}
                    <span className="text-[9px] font-normal px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                      Patient
                    </span>
                  </h2>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    MRN: #892-332 • Last visit: Oct 24
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Video Call"
                >
                  <span className="material-symbols-outlined text-[18px]">videocam</span>
                </button>
                <button
                  className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Phone Call"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                </button>
                <button
                  className="hidden md:flex p-1.5 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="View Profile"
                >
                  <span className="material-symbols-outlined text-[18px]">person_book</span>
                </button>
                <NotificationIcon 
                  showDot={true}
                  onClick={() => setShowNotifications(true)}
                />
              </div>
            </header>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
              {/* Date Separator */}
              <div className="flex justify-center">
                <span className="text-xs font-medium text-gray-400 bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded-full">
                  Today, Oct 26
                </span>
              </div>

              {/* System Message */}
              <div className="flex justify-center w-full">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/20 px-4 py-2 rounded-lg">
                  <span className="material-symbols-outlined text-base">lock</span>
                  This session is encrypted end-to-end.
                </div>
              </div>

              {/* Messages */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 max-w-[75%] ${message.isOwn ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <img
                    src={message.isOwn ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoCynfdop63gBAP3pgzqQ1kQiIoxAU6HKmPTPfPID8hWvJcI2uZc7D2mNqPxaaCq-beEGHI2qIubCbqn7bjRIr9VmERyV1bsfTc4p2maInlKLL17kHCVSHPlr1AATrxwSAu2yFUAVaL0oZXjnrXHUMU_LkiO1q6sX3Hh339RkHJ8fET5b_RlOCAFRyHa5PZJ63MB-6wC-1L3XNQJwn-bJQzXypNZpBOS0qZJZcHIv8WXsKbEdA63YAaVbgda_FoEeq_-0ssVA7R2j1' : activeConv?.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover mt-auto shrink-0"
                  />
                  <div className={`flex flex-col gap-1 ${message.isOwn ? 'items-end' : ''}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-sm ${
                        message.isOwn
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      {message.attachment && message.attachment.type === 'image' && (
                        <div className="mt-3 relative group cursor-pointer overflow-hidden rounded-xl">
                          <img
                            src={message.attachment.url}
                            alt="Attachment"
                            className="h-48 w-56 rounded-xl object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-white text-[28px]">visibility</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className={`text-xs text-gray-400 ${message.isOwn ? 'mr-1' : 'ml-1'}`}>
                      {message.time}
                      {message.isOwn && message.read && ' • Read'}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              <div className="flex gap-3 max-w-[75%]">
                <img
                  src={activeConv?.avatar}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover mt-auto shrink-0 opacity-50"
                />
                <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-4 border-t border-slate-200 dark:border-slate-700 shrink-0">
              {/* Quick Actions */}
              <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
                <button className="shrink-0 text-xs font-medium bg-white/50 dark:bg-white/10 hover:bg-blue-50 hover:text-blue-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 transition-colors">
                  Request Appointment
                </button>
                <button className="shrink-0 text-xs font-medium bg-white/50 dark:bg-white/10 hover:bg-blue-50 hover:text-blue-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 transition-colors">
                  Send Lab Requisition
                </button>
                <button className="shrink-0 text-xs font-medium bg-white/50 dark:bg-white/10 hover:bg-blue-50 hover:text-blue-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 transition-colors">
                  "Please call the office"
                </button>
              </div>
              
              <div className="flex items-end gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-shadow">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                </button>
                <textarea
                  className="flex-1 bg-transparent border-none text-slate-900 dark:text-white placeholder-gray-400 focus:ring-0 focus:outline-none resize-none py-1.5 max-h-24 text-sm outline-none"
                  placeholder="Type a secure message..."
                  rows={1}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  style={{ outline: 'none', boxShadow: 'none' }}
                />
                <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">sentiment_satisfied</span>
                </button>
                <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Patient Details */}
          <div className="hidden xl:flex w-72 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 flex-col overflow-y-auto shrink-0">
            <div className="p-4 flex flex-col items-center border-b border-slate-200 dark:border-slate-700">
              <img
                src={activeConv?.avatar}
                alt={activeConv?.name}
                className="w-20 h-20 rounded-full object-cover mb-3 shadow-md"
              />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{activeConv?.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">34 Years • Female</p>
              <div className="flex gap-2 w-full">
                <button className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Chart
                </button>
                <button className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  History
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Medical Info */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Medical Info</h4>
                <div className="space-y-2.5">
                  <div className="flex gap-2.5 items-start">
                    <span className="material-symbols-outlined text-gray-400 text-[16px] mt-0.5">bloodtype</span>
                    <div>
                      <p className="text-xs font-medium text-slate-900 dark:text-white">Blood Type</p>
                      <p className="text-[11px] text-gray-500">O Positive</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="material-symbols-outlined text-red-400 text-[16px] mt-0.5">warning</span>
                    <div>
                      <p className="text-xs font-medium text-slate-900 dark:text-white">Allergies</p>
                      <p className="text-[11px] text-gray-500">Penicillin, Peanuts</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="material-symbols-outlined text-blue-400 text-[16px] mt-0.5">medication</span>
                    <div>
                      <p className="text-xs font-medium text-slate-900 dark:text-white">Current Meds</p>
                      <p className="text-[11px] text-gray-500">Amoxicillin 500mg</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Appointment */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Next Appointment</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
                  <div className="flex gap-2.5 mb-2">
                    <div className="bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400 rounded-lg w-9 h-9 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Follow-up</p>
                      <p className="text-[11px] text-gray-500">Nov 02, 2023 at 9:00 AM</p>
                    </div>
                  </div>
                  <button className="w-full text-[11px] font-medium text-blue-600 hover:underline text-left pl-11">
                    View details
                  </button>
                </div>
              </div>

              {/* Recent Files */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Recent Files</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer group transition-colors">
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded p-1.5">
                      <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-slate-900 dark:text-white truncate">
                        Blood_Test_Results.pdf
                      </p>
                      <p className="text-[10px] text-gray-400">2MB • Yesterday</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-300 group-hover:text-blue-600 text-[16px]">
                      download
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer group transition-colors">
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded p-1.5">
                      <span className="material-symbols-outlined text-[16px]">image</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-slate-900 dark:text-white truncate">
                        Incision_Photo_01.jpg
                      </p>
                      <p className="text-[10px] text-gray-400">4.5MB • Today</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-300 group-hover:text-blue-600 text-[16px]">
                      download
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Center */}
      <DoctorNotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </div>
  );
}