import React, { useState, useEffect, useRef } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { DoctorNotificationCenter } from './DoctorNotificationCenter';

interface AppointmentRequest {
  id: number;
  patientName: string;
  patientImage?: string;
  patientInitials?: string;
  age: number;
  gender: 'Male' | 'Female';
  phone: string;
  email?: string;
  date: string;
  displayDate: number;
  time: string;
  type: 'video' | 'in-clinic';
  reason: string;
  urgent: boolean;
  lastVisit?: string;
  history?: string;
  insurance?: string;
  isNew?: boolean;
}

export function DoctorAppointmentRequests() {
  const [filterMode, setFilterMode] = useState<'all' | 'online' | 'in-clinic'>('all');
  const [currentMonth] = useState('February 2026');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number | null>(null);
  const [requests, setRequests] = useState<AppointmentRequest[]>([
    {
      id: 1,
      patientName: 'Sarah Jenkins',
      patientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      age: 34,
      gender: 'Female',
      phone: '+1 (555) 012-3456',
      date: 'Tomorrow, Feb 15',
      displayDate: 15,
      time: '09:00 AM - 09:30 AM',
      type: 'video',
      reason: 'Experiencing severe recurring migraines with sensitivity to light for the past 3 days.',
      urgent: true,
      lastVisit: 'Jan 20, 2026',
      history: 'Migraine, Asthma',
      insurance: 'BlueCross #9921',
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      patientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 987-6543',
      date: 'Feb 18, 2026',
      displayDate: 18,
      time: '02:30 PM',
      type: 'in-clinic',
      reason: 'Routine cardiac checkup follow-up. Blood pressure has been stable.',
      urgent: false,
      lastVisit: 'Jan 25, 2026',
      history: 'Hypertension',
      insurance: 'Aetna #4420',
    },
    {
      id: 3,
      patientName: 'Emily Rose',
      patientInitials: 'ER',
      age: 28,
      gender: 'Female',
      phone: 'emily.rose@email.com',
      email: 'emily.rose@email.com',
      date: 'Feb 20, 2026',
      displayDate: 20,
      time: '11:15 AM',
      type: 'video',
      reason: 'General consultation regarding nutrition and diet plans.',
      urgent: false,
      isNew: true,
      lastVisit: 'First Visit',
      history: 'Dr. Adams',
      insurance: 'Cigna #8812',
    },
  ]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'accept' | 'decline' | 'reschedule' | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<AppointmentRequest | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Ref to store timeout IDs for cleanup
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  const filteredRequests = requests.filter((req) => {
    if (filterMode === 'all') return true;
    if (filterMode === 'online') return req.type === 'video';
    if (filterMode === 'in-clinic') return req.type === 'in-clinic';
    return true;
  });

  const handleAction = (request: AppointmentRequest, action: 'accept' | 'decline' | 'reschedule') => {
    setSelectedRequest(request);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const confirmActionHandler = () => {
    if (!selectedRequest || !confirmAction) return;

    if (confirmAction === 'accept') {
      setSuccessMessage(`✓ Appointment with ${selectedRequest.patientName} has been accepted!`);
      setRequests(requests.filter((r) => r.id !== selectedRequest.id));
    } else if (confirmAction === 'decline') {
      setSuccessMessage(`Appointment with ${selectedRequest.patientName} has been declined.`);
      setRequests(requests.filter((r) => r.id !== selectedRequest.id));
    } else if (confirmAction === 'reschedule') {
      setSuccessMessage(`Reschedule request sent to ${selectedRequest.patientName}.`);
    }

    setShowConfirmModal(false);
    setShowSuccessToast(true);
    setSelectedRequest(null);
    setConfirmAction(null);

    const timeout = setTimeout(() => {
      setShowSuccessToast(false);
      setSuccessMessage('');
    }, 3000);
    timeoutRefs.current.push(timeout);
  };

  const calendarDays = [
    { day: 28, prevMonth: true }, { day: 29, prevMonth: true }, { day: 30, prevMonth: true },
    ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1, prevMonth: false }))
  ];

  // Get appointments for a specific date
  const getAppointmentsForDate = (day: number) => {
    return requests.filter((req) => req.displayDate === day);
  };

  // Handle calendar date click
  const handleCalendarDateClick = (day: number, prevMonth: boolean) => {
    if (prevMonth) return;
    
    const appointments = getAppointmentsForDate(day);
    if (appointments.length > 0) {
      setSelectedCalendarDate(day);
      // Show toast with appointment info
      setSuccessMessage(`📅 ${appointments.length} appointment${appointments.length > 1 ? 's' : ''} on Feb ${day}`);
      setShowSuccessToast(true);
      const timeout = setTimeout(() => {
        setShowSuccessToast(false);
        setSuccessMessage('');
      }, 3000);
      timeoutRefs.current.push(timeout);
    } else {
      // Show "no appointments" message
      setSuccessMessage(`📅 No appointments scheduled for Feb ${day}`);
      setShowSuccessToast(true);
      const timeout = setTimeout(() => {
        setShowSuccessToast(false);
        setSuccessMessage('');
      }, 2500);
      timeoutRefs.current.push(timeout);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 dark:bg-slate-950 relative h-full overflow-hidden">
      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                notifications_active
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Appointment Requests</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Manage your incoming patient bookings. <span className="text-blue-600 font-medium">{requests.length} Pending</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NotificationIcon onClick={() => window.dispatchEvent(new CustomEvent('openNotificationCenter'))} />
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col xl:flex-row gap-6">
          {/* Left: Request Cards */}
          <div className="flex-1 space-y-6">
            {/* Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filterMode === 'all'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  All Requests
                </button>
                <button
                  onClick={() => setFilterMode('online')}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filterMode === 'online'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Online
                  </span>
                </button>
                <button
                  onClick={() => setFilterMode('in-clinic')}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filterMode === 'in-clinic'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    In-Clinic
                  </span>
                </button>
              </div>
            </div>

            {/* Request Cards */}
            <div className="grid gap-5">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className={`group relative bg-white dark:bg-slate-800 rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 ${
                    request.urgent
                      ? 'border-l-4 border-l-orange-500 border-y border-r border-slate-200 dark:border-y-slate-700 dark:border-r-slate-700'
                      : 'border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {/* Urgent Badge */}
                  {request.urgent && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider border border-orange-100 animate-pulse">
                      <span className="material-symbols-outlined text-[16px] animate-none">priority_high</span>
                      Urgent • Tomorrow
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
                    {/* Patient Info */}
                    <div className="flex gap-4 min-w-[280px]">
                      <div className="relative shrink-0">
                        {request.patientImage ? (
                          <img
                            src={request.patientImage}
                            alt={request.patientName}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-orange-100"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold border-2 border-slate-100 shadow-sm">
                            {request.patientInitials}
                          </div>
                        )}
                        {request.patientImage && (
                          <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                            <div className="bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="group/profile relative">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white cursor-help border-b border-dashed border-slate-300 dark:border-slate-600 inline-block pb-0.5">
                            {request.patientName}
                          </h3>
                          {/* Tooltip */}
                          <div className="absolute left-0 bottom-full mb-3 w-72 bg-white dark:bg-slate-700 rounded-xl shadow-xl border border-slate-100 dark:border-slate-600 p-4 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible z-20 pointer-events-none transition-all duration-200 transform scale-95 group-hover/profile:scale-100">
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-600">
                              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">id_card</span>
                              <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Patient Profile</span>
                            </div>
                            <div className="space-y-2.5 text-sm">
                              <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400">Last Visit</span>
                                <span className="font-medium text-slate-900 dark:text-white">{request.lastVisit}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400">{request.isNew ? 'Referral' : 'History'}</span>
                                <span className="font-medium text-slate-900 dark:text-white">{request.history}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400">Insurance</span>
                                <span className="font-medium text-blue-600 dark:text-blue-400">{request.insurance}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                          {request.gender}, {request.age} yrs
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 hover:bg-blue-600 hover:text-white text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors" title="Call">
                            <span className="material-symbols-outlined text-[18px]">call</span>
                          </button>
                          <button className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 hover:bg-blue-600 hover:text-white text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors" title="Message">
                            <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                          </button>
                          <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">{request.email || request.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="flex-1 flex flex-col gap-4 lg:pl-6 lg:border-l border-slate-100 dark:border-slate-700">
                      <div className="flex flex-wrap gap-3 items-center">
                        <div className={`flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg border ${
                          request.urgent
                            ? 'bg-orange-50 text-orange-700 border-orange-100'
                            : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-100 dark:border-slate-600'
                        }`}>
                          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                          {request.date}
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-medium bg-slate-50 dark:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-600">
                          <span className="material-symbols-outlined text-[18px] text-slate-400 dark:text-slate-500">schedule</span>
                          {request.time}
                        </div>
                        <div className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg border ${
                          request.type === 'video'
                            ? 'text-indigo-700 bg-indigo-50 border-indigo-100'
                            : 'text-teal-700 bg-teal-50 border-teal-100'
                        }`}>
                          <span className="material-symbols-outlined text-[18px]">
                            {request.type === 'video' ? 'videocam' : 'medical_services'}
                          </span>
                          {request.type === 'video' ? 'Video Call' : 'In-Clinic'}
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-700 p-3.5 rounded-xl border border-slate-100 dark:border-slate-600">
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          <span className="font-semibold text-slate-900 dark:text-white block mb-1 text-xs uppercase tracking-wide opacity-70">
                            Reason for Visit
                          </span>
                          "{request.reason}"
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 mt-auto pt-2">
                        <button
                          onClick={() => handleAction(request, 'reschedule')}
                          className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors border border-slate-200 dark:border-slate-600"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => handleAction(request, 'decline')}
                          className="flex-1 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-800"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleAction(request, 'accept')}
                          className="flex-[2] flex items-center justify-center gap-2 px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                        >
                          <span className="material-symbols-outlined text-[18px]">check</span>
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredRequests.length === 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-3xl">event_busy</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Requests Found</h3>
                  <p className="text-slate-500 dark:text-slate-400">No appointment requests match your selected filter.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Calendar & Availability */}
          <div className="w-full xl:w-[340px] shrink-0 space-y-6">
            <div className="sticky top-6 space-y-6">
              {/* Calendar Widget */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
                  <span className="font-bold text-lg">{currentMonth}</span>
                  <div className="flex gap-1">
                    <button className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                      <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800">
                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 text-center mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                      <div key={day} className="text-xs font-semibold text-slate-400 dark:text-slate-500 py-1">
                        {day}
                      </div>
                    ))}
                  </div>
                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 text-center gap-y-2">
                    {calendarDays.map((item, idx) => {
                      const isToday = item.day === 24 && !item.prevMonth;
                      const isUrgent = item.day === 25 && !item.prevMonth;
                      const isSelected = selectedCalendarDate === item.day && !item.prevMonth;
                      const hasAppointment = (item.day === 28 || item.day === 30) && !item.prevMonth;
                      const appointmentsCount = !item.prevMonth ? getAppointmentsForDate(item.day).length : 0;

                      return (
                        <div 
                          key={idx} 
                          className="relative flex flex-col items-center justify-center"
                          onClick={() => handleCalendarDateClick(item.day, item.prevMonth)}
                        >
                          {item.prevMonth ? (
                            <span className="text-sm text-slate-300 py-1.5">{item.day}</span>
                          ) : isToday ? (
                            <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all ${
                              isSelected ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-slate-200 text-slate-900'
                            }`}>
                              {item.day}
                            </span>
                          ) : isUrgent ? (
                            <div className="relative">
                              <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm border cursor-pointer hover:ring-2 hover:ring-orange-300 transition-all ${
                                isSelected ? 'bg-orange-600 text-white border-orange-700 ring-2 ring-orange-400' : 'bg-orange-100 text-orange-700 border-orange-200'
                              }`}>
                                {item.day}
                              </span>
                              {!isSelected && (
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                                </span>
                              )}
                            </div>
                          ) : hasAppointment ? (
                            <div className="relative">
                              <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm border cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all ${
                                isSelected ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-400' : 'bg-blue-50 text-blue-600 border-blue-100'
                              }`}>
                                {item.day}
                              </span>
                              {!isSelected && <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-blue-500"></div>}
                            </div>
                          ) : (
                            <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer hover:bg-slate-100 transition-all ${
                              isSelected ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-400' : 'text-slate-600'
                            }`}>
                              {item.day}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span> Urgent
                    <span className="w-2 h-2 rounded-full bg-blue-500 ml-1"></span> Pending
                  </div>
                  <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    View Full Schedule
                  </button>
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Availability Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-green-500">check_circle</span>
                      Tomorrow (Oct 25)
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">4 slots open</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-yellow-500">warning</span>
                      Oct 28
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">1 slot open</span>
                  </div>
                </div>
                <button className="w-full mt-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Update Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedRequest && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Confirm Action</h3>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {selectedRequest.patientImage ? (
                  <img
                    src={selectedRequest.patientImage}
                    alt={selectedRequest.patientName}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-slate-700"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {selectedRequest.patientInitials}
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{selectedRequest.patientName}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {selectedRequest.age}y, {selectedRequest.gender}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Date</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedRequest.date}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Time</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedRequest.time}</p>
                </div>
              </div>

              <div
                className={`p-3 rounded-lg ${
                  confirmAction === 'accept'
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : confirmAction === 'decline'
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                }`}
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {confirmAction === 'accept' && 'Accept this appointment request?'}
                  {confirmAction === 'decline' && 'Decline this appointment request?'}
                  {confirmAction === 'reschedule' && 'Send reschedule options to patient?'}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 py-2.5 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmActionHandler}
                  className={`flex-1 py-2.5 rounded-lg font-semibold transition-colors ${
                    confirmAction === 'accept'
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/25'
                      : confirmAction === 'decline'
                      ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/25'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-8 right-8 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center gap-3 z-50 animate-[slideIn_0.3s_ease-out]">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            successMessage.includes('accepted') ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
          }`}>
            <span className={`material-symbols-outlined ${
              successMessage.includes('accepted') ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
            }`}>
              {successMessage.includes('accepted') ? 'check_circle' : 'info'}
            </span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">{successMessage}</span>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}