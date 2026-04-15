import React, { useState } from 'react';
import { PublicNavigation } from './PublicNavigation';
import { Footer } from './Footer';
import { HelpButton } from './HelpButton';

interface AboutUsProps {
  onBack?: () => void;
  onGetStarted?: () => void;
  onViewPlans?: () => void;
  onSymptomChecker?: () => void;
  onHealthInfo?: () => void;
  onSecurity?: () => void;
  onUpcoming?: () => void;
}

export function AboutUs({ onBack, onGetStarted, onViewPlans, onSymptomChecker, onHealthInfo, onSecurity, onUpcoming }: AboutUsProps) {
  const [darkMode] = useState(() => {
    const saved = localStorage.getItem('mediconnectAppDarkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased selection:bg-primary/30 selection:text-primary-dark transition-colors duration-300 page-transition overflow-x-hidden">
      {/* 🎨 Floating Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 dark:opacity-50 blob-float"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 dark:opacity-50 blob-float-delay-2"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-500/20 dark:bg-pink-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 dark:opacity-50 blob-float-delay-4"></div>
      </div>

      {/* Navigation Header */}
      <PublicNavigation
        currentPage="about-us"
        onHome={onBack}
        onAboutUs={() => {}}
        onViewPlans={onViewPlans}
        onSymptomChecker={onSymptomChecker}
        onHealthInfo={onHealthInfo}
        onSecurity={onSecurity}
        onGetStarted={onGetStarted}
        onUpcoming={onUpcoming}
        homeLabel="Home"
      />

      {/* Main Content */}
      <main className="relative pt-12">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center py-16 lg:py-24 px-6 text-center lg:px-20 overflow-hidden">
        
        <div className="relative z-10 max-w-[900px] flex flex-col gap-8">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/30 backdrop-blur px-4 py-1.5 text-sm font-semibold text-primary border border-blue-100 dark:border-blue-800 dark:text-blue-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Reimagining Healthcare Delivery
          </div>
          
          <h1 className="text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl text-slate-900 dark:text-white">
            The Complete <span className="bg-gradient-to-r from-[#137fec] to-blue-600 bg-clip-text text-transparent">Healthcare Ecosystem</span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            We connect Patients, Doctors, and Hospitals in a unified, secure digital environment. From AI-driven diagnostics to blockchain-secured records, we are setting the new standard for medical technology with unmatched depth and reliability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button 
              onClick={() => onGetStarted?.()}
              className="flex h-14 min-w-[180px] items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
            >
              Join the Network
            </button>
            <button 
              onClick={() => setShowContactModal(true)}
              className="flex h-14 min-w-[180px] items-center justify-center rounded-xl bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 text-base font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-gray-700 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Journey & Impact Section */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 dark:text-white">Our Story & Evolution</h2>
              <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                <p>
                  <strong>Inception:</strong> Born in 2018 from a collaboration between leading neurosurgeons and Silicon Valley data architects, SmartMediConnect began with a critical mission: to eliminate the deadly silos in patient data. What started as a prototype for secure image transfer between two rural clinics has evolved into a global standard for interoperability.
                </p>
                <p>
                  <strong>Evolution & Milestones:</strong> Over the last five years, we have achieved ISO 27001 certification, integrated with over 50 legacy EMR systems, and facilitated over 10 million successful telehealth consultations. Our platform has grown from a simple utility to a comprehensive ecosystem that manages the entire lifecycle of care—from preventative AI nudges to post-operative recovery monitoring.
                </p>
                <p>
                  <strong>Impact & Commitment:</strong> We are not just software providers; we are partners in saving lives. By reducing administrative overhead by 40% and increasing diagnostic accuracy through AI assistance, we are making a tangible difference in healthcare delivery and patient outcomes every single day.
                </p>
                <div className="flex gap-10 pt-6 border-t border-slate-100 dark:border-gray-800 mt-6">
                  <div>
                    <div className="text-4xl font-black text-slate-900 dark:text-white">500+</div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide mt-1">Hospitals</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-slate-900 dark:text-white">2M+</div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide mt-1">Patients</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-slate-900 dark:text-white">99.9%</div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide mt-1">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full content-start">
              <div className="bg-blue-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl mb-3">favorite</span>
                <h3 className="font-bold text-lg mb-2 dark:text-white">Patient-Centricity</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Designing every interaction with empathy. The patient's well-being is the north star of every feature we build.</p>
              </div>
              <div className="bg-blue-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl mb-3">lightbulb</span>
                <h3 className="font-bold text-lg mb-2 dark:text-white">Innovation</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Constantly pushing boundaries with AI, machine learning, and blockchain to solve complex medical problems.</p>
              </div>
              <div className="bg-blue-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl mb-3">verified</span>
                <h3 className="font-bold text-lg mb-2 dark:text-white">Integrity</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Uncompromising ethical standards. We treat data privacy as a fundamental human right.</p>
              </div>
              <div className="bg-blue-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl mb-3">handshake</span>
                <h3 className="font-bold text-lg mb-2 dark:text-white">Collaboration</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Bridging gaps between institutions, insurers, and specialists to create a seamless care continuum.</p>
              </div>
              <div className="bg-blue-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl mb-3">accessibility_new</span>
                <h3 className="font-bold text-lg mb-2 dark:text-white">Accessibility</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Ensuring healthcare reaches everyone, everywhere, with offline modes and intuitive, inclusive design.</p>
              </div>
              <div className="bg-blue-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl mb-3">diamond</span>
                <h3 className="font-bold text-lg mb-2 dark:text-white">Excellence</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Delivering gold-standard performance, reliability, and precision in every line of code.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Portals Section */}
      <section className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-20">
            <span className="text-primary font-bold tracking-wider text-sm uppercase mb-3 block">Tailored Ecosystems</span>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Three Portals. Infinite Possibilities.</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-lg">
              Each stakeholder in the healthcare journey requires specific, powerful tools. We've built dedicated, feature-rich environments for Patients, Doctors, and Hospitals, ensuring a seamless flow of information and care.
            </p>
          </div>

          {/* Patient Portal */}
          <div className="flex flex-col lg:flex-row gap-12 items-start mb-40 border-b border-gray-200 dark:border-gray-800 pb-20">
            <div className="lg:w-5/12 sticky top-28">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 relative group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1691934286085-c88039d93dae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRpZW50JTIwdXNpbmclMjBoZWFsdGhjYXJlJTIwYXBwfGVufDF8fHx8MTc2NzY5MjE2NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Patient Portal"
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="mt-6 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-gray-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">User Experience Focus</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Designed for clarity and ease of use for all ages, featuring large typography, high contrast modes, and voice navigation support.</p>
              </div>
            </div>
            <div className="lg:w-7/12">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-4xl">person</span>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Patient Portal</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
                Empowering individuals with full control over their health data and access to care. A personal health command center that fits in your pocket.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-blue-500 mt-1">calendar_month</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Instant Booking</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Book online/offline slots, search by specialty, rating, & distance with real-time availability.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-purple-500 mt-1">smart_toy</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">AI Health Assistant</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">24/7 Symptom checker with dynamic responses and immediate triage treatment suggestions.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-red-500 mt-1">emergency</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">SOS Response</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Auto-location sharing and real-time alerts to nearest doctors, hospitals, and emergency contacts.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-green-500 mt-1">description</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Comprehensive Reports</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Visualized test results with trend graphs, downloadable PDFs, and historical data access.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-teal-500 mt-1">medication</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Prescriptions & Meds</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Digital prescriptions, dosage reminders, and direct pharmacy refill requests.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-orange-500 mt-1">card_membership</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Insurance Manager</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Link policies, view premium status, coverage limits, and automate claim submissions.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-indigo-500 mt-1">event</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Events Overview</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track vaccinations, follow-ups, wellness webinars, and local health camp notifications.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-blue-400 mt-1">chat</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Secure Messages</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">End-to-end encrypted chat with providers for follow-ups and non-emergency queries.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-gray-500 mt-1">manage_accounts</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Profile & Settings</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage family members, privacy settings, emergency contacts, and biometric login.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Portal */}
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-start mb-40 border-b border-gray-200 dark:border-gray-800 pb-20">
            <div className="lg:w-5/12 sticky top-28">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 relative group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjB1c2luZyUyMG1lZGljYWwlMjBzb2Z0d2FyZXxlbnwxfHx8fDE3Njc2OTIxNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Doctor Portal"
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="mt-6 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-gray-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Clinical Efficiency</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Streamlined workflows tailored to reduce burnout. One-click access to history and AI-assisted notes.</p>
              </div>
            </div>
            <div className="lg:w-7/12">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-4xl">stethoscope</span>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Doctor Portal</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
                A comprehensive clinical workspace designed to maximize patient interaction time through intelligent automation and data unification.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-teal-500 mt-1">groups</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Patient Management Suite</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Granular access to comprehensive patient profiles, history, family heritage data, and vitals.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-green-600 mt-1">payments</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Real-time Earnings</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Live revenue dashboard, detailed breakdown of consultation fees, downloadable tax statements.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-blue-500 mt-1">newspaper</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Curated News Feed</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Global medical research updates and journal articles filtered by your specific specialization.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-red-500 mt-1">notifications_active</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Emergency Alerts</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real-time, actionable alerts for assigned patients in critical condition with map integration.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-purple-500 mt-1">calendar_today</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Events & Conferences</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Direct registration for medical conferences, CME credit tracking, and event schedules.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-indigo-500 mt-1">schedule</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Smart Scheduling</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage availability, block vacation time, and view upcoming appointment loads instantly.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-blue-400 mt-1">mail</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Secure Messaging</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Encrypted communication with patients and peer-to-peer consults with other specialists.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-gray-500 mt-1">verified_user</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Profile & Verification</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Maintain digital credentials, upload licenses, and manage public-facing profile bio.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Portal */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-5/12 sticky top-28">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 relative group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1619070284836-e850273d69ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGFkbWluaXN0cmF0b3IlMjBvZmZpY2V8ZW58MXx8fHwxNzY3NjkyMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Admin Portal"
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="mt-6 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-gray-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Enterprise Scale</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Manage entire multi-specialty facilities from a single glass pane. Scalable from clinics to mega-hospitals.</p>
              </div>
            </div>
            <div className="lg:w-7/12">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary text-4xl">admin_panel_settings</span>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Portal</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
                Enterprise-grade resource planning, operational oversight, and financial intelligence. The central nervous system of the modern hospital.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-indigo-600 mt-1">dashboard</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Operations Dashboard</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Live bed occupancy, surgery schedules, ICU availability, and resource allocation stats with interactive drilling.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-emerald-600 mt-1">monetization_on</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Financial Analytics</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Department-wise revenue trends, expense tracking, detailed reporting, and ROI visualization.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-orange-500 mt-1">badge</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Staff Management</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Seamless onboarding, role assignment, shift rostering, and performance reviews.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-blue-500 mt-1">fact_check</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Data Access Control</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Doctor-patient data approval, granular permission settings, and strict audit logs.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-red-500 mt-1">report_problem</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Complaint Alerts</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Track and resolve doctor or patient complaints with escalation matrices and status tracking.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-cyan-600 mt-1">hub</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">System Integrations</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Connect with lab equipment, legacy EMR systems, and third-party pharmacy APIs.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-pink-500 mt-1">ring_volume</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Notification Center</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Broadcast hospital-wide alerts, policy updates, or emergency codes to staff devices.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-slate-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-gray-500 mt-1">settings_account_box</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Admin Profile</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Global configuration settings, branding customization, and super-admin controls.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Security Section */}
      <section className="relative py-24 px-6 lg:px-20 overflow-hidden">
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Technology Stack */}
            <div className="bg-slate-50/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 flex flex-col h-full border border-slate-200 dark:border-gray-700 border-t-4 border-t-blue-500">
              <div className="mb-8">
                <span className="inline-block p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-primary mb-4">
                  <span className="material-symbols-outlined text-3xl">memory</span>
                </span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Next-Gen Tech Stack</h2>
                <p className="text-slate-600 dark:text-slate-300">Built on the bleeding edge of software engineering to ensure speed, immersion, and intelligence.</p>
              </div>
              <div className="space-y-6 flex-1">
                <div className="group p-4 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
                  <h4 className="font-bold text-lg flex items-center gap-2 dark:text-white">
                    <span className="material-symbols-outlined text-blue-500">view_in_ar</span> 3D Avatars & Glassmorphism
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Immersive UI with depth and clarity. 3D anatomical models for patient education and advanced micro-interactions for a fluid experience.</p>
                </div>
                <div className="group p-4 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
                  <h4 className="font-bold text-lg flex items-center gap-2 dark:text-white">
                    <span className="material-symbols-outlined text-blue-500">link</span> Blockchain Integration
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">De-centralized, immutable patient records that prevent tampering, ensure data integrity, and provide a transparent audit trail.</p>
                </div>
                <div className="group p-4 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
                  <h4 className="font-bold text-lg flex items-center gap-2 dark:text-white">
                    <span className="material-symbols-outlined text-blue-500">psychology</span> Predictive AI/ML
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Advanced algorithms that analyze population health trends to predict potential outbreaks or patient deterioration before it happens.</p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-slate-50/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 flex flex-col h-full border border-slate-200 dark:border-gray-700 border-t-4 border-t-green-500">
              <div className="mb-8">
                <span className="inline-block p-3 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 mb-4">
                  <span className="material-symbols-outlined text-3xl">security</span>
                </span>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Ironclad Security</h2>
                <p className="text-slate-600 dark:text-slate-300">Security is not an add-on; it's the foundation. We employ military-grade protocols to protect sensitive lives.</p>
              </div>
              <div className="space-y-6 flex-1">
                <div className="group p-4 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
                  <h4 className="font-bold text-lg flex items-center gap-2 dark:text-white">
                    <span className="material-symbols-outlined text-green-600">lock</span> End-to-End Encryption
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">AES-256 bit encryption for data at rest and TLS 1.3 for data in transit. Your data is unreadable to anyone but you.</p>
                </div>
                <div className="group p-4 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
                  <h4 className="font-bold text-lg flex items-center gap-2 dark:text-white">
                    <span className="material-symbols-outlined text-green-600">gavel</span> HIPAA & MFA Compliance
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Strict regulatory adherence with mandatory Multi-Factor Authentication (MFA) and secure HTTPS APIs for all access points.</p>
                </div>
                <div className="group p-4 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
                  <h4 className="font-bold text-lg flex items-center gap-2 dark:text-white">
                    <span className="material-symbols-outlined text-green-600">visibility_off</span> Smart Anonymization
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Automated stripping of PII (Personally Identifiable Information) for research data sets to protect privacy while enabling science.</p>
                </div>
                <div className="group p-4 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/50 transition-colors">
                  <h4 className="font-bold text-lg flex items-center gap-2 dark:text-white">
                    <span className="material-symbols-outlined text-green-600">shield</span> Audits & Threat Detection
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Regular 3rd-party security audits, penetration testing, and real-time threat detection systems that monitor for anomalies 24/7.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Contact Sales Modal */}
      {showContactModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" 
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full p-8 border border-slate-200 dark:border-gray-800 relative animate-in zoom-in duration-200" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-[#137fec] to-[#0d5ab8] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: '"FILL" 1' }}>business</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Connect with Our Sales Team</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">Let's discuss how SmartMediConnect can transform your healthcare operations</p>
              </div>
            </div>

            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Email Card */}
              <button
                onClick={() => {
                  const email = 'lakshaysoni012794@gmail.com';
                  const subject = 'SmartMediConnect Inquiry';
                  const body = 'Hello SmartMediConnect Team,\n\nI would like to discuss your healthcare management solutions.\n\nThank you!';
                  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  
                  // Try multiple methods to open email client
                  window.location.href = mailtoLink;
                  
                  // Fallback: create temporary link and click it
                  const tempLink = document.createElement('a');
                  tempLink.href = mailtoLink;
                  tempLink.style.display = 'none';
                  document.body.appendChild(tempLink);
                  tempLink.click();
                  document.body.removeChild(tempLink);
                  
                  // Show confirmation
                  console.log('Opening email client for:', email);
                }}
                className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:border-blue-200 dark:hover:border-blue-700 transition-all cursor-pointer group text-left w-full"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[24px]">mail</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-sm font-bold text-blue-900 dark:text-blue-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    lakshaysoni012794@gmail.com
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">Click to send email • Response within 24 hours</p>
                </div>
              </button>

              {/* LinkedIn Card */}
              <a 
                href="https://www.linkedin.com/in/lakshaysoni22" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-sky-50 dark:bg-sky-900/30 rounded-xl border border-sky-100 dark:border-sky-800 hover:bg-sky-100 dark:hover:bg-sky-900/50 hover:border-sky-200 dark:hover:border-sky-700 transition-all cursor-pointer group"
              >
                <div className="p-2 bg-sky-100 dark:bg-sky-800/50 rounded-lg group-hover:bg-sky-200 dark:group-hover:bg-sky-800 transition-colors">
                  <svg className="w-6 h-6 text-sky-600 dark:text-sky-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-sky-900 dark:text-sky-300 uppercase tracking-wider mb-1">LinkedIn</p>
                  <p className="text-sm font-bold text-sky-900 dark:text-sky-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    Connect with Us
                  </p>
                  <p className="text-xs text-sky-700 dark:text-sky-400 mt-1">Follow for updates & insights</p>
                </div>
              </a>
            </div>

            {/* Quick Form */}
            <div className="p-6 bg-slate-50 dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">send</span>
                Quick Contact Form
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <input 
                  type="email" 
                  placeholder="Work Email" 
                  className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <input 
                  type="text" 
                  placeholder="Organization Name" 
                  className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <textarea 
                placeholder="How can we help you? (Optional)" 
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all mb-3 resize-none"
              ></textarea>
              <button className="w-full h-12 bg-gradient-to-r from-[#137fec] to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">send</span>
                Send Inquiry
              </button>
            </div>

            {/* Footer Note */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <p className="text-xs text-blue-900 dark:text-blue-300 text-center leading-relaxed">
                <span className="material-symbols-outlined text-[14px] align-middle mr-1">info</span>
                Our enterprise sales team will reach out within 1 business day to discuss pricing, implementation, and custom requirements.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <Footer onSecurity={onSecurity} onAboutUs={onBack} onUpcoming={onUpcoming} />
    </div>
  );
}