import React, { useState, useRef, useEffect } from 'react';
import { PatientHealthBot } from './PatientHealthBot';
import { PatientEmergency } from './PatientEmergency';
import { NotificationIcon } from './NotificationIcon';

/**
 * Demo component showing Health Bot with Emergency page navigation
 * This demonstrates how clicking the Emergency button navigates to the Emergency Hub
 */
export function PatientHealthBotWithEmergency() {
  const [showEmergency, setShowEmergency] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate receiving a notification - with proper cleanup
    const interval = setInterval(() => {
      setNotifications((prev) => prev + 1);
    }, 5000);
    
    // Cleanup function to clear interval on unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array - runs once on mount

  if (showEmergency) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-[#f6f7f8] dark:bg-[#101922]">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex w-72 flex-col h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111418] relative z-20">
          <div className="flex flex-col h-full p-6 justify-between">
            <div className="flex flex-col gap-8">
              {/* Branding */}
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#137fec] to-blue-600 flex items-center justify-center text-white shadow-lg shadow-[#137fec]/30">
                  <span className="material-symbols-outlined text-2xl">medical_services</span>
                </div>
                <div>
                  <h1 className="text-slate-900 dark:text-white font-bold leading-tight">Mediconnect</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Patient Portal</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => setShowEmergency(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
                >
                  <span className="material-symbols-outlined">home</span>
                  <span>Dashboard</span>
                </button>

                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors">
                  <span className="material-symbols-outlined">calendar_month</span>
                  <span>Appointments</span>
                </button>

                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors">
                  <span className="material-symbols-outlined">medication</span>
                  <span>Prescriptions</span>
                </button>

                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors">
                  <span className="material-symbols-outlined">description</span>
                  <span>Medical Records</span>
                </button>

                <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold transition-colors ring-1 ring-red-200 dark:ring-red-800">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>e911_emergency</span>
                  <span>Emergency</span>
                  <span className="ml-auto flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </button>

                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors">
                  <span className="material-symbols-outlined">health_metrics</span>
                  <span>Vitals</span>
                </button>
              </nav>
            </div>

            {/* Profile */}
            <div className="mt-auto">
              <div className="flex items-center gap-3 px-2">
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#137fec] to-blue-600 rounded-full size-10 ring-2 ring-white dark:ring-slate-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">person</span>
                  </div>
                  <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Lakshay Soni</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">ID: #89204</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
          {/* Header */}
          <header className="h-20 flex items-center justify-between px-6 lg:px-10 py-4 border-b border-slate-200/50 dark:border-slate-700/50 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <div className="flex items-center gap-4 lg:hidden">
              <button className="text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <span className="font-bold text-red-600">Emergency Hub</span>
            </div>
            <div className="hidden md:flex flex-col">
              <h2 className="font-bold text-slate-900 dark:text-white">Emergency Hub</h2>
              <p className="text-xs text-slate-500">Quick access to critical assistance</p>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-800/30 text-xs font-semibold">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>Location Sharing: Active</span>
              </div>
              <NotificationIcon />
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-xl font-medium shadow-lg hover:bg-slate-900 transition-colors">
                <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                <span className="text-sm">Help Line</span>
              </button>
            </div>
          </header>

          {/* Emergency Content */}
          <PatientEmergency onNavigate={(page) => {
            if (page !== 'emergency') {
              setShowEmergency(false);
            }
          }} />
        </main>
      </div>
    );
  }

  return <PatientHealthBot onNavigateToEmergency={() => setShowEmergency(true)} />;
}