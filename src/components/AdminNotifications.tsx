import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';

interface Notification {
  id: number;
  category: 'URGENT' | 'STAFF' | 'FINANCIAL' | 'COMPLIANCE' | 'SYSTEM';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

export function AdminNotifications() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread'>('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      category: 'URGENT',
      title: 'Critical System Alert: Server Load',
      description: 'Database server experiencing high load. Immediate attention required.',
      timestamp: '5 min ago',
      isRead: false,
    },
    {
      id: 2,
      category: 'STAFF',
      title: 'New Staff Access Request',
      description: 'Dr. Michael Chen has requested Level 3 clearance access for patient records.',
      timestamp: '25 min ago',
      isRead: false,
    },
    {
      id: 3,
      category: 'FINANCIAL',
      title: 'Payment Processing Complete',
      description: 'Monthly salary disbursement for 142 staff members has been processed successfully.',
      timestamp: '1 hr ago',
      isRead: false,
    },
    {
      id: 4,
      category: 'COMPLIANCE',
      title: 'HIPAA Compliance Audit Scheduled',
      description: 'Annual HIPAA compliance audit is scheduled for next week. Preparation checklist attached.',
      timestamp: 'Yesterday',
      isRead: false,
    },
    {
      id: 5,
      category: 'SYSTEM',
      title: 'Scheduled System Maintenance',
      description: 'System maintenance scheduled for this Sunday from 2:00 AM to 6:00 AM EST.',
      timestamp: 'Jan 3',
      isRead: true,
    },
    {
      id: 6,
      category: 'STAFF',
      title: 'New Doctor Registration',
      description: 'Dr. Sarah Johnson has completed onboarding. Access credentials sent.',
      timestamp: 'Jan 2',
      isRead: true,
    },
    {
      id: 7,
      category: 'FINANCIAL',
      title: 'Monthly Revenue Report Ready',
      description: 'December revenue report has been generated and is ready for review.',
      timestamp: 'Jan 1',
      isRead: true,
    },
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'URGENT':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'STAFF':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'FINANCIAL':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'COMPLIANCE':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'SYSTEM':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getCategoryDotColor = (category: string) => {
    switch (category) {
      case 'URGENT':
        return 'bg-red-500';
      case 'STAFF':
        return 'bg-blue-500';
      case 'FINANCIAL':
        return 'bg-emerald-500';
      case 'COMPLIANCE':
        return 'bg-amber-500';
      case 'SYSTEM':
        return 'bg-purple-500';
      default:
        return 'bg-slate-500';
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setNotifications(notifications.map(n =>
      n.id === notification.id ? { ...n, isRead: true } : n
    ));
  };

  const filteredNotifications = selectedFilter === 'unread'
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-black">
      {/* Header - Matching Other Admin Pages */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0077b6] rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Stay updated with system alerts and important updates</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationIcon 
              showDot={unreadCount > 0}
              onClick={() => window.dispatchEvent(new CustomEvent('openNotificationCenter'))}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex">
        {/* Notification List - Full Width */}
        <div className="w-full bg-white dark:bg-slate-900 flex flex-col">
          {/* Filter Tabs */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedFilter === 'all'
                    ? 'bg-[#0077b6] text-white shadow-lg shadow-[#0077b6]/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('unread')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  selectedFilter === 'unread'
                    ? 'bg-[#0077b6] text-white shadow-lg shadow-[#0077b6]/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Unread
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Notifications Header */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Recent Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm font-medium text-[#0077b6] hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto pb-4 px-4 space-y-2">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <span className="material-symbols-outlined text-5xl text-slate-400 dark:text-slate-600 mb-3 block opacity-30">
                  notifications_off
                </span>
                <p className="text-slate-500 dark:text-slate-400 text-sm">No notifications to display</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all ${
                    selectedNotification?.id === notification.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : notification.isRead
                      ? 'bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      )}
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded border ${getCategoryColor(notification.category)}`}>
                        {notification.category}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{notification.timestamp}</span>
                  </div>
                  <h4 className={`text-[15px] font-bold mb-1 leading-snug ${notification.isRead ? 'text-slate-600 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                    {notification.title}
                  </h4>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {notification.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}