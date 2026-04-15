import React from 'react';

export function CapabilitiesSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-bold text-slate-900 dark:text-white mb-2 text-3xl">
            Enterprise-Grade Capabilities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Designed for reliability, security, and speed when it matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {/* Telehealth - Large Card */}
          <div className="md:col-span-2 rounded-3xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 p-8 flex flex-col justify-between overflow-hidden relative group hover:shadow-xl transition-shadow">
            <div className="relative z-10">
              <div className="size-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center mb-6 shadow-inner">
                <span className="material-symbols-outlined text-[28px]">video_camera_front</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-2xl">
                Integrated Telehealth
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                Seamless HD video consultations integrated directly into patient charts. No external apps required.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 dark:opacity-20 pointer-events-none group-hover:scale-105 transition-transform duration-700">
              <span className="material-symbols-outlined text-orange-500 absolute -bottom-16 -right-16" style={{ fontSize: '240px' }}>
                video_chat
              </span>
            </div>
          </div>

          {/* AI Triage */}
          <div className="rounded-3xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 p-8 flex flex-col justify-between group hover:border-purple-400 transition-colors hover:shadow-lg">
            <div>
              <div className="size-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mb-6 shadow-inner">
                <span className="material-symbols-outlined text-[28px]">psychology</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-xl">
                AI-Assisted Triage
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Smart algorithms to prioritize critical cases instantly based on symptoms.
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-3xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 p-8 flex flex-col justify-between group hover:border-emerald-400 transition-colors hover:shadow-lg">
            <div>
              <div className="size-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center mb-6 shadow-inner">
                <span className="material-symbols-outlined text-[28px]">shield_lock</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-xl">
                Bank-Grade Security
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                End-to-end encryption for all sensitive patient data. HIPAA Compliant.
              </p>
            </div>
          </div>

          {/* Vitals Monitoring - Large Card */}
          <div className="md:col-span-2 rounded-3xl bg-gradient-to-r from-[#137fec] to-blue-700 text-white p-8 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <div className="size-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/30">
                <span className="material-symbols-outlined text-[28px] animate-pulse">monitor_heart</span>
              </div>
              <h3 className="font-bold mb-2 text-2xl">Real-time Vitals Monitoring</h3>
              <p className="text-white/80 max-w-sm">
                Live streams of patient vitals from connected ICU devices with instant alert systems for anomalies.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
              <svg preserveAspectRatio="none" style={{ height: '100%', width: '100%' }} viewBox="0 0 500 150">
                <path
                  className="animate-pulse"
                  d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                  style={{ stroke: 'none', fill: 'white' }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
