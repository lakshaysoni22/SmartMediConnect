import React from 'react';
import { useLanguage } from '../utils/language';

export function AdminOverview() {
  const { t } = useLanguage();

  const statsCards = [
    {
      label: 'Total Staff',
      value: '248',
      change: '+12',
      trend: 'up',
      icon: 'badge',
      color: 'blue'
    },
    {
      label: 'Active Patients',
      value: '5,432',
      change: '+8.5%',
      trend: 'up',
      icon: 'groups',
      color: 'green'
    },
    {
      label: 'Revenue (MTD)',
      value: '$284.5K',
      change: '+15.2%',
      trend: 'up',
      icon: 'payments',
      color: 'purple'
    },
    {
      label: 'Bed Occupancy',
      value: '85%',
      change: '+2%',
      trend: 'up',
      icon: 'local_hotel',
      color: 'orange'
    }
  ];

  const departmentStats = [
    { name: 'Emergency', patients: 45, capacity: 50, percentage: 90, color: 'red' },
    { name: 'ICU', patients: 18, capacity: 20, percentage: 90, color: 'orange' },
    { name: 'General Ward', patients: 120, capacity: 150, percentage: 80, color: 'blue' },
    { name: 'Pediatrics', patients: 32, capacity: 40, percentage: 80, color: 'green' },
    { name: 'Surgery', patients: 15, capacity: 25, percentage: 60, color: 'purple' }
  ];

  const pendingApprovals = [
    { type: 'Staff Leave', count: 8, icon: 'event_busy', color: 'blue' },
    { type: 'Purchase Orders', count: 5, icon: 'shopping_cart', color: 'green' },
    { type: 'Budget Requests', count: 3, icon: 'account_balance', color: 'purple' },
    { type: 'Equipment Maintenance', count: 12, icon: 'build', color: 'orange' }
  ];

  const recentAlerts = [
    { message: 'Low inventory: Surgical masks', severity: 'high', time: '5 mins ago' },
    { message: 'Equipment maintenance due: MRI Machine', severity: 'medium', time: '1 hour ago' },
    { message: 'Staff certification expiring: Dr. Smith', severity: 'medium', time: '2 hours ago' },
    { message: 'Monthly report ready for review', severity: 'low', time: '3 hours ago' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-700 dark:to-purple-800 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Hospital Dashboard Overview 🏥
        </h1>
        <p className="text-indigo-100 dark:text-indigo-200">
          Real-time insights and system health monitoring
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Occupancy */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                domain
              </span>
              Department Occupancy
            </h2>
          </div>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {dept.name}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {dept.patients}/{dept.capacity}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      dept.percentage >= 90
                        ? 'bg-red-500'
                        : dept.percentage >= 80
                        ? 'bg-orange-500'
                        : dept.percentage >= 60
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">
                pending_actions
              </span>
              Pending Approvals
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((approval, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColorClasses(approval.color)}`}>
                    <span className="material-symbols-outlined text-[20px]">
                      {approval.icon}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {approval.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-bold">
                    {approval.count}
                  </span>
                  <span className="material-symbols-outlined text-slate-400 dark:text-slate-600">
                    chevron_right
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400">
              notifications_active
            </span>
            Recent Alerts
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentAlerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-l-4 ${
                alert.severity === 'high'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                  : alert.severity === 'medium'
                  ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {alert.message}
                </p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  alert.severity === 'high'
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    : alert.severity === 'medium'
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                }`}>
                  {alert.severity}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500">
                {alert.time}
              </p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Add Staff', icon: 'person_add', color: 'blue' },
            { label: 'Generate Report', icon: 'analytics', color: 'green' },
            { label: 'Manage Inventory', icon: 'inventory_2', color: 'orange' },
            { label: 'Send Alert', icon: 'campaign', color: 'red' },
            { label: 'Schedule Event', icon: 'event', color: 'purple' },
            { label: 'System Settings', icon: 'settings', color: 'blue' }
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(action.color)}`}>
                <span className="material-symbols-outlined text-2xl">
                  {action.icon}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-900 dark:text-white text-center">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
