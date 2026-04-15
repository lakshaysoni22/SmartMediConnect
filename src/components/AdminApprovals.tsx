import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';

interface AdminApprovalsProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

interface Patient {
  id: string;
  name: string;
  patientId: string;
  ward: string;
  status: 'critical' | 'observation' | 'stable' | 'new';
  avatar?: string;
  initials?: string;
}

interface AuditLog {
  id: string;
  action: 'added' | 'revoked' | 'modified';
  patientContext: string;
  administrator: string;
  adminAvatar?: string;
  adminInitials?: string;
  timestamp: string;
}

export function AdminApprovals({ onNavigate, onLogout }: AdminApprovalsProps) {
  const [searchDoctor, setSearchDoctor] = useState('Dr. Sarah Smith');
  const [filterAvailable, setFilterAvailable] = useState('');
  const [searchLogs, setSearchLogs] = useState('');
  const [selectedAvailable, setSelectedAvailable] = useState<Set<string>>(new Set());
  const [selectedAuthorized, setSelectedAuthorized] = useState<Set<string>>(new Set());

  // Available patients (not yet authorized)
  const [availablePatients, setAvailablePatients] = useState<Patient[]>([
    { id: '1', name: 'Michael Chen', patientId: 'P-9021', ward: 'Ward 3A (Oncology)', status: 'observation', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { id: '2', name: 'Emma Lewis', patientId: 'P-9110', ward: 'Emergency', status: 'critical', initials: 'EL' },
    { id: '3', name: 'Robert Fox', patientId: 'P-8822', ward: 'Ward 2B', status: 'stable', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { id: '4', name: 'Jane Doe', patientId: 'P-7741', ward: 'ICU', status: 'critical', initials: 'JD' },
    { id: '5', name: 'Marcus Johnson', patientId: 'P-5512', ward: 'Ward 1A', status: 'new', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  ]);

  // Authorized patients (already have access)
  const [authorizedPatients, setAuthorizedPatients] = useState<Patient[]>([
    { id: '6', name: 'Leslie Alexander', patientId: 'P-3321', ward: 'Post-Op', status: 'stable', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { id: '7', name: 'John Cooper', patientId: 'P-1029', ward: 'Cardiology', status: 'observation', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
    { id: '8', name: 'Sarah Parker', patientId: 'P-4491', ward: 'Cardiology', status: 'stable', initials: 'SP' },
  ]);

  // Audit logs
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      action: 'added',
      patientContext: 'Michael Chen (P-9021)',
      administrator: 'Admin User',
      adminAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      timestamp: 'Oct 24, 2023 09:42:15 AM'
    },
    {
      id: '2',
      action: 'revoked',
      patientContext: 'Sarah Parker (P-4491)',
      administrator: 'Dr. John Doe (Chief)',
      adminInitials: 'JD',
      timestamp: 'Oct 23, 2023 04:15:22 PM'
    },
    {
      id: '3',
      action: 'modified',
      patientContext: 'Access Level updated for 3 Patients',
      administrator: 'Admin User',
      adminAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      timestamp: 'Oct 22, 2023 11:30:05 AM'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'observation':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'stable':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getStatusLabel = (status: string) => {
    if (status === 'observation') return 'Observation';
    if (status === 'critical') return 'Critical';
    if (status === 'stable') return 'Stable';
    if (status === 'new') return 'New';
    return status;
  };

  const toggleAvailableSelection = (id: string) => {
    const newSet = new Set(selectedAvailable);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedAvailable(newSet);
  };

  const toggleAuthorizedSelection = (id: string) => {
    const newSet = new Set(selectedAuthorized);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedAuthorized(newSet);
  };

  const moveToAuthorized = () => {
    const patientsToMove = availablePatients.filter(p => selectedAvailable.has(p.id));
    setAuthorizedPatients([...authorizedPatients, ...patientsToMove]);
    setAvailablePatients(availablePatients.filter(p => !selectedAvailable.has(p.id)));
    setSelectedAvailable(new Set());
  };

  const moveToAvailable = () => {
    const patientsToMove = authorizedPatients.filter(p => selectedAuthorized.has(p.id));
    setAvailablePatients([...availablePatients, ...patientsToMove]);
    setAuthorizedPatients(authorizedPatients.filter(p => !selectedAuthorized.has(p.id)));
    setSelectedAuthorized(new Set());
  };

  const removeFromAuthorized = (id: string) => {
    const patient = authorizedPatients.find(p => p.id === id);
    if (patient) {
      setAvailablePatients([...availablePatients, patient]);
      setAuthorizedPatients(authorizedPatients.filter(p => p.id !== id));
    }
  };

  const selectAllAvailable = () => {
    const filtered = availablePatients.filter(p => 
      p.name.toLowerCase().includes(filterAvailable.toLowerCase()) ||
      p.ward.toLowerCase().includes(filterAvailable.toLowerCase())
    );
    setSelectedAvailable(new Set(filtered.map(p => p.id)));
  };

  const revokeAll = () => {
    setAvailablePatients([...availablePatients, ...authorizedPatients]);
    setAuthorizedPatients([]);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'added':
        return { icon: 'person_add', color: 'bg-green-100 text-green-700' };
      case 'revoked':
        return { icon: 'block', color: 'bg-red-100 text-red-700' };
      case 'modified':
        return { icon: 'tune', color: 'bg-blue-100 text-blue-700' };
      default:
        return { icon: 'info', color: 'bg-slate-100 text-slate-700' };
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'added':
        return 'Patient Added';
      case 'revoked':
        return 'Access Revoked';
      case 'modified':
        return 'Permissions Modified';
      default:
        return action;
    }
  };

  const filteredAvailable = availablePatients.filter(p => 
    p.name.toLowerCase().includes(filterAvailable.toLowerCase()) ||
    p.ward.toLowerCase().includes(filterAvailable.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#137fec] rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Doctor-Patient Access Control</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage view permissions and secure data access for medical staff</p>
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
      <div className="flex-1 overflow-y-auto p-4 lg:p-5">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-5 pb-20">
          {/* Search Doctor Section */}
          <section className="flex flex-col gap-4">
            <div className="w-full max-w-lg">
              <label className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                Find Doctor
              </label>
              <div className="relative group">
                <input
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] transition-all text-sm shadow-sm"
                  placeholder="Search by Name, ID or Specialization..."
                  type="text"
                  value={searchDoctor}
                  onChange={(e) => setSearchDoctor(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                  search
                </span>
              </div>
            </div>

            {/* Doctor Profile Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#137fec]/5 rounded-bl-full -mr-8 -mt-8 z-0"></div>
              <div className="relative z-10 flex gap-5 items-center w-full">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-20 w-20 ring-4 ring-slate-100 dark:ring-slate-700"
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop")' }}
                ></div>
                <div className="flex flex-col">
                  <h2 className="text-slate-900 dark:text-white text-xl font-bold">Dr. Sarah Smith</h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">cardiology</span>
                      Cardiology Dept
                    </span>
                    <span className="text-slate-300">|</span>
                    <span>ID #8832</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[#137fec] font-medium">Level 3 Clearance</span>
                  </div>
                </div>
                <div className="ml-auto hidden sm:flex flex-col items-end gap-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                    Active Caseload
                  </span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {authorizedPatients.length}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Patient Lists Section */}
          <section className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-6 items-start h-[650px] xl:h-[600px]">
            {/* Available Patients */}
            <div className="flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm h-full overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    Available Patients
                    <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-0.5 rounded-full">
                      {availablePatients.length}
                    </span>
                  </h3>
                  <button 
                    onClick={selectAllAvailable}
                    className="text-sm text-[#137fec] font-medium hover:text-blue-700"
                  >
                    Select All
                  </button>
                </div>
                <div className="relative">
                  <input
                    className="w-full text-sm h-9 pl-9 pr-3 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] outline-none"
                    placeholder="Filter by name or ward..."
                    type="text"
                    value={filterAvailable}
                    onChange={(e) => setFilterAvailable(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    filter_list
                  </span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredAvailable.map((patient) => (
                  <label
                    key={patient.id}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all group"
                  >
                    <input
                      className="rounded border-slate-300 dark:border-slate-600 text-[#137fec] focus:ring-[#137fec]/20 w-4 h-4 mt-0.5"
                      type="checkbox"
                      checked={selectedAvailable.has(patient.id)}
                      onChange={() => toggleAvailableSelection(patient.id)}
                    />
                    {patient.avatar ? (
                      <div
                        className="bg-gray-100 rounded-full w-10 h-10 bg-center bg-cover shrink-0"
                        style={{ backgroundImage: `url("${patient.avatar}")` }}
                      ></div>
                    ) : (
                      <div className="bg-slate-200 dark:bg-slate-700 rounded-full w-10 h-10 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0 font-medium text-sm">
                        {patient.initials}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {patient.name}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                        ID: {patient.patientId} • {patient.ward}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadge(patient.status)}`}>
                        {getStatusLabel(patient.status)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Transfer Buttons */}
            <div className="flex flex-row xl:flex-col items-center justify-center gap-3 h-full py-4 xl:py-0">
              <button
                onClick={moveToAuthorized}
                disabled={selectedAvailable.size === 0}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 shadow-sm text-slate-600 dark:text-slate-400 hover:text-[#137fec] hover:border-[#137fec] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add Selected"
              >
                <span className="material-symbols-outlined rotate-90 xl:rotate-0">arrow_forward</span>
              </button>
              <button
                onClick={moveToAvailable}
                disabled={selectedAuthorized.size === 0}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 shadow-sm text-slate-600 dark:text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Remove Selected"
              >
                <span className="material-symbols-outlined rotate-90 xl:rotate-0">arrow_back</span>
              </button>
            </div>

            {/* Authorized Patients */}
            <div className="flex flex-col bg-white dark:bg-slate-800 border border-[#137fec]/20 rounded-xl shadow-md h-full overflow-hidden ring-4 ring-[#137fec]/5">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-[#137fec]/5 dark:bg-[#137fec]/10">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    Authorized Access
                    <span className="bg-[#137fec] text-white text-xs px-2 py-0.5 rounded-full">
                      {authorizedPatients.length}
                    </span>
                  </h3>
                  <button 
                    onClick={revokeAll}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 font-medium transition-colors"
                  >
                    Revoke All
                  </button>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                  These patients are visible to Dr. Smith.
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {authorizedPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all group relative"
                  >
                    <input
                      className="rounded border-slate-300 dark:border-slate-600 text-[#137fec] focus:ring-[#137fec]/20 w-4 h-4 mt-0.5"
                      type="checkbox"
                      checked={selectedAuthorized.has(patient.id)}
                      onChange={() => toggleAuthorizedSelection(patient.id)}
                    />
                    {patient.avatar ? (
                      <div
                        className="bg-gray-100 rounded-full w-10 h-10 bg-center bg-cover shrink-0"
                        style={{ backgroundImage: `url("${patient.avatar}")` }}
                      ></div>
                    ) : (
                      <div className="bg-[#137fec] rounded-full w-10 h-10 flex items-center justify-center text-white shrink-0 font-medium text-sm">
                        {patient.initials}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {patient.name}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                        ID: {patient.patientId} • {patient.ward}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadge(patient.status)}`}>
                        {getStatusLabel(patient.status)}
                      </span>
                      <button
                        onClick={() => removeFromAuthorized(patient.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <p className="text-[11px] text-slate-600 dark:text-slate-400 text-center">
                  Last updated by Admin #102 at 09:42 AM
                </p>
              </div>
            </div>
          </section>

          {/* Audit Trail */}
          <section className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold">Audit Trail</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Chronological log of data access changes for Dr. Sarah Smith.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <input
                    className="h-9 pl-9 pr-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-[#137fec] focus:ring-1 focus:ring-[#137fec] w-full sm:w-64"
                    placeholder="Search logs..."
                    type="text"
                    value={searchLogs}
                    onChange={(e) => setSearchLogs(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-[18px]">
                    search
                  </span>
                </div>
                <button className="h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Filter
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-auto max-h-[400px]">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-3 min-w-[180px]">Action</th>
                      <th className="px-6 py-3 min-w-[200px]">Patient Context</th>
                      <th className="px-6 py-3 min-w-[200px]">Administrator</th>
                      <th className="px-6 py-3 min-w-[180px]">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {auditLogs.map((log) => {
                      const actionStyle = getActionIcon(log.action);
                      return (
                        <tr key={log.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2">
                              <span className={`${actionStyle.color} p-1 rounded-md`}>
                                <span className="material-symbols-outlined text-[16px] block">
                                  {actionStyle.icon}
                                </span>
                              </span>
                              <span className="font-medium text-slate-900 dark:text-white">
                                {getActionLabel(log.action)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-slate-900 dark:text-white">
                            {log.patientContext}
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2">
                              {log.adminAvatar ? (
                                <div
                                  className="w-6 h-6 rounded-full bg-slate-200 bg-center bg-cover"
                                  style={{ backgroundImage: `url("${log.adminAvatar}")` }}
                                ></div>
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                                  {log.adminInitials}
                                </div>
                              )}
                              <span className="text-slate-600 dark:text-slate-400">
                                {log.administrator}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-slate-600 dark:text-slate-400 font-mono text-xs">
                            {log.timestamp}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-center">
                <button className="text-sm text-[#137fec] font-medium hover:underline">
                  View Full Logs
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 lg:px-10 z-20 sticky bottom-0">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="text-slate-600 dark:text-slate-400 font-medium text-sm px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              Save as Draft
            </button>
            <button className="px-6 py-2.5 rounded-lg bg-[#137fec] text-white font-medium text-sm hover:bg-blue-600 transition-colors shadow-md shadow-blue-200 dark:shadow-blue-900/30 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save &amp; Apply Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}