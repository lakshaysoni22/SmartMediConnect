import React, { useState } from 'react';

interface PatientLoginProps {
  onLogin?: (credentials: { email: string; password: string }) => void;
  onBack?: () => void;
  onSwitchPortal?: () => void;
}

export function PatientLogin({ onLogin, onBack, onSwitchPortal }: PatientLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Blockchain-based authentication - only check password
    if (password === '123456789' && email.includes('@')) {
      onLogin?.({ email, password });
    } else {
      setError('Invalid credentials. Password must be 123456789');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden bg-slate-50 dark:bg-[#0f172a]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-slate-100/40 dark:bg-[#0f172a]/80 backdrop-blur-[3px]" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[420px] flex flex-col gap-6 rounded-2xl border border-white/60 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:bg-[#1e293b]/70 dark:border-white/10 sm:p-10 transition-all duration-300">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="glow-blink absolute left-6 top-6 flex items-center gap-2 rounded-full border border-slate-200/50 bg-white/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 shadow-sm backdrop-blur-sm transition-all hover:bg-white/80 hover:text-[#137fec] hover:shadow-md dark:border-white/10 dark:bg-slate-800/40 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-blue-400"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
            arrow_back
          </span>
          Back
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center mt-6 sm:mt-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm ring-1 ring-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 dark:ring-blue-800/50">
            <span
              className="material-symbols-outlined text-[#137fec] dark:text-blue-400"
              style={{ fontSize: '32px' }}
            >
              monitor_heart
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Patient Portal
            </h1>
            <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Access your personal health records
            </p>
          </div>
        </div>

        {/* Login Instructions Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[18px]">info</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Login Instructions</h3>
              <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Use your email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span><strong>Password:</strong> Use only <code className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded font-mono font-bold">123456789</code></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form className="flex flex-col gap-5 mt-2" onSubmit={handleSubmit}>
          {/* Patient ID/Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Patient ID or Email
            </label>
            <div className="group relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none">
                <span
                  className="material-symbols-outlined text-slate-400 group-focus-within:text-[#137fec] transition-colors"
                  style={{ fontSize: '20px' }}
                >
                  person
                </span>
              </div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white/50 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#137fec] focus:bg-white focus:ring-2 focus:ring-[#137fec]/10 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900"
                placeholder="jane.doe@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Password
              </label>
              <a
                href="#"
                className="text-xs font-semibold text-[#137fec] hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <div className="group relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none">
                <span
                  className="material-symbols-outlined text-slate-400 group-focus-within:text-[#137fec] transition-colors"
                  style={{ fontSize: '20px' }}
                >
                  lock
                </span>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-slate-200 bg-white/50 pl-10 pr-10 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#137fec] focus:bg-white focus:ring-2 focus:ring-[#137fec]/10 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900"
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

          {/* Login Button */}
          <button
            type="submit"
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#137fec] text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 focus:ring-2 focus:ring-[#137fec] focus:ring-offset-2 dark:focus:ring-offset-slate-900"
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
            onClick={onSwitchPortal}
            className="group flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            <span>Are you a doctor?</span>
            <span className="text-[#137fec] font-semibold group-hover:underline decoration-[#137fec]/50 underline-offset-4">
              Provider Portal
            </span>
          </button>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

          <div className="flex flex-col items-center gap-3">
            {/* HIPAA Badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 dark:bg-emerald-900/20">
              <span
                className="material-symbols-outlined text-emerald-600 dark:text-emerald-400"
                style={{ fontSize: '14px' }}
              >
                verified_user
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                HIPAA Compliant
              </span>
            </div>

            {/* Footer Links */}
            <div className="flex gap-4 text-[11px] text-slate-400">
              <a href="#" className="hover:text-[#137fec] transition-colors">
                Privacy Policy
              </a>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <a href="#" className="hover:text-[#137fec] transition-colors">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="absolute bottom-4 z-10 hidden text-[10px] uppercase tracking-widest text-slate-500/60 dark:text-white/20 md:block">
        © 2026 SmartMediConnect. For authorized personnel only.
      </div>
    </div>
  );
}