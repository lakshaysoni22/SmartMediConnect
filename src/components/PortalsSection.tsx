import React from 'react';

export function PortalsSection() {
  return (
    <section className="py-24 bg-[#f0f4f8] dark:bg-[#0f172a] relative overflow-hidden" id="portals">
      {/* Background Blurs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-black text-slate-900 dark:text-white mb-6 text-4xl">
            Select Your Portal
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            A unified ecosystem featuring dedicated, high-performance interfaces for every stakeholder in the healthcare journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Patient Portal */}
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:rotate-12 duration-500">
              <span className="material-symbols-outlined text-blue-500" style={{ fontSize: '120px' }}>
                account_circle
              </span>
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/40 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[36px]">person</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors text-2xl">
                Patient Portal
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Your health, in your hands. Book appointments, track vitals, and access lab reports instantly.
              </p>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                <span>Login Now</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          {/* Doctor Portal */}
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:rotate-12 duration-500">
              <span className="material-symbols-outlined text-teal-500" style={{ fontSize: '120px' }}>
                stethoscope
              </span>
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-500/40 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[36px]">medical_services</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 group-hover:text-teal-600 transition-colors text-2xl">
                Doctor Portal
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Advanced clinical tools. AI-assisted diagnosis, streamlined workflows, and patient management.
              </p>
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold">
                <span>Access Dashboard</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          {/* Hospital Admin */}
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:rotate-12 duration-500">
              <span className="material-symbols-outlined text-indigo-500" style={{ fontSize: '120px' }}>
                domain
              </span>
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg shadow-indigo-500/40 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[36px]">apartment</span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 transition-colors text-2xl">
                Hospital Admin
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Total operational oversight. Manage staff, inventory, beds, and analytics in real-time.
              </p>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                <span>Manage Facility</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
