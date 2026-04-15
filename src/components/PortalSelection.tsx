import React, { useState, useEffect } from 'react';
import { DarkModeUtils } from '../utils/darkMode';

interface PortalSelectionProps {
  onBack: () => void;
  onSelectPortal: (portal: 'patient' | 'provider' | 'admin') => void;
}

export function PortalSelection({ onBack, onSelectPortal }: PortalSelectionProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 🔥 FORCEFULLY ENSURE LIGHT MODE ON MOUNT
    // Clear dark mode from DOM immediately when Portal Selection loads
    document.documentElement.classList.remove('dark');
    
    // Set all dark mode keys to false
    localStorage.setItem('mediconnectAppDarkMode', 'false');
    localStorage.setItem('doctorPortalDarkMode', 'false');
    localStorage.setItem('patientPortalDarkMode', 'false');
    localStorage.setItem('adminPortalDarkMode', 'false');
    
    // Initialize dark mode state from utils
    const currentMode = DarkModeUtils.get();
    setIsDarkMode(currentMode);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🟢 PortalSelection mounted - Dark mode cleared, current mode:', currentMode);
    }

    // Subscribe to dark mode changes
    const unsubscribe = DarkModeUtils.subscribe((isDark) => {
      setIsDarkMode(isDark);
    });

    return unsubscribe;
  }, []);

  const handleDarkModeToggle = () => {
    const newMode = DarkModeUtils.toggle();
    setIsDarkMode(newMode);
  };

  return (
    <div className="flex min-h-screen w-full flex-col relative overflow-hidden justify-center bg-[#f6f7f8] dark:bg-[#101922]">
      {/* Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[50%] h-[50%] bg-[#137fec]/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-[#137fec]/5 rounded-full blur-[80px]"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-[#137fec] dark:hover:text-[#137fec] transition-colors group z-10"
      >
        <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform text-[20px] md:text-[24px]">
          arrow_back
        </span>
        <span className="font-medium text-sm md:text-base hidden sm:inline">Back to Home</span>
      </button>

      {/* Dark Mode Toggle */}
      <button
        onClick={handleDarkModeToggle}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-10 flex items-center justify-center size-10 md:size-11 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all hover:scale-110"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <span className="material-symbols-outlined text-yellow-500 text-[20px] md:text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            light_mode
          </span>
        ) : (
          <span className="material-symbols-outlined text-slate-700 text-[20px] md:text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            dark_mode
          </span>
        )}
      </button>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-16 md:py-12 md:px-10 lg:px-40">
        <div className="max-w-[1200px] w-full flex flex-col gap-8 md:gap-12">
          {/* Header */}
          <div className="text-center space-y-3 md:space-y-6 animate-fade-in-up">
            <h1 className="text-[#111418] dark:text-white font-black leading-tight tracking-[-0.033em] text-3xl md:text-4xl lg:text-5xl px-4">
              Your Health, Connected
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed text-base md:text-lg px-4">
              Welcome to the unified healthcare access point. Please select your portal below to securely access your dashboard.
            </p>
          </div>

          {/* Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {/* Patient Portal */}
            <div className="group glass-panel rounded-xl p-8 flex flex-col gap-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#137fec]">
                  <span className="material-symbols-outlined text-[32px]">person</span>
                </div>
                <span className="bg-blue-100 dark:bg-blue-900/40 text-[#137fec] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-xs">
                  Patients
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-[#111418] dark:text-white group-hover:text-[#137fec] transition-colors text-2xl">
                  Patient Portal
                </h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  Access your personal health records, view test results, and manage upcoming appointments.
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-auto">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
                  <span>View test results</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
                  <span>Book appointments</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="material-symbols-outlined text-green-500 text-[20px]">check_circle</span>
                  <span>Message care team</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-[#137fec] hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-[0_20px_60px_-15px_rgba(19,127,236,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(19,127,236,0.7)] hover:-translate-y-1 text-base"
                onClick={() => onSelectPortal('patient')}
              >
                <span>Login as Patient</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>

            {/* Doctor Portal */}
            <div className="group glass-panel rounded-xl p-8 flex flex-col gap-6 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600">
                  <span className="material-symbols-outlined text-[32px]">stethoscope</span>
                </div>
                <span className="bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider text-xs">
                  Doctors
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-[#111418] dark:text-white group-hover:text-teal-600 transition-colors text-2xl">
                  Doctor Portal
                </h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  Manage patient care, review daily schedules, and access integrated clinical tools securely.
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-auto">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="material-symbols-outlined text-teal-500 text-[20px]">check_circle</span>
                  <span>Manage patient care</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="material-symbols-outlined text-teal-500 text-[20px]">check_circle</span>
                  <span>Review schedules</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="material-symbols-outlined text-teal-500 text-[20px]">check_circle</span>
                  <span>Clinical tools</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-[0_20px_60px_-15px_rgba(20,184,166,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(20,184,166,0.7)] hover:-translate-y-1 text-base" onClick={() => onSelectPortal('provider')}>
                <span>Login as Doctor</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>

            {/* Admin Portal */}
            <div className="group glass-panel rounded-xl p-8 flex flex-col gap-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                  <span className="material-symbols-outlined text-[32px]">apartment</span>
                </div>
                <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider text-xs">
                  Admins
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-[#111418] dark:text-white group-hover:text-purple-600 transition-colors text-2xl">
                  Admin Portal
                </h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  Handle system configurations, staff management, and view operational analytics.
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-auto">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="material-symbols-outlined text-purple-500 text-[20px]">check_circle</span>
                  <span>System configuration</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="material-symbols-outlined text-purple-500 text-[20px]">check_circle</span>
                  <span>Staff management</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="material-symbols-outlined text-purple-500 text-[20px]">check_circle</span>
                  <span>Operational analytics</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-[0_20px_60px_-15px_rgba(147,51,234,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(147,51,234,0.7)] hover:-translate-y-1 text-base" onClick={() => onSelectPortal('admin')}>
                <span>Login as Admin</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}