import React from 'react';
import { useLanguage } from '../utils/language';
import { DoctorAppointmentCalendar } from './DoctorAppointmentCalendar';

export function DoctorOverview() {
  const { t } = useLanguage();

  const statsCards = [
    {
      label: 'Total Patients',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: 'groups',
      color: 'blue'
    },
    {
      label: "Today's Appointments",
      value: '28',
      change: '+5',
      trend: 'up',
      icon: 'calendar_today',
      color: 'green'
    },
    {
      label: 'Pending Reviews',
      value: '15',
      change: '-3',
      trend: 'down',
      icon: 'pending_actions',
      color: 'orange'
    },
    {
      label: 'Revenue (MTD)',
      value: '$45.2K',
      change: '+18%',
      trend: 'up',
      icon: 'payments',
      color: 'purple'
    }
  ];

  const recentActivities = [
    { action: 'Completed appointment', patient: 'Alice Cooper', time: '15 mins ago', icon: 'check_circle' },
    { action: 'Prescribed medication', patient: 'Bob Martin', time: '1 hour ago', icon: 'medication' },
    { action: 'Updated patient record', patient: 'Carol White', time: '2 hours ago', icon: 'edit_note' },
    { action: 'Lab results reviewed', patient: 'Dan Green', time: '3 hours ago', icon: 'lab_profile' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  // Calendar appointment handlers
  const handleAcceptAppointment = (appointmentId: string) => {
    // Add acceptance logic here
  };

  const handleDeclineAppointment = (appointmentId: string) => {
    // Add decline logic here
  };

  const handleRescheduleAppointment = (appointmentId: string) => {
    // Add reschedule logic here
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, Dr. {t('Medicare')}! 👋
        </h1>
        <p className="text-blue-100 dark:text-blue-200">
          You have 28 appointments scheduled for today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(stat.color)}`}>
                <span className="material-symbols-outlined text-2xl">
                  {stat.icon}
                </span>
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend === 'up' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              }`}>
                <span className="material-symbols-outlined text-[14px]">
                  {stat.trend === 'up' ? 'trending_up' : 'trending_down'}
                </span>
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar - Takes 2/3 width */}
        <div className="lg:col-span-2">
          <DoctorAppointmentCalendar
            onAccept={handleAcceptAppointment}
            onDecline={handleDeclineAppointment}
            onReschedule={handleRescheduleAppointment}
          />
        </div>

        {/* Recent Activities - Takes 1/3 width */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600 dark:text-green-400">
                  history
                </span>
                Recent Activities
              </h2>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]">
                      {activity.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {activity.action}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {activity.patient}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">
                bolt
              </span>
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'New Prescription', icon: 'prescription', color: 'blue' },
                { label: 'Schedule Appointment', icon: 'calendar_add_on', color: 'green' },
                { label: 'Update Records', icon: 'edit_note', color: 'orange' },
                { label: 'Send Message', icon: 'send', color: 'purple' }
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-left"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getColorClasses(action.color)}`}>
                    <span className="material-symbols-outlined text-[20px]">
                      {action.icon}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}