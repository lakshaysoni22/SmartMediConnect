import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';

interface StaffMember {
  id: string;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Admin' | 'Technician' | 'Support';
  department: string;
  email: string;
  phone: string;
  joined: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  shift: 'Morning' | 'Evening' | 'Night';
  salary: number;
  performance: number;
}

export function AdminStaffAdvanced({ onNavigate }: { onNavigate?: (section: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [staff] = useState<StaffMember[]>([
    {
      id: 'STF-001',
      name: 'Dr. Sarah Mitchell',
      role: 'Doctor',
      department: 'Cardiology',
      email: 'sarah.mitchell@hospital.com',
      phone: '+1 (555) 123-4567',
      joined: 'Jan 15, 2020',
      status: 'Active',
      shift: 'Morning',
      salary: 180000,
      performance: 95
    },
    {
      id: 'STF-002',
      name: 'Dr. James Wilson',
      role: 'Doctor',
      department: 'General Medicine',
      email: 'james.wilson@hospital.com',
      phone: '+1 (555) 234-5678',
      joined: 'Mar 22, 2019',
      status: 'Active',
      shift: 'Evening',
      salary: 165000,
      performance: 92
    },
    {
      id: 'STF-003',
      name: 'Emily Rodriguez',
      role: 'Nurse',
      department: 'Emergency',
      email: 'emily.rodriguez@hospital.com',
      phone: '+1 (555) 345-6789',
      joined: 'Jul 10, 2021',
      status: 'Active',
      shift: 'Night',
      salary: 75000,
      performance: 88
    },
    {
      id: 'STF-004',
      name: 'Michael Chen',
      role: 'Technician',
      department: 'Radiology',
      email: 'michael.chen@hospital.com',
      phone: '+1 (555) 456-7890',
      joined: 'Sep 5, 2022',
      status: 'Active',
      shift: 'Morning',
      salary: 65000,
      performance: 90
    },
    {
      id: 'STF-005',
      name: 'Lisa Anderson',
      role: 'Nurse',
      department: 'Pediatrics',
      email: 'lisa.anderson@hospital.com',
      phone: '+1 (555) 567-8901',
      joined: 'Feb 18, 2021',
      status: 'On Leave',
      shift: 'Evening',
      salary: 72000,
      performance: 85
    },
    {
      id: 'STF-006',
      name: 'David Martinez',
      role: 'Admin',
      department: 'Administration',
      email: 'david.martinez@hospital.com',
      phone: '+1 (555) 678-9012',
      joined: 'Nov 30, 2020',
      status: 'Active',
      shift: 'Morning',
      salary: 55000,
      performance: 87
    },
    {
      id: 'STF-007',
      name: 'Dr. Jennifer Lopez',
      role: 'Doctor',
      department: 'Neurology',
      email: 'jennifer.lopez@hospital.com',
      phone: '+1 (555) 789-0123',
      joined: 'Apr 12, 2018',
      status: 'Active',
      shift: 'Morning',
      salary: 195000,
      performance: 98
    },
    {
      id: 'STF-008',
      name: 'Robert Johnson',
      role: 'Support',
      department: 'Maintenance',
      email: 'robert.johnson@hospital.com',
      phone: '+1 (555) 890-1234',
      joined: 'Aug 25, 2023',
      status: 'Active',
      shift: 'Night',
      salary: 45000,
      performance: 82
    }
  ]);

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: StaffMember['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'On Leave':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Inactive':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
    }
  };

  const getRoleIcon = (role: StaffMember['role']) => {
    switch (role) {
      case 'Doctor': return 'medical_services';
      case 'Nurse': return 'health_and_safety';
      case 'Admin': return 'admin_panel_settings';
      case 'Technician': return 'biotech';
      case 'Support': return 'support_agent';
    }
  };

  const getRoleColor = (role: StaffMember['role']) => {
    switch (role) {
      case 'Doctor': return 'from-blue-500 to-blue-600';
      case 'Nurse': return 'from-purple-500 to-purple-600';
      case 'Admin': return 'from-indigo-500 to-indigo-600';
      case 'Technician': return 'from-green-500 to-green-600';
      case 'Support': return 'from-orange-500 to-orange-600';
    }
  };

  // Stats
  const stats = [
    { label: 'Total Staff', value: staff.length, icon: 'groups', color: 'from-blue-500 to-blue-600' },
    { label: 'Doctors', value: staff.filter(s => s.role === 'Doctor').length, icon: 'medical_services', color: 'from-green-500 to-green-600' },
    { label: 'Nurses', value: staff.filter(s => s.role === 'Nurse').length, icon: 'health_and_safety', color: 'from-purple-500 to-purple-600' },
    { label: 'On Leave', value: staff.filter(s => s.status === 'On Leave').length, icon: 'event_busy', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="flex-1 bg-slate-50 dark:bg-black flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0077b6] rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">badge</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Staff Management</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage hospital staff and employees</p>
            </div>
          </div>
          
          {/* Notification Icon */}
          <NotificationIcon 
            showDot={true}
            onClick={() => window.dispatchEvent(new CustomEvent('openNotificationCenter'))}
          />
        </div>
      </header>

      {/* Stats & Filters Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        {/* Add Staff Button - Right Side */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0077b6] hover:bg-blue-600 text-white rounded-lg shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span className="text-sm font-medium">Add Staff</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-white text-[20px]">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search by name, department, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="Doctor">Doctors</option>
            <option value="Nurse">Nurses</option>
            <option value="Admin">Admin</option>
            <option value="Technician">Technicians</option>
            <option value="Support">Support</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Staff List */}
        <div className={`${selectedStaff ? 'hidden lg:block lg:w-1/2' : 'flex-1'} overflow-y-auto p-4 md:p-8 space-y-4`}>
          {filteredStaff.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedStaff(member)}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border transition-all cursor-pointer ${
                selectedStaff?.id === member.id
                  ? 'border-blue-500 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${getRoleColor(member.role)} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{member.name}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{member.role} • {member.department}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">email</span>
                      <span className="truncate">{member.email.split('@')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>{member.shift} Shift</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span>Performance</span>
                        <span className="font-semibold">{member.performance}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            member.performance >= 90 ? 'bg-green-500' :
                            member.performance >= 75 ? 'bg-blue-500' : 'bg-orange-500'
                          }`}
                          style={{ width: `${member.performance}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Salary</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">${member.salary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-8xl mb-4">
                search_off
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No staff members found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Staff Detail */}
        {selectedStaff && (
          <div className="flex-1 lg:w-1/2 overflow-y-auto bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
            <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedStaff(null)}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to list
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center">
                <div className={`w-24 h-24 bg-gradient-to-br ${getRoleColor(selectedStaff.role)} rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4`}>
                  {selectedStaff.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedStaff.name}</h2>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mt-1">{selectedStaff.role}</p>
                <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-full border mt-3 ${getStatusColor(selectedStaff.status)}`}>
                  {selectedStaff.status}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Staff Information</h3>
                
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">badge</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Employee ID</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedStaff.id}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">business</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Department</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedStaff.department}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">email</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Email</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedStaff.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">call</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Phone</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedStaff.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">schedule</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Shift</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedStaff.shift}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">calendar_today</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Joined Date</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedStaff.joined}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">payments</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Annual Salary</div>
                    <div className="font-semibold text-slate-900 dark:text-white">${selectedStaff.salary.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Performance Rating</h3>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          selectedStaff.performance >= 90 ? 'bg-green-500' :
                          selectedStaff.performance >= 75 ? 'bg-blue-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${selectedStaff.performance}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">{selectedStaff.performance}%</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {selectedStaff.performance >= 90 ? 'Excellent Performance' :
                   selectedStaff.performance >= 75 ? 'Good Performance' : 'Needs Improvement'}
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">edit</span>
                  Edit Staff Details
                </button>
                <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">mail</span>
                  Send Message
                </button>
                <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">event_busy</span>
                  Manage Leave
                </button>
                <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">person_remove</span>
                  Remove Staff
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Add New Staff Member</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role</label>
                <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Doctor</option>
                  <option>Nurse</option>
                  <option>Admin</option>
                  <option>Technician</option>
                  <option>Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Department</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  alert('Staff member added successfully!');
                }}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
              >
                Add Staff Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}