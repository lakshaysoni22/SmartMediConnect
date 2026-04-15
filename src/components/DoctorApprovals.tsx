import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { DoctorNotificationCenter } from './DoctorNotificationCenter';

interface ApprovedPatient {
  id: string;
  name: string;
  patientId: string;
  ward: string;
  avatar?: string;
  initials?: string;
  status: 'critical' | 'stable' | 'observation';
  permissions: string[];
}

export function DoctorApprovals() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const approvedPatients: ApprovedPatient[] = [
    {
      id: '1',
      name: 'Michael Chen',
      patientId: 'P-9021',
      ward: 'Ward 3A (Oncology)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      status: 'observation',
      permissions: ['History', 'Labs', 'Imaging']
    },
    {
      id: '2',
      name: 'Emma Lewis',
      patientId: 'P-9110',
      ward: 'Emergency',
      initials: 'EL',
      status: 'critical',
      permissions: ['Full Access']
    },
    {
      id: '3',
      name: 'Robert Fox',
      patientId: 'P-8822',
      ward: 'Ward 2B',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      status: 'stable',
      permissions: ['History', 'Rx']
    },
    {
      id: '4',
      name: 'Leslie Alexander',
      patientId: 'P-3321',
      ward: 'Post-Op',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      status: 'stable',
      permissions: ['Consults', 'Labs']
    }
  ];

  const filteredPatients = approvedPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-800 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
            Critical
          </span>
        );
      case 'observation':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
            Observation
          </span>
        );
      case 'stable':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
            Stable
          </span>
        );
      default:
        return null;
    }
  };

  const getPermissionBadge = (permission: string) => {
    if (permission === 'Full Access') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
          <span className="material-symbols-outlined text-[14px] mr-1">lock_open</span>
          Full Access
        </span>
      );
    }

    const colorMap: Record<string, string> = {
      'History': 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800',
      'Labs': 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-800',
      'Imaging': 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border-teal-100 dark:border-teal-800',
      'Rx': 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-100 dark:border-orange-800',
      'Consults': 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800'
    };

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${colorMap[permission] || 'bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400 border-slate-100 dark:border-slate-800'}`}>
        {permission}
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] dark:bg-slate-950 overflow-hidden h-full">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
          </div>
          {/* Title & Subtitle */}
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">My Approved Patient Access</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">View your authorized patient list and specific data permissions</p>
          </div>
        </div>
        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <NotificationIcon onClick={() => setShowNotifications(!showNotifications)} />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-20">
          {/* Doctor Profile Card */}
          <section className="flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full -mr-10 -mt-10 z-0"></div>
              <div className="relative z-10 flex gap-6 items-center w-full">
                <div 
                  className="w-24 h-24 rounded-full bg-slate-200 bg-center bg-cover ring-4 ring-white dark:ring-slate-700 shadow-md"
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop")' }}
                ></div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dr. Sarah Smith</h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                      Active
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400 mt-2">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">cardiology</span>
                      Cardiology Dept
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">badge</span>
                      ID #8832
                    </span>
                    <span className="flex items-center gap-1.5 text-primary font-medium">
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                      Level 3 Clearance
                    </span>
                  </div>
                </div>
                <div className="ml-auto hidden sm:flex flex-col items-end gap-1 px-4">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Active Caseload</span>
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">12</span>
                </div>
              </div>
            </div>
          </section>

          {/* Authorized Patients Section */}
          <section className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Authorized Patients
                <span className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-bold border border-primary/20">12</span>
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <input
                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
                    placeholder="Search patients by name or ID..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                </div>
                <button className="h-10 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                  Filters
                </button>
              </div>
            </div>

            {/* Patient List */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col divide-y divide-slate-100 dark:divide-slate-700">
              {/* Table Header - Hidden on mobile */}
              <div className="hidden md:grid grid-cols-[3fr_1.5fr_2fr_1.5fr] gap-4 px-6 py-3 bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
                <div>Patient Details</div>
                <div>Status</div>
                <div>Permissions</div>
                <div className="text-right">Action</div>
              </div>

              {/* Patient Rows */}
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="group flex flex-col md:grid md:grid-cols-[3fr_1.5fr_2fr_1.5fr] gap-4 p-5 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all items-start md:items-center">
                  {/* Patient Details */}
                  <div className="flex items-center gap-4 w-full">
                    <div className="relative shrink-0">
                      {patient.avatar ? (
                        <div
                          className="w-12 h-12 rounded-full bg-slate-200 bg-center bg-cover shadow-sm ring-2 ring-white dark:ring-slate-700"
                          style={{ backgroundImage: `url("${patient.avatar}")` }}
                        ></div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-lg shadow-sm ring-2 ring-white dark:ring-slate-700">
                          {patient.initials}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">{patient.name}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">ID: {patient.patientId} • {patient.ward}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <span className="md:hidden text-xs font-medium text-slate-500 w-20">Status:</span>
                    {getStatusBadge(patient.status)}
                  </div>

                  {/* Permissions */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <span className="md:hidden text-xs font-medium text-slate-500 mb-1">Permissions:</span>
                    <div className="flex flex-wrap gap-2">
                      {patient.permissions.map((permission, idx) => (
                        <span key={idx}>
                          {getPermissionBadge(permission)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="w-full flex justify-end">
                    <button className="w-full md:w-auto px-4 py-2 rounded-lg border border-primary dark:border-slate-500 bg-white dark:bg-white text-primary dark:text-slate-700 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary transition-all text-sm font-medium flex items-center justify-center gap-2 shadow-sm active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">clinical_notes</span>
                      View Record
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing 1-{filteredPatients.length} of {approvedPatients.length} patients
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700">
                  Next
                </button>
              </div>
            </div>
          </section>
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