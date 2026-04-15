import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';

export function AdminPayments() {
  const [activeTab, setActiveTab] = useState<'all' | 'salaries' | 'vendors' | 'utilities' | 'emergency'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  // Payment form state
  const [paymentType, setPaymentType] = useState('salary');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [originatingBank, setOriginatingBank] = useState('operating');
  const [targetBank, setTargetBank] = useState('');
  const [description, setDescription] = useState('');
  const [urgentProcessing, setUrgentProcessing] = useState(false);
  const [payeeSearch, setPayeeSearch] = useState('');

  const transactions = [
    {
      id: 'SAL-00245',
      payee: 'Dr. Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
      category: 'Salary',
      categoryColor: 'indigo',
      date: 'Oct 24, 2023',
      amount: '$12,500.00',
      status: 'completed',
      type: 'doctor'
    },
    {
      id: 'INV-88921',
      payee: 'MedTech Supplies Inc.',
      icon: 'biotech',
      iconBg: 'blue',
      category: 'Vendor',
      categoryColor: 'blue',
      date: 'Oct 23, 2023',
      amount: '$4,230.50',
      status: 'pending',
      type: 'vendor'
    },
    {
      id: 'UTL-2023-10',
      payee: 'City Power & Light',
      icon: 'bolt',
      iconBg: 'yellow',
      category: 'Utility',
      categoryColor: 'purple',
      date: 'Oct 22, 2023',
      amount: '$1,200.00',
      status: 'scheduled',
      type: 'utility'
    },
    {
      id: 'SAL-00249',
      payee: 'Dr. Mark Alistair',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
      category: 'Salary',
      categoryColor: 'indigo',
      date: 'Oct 20, 2023',
      amount: '$14,200.00',
      status: 'failed',
      type: 'doctor'
    },
    {
      id: 'INV-88920',
      payee: 'Apex Pharma Co.',
      icon: 'medication',
      iconBg: 'green',
      category: 'Vendor',
      categoryColor: 'blue',
      date: 'Oct 19, 2023',
      amount: '$8,450.00',
      status: 'completed',
      type: 'vendor'
    }
  ];

  const quickPayButtons = [
    { name: 'MedTech', icon: 'biotech', color: 'blue', subtitle: 'Vendor • Monthly' },
    { name: 'City Power', icon: 'bolt', color: 'yellow', subtitle: 'Utility • Due in 2d' },
    { name: 'BioLab', icon: 'science', color: 'purple', subtitle: 'Services • Recurring' },
    { name: 'Apex Pharma', icon: 'medication', color: 'green', subtitle: 'Vendor • Supplies' }
  ];

  const getStatusBadge = (status: string) => {
    const styles: { [key: string]: { bg: string; text: string; ring: string } } = {
      completed: { bg: 'bg-green-50 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', ring: 'ring-green-600/20' },
      pending: { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', ring: 'ring-amber-600/20' },
      scheduled: { bg: 'bg-blue-50 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', ring: 'ring-blue-600/20' },
      failed: { bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', ring: 'ring-red-600/20' }
    };

    const style = styles[status] || styles.completed;
    const labels: { [key: string]: string } = {
      completed: 'Completed',
      pending: 'Pending Approval',
      scheduled: 'Scheduled',
      failed: 'Failed'
    };

    return (
      <span className={`inline-flex items-center rounded-full ${style.bg} px-2.5 py-0.5 text-xs font-medium ${style.text} ring-1 ring-inset ${style.ring}`}>
        {labels[status]}
      </span>
    );
  };

  const getCategoryBadge = (category: string, color: string) => {
    const colorStyles: { [key: string]: { bg: string; text: string; ring: string } } = {
      indigo: { bg: 'bg-indigo-50 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300', ring: 'ring-indigo-700/10' },
      blue: { bg: 'bg-blue-50 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', ring: 'ring-blue-700/10' },
      purple: { bg: 'bg-purple-50 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', ring: 'ring-purple-700/10' },
      green: { bg: 'bg-green-50 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', ring: 'ring-green-700/10' }
    };

    const style = colorStyles[color] || colorStyles.blue;

    return (
      <span className={`inline-flex items-center rounded-full ${style.bg} px-2.5 py-0.5 text-xs font-medium ${style.text} ring-1 ring-inset ${style.ring}`}>
        {category}
      </span>
    );
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'salaries' && t.type === 'doctor') ||
      (activeTab === 'vendors' && t.type === 'vendor') ||
      (activeTab === 'utilities' && t.type === 'utility');
    
    const matchesSearch = searchQuery === '' || 
      t.payee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;

    return matchesTab && matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-3 dark:bg-slate-800/80 dark:border-slate-700">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0EA5E9] rounded-lg flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-[24px]">payments</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Management</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Manage outgoing hospital payments and vendor invoices</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationIcon 
              showDot={true}
              onClick={() => window.dispatchEvent(new CustomEvent('openNotificationCenter'))}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 lg:p-5 max-w-[1400px] mx-auto flex flex-col gap-2">
        {/* Page Heading & Actions */}
        <div className="flex flex-col md:flex-row justify-end items-start md:items-end gap-3 mb-1">
          {/* Title section removed */}
          <div className="flex gap-3 ml-auto">
            {/* Export Report Button - Icon only, expands on hover */}
            <button className="group/export flex items-center justify-center h-10 px-2 hover:px-4 bg-[#136dec] hover:bg-blue-600 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 gap-0 hover:gap-2 overflow-hidden">
              <span className="material-symbols-outlined text-[20px]">download</span>
              <span className="max-w-0 group-hover/export:max-w-[100px] overflow-hidden transition-all duration-300 whitespace-nowrap">Export Report</span>
            </button>
            {/* Payment Button - Normal, always visible */}
            <button 
              onClick={() => setShowPaymentForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#137fec] hover:bg-blue-600 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/30 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Payment
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Total Expenses (Oct)</p>
              <span className="material-symbols-outlined text-[#137fec]">payments</span>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">$482,500</p>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 w-fit px-2 py-0.5 rounded-full text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              5.2% vs last month
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Pending Approvals</p>
              <span className="material-symbols-outlined text-amber-500 dark:text-amber-400">pending_actions</span>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">12</p>
            <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 w-fit px-2 py-0.5 rounded-full text-xs font-bold">
              Action Required
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Next Scheduled Payout</p>
              <span className="material-symbols-outlined text-blue-500 dark:text-blue-400">calendar_month</span>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Oct 31</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Doctor Salaries Batch A</p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Cash Flow Status</p>
              <span className="material-symbols-outlined text-green-600 dark:text-green-400">health_metrics</span>
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Healthy</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Reserves at 115% target</p>
          </div>
        </div>

        {/* Quick Pay Shortcuts */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Pay Shortcuts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickPayButtons.map((btn, idx) => (
              <button
                key={idx}
                onClick={() => setShowPaymentForm(true)}
                className="flex gap-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-4 items-center hover:shadow-md hover:border-[#137fec] transition-all group text-left"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
                  btn.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  btn.color === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
                  btn.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                  'bg-green-50 text-green-600'
                }`}>
                  <span className="material-symbols-outlined">{btn.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#137fec] transition-colors">Pay {btn.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{btn.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            {/* Tabs */}
            <div className="flex overflow-x-auto gap-2 mb-4 pb-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#137fec]/10 text-[#137fec] border border-[#137fec]/20'
                    : 'bg-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Transactions
              </button>
              <button
                onClick={() => setActiveTab('salaries')}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'salaries'
                    ? 'bg-[#137fec]/10 text-[#137fec] border border-[#137fec]/20'
                    : 'bg-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                Doctor Salaries
              </button>
              <button
                onClick={() => setActiveTab('vendors')}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'vendors'
                    ? 'bg-[#137fec]/10 text-[#137fec] border border-[#137fec]/20'
                    : 'bg-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                Vendor Invoices
              </button>
              <button
                onClick={() => setActiveTab('utilities')}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'utilities'
                    ? 'bg-[#137fec]/10 text-[#137fec] border border-[#137fec]/20'
                    : 'bg-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                Utilities
              </button>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search payee, ID..."
                  className="w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] text-sm"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] text-sm"
                >
                  <option value="all">Status: All</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="failed">Failed</option>
                </select>
                <button className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Payee Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          {transaction.avatar ? (
                            <div
                              className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-slate-200"
                              style={{ backgroundImage: `url(${transaction.avatar})` }}
                            ></div>
                          ) : (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              transaction.iconBg === 'blue' ? 'bg-blue-50 text-blue-600' :
                              transaction.iconBg === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
                              transaction.iconBg === 'purple' ? 'bg-purple-50 text-purple-600' :
                              'bg-green-50 text-green-600'
                            }`}>
                              <span className="material-symbols-outlined text-[20px]">{transaction.icon}</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#137fec] transition-colors">
                            {transaction.payee}
                          </div>
                          <div className="text-xs text-slate-500">ID: {transaction.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getCategoryBadge(transaction.category, transaction.categoryColor)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-slate-900 dark:text-white">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStatusBadge(transaction.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-slate-400 hover:text-[#137fec] transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Showing <span className="font-semibold text-slate-900 dark:text-white">1</span> to{' '}
                <span className="font-semibold text-slate-900 dark:text-white">{filteredTransactions.length}</span> of{' '}
                <span className="font-semibold text-slate-900 dark:text-white">97</span> results
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button className="px-4 py-2 bg-[#137fec] text-white rounded-lg font-semibold text-sm">1</button>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold text-sm">2</button>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold text-sm">3</button>
              <span className="px-4 py-2 text-slate-400">...</span>
              <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Initiation Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-start justify-center p-4" onClick={() => setShowPaymentForm(false)}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-5xl my-8" onClick={(e) => e.stopPropagation()}>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5">
                <div className="bg-[#137fec] h-1.5 w-1/3 rounded-r-full"></div>
              </div>

              {/* Form Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Initiate Outgoing Payment</h1>
                  <p className="mt-1 text-slate-500 dark:text-slate-400">Process salaries, vendor invoices, and operational expenses securely.</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
                    <span className="material-symbols-outlined text-[18px]">help</span>
                    Help Guide
                  </button>
                  <button 
                    onClick={() => setShowPaymentForm(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <form className="p-6 md:p-8 flex flex-col gap-10 max-h-[calc(100vh-300px)] overflow-y-auto">
                {/* Payment Classification */}
                <section>
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-2">
                    <div className="flex items-center justify-center size-8 rounded-full bg-blue-50 text-[#137fec] dark:bg-blue-900/30">
                      <span className="material-symbols-outlined text-sm">category</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payment Classification</h3>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Transaction Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {[
                        { value: 'salary', icon: 'stethoscope', label: 'Doctor Salary' },
                        { value: 'vendor', icon: 'inventory_2', label: 'Vendor Invoice' },
                        { value: 'utility', icon: 'electric_bolt', label: 'Utility' },
                        { value: 'refund', icon: 'currency_exchange', label: 'Patient Refund' },
                        { value: 'other', icon: 'pending', label: 'Other' }
                      ].map((type) => (
                        <label key={type.value} className="cursor-pointer group">
                          <input 
                            type="radio" 
                            name="payment_type" 
                            value={type.value}
                            checked={paymentType === type.value}
                            onChange={(e) => setPaymentType(e.target.value)}
                            className="peer sr-only" 
                          />
                          <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:border-[#137fec]/50 transition-all peer-checked:border-[#137fec] peer-checked:bg-[#137fec]/5 peer-checked:ring-1 peer-checked:ring-[#137fec]">
                            <span className="material-symbols-outlined text-slate-400 peer-checked:text-[#137fec] group-hover:text-[#137fec] transition-colors">{type.icon}</span>
                            <span className="text-sm font-medium text-slate-600 peer-checked:text-[#137fec] dark:text-slate-300">{type.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Beneficiary Details */}
                <section>
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-2">
                    <div className="flex items-center justify-center size-8 rounded-full bg-blue-50 text-[#137fec] dark:bg-blue-900/30">
                      <span className="material-symbols-outlined text-sm">person_search</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Beneficiary Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Payee Search</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                          <span className="material-symbols-outlined">search</span>
                        </div>
                        <input 
                          className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 py-3 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm" 
                          placeholder="Search by name, ID number, or department..."
                          type="text"
                          value={payeeSearch}
                          onChange={(e) => setPayeeSearch(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <button className="text-[#137fec] text-xs font-semibold hover:text-blue-700" type="button">ADVANCED SEARCH</button>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Recently selected: <span className="cursor-pointer hover:text-[#137fec] hover:underline">Dr. Sarah Jenning</span>, <span className="cursor-pointer hover:text-[#137fec] hover:underline">Apex Medical Supplies</span></p>
                    </div>
                  </div>
                </section>

                {/* Financial Details */}
                <section>
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-2">
                    <div className="flex items-center justify-center size-8 rounded-full bg-blue-50 text-[#137fec] dark:bg-blue-900/30">
                      <span className="material-symbols-outlined text-sm">payments</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Financial Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-7">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Payment Amount</label>
                      <div className="flex rounded-lg shadow-sm">
                        <div className="relative">
                          <select 
                            className="h-full rounded-l-lg border-slate-300 border-r-0 bg-slate-50 py-3 pl-3 pr-8 text-slate-500 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm dark:bg-slate-900 dark:border-slate-600"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                          >
                            <option>USD</option>
                            <option>EUR</option>
                            <option>GBP</option>
                          </select>
                        </div>
                        <div className="relative flex-grow focus-within:z-10">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-slate-500 sm:text-sm">$</span>
                          </div>
                          <input 
                            className="block w-full rounded-none rounded-r-lg border-slate-300 bg-white py-3 pl-7 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-lg font-semibold dark:bg-slate-900 dark:border-slate-600 dark:text-white" 
                            placeholder="0.00" 
                            step="0.01" 
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Due Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                          <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                        </div>
                        <input 
                          className="block w-full rounded-lg border-slate-300 bg-white py-3 pl-10 pr-3 text-slate-900 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white" 
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-12 pt-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Payment Method</label>
                      <div className="flex flex-wrap gap-4">
                        {[
                          { value: 'bank_transfer', icon: 'account_balance', label: 'Bank Transfer', subtitle: 'Processing: 1-3 Business Days' },
                          { value: 'cheque', icon: 'payments', label: 'Cheque', subtitle: 'Printed & Mailed' }
                        ].map((method) => (
                          <label key={method.value} className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none dark:bg-slate-800 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex-1">
                            <input 
                              type="radio" 
                              name="payment_method" 
                              value={method.value}
                              checked={paymentMethod === method.value}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="peer sr-only" 
                            />
                            <span className="flex flex-1">
                              <span className="flex flex-col">
                                <span className="block text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                                  <span className="material-symbols-outlined text-slate-500 peer-checked:text-[#137fec]">{method.icon}</span>
                                  {method.label}
                                </span>
                                <span className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">{method.subtitle}</span>
                              </span>
                            </span>
                            <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-[#137fec]"></span>
                            <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 rounded-full border border-slate-300 bg-white ring-1 ring-slate-300 peer-checked:border-[#137fec] peer-checked:bg-[#137fec] peer-checked:ring-0"></span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-12 pt-4 border-t border-slate-100 dark:border-slate-700 mt-2">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Originating Bank Account <span className="text-red-500" title="Required for Bank Transfer">*</span>
                        </label>
                        <span className="text-xs font-medium text-[#137fec] cursor-pointer hover:underline">View Balance Details</span>
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-hover:text-[#137fec] transition-colors">
                          <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                        </div>
                        <select 
                          className="block w-full rounded-lg border-slate-300 bg-white py-3 pl-10 pr-10 text-slate-900 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm appearance-none dark:bg-slate-900 dark:border-slate-600 dark:text-white shadow-sm transition-all hover:border-slate-400 cursor-pointer"
                          value={originatingBank}
                          onChange={(e) => setOriginatingBank(e.target.value)}
                        >
                          <option value="">Select hospital bank account...</option>
                          <option value="operating">St. Mary's General - Operating Fund (****8842)</option>
                          <option value="payroll">St. Mary's General - Payroll Account (****9931)</option>
                          <option value="capital">St. Mary's General - Capital Expenditure (****2219)</option>
                          <option value="research">St. Mary's General - Research Grants (****4550)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-[14px] text-green-600">check_circle</span>
                        <span>Account verified. Sufficient funds available for this transaction.</span>
                      </div>
                    </div>

                    <div className="md:col-span-12 pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Target Bank Selection <span className="text-red-500" title="Required">*</span>
                        </label>
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-hover:text-[#137fec] transition-colors">
                          <span className="material-symbols-outlined text-[20px]">account_balance</span>
                        </div>
                        <select 
                          className="block w-full rounded-lg border-slate-300 bg-white py-3 pl-10 pr-10 text-slate-900 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm appearance-none dark:bg-slate-900 dark:border-slate-600 dark:text-white shadow-sm transition-all hover:border-slate-400 cursor-pointer"
                          value={targetBank}
                          onChange={(e) => setTargetBank(e.target.value)}
                        >
                          <option value="">Select originating bank...</option>
                          <option value="chase">JPMorgan Chase - Operating (****1234)</option>
                          <option value="bofa">Bank of America - Payroll (****5678)</option>
                          <option value="citi">Citibank - Capital (****9012)</option>
                          <option value="wf">Wells Fargo - Emergency Fund (****3456)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        Please ensure the selected bank has sufficient funds for the transaction.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Additional Information */}
                <section>
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-2">
                    <div className="flex items-center justify-center size-8 rounded-full bg-blue-50 text-[#137fec] dark:bg-blue-900/30">
                      <span className="material-symbols-outlined text-sm">description</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Additional Information</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description / Purpose</label>
                      <textarea 
                        className="block w-full rounded-lg border-slate-300 bg-slate-50 py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white resize-none" 
                        placeholder="Enter payment justification, reference numbers, or internal notes here..." 
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-4 dark:bg-red-900/20 dark:border-red-900/30">
                      <div className="flex gap-3">
                        <span className="material-symbols-outlined text-red-600 dark:text-red-400">priority_high</span>
                        <div>
                          <h4 className="text-sm font-bold text-red-900 dark:text-red-100">Urgent Processing</h4>
                          <p className="text-xs text-red-700 dark:text-red-300 mt-1">Flag this payment for immediate review by the finance director.</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={urgentProcessing}
                          onChange={(e) => setUrgentProcessing(e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </section>
              </form>

              {/* Sticky Footer */}
              <div className="sticky bottom-0 z-40 rounded-b-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg border-t border-slate-200 dark:border-slate-700 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>Secure TLS Encryption. Action will be logged.</span>
                </div>
                <div className="flex w-full sm:w-auto gap-3">
                  <button 
                    onClick={() => setShowPaymentForm(false)}
                    className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#137fec] dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700 transition-all" 
                    type="button"
                  >
                    Cancel
                  </button>
                  <button 
                    className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-[#137fec] bg-blue-50 border border-transparent rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#137fec] dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-all" 
                    type="button"
                  >
                    Save Draft
                  </button>
                  <button 
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#137fec] rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#137fec] transition-all" 
                    type="button"
                  >
                    <span>Submit Payment</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}