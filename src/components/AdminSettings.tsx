import React, { useState, useEffect } from 'react';
import { AdminSettingsSecurity } from './AdminSettingsSecurity';
import { AdminSettingsHospital } from './AdminSettingsHospital';
import { AdminSettingsTabHeader } from './AdminSettingsTabHeader';
import { NotificationIcon } from './NotificationIcon';
import { DarkModeUtils } from '../utils/darkMode';

interface AdminSettingsProps {
  onLogout?: () => void;
}

export function AdminSettings({ onLogout }: AdminSettingsProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(() => DarkModeUtils.get());
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // OPTIMIZED: Subscribe to dark mode changes only for UI updates
  useEffect(() => {
    const unsubscribe = DarkModeUtils.subscribe((isDark) => {
      // Only update if changed to prevent unnecessary re-renders
      setDarkMode(prev => prev === isDark ? prev : isDark);
    });
    return unsubscribe;
  }, []);

  const handleDarkModeToggle = () => {
    const newValue = DarkModeUtils.toggle();
    setDarkMode(newValue);
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: 'person', filled: true },
    { id: 'security', label: 'Security', icon: 'lock', filled: false },
    { id: 'hospital', label: 'Hospital Config', icon: 'domain', filled: false }
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-black overflow-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0077b6] rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">settings</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profile & Settings</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage your personal information and system preferences</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationIcon 
              showDot={true}
              onClick={() => window.dispatchEvent(new CustomEvent('openNotificationCenter'))}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 custom-scrollbar">
        <div className="max-w-[1024px] mx-auto"> {/* Profile Card */}
          <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-white dark:bg-gray-900 shadow-md border border-slate-200 dark:border-gray-800 items-center justify-between relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#137fec]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full relative z-10">
              <div className="relative group cursor-pointer">
                <div
                  className="bg-center bg-no-repeat bg-cover rounded-full size-24 md:size-32 ring-4 ring-white dark:ring-gray-800 shadow-md"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop')"
                  }}
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white">edit</span>
                </div>
                <div className="absolute bottom-2 right-2 size-5 bg-green-500 border-[3px] border-white dark:border-gray-900 rounded-full shadow-sm"></div>
              </div>
              
              <div className="flex flex-col text-center sm:text-left">
                <h3 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white">Dr. Anthony Smith</h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1.5">
                  <span className="text-slate-500 dark:text-gray-400 text-sm font-medium">Chief Administrator</span>
                  <span className="text-slate-300 dark:text-gray-600 text-xs">•</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-[#137fec] dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                    Level 1 Access
                  </span>
                </div>
                <p className="text-slate-500 dark:text-gray-400 text-sm mt-3 flex items-center justify-center sm:justify-start gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  Last login: Today, 09:42 AM
                </p>
              </div>
            </div>
            
            <button className="shrink-0 w-full sm:w-auto px-5 h-10 bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 border border-transparent rounded-lg text-sm font-bold text-white dark:text-slate-900 transition-all shadow-md hover:shadow-lg">
              Change Avatar
            </button>
          </div>

          {/* Tabs Navigation - Fixed Header */}
          <div className="border-b border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
            <div className="flex gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-[#137fec] text-[#137fec] dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                      : 'border-transparent text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {tab.icon}
                  </span>
                  <span className="text-sm font-semibold whitespace-nowrap">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          {activeTab === 'profile' && (
            <div className="pb-10 pt-8">
              {/* Forms */}
              <div className="flex flex-col gap-6">
                {/* Personal Information */}
                <section className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#137fec] rounded-full"></span>
                      Personal Information
                    </h3>
                    <button className="text-[#137fec] dark:text-blue-400 text-sm font-semibold hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors">
                      Edit Details
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">First Name</label>
                      <input
                        className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500"
                        type="text"
                        defaultValue="Anthony"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Last Name</label>
                      <input
                        className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500"
                        type="text"
                        defaultValue="Smith"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Title / Role</label>
                      <input
                        className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500"
                        type="text"
                        defaultValue="Chief Medical Administrator"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">License Number</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 dark:text-gray-500 text-[20px]">
                          badge
                        </span>
                        <input
                          className="w-full pl-10 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500"
                          type="text"
                          defaultValue="MD-9942-NY"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Department</label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all appearance-none cursor-pointer">
                          <option>Administration</option>
                          <option>Cardiology</option>
                          <option>Neurology</option>
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 dark:text-gray-400 pointer-events-none text-[20px]">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Details */}
                <section className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 p-6 md:p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#137fec] rounded-full"></span>
                      Contact Details
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Hospital Email</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 dark:text-gray-500 text-[20px]">
                          mail
                        </span>
                        <input
                          className="w-full pl-10 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500"
                          type="email"
                          defaultValue="a.smith@stmarys.hospital.org"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Office Phone</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 dark:text-gray-500 text-[20px]">
                            call
                          </span>
                          <input
                            className="w-full pl-10 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500"
                            type="tel"
                            defaultValue="+1 (555) 012-3456"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Emergency Pager</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 dark:text-gray-500 text-[20px]">
                            notifications_active
                          </span>
                          <input
                            className="w-full pl-10 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-500"
                            type="tel"
                            defaultValue="884-212"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Display Preferences Section removed */}

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-4">
                  <button className="flex-1 md:flex-none min-w-[160px] h-12 bg-[#137fec] hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">save</span>
                    Save Changes
                  </button>
                  <button className="flex-1 md:flex-none min-w-[120px] h-12 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300 font-semibold rounded-lg transition-all border border-slate-300 dark:border-gray-700 shadow-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs Content */}
          {activeTab === 'security' && (
            <AdminSettingsSecurity onLogout={onLogout} />
          )}

          {activeTab === 'hospital' && (
            <AdminSettingsHospital />
          )}
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}