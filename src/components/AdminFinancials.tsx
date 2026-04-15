import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface PeriodData {
  revenue: string;
  revenuePercent: string;
  costs: string;
  costsPercent: string;
  netIncome: string;
  netIncomePercent: string;
  pendingClaims: number;
  pendingValue: string;
  revenueTarget: string;
  costsBudget: string;
  revenueProgress: number;
  costsProgress: number;
  netIncomeProgress: number;
  chartData: Array<{ month: string; income: number; expenses: number }>;
  revenueBySource: Array<{ name: string; value: number; color: string }>;
}

export function AdminFinancials() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('monthly');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check dark mode
  React.useEffect(() => {
    const checkDarkMode = () => {
      const htmlElement = document.documentElement;
      setIsDarkMode(htmlElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const periodData: Record<TimePeriod, PeriodData> = {
    daily: {
      revenue: '$142K',
      revenuePercent: '+8%',
      costs: '$60K',
      costsPercent: '+3%',
      netIncome: '$82K',
      netIncomePercent: '+12%',
      pendingClaims: 18,
      pendingValue: '$12k',
      revenueTarget: '$150K',
      costsBudget: '$65K',
      revenueProgress: 85,
      costsProgress: 75,
      netIncomeProgress: 82,
      chartData: [
        { month: '6AM', income: 8, expenses: 5 },
        { month: '9AM', income: 15, expenses: 8 },
        { month: '12PM', income: 22, expenses: 12 },
        { month: '3PM', income: 28, expenses: 15 },
        { month: '6PM', income: 35, expenses: 18 },
        { month: '9PM', income: 25, expenses: 14 },
      ],
      revenueBySource: [
        { name: 'Emergency', value: 35, color: '#EF4444' },
        { name: 'Cardiology', value: 25, color: '#0077b6' },
        { name: 'Neurology', value: 20, color: '#8B5CF6' },
        { name: 'Pediatrics', value: 15, color: '#10B981' },
        { name: 'Others', value: 5, color: '#94A3B8' },
      ]
    },
    weekly: {
      revenue: '$1.05M',
      revenuePercent: '+10%',
      costs: '$450K',
      costsPercent: '+4%',
      netIncome: '$600K',
      netIncomePercent: '+14%',
      pendingClaims: 45,
      pendingValue: '$85k',
      revenueTarget: '$1.2M',
      costsBudget: '$500K',
      revenueProgress: 87,
      costsProgress: 90,
      netIncomeProgress: 85,
      chartData: [
        { month: 'Mon', income: 120, expenses: 60 },
        { month: 'Tue', income: 140, expenses: 70 },
        { month: 'Wed', income: 160, expenses: 75 },
        { month: 'Thu', income: 180, expenses: 80 },
        { month: 'Fri', income: 200, expenses: 85 },
        { month: 'Sat', income: 150, expenses: 65 },
        { month: 'Sun', income: 100, expenses: 45 },
      ],
      revenueBySource: [
        { name: 'Emergency', value: 32, color: '#EF4444' },
        { name: 'Cardiology', value: 28, color: '#0077b6' },
        { name: 'Neurology', value: 18, color: '#8B5CF6' },
        { name: 'Pediatrics', value: 15, color: '#10B981' },
        { name: 'Others', value: 7, color: '#94A3B8' },
      ]
    },
    monthly: {
      revenue: '$4.25M',
      revenuePercent: '+12%',
      costs: '$1.80M',
      costsPercent: '+5%',
      netIncome: '$2.45M',
      netIncomePercent: '+15%',
      pendingClaims: 142,
      pendingValue: '$320k',
      revenueTarget: '$5.0M',
      costsBudget: '$2.0M',
      revenueProgress: 85,
      costsProgress: 90,
      netIncomeProgress: 88,
      chartData: [
        { month: 'Jan', income: 380, expenses: 200 },
        { month: 'Feb', income: 320, expenses: 180 },
        { month: 'Mar', income: 350, expenses: 190 },
        { month: 'Apr', income: 420, expenses: 160 },
        { month: 'May', income: 390, expenses: 175 },
        { month: 'Jun', income: 430, expenses: 140 },
        { month: 'Jul', income: 450, expenses: 150 },
        { month: 'Aug', income: 460, expenses: 155 },
        { month: 'Sep', income: 470, expenses: 160 },
        { month: 'Oct', income: 480, expenses: 165 },
        { month: 'Nov', income: 460, expenses: 158 },
        { month: 'Dec', income: 490, expenses: 170 },
      ],
      revenueBySource: [
        { name: 'Emergency', value: 30, color: '#EF4444' },
        { name: 'Cardiology', value: 28, color: '#0077b6' },
        { name: 'Neurology', value: 20, color: '#8B5CF6' },
        { name: 'Pediatrics', value: 15, color: '#10B981' },
        { name: 'Others', value: 7, color: '#94A3B8' },
      ]
    },
    yearly: {
      revenue: '$52.8M',
      revenuePercent: '+18%',
      costs: '$21.5M',
      costsPercent: '+6%',
      netIncome: '$31.3M',
      netIncomePercent: '+22%',
      pendingClaims: 892,
      pendingValue: '$4.2M',
      revenueTarget: '$60.0M',
      costsBudget: '$24.0M',
      revenueProgress: 88,
      costsProgress: 89.5,
      netIncomeProgress: 91,
      chartData: [
        { month: '2018', income: 3200, expenses: 1800 },
        { month: '2019', income: 3600, expenses: 1900 },
        { month: '2020', income: 3900, expenses: 1950 },
        { month: '2021', income: 4200, expenses: 2000 },
        { month: '2022', income: 4600, expenses: 2100 },
        { month: '2023', income: 5100, expenses: 2150 },
      ],
      revenueBySource: [
        { name: 'Emergency', value: 28, color: '#EF4444' },
        { name: 'Cardiology', value: 26, color: '#0077b6' },
        { name: 'Neurology', value: 22, color: '#8B5CF6' },
        { name: 'Pediatrics', value: 16, color: '#10B981' },
        { name: 'Others', value: 8, color: '#94A3B8' },
      ]
    }
  };

  const currentData = periodData[timePeriod];

  // Custom Tooltip for Line Chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
            {payload[0].payload.month}
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0077b6]"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">Income:</span>
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                ${payload[0].value}K
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">Expenses:</span>
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                ${payload[1].value}K
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Financials</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Revenue and expense tracking</p>
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

      <div className="p-6 space-y-6">
        {/* Period Toggle & Download */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Period Toggle */}
          <div className="inline-flex bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            {(['daily', 'weekly', 'monthly', 'yearly'] as TimePeriod[]).map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all capitalize ${
                  timePeriod === period
                    ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Download Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0077b6] hover:bg-blue-600 text-white rounded-lg shadow-md transition-all">
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span className="text-sm font-medium">Download Report</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Total Revenue Card */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{currentData.revenue}</h3>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-[#0EA5E9]">
                <span className="material-symbols-outlined text-xl">account_balance</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-teal-600 font-medium flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                {currentData.revenuePercent}
              </span>
              <span className="text-slate-400 ml-2">vs target</span>
            </div>
          </div>

          {/* Operational Costs Card */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Operational Costs</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{currentData.costs}</h3>
              </div>
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg text-rose-600">
                <span className="material-symbols-outlined text-xl">payments</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-red-500 font-medium flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                {currentData.costsPercent}
              </span>
              <span className="text-slate-400 ml-2">vs budget</span>
            </div>
          </div>

          {/* Net Income Card */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Net Income</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{currentData.netIncome}</h3>
              </div>
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                <span className="material-symbols-outlined text-xl">trending_up</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-teal-600 font-medium flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                {currentData.netIncomePercent}
              </span>
              <span className="text-slate-400 ml-2">vs last month</span>
            </div>
          </div>

          {/* Pending Claims Card */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Claims</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{currentData.pendingClaims}</h3>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600">
                <span className="material-symbols-outlined text-xl">pending</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Needs Action
              </span>
            </div>
          </div>
        </div>

        {/* Revenue Trends Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Trends</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Comparing Income vs Expenses (Year to Date)</p>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0077b6]"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                <span className="text-sm text-slate-600 dark:text-slate-400">Expenses</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#E2E8F0'} />
                <XAxis 
                  dataKey="month" 
                  stroke={isDarkMode ? '#64748B' : '#94A3B8'}
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                />
                <YAxis 
                  stroke={isDarkMode ? '#64748B' : '#94A3B8'}
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#0077b6" 
                  strokeWidth={3}
                  dot={{ fill: '#0077b6', strokeWidth: 2, r: 5, stroke: '#fff' }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#94A3B8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Source */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue by Source</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Department contribution analysis</p>
            </div>

            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentData.revenueBySource}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {currentData.revenueBySource.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                      border: `1px solid ${isDarkMode ? '#334155' : '#E2E8F0'}`,
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {currentData.revenueBySource.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Department Performance */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Department Performance</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Top revenue generators</p>
            </div>

            <div className="space-y-4">
              {currentData.revenueBySource.map((dept, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${dept.color}20` }}
                      >
                        <span 
                          className="material-symbols-outlined text-[20px]"
                          style={{ color: dept.color }}
                        >
                          local_hospital
                        </span>
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{dept.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{dept.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${dept.value}%`,
                        backgroundColor: dept.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}