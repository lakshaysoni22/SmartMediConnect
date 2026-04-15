import React, { useState } from 'react';

interface Notification {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
  isUrgent?: boolean;
  icon: string;
  fullContent: {
    greeting: string;
    mainMessage: string;
    additionalInfo?: string;
    closingMessage: string;
    signature: string;
  };
  details?: {
    refId?: string;
    dateTime?: string;
    location?: string;
    duration?: string;
    appointmentType?: string;
    doctorName?: string;
    date?: {
      month: string;
      day: string;
      weekday: string;
    };
  };
  actions?: {
    primary?: { label: string; icon: string };
    secondary?: { label: string; icon?: string };
    tertiary?: { label: string; icon: string };
  };
}

interface PatientNotificationCenterProps {
  onClose: () => void;
}

export function PatientNotificationCenter({ onClose }: PatientNotificationCenterProps) {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [notificationsList, setNotificationsList] = useState<Notification[]>([
    {
      id: 1,
      category: 'Appointment',
      categoryColor: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
      icon: 'event_available',
      title: 'Consultation Confirmation',
      description: 'Dr. Sarah Smith has confirmed your appointment for tomorrow at 10:00 AM.',
      time: '10 min ago',
      isUnread: true,
      fullContent: {
        greeting: 'Dear Sarah Johnson,',
        mainMessage: 'We are pleased to confirm that Dr. Sarah Smith has accepted and confirmed your appointment request.',
        additionalInfo: 'Please arrive 15 minutes early to complete any necessary paperwork and check-in procedures. If you need to reschedule, please let us know at least 24 hours in advance to avoid any cancellation fees.',
        closingMessage: 'We look forward to seeing you at your appointment. If you have any questions or concerns, please don\'t hesitate to contact our office.',
        signature: 'Best regards,\nMediconnect Scheduling Team'
      },
      details: {
        refId: '#APT-2023-8849',
        dateTime: 'Oct 25, Wed - 10:00 AM - 10:45 AM',
        location: 'Room 304, Main Building, West Wing',
        appointmentType: 'Cardiology Consultation',
        doctorName: 'Dr. Sarah Smith',
        date: {
          month: 'OCT',
          day: '25',
          weekday: 'Wed'
        }
      },
      actions: {
        primary: { label: 'Confirm Attendance', icon: 'check_circle' },
        secondary: { label: 'Reschedule' },
        tertiary: { label: 'Print Details', icon: 'print' }
      }
    },
    {
      id: 2,
      category: 'Urgent',
      categoryColor: 'bg-red-50 dark:bg-red-900/20 text-red-600',
      icon: 'emergency',
      title: 'Covid-19 Test Result Available',
      description: "Your results from yesterday's swab test are now ready to view.",
      time: '2 hrs ago',
      isUnread: true,
      isUrgent: true,
      fullContent: {
        greeting: 'Dear Sarah Johnson,',
        mainMessage: 'Your COVID-19 RT-PCR test results from October 23, 2024 are now available and have been reviewed by our medical team.',
        additionalInfo: 'Test Result: NEGATIVE\n\nYou tested negative for SARS-CoV-2 (COVID-19). This means the virus was not detected in your sample at the time of testing. However, please continue to follow CDC guidelines and monitor for symptoms.\n\nIf you develop any symptoms such as fever, cough, shortness of breath, or loss of taste/smell, please isolate immediately and contact your healthcare provider.',
        closingMessage: 'These results are valid for the date of collection only. If you have any questions about your results, please contact our lab services department.',
        signature: 'Mediconnect Laboratory Services\nCertified Lab Director: Dr. Michael Chen, MD'
      },
      details: {
        refId: '#LAB-2023-4512',
        dateTime: 'Oct 23, Mon - Test Collected',
        location: 'Mediconnect Testing Center',
        appointmentType: 'COVID-19 RT-PCR Test',
        date: {
          month: 'OCT',
          day: '23',
          weekday: 'Mon'
        }
      },
      actions: {
        primary: { label: 'View Full Report', icon: 'description' },
        secondary: { label: 'Download PDF' },
        tertiary: { label: 'Share with Doctor', icon: 'share' }
      }
    },
    {
      id: 3,
      category: 'Prescription',
      categoryColor: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600',
      icon: 'medication',
      title: 'Prescription Refill Approved',
      description: 'Your refill request for Atorvastatin has been approved by Dr. Chen.',
      time: 'Yesterday',
      isUnread: true,
      fullContent: {
        greeting: 'Dear Sarah Johnson,',
        mainMessage: 'Good news! Your prescription refill request has been reviewed and approved by Dr. Michael Chen.',
        additionalInfo: 'Medication: Atorvastatin 20mg\nQuantity: 90 tablets (3-month supply)\nRefills Remaining: 2\nPickup Location: Mediconnect Pharmacy - Main Building\n\nYour prescription is being prepared and will be ready for pickup within 2-4 hours. You will receive a text notification when it\'s ready.\n\nImportant: Please continue taking this medication as prescribed. Do not stop or adjust your dosage without consulting your doctor.',
        closingMessage: 'Remember to take your medication with or without food, preferably at the same time each day. Contact your pharmacist if you have any questions about side effects or interactions.',
        signature: 'Mediconnect Pharmacy Services\nPharmacist: Jennifer Wong, PharmD'
      },
      details: {
        refId: '#RX-2023-7821',
        dateTime: 'Oct 24, Tue - Approved',
        location: 'Mediconnect Pharmacy, Main Building',
        appointmentType: 'Prescription Refill',
        doctorName: 'Dr. Michael Chen',
        date: {
          month: 'OCT',
          day: '24',
          weekday: 'Tue'
        }
      },
      actions: {
        primary: { label: 'Schedule Pickup', icon: 'schedule' },
        secondary: { label: 'Request Delivery' },
        tertiary: { label: 'View Details', icon: 'info' }
      }
    },
    {
      id: 4,
      category: 'Wellness',
      categoryColor: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
      icon: 'health_and_safety',
      title: 'Annual Flu Shot Reminder',
      description: "It's that time of year! Schedule your annual flu shot at any of our clinics.",
      time: 'Oct 20',
      isUnread: false,
      fullContent: {
        greeting: 'Dear Sarah Johnson,',
        mainMessage: 'As we enter flu season, we wanted to remind you that it\'s time for your annual influenza vaccination.',
        additionalInfo: 'Why get vaccinated?\n• Reduces your risk of getting the flu by 40-60%\n• Protects vulnerable populations around you\n• Helps prevent serious complications\n• Free for most insurance plans\n\nVaccine Options Available:\n• Standard Flu Vaccine (recommended for ages 18-64)\n• High-Dose Flu Vaccine (recommended for ages 65+)\n• Preservative-Free options available\n\nWalk-ins welcome at all Mediconnect locations, or schedule an appointment online for guaranteed availability.',
        closingMessage: 'Don\'t wait - protect yourself and your loved ones. The CDC recommends getting vaccinated by the end of October for optimal protection.',
        signature: 'Mediconnect Preventive Care Team\nImmunization Services'
      },
      details: {
        refId: '#WELL-2023-1145',
        dateTime: 'Available Now',
        location: 'All Mediconnect Locations',
        appointmentType: 'Flu Vaccination',
        date: {
          month: 'OCT',
          day: '20',
          weekday: 'Fri'
        }
      },
      actions: {
        primary: { label: 'Schedule Vaccination', icon: 'vaccines' },
        secondary: { label: 'View Locations' },
        tertiary: { label: 'Learn More', icon: 'info' }
      }
    },
    {
      id: 5,
      category: 'Billing',
      categoryColor: 'bg-slate-100 dark:bg-slate-700 text-slate-600',
      icon: 'receipt_long',
      title: 'Statement Available',
      description: 'Your billing statement for service date Oct 15 is available for review.',
      time: 'Oct 18',
      isUnread: false,
      fullContent: {
        greeting: 'Dear Sarah Johnson,',
        mainMessage: 'Your billing statement for recent medical services is now available for your review.',
        additionalInfo: 'Statement Summary:\nService Date: October 15, 2024\nProvider: Dr. Sarah Smith\nService: Cardiology Consultation\n\nTotal Charges: $450.00\nInsurance Payment: $360.00\nPatient Responsibility: $90.00\n\nPayment Due Date: November 15, 2024\n\nPayment Options:\n• Pay online through the patient portal\n• Call our billing office at 1-800-BILLING\n• Mail check to: Mediconnect Billing, PO Box 1234\n• Set up a payment plan (interest-free options available)',
        closingMessage: 'If you have questions about your bill or need assistance with payment options, our billing specialists are here to help Monday-Friday, 8:00 AM - 8:00 PM EST.',
        signature: 'Mediconnect Billing Department\nPhone: 1-800-245-5464\nEmail: billing@mediconnect.com'
      },
      details: {
        refId: '#BILL-2023-9034',
        dateTime: 'Oct 15, Service Date',
        location: 'Mediconnect Main Campus',
        appointmentType: 'Billing Statement',
        doctorName: 'Dr. Sarah Smith',
        date: {
          month: 'OCT',
          day: '18',
          weekday: 'Wed'
        }
      },
      actions: {
        primary: { label: 'Pay Now', icon: 'payment' },
        secondary: { label: 'View Statement' },
        tertiary: { label: 'Contact Billing', icon: 'phone' }
      }
    },
    {
      id: 6,
      category: 'Lab Results',
      categoryColor: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
      icon: 'science',
      title: 'Blood Test Results Available',
      description: 'Your comprehensive metabolic panel results are ready for review.',
      time: 'Oct 17',
      isUnread: false,
      fullContent: {
        greeting: 'Dear Sarah Johnson,',
        mainMessage: 'Your laboratory test results from October 16, 2024 have been reviewed by Dr. Sarah Smith and are now available.',
        additionalInfo: 'Test: Comprehensive Metabolic Panel (CMP)\n\nResults Summary:\n✓ Glucose: 92 mg/dL (Normal: 70-100)\n✓ Sodium: 140 mmol/L (Normal: 136-145)\n✓ Potassium: 4.2 mmol/L (Normal: 3.5-5.0)\n✓ Creatinine: 0.9 mg/dL (Normal: 0.6-1.2)\n✓ All other values within normal range\n\nDoctor\'s Notes:\nAll results are within normal limits. No immediate concerns. Continue current medications and lifestyle. Follow-up in 6 months for routine monitoring.',
        closingMessage: 'These results have been added to your medical record. If you have any questions, please message your doctor through the patient portal or call the office.',
        signature: 'Mediconnect Laboratory Services\nReviewed by: Dr. Sarah Smith, MD'
      },
      details: {
        refId: '#LAB-2023-6789',
        dateTime: 'Oct 16, Mon - Sample Collected',
        location: 'Mediconnect Lab Center',
        appointmentType: 'Comprehensive Metabolic Panel',
        doctorName: 'Dr. Sarah Smith',
        date: {
          month: 'OCT',
          day: '17',
          weekday: 'Tue'
        }
      },
      actions: {
        primary: { label: 'View Full Results', icon: 'lab_profile' },
        secondary: { label: 'Message Doctor' },
        tertiary: { label: 'Download Report', icon: 'download' }
      }
    }
  ]);

  const unreadCount = notificationsList.filter((n) => n.isUnread).length;

  const filteredNotifications = activeFilter === 'Unread' 
    ? notificationsList.filter(n => n.isUnread)
    : notificationsList;

  // CRITICAL FIX: Add proper dependencies to prevent infinite loops
  React.useEffect(() => {
    if (filteredNotifications.length > 0 && !selectedNotification) {
      setSelectedNotification(filteredNotifications[0]);
    }
  }, [activeFilter, filteredNotifications.length]); // Fixed: only depend on filter and length

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    // Mark as read when clicked
    if (notification.isUnread) {
      setNotificationsList(prev =>
        prev.map(n =>
          n.id === notification.id ? { ...n, isUnread: false } : n
        )
      );
    }
  };

  const handleMarkAllAsRead = () => {
    setNotificationsList(prev =>
      prev.map(n => ({ ...n, isUnread: false }))
    );
  };

  const handleDelete = () => {
    if (selectedNotification) {
      setNotificationsList(prev => prev.filter(n => n.id !== selectedNotification.id));
      setSelectedNotification(filteredNotifications[0] || null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="bg-slate-50 dark:bg-black rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden border dark:border-slate-800">
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden px-6 pt-4 pb-6 max-w-[1600px] mx-auto w-full gap-4">
          {/* Top Bar with Filters and Close Button */}
          <div className="flex items-center justify-between shrink-0">
            {/* Filter Chips - Only All and Unread */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter('All')}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all ${
                  activeFilter === 'All'
                    ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-600/50 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span className="text-sm font-medium">All</span>
              </button>
              <button
                onClick={() => setActiveFilter('Unread')}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-all group ${
                  activeFilter === 'Unread'
                    ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-600/50'
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    activeFilter === 'Unread' ? '' : 'text-slate-600 dark:text-slate-300 group-hover:text-blue-600'
                  }`}
                >
                  Unread
                </span>
                <span className="flex items-center justify-center size-5 rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex items-center justify-center size-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Master-Detail View */}
          <div className="flex flex-1 gap-6 overflow-hidden min-h-0 relative">
            {/* Left Pane: Notification List */}
            <div className="w-full lg:w-[420px] shrink-0 flex flex-col bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg overflow-hidden h-full">
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent</span>
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-xs font-medium text-blue-600 cursor-pointer hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-2 space-y-2">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`cursor-pointer group flex flex-col gap-1 p-4 rounded-xl transition-all ${
                      selectedNotification?.id === notification.id
                        ? 'border-l-4 border-l-blue-600 bg-blue-50/50 dark:bg-blue-900/20 bg-white dark:bg-slate-900 shadow-sm'
                        : 'hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        {notification.isUnread && <span className="flex size-2 rounded-full bg-blue-600"></span>}
                        {!notification.isUnread && <span className="flex size-2 rounded-full bg-transparent"></span>}
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${notification.categoryColor}`}
                        >
                          {notification.category}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 whitespace-nowrap">{notification.time}</span>
                    </div>
                    <h3
                      className={`font-bold text-base leading-tight ${
                        selectedNotification?.id === notification.id
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">
                      {notification.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Pane: Detail View */}
            <div className="hidden lg:flex flex-1 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg flex-col overflow-hidden relative">
              {/* Background decorative element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

              {selectedNotification ? (
                <>
                  {/* Header Content */}
                  <div className="p-8 pb-4 border-b border-slate-100 dark:border-slate-700/50">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`size-12 rounded-xl ${selectedNotification.categoryColor} flex items-center justify-center`}>
                          <span className="material-symbols-outlined text-2xl">{selectedNotification.icon}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold uppercase" style={{ color: selectedNotification.categoryColor.includes('blue') ? '#2563eb' : selectedNotification.categoryColor.includes('red') ? '#dc2626' : selectedNotification.categoryColor.includes('indigo') ? '#4f46e5' : selectedNotification.categoryColor.includes('emerald') ? '#059669' : selectedNotification.categoryColor.includes('purple') ? '#9333ea' : '#475569' }}>
                              {selectedNotification.category}
                            </span>
                            <span className="size-1 rounded-full bg-slate-300"></span>
                            <span className="text-sm text-slate-500">Inbox</span>
                          </div>
                          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {selectedNotification.title}
                          </h2>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleDelete}
                          className="size-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                        <button
                          className="size-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 transition-colors"
                          title="Archive"
                        >
                          <span className="material-symbols-outlined text-lg">archive</span>
                        </button>
                        <button
                          className="size-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 transition-colors"
                          title="More"
                        >
                          <span className="material-symbols-outlined text-lg">more_vert</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-2xl">
                      {selectedNotification.details?.refId && (
                        <div className="flex items-center gap-2 mb-6 text-slate-500 dark:text-slate-400 text-sm">
                          <span className="material-symbols-outlined text-lg">schedule</span>
                          <span>Today, 10:45 AM</span>
                          <span className="mx-2 text-slate-300">|</span>
                          <span>Ref ID: {selectedNotification.details.refId}</span>
                        </div>
                      )}

                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                          {selectedNotification.fullContent.greeting}
                        </p>
                        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                          {selectedNotification.fullContent.mainMessage}
                        </p>

                        {/* Appointment/Details Card */}
                        {selectedNotification.details && selectedNotification.details.date && (
                          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8 shadow-sm flex flex-col sm:flex-row gap-6">
                            <div className="shrink-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg w-20 h-20 text-center border border-slate-100 dark:border-slate-700">
                              <span className="text-xs font-bold text-slate-500 uppercase">{selectedNotification.details.date.month}</span>
                              <span className="text-2xl font-bold text-slate-900 dark:text-white">{selectedNotification.details.date.day}</span>
                              <span className="text-xs font-medium text-slate-400">{selectedNotification.details.date.weekday}</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center gap-1">
                              <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                                {selectedNotification.details.appointmentType || 'Appointment'}
                              </h4>
                              {selectedNotification.details.doctorName && (
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                                  <span className="material-symbols-outlined text-lg">person</span>
                                  <span>{selectedNotification.details.doctorName}</span>
                                </div>
                              )}
                              {selectedNotification.details.dateTime && (
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                                  <span className="material-symbols-outlined text-lg">access_time</span>
                                  <span>{selectedNotification.details.dateTime}</span>
                                </div>
                              )}
                              {selectedNotification.details.location && (
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                                  <span className="material-symbols-outlined text-lg">location_on</span>
                                  <span>{selectedNotification.details.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {selectedNotification.fullContent.additionalInfo && (
                          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-6 whitespace-pre-line">
                            {selectedNotification.fullContent.additionalInfo}
                          </p>
                        )}

                        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                          {selectedNotification.fullContent.closingMessage}
                        </p>
                        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                          {selectedNotification.fullContent.signature}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  {selectedNotification.actions && (
                    <div className="p-6 border-t border-slate-100 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex gap-3 flex-wrap">
                      {selectedNotification.actions.primary && (
                        <button className="flex items-center justify-center rounded-lg h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/20 transition-all transform hover:scale-[1.02]">
                          {selectedNotification.actions.primary.icon && (
                            <span className="material-symbols-outlined mr-2">{selectedNotification.actions.primary.icon}</span>
                          )}
                          {selectedNotification.actions.primary.label}
                        </button>
                      )}
                      {selectedNotification.actions.secondary && (
                        <button className="flex items-center justify-center rounded-lg h-11 px-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold transition-all">
                          {selectedNotification.actions.secondary.icon && (
                            <span className="material-symbols-outlined mr-2">{selectedNotification.actions.secondary.icon}</span>
                          )}
                          {selectedNotification.actions.secondary.label}
                        </button>
                      )}
                      {selectedNotification.actions.tertiary && (
                        <button className="flex items-center justify-center rounded-lg h-11 px-6 bg-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-medium transition-all ml-auto">
                          {selectedNotification.actions.tertiary.icon && (
                            <span className="material-symbols-outlined mr-2">{selectedNotification.actions.tertiary.icon}</span>
                          )}
                          {selectedNotification.actions.tertiary.label}
                        </button>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4 block">inbox</span>
                    <p className="text-slate-500 dark:text-slate-400">No notifications to display</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}