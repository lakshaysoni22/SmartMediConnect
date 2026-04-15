import React, { useState } from 'react';

export function DoctorSettingsAdvanced() {
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'privacy'>('profile');
  const [notifications, setNotifications] = useState({
    emailAppointments: true,
    emailMessages: true,
    emailResults: false,
    pushAppointments: true,
    pushMessages: true,
    smsReminders: false
  });

  return (
    <div className="h-full bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-4xl">
              settings
            </span>
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your account preferences and settings
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 overflow-y-auto hidden md:block">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full px-4 py-3 rounded-xl text-left font-semibold transition-all flex items-center gap-3 ${
                activeTab === 'profile'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">person</span>
              Profile
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full px-4 py-3 rounded-xl text-left font-semibold transition-all flex items-center gap-3 ${
                activeTab === 'account'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">admin_panel_settings</span>
              Account & Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full px-4 py-3 rounded-xl text-left font-semibold transition-all flex items-center gap-3 ${
                activeTab === 'notifications'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">notifications</span>
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full px-4 py-3 rounded-xl text-left font-semibold transition-all flex items-center gap-3 ${
                activeTab === 'privacy'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">lock</span>
              Privacy
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'profile' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="Sarah"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Mitchell"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Specialty</label>
                    <input
                      type="text"
                      defaultValue="Cardiologist"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">License Number</label>
                    <input
                      type="text"
                      defaultValue="MD-123456"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hospital Affiliation</label>
                    <input
                      type="text"
                      defaultValue="Manhattan Medical Center"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue="dr.mitchell@hospital.com"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {Object.entries({
                        emailAppointments: 'Appointment updates',
                        emailMessages: 'New patient messages',
                        emailResults: 'Test results available'
                      }).map(([key, label]) => (
                        <label key={key} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl cursor-pointer">
                          <span className="text-slate-700 dark:text-slate-300">{label}</span>
                          <input
                            type="checkbox"
                            checked={notifications[key as keyof typeof notifications]}
                            onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      {Object.entries({
                        pushAppointments: 'Appointment reminders',
                        pushMessages: 'Patient messages',
                        smsReminders: 'SMS reminders'
                      }).map(([key, label]) => (
                        <label key={key} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl cursor-pointer">
                          <span className="text-slate-700 dark:text-slate-300">{label}</span>
                          <input
                            type="checkbox"
                            checked={notifications[key as keyof typeof notifications]}
                            onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Privacy & Data</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">HIPAA Compliance</h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      All patient data is encrypted and HIPAA compliant. Your account follows strict medical privacy standards.
                    </p>
                  </div>
                  <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
                    Download My Data
                  </button>
                  <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}