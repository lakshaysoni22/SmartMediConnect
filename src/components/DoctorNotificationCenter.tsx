import React, { useState } from 'react';

interface Notification {
  id: string;
  type: 'appointment' | 'urgent' | 'prescription' | 'wellness' | 'billing' | 'lab';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  category: string;
  referenceId?: string;
  details?: {
    patient?: string;
    date?: string;
    time?: string;
    location?: string;
    notes?: string;
  };
}

interface DoctorNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DoctorNotificationCenter({ isOpen, onClose }: DoctorNotificationCenterProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      category: 'Appointment',
      title: 'New Patient Appointment',
      message: 'Marcus Wright has scheduled an appointment for tomorrow at 10:00 AM.',
      time: '10 min ago',
      isRead: false,
      referenceId: '#APT-2024-1142',
      details: {
        patient: 'Marcus Wright',
        date: 'Jan 7, 2026',
        time: '10:00 AM - 10:45 AM',
        location: 'Room 304, Main Building, West Wing',
        notes: 'Follow-up consultation for hypertension management.'
      }
    },
    {
      id: '2',
      type: 'urgent',
      category: 'Urgent',
      title: 'Critical Lab Results Available',
      message: 'Urgent lab results for Emily Chen require immediate review.',
      time: '2 hrs ago',
      isRead: false,
      referenceId: '#LAB-2024-8832',
      details: {
        patient: 'Emily Chen',
        date: 'Jan 6, 2026',
        time: '3:45 PM',
        notes: 'Post-operative blood work shows elevated markers. Please review immediately.'
      }
    },
    {
      id: '3',
      type: 'prescription',
      category: 'Prescription',
      title: 'Prescription Renewal Request',
      message: 'Sarah Jenkins has requested a refill for Lisinopril 10mg.',
      time: '5 hrs ago',
      isRead: false,
      referenceId: '#RX-2024-9928',
      details: {
        patient: 'Sarah Jenkins',
        date: 'Jan 6, 2026',
        notes: 'Patient reports stable blood pressure readings. Last prescription issued 90 days ago.'
      }
    },
    {
      id: '4',
      type: 'lab',
      category: 'Lab Report',
      title: 'Lab Results Ready',
      message: 'Complete blood count results available for Review.',
      time: 'Yesterday',
      isRead: true,
      referenceId: '#LAB-2024-7712',
      details: {
        patient: 'Robert Anderson',
        date: 'Jan 5, 2026',
        notes: 'All values within normal range. No action required.'
      }
    },
    {
      id: '5',
      type: 'wellness',
      category: 'Wellness',
      title: 'Patient Health Metric Update',
      message: 'Sarah Jenkins logged improved blood pressure readings.',
      time: 'Oct 20',
      isRead: true,
      details: {
        patient: 'Sarah Jenkins',
        notes: 'Average BP: 118/76 mmHg over the past week. Treatment plan showing positive results.'
      }
    }
  ]);

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTypeBadgeClass = (type: string) => {
    const badges: Record<string, string> = {
      appointment: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      urgent: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      prescription: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
      wellness: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      billing: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
      lab: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return badges[type] || badges.billing;
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      appointment: 'calendar_today',
      urgent: 'priority_high',
      prescription: 'medication',
      wellness: 'favorite',
      billing: 'receipt',
      lab: 'science',
    };
    return icons[type] || 'notifications';
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    );
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = () => {
    if (selectedNotification) {
      setNotifications(prev => prev.filter(n => n.id !== selectedNotification.id));
      setSelectedNotification(null);
    }
  };

  // Auto-select first notification if none selected
  React.useEffect(() => {
    if (isOpen && !selectedNotification && filteredNotifications.length > 0) {
      setSelectedNotification(filteredNotifications[0]);
    }
  }, [isOpen, filter, filteredNotifications.length]); // CRITICAL FIX: Added filteredNotifications.length to dependencies

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-sm animate-fade-in p-4">
      <div className="w-full max-w-7xl h-[90vh] bg-white dark:bg-[#1a2332] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative border border-slate-200 dark:border-slate-700/50">
        
        {/* Top Header */}
        <div className="h-20 shrink-0 px-8 flex items-center justify-between bg-white dark:bg-[#1a2332] z-20 border-b border-slate-200 dark:border-slate-700/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-transparent border dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                filter === 'unread'
                  ? 'bg-blue-600 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-transparent border dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50'
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="bg-blue-600 dark:bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Left Sidebar - Notification List */}
          <aside className="w-[420px] shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-[#1a2332]">
            <div className="px-8 py-4 flex items-center justify-between bg-slate-50 dark:bg-[#1a2332] sticky top-0 z-10">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Recent</span>
              <button
                onClick={handleMarkAllRead}
                className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300"
              >
                Mark all read
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-1 pb-4 px-4 space-y-2">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-5 rounded-2xl cursor-pointer relative overflow-hidden group transition-all ${
                    selectedNotification?.id === notification.id
                      ? 'bg-blue-50 dark:bg-[#233044] border border-blue-200 dark:border-blue-500/30 shadow-sm'
                      : 'bg-white dark:bg-transparent hover:bg-slate-100 dark:hover:bg-[#233044]/50 border border-slate-200 dark:border-transparent hover:border-slate-300 dark:hover:border-slate-600/50'
                  } ${!notification.isRead ? 'pl-6' : 'pl-6'}`}
                >
                  {selectedNotification?.id === notification.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-2xl"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2 pl-2">
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      )}
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${getTypeBadgeClass(notification.type)}`}>
                        {notification.category}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{notification.time}</span>
                  </div>
                  
                  <div className="pl-2">
                    <h3 className="text-[15px] font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                      {notification.title}
                    </h3>
                    <p className="text-[13px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <span className="material-symbols-outlined text-5xl mb-3 opacity-30">notifications_off</span>
                  <p className="text-sm">No {filter === 'unread' ? 'unread' : ''} notifications</p>
                </div>
              )}
            </div>
          </aside>

          {/* Right Panel - Notification Detail */}
          <main className="flex-1 flex flex-col bg-white dark:bg-[#1a2332] overflow-hidden relative">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
              {selectedNotification ? (
                <div className="bg-slate-50 dark:bg-[#233044] rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-700/50 p-10 max-w-4xl mx-auto">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex gap-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getTypeBadgeClass(selectedNotification.type)}`}>
                        <span className="material-symbols-outlined text-2xl">{getTypeIcon(selectedNotification.type)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-bold text-xs tracking-wider uppercase ${getTypeBadgeClass(selectedNotification.type)}`}>
                            {selectedNotification.category}
                          </span>
                          <span className="text-slate-400 text-sm">• Inbox</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                          {selectedNotification.title}
                        </h1>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <button
                        onClick={handleDelete}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-xl">archive</span>
                      </button>
                      <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-xl">more_vert</span>
                      </button>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-8 py-6 border-t border-slate-200 dark:border-slate-700/50 mb-8 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                      <span>{selectedNotification.time}</span>
                    </div>
                    {selectedNotification.referenceId && (
                      <>
                        <div className="w-px h-5 bg-slate-300 dark:bg-slate-700"></div>
                        <div>
                          Ref ID: <span className="text-slate-900 dark:text-white font-medium">{selectedNotification.referenceId}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Message Body */}
                  <div className="prose dark:prose-invert max-w-none mb-10 text-slate-700 dark:text-slate-300">
                    <p className="mb-6 text-[15px] leading-7">Dear Dr. Smith,</p>
                    <p className="mb-6 text-[15px] leading-7">{selectedNotification.message}</p>
                  </div>

                  {/* Details Card */}
                  {selectedNotification.details && (
                    <div className="border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 mb-10 bg-white dark:bg-[#1a2332]/50">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Details</h3>
                      <div className="space-y-3">
                        {selectedNotification.details.patient && (
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="material-symbols-outlined text-lg">person</span>
                            <span className="font-medium text-slate-900 dark:text-white">Patient:</span>
                            <span>{selectedNotification.details.patient}</span>
                          </div>
                        )}
                        {selectedNotification.details.date && (
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="material-symbols-outlined text-lg">calendar_today</span>
                            <span className="font-medium text-slate-900 dark:text-white">Date:</span>
                            <span>{selectedNotification.details.date}</span>
                          </div>
                        )}
                        {selectedNotification.details.time && (
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="material-symbols-outlined text-lg">schedule</span>
                            <span className="font-medium text-slate-900 dark:text-white">Time:</span>
                            <span>{selectedNotification.details.time}</span>
                          </div>
                        )}
                        {selectedNotification.details.location && (
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="material-symbols-outlined text-lg">location_on</span>
                            <span className="font-medium text-slate-900 dark:text-white">Location:</span>
                            <span>{selectedNotification.details.location}</span>
                          </div>
                        )}
                        {selectedNotification.details.notes && (
                          <div className="mt-4 p-4 bg-slate-100 dark:bg-[#1a2332] rounded-lg">
                            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                              {selectedNotification.details.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="border-t border-slate-200 dark:border-slate-700/50 pt-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {selectedNotification.type === 'appointment' && (
                        <>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md flex items-center gap-2 transition-all">
                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            Confirm
                          </button>
                          <button className="bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-colors">
                            Reschedule
                          </button>
                        </>
                      )}
                      {selectedNotification.type === 'urgent' && (
                        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md flex items-center gap-2 transition-all">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                          View Results
                        </button>
                      )}
                      {selectedNotification.type === 'prescription' && (
                        <>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md flex items-center gap-2 transition-all">
                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            Approve Refill
                          </button>
                          <button className="bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-colors">
                            Deny
                          </button>
                        </>
                      )}
                    </div>
                    <button className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2 font-medium">
                      <span className="material-symbols-outlined">print</span>
                      Print Details
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-6xl mb-4 opacity-20">mail</span>
                    <p className="text-lg">Select a notification to view details</p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E2E8F0;
          border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4B5563;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}