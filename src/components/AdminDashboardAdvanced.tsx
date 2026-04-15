import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { NotificationIcon } from './NotificationIcon';
import { AdminReportModal } from './AdminReportModal';

export function AdminDashboardAdvanced({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showReportModal, setShowReportModal] = useState(false);

  // Stats Cards Data
  const stats = [
    {
      label: 'Total Revenue',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: 'payments',
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Active Patients',
      value: '8,432',
      change: '+8.2%',
      trend: 'up',
      icon: 'groups',
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Total Staff',
      value: '342',
      change: '+2.1%',
      trend: 'up',
      icon: 'badge',
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Bed Occupancy',
      value: '87%',
      change: '-3.2%',
      trend: 'down',
      icon: 'bed',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Revenue Trend Data (6 months)
  const revenueTrendData = [
    { month: 'Aug', revenue: 1.8, expenses: 1.2, profit: 0.6 },
    { month: 'Sep', revenue: 2.0, expenses: 1.3, profit: 0.7 },
    { month: 'Oct', revenue: 2.1, expenses: 1.4, profit: 0.7 },
    { month: 'Nov', revenue: 2.3, expenses: 1.5, profit: 0.8 },
    { month: 'Dec', revenue: 2.2, expenses: 1.4, profit: 0.8 },
    { month: 'Jan', revenue: 2.4, expenses: 1.5, profit: 0.9 }
  ];

  // Department Performance Data
  const departmentData = [
    { name: 'Cardiology', patients: 1240, revenue: 450000 },
    { name: 'Orthopedics', patients: 980, revenue: 380000 },
    { name: 'Pediatrics', patients: 1560, revenue: 320000 },
    { name: 'Neurology', patients: 720, revenue: 410000 },
    { name: 'General', patients: 2100, revenue: 280000 }
  ];

  // Patient Demographics
  const patientDemographics = [
    { name: '0-18', value: 1842, color: '#3b82f6' },
    { name: '19-35', value: 2341, color: '#8b5cf6' },
    { name: '36-55', value: 2653, color: '#10b981' },
    { name: '56+', value: 1596, color: '#f59e0b' }
  ];

  // Recent Activities
  const recentActivities = [
    { icon: 'person_add', text: 'New doctor registered: Dr. James Anderson', time: '10 min ago', color: 'text-blue-600' },
    { icon: 'payments', text: 'Payment processed: $15,000', time: '25 min ago', color: 'text-green-600' },
    { icon: 'emergency', text: 'Emergency case: Patient admitted to ICU', time: '1 hour ago', color: 'text-red-600' },
    { icon: 'event_available', text: '342 appointments scheduled today', time: '2 hours ago', color: 'text-purple-600' },
    { icon: 'inventory', text: 'Medical supplies restocked', time: '3 hours ago', color: 'text-orange-600' }
  ];

  // Pending Approvals
  const pendingApprovals = [
    { id: 1, type: 'Leave Request', from: 'Dr. Sarah Mitchell', priority: 'Medium' },
    { id: 2, type: 'Budget Approval', from: 'Finance Dept', priority: 'High' },
    { id: 3, type: 'Equipment Purchase', from: 'Cardiology', priority: 'High' },
    { id: 4, type: 'Staff Hiring', from: 'HR Department', priority: 'Low' }
  ];

  const reportData = {
    totalRevenue: stats[0]?.value || '$2.4M',
    revenueGrowth: stats[0]?.change || '+12.5%',
    demographics: patientDemographics,
    majorityAgeGroup: '36-55',
    revenueTrend: revenueTrendData,
    appointments: {
      total: 3420,
      completed: 2870,
      pending: 550
    },
    insights: [
      'Peak appointments during weekends',
      'High demand for general physicians',
      'Cardiology and Neurology show strongest revenue contribution'
    ]
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-black">
      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0077b6] rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">dashboard</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Hospital overview and analytics</p>
            </div>
          </div>
          
          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            <NotificationIcon 
              showDot={true}
              onClick={() => window.dispatchEvent(new CustomEvent('openNotificationCenter'))}
            />
          </div>
        </div>
      </header>

      <div className="p-4 md:p-8 space-y-6 pb-20">
        {/* Period Selector & Generate Report - Below Header */}
        <div className="flex items-center justify-end gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0077b6] hover:bg-blue-600 text-white rounded-lg shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span className="text-sm font-medium">Generate Report</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-white text-2xl">{stat.icon}</span>
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  stat.trend === 'up'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Revenue Trend (6 Months)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue (M)" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses (M)" />
                <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="Profit (M)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Patient Demographics */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Patient Demographics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={patientDemographics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {patientDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Department Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Bar dataKey="patients" fill="#3b82f6" name="Patients" />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className={`material-symbols-outlined ${activity.color} text-[20px]`}>{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.text}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pending Approvals</h2>
              <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full">
                {pendingApprovals.length}
              </span>
            </div>
            <div className="space-y-3">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{approval.type}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      approval.priority === 'High'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        : approval.priority === 'Medium'
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    }`}>
                      {approval.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">From: {approval.from}</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onNavigate?.('approvals')}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all"
                    >
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onNavigate?.('approvals')}
              className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all"
            >
              View All Approvals
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => onNavigate?.('staff')}
              className="p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white">person_add</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Add Staff</h3>
            </button>
            <button 
              onClick={() => alert('🏥 Inventory Management\n\nOpening inventory system...\n\n✅ Medical Supplies: 1,240 items\n✅ Equipment: 342 units\n⚠️ Low Stock: 12 items\n\n(This feature would navigate to inventory management system)')}
              className="p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white">inventory</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Inventory</h3>
            </button>
            <button 
              onClick={() => onNavigate?.('earnings')}
              className="p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white">payments</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Payments</h3>
            </button>
            <button 
              onClick={() => alert('📊 Hospital Reports\n\nGenerating comprehensive reports...\n\n✅ Monthly Revenue Report\n✅ Patient Statistics\n✅ Staff Performance\n✅ Department Analysis\n\n(This feature would navigate to reports dashboard)')}
              className="p-4 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-xl transition-all text-left group"
            >
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white">summarize</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Reports</h3>
            </button>
          </div>
        </div>
      </div>

      <AdminReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        reportData={reportData}
      />
    </div>
  );
}