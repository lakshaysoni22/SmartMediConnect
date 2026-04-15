import React, { useState } from 'react';

export function PatientProfileAdvanced() {
  const [activeTab, setActiveTab] = useState<'personal' | 'medical' | 'insurance' | 'security' | 'privacy'>('personal');
  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    medicationReminders: true,
    healthTips: false,
    promotions: false
  });

  return (
    <div className="h-full bg-slate-50 dark:bg-black flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-4xl">
              account_circle
            </span>
            My Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 overflow-y-auto hidden md:block">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
              SJ
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white">Sarah Johnson</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Patient ID: P-12345</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('personal')}
              className={`w-full px-4 py-3 rounded-xl text-left font-semibold transition-all flex items-center gap-3 ${
                activeTab === 'personal'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">person</span>
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={`w-full px-4 py-3 rounded-xl text-left font-semibold transition-all flex items-center gap-3 ${
                activeTab === 'medical'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">medical_services</span>
              Medical History
            </button>
            <button
              onClick={() => setActiveTab('insurance')}
              className={`w-full px-4 py-3 rounded-xl text-left font-semibold transition-all flex items-center gap-3 ${
                activeTab === 'insurance'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">health_and_safety</span>
              Insurance
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full px-4 py-3 rounded-xl text-left font-semibold transition-all flex items-center gap-3 ${
                activeTab === 'security'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">lock</span>
              Security
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full px-4 py-3 rounded-xl text-left font-semibold transition-all flex items-center gap-3 ${
                activeTab === 'privacy'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">shield</span>
              Privacy
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'personal' && (
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
                        defaultValue="Johnson"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        defaultValue="1985-06-15"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Gender</label>
                      <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="sarah.johnson@email.com"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 987-6543"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Address</label>
                    <textarea
                      rows={3}
                      defaultValue="123 Main Street, Apt 4B&#10;New York, NY 10001"
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

          {activeTab === 'medical' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Medical History</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Blood Type</h3>
                    <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>O+</option>
                      <option>O-</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Allergies</h3>
                    <div className="space-y-2 mb-3">
                      {['Penicillin', 'Peanuts'].map((allergy, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                          <span className="text-red-900 dark:text-red-300 font-medium">{allergy}</span>
                          <button className="text-red-600 dark:text-red-400 hover:text-red-700">
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
                      + Add Allergy
                    </button>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Chronic Conditions</h3>
                    <div className="space-y-2 mb-3">
                      {['Type 2 Diabetes', 'Hypertension'].map((condition, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                          <span className="text-orange-900 dark:text-orange-300 font-medium">{condition}</span>
                          <button className="text-orange-600 dark:text-orange-400 hover:text-orange-700">
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
                      + Add Condition
                    </button>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Emergency Contact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                        <input
                          type="text"
                          defaultValue="John Johnson"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Relationship</label>
                        <input
                          type="text"
                          defaultValue="Spouse"
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-9999"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all">
                    Save Medical Information
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insurance' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Insurance Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Insurance Provider</label>
                    <input
                      type="text"
                      defaultValue="Blue Cross Blue Shield"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Policy Number</label>
                      <input
                        type="text"
                        defaultValue="BCBS-987654321"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Group Number</label>
                      <input
                        type="text"
                        defaultValue="GRP-123456"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Insurance Card</label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center">
                      <span className="material-symbols-outlined text-slate-400 text-6xl mb-4">upload_file</span>
                      <p className="text-slate-600 dark:text-slate-400 mb-2">Upload front and back of insurance card</p>
                      <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all">
                        Choose Files
                      </button>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all">
                    Save Insurance Info
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="max-w-2xl space-y-6">
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

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Two-Factor Authentication</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Add an extra layer of security to your account</p>
                <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all">
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Notification Preferences</h2>
                <div className="space-y-3">
                  {Object.entries({
                    appointmentReminders: 'Appointment reminders',
                    medicationReminders: 'Medication reminders',
                    healthTips: 'Health tips and articles',
                    promotions: 'Promotional emails'
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
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all mt-4">
                  Save Preferences
                </button>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Data & Privacy</h2>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all text-left px-4 flex items-center justify-between">
                    <span>Download My Medical Records</span>
                    <span className="material-symbols-outlined">download</span>
                  </button>
                  <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all">
                    Delete My Account
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
