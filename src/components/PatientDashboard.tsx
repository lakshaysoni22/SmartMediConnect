import React, { useState, useEffect, useCallback, lazy, Suspense, startTransition, useDeferredValue } from 'react';
import { PatientSidebar } from './PatientSidebar';
import { PatientSectionHeader } from './PatientSectionHeader';
import { NotificationIcon } from './NotificationIcon';
import { PatientNotificationCenter } from './PatientNotificationCenter';
import { PageLoadingSpinner } from './PageLoadingSpinner';
import { DarkModeUtils } from '../utils/darkMode';
import { LogoutFeedbackModal } from './LogoutFeedbackModal';

// ✅ LAZY LOADING - Components load only when needed
const PatientAppointments = lazy(() => import('./PatientAppointments').then(m => ({ default: m.PatientAppointments })));
const PatientPrescriptions = lazy(() => import('./PatientPrescriptions').then(m => ({ default: m.PatientPrescriptions })));
const PatientTestResults = lazy(() => import('./PatientTestResults').then(m => ({ default: m.PatientTestResults })));
const PatientMessages = lazy(() => import('./PatientMessages').then(m => ({ default: m.PatientMessages })));
const PatientSettings = lazy(() => import('./PatientSettings').then(m => ({ default: m.PatientSettings })));
const PatientAIHealthBot = lazy(() => import('./PatientAIHealthBot').then(m => ({ default: m.PatientAIHealthBot })));
const PatientEvents = lazy(() => import('./PatientEvents').then(m => ({ default: m.PatientEvents })));
const PatientFinance = lazy(() => import('./PatientFinance').then(m => ({ default: m.PatientFinance })));
const PatientInsurance = lazy(() => import('./PatientInsurance').then(m => ({ default: m.PatientInsurance })));
const PatientFindDoctor = lazy(() => import('./PatientFindDoctor').then(m => ({ default: m.PatientFindDoctor })));
const MapView = lazy(() => import('./MapView').then(m => ({ default: m.MapView })));
const PatientEmergency = lazy(() => import('./PatientEmergency').then(m => ({ default: m.PatientEmergency })));
const PatientDataAccess = lazy(() => import('./PatientDataAccess').then(m => ({ default: m.PatientDataAccess })));
const FeedbackPage = lazy(() => import('./patient-portal/FeedbackPage').then(m => ({ default: m.FeedbackPage })));

interface PatientDashboardProps {
  onLogout: () => void;
  onSwitchRole?: () => void;
}

