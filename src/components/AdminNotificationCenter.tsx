import React, { useState, useRef, useEffect } from 'react';
import { DateUtils } from '../utils/dateUtils';

interface AdminNotificationCenterProps {
  onClose: () => void;
}

interface Notification {
  id: string;
  type: 'system' | 'urgent' | 'staff' | 'financial' | 'compliance';
  title: string;
  description: string;
  time: string;
  unread: boolean;
  details: {
    fullDescription: string;
    refId?: string;
    date?: string;
    time?: string;
    location?: string;
    staff?: string;
    amount?: string;
  };
}

export function AdminNotificationCenter({ onClose }: AdminNotificationCenterProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // CRITICAL FIX: Add useRef to track timeouts for cleanup
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // CRITICAL FIX: Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'urgent',
      title: 'Critical System Alert: Server Load',
      description: 'Database server experiencing high load. Immediate attention required.',
      time: '5 min ago',
      unread: true,
      details: {
        fullDescription: 'The main database server is currently experiencing unusually high load (92% CPU utilization). This may impact patient record access and billing operations. IT team has been notified and is investigating the root cause. Consider scaling resources if the issue persists.',
        refId: '#SYS-2023-8841',
        date: 'Jan 5, 2026',
        time: '2:45 PM',
      }
    },
    {
      id: '2',
      type: 'staff',
      title: 'New Staff Access Request',
      description: 'Dr. Michael Chen has requested Level 3 clearance access for patient records.',
      time: '25 min ago',
      unread: true,
      details: {
        fullDescription: 'Dr. Michael Chen (Cardiology Department) has submitted a formal request for Level 3 clearance to access sensitive patient records. The request has been reviewed by the Department Head and is pending final administrative approval.',
        refId: '#ACCESS-2023-5621',
        staff: 'Dr. Michael Chen - Cardiology',
        date: 'Jan 5, 2026',
        time: '2:20 PM',
      }
    },
    {
      id: '3',
      type: 'financial',
      title: 'Payment Processing Complete',
      description: 'Monthly salary disbursement for 142 staff members has been processed successfully.',
      time: '1 hr ago',
      unread: true,
      details: {
        fullDescription: 'The monthly salary payment for January 2026 has been successfully processed and transferred to all staff accounts. Total amount disbursed: $1,245,680.00 across 142 employees. Payment confirmations have been sent to individual staff members.',
        refId: '#PAY-2026-0105',
        amount: '$1,245,680.00',
        date: 'Jan 5, 2026',
        time: '1:30 PM',
      }
    },
    {
      id: '4',
      type: 'compliance',
      title: 'HIPAA Compliance Audit Scheduled',
      description: 'Annual HIPAA compliance audit is scheduled for next week. Preparation checklist attached.',
      time: 'Yesterday',
      unread: true,
      details: {
        fullDescription: 'The annual HIPAA compliance audit has been scheduled for January 12-14, 2026. All departments must ensure that patient data handling procedures, access logs, and security protocols are up to date. A preparation checklist has been distributed to all department heads.',
        refId: '#AUDIT-2026-001',
        date: 'Jan 12-14, 2026',
        location: 'Admin Building, Conference Room A',
      }
    },
    {
      id: '5',
      type: 'system',
      title: 'Scheduled System Maintenance',
      description: 'System maintenance scheduled for this Sunday from 2:00 AM to 6:00 AM EST.',
      time: 'Jan 3',
      unread: false,
      details: {
        fullDescription: 'A scheduled system maintenance window has been planned for Sunday, January 7, 2026, from 2:00 AM to 6:00 AM EST. During this time, the patient portal, billing system, and appointment scheduling will be temporarily unavailable. All staff and patients have been notified via email.',
        refId: '#MAINT-2026-0107',
        date: 'Jan 7, 2026',
        time: '2:00 AM - 6:00 AM EST',
      }
    },
    {
      id: '6',
      type: 'staff',
      title: 'New Doctor Onboarding Complete',
      description: 'Dr. Sarah Martinez has completed onboarding and is ready to start patient consultations.',
      time: 'Jan 2',
      unread: false,
      details: {
        fullDescription: 'Dr. Sarah Martinez (Orthopedic Surgery) has successfully completed the onboarding process including credentials verification, system training, and facility orientation. She is now cleared to begin seeing patients starting January 8, 2026.',
        refId: '#ONBOARD-2025-9921',
        staff: 'Dr. Sarah Martinez - Orthopedic Surgery',
        date: 'Jan 2, 2026',
      }
    }
  ];

  const filteredNotifications = activeFilter === 'unread' 
    ? notifications.filter(n => n.unread)
    : notifications;

  const unreadCount = notifications.filter(n => n.unread).length;

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'system':
        return { bg: 'bg-blue-50 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', icon: 'settings' };
      case 'urgent':
        return { bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: 'warning' };
      case 'staff':
        return { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-400', icon: 'badge' };
      case 'financial':
        return { bg: 'bg-emerald-50 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', icon: 'payments' };
      case 'compliance':
        return { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', icon: 'verified_user' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', icon: 'notifications' };
    }
  };

  const handleApprove = () => {
    setShowApprovalModal(false);
    setSuccessMessage('Access request approved successfully! Staff member has been notified.');
    setShowSuccessModal(true);
    const timer = setTimeout(() => setShowSuccessModal(false), 3000);
    timeoutRefs.current.push(timer);
    return () => clearTimeout(timer);
  };

  const handleConfirmAction = () => {
    setShowConfirmModal(false);
    setSuccessMessage('Action confirmed successfully! System has been updated.');
    setShowSuccessModal(true);
    const timer = setTimeout(() => setShowSuccessModal(false), 3000);
    timeoutRefs.current.push(timer);
    return () => clearTimeout(timer);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 dark:bg-black/70 backdrop-blur-sm p-0 md:p-6">
      <div className="w-full max-w-7xl h-[90vh] bg-white dark:bg-gray-900 rounded-none md:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-20 shrink-0 px-8 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#0077b6] text-white'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('unread')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'unread'
                  ? 'bg-[#0077b6] text-white'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Unread
              <span className="bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Notifications List */}
          <aside className="w-[420px] shrink-0 flex flex-col border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="px-8 py-4 flex items-center justify-between bg-white dark:bg-gray-900 sticky top-0 z-10 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Notifications</span>
              <button className="text-[#0077b6] text-sm font-medium hover:text-blue-700">Mark all as read</button>
            </div>

            <div className="overflow-y-auto flex-1 pb-4 px-4 space-y-2">
              {filteredNotifications.map((notification) => {
                const typeStyles = getTypeStyles(notification.type);
                const isSelected = selectedNotification?.id === notification.id;

                return (
                  <div
                    key={notification.id}
                    onClick={() => setSelectedNotification(notification)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-gray-800 border-blue-100 dark:border-blue-900/30 shadow-sm'
                        : notification.unread
                        ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-100 dark:hover:border-gray-700'
                    } ${isSelected ? 'relative overflow-hidden' : 'pl-6'}`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0077b6] rounded-l-2xl"></div>
                    )}
                    <div className={`flex justify-between items-start mb-2 ${isSelected ? 'pl-2' : ''}`}>
                      <div className="flex items-center gap-2">
                        {notification.unread && (
                          <span className="h-2 w-2 rounded-full bg-red-600"></span>
                        )}
                        <span className={`${typeStyles.bg} ${typeStyles.text} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide`}>
                          {notification.type}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{notification.time}</span>
                    </div>
                    <div className={isSelected ? 'pl-2' : ''}>
                      <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-1 leading-snug">
                        {notification.title}
                      </h3>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Notification Detail */}
          <main className="flex-1 flex flex-col bg-gray-50/50 dark:bg-gray-800/30 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-10">
              {selectedNotification ? (
                <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 p-10 max-w-4xl mx-auto">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex gap-5">
                      <div className={`w-12 h-12 ${getTypeStyles(selectedNotification.type).bg} rounded-xl flex items-center justify-center shrink-0 ${getTypeStyles(selectedNotification.type).text}`}>
                        <span className="material-symbols-outlined text-2xl">
                          {getTypeStyles(selectedNotification.type).icon}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[#0077b6] font-bold text-xs tracking-wider uppercase">
                            {selectedNotification.type}
                          </span>
                          <span className="text-gray-400 text-sm">• Admin Portal</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {selectedNotification.title}
                        </h1>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-xl">archive</span>
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-xl">more_vert</span>
                      </button>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-8 py-6 border-t border-gray-100 dark:border-gray-800 mb-8 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                      <span>{selectedNotification.time}</span>
                    </div>
                    {selectedNotification.details.refId && (
                      <>
                        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700"></div>
                        <div>
                          Ref ID: <span className="text-gray-900 dark:text-white font-medium">{selectedNotification.details.refId}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="prose dark:prose-invert max-w-none mb-10 text-gray-700 dark:text-gray-300">
                    <p className="mb-6 text-[15px] leading-7">Dear Hospital Administrator,</p>
                    <p className="mb-6 text-[15px] leading-7">{selectedNotification.details.fullDescription}</p>
                  </div>

                  {/* Detail Card (for staff/financial/system notifications) */}
                  {(selectedNotification.type === 'staff' || selectedNotification.type === 'financial' || selectedNotification.type === 'system') && selectedNotification.details.date && (
                    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-10 bg-gray-50/50 dark:bg-gray-800/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedNotification.details.staff && (
                          <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-gray-400">person</span>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Staff Member</div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">{selectedNotification.details.staff}</div>
                            </div>
                          </div>
                        )}
                        {selectedNotification.details.amount && (
                          <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-gray-400">payments</span>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Total Amount</div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">{selectedNotification.details.amount}</div>
                            </div>
                          </div>
                        )}
                        {selectedNotification.details.date && (
                          <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-gray-400">calendar_today</span>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Date</div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">{selectedNotification.details.date}</div>
                            </div>
                          </div>
                        )}
                        {selectedNotification.details.time && (
                          <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-gray-400">schedule</span>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Time</div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">{selectedNotification.details.time}</div>
                            </div>
                          </div>
                        )}
                        {selectedNotification.details.location && (
                          <div className="flex items-start gap-3 md:col-span-2">
                            <span className="material-symbols-outlined text-gray-400">location_on</span>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Location</div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">{selectedNotification.details.location}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 italic">
                    This notification was automatically generated by the SmartMediConnect Admin Portal. For urgent matters, please contact the IT department immediately.
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 text-[15px] mb-10">
                    SmartMediConnect Team
                  </p>

                  {/* Action Buttons */}
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {selectedNotification.type === 'staff' && (
                        <>
                          <button
                            onClick={() => setShowApprovalModal(true)}
                            className="bg-[#0077b6] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md shadow-blue-200 dark:shadow-none flex items-center gap-2 transition-all"
                          >
                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            Approve Request
                          </button>
                          <button
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                          >
                            Deny
                          </button>
                        </>
                      )}
                      {(selectedNotification.type === 'urgent' || selectedNotification.type === 'system') && (
                        <button
                          onClick={() => setShowConfirmModal(true)}
                          className="bg-[#0077b6] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md shadow-blue-200 dark:shadow-none flex items-center gap-2 transition-all"
                        >
                          <span className="material-symbols-outlined text-[20px]">task_alt</span>
                          Mark as Resolved
                        </button>
                      )}
                      {selectedNotification.type === 'financial' && (
                        <button
                          className="bg-[#0077b6] hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md shadow-blue-200 dark:shadow-none flex items-center gap-2 transition-all"
                        >
                          <span className="material-symbols-outlined text-[20px]">download</span>
                          Download Report
                        </button>
                      )}
                    </div>
                    <button
                      onClick={handlePrint}
                      className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors flex items-center gap-2 font-medium"
                    >
                      <span className="material-symbols-outlined">print</span>
                      Print Details
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <span className="material-symbols-outlined text-6xl mb-4">notifications_none</span>
                  <p className="text-lg font-medium">Select a notification to view details</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[#0077b6] dark:text-blue-400 text-2xl">check_circle</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Approve Access Request</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to approve this access request? The staff member will be granted Level 3 clearance immediately.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 px-4 py-3 bg-[#0077b6] text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl">task_alt</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mark as Resolved</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Confirm that this issue has been resolved? This will update the system status and notify relevant parties.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed bottom-8 right-8 z-[70] bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-up">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <p className="font-semibold">{successMessage}</p>
        </div>
      )}
    </div>
  );
}