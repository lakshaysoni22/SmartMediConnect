import React, { useState, useEffect, useRef } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { DoctorNotificationCenter } from './DoctorNotificationCenter';

interface Patient {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: string;
  condition: string;
  lastVisit: string;
  status: 'Stable' | 'Critical' | 'Observation';
  gradient: string;
  bloodType: string;
  allergies: string;
  heartRate: number;
  bloodPressure: string;
  oxygen: string;
}

export function DoctorPatients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterAdmission, setFilterAdmission] = useState('All Patients');
  const [filterWard, setFilterWard] = useState('All Wards');
  const [quickNote, setQuickNote] = useState('Patient reports mild headaches since yesterday. Prescribed Ibuprofen 400mg. Advised to increase water intake.');
  const [noteSaved, setNoteSaved] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Ref to store timeout IDs for cleanup
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '#9928',
      name: 'Sarah Jenkins',
      initials: 'SJ',
      age: 34,
      gender: 'F',
      condition: 'Cardiac arrhythmia',
      lastVisit: '2 hrs ago',
      status: 'Stable',
      gradient: 'from-indigo-500 to-blue-600',
      bloodType: 'O+',
      allergies: 'NKA',
      heartRate: 72,
      bloodPressure: '120/80',
      oxygen: '98%',
    },
    {
      id: '#1102',
      name: 'Marcus Wright',
      initials: 'MW',
      age: 45,
      gender: 'M',
      condition: 'Hypertension',
      lastVisit: 'Yesterday',
      status: 'Critical',
      gradient: 'from-orange-400 to-rose-500',
      bloodType: 'A+',
      allergies: 'Penicillin',
      heartRate: 88,
      bloodPressure: '145/95',
      oxygen: '96%',
    },
    {
      id: '#8832',
      name: 'Emily Chen',
      initials: 'EC',
      age: 29,
      gender: 'F',
      condition: 'Post-op Recovery',
      lastVisit: 'Oct 22',
      status: 'Observation',
      gradient: 'from-sky-400 to-cyan-500',
      bloodType: 'B+',
      allergies: 'NKA',
      heartRate: 76,
      bloodPressure: '118/75',
      oxygen: '99%',
    },
    {
      id: '#7712',
      name: 'David Miller',
      initials: 'DM',
      age: 62,
      gender: 'M',
      condition: 'Routine Checkup',
      lastVisit: 'Oct 20',
      status: 'Stable',
      gradient: 'from-slate-500 to-slate-600',
      bloodType: 'AB+',
      allergies: 'Latex',
      heartRate: 68,
      bloodPressure: '125/82',
      oxygen: '97%',
    },
  ]);

  const currentPatient = selectedPatient || patients[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Stable':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Critical':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'Observation':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'All Status' || patient.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleContactPatient = () => {
    alert(`📞 Calling ${currentPatient.name}...\n\nPhone: +1 (555) 123-4567\nEmail: ${currentPatient.name.toLowerCase().replace(' ', '.')}@email.com\n\nWould you like to:\n• Make a voice call\n• Send an SMS\n• Send an email`);
  };

  const handleViewFullProfile = () => {
    alert(`📋 Full Medical Profile - ${currentPatient.name}\n\n` +
      `Patient ID: ${currentPatient.id}\n` +
      `Age: ${currentPatient.age} years\n` +
      `Gender: ${currentPatient.gender === 'F' ? 'Female' : 'Male'}\n` +
      `Blood Type: ${currentPatient.bloodType}\n` +
      `Allergies: ${currentPatient.allergies}\n\n` +
      `Current Condition: ${currentPatient.condition}\n` +
      `Status: ${currentPatient.status}\n\n` +
      `Vital Signs:\n` +
      `• Heart Rate: ${currentPatient.heartRate} BPM\n` +
      `• Blood Pressure: ${currentPatient.bloodPressure} mmHg\n` +
      `• Oxygen: ${currentPatient.oxygen}\n\n` +
      `Opening full medical record...`);
  };

  const handleSaveNote = () => {
    setNoteSaved(true);
    const timeout = setTimeout(() => setNoteSaved(false), 2000);
    timeoutRefs.current.push(timeout);
    alert(`✅ Note Saved Successfully!\n\nAdded to ${currentPatient.name}'s medical record.\n\nNote:\n"${quickNote}"\n\nTimestamp: ${new Date().toLocaleString()}`);
  };

  const handleViewAllHistory = () => {
    alert(`📋 Complete Medical History - ${currentPatient.name}\n\n` +
      `Recent Visits:\n` +
      `• Today 10:30 AM - Routine Checkup (Dr. Smith)\n` +
      `• Oct 24 - Lab Results: Blood Work (Pending Review)\n` +
      `• Oct 12 - Prescription Renewed (Lisinopril 10mg)\n` +
      `• Sep 28 - Follow-up Consultation\n` +
      `• Sep 15 - Initial Diagnosis\n\n` +
      `Total Visits: 24\n` +
      `Last Hospitalization: Aug 2023`);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 dark:bg-slate-950 relative h-full overflow-hidden">
      {/* Header - Consistent Style */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              people
            </span>
          </div>
          {/* Title & Subtitle */}
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">My Patients</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">View and manage your patient records</p>
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

      {/* Background Blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3"></div>

      {/* Content Section */}
      <div className="flex-shrink-0 px-8 py-4 flex flex-col gap-4">
        {/* Search and Filters */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 px-8 pb-8 overflow-hidden">
        {/* Patient Table */}
        <div className="flex-1 bg-white/92 dark:bg-slate-900/92 backdrop-blur-[24px] rounded-2xl flex flex-col overflow-hidden shadow-soft ring-1 ring-slate-900/5 dark:ring-white/5">
          <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm z-10 border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Age/Gender
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className={`cursor-pointer group border-l-[3px] transition-colors ${
                      selectedPatient?.id === patient.id
                        ? 'bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-l-blue-600'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-l-transparent'
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`h-10 w-10 rounded-full bg-gradient-to-br ${patient.gradient} flex items-center justify-center text-white font-bold text-sm mr-3 shadow-md ring-2 ring-white dark:ring-slate-900`}
                        >
                          {patient.initials}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">{patient.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{patient.condition}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {patient.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {patient.age}
                      {patient.gender}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {patient.lastVisit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                          patient.status
                        )}`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <span
                        className={`material-symbols-outlined ${
                          selectedPatient?.id === patient.id ? 'text-blue-600' : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400'
                        } transition-colors`}
                      >
                        chevron_right
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between bg-white/50 dark:bg-slate-900/50">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Showing 1-{filteredPatients.length} of 142 patients
            </p>
            <div className="flex gap-2">
              <button
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 disabled:opacity-50 transition-colors"
                disabled
                onClick={() => alert('Previous page')}
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <button 
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                onClick={() => alert('Next page - Loading patients 5-8...')}
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Patient Details */}
        <div className="w-[400px] flex-shrink-0 flex flex-col gap-6 overflow-y-auto pb-4">
          {/* Patient Info Card */}
          <div className="bg-white/92 dark:bg-slate-900/92 backdrop-blur-[24px] p-6 rounded-2xl flex flex-col gap-6 relative overflow-hidden shadow-soft ring-1 ring-slate-900/5 dark:ring-white/5">
            <div className="absolute top-0 right-0 p-4">
              <div className="flex items-center gap-1.5 text-[10px] text-blue-600 dark:text-blue-400 font-bold border border-blue-600/20 dark:border-blue-400/20 rounded-full px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30">
                <span className="material-symbols-outlined text-[12px]">lock</span>
                PHI SECURED
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <div className={`h-[72px] w-[72px] rounded-full bg-gradient-to-br ${currentPatient.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-100 dark:shadow-indigo-900/30 ring-4 ring-white dark:ring-slate-900`}>
                {currentPatient.initials}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{currentPatient.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-0.5">
                  ID: {currentPatient.id} • {currentPatient.age} Years • {currentPatient.gender === 'F' ? 'Female' : 'Male'}
                </p>
                <div className="mt-2 flex gap-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                    {currentPatient.bloodType} Blood
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                    {currentPatient.allergies}
                  </span>
                </div>
              </div>
            </div>

            {/* Vital Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 p-4 rounded-2xl flex flex-col items-center gap-1 shadow-sm transition-all hover:-translate-y-1">
                <span className="material-symbols-outlined text-rose-500 text-lg mb-1">favorite</span>
                <span className="text-xl font-bold text-slate-800 dark:text-white">{currentPatient.heartRate}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">BPM</span>
              </div>
              <div className="bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 p-4 rounded-2xl flex flex-col items-center gap-1 shadow-sm transition-all hover:-translate-y-1">
                <span className="material-symbols-outlined text-blue-500 text-lg mb-1">water_drop</span>
                <span className="text-xl font-bold text-slate-800 dark:text-white">{currentPatient.bloodPressure}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">BP</span>
              </div>
              <div className="bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 p-4 rounded-2xl flex flex-col items-center gap-1 shadow-sm transition-all hover:-translate-y-1">
                <span className="material-symbols-outlined text-cyan-500 text-lg mb-1">air</span>
                <span className="text-xl font-bold text-slate-800 dark:text-white">{currentPatient.oxygen}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">SpO2</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={handleContactPatient}
                className="flex-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm text-slate-500 dark:text-slate-400">call</span>
                Contact
              </button>
              <button 
                onClick={handleViewFullProfile}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20"
              >
                View Full Profile
              </button>
            </div>
          </div>

          {/* Recent History */}
          <div className="bg-white/92 dark:bg-slate-900/92 backdrop-blur-[24px] p-6 rounded-2xl shadow-soft ring-1 ring-slate-900/5 dark:ring-white/5">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide">
                Recent History
              </h4>
              <button 
                onClick={handleViewAllHistory}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
              >
                View All
              </button>
            </div>
            <div className="relative pl-4 border-l border-slate-200 dark:border-slate-700 space-y-7">
              <div className="relative group">
                <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-900 shadow-sm group-hover:scale-125 transition-transform"></div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-slate-400">Today, 10:30 AM</span>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">Routine Checkup</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Dr. Smith • General Ward</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-white dark:ring-slate-900 shadow-sm group-hover:scale-125 transition-transform"></div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-slate-400">Oct 24, 2023</span>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">Lab Results: Blood Work</p>
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-500 text-xs font-semibold mt-0.5 bg-amber-50 dark:bg-amber-900/30 self-start px-2 py-0.5 rounded-md">
                    <span className="material-symbols-outlined text-[14px]">pending</span>
                    Pending Review
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900 shadow-sm group-hover:scale-125 transition-transform"></div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-slate-400">Oct 12, 2023</span>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">Prescription Renewed</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Lisinopril 10mg</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notes */}
          <div className="bg-white/92 dark:bg-slate-900/92 backdrop-blur-[24px] p-6 rounded-2xl flex flex-col gap-4 flex-1 shadow-soft ring-1 ring-slate-900/5 dark:ring-white/5">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wide">
                <span className="material-symbols-outlined text-lg text-blue-600 dark:text-blue-400">edit_note</span>
                Quick Notes
              </h4>
              <span className={`text-[10px] text-emerald-600 dark:text-emerald-400 font-bold transition-opacity ${noteSaved ? 'opacity-100' : 'opacity-0'}`}>
                ✓ Saved
              </span>
            </div>
            <textarea
              className="flex-1 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 resize-none shadow-inner transition-all min-h-[120px]"
              placeholder="Type observation notes here..."
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
            />
            <div className="flex justify-end">
              <button 
                onClick={handleSaveNote}
                className="text-xs bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-semibold shadow-sm"
              >
                Add to Medical Record
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Center */}
      <DoctorNotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </div>
  );
}