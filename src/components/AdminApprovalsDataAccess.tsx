import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  patientId: string;
  ward: string;
  status: 'Critical' | 'Observation' | 'Stable' | 'New';
  avatar?: string;
  initials?: string;
}

interface AuthorizedPatient extends Patient {
  permissions: {
    history: boolean;
    rx: boolean;
    labs: boolean;
    billing: boolean;
  };
}

export function AdminApprovalsDataAccess() {
  const [showAuditLog, setShowAuditLog] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('Dr. Sarah Smith');
  const [filterAvailable, setFilterAvailable] = useState('');
  const [filterAuthorized, setFilterAuthorized] = useState('');
  const [selectedAvailable, setSelectedAvailable] = useState<string[]>([]);
  const [notifyDoctor, setNotifyDoctor] = useState(false);

  const availablePatients: Patient[] = [
    { id: '1', name: 'Michael Chen', patientId: 'P-9021', ward: 'Ward 3A (Oncology)', status: 'Observation', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    { id: '2', name: 'Emma Lewis', patientId: 'P-9110', ward: 'Emergency', status: 'Critical', initials: 'EL' },
    { id: '3', name: 'Robert Fox', patientId: 'P-8822', ward: 'Ward 2B', status: 'Stable', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    { id: '4', name: 'Jane Doe', patientId: 'P-7741', ward: 'ICU', status: 'Critical', initials: 'JD' },
    { id: '5', name: 'Marcus Johnson', patientId: 'P-5512', ward: 'Ward 1A', status: 'New', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100' },
  ];

  const [authorizedPatients, setAuthorizedPatients] = useState<AuthorizedPatient[]>([
    {
      id: 'a1',
      name: 'Leslie Alexander',
      patientId: 'P-3321',
      ward: 'Post-Op',
      status: 'Stable',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      permissions: { history: true, rx: true, labs: true, billing: false }
    },
    {
      id: 'a2',
      name: 'John Cooper',
      patientId: 'P-1029',
      ward: 'Cardiology',
      status: 'Observation',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      permissions: { history: true, rx: true, labs: true, billing: true }
    },
    {
      id: 'a3',
      name: 'Sarah Parker',
      patientId: 'P-4491',
      ward: 'Cardiology',
      status: 'Stable',
      initials: 'SP',
      permissions: { history: false, rx: true, labs: false, billing: false }
    },
  ]);

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'Critical': return 'bg-red-50 text-red-700 border-red-100';
      case 'Observation': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Stable': return 'bg-green-50 text-green-700 border-green-100';
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  const getStatusLabel = (status: Patient['status']) => {
    return status === 'Observation' ? 'Obs' : status;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="w-full bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 z-10 sticky top-0">
        <div className="px-6 py-4 lg:px-10">
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <a className="text-slate-500 dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors" href="#">Dashboard</a>
            <span className="text-slate-500 dark:text-gray-400 text-sm font-medium">/</span>
            <a className="text-slate-500 dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors" href="#">Permissions</a>
            <span className="text-slate-500 dark:text-gray-400 text-sm font-medium">/</span>
            <span className="text-slate-900 dark:text-white text-sm font-medium">Data Approval</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="w-10 h-10 bg-[#0EA5E9] rounded-lg flex items-center justify-center text-white shadow-md shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              {/* Title & Description */}
              <div>
                <h1 className="text-slate-900 dark:text-white text-2xl lg:text-3xl font-bold tracking-tight">Doctor-Patient Access Control</h1>
                <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Manage view permissions and secure data access for medical staff.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold border border-blue-100 dark:border-blue-800">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              HIPAA Compliant Environment
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-20">
          {/* Doctor Search */}
          <section className="flex flex-col gap-6">
            <div className="w-full max-w-lg">
              <label className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Find Doctor</label>
              <div className="relative group">
                <input
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
                  placeholder="Search by Name, ID or Specialization..."
                  type="text"
                  value={searchDoctor}
                  onChange={(e) => setSearchDoctor(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-400">search</span>
              </div>
            </div>

            {/* Doctor Profile Card */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 z-0"></div>
              <div className="relative z-10 flex gap-5 items-center w-full">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 ring-4 ring-slate-100 dark:ring-gray-800"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200)' }}
                ></div>
                <div className="flex flex-col">
                  <h2 className="text-slate-900 dark:text-white text-xl font-bold">Dr. Sarah Smith</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">cardiology</span> Cardiology Dept
                    </span>
                    <span className="text-slate-300 dark:text-gray-600">|</span>
                    <span>ID #8832</span>
                    <span className="text-slate-300 dark:text-gray-600">|</span>
                    <span className="text-primary font-medium">Level 3 Clearance</span>
                  </div>
                </div>
                <div className="ml-auto hidden sm:flex flex-col items-end gap-1">
                  <span className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Active Caseload</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">12</span>
                </div>
              </div>
            </div>
          </section>

          {/* Patient Lists */}
          <section className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-6 items-start h-[680px] xl:h-[650px]">
            {/* Available Patients */}
            <div className="flex flex-col bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl shadow-sm h-full overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    Available Patients
                    <span className="bg-slate-200 dark:bg-gray-700 text-slate-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full">145</span>
                  </h3>
                  <button className="text-sm text-primary dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300">Select All</button>
                </div>
                <div className="relative">
                  <input
                    className="w-full text-sm h-9 pl-9 pr-3 rounded-md border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder="Filter by name or ward..."
                    type="text"
                    value={filterAvailable}
                    onChange={(e) => setFilterAvailable(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 text-[18px]">filter_list</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                {availablePatients.map((patient) => (
                  <label key={patient.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-gray-700 transition-all group">
                    <input
                      className="rounded border-slate-300 dark:border-gray-600 text-primary focus:ring-primary/20 w-4 h-4 mt-0.5"
                      type="checkbox"
                      checked={selectedAvailable.includes(patient.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAvailable([...selectedAvailable, patient.id]);
                        } else {
                          setSelectedAvailable(selectedAvailable.filter(id => id !== patient.id));
                        }
                      }}
                    />
                    {patient.avatar ? (
                      <div className="bg-gray-100 rounded-full w-10 h-10 bg-center bg-cover shrink-0" style={{ backgroundImage: `url(${patient.avatar})` }}></div>
                    ) : (
                      <div className="bg-slate-200 dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-slate-500 dark:text-gray-400 shrink-0 font-medium text-sm">{patient.initials}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{patient.name}</p>
                      <p className="text-xs text-slate-500 dark:text-gray-400 truncate">ID: {patient.patientId} • {patient.ward}</p>
                    </div>
                    <div className="shrink-0">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(patient.status)}`}>
                        {getStatusLabel(patient.status)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Transfer Buttons */}
            <div className="flex flex-row xl:flex-col items-center justify-center gap-3 h-full py-4 xl:py-0">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-sm text-slate-500 dark:text-gray-400 hover:text-primary hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all active:scale-95">
                <span className="material-symbols-outlined rotate-90 xl:rotate-0">arrow_forward</span>
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 shadow-sm text-slate-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all active:scale-95">
                <span className="material-symbols-outlined rotate-90 xl:rotate-0">arrow_back</span>
              </button>
            </div>

            {/* Authorized Patients */}
            <div className="flex flex-col bg-white dark:bg-gray-900 border border-primary/20 dark:border-blue-800/50 rounded-xl shadow-md h-full overflow-hidden ring-4 ring-primary/5 dark:ring-blue-900/20">
              <div className="p-4 border-b border-slate-200 dark:border-gray-800 bg-primary/5 dark:bg-blue-900/20">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    Authorized Access
                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">{authorizedPatients.length}</span>
                  </h3>
                  <button className="text-sm text-slate-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors">Revoke All</button>
                </div>
                <div className="relative mb-2">
                  <input
                    className="w-full text-sm h-9 pl-9 pr-3 rounded-md border border-primary/20 dark:border-blue-800/50 bg-white dark:bg-gray-800 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    placeholder="Find authorized patient..."
                    type="text"
                    value={filterAuthorized}
                    onChange={(e) => setFilterAuthorized(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-primary/60 dark:text-blue-400/60 text-[18px]">search</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-gray-400 flex items-center gap-1 justify-between">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">visibility</span>
                    Dr. Smith has access to:
                  </span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                {authorizedPatients.map((patient) => (
                  <div key={patient.id} className="flex flex-col p-3 bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700/50 rounded-lg border border-transparent hover:border-slate-100 dark:hover:border-gray-600 transition-all group relative shadow-sm">
                    <div className="flex items-center gap-3">
                      {patient.avatar ? (
                        <div className="bg-gray-100 rounded-full w-10 h-10 bg-center bg-cover shrink-0" style={{ backgroundImage: `url(${patient.avatar})` }}></div>
                      ) : (
                        <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white shrink-0 font-medium text-sm">{patient.initials}</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{patient.name}</p>
                        <p className="text-xs text-slate-500 dark:text-gray-400 truncate">ID: {patient.patientId} • {patient.ward}</p>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(patient.status)}`}>
                          {getStatusLabel(patient.status)}
                        </span>
                        <button className="text-slate-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30">
                          <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-gray-700 flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-slate-400 dark:text-gray-500 font-medium uppercase tracking-wide">Access:</span>
                      {patient.permissions.history && (
                        <button className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-colors">
                          <span className="material-symbols-outlined text-[12px]">check</span> History
                        </button>
                      )}
                      {patient.permissions.rx && (
                        <button className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-colors">
                          <span className="material-symbols-outlined text-[12px]">check</span> Rx
                        </button>
                      )}
                      {patient.permissions.labs && (
                        <button className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-colors">
                          <span className="material-symbols-outlined text-[12px]">check</span> Labs
                        </button>
                      )}
                      {patient.permissions.billing ? (
                        <button className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-colors">
                          <span className="material-symbols-outlined text-[12px]">check</span> Billing
                        </button>
                      ) : (
                        <button className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 border border-dashed border-slate-300 dark:border-gray-600 hover:bg-slate-200 dark:hover:bg-gray-600 transition-colors">
                          Billing
                        </button>
                      )}
                      <button className="ml-auto text-primary dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-0.5" title="Edit Permissions">
                        <span className="material-symbols-outlined text-[16px]">edit_square</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50">
                <p className="text-[11px] text-slate-500 dark:text-gray-400 text-center">Last updated by Admin #102 at 09:42 AM</p>
              </div>
            </div>
          </section>

          {/* Audit Log */}
          <section className="border border-slate-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
            <button
              onClick={() => setShowAuditLog(!showAuditLog)}
              className="w-full px-5 py-4 border-b border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50 flex justify-between items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-slate-500 dark:text-gray-400">history</span>
                Access Audit Log
              </h3>
              <span className={`material-symbols-outlined text-slate-500 dark:text-gray-400 text-[20px] transition-transform ${showAuditLog ? '' : 'rotate-180'}`}>expand_less</span>
            </button>
            {showAuditLog && (
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-500 dark:text-gray-400">
                  <thead className="bg-white dark:bg-gray-900 text-xs uppercase font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-gray-800">
                    <tr>
                      <th className="px-5 py-3">Timestamp</th>
                      <th className="px-5 py-3">Admin</th>
                      <th className="px-5 py-3">Action</th>
                      <th className="px-5 py-3">Patient</th>
                      <th className="px-5 py-3">Scope Changes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-gray-800">
                    <tr className="hover:bg-slate-50 dark:hover:bg-gray-800/50">
                      <td className="px-5 py-3 whitespace-nowrap">Oct 24, 2023 09:42 AM</td>
                      <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">Admin #102</td>
                      <td className="px-5 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800">Granted</span></td>
                      <td className="px-5 py-3">Leslie Alexander</td>
                      <td className="px-5 py-3 text-xs">Added: History, Rx, Labs</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-gray-800/50">
                      <td className="px-5 py-3 whitespace-nowrap">Oct 23, 2023 04:15 PM</td>
                      <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">SuperAdmin</td>
                      <td className="px-5 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-800">Revoked</span></td>
                      <td className="px-5 py-3">Marcus Johnson</td>
                      <td className="px-5 py-3 text-xs">Removed all access</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-gray-800/50">
                      <td className="px-5 py-3 whitespace-nowrap">Oct 23, 2023 02:00 PM</td>
                      <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">Admin #102</td>
                      <td className="px-5 py-3"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800">Modified</span></td>
                      <td className="px-5 py-3">Sarah Parker</td>
                      <td className="px-5 py-3 text-xs">Removed: Billing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-slate-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-4 lg:px-10 z-20 sticky bottom-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="text-slate-500 dark:text-gray-400 font-medium text-sm px-4 py-2 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Cancel</button>
            <div className="relative hidden md:block">
              <select className="pl-3 pr-8 py-2 rounded-lg border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-sm text-slate-900 dark:text-white focus:ring-primary focus:border-primary cursor-pointer hover:border-slate-400 dark:hover:border-gray-600 transition-colors">
                <option disabled selected value="">Apply Permission Template...</option>
                <option value="general">General Physician (History, Rx)</option>
                <option value="emergency">Emergency Access (Full)</option>
                <option value="specialist">Specialist Review (Labs, Imaging)</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto justify-end">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                className="rounded border-slate-300 dark:border-gray-600 text-primary focus:ring-primary/20 w-4 h-4"
                type="checkbox"
                checked={notifyDoctor}
                onChange={(e) => setNotifyDoctor(e.target.checked)}
              />
              <span className="text-sm text-slate-900 dark:text-white">Notify Doctor of Changes</span>
            </label>
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-900 dark:text-white font-medium text-sm hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                Save as Draft
              </button>
              <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-blue-600 transition-colors shadow-md shadow-blue-200 dark:shadow-blue-900/30 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">save</span>
                Save &amp; Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}