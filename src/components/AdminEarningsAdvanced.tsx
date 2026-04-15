import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function AdminEarningsAdvanced({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Stats Cards
  const stats = [
    { label: 'Total Revenue', value: '$2,450,000', change: '+15.3%', icon: 'payments', color: 'from-green-500 to-green-600' },
    { label: 'Total Expenses', value: '$1,680,000', change: '+8.1%', icon: 'money_off', color: 'from-red-500 to-red-600' },
    { label: 'Net Profit', value: '$770,000', change: '+24.5%', icon: 'trending_up', color: 'from-blue-500 to-blue-600' },
    { label: 'Outstanding', value: '$125,000', change: '-5.2%', icon: 'pending', color: 'from-orange-500 to-orange-600' }
  ];

  // Monthly Revenue Data
  const monthlyRevenue = [
    { month: 'Jul', inpatient: 320, outpatient: 180, emergency: 95, total: 595 },
    { month: 'Aug', inpatient: 340, outpatient: 195, emergency: 102, total: 637 },
    { month: 'Sep', inpatient: 365, outpatient: 210, emergency: 110, total: 685 },
    { month: 'Oct', inpatient: 380, outpatient: 225, emergency: 115, total: 720 },
    { month: 'Nov', inpatient: 395, outpatient: 240, emergency: 120, total: 755 },
    { month: 'Dec', inpatient: 410, outpatient: 250, emergency: 125, total: 785 }
  ];

  // Revenue by Department
  const departmentRevenue = [
    { name: 'Cardiology', value: 450000, color: '#ef4444' },
    { name: 'Orthopedics', value: 380000, color: '#3b82f6' },
    { name: 'Neurology', value: 410000, color: '#8b5cf6' },
    { name: 'Pediatrics', value: 320000, color: '#10b981' },
    { name: 'General', value: 280000, color: '#f59e0b' },
    { name: 'Emergency', value: 360000, color: '#06b6d4' }
  ];

  // Expenses Breakdown
  const expensesData = [
    { category: 'Salaries', amount: 850000, percentage: 50 },
    { category: 'Equipment', amount: 340000, percentage: 20 },
    { category: 'Supplies', amount: 255000, percentage: 15 },
    { category: 'Utilities', amount: 170000, percentage: 10 },
    { category: 'Other', amount: 85000, percentage: 5 }
  ];

  // Recent Transactions
  const transactions = [
    { id: 'TXN-2026-001', type: 'Payment Received', from: 'Insurance - BlueCross', amount: 45000, date: 'Jan 17, 2026', status: 'Completed' },
    { id: 'TXN-2026-002', type: 'Equipment Purchase', from: 'MedTech Supplies', amount: -25000, date: 'Jan 16, 2026', status: 'Completed' },
    { id: 'TXN-2026-003', type: 'Payment Received', from: 'Patient - Self Pay', amount: 3500, date: 'Jan 16, 2026', status: 'Completed' },
    { id: 'TXN-2026-004', type: 'Salary Payment', from: 'Staff Payroll', amount: -125000, date: 'Jan 15, 2026', status: 'Completed' },
    { id: 'TXN-2026-005', type: 'Payment Received', from: 'Medicare', amount: 32000, date: 'Jan 15, 2026', status: 'Completed' },
    { id: 'TXN-2026-006', type: 'Utility Bill', from: 'Con Edison', amount: -8500, date: 'Jan 14, 2026', status: 'Pending' },
    { id: 'TXN-2026-007', type: 'Payment Received', from: 'Insurance - Aetna', amount: 28000, date: 'Jan 14, 2026', status: 'Completed' },
    { id: 'TXN-2026-008', type: 'Medical Supplies', from: 'HealthCare Supplies Co.', amount: -15000, date: 'Jan 13, 2026', status: 'Completed' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-black">
      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0077b6] rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">account_balance</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Hospital Earnings & Finance</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Complete financial overview and analysis</p>
            </div>
          </div>
          
          {/* Notification Icon */}
          <button 
            onClick={() => onNavigate?.('notifications')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all relative"
          >
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-300 text-[22px]">
              notifications
            </span>
          </button>
        </div>
      </header>

      <div className="p-4 md:p-8 space-y-6 pb-20">
        {/* Period Selector & Export Report - Below Header */}
        <div className="flex items-center justify-end gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0077b6] hover:bg-blue-600 text-white rounded-lg shadow-sm transition-all">
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span className="text-sm font-medium">Export Report</span>
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
                  stat.change.startsWith('+')
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

        {/* Revenue Trend Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Revenue Trend by Category (6 Months)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyRevenue}>
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
              <Line type="monotone" dataKey="inpatient" stroke="#3b82f6" strokeWidth={3} name="Inpatient ($K)" />
              <Line type="monotone" dataKey="outpatient" stroke="#10b981" strokeWidth={3} name="Outpatient ($K)" />
              <Line type="monotone" dataKey="emergency" stroke="#ef4444" strokeWidth={3} name="Emergency ($K)" />
              <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={3} name="Total ($K)" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Revenue & Expenses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Department */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Revenue by Department</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentRevenue}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentRevenue.map((entry, index) => (
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
                  formatter={(value: any) => `$${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Expenses Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Expenses Breakdown</h2>
            <div className="space-y-4">
              {expensesData.map((expense, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{expense.category}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">${expense.amount.toLocaleString()}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">({expense.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                      style={{ width: `${expense.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h2>
            <button className="text-green-600 dark:text-green-400 hover:underline font-semibold text-sm">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">From/To</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Amount</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all">
                    <td className="py-4 px-4 text-sm font-medium text-slate-900 dark:text-white">{txn.id}</td>
                    <td className="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">{txn.type}</td>
                    <td className="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">{txn.from}</td>
                    <td className="py-4 px-4 text-sm text-slate-600 dark:text-slate-400">{txn.date}</td>
                    <td className={`py-4 px-4 text-sm font-bold text-right ${
                      txn.amount > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        txn.status === 'Completed'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2 opacity-90">Cash Flow</h3>
            <p className="text-3xl font-bold mb-1">+$245,000</p>
            <p className="text-sm opacity-90">This Month</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2 opacity-90">Profit Margin</h3>
            <p className="text-3xl font-bold mb-1">31.4%</p>
            <p className="text-sm opacity-90">Up from last month</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2 opacity-90">Revenue per Patient</h3>
            <p className="text-3xl font-bold mb-1">$290</p>
            <p className="text-sm opacity-90">Average this month</p>
          </div>
        </div>
      </div>
    </div>
  );
}