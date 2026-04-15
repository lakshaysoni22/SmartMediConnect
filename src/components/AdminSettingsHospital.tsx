import React, { useState } from 'react';

export function AdminSettingsHospital() {
  const [showHospitalInfo, setShowHospitalInfo] = useState(false);
  const [showOperatingHours, setShowOperatingHours] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);
  const [showSystemPrefs, setShowSystemPrefs] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [showQuickStats, setShowQuickStats] = useState(false);
  const [showStorage, setShowStorage] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 pt-8">
      {/* Left Column - Hospital Settings */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Hospital Information - Hover to Show */}
        <section 
          className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden transition-all duration-300"
          onMouseEnter={() => setShowHospitalInfo(true)}
          onMouseLeave={() => setShowHospitalInfo(false)}
        >
          <div className="p-6 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between cursor-pointer">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-[#137fec] rounded-full"></span>
              Hospital Information
            </h3>
            <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showHospitalInfo ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </div>
          
          {showHospitalInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8 animate-fadeIn">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Hospital Name</label>
                <input
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all"
                  type="text"
                  defaultValue="SmartMediConnect Hospital"
                />
              </div>
              
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Address</label>
                <input
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all"
                  type="text"
                  defaultValue="1234 Healthcare Drive, New York, NY 10001"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Phone Number</label>
                <input
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Emergency Line</label>
                <input
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all"
                  type="tel"
                  defaultValue="+1 (555) 911-0000"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Email</label>
                <input
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all"
                  type="email"
                  defaultValue="contact@mediconnect.hospital"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">License Number</label>
                <input
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] outline-none transition-all"
                  type="text"
                  defaultValue="HL-2024-NYC-00123"
                />
              </div>
              
              <div className="md:col-span-2 pt-2">
                <button className="px-6 py-2.5 bg-[#137fec] hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Operating Hours - Hover to Show */}
        <section 
          className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden transition-all duration-300"
          onMouseEnter={() => setShowOperatingHours(true)}
          onMouseLeave={() => setShowOperatingHours(false)}
        >
          <div className="p-6 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between cursor-pointer">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              Operating Hours
            </h3>
            <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showOperatingHours ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </div>
          
          {showOperatingHours && (
            <div className="flex flex-col gap-4 p-6 md:p-8 animate-fadeIn">
              {[
                { day: 'Monday - Friday', time: '24/7 Emergency • 8:00 AM - 8:00 PM General' },
                { day: 'Saturday', time: '24/7 Emergency • 9:00 AM - 5:00 PM General' },
                { day: 'Sunday', time: '24/7 Emergency • 10:00 AM - 4:00 PM General' },
              ].map((schedule, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <span className="text-sm font-semibold text-slate-800">{schedule.day}</span>
                  <span className="text-xs text-slate-500">{schedule.time}</span>
                </div>
              ))}
              
              <button className="mt-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors w-full md:w-auto">
                Modify Schedule
              </button>
            </div>
          )}
        </section>

        {/* Department Configuration - Hover to Show */}
        <section 
          className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden transition-all duration-300"
          onMouseEnter={() => setShowDepartments(true)}
          onMouseLeave={() => setShowDepartments(false)}
        >
          <div className="p-6 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between cursor-pointer">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
              Active Departments
            </h3>
            <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showDepartments ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </div>
          
          {showDepartments && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-6 md:p-8 animate-fadeIn">
              {[
                { name: 'Emergency', beds: 45, staff: 28, color: 'red' },
                { name: 'Cardiology', beds: 32, staff: 24, color: 'blue' },
                { name: 'Neurology', beds: 28, staff: 20, color: 'purple' },
                { name: 'Pediatrics', beds: 40, staff: 22, color: 'pink' },
                { name: 'Orthopedics', beds: 24, staff: 16, color: 'orange' },
                { name: 'Oncology', beds: 20, staff: 18, color: 'green' },
              ].map((dept, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-[#137fec]/30 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-800 group-hover:text-[#137fec] transition-colors">{dept.name}</span>
                    <span className={`w-2 h-2 rounded-full bg-${dept.color}-500`}></span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">bed</span>
                      {dept.beds} beds
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">group</span>
                      {dept.staff} staff
                    </span>
                  </div>
                </div>
              ))}
              
              <button className="mt-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors w-full md:w-auto">
                Add Department
              </button>
            </div>
          )}
        </section>

        {/* System Preferences - Hover to Show */}
        <section 
          className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden transition-all duration-300"
          onMouseEnter={() => setShowSystemPrefs(true)}
          onMouseLeave={() => setShowSystemPrefs(false)}
        >
          <div className="p-6 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between cursor-pointer">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-amber-500 rounded-full"></span>
              System Preferences
            </h3>
            <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showSystemPrefs ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </div>
          
          {showSystemPrefs && (
            <div className="flex flex-col gap-4 p-6 md:p-8 animate-fadeIn">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800">Auto-Backup</span>
                  <span className="text-xs text-slate-500">Daily automatic backups at 2:00 AM</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800">Maintenance Mode</span>
                  <span className="text-xs text-slate-500">Enable for system updates</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800">Audit Logging</span>
                  <span className="text-xs text-slate-500">Track all system activities</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-slate-800">Public API Access</span>
                  <span className="text-xs text-slate-500">Allow third-party integrations</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137fec]"></div>
                </label>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Right Column - Hospital Stats */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        {/* System Status - Hover to Show */}
        <section 
          className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20 border border-green-600/20 text-white relative overflow-hidden transition-all duration-300"
          onMouseEnter={() => setShowSystemStatus(true)}
          onMouseLeave={() => setShowSystemStatus(false)}
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="p-6 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[48px]">domain</span>
                <div>
                  <h4 className="text-lg font-bold mb-1">System Status</h4>
                  <div className="flex items-center gap-2 bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm w-fit">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-widest">Operational</span>
                  </div>
                </div>
              </div>
              <span className={`material-symbols-outlined transition-transform ${showSystemStatus ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </div>
            
            {showSystemStatus && (
              <div className="px-6 pb-6 animate-fadeIn">
                <p className="text-xs text-green-100">All systems running normally</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-green-100">Server Health</span>
                    <span className="font-bold">100%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-100">Last Checked</span>
                    <span className="font-bold">Just now</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Quick Stats - Hover to Show */}
        <section 
          className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden transition-all duration-300"
          onMouseEnter={() => setShowQuickStats(true)}
          onMouseLeave={() => setShowQuickStats(false)}
        >
          <div className="p-6 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between cursor-pointer">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Quick Stats</h4>
            <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showQuickStats ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </div>
          
          {showQuickStats && (
            <div className="flex flex-col gap-4 p-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400">Total Beds</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">189</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400">Total Staff</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">128</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs text-slate-500 dark:text-slate-400">Departments</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">6</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Uptime</span>
                <span className="text-sm font-bold text-green-600">99.98%</span>
              </div>
            </div>
          )}
        </section>

        {/* Storage & Capacity - Hover to Show */}
        <section 
          className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-slate-200 dark:border-gray-800 overflow-hidden transition-all duration-300"
          onMouseEnter={() => setShowStorage(true)}
          onMouseLeave={() => setShowStorage(false)}
        >
          <div className="p-6 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between cursor-pointer">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Storage</h4>
            <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 transition-transform ${showStorage ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </div>
          
          {showStorage && (
            <div className="flex flex-col gap-3 p-6 animate-fadeIn">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Database</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">420GB / 500GB</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '84%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Media Files</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">350GB / 500GB</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Backups</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">280GB / 500GB</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '56%' }}></div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}