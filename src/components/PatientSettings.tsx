import React, { useState, useEffect } from 'react';
import { PatientSectionHeader } from './PatientSectionHeader';
import { NotificationIcon } from './NotificationIcon';
import { LanguageUtils } from '../utils/language';
import { toast } from 'sonner';

interface PatientSettingsProps {
  onNavigate?: (page: string) => void;
  onSwitchRole?: () => void;
  onLogout?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function PatientSettings({ onNavigate, onSwitchRole, onLogout, darkMode, onToggleDarkMode }: PatientSettingsProps) {
  const [activeSection, setActiveSection] = useState('personal');
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  
  // Collapsible section states
  const [showPasswordManagement, setShowPasswordManagement] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [showSecurityPreferences, setShowSecurityPreferences] = useState(false);
  const [showDisplayPreferences, setShowDisplayPreferences] = useState(false);
  
  // Initialize language from localStorage
  useEffect(() => {
    setLanguage(LanguageUtils.get());
    
    const unsubscribe = LanguageUtils.subscribe((lang) => {
      setLanguage(lang);
    });
    
    return unsubscribe;
  }, []);

  const [formData, setFormData] = useState({
    firstName: 'Lakshay',
    lastName: 'Soni',
    dob: '1998-03-15',
    gender: 'Male',
    email: 'lakshay.soni@example.com',
    phone: '+1 (555) 892-0410',
    address: '4281 Hospital Drive, Suite 200, Metro City, NY 10012'
  });

  const [notifications, setNotifications] = useState({
    appointments: false,
    prescriptions: true,
    labResults: true,
    marketing: false,
    emailNotifications: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 dark:bg-black">
      {/* Header */}
      <PatientSectionHeader
        icon="settings"
        title="Settings"
        subtitle="Manage your profile information and app preferences"
      />

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-0">
              {/* Profile Card */}
              <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 flex flex-col items-center text-center relative overflow-hidden">
                {/* Header Background */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30" />

                {/* Avatar */}
                <div className="relative z-10 mt-6 mb-4">
                  <div className="size-24 rounded-full p-1 bg-white dark:bg-slate-800 shadow-md">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#137fec] to-blue-600 flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-5xl">person</span>
                    </div>
                  </div>
                  <button className="absolute bottom-0 right-0 size-8 bg-[#137fec] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors border-2 border-white dark:border-slate-800">
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                  </button>
                </div>

                {/* Name & ID */}
                <h3 className="font-bold text-slate-900 dark:text-white">{formData.firstName} {formData.lastName}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Patient ID: #89204</p>

                {/* Health Stats */}
                <div className="flex w-full justify-between px-2 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl">
                  <div className="flex flex-col items-center flex-1 border-r border-slate-200 dark:border-slate-700 last:border-0">
                    <span className="text-xs text-slate-400 uppercase font-semibold mb-1">Blood</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1">
                      <span className="material-symbols-outlined text-red-500 text-base" style={{ fontVariationSettings: '"FILL" 1' }}>
                        bloodtype
                      </span>
                      O+
                    </span>
                  </div>
                  <div className="flex flex-col items-center flex-1 border-r border-slate-200 dark:border-slate-700 last:border-0">
                    <span className="text-xs text-slate-400 uppercase font-semibold mb-1">Height</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-white">182 cm</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-xs text-slate-400 uppercase font-semibold mb-1">Weight</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-white">78 kg</span>
                  </div>
                </div>
              </div>

              {/* Settings Navigation */}
              <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 p-2 flex flex-col gap-1">
                <button
                  onClick={() => setActiveSection('personal')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeSection === 'personal'
                      ? 'bg-[#137fec]/10 text-[#137fec]'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="material-symbols-outlined">person</span>
                  <span>Personal Information</span>
                </button>

                <button
                  onClick={() => setActiveSection('notifications')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeSection === 'notifications'
                      ? 'bg-[#137fec]/10 text-[#137fec]'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="material-symbols-outlined">notifications_active</span>
                  <span>Notifications</span>
                </button>

                <button
                  onClick={() => setActiveSection('security')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeSection === 'security'
                      ? 'bg-[#137fec]/10 text-[#137fec]'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="material-symbols-outlined">lock</span>
                  <span>Security & Login</span>
                </button>
              </div>

              {/* System Preferences (Sidebar) - REMOVED */}
              {activeSection === 'security' && (
                <></>
              )}
            </div>

            {/* Right Content */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Personal Information Section */}
              {activeSection === 'personal' && (
                <div className="rounded-2xl border border-white/40 bg-white/70 p-6 md:p-8 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-900 dark:text-white">Personal Information</h3>
                    <button className="text-[#137fec] text-sm font-semibold hover:underline">Edit Info</button>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">First Name</label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] outline-none transition-all"
                        type="text"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Name</label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] outline-none transition-all"
                        type="text"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date of Birth</label>
                      <input
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] outline-none transition-all"
                        type="date"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] outline-none transition-all"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                          mail
                        </span>
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] outline-none transition-all"
                          type="email"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                          call
                        </span>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] outline-none transition-all"
                          type="tel"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Home Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] outline-none transition-all"
                        rows={3}
                      />
                    </div>

                    <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <button
                        type="button"
                        className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#137fec] text-white font-medium hover:bg-blue-600 shadow-lg shadow-[#137fec]/25 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <div className="rounded-2xl border border-white/40 bg-white/70 p-6 md:p-8 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-6">Notification Preferences</h3>

                  <div className="flex flex-col gap-6">
                    {/* Appointment Reminders */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Appointment Reminders</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Receive alerts 24h before your visit.
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('appointments')}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          notifications.appointments ? 'bg-[#137fec]' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.appointments ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Prescription Refills */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Prescription Refills</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Get notified when a refill is ready.
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('prescriptions')}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          notifications.prescriptions ? 'bg-[#137fec]' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.prescriptions ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Lab Results */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Lab Results</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Email notification when results are uploaded.
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('labResults')}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          notifications.labResults ? 'bg-[#137fec]' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.labResults ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Marketing & Updates</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          News about hospital services and events.
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('marketing')}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          notifications.marketing ? 'bg-[#137fec]' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications.marketing ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Section - All Collapsible */}
              {activeSection === 'security' && (
                <>
                  {/* Password Management - Collapsible */}
                  <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 overflow-hidden">
                    <button
                      onClick={() => setShowPasswordManagement(!showPasswordManagement)}
                      className="w-full p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                    >
                      <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                        Password Management
                      </h3>
                      <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showPasswordManagement ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    
                    {showPasswordManagement && (
                      <div className="px-6 pb-6 space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                              <span className="material-symbols-outlined text-[#137fec] text-[24px]">password</span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white text-sm">Change Password</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Last changed: 3 months ago
                              </p>
                            </div>
                          </div>
                          <button className="px-4 py-2 rounded-lg bg-[#137fec] text-white text-sm font-medium hover:bg-blue-600 transition-colors">
                            Change
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Two-Factor Authentication - Collapsible */}
                  <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 overflow-hidden">
                    <button
                      onClick={() => setShow2FA(!show2FA)}
                      className="w-full p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                    >
                      <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                        Two-Factor Authentication (2FA)
                      </h3>
                      <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${show2FA ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    
                    {show2FA && (
                      <div className="px-6 pb-6 space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[24px]">verified_user</span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white text-sm">Two-Factor Authentication</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {twoFactorEnabled ? 'Extra layer of security enabled' : 'Add extra security to your account'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                              twoFactorEnabled ? 'bg-[#137fec]' : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Security Preferences - Collapsible */}
                  <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 overflow-hidden">
                    <button
                      onClick={() => setShowSecurityPreferences(!showSecurityPreferences)}
                      className="w-full p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                    >
                      <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                        Security Preferences
                      </h3>
                      <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showSecurityPreferences ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    
                    {showSecurityPreferences && (
                      <div className="px-6 pb-6 space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                        {/* Biometric Login */}
                        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                              <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[24px]">fingerprint</span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white text-sm">Biometric Login</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Use fingerprint or face ID to sign in
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setBiometricEnabled(!biometricEnabled)}
                            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                              biometricEnabled ? 'bg-[#137fec]' : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                biometricEnabled ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Login Alerts */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                              <span className="material-symbols-outlined text-orange-600 dark:text-orange-400 text-[24px]">notifications_active</span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white text-sm">Login Alerts</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Get notified of new login activities
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setLoginAlerts(!loginAlerts)}
                            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                              loginAlerts ? 'bg-[#137fec]' : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                loginAlerts ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Log Out Button */}
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                          <button
                            onClick={onLogout}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium transition-colors group border border-red-200 dark:border-red-800/50"
                          >
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                            <span>Log Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Display Preferences - Collapsible */}
                  <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 overflow-hidden">
                    <button
                      onClick={() => setShowDisplayPreferences(!showDisplayPreferences)}
                      className="w-full p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                    >
                      <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                        Display Preferences
                      </h3>
                      <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showDisplayPreferences ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    
                    {showDisplayPreferences && (
                      <div className="px-6 pb-6 space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                        {/* Dark Mode */}
                        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
                              <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[24px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                                {darkMode ? 'dark_mode' : 'light_mode'}
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white text-sm">Dark Mode</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {darkMode ? 'Switch to light appearance' : 'Switch to dark appearance'}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              if (onToggleDarkMode) {
                                onToggleDarkMode();
                              }
                            }}
                            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                              darkMode ? 'bg-[#137fec]' : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                darkMode ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Language Selection */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
                              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-[24px]">
                                language
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white text-sm">Language</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Choose your preferred language
                              </p>
                            </div>
                          </div>
                          <select
                            value={language}
                            onChange={(e) => {
                              const newLang = e.target.value as 'english' | 'hindi';
                              setLanguage(newLang);
                              LanguageUtils.set(newLang);
                              toast.success(`Language changed to ${newLang === 'english' ? 'English' : 'हिंदी'}`);
                            }}
                            className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-[#137fec]/50 focus:border-[#137fec] outline-none transition-all"
                          >
                            <option value="english">🇬🇧 English</option>
                            <option value="hindi">🇮🇳 हिंदी</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="font-medium">{successMessage}</span>
        </div>
      )}
    </div>
  );
}