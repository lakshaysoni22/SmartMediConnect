import React, { useState, useEffect } from 'react';
import { DarkModeUtils } from '../utils/darkMode';

interface AdminSettingsSecurityProps {
  onLogout?: () => void;
}

export function AdminSettingsSecurity({ onLogout }: AdminSettingsSecurityProps) {
  const [darkMode, setDarkMode] = useState(() => DarkModeUtils.get());

  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [securityNotifications, setSecurityNotifications] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [showLoginActivity, setShowLoginActivity] = useState(false);
  const [showPasswordManagement, setShowPasswordManagement] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showSecurityPreferences, setShowSecurityPreferences] = useState(false);
  const [showDisplayPreferences, setShowDisplayPreferences] = useState(false);
  const [showSystemPreferences, setShowSystemPreferences] = useState(false);
  const [showHospitalConfig, setShowHospitalConfig] = useState(false);

  // Subscribe to dark mode changes from centralized utility
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 pt-8">
      {/* Left Column - Security Settings */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Password Management */}
        <section className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden">
          <button
            onClick={() => setShowPasswordManagement(!showPasswordManagement)}
            className="w-full p-6 md:p-8 pb-4 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-red-500 rounded-full"></span>
              Password Management
            </h3>
            <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showPasswordManagement ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          
          {showPasswordManagement && (
            <div className="flex flex-col gap-6 p-6 md:p-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Current Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 dark:text-gray-500 text-[20px]">
                    lock
                  </span>
                  <input
                    className="w-full pl-10 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">New Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 dark:text-gray-500 text-[20px]">
                    key
                  </span>
                  <input
                    className="w-full pl-10 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Confirm New Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 dark:text-gray-500 text-[20px]">
                    check_circle
                  </span>
                  <input
                    className="w-full pl-10 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <button className="w-full md:w-auto px-6 py-2.5 bg-[#137fec] hover:bg-blue-600 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                Update Password
              </button>
            </div>
          )}
        </section>

        {/* Two-Factor Authentication */}
        <section className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden">
          <button
            onClick={() => setShowTwoFactor(!showTwoFactor)}
            className="w-full p-6 md:p-8 pb-4 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                Two-Factor Authentication (2FA)
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Enabled
              </span>
            </div>
            <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showTwoFactor ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          
          {showTwoFactor && (
            <div className="flex flex-col gap-6 p-6 md:p-8">
              <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[24px]">verified_user</span>
                  <div>
                    <p className="text-sm font-semibold text-green-900 dark:text-green-300 mb-1">2FA is currently active</p>
                    <p className="text-xs text-green-700 dark:text-green-400">Your account is secured with SMS-based verification codes.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-gray-800">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">SMS Authentication</span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">Phone: +1 (555) 123-4567</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={true} readOnly />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-gray-800">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">Email Authentication</span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">admin@mediconnect.hospital</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">Authenticator App</span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">Google Authenticator, Authy, etc.</span>
                </div>
                <button className="px-4 py-2 bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-lg text-xs font-semibold transition-colors">
                  Setup
                </button>
              </div>

              {/* Enable 2FA Button */}
              <div className="pt-4 mt-2 border-t border-slate-200 dark:border-gray-800">
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 rounded-lg font-semibold transition-all border-2 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700">
                  <span className="material-symbols-outlined text-[20px]">shield</span>
                  Enable Two-Factor Authentication
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Security Preferences */}
        <section className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden">
          <button
            onClick={() => setShowSecurityPreferences(!showSecurityPreferences)}
            className="w-full p-6 md:p-8 pb-4 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
              Security Preferences
            </h3>
            <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showSecurityPreferences ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          
          {showSecurityPreferences && (
            <div className="flex flex-col gap-6 p-6 md:p-8">
              <div className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-gray-800">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">Login Alerts</span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">Get notified of new login attempts</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={loginAlerts}
                    onChange={(e) => setLoginAlerts(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-gray-800">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">Security Notifications</span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">Email alerts for security events</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={securityNotifications}
                    onChange={(e) => setSecurityNotifications(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-gray-800">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">IP Whitelist</span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">Allow login only from trusted IPs</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={ipWhitelist}
                    onChange={(e) => setIpWhitelist(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">Session Timeout</span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">Auto logout after inactivity</span>
                </div>
                <select 
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="px-4 py-2 bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-semibold transition-colors focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              {/* Sign Out Button */}
              <div className="pt-4 mt-2 border-t border-slate-200 dark:border-gray-800">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg font-semibold transition-all border-2 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  Sign Out from Admin Portal
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Login History */}
        <section className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden">
          <button
            onClick={() => setShowLoginActivity(!showLoginActivity)}
            className="w-full p-6 md:p-8 pb-4 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              Recent Login Activity
            </h3>
            <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showLoginActivity ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          
          {showLoginActivity && (
            <div className="divide-y divide-slate-100 dark:divide-gray-800">
              {[
                { device: 'Chrome on Windows', location: 'New York, USA', time: '2 hours ago', status: 'success', ip: '192.168.1.1' },
                { device: 'Safari on iPhone', location: 'New York, USA', time: 'Yesterday 8:42 PM', status: 'success', ip: '192.168.1.45' },
                { device: 'Firefox on MacOS', location: 'San Francisco, USA', time: '2 days ago', status: 'failed', ip: '203.45.12.98' },
                { device: 'Chrome on Windows', location: 'New York, USA', time: '3 days ago', status: 'success', ip: '192.168.1.1' },
              ].map((login, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 md:p-6 hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${login.status === 'success' ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
                      <span className={`material-symbols-outlined ${login.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} text-[20px]`}>
                        {login.status === 'success' ? 'check_circle' : 'block'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-slate-800 dark:text-white">{login.device}</span>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        <span>{login.location}</span>
                        <span>•</span>
                        <span>{login.ip}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold ${login.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {login.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{login.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Dark Mode & Display Preferences */}
        <section className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden">
          <button
            onClick={() => setShowDisplayPreferences(!showDisplayPreferences)}
            className="w-full p-6 md:p-8 pb-4 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
              Display Preferences
            </h3>
            <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showDisplayPreferences ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          
          {showDisplayPreferences && (
            <div className="flex flex-col gap-6 p-6 md:p-8">
              <div className="flex items-center justify-between py-4 border-b border-slate-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 dark:from-amber-400 dark:to-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white dark:text-slate-900 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {darkMode ? 'light_mode' : 'dark_mode'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-slate-800 dark:text-white">Dark Mode</span>
                    <span className="text-xs text-slate-500 dark:text-gray-400">
                      {darkMode ? 'Dark theme enabled' : 'Light theme enabled'}
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={darkMode}
                    onChange={handleDarkModeToggle}
                  />
                  <div className="w-14 h-7 bg-slate-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-purple-600"></div>
                </label>
              </div>

              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400 text-[24px]">info</span>
                  <div>
                    <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-1">Auto Dark Mode</p>
                    <p className="text-xs text-indigo-700 dark:text-indigo-400">Dark mode syncs across all SmartMediConnect portals and is saved in your browser.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Right Column - Hospital Configuration & System Preferences */}
      <div className="flex flex-col gap-6">
        {/* Hospital Configuration - Hover to Show */}
        <section 
          className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 shadow-lg shadow-emerald-500/20 border border-emerald-600/20 text-white relative overflow-hidden transition-all duration-300"
          onMouseEnter={() => setShowHospitalConfig(true)}
          onMouseLeave={() => setShowHospitalConfig(false)}
        >
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="p-6 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">apartment</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Hospital Configuration</h4>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">ACTIVE</span>
                </div>
              </div>
              <span className={`material-symbols-outlined transition-transform ${showHospitalConfig ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </div>

            {showHospitalConfig && (
              <div className="px-6 pb-6 animate-fadeIn">
                {/* Operating Hours */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[20px]">schedule</span>
                    <h5 className="text-sm font-bold">Operating Hours</h5>
                  </div>
                  <div className="space-y-2 pl-7">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-100">Weekdays</span>
                      <span className="font-semibold">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-100">Weekends</span>
                      <span className="font-semibold">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-100">Emergency</span>
                      <span className="font-semibold">24/7 Available</span>
                    </div>
                  </div>
                </div>

                {/* Active Departments */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[20px]">domain</span>
                    <h5 className="text-sm font-bold">Active Departments</h5>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pl-7">
                    {['Cardiology', 'Neurology', 'Pediatrics', 'Radiology', 'Surgery', 'ICU'].map((dept, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        <span className="text-xs font-semibold">{dept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}