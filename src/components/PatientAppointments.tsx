import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { PatientNotificationCenter } from './PatientNotificationCenter';
import { useLanguage } from '../hooks/useLanguage';
import { DateUtils } from '../utils/dateUtils';
import { PatientSectionHeader } from './PatientSectionHeader';

interface PatientAppointmentsProps {
  onNavigate?: (page: string) => void;
}

export function PatientAppointments({ onNavigate }: PatientAppointmentsProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Dynamic dates
  const todayDate = DateUtils.today();
  const upcomingDate1 = DateUtils.daysFromNow(5);
  const upcomingDate2 = DateUtils.daysFromNow(12);

  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent('toggleSidebar'));
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 dark:bg-black">
      {/* Header */}
      <PatientSectionHeader
        icon="calendar_month"
        title="Appointments"
        subtitle="Manage your upcoming and past medical appointments"
      />

      {/* Filters Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-2 rounded-md font-semibold text-sm transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-[#137fec] dark:text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === 'past'
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-[#137fec] dark:text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setActiveTab('cancelled')}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
                activeTab === 'cancelled'
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-[#137fec] dark:text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Cancelled
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-[#137fec] focus:border-transparent outline-none w-64 transition-all text-slate-700 dark:text-slate-200"
                placeholder="Search doctor or specialty..."
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Upcoming Tab */}
          {activeTab === 'upcoming' && (
            <>
              {/* Upcoming Appointment 1 - Today */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  {/* Date Badge */}
                  <div className="flex-shrink-0 w-full md:w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex flex-col items-center justify-center border border-blue-100 dark:border-blue-800/30">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Feb</span>
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">14</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Today</span>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dr. Sarah Jenkins</h3>
                          <span className="material-symbols-outlined text-blue-500 text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>verified</span>
                        </div>
                        <p className="text-[#137fec] font-medium text-sm mb-2">Cardiology Specialist</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-3">
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            09:00 AM - 09:30 AM
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">videocam</span>
                            Video Consultation
                          </div>
                        </div>
                      </div>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                        CONFIRMED
                      </span>
                    </div>
                  </div>

                  {/* Doctor Avatar */}
                  <div className="hidden md:block flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      SJ
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="bg-slate-50 dark:bg-slate-700/30 px-6 py-4 flex flex-wrap gap-3 items-center justify-between border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-base">info</span>
                    Please join 10 minutes early for vitals check.
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      Reschedule
                    </button>
                    <button className="px-5 py-2 bg-[#137fec] hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md shadow-blue-500/20 transition-all flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">videocam</span>
                      Join Call
                    </button>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointment 2 - Future */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  {/* Date Badge */}
                  <div className="flex-shrink-0 w-full md:w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700">
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Nov</span>
                    <span className="text-3xl font-bold text-slate-800 dark:text-white">02</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Wed</span>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Dr. Michael Chen</h3>
                        <p className="text-[#137fec] font-medium text-sm mb-3">Neurology</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            10:30 AM
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">location_on</span>
                            Main Wing, Room 304
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">medical_services</span>
                            Follow-up
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">payments</span>
                            Copay: $20.00
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-3">
                        <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold border border-orange-200 dark:border-orange-800">
                          PENDING
                        </span>
                        <div className="hidden md:block">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                            MC
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex gap-4">
                      <button className="text-sm font-medium text-[#137fec] hover:underline">Reschedule</button>
                      <button className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">Cancel Appointment</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointment 3 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 w-full md:w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700">
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Nov</span>
                    <span className="text-3xl font-bold text-slate-800 dark:text-white">15</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tue</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Dr. Robert Taylor</h3>
                        <p className="text-[#137fec] font-medium text-sm mb-3">Orthopedics</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            02:00 PM
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">location_on</span>
                            Building B, Floor 2
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">medical_services</span>
                            Consultation
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">payments</span>
                            Copay: $30.00
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-3">
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                          CONFIRMED
                        </span>
                        <div className="hidden md:block">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold shadow-md">
                            RT
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex gap-4">
                      <button className="text-sm font-medium text-[#137fec] hover:underline">Reschedule</button>
                      <button className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">Cancel Appointment</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Past Tab */}
          {activeTab === 'past' && (
            <>
              {/* Past Appointment 1 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                      EW
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">Dr. Emily White</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Dentistry • Oct 10, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Annual Checkup</span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                        Completed
                      </span>
                    </div>
                    <button className="text-[#137fec] text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
                      View Summary
                    </button>
                  </div>
                </div>
              </div>

              {/* Past Appointment 2 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                      JS
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">Dr. John Smith</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">General Medicine • Sep 28, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Routine Checkup</span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                        Completed
                      </span>
                    </div>
                    <button className="text-[#137fec] text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
                      View Summary
                    </button>
                  </div>
                </div>
              </div>

              {/* Past Appointment 3 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                      AP
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">Dr. Anita Patel</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Dermatology • Sep 15, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Skin Consultation</span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                        Completed
                      </span>
                    </div>
                    <button className="text-[#137fec] text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
                      View Summary
                    </button>
                  </div>
                </div>
              </div>

              {/* Past Appointment 4 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                      ML
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">Dr. Maria Lopez</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Ophthalmology • Aug 22, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Eye Examination</span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                        Completed
                      </span>
                    </div>
                    <button className="text-[#137fec] text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
                      View Summary
                    </button>
                  </div>
                </div>
              </div>

              {/* Past Appointment 5 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                      DK
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">Dr. David Kim</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Cardiology • Jul 30, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Heart Screening</span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                        Completed
                      </span>
                    </div>
                    <button className="text-[#137fec] text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
                      View Summary
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Cancelled Tab */}
          {activeTab === 'cancelled' && (
            <>
              {/* Cancelled Appointment 1 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-red-200 dark:border-red-900/30 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-lg font-bold shadow-md opacity-60">
                      TJ
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">Dr. Thomas Johnson</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Psychiatry • Oct 18, 2023</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          Was: 3:00 PM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mental Health Checkup</span>
                      <span className="text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>cancel</span>
                        Cancelled by Patient
                      </span>
                    </div>
                    <button className="text-[#137fec] text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
                      Rebook
                    </button>
                  </div>
                </div>
              </div>

              {/* Cancelled Appointment 2 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-red-200 dark:border-red-900/30 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-md opacity-60">
                      SB
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">Dr. Sarah Brown</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Gynecology • Oct 05, 2023</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          Was: 11:00 AM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Annual Examination</span>
                      <span className="text-xs text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>cancel</span>
                        Cancelled by Doctor
                      </span>
                    </div>
                    <button className="text-[#137fec] text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
                      Rebook
                    </button>
                  </div>
                </div>
              </div>

              {/* Cancelled Appointment 3 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-red-200 dark:border-red-900/30 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-lg font-bold shadow-md opacity-60">
                      RG
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">Dr. Rachel Green</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Pediatrics • Sep 20, 2023</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          Was: 2:30 PM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Child Vaccination</span>
                      <span className="text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>cancel</span>
                        Cancelled by Patient
                      </span>
                    </div>
                    <button className="text-[#137fec] text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
                      Rebook
                    </button>
                  </div>
                </div>
              </div>

              {/* Cancelled Appointment 4 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-red-200 dark:border-red-900/30 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-lg font-bold shadow-md opacity-60">
                      LM
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">Dr. Lisa Martinez</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">ENT Specialist • Sep 08, 2023</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          Was: 4:15 PM
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Ear Infection Follow-up</span>
                      <span className="text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>cancel</span>
                        Cancelled by Patient
                      </span>
                    </div>
                    <button className="text-[#137fec] text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
                      Rebook
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}