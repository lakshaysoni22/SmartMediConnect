import React, { useState, useRef, useEffect } from 'react';
import { NotificationIcon } from './NotificationIcon';

interface StaffMember {
  id: number;
  name: string;
  email: string;
  staffId: string;
  role: string;
  department: string;
  schedule: string;
  status: 'Active' | 'On Leave' | 'Deactivated';
  avatar?: string;
  initials?: string;
}

export function AdminStaff() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [showActionResponse, setShowActionResponse] = useState(false);
  const [actionResponseMessage, setActionResponseMessage] = useState('');

  // Ref to store timeout IDs for cleanup
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  const staffMembers: StaffMember[] = [
    {
      id: 1,
      name: 'Dr. Sarah Jenkins',
      email: 's.jenkins@mediconnect.sys',
      staffId: '#4921',
      role: 'Senior Doctor',
      department: 'Cardiology',
      schedule: 'Mon-Fri, 09:00 - 17:00',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      email: 'm.chen@mediconnect.sys',
      staffId: '#8823',
      role: 'Doctor',
      department: 'Neurology',
      schedule: 'Mon-Wed, 07:00 - 19:00',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'Emily Clarke',
      email: 'e.clarke@mediconnect.sys',
      staffId: '#3312',
      role: 'Head Nurse',
      department: 'Emergency Room',
      schedule: 'Night Shift, 20:00 - 08:00',
      status: 'On Leave',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    },
    {
      id: 4,
      name: 'David Ross',
      email: 'd.ross@mediconnect.sys',
      staffId: '#1122',
      role: 'Administrator',
      department: 'Human Resources',
      schedule: 'Mon-Fri, 09:00 - 17:00',
      status: 'Deactivated',
      initials: 'DR',
    },
    {
      id: 5,
      name: 'Dr. Linda Kim',
      email: 'l.kim@mediconnect.sys',
      staffId: '#5501',
      role: 'Resident',
      department: 'Pediatrics',
      schedule: 'Rotational Shift',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    },
    {
      id: 6,
      name: 'Jessica Taylor',
      email: 'j.taylor@mediconnect.sys',
      staffId: '#7734',
      role: 'Nurse',
      department: 'ICU',
      schedule: 'Mon-Fri, 08:00 - 16:00',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop',
    },
    {
      id: 7,
      name: 'Dr. Robert Wilson',
      email: 'r.wilson@mediconnect.sys',
      staffId: '#2289',
      role: 'Senior Doctor',
      department: 'Orthopedics',
      schedule: 'Tue-Sat, 10:00 - 18:00',
      status: 'Active',
      initials: 'RW',
    },
    {
      id: 8,
      name: 'Amanda Foster',
      email: 'a.foster@mediconnect.sys',
      staffId: '#5643',
      role: 'Nurse',
      department: 'Cardiology',
      schedule: 'Mon-Fri, 07:00 - 15:00',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop',
    },
  ];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.staffId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All Roles' || staff.role === selectedRole;
    const matchesDepartment = selectedDepartment === 'All Departments' || staff.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All Status' || staff.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300';
      case 'On Leave':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300';
      case 'Deactivated':
        return 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-500';
      case 'On Leave':
        return 'bg-amber-500';
      case 'Deactivated':
        return 'bg-slate-500';
      default:
        return 'bg-slate-400';
    }
  };

  const getRoleColor = (role: string) => {
    if (role.includes('Doctor') || role === 'Senior Doctor' || role === 'Resident') {
      return 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    }
    if (role.includes('Nurse')) {
      return 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
    }
    if (role === 'Administrator') {
      return 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
    }
    return 'bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300';
  };

  // Handle staff actions
  const handleStaffAction = (action: string, staff: StaffMember) => {
    setOpenActionMenu(null);
    setActionResponseMessage(`${action} action performed on ${staff.name} (${staff.staffId})`);
    setShowActionResponse(true);
    const timeout = setTimeout(() => setShowActionResponse(false), 3000);
    timeoutRefs.current.push(timeout);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-black">
      {/* Top Header - Matching Other Admin Pages Style */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0077b6] rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">groups</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Staff Management</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage hospital personnel, roles, and schedules</p>
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

      {/* Action Response Toast */}
      {showActionResponse && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideIn">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="text-sm font-medium">{actionResponseMessage}</span>
        </div>
      )}

      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="flex-1 overflow-y-auto p-4 lg:p-5 relative z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-2">
          {/* Page Header */}
          <div className="flex flex-wrap justify-end items-center gap-4 mb-1">
            {/* Title section removed */}
            <button className="flex items-center gap-2 bg-[#0077b6] hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-[#0077b6]/20 transition-all active:scale-95 cursor-pointer ml-auto">
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Add New Staff</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Staff</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">142</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-[#0EA5E9]">
                  <span className="material-symbols-outlined text-xl">badge</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-teal-600 font-medium flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                  +2%
                </span>
                <span className="text-slate-400 ml-2">from last month</span>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Doctors</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">45</h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                  <span className="material-symbols-outlined text-xl">medical_services</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Stable
                </span>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Nurses on Duty</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">80</h3>
                </div>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                  <span className="material-symbols-outlined text-xl">emergency</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-teal-600 font-medium flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                  +5%
                </span>
                <span className="text-slate-400 ml-2">this week</span>
              </div>
            </div>
          </div>

          {/* Filters & Toolbar */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700 p-2 rounded-xl shadow-sm flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-800/50 border-none rounded-lg focus:ring-2 focus:ring-[#0077b6]/50 text-sm placeholder:text-slate-400 outline-none"
                placeholder="Search by Name, ID, or Email..."
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-white/50 dark:bg-slate-800/50 border-none rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-[#0077b6]/50 py-2.5 pl-3 pr-8 cursor-pointer min-w-[140px] outline-none"
              >
                <option>All Roles</option>
                <option>Doctor</option>
                <option>Senior Doctor</option>
                <option>Resident</option>
                <option>Nurse</option>
                <option>Head Nurse</option>
                <option>Administrator</option>
                <option>Technician</option>
              </select>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="bg-white/50 dark:bg-slate-800/50 border-none rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-[#0077b6]/50 py-2.5 pl-3 pr-8 cursor-pointer min-w-[160px] outline-none"
              >
                <option>All Departments</option>
                <option>Cardiology</option>
                <option>Emergency Room</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
                <option>ICU</option>
                <option>Orthopedics</option>
                <option>Human Resources</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white/50 dark:bg-slate-800/50 border-none rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-[#0077b6]/50 py-2.5 pl-3 pr-8 cursor-pointer min-w-[120px] outline-none"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>On Leave</option>
                <option>Deactivated</option>
              </select>
            </div>
          </div>

          {/* Staff Table */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Staff Member</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">ID Number</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Department</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Schedule</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-[#0077b6]/5 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {staff.avatar ? (
                            <img
                              src={staff.avatar}
                              alt={staff.name}
                              className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-slate-200 dark:ring-slate-700"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold">
                              {staff.initials}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">{staff.name}</p>
                            <p className="text-xs text-slate-500">{staff.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-mono text-slate-600 dark:text-slate-400">{staff.staffId}</td>
                      <td className="p-4 text-sm text-slate-700 dark:text-slate-300">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${getRoleColor(staff.role)}`}>
                          {staff.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-700 dark:text-slate-300">{staff.department}</td>
                      <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{staff.schedule}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(staff.status)}`} />
                          {staff.status}
                        </span>
                      </td>
                      <td className="p-4 text-right relative">
                        <button 
                          onClick={() => setOpenActionMenu(openActionMenu === staff.id ? null : staff.id)}
                          className="text-slate-400 hover:text-[#0077b6] transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-xl">more_vert</span>
                        </button>
                        
                        {/* Action Menu Dropdown */}
                        {openActionMenu === staff.id && (
                          <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 min-w-[180px] py-1">
                            <button
                              onClick={() => handleStaffAction('View Profile', staff)}
                              className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[18px]">person</span>
                              View Profile
                            </button>
                            <button
                              onClick={() => handleStaffAction('Edit Details', staff)}
                              className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                              Edit Details
                            </button>
                            <button
                              onClick={() => handleStaffAction('Change Schedule', staff)}
                              className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[18px]">schedule</span>
                              Change Schedule
                            </button>
                            <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                            <button
                              onClick={() => handleStaffAction('Deactivate', staff)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[18px]">block</span>
                              Deactivate
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500">
                Showing 1 to {filteredStaff.length} of 142 entries
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors cursor-pointer ${
                    currentPage === 1
                      ? 'bg-[#0077b6] text-white'
                      : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  1
                </button>
                <button
                  onClick={() => setCurrentPage(2)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors cursor-pointer ${
                    currentPage === 2
                      ? 'bg-[#0077b6] text-white'
                      : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  2
                </button>
                <button
                  onClick={() => setCurrentPage(3)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors cursor-pointer ${
                    currentPage === 3
                      ? 'bg-[#0077b6] text-white'
                      : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  3
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
                  disabled={currentPage === 3}
                  className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="h-10" /> {/* Spacer */}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}