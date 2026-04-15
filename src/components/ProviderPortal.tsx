import React, { useState, useEffect } from 'react';
import { PageLoadingSpinner } from './PageLoadingSpinner';
import { LogoutFeedbackModal } from './LogoutFeedbackModal';
import { DoctorDashboardWhite } from './DoctorDashboardWhite';  // ✅ EAGER LOAD - No suspension errors

export function ProviderPortal({ onBack }: { onBack: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [medicalId, setMedicalId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutFeedback, setShowLogoutFeedback] = useState(false);
  
  // Simple dark mode - read from localStorage
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔵 Form submitted!');
    console.log('🔵 Medical ID:', medicalId);
    console.log('🔵 Password:', password);
    
    // Email validation - check for @ symbol
    if (!medicalId || !medicalId.includes('@')) {
      alert('⚠️ Please enter a valid email address with @ symbol');
      return;
    }
    
    // Password validation - must be exactly "123456789"
    if (password !== '123456789') {
      alert('⚠️ Incorrect password! Please use password: 123456789');
      return;
    }
    
    // If validation passes, proceed with login
    console.log('🔵 Validation passed! Setting isLoggedIn to true...');
    setIsLoggedIn(true);
    console.log('🔵 Login state updated!');
  };

  // SHOW LOGOUT FEEDBACK MODAL (same as Patient/Admin Portal pattern)
  const handleLogout = () => {
    console.log('🔴 Doctor Portal: Showing logout feedback modal...');
    setShowLogoutFeedback(true);
  };

  // PERFORM ACTUAL LOGOUT (same as Patient/Admin Portal pattern)
  const performLogout = () => {
    console.log('🔴 Doctor Portal: Performing logout after feedback...');
    setShowLogoutFeedback(false);
    
    // ⚡ FORCEFUL CLEANUP - NO DELAY, IMMEDIATE ACTION
    // 1️⃣ REMOVE DARK MODE IMMEDIATELY
    document.documentElement.classList.remove('dark');
    
    // 2️⃣ CLEAR ALL LOCALSTORAGE KEYS RELATED TO DARK MODE
    localStorage.removeItem('doctorPortalDarkMode');
    localStorage.removeItem('mediconnectAppDarkMode');
    localStorage.removeItem('patientPortalDarkMode');
    localStorage.removeItem('adminPortalDarkMode');
    
    // 3️⃣ SET DARK MODE TO FALSE
    localStorage.setItem('doctorPortalDarkMode', 'false');
    localStorage.setItem('mediconnectAppDarkMode', 'false');
    
    // 4️⃣ UPDATE STATE
    setIsDarkMode(false);
    setIsLoggedIn(false);
    
    // 5️⃣ NAVIGATE BACK TO PORTAL SELECTION
    console.log('🔴 Navigating back to Portal Selection...');
    onBack();
  };

  // Show white dashboard after login
  if (isLoggedIn) {
    return (
      <>
        <div className="relative min-h-screen bg-white dark:bg-slate-900">
          <DoctorDashboardWhite onLogout={handleLogout} />
        </div>

        {/* Logout Feedback Modal */}
        {showLogoutFeedback && (
          <LogoutFeedbackModal 
            onSubmit={performLogout} 
            onSkip={performLogout} 
            portalType="doctor"
          />
        )}
      </>
    );
  }

  console.log('🔵 Rendering login form. isLoggedIn:', isLoggedIn);
  
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden bg-slate-50 dark:bg-[#0f172a]">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all hover:scale-110 cursor-pointer"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <span className="material-symbols-outlined text-yellow-500 text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            light_mode
          </span>
        ) : (
          <span className="material-symbols-outlined text-slate-700 text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            dark_mode
          </span>
        )}
      </button>

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
              stethoscope
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Doctor Portal
            </h1>
            <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Secure access to clinical records
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
                <strong>Step 1:</strong> Enter your medical email address<br/>
                <strong>Step 2:</strong> Type password <code className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 rounded font-mono font-bold text-amber-900 dark:text-amber-200">123456789</code> only<br/>
                <span className="text-amber-700 dark:text-amber-500 font-semibold mt-1 inline-block">⚠️ Portal will not open with any other password</span>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5 mt-2" onSubmit={handleSubmit}>
          {/* Medical ID Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Medical ID or Email
            </label>
            <div className="group relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none">
                <span 
                  className="material-symbols-outlined text-slate-400 group-focus-within:text-[#0077b6] transition-colors" 
                  style={{ fontSize: '20px' }}
                >
                  medical_information
                </span>
              </div>
              <input
                type="text"
                value={medicalId}
                onChange={(e) => setMedicalId(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white/50 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#0077b6] focus:bg-white focus:ring-2 focus:ring-[#0077b6]/10 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900"
                placeholder="dr.smith@hospital.com"
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
            <span>Not a doctor?</span>
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