export function PatientDashboard({ onLogout, onSwitchRole }: PatientDashboardProps) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogoutFeedback, setShowLogoutFeedback] = useState(false);

  useEffect(() => {
    // Initialize dark mode state
    setIsDarkMode(DarkModeUtils.get());
    
    // Subscribe to dark mode changes from any source
    const unsubscribe = DarkModeUtils.subscribe((isDark) => {
      setIsDarkMode(isDark);
    });
    
    return () => unsubscribe();
  }, []);

  // ✅ OPTIMIZED: Memoized callback
  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Listen for notification center open events
  useEffect(() => {
    const handleOpenNotifications = () => {
      setShowNotifications(true);
    };

    window.addEventListener('openNotificationCenter', handleOpenNotifications);
    return () => {
      window.removeEventListener('openNotificationCenter', handleOpenNotifications);
    };
  }, []);

  // ✅ OPTIMIZED: Memoized callback
  const performLogout = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔴 Patient Portal: Performing logout after feedback...');
    }
    setShowLogoutFeedback(false);
    // Small delay to allow success modal animation to complete
    setTimeout(() => {
      onLogout();
    }, 300);
  }, [onLogout]);

  // ✅ OPTIMIZED: Memoized callback for logout
  const handleLogoutClick = useCallback(() => {
    setShowLogoutFeedback(true);
  }, []);

  // ✅ OPTIMIZED: Memoized callback for dark mode toggle
  const handleDarkModeToggle = useCallback(() => {
    DarkModeUtils.toggle();
  }, []);

  // ✅ FIX: Wrap navigation in startTransition to prevent suspension errors
  const handleNavigate = useCallback((nav: string) => {
    startTransition(() => {
      setActiveNav(nav);
    });
  }, []);

  useEffect(() => {
    const targetPath = activeNav === 'map-view' ? '/map-view' : '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ patientNav: activeNav }, '', targetPath);
    }
  }, [activeNav]);

  useEffect(() => {
    const syncNavFromPath = () => {
      if (window.location.pathname === '/map-view') {
        setActiveNav('map-view');
      } else if (activeNav === 'map-view') {
        setActiveNav('finddoctor');
      }
    };

    window.addEventListener('popstate', syncNavFromPath);
    return () => window.removeEventListener('popstate', syncNavFromPath);
  }, [activeNav]);

  // ✅ OPTIMIZED: Render content function (removed useMemo to fix suspension issue)
  const renderContent = () => {
    switch (activeNav) {
      case 'appointments':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientAppointments /></Suspense>
          </div>
        );
      case 'events':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientEvents /></Suspense>
          </div>
        );
      case 'messages':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientMessages /></Suspense>
          </div>
        );
      case 'results':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientTestResults /></Suspense>
          </div>
        );
      case 'finddoctor':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientFindDoctor onNavigate={handleNavigate} /></Suspense>
          </div>
        );
      case 'map-view':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><MapView onNavigate={handleNavigate} /></Suspense>
          </div>
        );
      case 'prescriptions':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientPrescriptions /></Suspense>
          </div>
        );
      case 'insurance':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientInsurance /></Suspense>
          </div>
        );
      case 'finance':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientFinance /></Suspense>
          </div>
        );
      case 'dataaccess':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientDataAccess /></Suspense>
          </div>
        );
      case 'emergency':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientEmergency onNavigate={handleNavigate} /></Suspense>
          </div>
        );
      case 'feedback':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><FeedbackPage onNavigate={handleNavigate} /></Suspense>
          </div>
        );
      case 'settings':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientSettings onLogout={handleLogoutClick} onSwitchRole={onSwitchRole} darkMode={isDarkMode} onToggleDarkMode={handleDarkModeToggle} /></Suspense>
          </div>
        );
      case 'healthbot':
        return (
          <div className="h-full flex flex-col overflow-hidden">
            <Suspense fallback={<PageLoadingSpinner />}><PatientAIHealthBot onNavigate={handleNavigate} /></Suspense>
          </div>
        );
      case 'dashboard':
      default:
        return (
          <div className="h-full overflow-y-auto flex flex-col bg-slate-50/50 dark:bg-black">
            {/* Header */}
            <PatientSectionHeader
              icon="dashboard"
              title="Dashboard"
              subtitle="Overview of your health metrics and recent activities"
            />

            {/* Main Dashboard Content */}
            <div className="flex-1 overflow-y-auto p-4 md:px-8 md:pt-2 md:pb-8 space-y-8 pb-20">
              {/* Welcome Header */}
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    Good Morning, Sarah
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2 mt-2">
                    <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                    Generate Report
                  </button>
                </div>
              </div>

              {/* Health Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Heart Rate */}
                <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="absolute -right-4 -top-4 bg-red-50 dark:bg-red-900/20 size-24 rounded-full blur-2xl group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-all"></div>
                  <div className="flex justify-between items-start z-10">
                    <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-500">
                      <span className="material-symbols-outlined">monitor_heart</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">+2%</span>
                  </div>
                  <div className="z-10">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Heart Rate</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">72</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">bpm</p>
                    </div>
                  </div>
                </div>

                {/* Blood Pressure */}
                <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="absolute -right-4 -top-4 bg-blue-50 dark:bg-blue-900/20 size-24 rounded-full blur-2xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-all"></div>
                  <div className="flex justify-between items-start z-10">
                    <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-500">
                      <span className="material-symbols-outlined">favorite</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">Stable</span>
                  </div>
                  <div className="z-10">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Blood Pressure</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">120/80</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">mmHg</p>
                    </div>
                  </div>
                </div>

                {/* Weight */}
                <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="absolute -right-4 -top-4 bg-orange-50 dark:bg-orange-900/20 size-24 rounded-full blur-2xl group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-all"></div>
                  <div className="flex justify-between items-start z-10">
                    <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-500">
                      <span className="material-symbols-outlined">monitor_weight</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">-1.5%</span>
                  </div>
                  <div className="z-10">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Weight</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">68</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">kg</p>
                    </div>
                  </div>
                </div>

                {/* Glucose */}
                <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="absolute -right-4 -top-4 bg-purple-50 dark:bg-purple-900/20 size-24 rounded-full blur-2xl group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-all"></div>
                  <div className="flex justify-between items-start z-10">
                    <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-500">
                      <span className="material-symbols-outlined">water_drop</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">Normal</span>
                  </div>
                  <div className="z-10">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Glucose</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">95</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">mg/dL</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left Column - Appointment & Activity */}
                <div className="xl:col-span-2 space-y-6">
                  {/* Upcoming Appointment */}
                  <div className="glass-panel rounded-2xl p-1 overflow-hidden shadow-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center relative">
                      <div className="absolute top-0 right-0 p-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 uppercase tracking-wider">
                          <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>
                          Up Next
                        </span>
                      </div>
                      <div className="shrink-0 relative">
                        <div 
                          className="size-24 md:size-32 rounded-2xl bg-cover bg-center shadow-lg" 
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFbd6UI0yBVmxX-JHZifTFnFd3xDscyjSaXZkBHWJYNT3oucHr6wVUC_lVXD2AAfa-6g96n9ugHGzivpJ7xDph4RuDKSCABN4dNKpB9LVhenXDTWIF25UXC0Zh7cZVyydW6qaAsE3ToVkGU6b1J5T1VjJETnEGeT2JZsKzUTSAnTzFYqaVTvEJPjrfoyxgvmrvyeW96mjPJlCU9BANHkDnM1Uvq-nMyD9W9a9zPZ7UxAcjPCkHGss6oQM_buzo3k23A9QHPU5iuLHB')" }}
                        ></div>
                        <div className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-800 p-1.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                            <span className="material-symbols-outlined text-xl block">videocam</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Dr. Emily Chen</h3>
                          <p className="text-slate-500 dark:text-slate-400 font-medium">Senior Cardiologist</p>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-600">
                            <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                            <span className="font-semibold">10:00 AM - 10:30 AM</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-600">
                            <span className="material-symbols-outlined text-primary text-lg">calendar_today</span>
                            <span className="font-semibold">Today, {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                        <div className="pt-2 flex flex-wrap gap-3">
                          <button className="flex-1 sm:flex-none bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-lg">video_call</span>
                            Join Telehealth Call
                          </button>
                          <button className="flex-1 sm:flex-none bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-white px-6 py-2.5 rounded-lg font-semibold border border-slate-200 dark:border-slate-600 transition-all">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="glass-panel rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h3>
                      <a className="text-sm font-medium text-primary hover:underline" href="#">View All</a>
                    </div>
                    <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-8">
                      {/* Activity 1 */}
                      <div className="relative group">
                        <div className="absolute -left-[21px] top-1 size-3 bg-white dark:bg-slate-800 border-2 border-primary rounded-full group-hover:scale-125 transition-transform"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <p className="text-slate-900 dark:text-white font-semibold">Blood Test Results Available</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Lipid Panel and CBC Analysis completed.</p>
                          </div>
                          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">2 hours ago</span>
                        </div>
                        <button className="mt-2 text-sm text-primary font-medium hover:text-blue-700 flex items-center gap-1">
                          View Results <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                      </div>

                      {/* Activity 2 */}
                      <div className="relative group">
                        <div className="absolute -left-[21px] top-1 size-3 bg-slate-300 dark:bg-slate-600 rounded-full group-hover:bg-primary transition-colors"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <p className="text-slate-900 dark:text-white font-semibold">Prescription Refilled: Lisinopril</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Sent to Walgreens Pharmacy on Main St.</p>
                          </div>
                          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">Yesterday</span>
                        </div>
                      </div>

                      {/* Activity 3 */}
                      <div className="relative group">
                        <div className="absolute -left-[21px] top-1 size-3 bg-slate-300 dark:bg-slate-600 rounded-full group-hover:bg-primary transition-colors"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center justify-between">
                            <p className="text-slate-900 dark:text-white font-semibold">Appointment Completed</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Dr. Sarah Smith (General Practitioner)</p>
                          </div>
                          <span className="text-xs font-medium text-slate-400 whitespace-nowrap">Jan 20, 2026</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Quick Actions, Care Team, Health Tip */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="glass-panel rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleNavigate('appointments')}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-primary transition-colors border border-blue-100 dark:border-blue-900/50"
                      >
                        <span className="material-symbols-outlined text-3xl">calendar_add_on</span>
                        <span className="text-xs font-bold text-center">Book Visit</span>
                      </button>
                      <button 
                        onClick={() => handleNavigate('prescriptions')}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 transition-colors border border-emerald-100 dark:border-emerald-900/50"
                      >
                        <span className="material-symbols-outlined text-3xl">pill</span>
                        <span className="text-xs font-bold text-center">Refill Rx</span>
                      </button>
                      <button 
                        onClick={() => handleNavigate('messages')}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 dark:hover:bg-violet-900/30 text-violet-600 dark:text-violet-400 transition-colors border border-violet-100 dark:border-violet-900/50"
                      >
                        <span className="material-symbols-outlined text-3xl">chat</span>
                        <span className="text-xs font-bold text-center">Message Dr.</span>
                      </button>
                      <button 
                        onClick={() => handleNavigate('insurance')}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-600 dark:text-amber-400 transition-colors border border-amber-100 dark:border-amber-900/50"
                      >
                        <span className="material-symbols-outlined text-3xl">receipt_long</span>
                        <span className="text-xs font-bold text-center">Pay Bill</span>
                      </button>
                    </div>
                  </div>

                  {/* Care Team */}
                  <div className="glass-panel rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Care Team</h3>
                      <button className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700">
                        <span className="material-symbols-outlined text-slate-400 text-xl">more_horiz</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="size-10 rounded-full bg-cover bg-center" 
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxc2RD_85S-q_MPlpKx8F6KYUqFAHxN_Wiugy9OBXxadbIicbE_bsx4or0onM1R0Yd9kCAVMw99kEI8mPETNh8UxjRZwS3mveqz64UJkVojFECGjXlTLkDSzCd6iuwQuqBIFpCN6AXv1MthGR4-vSPuqr4LIBx7NvOTU2_8Mkb69XIbmMw32Fx1jtthVEyUBSWj8RGCWbE4aauCmTPRw7ZbAuCl96hTMrzqRp-m8oTeYiQnN79LenOfR0cfLxcuCC3QgE5obIxghxg')" }}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Dr. James Wilson</p>
                          <p className="text-xs text-slate-500 truncate">General Practitioner</p>
                        </div>
                        <button className="text-primary hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-full transition-colors">
                          <span className="material-symbols-outlined text-xl">chat_bubble</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <div 
                          className="size-10 rounded-full bg-cover bg-center" 
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDT_WkNq1TK6SA4QkPmjHJBrSy1mPyL6kclOOO9Tev4xDgKizA3qKRdgjNy5GL7r8XM1TRve27RCgrG6XJPBIIcZvhRqQaSF92rvhdOt9UdBqWNLDDWquXS9pL4XBD5TAPs112vTGLF5rCXLXpY0b9A4lh7dAW5FO04vMqZwjm24w1Cg4zGSUxYLwoLmX3zgc_yob45R4XN2NogHuXkUYzXNXi1u5BS9WMxOuTyunkhcNbGak3FEzO9Gi1kDMHdbuFHCJQ4bDJH2_mt')" }}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Dr. Anita Patel</p>
                          <p className="text-xs text-slate-500 truncate">Dermatologist</p>
                        </div>
                        <button className="text-primary hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-full transition-colors">
                          <span className="material-symbols-outlined text-xl">chat_bubble</span>
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleNavigate('finddoctor')}
                      className="w-full mt-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Find a Specialist
                    </button>
                  </div>

                  {/* Health Tip */}
                  <div className="rounded-2xl p-6 bg-gradient-to-br from-primary to-blue-600 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
                    <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl text-white/10 rotate-12">vaccines</span>
                    <div className="relative z-10">
                      <p className="text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">Health Tip</p>
                      <h4 className="font-bold text-lg mb-2">Flu Season is Here</h4>
                      <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                        Protect yourself and your family. Schedule your annual flu shot today at no cost.
                      </p>
                      <button 
                        onClick={() => setActiveNav('healthschedule')}
                        className="text-xs bg-white text-primary font-bold px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Schedule Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <style>{`
              .glass-panel {
                background: rgba(255, 255, 255, 0.7);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.5);
              }
              .dark .glass-panel {
                background: rgba(30, 41, 59, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.1);
              }
            `}</style>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-black">
      {/* Unified Sidebar */}
      <PatientSidebar activeNav={activeNav} onNavigate={handleNavigate} isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden relative z-10 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111418] shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#137fec] to-blue-600 rounded-full h-10 w-10 ring-2 ring-white shadow-sm flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[20px]">person</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">Lakshay Soni</span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="text-slate-500 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        {/* Content Area with smooth transition */}
        <div key={activeNav} className="flex-1 overflow-hidden page-transition">
          {renderContent()}
        </div>

        {/* Add CSS for smooth page transitions */}
        <style>{`
          .page-transition {
            animation: fadeIn 0.1s ease-in-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </main>

      {/* Notification Center */}
      {showNotifications && (
        <PatientNotificationCenter onClose={() => setShowNotifications(false)} />
      )}

      {/* Logout Feedback Modal */}
      {showLogoutFeedback && (
        <LogoutFeedbackModal 
          onSubmit={performLogout} 
          onSkip={performLogout} 
          portalType="patient" 
        />
      )}
    </div>
  );
}