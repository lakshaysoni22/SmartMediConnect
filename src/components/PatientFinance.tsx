import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  type: 'appointment' | 'procedure' | 'medication' | 'lab';
  invoiceId: string;
}

interface PaymentMethod {
  id: number;
  type: 'card' | 'bank';
  last4: string;
  expiryDate?: string;
  isDefault: boolean;
  cardBrand?: string;
  bankName?: string;
}

export function PatientFinance() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'history' | 'methods'>('overview');

  const financialSummary = {
    totalBalance: 1250.00,
    paidThisMonth: 3480.00,
    pendingAmount: 850.00,
    insuranceCovered: 12340.00,
  };

  const transactions: Transaction[] = [
    {
      id: 1,
      date: 'Oct 28, 2024',
      description: 'General Checkup - Dr. Sarah Wilson',
      amount: 150.00,
      status: 'paid',
      type: 'appointment',
      invoiceId: 'INV-2024-1028',
    },
    {
      id: 2,
      date: 'Oct 25, 2024',
      description: 'Blood Test Panel - Lab Services',
      amount: 280.00,
      status: 'paid',
      type: 'lab',
      invoiceId: 'INV-2024-1025',
    },
    {
      id: 3,
      date: 'Oct 20, 2024',
      description: 'Prescription Refill - Metformin 500mg',
      amount: 45.00,
      status: 'pending',
      type: 'medication',
      invoiceId: 'INV-2024-1020',
    },
    {
      id: 4,
      date: 'Oct 15, 2024',
      description: 'Cardiology Consultation - Dr. Lakshay Soni',
      amount: 220.00,
      status: 'paid',
      type: 'appointment',
      invoiceId: 'INV-2024-1015',
    },
    {
      id: 5,
      date: 'Oct 12, 2024',
      description: 'X-Ray Imaging - Radiology Dept',
      amount: 385.00,
      status: 'overdue',
      type: 'procedure',
      invoiceId: 'INV-2024-1012',
    },
    {
      id: 6,
      date: 'Oct 08, 2024',
      description: 'Physical Therapy Session (3x)',
      amount: 270.00,
      status: 'paid',
      type: 'procedure',
      invoiceId: 'INV-2024-1008',
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 1,
      type: 'card',
      last4: '4242',
      expiryDate: '12/26',
      isDefault: true,
      cardBrand: 'Visa',
    },
    {
      id: 2,
      type: 'card',
      last4: '8888',
      expiryDate: '09/25',
      isDefault: false,
      cardBrand: 'Mastercard',
    },
    {
      id: 3,
      type: 'bank',
      last4: '6789',
      isDefault: false,
      bankName: 'Chase Bank',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'overdue':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'calendar_month';
      case 'procedure':
        return 'medical_services';
      case 'medication':
        return 'medication';
      case 'lab':
        return 'science';
      default:
        return 'receipt';
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 dark:bg-black">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#137fec] rounded-xl flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white text-[28px]">account_balance_wallet</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Finance & Billing</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Manage your payments and billing information
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-[#137fec] text-white font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span className="hidden sm:inline">Make Payment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            {/* Total Balance */}
            <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-slate-800/60 dark:border-slate-700/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Total Balance
                </span>
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-[20px]">
                    account_balance
                  </span>
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                ${financialSummary.totalBalance.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Amount due
              </p>
            </div>

            {/* Paid This Month */}
            <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-slate-800/60 dark:border-slate-700/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Paid This Month
                </span>
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[20px]">
                    paid
                  </span>
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                ${financialSummary.paidThisMonth.toFixed(2)}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                +12% from last month
              </p>
            </div>

            {/* Pending Amount */}
            <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-slate-800/60 dark:border-slate-700/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Pending
                </span>
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400 text-[20px]">
                    schedule
                  </span>
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                ${financialSummary.pendingAmount.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">2 invoices processing</p>
            </div>

            {/* Insurance Covered */}
            <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-slate-800/60 dark:border-slate-700/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Insurance Coverage
                </span>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]">
                    health_and_safety
                  </span>
                </div>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                ${financialSummary.insuranceCovered.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">YTD covered</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-1 mb-6 border border-slate-200 dark:border-slate-800 inline-flex gap-1">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedTab === 'overview'
                  ? 'bg-[#137fec] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('history')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedTab === 'history'
                  ? 'bg-[#137fec] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Payment History
            </button>
            <button
              onClick={() => setSelectedTab('methods')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedTab === 'methods'
                  ? 'bg-[#137fec] text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Payment Methods
            </button>
          </div>

          {/* Tab Content */}
          {selectedTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Transactions */}
              <div className="lg:col-span-2 rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-slate-800/60 dark:border-slate-700/40">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                  <button className="text-[#137fec] text-sm font-semibold hover:underline">View All</button>
                </div>

                <div className="space-y-3">
                  {transactions.slice(0, 4).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:border-[#137fec]/30 transition-colors"
                    >
                      <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                        <span className="material-symbols-outlined text-[#137fec] text-[20px]">
                          {getTypeIcon(transaction.type)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{transaction.date}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-slate-900 dark:text-white">
                          ${transaction.amount.toFixed(2)}
                        </p>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {transaction.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                {/* Download Statement */}
                <div className="rounded-2xl border border-white/40 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 backdrop-blur-xl dark:border-slate-700/40">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 shadow-md">
                    <span className="material-symbols-outlined text-[#137fec] text-[24px]">
                      download
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Download Statement</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Get your billing statement for tax purposes
                  </p>
                  <button className="w-full px-4 py-2.5 rounded-lg bg-[#137fec] text-white font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
                    Download PDF
                  </button>
                </div>

                {/* Setup Auto-Pay */}
                <div className="rounded-2xl border border-white/40 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 backdrop-blur-xl dark:border-slate-700/40">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 shadow-md">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[24px]">
                      autorenew
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Auto-Pay</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Never miss a payment with automatic billing
                  </p>
                  <button className="w-full px-4 py-2.5 rounded-lg border border-green-600 dark:border-green-500 text-green-700 dark:text-green-400 font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                    Enable Auto-Pay
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'history' && (
            <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-slate-800/60 dark:border-slate-700/40">
              <h3 className="font-bold text-slate-900 dark:text-white mb-6">All Transactions</h3>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:border-[#137fec]/30 transition-colors"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                      <span className="material-symbols-outlined text-[#137fec] text-[22px]">
                        {getTypeIcon(transaction.type)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{transaction.date}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        Invoice: {transaction.invoiceId}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                        ${transaction.amount.toFixed(2)}
                      </p>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status.toUpperCase()}
                      </span>
                    </div>
                    <button className="text-slate-400 hover:text-[#137fec] transition-colors">
                      <span className="material-symbols-outlined">download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'methods' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-slate-800/60 dark:border-slate-700/40">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-slate-900 dark:text-white">Saved Payment Methods</h3>
                    <button className="px-4 py-2 rounded-lg bg-[#137fec] text-white font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                      Add New
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`p-5 rounded-xl border-2 ${
                          method.isDefault
                            ? 'border-[#137fec] bg-blue-50/50 dark:bg-blue-900/10'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50'
                        } hover:border-[#137fec]/50 transition-colors relative`}
                      >
                        {method.isDefault && (
                          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#137fec] text-white text-[10px] font-bold">
                            DEFAULT
                          </span>
                        )}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[#137fec] text-[24px]">
                              {method.type === 'card' ? 'credit_card' : 'account_balance'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 dark:text-white mb-1">
                              {method.type === 'card'
                                ? `${method.cardBrand} •••• ${method.last4}`
                                : `${method.bankName} •••• ${method.last4}`}
                            </p>
                            {method.expiryDate && (
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Expires {method.expiryDate}
                              </p>
                            )}
                            <div className="flex gap-2 mt-3">
                              {!method.isDefault && (
                                <button className="text-xs font-semibold text-[#137fec] hover:underline">
                                  Set as Default
                                </button>
                              )}
                              <button className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}