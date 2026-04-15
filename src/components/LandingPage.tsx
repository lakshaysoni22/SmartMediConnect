import React, { useState } from 'react';
import { CalendarSection } from './CalendarSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';
import { PublicNavigation } from './PublicNavigation';

export function LandingPage({ onGetStarted, onViewPlans, onSymptomChecker, onHealthInfo, onSecurity, onAboutUs, onNavigate, onUpcoming }: { 
  onGetStarted: () => void; 
  onViewPlans?: () => void; 
  onSymptomChecker?: () => void; 
  onHealthInfo?: () => void; 
  onSecurity?: () => void;
  onAboutUs?: () => void;
  onNavigate?: (page: 'patient' | 'doctor' | 'admin') => void;
  onUpcoming?: () => void;
}) {
  const [showContactModal, setShowContactModal] = useState(false);

  const handlePatientPortal = () => {
    if (onNavigate) {
      onNavigate('patient');
    } else {
      onGetStarted();
    }
  };

  const handleHome = () => {
    // Landing page is already home, no navigation needed
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased selection:bg-primary/30 selection:text-primary-dark transition-colors duration-300 page-transition overflow-x-hidden">
      {/* 🎨 Floating Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 dark:opacity-50 blob-float"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 dark:opacity-50 blob-float-delay-2"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-500/20 dark:bg-pink-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 dark:opacity-50 blob-float-delay-4"></div>
      </div>

      {/* Navigation */}
      <PublicNavigation 
        currentPage="home"
        onSymptomChecker={onSymptomChecker}
        onHome={handleHome}
        onViewPlans={onViewPlans}
        onHealthInfo={onHealthInfo}
        onGetStarted={onGetStarted}
        onSecurity={onSecurity}
        onAboutUs={onAboutUs}
        homeLabel="Home"
      />

      {/* Main Content */}
      <main className="relative pt-12 bottom-wave">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden lazy-section scroll-reveal">
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover scale-105 opacity-20"
              loading="lazy"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-hospital-corridor-with-people-walking-4836-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-transparent z-10"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <div className="flex flex-col gap-8 max-w-2xl scroll-reveal">
                <div className="bg-white/5 dark:bg-slate-800/5 backdrop-blur-none w-fit px-4 py-2 rounded-full flex items-center gap-3 border border-primary/20">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">System Operational</span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] scroll-reveal-delay-1">
                  Healthcare <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 dark:from-[#2563EB] dark:to-[#1E3A8A]">Reimagined</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg font-medium scroll-reveal-delay-2">
                  Experience the future of medical management with our AI-driven, unified portal for patients, doctors, and administrators.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 scroll-reveal-delay-3">
                  <button 
                    onClick={onGetStarted}
                    className="btn-ripple btn-press flex h-14 min-w-[180px] items-center justify-center gap-3 rounded-xl bg-primary px-8 text-base font-bold text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="text-lg">Access Portal</span>
                    <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
                  </button>
                  <button className="btn-press group flex items-center justify-center gap-3 h-14 px-8 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md hover:bg-white/90 dark:hover:bg-slate-800/90 text-slate-700 dark:text-slate-200 font-bold transition-all duration-300 border border-slate-200/50 dark:border-slate-600/50">
                    <div className="size-10 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-primary">
                      <span className="material-symbols-outlined text-[22px]">play_arrow</span>
                    </div>
                    <span>Watch Demo</span>
                  </button>
                </div>
                <div className="flex items-center gap-6 pt-6">
                  <div className="flex -space-x-4">
                    <div className="relative w-12 h-12 rounded-full border-4 border-white dark:border-background-dark overflow-hidden shadow-lg transition-transform hover:-translate-y-2 z-30">
                      <img alt="Doctor" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuxWjzz_1ehMaKMznOZ5y0fGR3xRqXg8ePfHH5xwZKwmdTmxG0IocSC2xTtjty9nEt_wq-Gj40dN6ZNYBnlGLHJq4ZgKtG9xcx5PaHIBP3PsRN4kTKWLSvvQ5cbyoDFjvyVjGmvP2eUXh4eVXUycQelzPV7EE_K_SmEO-m55BEyiqujBmr6aU_gfKFxYQ8nzgoMt2kQAnhzxLH4W-BhVsDwjU2khF2EeyNHNPA7hZ-JepIgAIJzeTrZanElgzMoPrHFH63nKoclCow" />
                    </div>
                    <div className="relative w-12 h-12 rounded-full border-4 border-white dark:border-background-dark overflow-hidden shadow-lg transition-transform hover:-translate-y-2 z-20">
                      <img alt="Patient" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxKAFNYjF1kzGd4IjIfBlLcclkFfphOVYqvFSs9n_B8jTll8pWh4qReEG0xmPPJiroazQQLWb0-deA2Uy4snnoWNj01EMI0oFzl8xlPBpM8oJ-h8kGSvw8M2DMYL_aOD84VV8S-pFKm2W5kpJYFmTR4vKP7H8qf60bohigKv3FOaMr_4Jr9Wdwnb90ruSzb8aS9S8OR6BVl6vgw8vcMH4e9SvEAPivIzcjXzhm6pbm7bTe5JNZSrjp8OWG9vrHv_rA8elOAgGgI5iW" />
                    </div>
                    <div className="relative w-12 h-12 rounded-full border-4 border-white dark:border-background-dark overflow-hidden shadow-lg transition-transform hover:-translate-y-2 z-10">
                      <img alt="Admin" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Y-q9zB7PzXQ7zXO0i0IzTMxTQVJSx4UK8k31hdGBwwaAgGOY61Iykuyh4z9unTNn7USvzR6_KKUiu6c11qXrYfw3GH6A0pFXwJg4D1YfjpHqUyRT63sSvkBS6BDThOI45h1Cpn49nur_N5HTEgLG6hSIj272xAoQ1fILQiitit4sROrMJ5xZkkNQ8U5WBP2KRRVdTbEakXZjW7-dpn41OZwJOBiPlwQzNpulAm0_vmgjRgh1zGa0XUOu_Y_sF8XxRRn8FhrIE6Cw" />
                    </div>
                    <div className="relative w-12 h-12 rounded-full border-4 border-white dark:border-background-dark bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 shadow-lg z-0">
                      10k+
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400 text-[14px]">
                      <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                      <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                      <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                      <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                      <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Trusted Professionals</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px] w-full hidden lg:block perspective-1000">
                <div className="absolute right-0 top-10 w-4/5 h-80 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 rounded-3xl p-6 z-20 flex flex-col justify-between shadow-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">medical_services</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Dr. Sarah Smith</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Cardiologist • Available</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">Online</span>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full w-full overflow-hidden">
                      <div className="h-full bg-primary w-3/4 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Patient Load</span>
                      <span>75%</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div onClick={handlePatientPortal} className="h-24 flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 flex flex-col justify-center items-center gap-1 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                      <span className="material-symbols-outlined text-purple-500">calendar_month</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Schedule</span>
                    </div>
                    <div onClick={handlePatientPortal} className="h-24 flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 flex flex-col justify-center items-center gap-1 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                      <span className="material-symbols-outlined text-orange-500">event_note</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Appointment</span>
                    </div>
                    <div onClick={handlePatientPortal} className="h-24 flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 flex flex-col justify-center items-center gap-1 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                      <span className="material-symbols-outlined text-blue-500">video_call</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Call</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-20 left-10 w-48 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-4 flex items-center gap-3 z-30 shadow-xl border border-white/60 dark:border-slate-700/60">
                  <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 animate-pulse">
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Heart Rate</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">72 <span className="text-xs font-normal text-slate-400">bpm</span></p>
                  </div>
                </div>
                <div className="absolute top-0 right-10 w-40 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 rounded-2xl p-3 flex items-center gap-3 z-10 opacity-80 scale-90 shadow-lg">
                  <div className="size-9 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-600 flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">shield</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white whitespace-nowrap">HIPAA Secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="relative z-20 -mt-10 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 shadow-2xl backdrop-blur-xl border border-white/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200 dark:divide-slate-700/50">
              <div className="flex flex-col gap-1 group cursor-default">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-400 group-hover:scale-110 transition-transform">2.5M+</span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Patients Treated</span>
              </div>
              <div className="flex flex-col gap-1 group cursor-default">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-green-400 group-hover:scale-110 transition-transform">98%</span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Satisfaction</span>
              </div>
              <div className="flex flex-col gap-1 group cursor-default">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-purple-400 group-hover:scale-110 transition-transform">500+</span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Hospitals</span>
              </div>
              <div className="flex flex-col gap-1 group cursor-default">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-red-400 group-hover:scale-110 transition-transform">&lt; 30s</span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Response Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Portals Section */}
        <section className="py-24 bg-transparent relative overflow-hidden" id="portals">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl -translate-x-1/2 z-0"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl translate-x-1/2 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Select Your Portal</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">A unified ecosystem featuring dedicated, high-performance interfaces for every stakeholder in the healthcare journey.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              <div 
                onClick={handlePatientPortal}
                className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden group cursor-pointer border border-white/40 dark:border-slate-700/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-all transform group-hover:rotate-12 duration-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] group-hover:drop-shadow-[0_0_40px_rgba(59,130,246,0.8)]">
                  <span className="material-symbols-outlined text-[120px] text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">account_circle</span>
                </div>
                <div className="relative z-10">
                  <div className="icon-3d-container w-20 h-20 mb-8 group-hover:scale-110 transition-transform duration-300">
                    <div className="icon-3d-bg bg-blue-500"></div>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl shadow-blue-500/50 flex items-center justify-center text-white icon-3d-content ring-4 ring-blue-500/20 dark:ring-blue-400/30">
                      <span className="material-symbols-outlined text-[44px]">person</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">Patient Portal</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    Your health, in your hands. Book appointments, track vitals, and access lab reports instantly.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold">
                    <span>Login Now</span>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>
              <div 
                onClick={onGetStarted}
                className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden group cursor-pointer border border-white/40 dark:border-slate-700/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-all transform group-hover:rotate-12 duration-500 drop-shadow-[0_0_25px_rgba(20,184,166,0.5)] group-hover:drop-shadow-[0_0_40px_rgba(20,184,166,0.8)]">
                  <span className="material-symbols-outlined text-[120px] text-teal-500 drop-shadow-[0_0_20px_rgba(20,184,166,0.6)]">stethoscope</span>
                </div>
                <div className="relative z-10">
                  <div className="icon-3d-container w-20 h-20 mb-8 group-hover:scale-110 transition-transform duration-300">
                    <div className="icon-3d-bg bg-teal-500"></div>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-2xl shadow-teal-500/50 flex items-center justify-center text-white icon-3d-content ring-4 ring-teal-500/20 dark:ring-teal-400/30">
                      <span className="material-symbols-outlined text-[44px]">medical_services</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-teal-600 transition-colors">Doctor Portal</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    Advanced clinical tools. AI-assisted diagnosis, streamlined workflows, and patient management.
                  </p>
                  <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold">
                    <span>Access Dashboard</span>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>
              <div 
                onClick={onGetStarted}
                className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden group cursor-pointer border border-white/40 dark:border-slate-700/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-all transform group-hover:rotate-12 duration-500 drop-shadow-[0_0_25px_rgba(99,102,241,0.5)] group-hover:drop-shadow-[0_0_40px_rgba(99,102,241,0.8)]">
                  <span className="material-symbols-outlined text-[120px] text-indigo-500 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]">domain</span>
                </div>
                <div className="relative z-10">
                  <div className="icon-3d-container w-20 h-20 mb-8 group-hover:scale-110 transition-transform duration-300">
                    <div className="icon-3d-bg bg-indigo-500"></div>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-2xl shadow-indigo-500/50 flex items-center justify-center text-white icon-3d-content ring-4 ring-indigo-500/20 dark:ring-indigo-400/30">
                      <span className="material-symbols-outlined text-[44px]">apartment</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 transition-colors">Hospital Admin</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    Total operational oversight. Manage staff, inventory, beds, and analytics in real-time.
                  </p>
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
                    <span>Manage Facility</span>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-20 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Enterprise-Grade Capabilities</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">Designed for reliability, security, and speed when it matters most.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
              <div className="md:col-span-2 rounded-3xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border border-slate-200/50 dark:border-gray-800/50 p-8 flex flex-col justify-between overflow-hidden relative group hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-xl transition-all">
                <div className="relative z-10">
                  <div className="size-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6 shadow-inner">
                    <span className="material-symbols-outlined text-[28px]">video_camera_front</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Integrated Telehealth</h3>
                  <p className="text-slate-500 dark:text-slate-300 max-w-sm">Seamless HD video consultations integrated directly into patient charts. No external apps required.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 dark:opacity-5 pointer-events-none group-hover:scale-105 transition-transform duration-700">
                  <span className="material-symbols-outlined text-[240px] text-orange-500 absolute -bottom-16 -right-16">video_chat</span>
                </div>
              </div>
              <div className="rounded-3xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 p-8 flex flex-col justify-between group hover:border-purple-400 dark:hover:border-purple-500 transition-colors hover:shadow-lg">
                <div>
                  <div className="size-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 shadow-inner">
                    <span className="material-symbols-outlined text-[28px]">psychology</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">AI-Assisted Triage</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300">Smart algorithms to prioritize critical cases instantly based on symptoms.</p>
                </div>
              </div>
              <div className="rounded-3xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 p-8 flex flex-col justify-between group hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors hover:shadow-lg">
                <div>
                  <div className="size-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 shadow-inner">
                    <span className="material-symbols-outlined text-[28px]">shield_lock</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Bank-Grade Security</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-300">End-to-end encryption for all sensitive patient data. HIPAA Compliant.</p>
                </div>
              </div>
              <div className="md:col-span-2 rounded-3xl bg-gradient-to-r from-primary to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white p-8 flex flex-col justify-between overflow-hidden relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative z-10">
                  <div className="size-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <span className="material-symbols-outlined text-[28px] animate-pulse group-hover:animate-bounce">monitor_heart</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">Real-time Vitals Monitoring</h3>
                  <p className="text-white/90 dark:text-white/80 max-w-sm group-hover:text-white transition-colors duration-300">Live streams of patient vitals from connected ICU devices with instant alert systems for anomalies.</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                  <svg preserveAspectRatio="none" style={{ height: '100%', width: '100%' }} viewBox="0 0 500 150">
                    <path className="animate-pulse group-hover:animate-wave" d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: 'white' }}></path>
                  </svg>
                </div>
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/10 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 size-2 rounded-full bg-white/40 animate-ping group-hover:animate-pulse"></div>
                <div className="absolute top-12 right-12 size-1.5 rounded-full bg-white/30 animate-ping animation-delay-300"></div>
                <div className="absolute bottom-20 right-8 size-2.5 rounded-full bg-white/50 animate-ping animation-delay-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-white text-xs font-bold rounded-full uppercase tracking-wide">Community & Wellness</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Upcoming Health Events</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Stay connected with our latest health campaigns, free checkup drives, and expert-led webinars.</p>
              </div>
              <a className="group flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors" href="#" onClick={onUpcoming}>
                View Full Calendar
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
            {/* Calendar and Events Grid - Simplified for brevity */}
            <CalendarSection />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Trusted by Healthcare Professionals</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed italic">"The doctor portal has drastically reduced our administrative overhead. I can spend more time treating patients and less time clicking buttons."</p>
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full ring-2 ring-primary/20 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQrFIJPR9U7tZWS6K0uSHnjGPfA8CMNuUtkL5TbEkiCBacwM4EcBT9RoaTxdl9IEiDqly3uVGK3Jmdj-ePMLRk8XYS2F8PYlkRbMZf1uYFh_6g_rOKGAhwaLJMb22g2ourgD_-cRi9Grhb4MYMCk1EGFH-4ghm-LDc6wZm4aCpYZvzsxwmpkKXIvCLCzqYfaN2_wdN02naj4tRsjVwrVb-uaET4FkQ2-AkVaPEEufwkHK5gkYf5jro8XJLu8BDur_B65aUyhaS3eOm')" }}></div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Dr. James Wilson</p>
                    <p className="text-xs text-slate-500">Chief of Surgery</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed italic">"Managing appointments used to be a nightmare. Medicare's patient portal makes it incredibly simple to find a slot that works for me."</p>
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full ring-2 ring-primary/20 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDDS5G4ntYlN4Xcv4MFLz1FoWhTgR7YQg4-DnbqY5y9LLdG9e83COEmyUhGtSGvJiFDv9C5Q3O53CLfwUl8-UrkBLeqs3KxaaKjj1SBMWNL6ESZXC-aD9-yg8LYzNsR85Hr212wKbXTndFub9VbtFDRZH8yvniU1uh6ggNW-5bOG36NFCOpaLf-MW7dFlxy2QFINTqtbjVhhhp--HWXY1VRBIYUTNSzAm2lHQ-Vigu0XxUBjm3IieA3l3w7PLt2kscisY_z9stZNav')" }}></div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Sarah Jenkins</p>
                    <p className="text-xs text-slate-500">Patient</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[20px]">star_half</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed italic">"The hospital admin dashboard gives us the bird's eye view we've been missing. Resource allocation is now data-driven, not a guessing game."</p>
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full ring-2 ring-primary/20 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCY-m7AY3xFruRDKEJtOtFfbswGI0FUj5F46QlRoKyQNBdKxv4eEECDziAFokw0ItF61ssJaLHB-LO1M9cVXbhvm82gd7wQWFiDMp4pxKyyX6EUzOCPBJrz2ZowgfEUuGJFDndP_mHBhQdSJJzsA6KQO1HfkvXBb_Zmx9iGQeVyyTt3C9tQ6E9gVjPqxNOkGGFfRX4ZgCIY5An8KRRNQffY_lkqFPpaO9BVyw4ZeDaFj7YlAGi447zjQo1sBgulHjO5inSazTGlFZvO')" }}></div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">Michael Chen</p>
                    <p className="text-xs text-slate-500">Hospital Administrator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection onGetStarted={onGetStarted} onContactSales={() => setShowContactModal(true)} />
      </main>

      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        .dark .glass {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }
        .glass-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .dark .glass-card {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.6));
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
        }
        .glass-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 50px -10px rgba(19, 127, 236, 0.3);
          border-color: rgba(19, 127, 236, 0.5);
        }
        .icon-3d-container {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        .icon-3d-bg {
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          transform: translateZ(-10px);
          filter: blur(5px);
          opacity: 0.6;
        }
        .icon-3d-content {
          transform: translateZ(10px);
          text-shadow: 2px 4px 6px rgba(0,0,0,0.1);
        }
        .hero-video-overlay {
          background: linear-gradient(90deg, 
            rgba(248, 250, 252, 1) 0%, 
            rgba(248, 250, 252, 0.95) 35%, 
            rgba(248, 250, 252, 0.6) 60%, 
            rgba(248, 250, 252, 0.2) 100%);
        }
        .dark .hero-video-overlay {
          background: linear-gradient(90deg, 
            rgba(0, 0, 0, 1) 0%, 
            rgba(0, 0, 0, 0.95) 35%, 
            rgba(0, 0, 0, 0.6) 60%, 
            rgba(0, 0, 0, 0.2) 100%);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes wave {
          0% { d: path('M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z'); }
          50% { d: path('M0.00,49.98 C149.99,-49.98 349.20,150.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z'); }
          100% { d: path('M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z'); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out 3s infinite;
        }
        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>

      {/* Footer */}
      <Footer 
        onSecurity={onSecurity} 
        onNavigate={onNavigate} 
        onAboutUs={onAboutUs} 
        onUpcoming={onUpcoming}
        showContactModal={showContactModal}
        onContactModalChange={setShowContactModal}
      />
    </div>
  );
}