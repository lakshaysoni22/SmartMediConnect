import React, { useEffect, useState } from 'react';

export function EmergencyCallModal({ isOpen, onClose, location }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsConnected(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm">
      <div className="h-full w-full flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-3xl md:text-4xl font-black text-red-600 dark:text-red-400">Emergency Calling</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-100 transition-colors"
            aria-label="Close emergency call modal"
          >
            <span className="material-symbols-outlined text-[28px]">close</span>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-sm">
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-6">
              Connecting to nearest hospital...
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping"></span>
                <span className="material-symbols-outlined text-red-600 dark:text-red-400 relative z-10">siren</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-semibold">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse [animation-delay:150ms]">.</span>
                <span className="animate-pulse [animation-delay:300ms]">.</span>
              </div>
            </div>

            <div className="space-y-3 text-sm md:text-base">
              <p className="font-semibold text-slate-800 dark:text-slate-200">Sending Location...</p>
              <p className="text-slate-600 dark:text-slate-300">
                Live Location:{' '}
                {location
                  ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
                  : 'Location detected'}
              </p>
              <p className="text-slate-600 dark:text-slate-300">Nearest Hospital Name: City Care Hospital</p>
              <p className="text-slate-600 dark:text-slate-300">Estimated Time Arrival (ETA): 10-15 mins</p>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3">
              <p className={`font-bold ${isConnected ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {isConnected ? 'Connected to Emergency Services' : 'Establishing secure emergency channel...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
