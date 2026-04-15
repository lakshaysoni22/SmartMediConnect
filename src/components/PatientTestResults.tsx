import React, { useState } from 'react';
import { PatientSectionHeader } from './PatientSectionHeader';

interface PatientTestResultsProps {
  onNavigate?: (page: string) => void;
}

interface TestResult {
  id: number;
  name: string;
  laboratory: string;
  date: string;
  time: string;
  orderedBy: {
    name: string;
    avatar?: string;
  };
  status: 'Normal' | 'Abnormal' | 'Pending';
  icon: string;
  iconColor: string;
  available: boolean;
}

export function PatientTestResults({ onNavigate }: PatientTestResultsProps) {
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('6months');

  const testResults: TestResult[] = [
    {
      id: 1,
      name: 'Comprehensive Metabolic Panel',
      laboratory: 'Quest Diagnostics',
      date: 'Oct 24, 2023',
      time: '09:30 AM',
      orderedBy: {
        name: 'Dr. James Wilson',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
      },
      status: 'Abnormal',
      icon: 'hematology',
      iconColor: 'bg-red-100 dark:bg-red-900/30 text-red-600',
      available: true
    },
    {
      id: 2,
      name: 'Complete Blood Count (CBC)',
      laboratory: 'Quest Diagnostics',
      date: 'Oct 24, 2023',
      time: '09:30 AM',
      orderedBy: {
        name: 'Dr. James Wilson',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
      },
      status: 'Normal',
      icon: 'bloodtype',
      iconColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
      available: true
    },
    {
      id: 3,
      name: 'MRI - Right Knee',
      laboratory: 'Main Hospital',
      date: 'Sep 15, 2023',
      time: '02:15 PM',
      orderedBy: {
        name: 'Dr. Emily Chen',
        avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop'
      },
      status: 'Normal',
      icon: 'radiology',
      iconColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
      available: true
    },
    {
      id: 4,
      name: 'Thyroid Panel',
      laboratory: 'LabCorp',
      date: 'Sep 12, 2023',
      time: '11:00 AM',
      orderedBy: {
        name: 'Dr. Sarah Admin',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
      },
      status: 'Pending',
      icon: 'biotech',
      iconColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
      available: false
    },
    {
      id: 5,
      name: 'Urinalysis, Complete',
      laboratory: 'Main Hospital',
      date: 'Aug 05, 2023',
      time: '08:45 AM',
      orderedBy: {
        name: 'Dr. James Wilson',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
      },
      status: 'Normal',
      icon: 'science',
      iconColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
      available: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Normal':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border border-green-200 dark:border-green-800">
            Normal
          </span>
        );
      case 'Abnormal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border border-red-200 dark:border-red-800">
            <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
            Abnormal
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 dark:bg-black">
      {/* Header */}
      <PatientSectionHeader
        icon="description"
        title="Test Results"
        subtitle="View and download your medical test history and laboratory reports"
      />

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/40 bg-white/70 p-5 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined">lab_panel</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wide">Total Reports</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">24</h3>
              </div>
            </div>

            <div className="rounded-2xl border border-white/40 bg-white/70 p-5 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wide">Attention Needed</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1 <span className="text-sm font-medium text-slate-400">New</span></h3>
              </div>
            </div>

            <div className="rounded-2xl border border-white/40 bg-white/70 p-5 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 flex items-center gap-4">
              <div className="size-12 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 flex items-center justify-center">
                <span className="material-symbols-outlined">history</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wide">Latest Result</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Oct 24</h3>
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="rounded-xl border border-white/40 bg-white/70 p-4 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative min-w-[180px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                </span>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] outline-none"
                >
                  <option value="all">All Test Types</option>
                  <option value="blood">Blood Work</option>
                  <option value="radiology">Radiology (X-Ray, MRI)</option>
                  <option value="pathology">Pathology</option>
                  <option value="cardiology">Cardiology</option>
                </select>
              </div>

              <div className="relative min-w-[180px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">date_range</span>
                </span>
                <select 
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] outline-none"
                >
                  <option value="6months">Last 6 Months</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="year">Last Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#137fec] text-white rounded-lg font-medium shadow-lg shadow-[#137fec]/20 hover:bg-blue-600 transition-colors">
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span className="text-sm">Download All</span>
              </button>
            </div>
          </div>

          {/* Test Results Table */}
          <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-5 sm:col-span-4">Test Name / Details</div>
              <div className="col-span-3 sm:col-span-2 text-center sm:text-left">Date</div>
              <div className="hidden sm:block sm:col-span-3">Ordered By</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Table Rows */}
            {testResults.map((result) => (
              <div 
                key={result.id}
                className="grid grid-cols-12 gap-4 p-4 items-center border-b border-slate-200/50 dark:border-slate-700/50 last:border-b-0 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors group"
              >
                {/* Test Name */}
                <div className="col-span-5 sm:col-span-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${result.iconColor} shrink-0`}>
                      <span className="material-symbols-outlined">{result.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{result.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Laboratory: {result.laboratory}</p>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-3 sm:col-span-2 flex flex-col justify-center text-center sm:text-left">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{result.date}</span>
                  <span className="text-xs text-slate-400">{result.time}</span>
                </div>

                {/* Ordered By */}
                <div className="hidden sm:flex sm:col-span-3 items-center gap-2">
                  {result.orderedBy.avatar ? (
                    <div 
                      className="size-6 rounded-full bg-slate-200 bg-cover bg-center"
                      style={{ backgroundImage: `url(${result.orderedBy.avatar})` }}
                    />
                  ) : (
                    <div className="size-6 rounded-full bg-slate-200" />
                  )}
                  <span className="text-sm text-slate-600 dark:text-slate-300">{result.orderedBy.name}</span>
                </div>

                {/* Status */}
                <div className="col-span-2 flex justify-center">
                  {getStatusBadge(result.status)}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-end gap-2">
                  {result.available ? (
                    <>
                      <button 
                        className="p-2 text-slate-400 hover:text-[#137fec] hover:bg-[#137fec]/10 rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-[#137fec] hover:bg-[#137fec]/10 rounded-lg transition-colors" 
                        title="Download PDF"
                      >
                        <span className="material-symbols-outlined">download</span>
                      </button>
                    </>
                  ) : (
                    <button 
                      disabled
                      className="p-2 text-slate-300 cursor-not-allowed rounded-lg" 
                      title="Details Not Available"
                    >
                      <span className="material-symbols-outlined">visibility_off</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-2">
            <p className="text-xs text-slate-500 dark:text-slate-400">Showing 1-5 of 24 results</p>
            <div className="flex gap-2">
              <button 
                disabled
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Next
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-900/50 flex gap-4 items-start">
            <span className="material-symbols-outlined text-blue-500 shrink-0">info</span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Understanding Your Results</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Test results shown here are for your reference. "Normal" ranges can vary by laboratory. Please consult with your doctor for a complete interpretation of these results. If you have urgent questions, contact the clinic immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}