import React from 'react';

export function StatsSection() {
  return (
    <div className="relative z-20 -mt-10 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass rounded-3xl p-8 shadow-2xl backdrop-blur-xl border border-white/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200 dark:divide-slate-700/50">
          <div className="flex flex-col gap-1 group cursor-default">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-400 group-hover:scale-110 transition-transform font-black text-4xl">
              2.5M+
            </span>
            <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-sm">
              Patients Treated
            </span>
          </div>
          <div className="flex flex-col gap-1 group cursor-default">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-green-400 group-hover:scale-110 transition-transform font-black text-4xl">
              98%
            </span>
            <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-sm">
              Satisfaction
            </span>
          </div>
          <div className="flex flex-col gap-1 group cursor-default">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-purple-400 group-hover:scale-110 transition-transform font-black text-4xl">
              500+
            </span>
            <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-sm">
              Hospitals
            </span>
          </div>
          <div className="flex flex-col gap-1 group cursor-default">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-red-400 group-hover:scale-110 transition-transform font-black text-4xl">
              &lt; 30s
            </span>
            <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide text-sm">
              Response Time
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
