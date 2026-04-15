import React, { useState, useEffect, useCallback, startTransition } from 'react';
import { PageLoadingSpinner } from './PageLoadingSpinner';
import { DoctorNotificationCenter } from './DoctorNotificationCenter';
import { NotificationIcon } from './NotificationIcon';

// ✅ EAGER LOADING - All doctor components loaded immediately for zero errors
import { DoctorOverview } from './DoctorOverview';
import { DoctorSchedule } from './DoctorSchedule';
import { DoctorPatients } from './DoctorPatients';
import { DoctorMessages } from './DoctorMessages';
import { DoctorMedicalNews } from './DoctorMedicalNews';
import { DoctorApprovals } from './DoctorApprovals';
import { DoctorSettings } from './DoctorSettings';
import { DoctorEvents } from './DoctorEvents';
import { DoctorEarnings } from './DoctorEarnings';

interface DoctorDashboardWhiteProps {
  onLogout?: () => void;
}

export function DoctorDashboardWhite({ onLogout }: DoctorDashboardWhiteProps) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // 🌙 FRESH DARK MODE IMPLEMENTATION
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('doctorPortalDarkMode');
      return saved === 'true';
    }
    return false;
  });

  // Apply dark mode on mount and when it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('doctorPortalDarkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('doctorPortalDarkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // ✅ OPTIMIZED: Navigation with startTransition to prevent UI blocking
  const handleNavigate = useCallback((nav: string) => {
    startTransition(() => {
      setActiveNav(nav);
    });
  }, []);

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-black transition-colors duration-200">
      {/* Sidebar */}
      <aside className={`flex-shrink-0 bg-white dark:bg-[#111418] border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 md:h-screen z-30 relative transition-all duration-300 ${
        isSidebarCollapsed ? 'w-20' : 'w-full md:w-64'
      }`}>
        {/* Hamburger Toggle Button - Desktop */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-md z-30 group"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[16px] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {isSidebarCollapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>

        <div className={`h-16 flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'px-6 gap-3'} border-b border-slate-100 dark:border-slate-800`}>
          {!isSidebarCollapsed ? (
            <>
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined text-xl">local_hospital</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">SmartMediConnect</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Doctor Portal</span>
              </div>
            </>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-xl">local_hospital</span>
            </div>
          )}
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {/* 1. Dashboard */}
          <button 
            onClick={() => handleNavigate('dashboard')}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-all w-full text-left ${
              activeNav === 'dashboard'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title={isSidebarCollapsed ? 'Dashboard' : ''}
          >
            <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`}>dashboard</span>
            {!isSidebarCollapsed && <span className="text-sm font-medium">Dashboard</span>}
          </button>

          {/* 2. My Patients */}
          <button 
            onClick={() => handleNavigate('appointmentRequests')}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-colors w-full text-left relative ${
              activeNav === 'appointmentRequests'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title={isSidebarCollapsed ? 'My Patients' : ''}
          >
            <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`} style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            {!isSidebarCollapsed && (
              <>
                <span className="text-sm font-medium">My Patients</span>
                <span className="ml-auto bg-blue-100 dark:bg-blue-500/30 text-blue-700 dark:text-blue-300 py-0.5 px-2 rounded-full text-xs font-semibold">3</span>
              </>
            )}
            {isSidebarCollapsed && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] font-bold px-1 py-0.5 rounded-full">3</span>
            )}
          </button>

          {/* 3. Earnings */}
          <button 
            onClick={() => handleNavigate('earnings')}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-colors w-full text-left ${
              activeNav === 'earnings'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title={isSidebarCollapsed ? 'Earnings' : ''}
          >
            <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`} style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            {!isSidebarCollapsed && <span className="text-sm font-medium">Earnings</span>}
          </button>

          {/* 4. Messages */}
          <button 
            onClick={() => handleNavigate('messages')}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-colors w-full text-left ${
              activeNav === 'messages'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title={isSidebarCollapsed ? 'Messages' : ''}
          >
            <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`}>chat_bubble_outline</span>
            {!isSidebarCollapsed && <span className="text-sm font-medium">Messages</span>}
          </button>

          {/* 5. Events */}
          <button 
            onClick={() => handleNavigate('events')}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-colors w-full text-left ${
              activeNav === 'events'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title={isSidebarCollapsed ? 'Events' : ''}
          >
            <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`}>event</span>
            {!isSidebarCollapsed && <span className="text-sm font-medium">Events</span>}
          </button>

          {/* 6. Medical News */}
          <button 
            onClick={() => handleNavigate('news')}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-colors w-full text-left ${
              activeNav === 'news'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title={isSidebarCollapsed ? 'Medical News' : ''}
          >
            <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`}>newspaper</span>
            {!isSidebarCollapsed && <span className="text-sm font-medium">Medical News</span>}
          </button>

          {/* 7. Approvals */}
          <button 
            onClick={() => handleNavigate('approvals')}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-colors w-full text-left ${
              activeNav === 'approvals'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title={isSidebarCollapsed ? 'Approvals' : ''}
          >
            <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`}>verified_user</span>
            {!isSidebarCollapsed && <span className="text-sm font-medium">Approvals</span>}
          </button>

          {/* 8. Settings */}
          <button 
            onClick={() => handleNavigate('settings')}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-colors w-full text-left ${
              activeNav === 'settings'
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title={isSidebarCollapsed ? 'Settings' : ''}
          >
            <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`}>settings</span>
            {!isSidebarCollapsed && <span className="text-sm font-medium">Settings</span>}
          </button>

          {/* Sign Out button REMOVED - Now in Security Settings */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden relative bg-slate-50/50 dark:bg-slate-950">
        {activeNav === 'dashboard' && (
          <>
            {/* Header - Consistent Style */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    dashboard
                  </span>
                </div>
                {/* Title & Subtitle */}
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Your daily overview and patient management</p>
                </div>
              </div>
              {/* Right Actions */}
              <div className="flex items-center gap-3">
                {/* Notification Bell */}
                <NotificationIcon onClick={() => setShowNotifications(!showNotifications)} />
              </div>
            </header>

            {/* Dashboard Content */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 pt-2 md:pt-3 pb-6 md:pb-8 space-y-6">
              {/* Greeting Header */}
              <div>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Good Morning, Dr. Lakshay
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl flex items-center justify-between hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Pending Appointments</p>
                    <div className="flex items-baseline mt-1">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white">12</h3>
                      <span className="ml-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800 flex items-center">
                        <span className="material-symbols-outlined text-[10px] mr-0.5">trending_up</span>
                        +2
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Updated 5 min ago</p>
                  </div>
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-blue-100 dark:border-blue-800">
                    <span className="material-symbols-outlined text-2xl">calendar_today</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl flex items-center justify-between hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Patients</p>
                    <div className="flex items-baseline mt-1">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white">1,482</h3>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Active records database</p>
                  </div>
                  <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-sm border border-purple-100 dark:border-purple-800">
                    <span className="material-symbols-outlined text-2xl">personal_injury</span>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl flex items-center justify-between hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-700 shadow-sm border-l-4 border-l-red-500">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Critical Alerts</p>
                    <div className="flex items-baseline mt-1">
                      <h3 className="text-3xl font-bold text-red-600 dark:text-red-400">3</h3>
                      <span className="ml-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded-full border border-red-100 dark:border-red-800">Action Req.</span>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">High priority cases</p>
                  </div>
                  <div className="w-14 h-14 bg-red-50 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-red-500 dark:text-red-400 animate-[pulse_3s_ease-in-out_infinite] shadow-sm border border-red-100 dark:border-red-800">
                    <span className="material-symbols-outlined text-2xl">warning_amber</span>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl flex items-center justify-between hover:shadow-lg transition-shadow duration-300 border border-slate-100 dark:border-slate-700 shadow-sm">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Consultations</p>
                    <div className="flex items-baseline mt-1">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white">5h 20m</h3>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Time spent today</p>
                  </div>
                  <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-sm border border-teal-100 dark:border-teal-800">
                    <span className="material-symbols-outlined text-2xl">schedule</span>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Critical Attention Section */}
                  <section>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 mr-3 text-red-600 dark:text-red-400">
                          <span className="material-symbols-outlined text-sm">priority_high</span>
                        </span>
                        Critical Attention Needed
                      </h2>
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors">View ER Status</button>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm">
                      <div className="divide-y divide-slate-100 dark:divide-slate-700">
                        {/* Patient 1 */}
                        <div className="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors flex items-center group cursor-pointer">
                          <div className="relative">
                            <img 
                              alt="Patient James" 
                              className="w-14 h-14 rounded-full object-cover ring-2 ring-white dark:ring-slate-700 shadow-sm" 
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8wi8w1-_hKZ-fWnrJWCf9ga2MGfWeAk7bFvIeiMfwYhHbCMoyIHFwZC0-YDNFg2EzOdtDFpNNTtK8zOYPGgmsjrLTYKKojQvZUZ_DuhGWrOplfSCNJ7pCmVJfZhN5_yCIyyBl85H_YtFT-Qg61KO2FZofQ302_abWyl6qdw5GsYQJ4_Cz1Cr7Yac617Xg2085JEzzt8jp37HKa09ypyTJ7NJAhDBvz08iLeGShqWirTMT78UA4aMME4_HDV9VlH4xJebVxXCcFOV9"
                            />
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                          </div>
                          <div className="ml-5 flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h4 className="text-base font-bold text-slate-900 dark:text-white">James Rodriguez</h4>
                                <p className="text-xs font-medium text-slate-400">ID: #892-002</p>
                              </div>
                              <span className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-800 text-xs px-3 py-1 rounded-full font-semibold flex items-center">
                                <span className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full mr-2"></span>
                                Arrhythmia Alert
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300">HR spiked to <span className="font-semibold text-slate-900 dark:text-white">140bpm</span> at rest. Monitoring required immediately.</p>
                          </div>
                          <button className="ml-4 w-9 h-9 rounded-full bg-transparent hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-all shadow-none hover:shadow-sm">
                            <span className="material-symbols-outlined">chevron_right</span>
                          </button>
                        </div>

                        {/* Patient 2 */}
                        <div className="p-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors flex items-center group cursor-pointer">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-lg ring-2 ring-white dark:ring-slate-700 shadow-sm">AS</div>
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-orange-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                          </div>
                          <div className="ml-5 flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h4 className="text-base font-bold text-slate-900 dark:text-white">Amanda Smith</h4>
                                <p className="text-xs font-medium text-slate-400">ID: #442-190</p>
                              </div>
                              <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-100 dark:border-orange-800 text-xs px-3 py-1 rounded-full font-semibold flex items-center">
                                <span className="w-1.5 h-1.5 bg-orange-500 dark:bg-orange-400 rounded-full mr-2"></span>
                                Abnormal Labs
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Potassium levels critically low (<span className="font-semibold text-slate-900 dark:text-white">2.8 mmol/L</span>).</p>
                          </div>
                          <button className="ml-4 w-9 h-9 rounded-full bg-transparent hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-all shadow-none hover:shadow-sm">
                            <span className="material-symbols-outlined">chevron_right</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Today's Schedule */}
                  <section>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-3 text-blue-600 dark:text-blue-400">
                          <span className="material-symbols-outlined text-sm">calendar_month</span>
                        </span>
                        Today's Schedule
                      </h2>
                      <div className="flex space-x-3">
                        <button className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors shadow-sm flex items-center">
                          <span className="material-symbols-outlined text-sm mr-1">filter_list</span>
                          Filter
                        </button>
                        <button className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors shadow-blue-200 flex items-center">
                          <span className="material-symbols-outlined text-sm mr-1">add</span>
                          Add New
                        </button>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
                      <div className="relative pl-8 border-l border-slate-200 dark:border-slate-600 space-y-10">
                        {/* Completed Task */}
                        <div className="relative">
                          <span className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-600 border-4 border-white dark:border-slate-800 shadow-sm"></span>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 w-24">09:00 AM</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">Completed</span>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 border border-slate-100 dark:border-slate-700 opacity-75">
                            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 line-through decoration-slate-400 dark:decoration-slate-500">Morning Rounds - Ward A</h4>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Team meeting and handover</p>
                          </div>
                        </div>

                        {/* In Progress */}
                        <div className="relative">
                          <span className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full bg-blue-500 border-4 border-white dark:border-slate-800 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]"></span>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 w-24">10:30 AM</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">In Progress</span>
                          </div>
                          <div className="bg-white dark:bg-slate-700/50 rounded-xl p-5 shadow-lg shadow-blue-50 dark:shadow-blue-900/20 border border-blue-100 dark:border-blue-800/50 relative overflow-hidden group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl"></div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Michael Chen</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                                  <span className="material-symbols-outlined text-sm mr-1 text-slate-400 dark:text-slate-500">medical_services</span>
                                  Follow-up: Post-surgery checkup
                                </p>
                              </div>
                              <div className="flex -space-x-3 h-10">
                                <img 
                                  alt="Patient" 
                                  className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 object-cover shadow-sm z-10" 
                                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrSvJRDKshycjv-vK1wANlMomPOGVKkGKNGcN5x61mUm8G88mfSVtSC2a3mBr4CSY8vbOJ1_QWCoer3jraTxFmHBWs_rmNTX4IGKNXKmhoQw9mLRyZfMZltmXvjpC9VIKeEzHPEuRgM76DnJMgPhJ8_givLW4fxJ6nGWwZXEtQUkjlZCFh01cqT9KMIpKhk1Vz85P4vVGXkqkviW8rdI9uHuCMgY0PWsRvO_sg2mdr7-YNQdxQe097VMeWNBPHd8VALmr2nIsSLjYU"
                                />
                                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 bg-slate-100 dark:bg-slate-600 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400 shadow-sm z-0">
                                  <span className="material-symbols-outlined text-lg">history</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex gap-3">
                              <button className="flex-1 bg-blue-600 text-white text-xs py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md shadow-blue-100 dark:shadow-blue-900/30">Start Consultation</button>
                              <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs py-2 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-colors font-semibold">View Profile</button>
                            </div>
                          </div>
                        </div>

                        {/* Upcoming 1 */}
                        <div className="relative">
                          <span className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-slate-700 border-4 border-slate-200 dark:border-slate-600 shadow-sm"></span>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 w-24">11:15 AM</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">Upcoming</span>
                          </div>
                          <div className="bg-white dark:bg-slate-700/30 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Emma Wilson</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">New Patient Consultation</p>
                              </div>
                              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400">
                                <span className="material-symbols-outlined">arrow_forward</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Upcoming 2 - Remote */}
                        <div className="relative">
                          <span className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-slate-700 border-4 border-purple-200 dark:border-purple-800 shadow-sm"></span>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 w-24">01:00 PM</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800">Remote</span>
                          </div>
                          <div className="bg-white dark:bg-slate-700/30 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-3">
                                <span className="material-symbols-outlined text-sm">videocam</span>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Video Call: Robert Fox</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Review MRI Results</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-8">
                  {/* Department Efficiency Chart */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-white opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Department Efficiency</h3>
                        <button className="text-white/70 hover:text-white transition-colors">
                          <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                      </div>
                      <p className="text-blue-100 text-xs mb-6 font-medium bg-blue-500/30 inline-block px-2 py-1 rounded">Weekly patient recovery rate</p>
                      <div className="flex items-end justify-between h-32 space-x-2.5">
                        <div className="w-full bg-white/20 rounded-t-sm h-[40%] hover:bg-white/30 transition-colors cursor-pointer" title="Monday"></div>
                        <div className="w-full bg-white/20 rounded-t-sm h-[60%] hover:bg-white/30 transition-colors cursor-pointer" title="Tuesday"></div>
                        <div className="w-full bg-white/20 rounded-t-sm h-[45%] hover:bg-white/30 transition-colors cursor-pointer" title="Wednesday"></div>
                        <div className="w-full bg-white/20 rounded-t-sm h-[75%] hover:bg-white/30 transition-colors cursor-pointer" title="Thursday"></div>
                        <div className="w-full bg-white rounded-t-sm h-[85%] shadow-[0_0_15px_rgba(255,255,255,0.4)] relative group cursor-pointer" title="Friday">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">85%</div>
                        </div>
                        <div className="w-full bg-white/20 rounded-t-sm h-[65%] hover:bg-white/30 transition-colors cursor-pointer" title="Saturday"></div>
                        <div className="w-full bg-white/20 rounded-t-sm h-[50%] hover:bg-white/30 transition-colors cursor-pointer" title="Sunday"></div>
                      </div>
                      <div className="mt-3 flex justify-between text-[10px] font-medium text-blue-100 uppercase tracking-wide">
                        <span>Mon</span>
                        <span className="text-white font-bold">Fri</span>
                        <span>Sun</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all group flex flex-col items-center justify-center text-center h-32">
                      <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-all">
                        <span className="material-symbols-outlined text-xl">post_add</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">New Prescription</span>
                    </button>
                    <button className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-100 dark:hover:border-indigo-700 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 transition-all group flex flex-col items-center justify-center text-center h-32">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-all">
                        <span className="material-symbols-outlined text-xl">note_add</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Request Lab</span>
                    </button>
                    <button className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-emerald-100 dark:hover:border-emerald-700 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/20 transition-all group flex flex-col items-center justify-center text-center h-32">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 transition-all">
                        <span className="material-symbols-outlined text-xl">person_add</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Admit Patient</span>
                    </button>
                    <button className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-purple-100 dark:hover:border-purple-700 hover:bg-purple-50/30 dark:hover:bg-purple-900/20 transition-all group flex flex-col items-center justify-center text-center h-32">
                      <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/50 transition-all">
                        <span className="material-symbols-outlined text-xl">video_call</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Tele-Health</span>
                    </button>
                  </div>

                  {/* Recent Messages */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-bold text-slate-800 dark:text-white">Recent Messages</h3>
                      <a className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline" href="#">View All</a>
                    </div>
                    <div className="space-y-5">
                      {/* Message 1 */}
                      <div className="flex items-start space-x-3 cursor-pointer group p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <div className="relative">
                          <img 
                            alt="Dr. Lee" 
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-700 shadow-sm" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqFGqAXW3O3dxS6ZEECkbtHbwXViyl1upiXJ1au9f9TD2zifzv_HopzEr6VD970LT4BNtYI4UTTT6ePjCCR4EKG-vP-MafSBtho4makTHlxx5dDg8BydXyyAB8ynjkPKmpEtqD-UVCRrWT0MJ-O-NgtpWqiRkWP4_9-VQY4x6h32TMrAg3eDa6Ve8newMfe4BxnA4Pjw_siWDixXxDBHPhBguaMqaPModryZeTPca_PE44vN3Qba-BoK7PCxB9BRAykqkfmn8jL6Iv"
                          />
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">Dr. David Lee</h4>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">12m</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate group-hover:text-slate-700 dark:group-hover:text-slate-300">Can you check the X-rays for Room 302?</p>
                        </div>
                      </div>

                      {/* Message 2 */}
                      <div className="flex items-start space-x-3 cursor-pointer group p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-xs ring-2 ring-white dark:ring-slate-700 shadow-sm">RN</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">Nurse Sarah</h4>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">1h</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate group-hover:text-slate-700 dark:group-hover:text-slate-300">Medication administered to Mr. Jones.</p>
                        </div>
                      </div>

                      {/* Message 3 */}
                      <div className="flex items-start space-x-3 cursor-pointer group p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <div className="relative">
                          <img 
                            alt="Dr. Wilson" 
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-700 shadow-sm" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnv_m_V3so8JMIcEYAfH0Re_aOfoPoLYIo_xboJqozs-hzX7wNj9P-2lKavMtpQgIBgDmsR82rZt7mQJ9ZT7bYhiwnRFCa1H-hU6gxqhPOryhe1jdHcNWMH6rpiEjjqSe9q3OrZrNFTtO0G0qkGmP4D_O2MGhVGtxy4Cp8pmfALtbIhL-y-rdGa3J44kd2MfB1OAdMr3n2LpwKMKNPYtXe1Rv42LgaIMymD8qd_3WhtVEDBAO5tYrm9DFNaJem_kHYEdzK9P9AjXMp"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">Dr. Wilson</h4>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">3h</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate group-hover:text-slate-700 dark:group-hover:text-slate-300">Results are ready for review.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {activeNav === 'messages' && <DoctorMessages />}
        {activeNav === 'settings' && <DoctorSettings onLogout={onLogout} />}
        {/* Schedule section removed */}
        {activeNav === 'patients' && <DoctorPatients />}
        {activeNav === 'news' && <DoctorMedicalNews />}
        {activeNav === 'events' && <DoctorEvents />}
        {activeNav === 'approvals' && <DoctorApprovals />}
        {activeNav === 'earnings' && <DoctorEarnings />}
        {activeNav === 'appointmentRequests' && <DoctorPatients />}
      </main>

      {/* Notification Center */}
      <DoctorNotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </div>
  );
}