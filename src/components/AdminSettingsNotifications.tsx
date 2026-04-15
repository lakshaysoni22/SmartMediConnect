import React from 'react';

export function AdminSettingsNotifications() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
      {/* Left Column - Notification Settings */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Email Notifications */}
        <section className="rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              Email Notifications
            </h3>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">System Alerts</span>
                <span className="text-xs text-slate-500">Critical system updates and alerts</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">Patient Updates</span>
                <span className="text-xs text-slate-500">New admissions, discharges, emergencies</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">Staff Notifications</span>
                <span className="text-xs text-slate-500">Shift changes, staff updates</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">Financial Reports</span>
                <span className="text-xs text-slate-500">Daily, weekly, monthly reports</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">Marketing Updates</span>
                <span className="text-xs text-slate-500">Newsletters and announcements</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Push Notifications */}
        <section className="rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
              Push Notifications
            </h3>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">Desktop Notifications</span>
                <span className="text-xs text-slate-500">Show desktop alerts for important updates</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">Mobile Push</span>
                <span className="text-xs text-slate-500">Receive notifications on mobile app</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">Sound Alerts</span>
                <span className="text-xs text-slate-500">Play sound for critical alerts</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>
          </div>
        </section>

        {/* SMS Notifications */}
        <section className="rounded-xl bg-white shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              SMS Notifications
            </h3>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">Emergency Alerts</span>
                <span className="text-xs text-slate-500">Critical emergencies only</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">Security Alerts</span>
                <span className="text-xs text-slate-500">Login attempts, password changes</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">General Updates</span>
                <span className="text-xs text-slate-500">Non-critical hospital updates</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-slate-500 text-[20px]">info</span>
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-1">SMS Phone Number</p>
                <p className="text-xs text-slate-500">+1 (555) 123-4567</p>
                <button className="text-xs text-[#137fec] font-semibold mt-2 hover:underline">Update Number</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column - Notification Summary */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        {/* Notification Stats */}
        <section className="rounded-xl bg-gradient-to-br from-[#137fec] to-blue-600 shadow-lg shadow-blue-500/20 border border-blue-600/20 p-6 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <span className="material-symbols-outlined text-[48px] mb-2">notifications_active</span>
            <h4 className="text-lg font-bold mb-1">Today's Notifications</h4>
            <p className="text-3xl font-black mb-2">24</p>
            <p className="text-xs text-blue-100">12 unread messages</p>
          </div>
        </section>

        {/* Notification Channels */}
        <section className="rounded-xl bg-white shadow-sm border border-slate-200 p-6">
          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Active Channels</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500 text-[20px]">email</span>
                <span className="text-sm font-semibold text-slate-800">Email</span>
              </div>
              <span className="text-xs font-bold text-green-600">Active</span>
            </div>
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-500 text-[20px]">notifications</span>
                <span className="text-sm font-semibold text-slate-800">Push</span>
              </div>
              <span className="text-xs font-bold text-green-600">Active</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-green-500 text-[20px]">sms</span>
                <span className="text-sm font-semibold text-slate-800">SMS</span>
              </div>
              <span className="text-xs font-bold text-green-600">Active</span>
            </div>
          </div>
        </section>

        {/* Do Not Disturb */}
        <section className="rounded-xl bg-white shadow-sm border border-slate-200 p-6">
          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Quiet Hours</h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800">Do Not Disturb</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
              </label>
            </div>
            
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 mb-2">Schedule quiet hours</p>
              <div className="flex items-center gap-2 text-xs">
                <input type="time" defaultValue="22:00" className="px-2 py-1 border border-slate-200 rounded text-slate-700" />
                <span className="text-slate-400">to</span>
                <input type="time" defaultValue="07:00" className="px-2 py-1 border border-slate-200 rounded text-slate-700" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
