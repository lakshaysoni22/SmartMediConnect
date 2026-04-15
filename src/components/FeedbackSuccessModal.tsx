import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface FeedbackSuccessModalProps {
  onClose: () => void;
  portalType?: 'patient' | 'provider' | 'admin';
}

export function FeedbackSuccessModal({ onClose, portalType = 'patient' }: FeedbackSuccessModalProps) {
  // ✅ AUTO-CLOSE AFTER 2.5 SECONDS
  useEffect(() => {
    const timer = setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Auto-closing success modal and performing logout...');
      }
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getPortalName = () => {
    switch (portalType) {
      case 'patient':
        return 'Mediconnect';
      case 'provider':
        return 'Medicare';
      case 'admin':
        return 'Medicare';
      default:
        return 'Medicare';
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-10 flex flex-col items-center text-center animate-in zoom-in duration-500">
        {/* Success Icon */}
        <div className="relative mb-8">
          {/* Outer glow circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-emerald-400/30 dark:bg-emerald-500/20 rounded-full blur-2xl opacity-70 animate-pulse"></div>
          </div>
          
          {/* Middle circle */}
          <div className="relative flex items-center justify-center w-24 h-24 bg-emerald-100 dark:bg-emerald-900/40 rounded-full shadow-lg shadow-emerald-500/30">
            {/* Inner circle with checkmark */}
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-lg animate-in zoom-in duration-700">
              <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: '"FILL" 1' }}>
                check
              </span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Feedback Submitted Successfully
        </h2>

        {/* Subheading */}
        <p className="text-base font-medium text-slate-600 dark:text-slate-400 mb-5">
          Thank you for helping us improve {getPortalName()}.
        </p>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-sm">
          Your insights help provide better care. Your feedback has been logged to help our clinical engineering team improve the platform experience for medical professionals worldwide.
        </p>

        {/* Go to Login Button */}
        <button
          onClick={onClose}
          className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-600/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Go to Login</span>
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        </button>

        {/* Auto-close indicator */}
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">
            schedule
          </span>
          Auto-closing in 2.5 seconds...
        </p>
      </div>
    </div>
  );

  // Render using Portal to escape parent container
  return createPortal(modalContent, document.body);
}