import React, { useState, useEffect, useRef } from 'react';
import { NotificationIcon } from './NotificationIcon';

interface Appointment {
  id: number;
  time: string;
  patientName: string;
  patientImage: string;
  type: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'emergency';
  color: string;
  date: number; // Day of month
}

interface AppointmentRequest {
  id: number;
  patientName: string;
  patientInitials: string;
  gender: string;
  age: number;
  email: string;
  date: string;
  time: string;
  reason: string;
  isVideoCall: boolean;
}

export function DoctorSchedule() {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [currentMonth] = useState('October 2023');
  const [selectedDate, setSelectedDate] = useState(5); // Default to day 5 (today)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [pendingRequest, setPendingRequest] = useState<AppointmentRequest>({
    id: 1,
    patientName: 'Emily Rose',
    patientInitials: 'ER',
    gender: 'Female',
    age: 28,
    email: 'emily.rose@email.com',
    date: 'Oct 30, 2023',
    time: '11:15 AM',
    reason: 'General consultation regarding nutrition and diet plans.',
    isVideoCall: true
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'info'>('success');

  // Ref to store timeout IDs for cleanup
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  const handleAccept = () => {
    setToastMessage('Appointment accepted successfully!');
    setToastType('success');
    setShowToast(true);
    setPendingRequest(null as any);
    const timeout = setTimeout(() => setShowToast(false), 3000);
    timeoutRefs.current.push(timeout);
  };

  const handleDecline = () => {
    setToastMessage('Appointment declined');
    setToastType('info');
    setShowToast(true);
    setPendingRequest(null as any);
    const timeout = setTimeout(() => setShowToast(false), 3000);
    timeoutRefs.current.push(timeout);
  };

  const handleReschedule = () => {
    setToastMessage('Reschedule options opened');
    setToastType('info');
    setShowToast(true);
    const timeout = setTimeout(() => setShowToast(false), 3000);
    timeoutRefs.current.push(timeout);
  };

  // All appointments data
  const allAppointments: Appointment[] = [
    {
      id: 1,
      time: '09:00 AM',
      patientName: 'John Doe',
      patientImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiiCu6DYYla414xzec-TzfwoX12iF4p_X-iKV-287gBwwkjVznVKCzdrnd3FWthY_vznfduQXKC_BeE934rSVHhzDwFRiqOPARFYPhT4RZHiwgX-kCYN5wuuPo0PK_U3DyeS57xp2rh-HEX-tVkvI17MzgrQF6ApMav4v4ApJQ0nG7g_YCXlai7B4cuCjjy1rSeKqKkJgJB5f5hcNvRSWRYxOl5crT4oWAXtLalTFF5Krtek-RYNSs4YdZzGr0__Owy1z4erpgAEf6',
      type: 'Annual Checkup',
      status: 'completed',
      color: 'emerald',
      date: 2,
    },
    {
      id: 2,
      time: '14:00 PM',
      patientName: 'Sarah Williams',
      patientImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgkysel_KEt_b_hbD_NXdwK6SafgpRlocPfJlgwCje3BkA87tOSWtoEBWOdHyuDEhLxxmgROhCXQRpqkXpPaLwJH71FPGl_x4LhcIaWiXdHb2LTo2Y72N33njyhHL542SVlkY9QCHPDwONtTvTKe2MFHF5euQdOj0npmT7dJDCuh0CCXSky3awMup2vpiIi8pbFw8QCFvoHOvMIeGT7mosa7JXDLYXGFH0mky0qvDZq1atGoxZtqIcPsa9AvZqzegCagbCLe_HjwGP',
      type: 'Cardiac Surgery',
      status: 'completed',
      color: 'rose',
      date: 4,
    },
    {
      id: 3,
      time: '08:00 AM',
      patientName: 'Robert Fox',
      patientImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYblXkpkdr6YO7CROwYikJ05YRoFrwJakTFRlEehOug9USZoSTbsgrFYBklSd2eb6H1AvD7eyearCBBpbBTIg1Lxt4LO_6y_jjJQee0B3isG-XbGToT3lAjhRoWd9rrQrSsa7DuRNf7jIsnpyrfjrNFUszzbNDAbiZrl99nxgFqfe0SftVvSYO2TOnm0BA6y3Q7ypwIwNMk8CfLDLDzvL8cLP2-kI8hANSP3X5Gz5JVteQe8hI8RYctTCVTxDfh8JAGHX5nqdFod15',
      type: 'Follow-up',
      status: 'completed',
      color: 'slate',
      date: 5,
    },
    {
      id: 4,
      time: '09:00 AM',
      patientName: 'Jane Smith',
      patientImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgkysel_KEt_b_hbD_NXdwK6SafgpRlocPfJlgwCje3BkA87tOSWtoEBWOdHyuDEhLxxmgROhCXQRpqkXpPaLwJH71FPGl_x4LhcIaWiXdHb2LTo2Y72N33njyhHL542SVlkY9QCHPDwONtTvTKe2MFHF5euQdOj0npmT7dJDCuh0CCXSky3awMup2vpiIi8pbFw8QCFvoHOvMIeGT7mosa7JXDLYXGFH0mky0qvDZq1atGoxZtqIcPsa9AvZqzegCagbCLe_HjwGP',
      type: 'Heart Palpitations',
      status: 'upcoming',
      color: 'emerald',
      date: 5,
    },
    {
      id: 5,
      time: '10:30 AM',
      patientName: 'Michael Chen',
      patientImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiiCu6DYYla414xzec-TzfwoX12iF4p_X-iKV-287gBwwkjVznVKCzdrnd3FWthY_vznfduQXKC_BeE934rSVHhzDwFRiqOPARFYPhT4RZHiwgX-kCYN5wuuPo0PK_U3DyeS57xp2rh-HEX-tVkvI17MzgrQF6ApMav4v4ApJQ0nG7g_YCXlai7B4cuCjjy1rSeKqKkJgJB5f5hcNvRSWRYxOl5crT4oWAXtLalTFF5Krtek-RYNSs4YdZzGr0__Owy1z4erpgAEf6',
      type: 'Diabetes Checkup',
      status: 'in-progress',
      color: 'amber',
      date: 5,
    },
    {
      id: 6,
      time: '11:00 AM',
      patientName: 'Emergency Block',
      patientImage: '',
      type: 'Reserved Slot',
      status: 'emergency',
      color: 'rose',
      date: 5,
    },
    {
      id: 7,
      time: '02:00 PM',
      patientName: 'Emma Watson',
      patientImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgkysel_KEt_b_hbD_NXdwK6SafgpRlocPfJlgwCje3BkA87tOSWtoEBWOdHyuDEhLxxmgROhCXQRpqkXpPaLwJH71FPGl_x4LhcIaWiXdHb2LTo2Y72N33njyhHL542SVlkY9QCHPDwONtTvTKe2MFHF5euQdOj0npmT7dJDCuh0CCXSky3awMup2vpiIi8pbFw8QCFvoHOvMIeGT7mosa7JXDLYXGFH0mky0qvDZq1atGoxZtqIcPsa9AvZqzegCagbCLe_HjwGP',
      type: 'Blood Pressure Monitoring',
      status: 'upcoming',
      color: 'emerald',
      date: 10,
    },
    {
      id: 8,
      time: '11:30 AM',
      patientName: 'David Miller',
      patientImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYblXkpkdr6YO7CROwYikJ05YRoFrwJakTFRlEehOug9USZoSTbsgrFYBklSd2eb6H1AvD7eyearCBBpbBTIg1Lxt4LO_6y_jjJQee0B3isG-XbGToT3lAjhRoWd9rrQrSsa7DuRNf7jIsnpyrfjrNFUszzbNDAbiZrl99nxgFqfe0SftVvSYO2TOnm0BA6y3Q7ypwIwNMk8CfLDLDzvL8cLP2-kI8hANSP3X5Gz5JVteQe8hI8RYctTCVTxDfh8JAGHX5nqdFod15',
      type: 'Staff Meeting',
      status: 'upcoming',
      color: 'purple',
      date: 5,
    },
  ];

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const emptyDays = [1, 2, 3]; // Previous month days

  // Filter appointments for selected date
  const selectedDateAppointments = allAppointments.filter((apt) => apt.date === selectedDate);

  // Get appointment count for each day
  const getAppointmentCount = (day: number) => {
    return allAppointments.filter((apt) => apt.date === day).length;
  };

  // Get first 2 appointments for preview on calendar
  const getDayPreview = (day: number) => {
    return allAppointments.filter((apt) => apt.date === day).slice(0, 2);
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 relative h-full overflow-hidden">
      {/* Top Header - Matching Doctor Portal Style */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white text-[28px]">
                calendar_today
              </span>
            </div>
            {/* Title & Subtitle */}
            <div>
              <h1 className="text-xl font-bold text-slate-900">Appointments</h1>
              <p className="text-sm text-slate-500 mt-0.5">Manage appointments and availability</p>
            </div>
          </div>
          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <NotificationIcon 
              onClick={() => window.dispatchEvent(new CustomEvent('openNotificationCenter'))}
            />
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 dark:bg-blue-900/20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-[100px]"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Upcoming Appointments
                </p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">12</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined">calendar_month</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 w-fit px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
              +2% from yesterday
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Patients Waiting</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">3</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined">hourglass_top</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 w-fit px-2 py-1 rounded-full">
              Current Queue
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Cancellations</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600 flex items-center justify-center">
                <span className="material-symbols-outlined">event_busy</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 w-fit px-2 py-1 rounded-full">
              Review required
            </div>
          </div>
        </div>

        {/* Split View Layout */}
        <div className="flex flex-col xl:flex-row gap-8 min-h-[600px]">
          {/* Left Column: Calendar */}
          <div className="flex-[3] bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{currentMonth}</h2>
                <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                  <button className="p-1 hover:bg-white dark:hover:bg-slate-600 rounded shadow-sm transition-all">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
                      chevron_left
                    </span>
                  </button>
                  <button className="p-1 hover:bg-white dark:hover:bg-slate-600 rounded shadow-sm transition-all">
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                    viewMode === 'month'
                      ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                    viewMode === 'week'
                      ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                    viewMode === 'day'
                      ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  Day
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 h-full">
              {/* Weekday Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="bg-slate-50 dark:bg-slate-800/50 p-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide"
                >
                  {day}
                </div>
              ))}

              {/* Empty Previous Month Days */}
              {emptyDays.map((day) => (
                <div
                  key={`empty-${day}`}
                  className="bg-white dark:bg-slate-900/40 p-2 min-h-[100px] opacity-40"
                ></div>
              ))}

              {/* Calendar Days - NOW CLICKABLE! */}
              {calendarDays.map((day) => {
                const isToday = day === 5;
                const isSelected = day === selectedDate;
                const appointmentCount = getAppointmentCount(day);
                const dayPreview = getDayPreview(day);

                return (
                  <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`bg-white dark:bg-slate-900/40 p-2 min-h-[100px] hover:bg-blue-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer relative border-2 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg z-20'
                        : isToday
                        ? 'ring-2 ring-inset ring-blue-400 z-10 border-transparent'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm font-medium transition-all ${
                          isToday
                            ? 'flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm'
                            : isSelected
                            ? 'text-blue-700 dark:text-blue-400 font-bold'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {day}
                      </span>
                      {appointmentCount > 0 && (
                        <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          {appointmentCount}
                        </span>
                      )}
                    </div>

                    {/* Appointment Previews */}
                    {dayPreview.length > 0 && (
                      <div className="mt-1 space-y-1">
                        {dayPreview.map((apt) => (
                          <div
                            key={apt.id}
                            className={`text-[9px] px-1.5 py-0.5 rounded truncate border-l-2 ${
                              apt.color === 'emerald'
                                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-500'
                                : apt.color === 'amber'
                                ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-500'
                                : apt.color === 'rose'
                                ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-500'
                                : apt.color === 'purple'
                                ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-500'
                                : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-500'
                            }`}
                          >
                            {apt.time.substring(0, 5)} {apt.patientName.split(' ')[0]}
                          </div>
                        ))}
                        {appointmentCount > 2 && (
                          <div className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold text-center">
                            +{appointmentCount - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Date's Appointments */}
          <div className="flex-[1] bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-sm flex flex-col h-full min-w-[320px]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedDate === 5 ? "Today's" : `Oct ${selectedDate}`} Schedule
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedDateAppointments.length} appointment{selectedDateAppointments.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 font-medium">
                View All
              </button>
            </div>

            {/* Appointment List for Selected Date */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {selectedDateAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-slate-400 text-3xl">event_available</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">No Appointments</h4>
                  <p className="text-xs text-slate-500">No scheduled appointments for this date.</p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors">
                    Book Appointment
                  </button>
                </div>
              ) : (
                selectedDateAppointments.map((apt) => {
                  const isEmergency = apt.status === 'emergency';
                  const isCompleted = apt.status === 'completed';

                  return (
                    <div
                      key={apt.id}
                      onClick={() => handleAppointmentClick(apt)}
                      className={`p-4 rounded-xl border shadow-sm relative pl-6 group cursor-pointer transition-all hover:shadow-md ${
                        isEmergency
                          ? 'bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/30'
                          : isCompleted
                          ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 opacity-60'
                          : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-blue-300'
                      }`}
                    >
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl ${
                          apt.color === 'emerald'
                            ? 'bg-emerald-500'
                            : apt.color === 'amber'
                            ? 'bg-amber-500'
                            : apt.color === 'rose'
                            ? 'bg-rose-500'
                            : apt.color === 'purple'
                            ? 'bg-purple-500'
                            : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      ></div>

                      <div className="flex justify-between items-start mb-2">
                        <span
                          className={`text-xs font-bold uppercase tracking-wide ${
                            isEmergency ? 'text-rose-400' : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {apt.time}
                        </span>
                        {!isCompleted && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="p-1 text-slate-400 hover:text-blue-600"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="p-1 text-slate-400 hover:text-red-500"
                            >
                              <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {apt.patientImage ? (
                          <img
                            src={apt.patientImage}
                            alt={apt.patientName}
                            className={`h-10 w-10 rounded-full object-cover ${
                              isCompleted ? 'grayscale' : ''
                            }`}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                            <span className="material-symbols-outlined">medical_services</span>
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {apt.patientName}
                          </h4>
                          <p className="text-xs text-slate-500">{apt.type}</p>
                        </div>
                      </div>

                      {!isCompleted && !isEmergency && (
                        <div className="mt-3 flex gap-2">
                          {apt.status === 'upcoming' && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="flex-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold py-1.5 rounded hover:bg-emerald-100 transition-colors"
                              >
                                Check-in
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="flex-1 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold py-1.5 rounded hover:bg-slate-100 transition-colors"
                              >
                                Details
                              </button>
                            </>
                          )}
                          {apt.status === 'in-progress' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="flex-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs font-semibold py-1.5 rounded hover:bg-blue-100 transition-colors"
                            >
                              Start Visit
                            </button>
                          )}
                        </div>
                      )}

                      {isCompleted && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-green-500 text-[14px]">
                            check_circle
                          </span>
                          <span className="text-xs text-slate-500 italic">Completed</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Appointment Detail Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAppointmentModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Appointment Details</h3>
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {selectedAppointment.patientImage ? (
                  <img
                    src={selectedAppointment.patientImage}
                    alt={selectedAppointment.patientName}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-slate-700"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                    <span className="material-symbols-outlined text-2xl">medical_services</span>
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedAppointment.patientName}
                  </h4>
                  <p className="text-sm text-slate-500">{selectedAppointment.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Date</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Oct {selectedAppointment.date}, 2023
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Time</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {selectedAppointment.time}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Status</p>
                <span
                  className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                    selectedAppointment.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : selectedAppointment.status === 'in-progress'
                      ? 'bg-amber-100 text-amber-700'
                      : selectedAppointment.status === 'emergency'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {selectedAppointment.status.charAt(0).toUpperCase() +
                    selectedAppointment.status.slice(1).replace('-', ' ')}
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 py-2.5 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  Reschedule
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pending Request Modal */}
      {pendingRequest && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPendingRequest(null as any)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">New Appointment Request</h3>
              <button
                onClick={() => setPendingRequest(null as any)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {pendingRequest.patientImage ? (
                  <img
                    src={pendingRequest.patientImage}
                    alt={pendingRequest.patientName}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-slate-700"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                    <span className="material-symbols-outlined text-2xl">medical_services</span>
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {pendingRequest.patientName}
                  </h4>
                  <p className="text-sm text-slate-500">{pendingRequest.reason}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Date</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {pendingRequest.date}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Time</p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {pendingRequest.time}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Status</p>
                <span
                  className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700`}
                >
                  Pending
                </span>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleDecline}
                  className="flex-1 bg-red-500 text-white py-2.5 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-green-500 text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={handleReschedule}
                  className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 py-2.5 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed bottom-4 right-4 bg-${toastType === 'success' ? 'green' : 'blue'}-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all`}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}