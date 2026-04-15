import React, { useState, useEffect } from 'react';
import { PageLoadingSpinner } from './PageLoadingSpinner';
import { AdminNotificationCenter } from './AdminNotificationCenter';
import { DarkModeUtils } from '../utils/darkMode';
import { LogoutFeedbackModal } from './LogoutFeedbackModal';
import { AdminDarkModeToggle } from './AdminDarkModeToggle';

// ✅ EAGER LOADING - All admin components loaded immediately for zero errors
import { AdminEarnings } from './AdminEarnings';
import { AdminEvents } from './AdminEvents';
import { AdminEventsHub } from './AdminEventsHub';
import { AdminAlertsComplaints } from './AdminAlertsComplaints';
import { AdminFinancials } from './AdminFinancials';
import { AdminDashboard } from './AdminDashboard';
import { AdminSettings } from './AdminSettings';
import { AdminStaff } from './AdminStaff';
import { AdminApprovals } from './AdminApprovals';
import { AdminDashboardAdvanced } from './AdminDashboardAdvanced';
import { AdminStaffAdvanced } from './AdminStaffAdvanced';

export function AdminPortal({ onBack }: { onBack: () => void }) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showLogoutFeedback, setShowLogoutFeedback] = useState(false);
  const [error, setError] = useState('');

  // CRITICAL: Dark mode is initialized in darkMode.ts utility
  // NO need for subscription in AdminPortal - it causes duplicate listeners
  // The toggle component handles all dark mode updates

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

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

  const handleLogin = () => {
    // Validate credentials
    if (!adminId || !password) {
      setError('Please enter both Admin ID and Password');
      return;
    }
    
    // If validation passes, proceed with login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setShowLogoutFeedback(true);
  };

  const performLogout = () => {
    console.log('🔴 Admin Portal: Performing logout after feedback...');
    setShowLogoutFeedback(false);
    // Small delay to allow success modal animation to complete
    setTimeout(() => {
      // ✅ CRITICAL: Remove dark mode class AND clear all dark mode states
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mediconnectAppDarkMode', 'false');
      setIsLoggedIn(false);
      setPassword('');
      setActiveSection('dashboard');
      onBack();
    }, 300);
  };

  // Show Dashboard after login
  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-black transition-colors duration-200">
        {/* Sidebar */}
        <aside className={`flex-shrink-0 bg-white dark:bg-[#111418] border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 md:h-screen z-30 relative transition-all duration-300 ${
          isSidebarCollapsed ? 'w-20' : 'w-full md:w-64'
        }`}>
          {/* Hamburger Toggle Button - Desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden md:flex absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-md z-30 group"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[16px] group-hover:text-[#0077b6] transition-colors">
              {isSidebarCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>

          <div className={`h-16 flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'px-6'} border-b border-slate-100 dark:border-slate-800`}>
            {!isSidebarCollapsed ? (
              <>
                <div className="w-8 h-8 bg-[#0077b6] rounded-lg flex items-center justify-center text-white mr-3 shadow-sm">
                  <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">SmartMediConnect</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Admin Portal</span>
                </div>
              </>
            ) : (
              <div className="w-8 h-8 bg-[#0077b6] rounded-lg flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
              </div>
            )}
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {/* 1. Dashboard */}
            <button 
              onClick={() => setActiveSection('dashboard')}
              className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-all w-full text-left ${
                activeSection === 'dashboard'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0077b6] dark:text-blue-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={isSidebarCollapsed ? 'Dashboard' : ''}
            >
              <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`}>dashboard</span>
              {!isSidebarCollapsed && <span className="text-sm font-medium">Dashboard</span>}
            </button>

            {/* 2. Earnings */}
            <button 
              onClick={() => setActiveSection('earnings')}
              className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-all w-full text-left ${
                activeSection === 'earnings'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0077b6] dark:text-blue-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={isSidebarCollapsed ? 'Earnings' : ''}
            >
              <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`} style={{ fontVariationSettings: activeSection === 'earnings' ? "'FILL' 1" : "'FILL' 0" }}>monetization_on</span>
              {!isSidebarCollapsed && <span className="text-sm font-medium">Earnings</span>}
            </button>

            {/* 3. Staff */}
            <button 
              onClick={() => setActiveSection('staff')}
              className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-all w-full text-left ${
                activeSection === 'staff'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0077b6] dark:text-blue-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={isSidebarCollapsed ? 'Staff' : ''}
            >
              <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`}>groups</span>
              {!isSidebarCollapsed && <span className="text-sm font-medium">Staff</span>}
            </button>

            {/* 4. Financial */}
            <button 
              onClick={() => setActiveSection('financials')}
              className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-all w-full text-left ${
                activeSection === 'financials'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0077b6] dark:text-blue-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={isSidebarCollapsed ? 'Financials' : ''}
            >
              <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`} style={{ fontVariationSettings: activeSection === 'financials' ? "'FILL' 1" : "'FILL' 0" }}>account_balance</span>
              {!isSidebarCollapsed && <span className="text-sm font-medium">Financials</span>}
            </button>

            {/* 5. Events */}
            <button 
              onClick={() => setActiveSection('events')}
              className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-all w-full text-left ${
                activeSection === 'events'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0077b6] dark:text-blue-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={isSidebarCollapsed ? 'Events' : ''}
            >
              <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`} style={{ fontVariationSettings: activeSection === 'events' ? "'FILL' 1" : "'FILL' 0" }}>calendar_today</span>
              {!isSidebarCollapsed && <span className="text-sm font-medium">Events</span>}
            </button>

            {/* 6. Approvals */}
            <button 
              onClick={() => setActiveSection('approvals')}
              className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-all w-full text-left ${
                activeSection === 'approvals'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0077b6] dark:text-blue-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={isSidebarCollapsed ? 'Approvals' : ''}
            >
              <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`}>check_circle</span>
              {!isSidebarCollapsed && <span className="text-sm font-medium">Approvals</span>}
            </button>

            {/* 7. Feedback */}
            <button 
              onClick={() => setActiveSection('alerts')}
              className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-all w-full text-left ${
                activeSection === 'alerts'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0077b6] dark:text-blue-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={isSidebarCollapsed ? 'Feedback' : ''}
            >
              <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`} style={{ fontVariationSettings: activeSection === 'alerts' ? "'FILL' 1" : "'FILL' 0" }}>report</span>
              {!isSidebarCollapsed && <span className="text-sm font-medium">Feedback</span>}
            </button>

            {/* 8. Settings */}
            <button 
              onClick={() => setActiveSection('settings')}
              className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : ''} px-4 py-3 rounded-xl transition-all w-full text-left ${
                activeSection === 'settings'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-[#0077b6] dark:text-blue-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={isSidebarCollapsed ? 'Settings' : ''}
            >
              <span className={`material-symbols-outlined text-[22px] ${isSidebarCollapsed ? '' : 'mr-3'}`}>settings</span>
              {!isSidebarCollapsed && <span className="text-sm font-medium">Settings</span>}
            </button>
          </nav>
          
          {/* Removed Sign Out button from here - now in Security settings */}
        </aside>

        {/* Main Content - ✅ NO SUSPENSE NEEDED - All components eagerly loaded */}
        <main className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
          {activeSection === 'dashboard' && <AdminDashboardAdvanced onNavigate={setActiveSection} />}
          {activeSection === 'earnings' && <AdminEarnings />}
          {activeSection === 'staff' && <AdminStaffAdvanced />}
          {activeSection === 'financials' && <AdminFinancials />}
          {activeSection === 'events' && <AdminEventsHub />}
          {activeSection === 'alerts' && <AdminAlertsComplaints />}
          {activeSection === 'settings' && <AdminSettings onLogout={handleLogout} />}
          {activeSection === 'approvals' && <AdminApprovals onNavigate={setActiveSection} onLogout={handleLogout} />}
        </main>

        {/* Notification Center Modal */}
        {showNotifications && <AdminNotificationCenter onClose={() => setShowNotifications(false)} />}

        {/* Logout Feedback Modal */}
        {showLogoutFeedback && (
          <LogoutFeedbackModal
            onSubmit={performLogout}
            onSkip={performLogout}
            portalType="admin"
          />
        )}
      </div>
    );
  }

  // Show Login Page
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden bg-slate-50 dark:bg-[#0f172a]">
      {/* Dark Mode Toggle - Optimized Component */}
      <AdminDarkModeToggle />

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=1080&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-slate-100/40 dark:bg-[#0f172a]/80 backdrop-blur-[3px]" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[420px] flex flex-col gap-6 rounded-2xl border border-white/60 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:bg-[#1e293b]/70 dark:border-white/10 sm:p-10 transition-all duration-300">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="group absolute left-6 top-6 flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-[#0077b6] dark:text-slate-400 dark:hover:text-white"
        >
          <span className="material-symbols-outlined transition-transform duration-300 group-hover:-translate-x-1" style={{ fontSize: '18px' }}>
            arrow_back
          </span>
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm ring-1 ring-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 dark:ring-blue-800/50">
            <span className="material-symbols-outlined text-[#0077b6] dark:text-blue-400" style={{ fontSize: '32px' }}>
              admin_panel_settings
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Hospital Admin Portal
            </h1>
            <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Secure access for hospital administration
            </p>
          </div>
        </div>

        {/* Login Instructions - Important */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-500 dark:border-amber-600 rounded-lg p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                warning
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-1.5">Important Login Instructions</h3>
              <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                <strong>Step 1:</strong> Enter your administrator email address<br/>
                <strong>Step 2:</strong> Type password <code className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 rounded font-mono font-bold text-amber-900 dark:text-amber-200">123456789</code> only<br/>
                <span className="text-amber-700 dark:text-amber-500 font-semibold mt-1 inline-block">⚠️ Portal will not open with any other password</span>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5 mt-2" onSubmit={handleLogin}>
          {/* Admin ID Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Administrator ID or Email
            </label>
            <div className="group relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none">
                <span 
                  className="material-symbols-outlined text-slate-400 group-focus-within:text-[#0077b6] transition-colors" 
                  style={{ fontSize: '20px' }}
                >
                  badge
                </span>
              </div>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white/50 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#0077b6] focus:bg-white focus:ring-2 focus:ring-[#0077b6]/10 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900"
                placeholder="admin@medsecure.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Password
              </label>
              <a className="text-xs font-semibold text-[#0077b6] hover:text-[#023e8a] hover:underline" href="#">
                Forgot Password?
              </a>
            </div>
            <div className="group relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none">
                <span 
                  className="material-symbols-outlined text-slate-400 group-focus-within:text-[#0077b6] transition-colors" 
                  style={{ fontSize: '20px' }}
                >
                  lock
                </span>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white/50 pl-10 pr-10 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#0077b6] focus:bg-white focus:ring-2 focus:ring-[#0077b6]/10 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 flex items-center rounded p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0077b6] text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-[#023e8a] hover:shadow-blue-600/30 focus:ring-2 focus:ring-[#0077b6] focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              login
            </span>
            <span className="text-sm font-bold">Secure Login</span>
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex flex-col items-center gap-5">
          <button
            onClick={onBack}
            className="group flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            <span>Not an administrator?</span>
            <span className="text-[#0077b6] font-semibold group-hover:underline decoration-[#0077b6]/50 underline-offset-4">
              Switch Portal
            </span>
          </button>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 dark:bg-emerald-900/20">
              <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400" style={{ fontSize: '14px' }}>
                verified_user
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                HIPAA Compliant
              </span>
            </div>
            <div className="flex gap-4 text-[11px] text-slate-400">
              <a className="hover:text-[#0077b6] transition-colors" href="#">
                Privacy Policy
              </a>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <a className="hover:text-[#0077b6] transition-colors" href="#">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-4 z-10 hidden text-[10px] uppercase tracking-widest text-slate-500/60 dark:text-white/20 md:block">
        © 2026 SmartMediConnect. For authorized personnel only.
      </div>
    </div>
  );
}