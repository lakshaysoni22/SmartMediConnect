import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: string;
  date: string;
  patient: string;
  service: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Processing';
  paymentMethod: string;
}

export function DoctorEarningsAdvanced() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedMonth, setSelectedMonth] = useState('January 2026');

  // Monthly revenue data
  const monthlyData = [
    { month: 'Jul', revenue: 42000, consultations: 85, expenses: 8000 },
    { month: 'Aug', revenue: 45000, consultations: 92, expenses: 8500 },
    { month: 'Sep', revenue: 48000, consultations: 98, expenses: 9000 },
    { month: 'Oct', revenue: 52000, consultations: 105, expenses: 9200 },
    { month: 'Nov', revenue: 49000, consultations: 95, expenses: 8800 },
    { month: 'Dec', revenue: 55000, consultations: 112, expenses: 10000 },
    { month: 'Jan', revenue: 58000, consultations: 118, expenses: 10500 },
  ];

  // Weekly data for current month
  const weeklyData = [
    { week: 'Week 1', revenue: 12000, patients: 28 },
    { week: 'Week 2', revenue: 15000, patients: 32 },
    { week: 'Week 3', revenue: 14500, patients: 30 },
    { week: 'Week 4', revenue: 16500, patients: 35 },
  ];

  // Service breakdown
  const serviceData = [
    { name: 'General Consultation', value: 35, amount: 20300, color: '#3b82f6' },
    { name: 'Follow-up', value: 25, amount: 14500, color: '#10b981' },
    { name: 'Procedure', value: 20, amount: 11600, color: '#f59e0b' },
    { name: 'Emergency', value: 15, amount: 8700, color: '#ef4444' },
    { name: 'Telemedicine', value: 5, amount: 2900, color: '#8b5cf6' },
  ];

  // Recent transactions
  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN-2026-001',
      date: 'Jan 16, 2026',
      patient: 'Sarah Jenkins',
      service: 'Cardiac Consultation',
      amount: 250,
      status: 'Paid',
      paymentMethod: 'Insurance'
    },
    {
      id: 'TXN-2026-002',
      date: 'Jan 16, 2026',
      patient: 'Marcus Wright',
      service: 'Hypertension Follow-up',
      amount: 150,
      status: 'Paid',
      paymentMethod: 'Cash'
    },
    {
      id: 'TXN-2026-003',
      date: 'Jan 15, 2026',
      patient: 'Emily Chen',
      service: 'Post-op Checkup',
      amount: 200,
      status: 'Processing',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'TXN-2026-004',
      date: 'Jan 15, 2026',
      patient: 'David Miller',
      service: 'Diabetes Management',
      amount: 180,
      status: 'Paid',
      paymentMethod: 'Insurance'
    },
    {
      id: 'TXN-2026-005',
      date: 'Jan 14, 2026',
      patient: 'Jennifer Lopez',
      service: 'Migraine Consultation',
      amount: 220,
      status: 'Pending',
      paymentMethod: 'Insurance'
    },
    {
      id: 'TXN-2026-006',
      date: 'Jan 14, 2026',
      patient: 'Robert Johnson',
      service: 'COPD Follow-up',
      amount: 170,
      status: 'Paid',
      paymentMethod: 'Medicare'
    },
    {
      id: 'TXN-2026-007',
      date: 'Jan 13, 2026',
      patient: 'Lisa Anderson',
      service: 'Physical Exam',
      amount: 300,
      status: 'Paid',
      paymentMethod: 'Cash'
    },
    {
      id: 'TXN-2026-008',
      date: 'Jan 13, 2026',
      patient: 'Michael Chen',
      service: 'Telemedicine',
      amount: 120,
      status: 'Paid',
      paymentMethod: 'Credit Card'
    },
  ]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalRevenue = 58000;
    const pendingAmount = transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0);
    const consultationsCount = 118;
    const avgPerConsultation = Math.round(totalRevenue / consultationsCount);

    return {
      totalRevenue,
      pendingAmount,
      consultationsCount,
      avgPerConsultation,
      growth: '+12.5%'
    };
  }, [transactions]);

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Pending':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Processing':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950 overflow-y-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-4xl">
                payments
              </span>
              Earnings & Revenue
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Track your income and financial performance
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">download</span>
              Export Report
            </button>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>January 2026</option>
              <option>December 2025</option>
              <option>November 2025</option>
              <option>October 2025</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 space-y-6 pb-20">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
              </div>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-semibold">
                {stats.growth}
              </span>
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm opacity-75 mt-2">This month</p>
          </div>

          {/* Pending Amount */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-2xl">schedule</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Pending Amount</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">${stats.pendingAmount.toLocaleString()}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Awaiting payment</p>
          </div>

          {/* Total Consultations */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">medical_services</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Consultations</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.consultationsCount}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">This month</p>
          </div>

          {/* Average per Consultation */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-2xl">attach_money</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Avg per Consultation</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">${stats.avgPerConsultation}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Average earning</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Revenue Trend</h3>
              <div className="flex gap-2">
                {(['week', 'month', 'year'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                      timeRange === range
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                <XAxis dataKey="month" stroke="#94a3b8" className="dark:stroke-slate-500" />
                <YAxis stroke="#94a3b8" className="dark:stroke-slate-500" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue ($)" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Service Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Revenue by Service</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {serviceData.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">${service.amount.toLocaleString()}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{service.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Performance */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Weekly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
              <XAxis dataKey="week" stroke="#94a3b8" className="dark:stroke-slate-500" />
              <YAxis stroke="#94a3b8" className="dark:stroke-slate-500" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="patients" fill="#10b981" name="Patients" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
            <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Patient</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Payment</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-blue-600 dark:text-blue-400">{txn.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{txn.date}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{txn.patient}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{txn.service}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">${txn.amount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{txn.paymentMethod}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(txn.status)}`}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all text-left">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-white text-2xl">receipt_long</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Generate Invoice</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Create and send invoices to patients</p>
          </button>

          <button className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all text-left">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-white text-2xl">analytics</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Financial Report</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Download detailed financial reports</p>
          </button>

          <button className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-6 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all text-left">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-white text-2xl">settings</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Payment Settings</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Manage payment methods and preferences</p>
          </button>
        </div>
      </div>
    </div>
  );
}