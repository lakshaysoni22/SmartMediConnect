import React, { useState, useRef, useEffect } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { DoctorNotificationCenter } from './DoctorNotificationCenter';

interface DoctorSettingsProps {
  onLogout?: () => void;
}

export function DoctorSettings({ onLogout }: DoctorSettingsProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [emergencyMode, setEmergencyMode] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Security states
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successText, setSuccessText] = useState('');
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [dataEncryption, setDataEncryption] = useState(true);
  
  // CRITICAL FIX: Add useRef to track timeouts for cleanup
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // CRITICAL FIX: Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);
  
  // 🌙 UNIFIED DARK MODE - Same as DoctorDashboardWhite
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('doctorPortalDarkMode');
      return saved === 'true';
    }
    return false;
  });

  // Apply dark mode on mount and when it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('doctorPortalDarkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('doctorPortalDarkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const [formData, setFormData] = useState({
    firstName: 'Lakshay',
    lastName: 'Soni',
    email: 'lakshay.soni@medicore.com',
    phone: '+1 (555) 123-4567',
    license: 'MED-5042-NY',
    specialty: 'Cardiology',
    bio: 'Board-certified Cardiologist with over 10 years of experience in diagnosing and treating cardiovascular conditions. Dedicated to patient-centered care and preventive medicine.',
  });

  const [hospitals, setHospitals] = useState([
    "St. Mary's General Hospital",
    "City Heart Center"
  ]);

  const removeHospital = (index: number) => {
    setHospitals(hospitals.filter((_, i) => i !== index));
  };

  const bioCharCount = formData.bio.length;

  return (
    <div className="h-full overflow-hidden flex">
      {/* Left Sidebar Navigation */}
      <aside className="w-full max-w-[320px] hidden lg:flex flex-col p-6 h-full border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        {/* Glass Profile Card */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm flex-shrink-0">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1659353887804-fc7f9313021a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NzQyMzgyNnww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Lakshay"
              className="h-24 w-24 rounded-full mb-4 ring-4 ring-white dark:ring-slate-700 shadow-md transition-transform transform group-hover:scale-105 object-cover"
            />
            <button 
              className="absolute bottom-2 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              title="Change Photo"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </button>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Lakshay</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
            Cardiologist | ID: 5042
          </p>
          <div className="flex items-center gap-2 mt-3 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full border border-green-200 dark:border-green-800/50">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
              Online
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-6 flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              activeTab === 'personal'
                ? 'bg-blue-600 text-white shadow-md'
                : 'hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-sm font-medium">Personal Details</span>
          </button>
          <button
            onClick={() => setActiveTab('professional')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              activeTab === 'professional'
                ? 'bg-blue-600 text-white shadow-md'
                : 'hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined">medical_services</span>
            <span className="text-sm font-medium">Professional Info</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              activeTab === 'notifications'
                ? 'bg-blue-600 text-white shadow-md'
                : 'hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="text-sm font-medium">Notifications</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
              activeTab === 'security'
                ? 'bg-blue-600 text-white shadow-md'
                : 'hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:text-blue-600'
            }`}
          >
            <span className="material-symbols-outlined">shield</span>
            <span className="text-sm font-medium">Security</span>
          </button>
        </nav>

        {/* Emergency Status Card - Fixed at Bottom */}
        <div className="mt-auto pt-6 flex-shrink-0">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 p-4 rounded-xl border-l-4 border-l-red-500 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <span className="material-symbols-outlined">emergency</span>
                <span className="text-sm font-bold">Emergency Calls</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  className="sr-only peer"
                  type="checkbox"
                  checked={emergencyMode}
                  onChange={(e) => setEmergencyMode(e.target.checked)}
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
              </label>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              When active, you may receive urgent consult requests from the ER.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full flex flex-col overflow-hidden bg-slate-50/50 dark:bg-slate-900">
        {/* Header - Fixed Height */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0 h-20">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                settings
              </span>
            </div>
            {/* Title & Subtitle */}
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage your profile and preferences</p>
            </div>
          </div>
          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <NotificationIcon 
              showDot={true}
              onClick={() => setShowNotifications(!showNotifications)}
            />
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-24">
            <div className="max-w-4xl mx-auto">
              {/* Content Container */}
              <form className="flex flex-col gap-6">
                {/* Personal Details Tab */}
                {activeTab === 'personal' && (
                  <>
                    {/* Section: Basic Info */}
                    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 p-6 md:p-8 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
                        <span className="material-symbols-outlined text-blue-600 text-2xl">badge</span>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                          Basic Information
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            First Name
                          </label>
                          <input
                            className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/50 w-full rounded-lg px-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Last Name
                          </label>
                          <input
                            className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/50 w-full rounded-lg px-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Email Address
                          </label>
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">
                              mail
                            </span>
                            <input
                              className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/50 w-full rounded-lg pl-10 pr-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Phone Number
                          </label>
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">
                              call
                            </span>
                            <input
                              className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/50 w-full rounded-lg pl-10 pr-4 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Professional Bio
                          </label>
                          <textarea
                            className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/50 w-full rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                            rows={3}
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          />
                          <p className="text-xs text-slate-500 text-right">{bioCharCount}/500 characters</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Professional Info Tab */}
                {activeTab === 'professional' && (
                  <>
                    {/* Section: Professional Details */}
                    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 p-6 md:p-8 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
                        <span className="material-symbols-outlined text-blue-600 text-2xl">verified</span>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                          Credentials &amp; Affiliation
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Medical License ID
                          </label>
                          <div className="relative">
                            <input
                              className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/50 w-full rounded-lg px-4 py-2.5 text-slate-900 dark:text-white font-mono placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                              type="text"
                              value={formData.license}
                              onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                            />
                            <span
                              className="absolute right-3 top-2.5 text-green-500 material-symbols-outlined text-[20px]"
                              title="Verified"
                            >
                              check_circle
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Specialty
                          </label>
                          <div className="relative">
                            <select
                              className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/50 w-full rounded-lg px-4 py-2.5 text-slate-900 dark:text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
                              value={formData.specialty}
                              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                            >
                              <option>Cardiology</option>
                              <option>Neurology</option>
                              <option>Pediatrics</option>
                              <option>General Practice</option>
                              <option>Orthopedics</option>
                              <option>Dermatology</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-slate-500 text-[20px]">
                              expand_more
                            </span>
                          </div>
                        </div>
                        <div className="md:col-span-2 space-y-4">
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Hospital Affiliations
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {hospitals.map((hospital, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-lg border border-blue-200/50"
                              >
                                <span className="material-symbols-outlined text-[18px]">apartment</span>
                                <span className="text-sm font-medium">{hospital}</span>
                                <button
                                  className="ml-1 hover:text-red-500 transition-colors"
                                  type="button"
                                  onClick={() => removeHospital(index)}
                                >
                                  <span className="material-symbols-outlined text-[16px]">close</span>
                                </button>
                              </div>
                            ))}
                            <button
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 hover:text-blue-600 hover:border-blue-600 transition-all"
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">add</span>
                              <span className="text-sm">Add Hospital</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 p-6 md:p-8 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
                      <NotificationIcon />
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Notification Preferences
                      </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                            <span className="material-symbols-outlined">mark_email_unread</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              Email Notifications
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Receive summaries and non-urgent updates.
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            className="sr-only peer"
                            type="checkbox"
                            checked={emailNotif}
                            onChange={(e) => setEmailNotif(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                            <span className="material-symbols-outlined">notifications_active</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              Push Notifications
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Instant alerts for appointments and messages.
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            className="sr-only peer"
                            type="checkbox"
                            checked={pushNotif}
                            onChange={(e) => setPushNotif(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 p-6 md:p-8 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="material-symbols-outlined text-blue-600 text-2xl">shield</span>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Security Settings
                      </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                            <span className="material-symbols-outlined">lock</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              Two-Factor Authentication
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Add an extra layer of security to your account.
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            className="sr-only peer"
                            type="checkbox"
                            checked={twoFactorEnabled}
                            onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                            <span className="material-symbols-outlined">fingerprint</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              Biometric Authentication
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Use your fingerprint or face to log in.
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            className="sr-only peer"
                            type="checkbox"
                            checked={biometricEnabled}
                            onChange={(e) => setBiometricEnabled(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                            <span className="material-symbols-outlined">login</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              Login Alerts
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Receive notifications for new logins.
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            className="sr-only peer"
                            type="checkbox"
                            checked={loginAlerts}
                            onChange={(e) => setLoginAlerts(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                            <span className="material-symbols-outlined">encrypted</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              Data Encryption
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Encrypt all sensitive medical data at rest.
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            className="sr-only peer"
                            type="checkbox"
                            checked={dataEncryption}
                            onChange={(e) => setDataEncryption(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                            <span className="material-symbols-outlined">timer</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              Session Timeout
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Auto-logout after inactivity (minutes).
                            </p>
                          </div>
                        </div>
                        <select
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                          value={sessionTimeout}
                          onChange={(e) => setSessionTimeout(e.target.value)}
                        >
                          <option value="15">15 min</option>
                          <option value="30">30 min</option>
                          <option value="60">60 min</option>
                          <option value="120">2 hours</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                        <div className="flex gap-3 items-center">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-outlined">dark_mode</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              Dark Mode
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Switch between light and dark themes.
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            className="sr-only peer"
                            type="checkbox"
                            checked={darkMode}
                            onChange={toggleDarkMode}
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-700 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-900"></div>
                        </label>
                      </div>

                      <button
                        className="w-full px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/30 transition-all transform active:scale-95"
                        type="button"
                        onClick={() => setShowChangePasswordModal(true)}
                      >
                        Change Password
                      </button>

                      {/* 🔴 FRESH SIGN OUT BUTTON - Direct Simple Implementation */}
                      <button
                        type="button"
                        onClick={onLogout}
                        className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300 transition-all font-medium border border-red-200 dark:border-red-800/50 shadow-sm hover:shadow-md transform active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Bar */}
                {(activeTab === 'personal' || activeTab === 'professional' || activeTab === 'notifications') && (
                  <div className="flex items-center justify-end gap-4 mt-4 pb-8">
                    <button
                      className="px-6 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      className="px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/30 transition-all transform active:scale-95"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Notification Center */}
      <DoctorNotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* CRITICAL FIX: Add missing Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Change Password</h3>
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">close</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter current password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter new password"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowChangePasswordModal(false);
                  setSuccessText('Password changed successfully!');
                  setShowSuccessMessage(true);
                  const timeout = setTimeout(() => setShowSuccessMessage(false), 3000);
                  timeoutRefs.current.push(timeout);
                }}
                className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CRITICAL FIX: Add missing Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-[10000] bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
          <span className="material-symbols-outlined">check_circle</span>
          <span className="font-medium">{successText}</span>
        </div>
      )}
    </div>
  );
}