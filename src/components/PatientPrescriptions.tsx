import React, { useState } from 'react';
import { PatientSectionHeader } from './PatientSectionHeader';

interface PatientPrescriptionsProps {
  onNavigate?: (page: string) => void;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  supply: string;
  instructions: string;
  prescribedBy: string;
  refillsLeft: number;
  refillsTotal: number;
  lastFilled: string;
  status: 'Active' | 'Finishing Soon' | 'No Refills';
  icon: string;
  expires?: string;
}

export function PatientPrescriptions({ onNavigate }: PatientPrescriptionsProps) {
  const [selectedMed, setSelectedMed] = useState<number | null>(null);

  const currentMedications: Medication[] = [
    {
      id: 1,
      name: 'Atorvastatin Calcium',
      dosage: '20 mg Tablet',
      supply: '90 Day Supply',
      instructions: 'Take 1 tablet daily at bedtime',
      prescribedBy: 'Dr. Sarah Admin',
      refillsLeft: 3,
      refillsTotal: 5,
      lastFilled: 'Sep 15, 2023',
      status: 'Active',
      icon: 'pill'
    },
    {
      id: 2,
      name: 'Amoxicillin',
      dosage: '500 mg Capsule',
      supply: '10 Day Supply',
      instructions: 'Take 1 capsule every 8 hours',
      prescribedBy: 'Dr. James Wilson',
      refillsLeft: 0,
      refillsTotal: 0,
      lastFilled: '',
      expires: 'Oct 30, 2023',
      status: 'Finishing Soon',
      icon: 'medication_liquid'
    },
    {
      id: 3,
      name: 'Metformin HCL',
      dosage: '500 mg Tablet',
      supply: '90 Day Supply',
      instructions: 'Take 1 tablet twice daily with meals',
      prescribedBy: 'Dr. Sarah Admin',
      refillsLeft: 1,
      refillsTotal: 3,
      lastFilled: 'Aug 20, 2023',
      status: 'Active',
      icon: 'vaccines'
    }
  ];

  const todaySchedule = [
    { time: '08:00', medication: 'Amoxicillin', status: 'taken', takenAt: '8:05 AM' },
    { time: '16:00', medication: 'Amoxicillin', status: 'upcoming', upcoming: '2 hours' },
    { time: '21:00', medication: 'Atorvastatin', status: 'pending', note: 'Bedtime dose' }
  ];

  const refillRequests = [
    { name: 'Lisinopril', status: 'Ready', requestDate: 'Oct 22', progress: 100 },
    { name: 'Metformin', status: 'Processing', requestDate: 'Today', progress: 40 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span className="px-2.5 py-1 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold">
            Active
          </span>
        );
      case 'Finishing Soon':
        return (
          <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold">
            Finishing Soon
          </span>
        );
      case 'No Refills':
        return (
          <span className="px-2.5 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-bold">
            No Refills
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 dark:bg-black">
      {/* Header */}
      <PatientSectionHeader
        icon="medication"
        title="Prescriptions"
        subtitle="Manage your current medications and refill requests"
      />

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Active Medications Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#137fec]">
                <span className="material-symbols-outlined text-2xl">medication</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Active Meds</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">4</h3>
              </div>
            </div>

            <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600">
                <span className="material-symbols-outlined text-2xl">autorenew</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Refills Pending</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1</h3>
              </div>
            </div>

            <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600">
                <span className="material-symbols-outlined text-2xl">event_available</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Next Pickup</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Oct 26</h3>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Medications */}
            <div className="xl:col-span-2 flex flex-col gap-6">
              {/* Current Medications Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white">Current Medications</h3>
                <button className="text-[#137fec] text-sm font-semibold hover:underline">
                  Download List (PDF)
                </button>
              </div>

              {/* Medication Cards */}
              {currentMedications.map((med) => (
                <div
                  key={med.id}
                  className="p-6 rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 group hover:border-[#137fec]/30 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="size-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-3xl">{med.icon}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">{med.name}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {med.dosage} • {med.supply}
                          </p>
                        </div>
                        {getStatusBadge(med.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-y-2 gap-x-8 my-4 text-sm">
                        <div>
                          <p className="text-xs text-slate-400 font-medium uppercase mb-0.5">Instructions</p>
                          <p className="font-medium text-slate-700 dark:text-slate-200">{med.instructions}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium uppercase mb-0.5">Prescribed By</p>
                          <p className="font-medium text-slate-700 dark:text-slate-200">{med.prescribedBy}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium uppercase mb-0.5">Refills Left</p>
                          <p
                            className={`font-medium ${
                              med.refillsLeft === 0 ? 'text-red-500' : 'text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {med.refillsLeft} of {med.refillsTotal}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium uppercase mb-0.5">
                            {med.expires ? 'Expires' : 'Last Filled'}
                          </p>
                          <p className="font-medium text-slate-700 dark:text-slate-200">
                            {med.expires || med.lastFilled}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2 border-t border-slate-100 dark:border-slate-700/50 mt-2">
                        <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                          Details
                        </button>
                        {med.refillsLeft > 0 ? (
                          <button className="px-4 py-2 bg-[#137fec]/10 text-[#137fec] rounded-lg text-sm font-semibold hover:bg-[#137fec]/20 transition-colors ml-auto">
                            {med.status === 'Active' ? 'Request Refill' : 'Refill Now'}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-400 rounded-lg text-sm font-semibold cursor-not-allowed ml-auto"
                          >
                            No Refills
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Past Prescriptions */}
              <div className="mt-4">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Past Prescriptions</h3>
                <div className="rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Medication</th>
                        <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 hidden sm:table-cell">
                          Date Prescribed
                        </th>
                        <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 hidden md:table-cell">
                          Physician
                        </th>
                        <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      <tr className="hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900 dark:text-white">Ibuprofen 800mg</div>
                          <div className="text-xs text-slate-500">Tablet</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 hidden sm:table-cell">Jan 12, 2023</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 hidden md:table-cell">Dr. Emily Chen</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                            Discontinued
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900 dark:text-white">Azithromycin</div>
                          <div className="text-xs text-slate-500">Pack</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 hidden sm:table-cell">Mar 10, 2023</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 hidden md:table-cell">
                          Dr. James Wilson
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Today's Schedule */}
              <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Today's Schedule</h3>
                <div className="flex flex-col gap-4">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{item.time}</span>
                        <div
                          className={`w-2.5 h-2.5 rounded-full ring-4 ${
                            item.status === 'taken'
                              ? 'bg-green-500 ring-green-100 dark:ring-green-900/30'
                              : item.status === 'upcoming'
                              ? 'bg-amber-400 ring-amber-100 dark:ring-amber-900/30'
                              : 'bg-slate-300 dark:bg-slate-600 ring-slate-100 dark:ring-slate-700'
                          }`}
                        />
                        {index < todaySchedule.length - 1 && (
                          <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 mt-1 min-h-[40px]" />
                        )}
                      </div>
                      <div className={index < todaySchedule.length - 1 ? 'pb-6' : ''}>
                        <p
                          className={`text-sm font-bold ${
                            item.status === 'taken'
                              ? 'text-slate-900 dark:text-white line-through opacity-50'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {item.medication}
                        </p>
                        <p
                          className={`text-xs ${
                            item.status === 'taken'
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-slate-500'
                          } font-medium`}
                        >
                          {item.status === 'taken' && `Taken at ${item.takenAt}`}
                          {item.status === 'upcoming' && `Upcoming in ${item.upcoming}`}
                          {item.status === 'pending' && item.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Refill Requests */}
              <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Refill Requests</h3>
                <div className="space-y-4">
                  {refillRequests.map((request, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-sm text-slate-800 dark:text-white">{request.name}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                            request.status === 'Ready'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2">Request sent: {request.requestDate}</p>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            request.status === 'Ready'
                              ? 'bg-green-500'
                              : 'bg-blue-500 animate-pulse'
                          }`}
                          style={{ width: `${request.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  View All Requests
                </button>
              </div>

              {/* My Pharmacy */}
              <div className="rounded-2xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl dark:bg-[#1c2127]/60 dark:border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-6xl">storefront</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">My Pharmacy</h3>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">CVS Pharmacy #442</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">123 Health Blvd, Metro City, NY</p>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mb-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>Open until 9:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mb-4">
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>(555) 012-3456</span>
                </div>
                <button className="w-full py-2 px-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-xs font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}