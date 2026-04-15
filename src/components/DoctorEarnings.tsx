import React, { useState, useEffect, useRef } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { PaymentForm } from './PaymentForm';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Legend, Cell } from 'recharts';
import { DoctorNotificationCenter } from './DoctorNotificationCenter';

export function DoctorEarnings() {
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [prefilledPayee, setPrefilledPayee] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartView, setChartView] = useState<'weekly' | 'monthly'>('weekly');
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Transaction table state
  const [activeTab, setActiveTab] = useState<'all' | 'hospital' | 'vendor' | 'utilities'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showActionResponse, setShowActionResponse] = useState(false);
  const [actionResponseMessage, setActionResponseMessage] = useState('');
  const [showBonusModal, setShowBonusModal] = useState(false);

  // Ref to store timeout IDs for cleanup
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  // Check dark mode on mount
  React.useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = localStorage.getItem('medicareAppDarkMode') === 'true';
      setIsDarkMode(darkMode);
    };
    
    checkDarkMode();
    
    // Listen for dark mode changes
    window.addEventListener('storage', checkDarkMode);
    return () => window.removeEventListener('storage', checkDarkMode);
  }, []);

  const weeklyData = [
    { name: 'Week 1', income: 4200, lastPeriod: 3800, target: 5000 },
    { name: 'Week 2', income: 6100, lastPeriod: 5500, target: 5000 },
    { name: 'Week 3', income: 4800, lastPeriod: 4200, target: 5000 },
    { name: 'Week 4', income: 7900, lastPeriod: 6800, target: 5000 },
    { name: 'Week 5', income: 5200, lastPeriod: 4900, target: 5000 },
    { name: 'Week 6', income: 6800, lastPeriod: 6200, target: 5000 },
    { name: 'Current', income: 12450, lastPeriod: 11200, target: 5000 }
  ];

  const monthlyData = [
    { name: 'Jan', income: 18200, lastPeriod: 16800, target: 20000 },
    { name: 'Feb', income: 22100, lastPeriod: 19500, target: 20000 },
    { name: 'Mar', income: 19800, lastPeriod: 18200, target: 20000 },
    { name: 'Apr', income: 25900, lastPeriod: 22800, target: 20000 },
    { name: 'May', income: 21200, lastPeriod: 19900, target: 20000 },
    { name: 'Jun', income: 24800, lastPeriod: 22200, target: 20000 },
    { name: 'Jul', income: 28450, lastPeriod: 25200, target: 20000 }
  ];

  const chartData = chartView === 'weekly' ? weeklyData : monthlyData;
  const avgIncome = chartData.reduce((sum, item) => sum + item.income, 0) / chartData.length;

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const current = payload[0].value;
      const previous = payload[1]?.value || 0;
      const change = ((current - previous) / previous * 100).toFixed(1);
      const isPositive = parseFloat(change) > 0;

      return (
        <div className={`${isDarkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-slate-200'} border rounded-xl p-4 shadow-xl backdrop-blur-sm`}>
          <p className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{label}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Current:</span>
              <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                ${current.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
              <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Previous:</span>
              <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                ${previous.toLocaleString()}
              </span>
            </div>
            <div className={`flex items-center gap-1 pt-1 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <span className={`material-symbols-outlined text-[16px] ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {isPositive ? 'trending_up' : 'trending_down'}
              </span>
              <span className={`text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>vs previous</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handlePaymentClick = (payee?: string) => {
    setPrefilledPayee(payee || '');
    setIsPaymentFormOpen(true);
  };

  // Transaction data
  const allTransactions = [
    {
      id: 1,
      payee: 'City General Hospital',
      payeeId: 'PAY-00245',
      category: 'Earnings',
      type: 'hospital',
      date: 'Oct 24, 2023',
      amount: '$5,200.00',
      status: 'Completed',
      icon: 'domain',
      iconColor: 'blue'
    },
    {
      id: 2,
      payee: 'MedTech Supplies Inc.',
      payeeId: 'INV-88921',
      category: 'Vendor',
      type: 'vendor',
      date: 'Oct 23, 2023',
      amount: '$4,230.50',
      status: 'Pending Approval',
      icon: 'biotech',
      iconColor: 'indigo'
    },
    {
      id: 3,
      payee: 'City Power & Light',
      payeeId: 'UTL-2023-10',
      category: 'Utility',
      type: 'utilities',
      date: 'Oct 22, 2023',
      amount: '$1,200.00',
      status: 'Scheduled',
      icon: 'bolt',
      iconColor: 'amber'
    },
    {
      id: 4,
      payee: "St. Mary's Clinic",
      payeeId: 'PAY-00249',
      category: 'Earnings',
      type: 'hospital',
      date: 'Oct 20, 2023',
      amount: '$2,620.00',
      status: 'Failed',
      icon: 'domain',
      iconColor: 'blue'
    },
    {
      id: 5,
      payee: 'Apex Pharma Co.',
      payeeId: 'INV-88920',
      category: 'Vendor',
      type: 'vendor',
      date: 'Oct 19, 2023',
      amount: '$8,450.00',
      status: 'Completed',
      icon: 'medication',
      iconColor: 'emerald'
    }
  ];

  // Filter transactions
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesTab = activeTab === 'all' || transaction.type === activeTab;
    const matchesSearch = transaction.payee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.payeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesTab && matchesSearch && matchesStatus;
  });

  // Handle action menu
  const handleAction = (action: string, transaction: any) => {
    setOpenActionMenu(null);
    setActionResponseMessage(`${action} action performed on ${transaction.payee} (${transaction.payeeId})`);
    setShowActionResponse(true);
    const timeout = setTimeout(() => setShowActionResponse(false), 3000);
    timeoutRefs.current.push(timeout);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'Pending Approval': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400';
      case 'Scheduled': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
      case 'Failed': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400';
    }
  };

  return (
    <>
      {/* Payment Form Modal */}
      <PaymentForm 
        isOpen={isPaymentFormOpen} 
        onClose={() => setIsPaymentFormOpen(false)}
        prefilledPayee={prefilledPayee}
      />

      {/* Header - Matching Doctor Portal Style */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              payments
            </span>
          </div>
          {/* Title & Subtitle */}
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Earnings & Payments</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Track your revenue, pending payments, and deduction history</p>
          </div>
        </div>
        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Export Button - Hidden (action buttons moved to main content) */}
          <button className="hidden">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Export Report</span>
          </button>
          {/* Notification Bell */}
          <NotificationIcon onClick={() => setShowNotifications(true)} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50 dark:bg-slate-950">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-5">
          {/* Action Buttons Row */}
          <div className="flex items-center justify-end gap-2.5">
            {/* Download Button */}
            <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
            
            {/* This Month Dropdown */}
            <select className="h-10 pl-3 pr-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white cursor-pointer shadow-sm hover:shadow-md transition-all">
              <option>This Month</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>This Year</option>
            </select>
            
            {/* Payment Button */}
            <button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all font-medium text-sm" onClick={handlePaymentClick}>
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              <span>Payment</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Earnings */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                  <span className="material-symbols-outlined text-[28px]">attach_money</span>
                </div>
                <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span> +12.5%
                </span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Earnings</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">$12,450.00</h3>
              </div>
            </div>

            {/* Pending Payments */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-600 dark:text-amber-500">
                  <span className="material-symbols-outlined text-[28px]">pending_actions</span>
                </div>
                <span className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full">
                  In Review
                </span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pending Payments</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">$3,200.00</h3>
              </div>
            </div>

            {/* Deductions */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-500">
                  <span className="material-symbols-outlined text-[28px]">remove_circle_outline</span>
                </div>
                <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full">
                  <span className="material-symbols-outlined text-[14px] mr-1">trending_down</span> -2%
                </span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Deductions</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">$1,150.00</h3>
              </div>
            </div>

            {/* Avg per Patient */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-500">
                  <span className="material-symbols-outlined text-[28px]">person_outline</span>
                </div>
                <span className="flex items-center text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                  Avg.
                </span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Avg. per Patient</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">$185.00</h3>
              </div>
            </div>
          </div>

          {/* Quick Pay Shortcuts */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quick Pay Shortcuts</h3>
              <button className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Pay MedTech */}
              <button onClick={() => handlePaymentClick('MedTech Supplies Inc.')} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group text-left">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">biotech</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Pay MedTech</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Vendor • Monthly</p>
                </div>
              </button>

              {/* Pay City Power */}
              <button onClick={() => handlePaymentClick('City Power & Light')} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all group text-left">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-500 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">bolt</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Pay City Power</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Utility • Due in 2d</p>
                </div>
              </button>

              {/* Pay BioLab */}
              <button onClick={() => handlePaymentClick('BioLab Services')} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-all group text-left">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-500 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">science</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Pay BioLab</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Services • Recurring</p>
                </div>
              </button>

              {/* Pay Apex Pharma */}
              <button onClick={() => handlePaymentClick('Apex Pharma Co.')} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all group text-left">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-500 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">medication</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Pay Apex Pharma</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Vendor • Supplies</p>
                </div>
              </button>
            </div>
          </div>

          {/* Income Analysis - Enhanced with Comparison */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Income Analysis</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Compare current vs previous period performance</p>
              </div>
              <div className="flex items-center gap-2">
                {/* View Toggle */}
                <div className="flex bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
                  <button
                    onClick={() => setChartView('weekly')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      chartView === 'weekly'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setChartView('monthly')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      chartView === 'monthly'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline whitespace-nowrap">
                  View Full Report
                </button>
              </div>
            </div>

            {/* Stats Summary Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl p-3 border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[18px]">trending_up</span>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Average</p>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  ${Math.round(avgIncome).toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-xl p-3 border border-emerald-200/50 dark:border-emerald-800/50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px]">star</span>
                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Peak</p>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  ${Math.max(...chartData.map(d => d.income)).toLocaleString()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 rounded-xl p-3 border border-purple-200/50 dark:border-purple-800/50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[18px]">percent</span>
                  <p className="text-xs font-medium text-purple-600 dark:text-purple-400">Growth</p>
                </div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">+18.4%</p>
              </div>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  onMouseMove={(state) => {
                    if (state.isTooltipActive) {
                      setActiveBar(state.activeTooltipIndex ?? null);
                    } else {
                      setActiveBar(null);
                    }
                  }}
                  onMouseLeave={() => setActiveBar(null)}
                >
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.95}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.7}/>
                    </linearGradient>
                    <linearGradient id="colorIncomeLast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={isDarkMode ? '#334155' : '#e2e8f0'} 
                    opacity={isDarkMode ? 0.3 : 1}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12, fontWeight: 500 }}
                    axisLine={{ stroke: isDarkMode ? '#475569' : '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12, fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)', radius: 8 }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                    formatter={(value) => {
                      const labels: Record<string, string> = {
                        income: 'Current Period',
                        lastPeriod: 'Previous Period',
                        target: 'Target'
                      };
                      return <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{labels[value]}</span>;
                    }}
                  />
                  
                  {/* Previous Period Bars */}
                  <Bar 
                    dataKey="lastPeriod" 
                    fill="url(#colorIncomeLast)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={50}
                    animationDuration={800}
                    animationBegin={0}
                  />
                  
                  {/* Current Period Bars */}
                  <Bar 
                    dataKey="income" 
                    fill="url(#colorIncome)"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={50}
                    animationDuration={1000}
                    animationBegin={200}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={activeBar === index ? '#2563eb' : 'url(#colorIncome)'}
                        style={{ 
                          filter: activeBar === index ? 'drop-shadow(0 4px 6px rgba(59, 130, 246, 0.4))' : 'none',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </Bar>

                  {/* Target Line */}
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke={isDarkMode ? '#f59e0b' : '#f97316'}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    animationDuration={1200}
                    animationBegin={400}
                  />

                  {/* Average Line */}
                  <Line 
                    type="monotone" 
                    dataKey={() => avgIncome}
                    stroke={isDarkMode ? '#10b981' : '#059669'}
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Average"
                    animationDuration={1200}
                    animationBegin={600}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Chart Legend Info */}
            <div className="mt-4 flex flex-wrap gap-4 items-center justify-center text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-slate-600 dark:text-slate-400">Current Period</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-indigo-400 opacity-60"></div>
                <span className="text-slate-600 dark:text-slate-400">Previous Period</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-0.5 bg-orange-500" style={{ clipPath: 'polygon(0 0, 33% 0, 33% 100%, 0 100%, 0 0, 66% 0, 66% 100%, 33% 100%)' }}></div>
                <span className="text-slate-600 dark:text-slate-400">Target</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-0.5 bg-emerald-500" style={{ clipPath: 'polygon(0 0, 25% 0, 25% 100%, 0 100%, 0 0, 50% 0, 50% 100%, 25% 100%, 25% 0, 75% 0, 75% 100%, 50% 100%)' }}></div>
                <span className="text-slate-600 dark:text-slate-400">Average</span>
              </div>
            </div>
          </div>

          {/* Detailed Earnings Report & Right Sidebar */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Hospital Earnings - Full Width */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hospital Earnings Breakdown</h3>
                <button className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400">
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* City General */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">City General</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">$7,450</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>32 Patients</span>
                    <span>60% of total</span>
                  </div>
                </div>

                {/* St. Mary's */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">St. Mary's</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">$3,120</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>14 Patients</span>
                    <span>25% of total</span>
                  </div>
                </div>

                {/* Private Practice */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Private Practice</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">$1,880</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>8 Patients</span>
                    <span>15% of total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Bonus - Full Width */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-xl mb-1">Upcoming Performance Bonus</h3>
                  <p className="text-blue-100 text-sm">You are on track to receive a quarterly performance bonus!</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">$2,500</p>
                  <p className="text-xs text-blue-100">Projected amount</p>
                </div>
              </div>
              <div className="w-full bg-blue-800/50 rounded-full h-3 mb-2">
                <div className="bg-white h-3 rounded-full transition-all" style={{ width: '80%' }}></div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-blue-100">80% Completed • 6 days remaining</p>
                <button className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">View Details</button>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -right-2 top-2 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          </div>

          {/* Payment Transactions Table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Payment Transactions</h3>
              
              {/* Tab Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'all'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  All Transactions
                </button>
                <button 
                  onClick={() => setActiveTab('hospital')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'hospital'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  Hospital Payments
                </button>
                <button 
                  onClick={() => setActiveTab('vendor')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'vendor'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  Vendor Invoices
                </button>
                <button 
                  onClick={() => setActiveTab('utilities')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeTab === 'utilities'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  Utilities
                </button>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search payee, ID..." 
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                >
                  <option value="all">Status: All</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Failed">Failed</option>
                </select>
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[20px]">tune</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Payee Details</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredTransactions.map(transaction => (
                    <tr key={transaction.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]">domain</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{transaction.payee}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">ID: {transaction.payeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{transaction.date}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{transaction.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Showing <span className="font-semibold">1</span> to <span className="font-semibold">5</span> of <span className="font-semibold">97</span> results
              </p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[18px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-semibold text-sm">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-600 dark:text-slate-400">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-600 dark:text-slate-400">3</button>
                <span className="px-2 text-slate-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Center */}
      <DoctorNotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}