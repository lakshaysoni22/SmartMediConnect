import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';

interface Patient {
  id: string;
  name: string;
  patientId: string;
  ward: string;
  avatar?: string;
  initials?: string;
  status: 'critical' | 'stable' | 'observation' | 'recovering';
  permissions: string[];
}

export function DoctorPatientAccess() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const allPatients: Patient[] = [
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
    },
    {
      id: '5',
      name: 'Sarah Johnson',
      patientId: 'P-8745',
      ward: 'ICU',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      status: 'critical',
      permissions: ['Full Access']
    },
    {
      id: '6',
      name: 'David Miller',
      patientId: 'P-7621',
      ward: 'Ward 4C',
      initials: 'DM',
      status: 'recovering',
      permissions: ['History', 'Labs', 'Rx']
    },
    {
      id: '7',
      name: 'Jennifer White',
      patientId: 'P-6543',
      ward: 'Cardiology',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      status: 'stable',
      permissions: ['History', 'Imaging', 'Labs']
    },
    {
      id: '8',
      name: 'Thomas Anderson',
      patientId: 'P-5432',
      ward: 'Ward 1A',
      initials: 'TA',
      status: 'observation',
      permissions: ['History', 'Consults']
    },
    {
      id: '9',
      name: 'Maria Garcia',
      patientId: 'P-4321',
      ward: 'Maternity',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
      status: 'stable',
      permissions: ['Full Access']
    },
    {
      id: '10',
      name: 'James Brown',
      patientId: 'P-3210',
      ward: 'Emergency',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      status: 'critical',
      permissions: ['Full Access']
    },
    {
      id: '11',
      name: 'Patricia Davis',
      patientId: 'P-2109',
      ward: 'Ward 5B',
      initials: 'PD',
      status: 'recovering',
      permissions: ['History', 'Labs', 'Rx']
    },
    {
      id: '12',
      name: 'Christopher Wilson',
      patientId: 'P-1098',
      ward: 'Neurology',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      status: 'stable',
      permissions: ['History', 'Imaging', 'Labs', 'Consults']
    }
  ];

  // Filter patients
  const filteredPatients = allPatients.filter(patient => {
    const matchesSearch = searchQuery === '' || 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-100 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
            Critical
          </span>
        );
      case 'stable':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-100 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
            Stable
          </span>
        );
      case 'observation':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
            Observation
          </span>
        );
      case 'recovering':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
            Recovering
          </span>
        );
      default:
        return null;
    }
  };

  const getPermissionBadge = (permission: string) => {
    const styles: Record<string, string> = {
      'History': 'bg-blue-50 text-blue-700 border-blue-100',
      'Labs': 'bg-purple-50 text-purple-700 border-purple-100',
      'Imaging': 'bg-teal-50 text-teal-700 border-teal-100',
      'Rx': 'bg-orange-50 text-orange-700 border-orange-100',
      'Consults': 'bg-indigo-50 text-indigo-700 border-indigo-100',
      'Full Access': 'bg-emerald-50 text-emerald-700 border-emerald-100'
    };

    return (
      <span 
        key={permission}
        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${styles[permission] || 'bg-slate-50 text-slate-700 border-slate-100'}`}
      >
        {permission === 'Full Access' && (
          <span className="material-symbols-outlined text-[14px] mr-1">lock_open</span>
        )}
        {permission}
      </span>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f8fafc]">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md border-b border-[#dbe0e6]">
        <div className="px-6 py-4 lg:px-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-center">
              <h1 className="text-[#111418] text-xl font-bold tracking-tight">My Approved Patient Access</h1>
              <p className="text-[#617589] text-sm mt-1">View your authorized patient list and specific data permissions.</p>
            </div>
            <NotificationIcon 
              showDot={true}
              onClick={() => window.dispatchEvent(new CustomEvent('openNotificationCenter'))}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 lg:p-10">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-20">
          {/* Doctor Profile Card */}
          <section className="flex flex-col gap-6">
            <div className="bg-white rounded-xl p-6 border border-[#dbe0e6] shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full -mr-10 -mt-10 z-0"></div>
              <div className="relative z-10 flex gap-6 items-center w-full">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 ring-4 ring-white shadow-md"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop)' }}
                ></div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[#111418] text-2xl font-bold">Dr. Sarah Smith</h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Active
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#617589] mt-2">
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
                  <span className="text-xs text-[#617589] uppercase tracking-wider font-semibold">Active Caseload</span>
                  <span className="text-3xl font-bold text-[#111418]">{filteredPatients.length}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Authorized Patients Section */}
          <section className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-[#111418] text-lg font-bold flex items-center gap-2">
                Authorized Patients
                <span className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-bold border border-primary/20">
                  {filteredPatients.length}
                </span>
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-lg border border-[#dbe0e6] bg-white text-[#111418] placeholder-[#94a3b8] focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm" 
                    placeholder="Search patients by name or ID..." 
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[20px]">search</span>
                </div>
                <button 
                  onClick={() => setShowFilterModal(true)}
                  className="h-10 px-4 rounded-lg border border-[#dbe0e6] bg-white text-[#617589] hover:bg-slate-50 hover:text-[#111418] text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">filter_list</span>
                  Filters
                </button>
                {/* Export Report Button - Icon only, expands on hover */}
                <button className="group/export flex items-center justify-center h-10 px-2 hover:px-4 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 gap-0 hover:gap-2 overflow-hidden">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  <span className="max-w-0 group-hover/export:max-w-[100px] overflow-hidden transition-all duration-300 whitespace-nowrap">Export Report</span>
                </button>
              </div>
            </div>

            {/* Patient List */}
            <div className="bg-white border border-[#dbe0e6] rounded-xl shadow-sm overflow-hidden flex flex-col divide-y divide-[#eff2f5]">
              {/* Table Header - Hidden on mobile */}
              <div className="hidden md:grid grid-cols-[3fr_1.5fr_2fr_1.5fr] gap-4 px-6 py-3 bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-[#617589] border-b border-[#eff2f5]">
                <div>Patient Details</div>
                <div>Status</div>
                <div>Permissions</div>
                <div className="text-right">Action</div>
              </div>

              {/* Patient Rows */}
              {currentPatients.map((patient) => (
                <div 
                  key={patient.id}
                  className="group flex flex-col md:grid md:grid-cols-[3fr_1.5fr_2fr_1.5fr] gap-4 p-5 hover:bg-blue-50/30 transition-all items-start md:items-center"
                >
                  {/* Patient Details */}
                  <div className="flex items-center gap-4 w-full">
                    <div className="relative shrink-0">
                      {patient.avatar ? (
                        <div 
                          className="w-12 h-12 rounded-full bg-slate-200 bg-center bg-cover shadow-sm ring-2 ring-white"
                          style={{ backgroundImage: `url(${patient.avatar})` }}
                        ></div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg shadow-sm ring-2 ring-white">
                          {patient.initials}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-[#111418] font-bold text-base truncate">{patient.name}</h4>
                      <p className="text-sm text-[#617589] truncate">ID: {patient.patientId} • {patient.ward}</p>
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
                      {patient.permissions.map(permission => getPermissionBadge(permission))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="w-full flex justify-end">
                    <button className="w-full md:w-auto px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-2 shadow-sm active:scale-95">
                      <span className="material-symbols-outlined text-[18px]">clinical_notes</span>
                      View Record
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-transparent pt-4">
              <p className="text-sm text-[#617589]">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length} patients
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-[#dbe0e6] text-[#617589] bg-white text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-[#dbe0e6] text-[#617589] bg-white text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Filter Patients</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="critical">Critical</option>
                  <option value="stable">Stable</option>
                  <option value="observation">Observation</option>
                  <option value="recovering">Recovering</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition shadow-lg shadow-primary/30"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}