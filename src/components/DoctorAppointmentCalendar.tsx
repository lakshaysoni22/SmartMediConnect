import React, { useState, useMemo } from 'react';
import { useLanguage } from '../utils/language';

interface Appointment {
  id: string;
  patientName: string;
  patientAvatar: string;
  patientAge: number;
  patientGender: string;
  patientEmail: string;
  date: Date;
  time: string;
  reason: string;
  type: 'urgent' | 'pending' | 'confirmed';
  hasVideoCall?: boolean;
  phone: string;
  medicalHistory: string;
  lastVisit: string;
}

interface AppointmentCalendarProps {
  appointments?: Appointment[];
  onAccept?: (appointmentId: string) => void;
  onDecline?: (appointmentId: string) => void;
  onReschedule?: (appointmentId: string) => void;
}

export function DoctorAppointmentCalendar({
  appointments = [],
  onAccept,
  onDecline,
  onReschedule
}: AppointmentCalendarProps) {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const [allAppointments] = useState<Appointment[]>([
    {
      id: 'apt-001',
      patientName: 'Emily Rose',
      patientAvatar: 'https://i.pravatar.cc/150?img=5',
      patientAge: 28,
      patientGender: 'Female',
      patientEmail: 'emily.rose@email.com',
      date: new Date(2026, 1, 18), // Feb 18, 2026
      time: '11:15 AM',
      reason: 'General consultation regarding nutrition and diet plans.',
      type: 'pending',
      phone: '+1 (555) 123-4567',
      medicalHistory: 'No major health issues. Recent concerns about dietary choices.',
      lastVisit: 'Jan 10, 2026'
    },
    {
      id: 'apt-002',
      patientName: 'John Smith',
      patientAvatar: 'https://i.pravatar.cc/150?img=12',
      patientAge: 45,
      patientGender: 'Male',
      patientEmail: 'john.smith@email.com',
      date: new Date(2026, 1, 15), // Feb 15, 2026
      time: '09:00 AM',
      reason: 'Follow-up checkup for diabetes management.',
      type: 'urgent',
      phone: '+1 (555) 987-6543',
      medicalHistory: 'Type 2 diabetes diagnosed 3 years ago. On medication.',
      lastVisit: 'Jan 20, 2026'
    },
    {
      id: 'apt-003',
      patientName: 'Sarah Johnson',
      patientAvatar: 'https://i.pravatar.cc/150?img=9',
      patientAge: 32,
      patientGender: 'Female',
      patientEmail: 'sarah.j@email.com',
      date: new Date(2026, 1, 20), // Feb 20, 2026
      time: '02:30 PM',
      reason: 'Routine health checkup and lab results discussion.',
      type: 'confirmed',
      phone: '+1 (555) 456-7890',
      medicalHistory: 'Annual checkup. Generally healthy.',
      lastVisit: 'Feb 10, 2025'
    },
    {
      id: 'apt-004',
      patientName: 'Michael Brown',
      patientAvatar: 'https://i.pravatar.cc/150?img=13',
      patientAge: 55,
      patientGender: 'Male',
      patientEmail: 'michael.b@email.com',
      date: new Date(2026, 1, 22), // Feb 22, 2026
      time: '10:00 AM',
      reason: 'Hypertension consultation and medication review.',
      type: 'confirmed',
      phone: '+1 (555) 321-6547',
      medicalHistory: 'Hypertension for 8 years. Currently on ACE inhibitors.',
      lastVisit: 'Jan 15, 2026'
    },
    {
      id: 'apt-005',
      patientName: 'Lisa Anderson',
      patientAvatar: 'https://i.pravatar.cc/150?img=31',
      patientAge: 38,
      patientGender: 'Female',
      patientEmail: 'lisa.anderson@email.com',
      date: new Date(2026, 1, 25), // Feb 25, 2026
      time: '03:45 PM',
      reason: 'Annual physical examination and preventive care consultation.',
      type: 'pending',
      phone: '+1 (555) 654-9870',
      medicalHistory: 'No chronic conditions. Interested in preventive health.',
      lastVisit: 'Feb 18, 2025'
    },
    {
      id: 'apt-006',
      patientName: 'David Wilson',
      patientAvatar: 'https://i.pravatar.cc/150?img=14',
      patientAge: 62,
      patientGender: 'Male',
      patientEmail: 'david.wilson@email.com',
      date: new Date(2026, 1, 27), // Feb 27, 2026
      time: '11:00 AM',
      reason: 'Cardiac health assessment and medication adjustment.',
      type: 'urgent',
      phone: '+1 (555) 789-3210',
      medicalHistory: 'History of coronary artery disease. On statin therapy.',
      lastVisit: 'Jan 28, 2026'
    }
  ]);

  // Calendar logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days: Array<{
      date: number;
      month: 'prev' | 'current' | 'next';
      fullDate: Date;
      appointments: Appointment[];
    }> = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = daysInPrevMonth - i;
      const fullDate = new Date(year, month - 1, date);
      days.push({
        date,
        month: 'prev',
        fullDate,
        appointments: allAppointments.filter(apt => 
          apt.date.toDateString() === fullDate.toDateString()
        )
      });
    }

    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const fullDate = new Date(year, month, date);
      days.push({
        date,
        month: 'current',
        fullDate,
        appointments: allAppointments.filter(apt => 
          apt.date.toDateString() === fullDate.toDateString()
        )
      });
    }

    // Next month days to complete the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let date = 1; date <= remainingDays; date++) {
      const fullDate = new Date(year, month + 1, date);
      days.push({
        date,
        month: 'next',
        fullDate,
        appointments: allAppointments.filter(apt => 
          apt.date.toDateString() === fullDate.toDateString()
        )
      });
    }

    return days;
  }, [year, month, firstDayOfMonth, daysInMonth, daysInPrevMonth, allAppointments]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: typeof calendarDays[0]) => {
    setSelectedDate(day.fullDate);
    if (day.appointments.length > 0) {
      setSelectedAppointment(day.appointments[0]);
    } else {
      setSelectedAppointment(null);
    }
  };

  const getAppointmentTypeColor = (type: Appointment['type']) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-500';
      case 'pending':
        return 'bg-blue-500';
      case 'confirmed':
        return 'bg-green-500';
      default:
        return 'bg-slate-500';
    }
  };

  const handleAccept = () => {
    if (selectedAppointment && onAccept) {
      onAccept(selectedAppointment.id);
      setSelectedAppointment(null);
    }
  };

  const handleDecline = () => {
    if (selectedAppointment && onDecline) {
      onDecline(selectedAppointment.id);
      setSelectedAppointment(null);
    }
  };

  const handleReschedule = () => {
    if (selectedAppointment && onReschedule) {
      onReschedule(selectedAppointment.id);
    }
  };

  // Calculate availability
  const availabilityData = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const tomorrowAppointments = allAppointments.filter(apt =>
      apt.date.toDateString() === tomorrow.toDateString()
    );

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const nextWeekAppointments = allAppointments.filter(apt =>
      apt.date >= today && apt.date <= nextWeek
    );

    return {
      tomorrow: {
        date: tomorrow,
        slotsOpen: Math.max(0, 8 - tomorrowAppointments.length),
        total: 8
      },
      week: {
        slotsOpen: Math.max(0, 40 - nextWeekAppointments.length),
        total: 40
      }
    };
  }, [allAppointments]);

  return (
    <div className="space-y-6">
      {/* Appointment Request Card */}
      {selectedAppointment && (
        <div className="bg-slate-800/50 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 dark:border-slate-600/50 shadow-xl animate-in fade-in duration-300">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Patient Info */}
            <div className="flex items-start gap-4 flex-1">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {selectedAppointment.patientInitials}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white mb-1">
                  {selectedAppointment.patientName}
                </h3>
                <p className="text-slate-400 text-sm mb-3">
                  {selectedAppointment.patientGender}, {selectedAppointment.patientAge} yrs
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">call</span>
                    <span>+1 234 567 8900</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    <span className="truncate">{selectedAppointment.patientEmail}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-72">
              {/* Date */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-700/50 dark:bg-slate-700/80 rounded-lg flex-1 lg:flex-none">
                <span className="material-symbols-outlined text-slate-400">calendar_today</span>
                <span className="text-white font-medium">
                  {selectedAppointment.date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-700/50 dark:bg-slate-700/80 rounded-lg flex-1 lg:flex-none">
                <span className="material-symbols-outlined text-slate-400">schedule</span>
                <span className="text-white font-medium">{selectedAppointment.time}</span>
              </div>

              {/* Video Call Badge */}
              {selectedAppointment.hasVideoCall && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-500/20 dark:bg-blue-500/30 border border-blue-500/50 rounded-lg flex-1 lg:flex-none">
                  <span className="material-symbols-outlined text-blue-400">videocam</span>
                  <span className="text-blue-300 font-medium">Video Call</span>
                </div>
              )}
            </div>
          </div>

          {/* Reason */}
          <div className="mt-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Reason for Visit
            </h4>
            <p className="text-slate-300 leading-relaxed">
              "{selectedAppointment.reason}"
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleReschedule}
              className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-95"
            >
              Reschedule
            </button>
            <button
              onClick={handleDecline}
              className="px-6 py-2.5 bg-transparent hover:bg-red-500/10 text-red-400 border border-red-500/50 hover:border-red-500 rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-95"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 ml-auto"
            >
              <span className="material-symbols-outlined text-[20px]">check</span>
              Accept
            </button>
          </div>
        </div>
      )}

      {/* Calendar */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {monthNames[month]} {year}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handlePrevMonth}
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              onClick={handleNextMonth}
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {dayNames.map(day => (
            <div key={day} className="text-center text-blue-200 dark:text-blue-300 text-sm font-semibold py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            const isSelected = selectedDate?.toDateString() === day.fullDate.toDateString();
            const hasAppointments = day.appointments.length > 0;
            const urgentAppointment = day.appointments.find(apt => apt.type === 'urgent');
            const pendingAppointment = day.appointments.find(apt => apt.type === 'pending');
            
            return (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={`
                  relative aspect-square rounded-lg font-medium transition-all
                  ${day.month === 'current' 
                    ? 'text-white hover:bg-white/20' 
                    : 'text-blue-300/40 hover:bg-white/10'
                  }
                  ${isSelected ? 'bg-white/30 ring-2 ring-white' : 'bg-white/5'}
                  ${hasAppointments ? 'hover:scale-105' : 'hover:scale-[1.02]'}
                  active:scale-95
                `}
              >
                <span className="text-sm">{day.date}</span>
                
                {/* Appointment Indicators */}
                {hasAppointments && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                    {urgentAppointment && (
                      <div className={`w-1.5 h-1.5 rounded-full ${getAppointmentTypeColor('urgent')}`} />
                    )}
                    {pendingAppointment && (
                      <div className={`w-1.5 h-1.5 rounded-full ${getAppointmentTypeColor('pending')}`} />
                    )}
                    {day.appointments.some(apt => apt.type === 'confirmed') && (
                      <div className={`w-1.5 h-1.5 rounded-full ${getAppointmentTypeColor('confirmed')}`} />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-blue-100">Urgent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-blue-100">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-blue-100">Confirmed</span>
          </div>
          <button
            className="ml-auto text-sm text-blue-100 hover:text-white font-medium transition-colors"
            onClick={() => {/* View full schedule */}}
          >
            View Full Schedule →
          </button>
        </div>
      </div>

      {/* Availability Status */}
      <div className="bg-slate-800/50 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 dark:border-slate-600/50">
        <h3 className="text-lg font-bold text-white mb-4">Availability Status</h3>
        
        <div className="space-y-3">
          {/* Tomorrow */}
          <div className="flex items-center justify-between p-4 bg-slate-700/30 dark:bg-slate-700/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-400">check_circle</span>
              </div>
              <div>
                <p className="text-white font-medium">
                  Tomorrow ({availabilityData.tomorrow.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-400 font-bold">{availabilityData.tomorrow.slotsOpen} slots open</p>
              <p className="text-xs text-slate-400">of {availabilityData.tomorrow.total} total</p>
            </div>
          </div>

          {/* This Week */}
          <div className="flex items-center justify-between p-4 bg-slate-700/30 dark:bg-slate-700/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-400">warning</span>
              </div>
              <div>
                <p className="text-white font-medium">This Week</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-orange-400 font-bold">{availabilityData.week.slotsOpen} slots open</p>
              <p className="text-xs text-slate-400">of {availabilityData.week.total} total</p>
            </div>
          </div>
        </div>

        <button
          className="w-full mt-4 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-95"
          onClick={() => {/* Update availability */}}
        >
          Update Availability
        </button>
      </div>
    </div>
  );
}