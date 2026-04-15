import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { NotificationIcon } from './NotificationIcon';
import { AdminOverview } from './AdminOverview';
import { DateUtils } from '../utils/dateUtils';

export function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7days');
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New patient form state
  const [newPatient, setNewPatient] = useState({
    name: '',
    admissionDate: '',
    department: '',
    doctor: '',
    status: 'stable'
  });

  // Add patient handler
  const handleAddPatient = () => {
    if (newPatient.name && newPatient.admissionDate && newPatient.department && newPatient.doctor) {
      // In production, this would make an API call to add the patient
      setShowAddPatientModal(false);
      // Reset form
      setNewPatient({
        name: '',
        admissionDate: '',
        department: '',
        doctor: '',
        status: 'stable'
      });
    }
  };

  // Apply filters
  const applyFilters = () => {
    setShowFilterModal(false);
    console.log('Applying filters:', { filterStatus, filterDepartment });
  };

  // Reset filters
  const resetFilters = () => {
    setFilterStatus('all');
    setFilterDepartment('all');
    setSearchQuery('');
  };

  // Export report handler
  const handleExportReport = () => {
    console.log('Exporting report...');
    // Logic to export CSV/PDF would go here
  };

  // Patient admissions data - MOVED BEFORE filteredPatients
  const patientAdmissions = [
    {
      id: '#PAT-8832',
      name: 'Liam Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      admissionDate: 'Oct 24, 2023',
      department: 'Neurology',
      doctor: 'Dr. Emily Chen',
      status: 'In Treatment',
      statusColor: 'orange'
    },
    {
      id: '#PAT-8833',
      name: 'Olivia Kim',
      initials: 'OK',
      admissionDate: 'Oct 24, 2023',
      department: 'Pediatrics',
      doctor: 'Dr. Sarah L.',
      status: 'Recovered',
      statusColor: 'green'
    },
    {
      id: '#PAT-8834',
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      admissionDate: 'Oct 23, 2023',
      department: 'Orthopedics',
      doctor: 'Dr. Mark Davis',
      status: 'Critical',
      statusColor: 'red'
    },
    {
      id: '#PAT-8835',
      name: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      admissionDate: 'Oct 23, 2023',
      department: 'Cardiology',
      doctor: 'Dr. Michael Brown',
      status: 'In Treatment',
      statusColor: 'orange'
    },
    {
      id: '#PAT-8836',
      name: 'Noah Anderson',
      initials: 'NA',
      admissionDate: 'Oct 22, 2023',
      department: 'Emergency',
      doctor: 'Dr. Jessica White',
      status: 'Stable',
      statusColor: 'blue'
    },
    {
      id: '#PAT-8837',
      name: 'Sophia Martinez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      admissionDate: 'Oct 22, 2023',
      department: 'General Surgery',
      doctor: 'Dr. David Lee',
      status: 'Recovered',
      statusColor: 'green'
    },
    {
      id: '#PAT-8838',
      name: 'William Taylor',
      initials: 'WT',
      admissionDate: 'Oct 21, 2023',
      department: 'ICU',
      doctor: 'Dr. Amanda Clark',
      status: 'Critical',
      statusColor: 'red'
    },
    {
      id: '#PAT-8839',
      name: 'Isabella Thomas',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      admissionDate: 'Oct 21, 2023',
      department: 'Maternity',
      doctor: 'Dr. Rachel Green',
      status: 'Stable',
      statusColor: 'blue'
    },
  ];

  // Filter patients based on selected filters
  const filteredPatients = patientAdmissions.filter(patient => {
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || patient.department === filterDepartment;
    const matchesSearch = searchQuery === '' || 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesDepartment && matchesSearch;
  });

  // Chart data based on time range
  const getChartData = () => {
    if (timeRange === '7days') {
      return [
        { name: 'Mon', discharges: 12 },
        { name: 'Tue', discharges: 19 },
        { name: 'Wed', discharges: 15 },
        { name: 'Thu', discharges: 25 },
        { name: 'Fri', discharges: 22 },
        { name: 'Sat', discharges: 30 },
        { name: 'Sun', discharges: 28 },
      ];
    } else if (timeRange === '30days') {
      return [
        { name: 'Week 1', discharges: 85 },
        { name: 'Week 2', discharges: 92 },
        { name: 'Week 3', discharges: 78 },
        { name: 'Week 4', discharges: 105 },
      ];
    } else {
      return [
        { name: 'Jan', discharges: 340 },
        { name: 'Feb', discharges: 380 },
        { name: 'Mar', discharges: 420 },
        { name: 'Apr', discharges: 390 },
        { name: 'May', discharges: 450 },
        { name: 'Jun', discharges: 480 },
        { name: 'Jul', discharges: 510 },
        { name: 'Aug', discharges: 495 },
        { name: 'Sep', discharges: 530 },
        { name: 'Oct', discharges: 560 },
        { name: 'Nov', discharges: 520 },
        { name: 'Dec', discharges: 590 },
      ];
    }
  };

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'orange':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'green':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'red':
        return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'blue':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200 dark:border-slate-800';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0077b6] rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">dashboard</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Real-time overview of patients, staff, and critical metrics</p>
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
      <div className="p-4 lg:p-5 space-y-5 overflow-y-auto flex-1">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Total Patients */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Patients</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">1,482</h3>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-[#0EA5E9]">
                <span className="material-symbols-outlined text-xl">person_add</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-teal-600 font-medium flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                +12.5%
              </span>
              <span className="text-slate-400 ml-2">from last month</span>
            </div>
          </div>

          {/* Staff on Duty */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Staff on Duty</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">142</h3>
              </div>
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                <span className="material-symbols-outlined text-xl">medical_services</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                8 Doctors, 24 Nurses
              </span>
            </div>
          </div>

          {/* Avg Wait Time */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Wait Time</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">18m</h3>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600">
                <span className="material-symbols-outlined text-xl">timer</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-red-500 font-medium flex items-center">
                <span className="material-symbols-outlined text-sm mr-1">trending_down</span>
                -2m
              </span>
              <span className="text-slate-400 ml-2">Efficiency improved</span>
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Critical Alerts</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">3</h3>
              </div>
              <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg text-rose-600 animate-pulse">
                <span className="material-symbols-outlined text-xl">warning</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button className="text-xs bg-rose-50 dark:bg-rose-900/20 text-red-500 px-3 py-1 rounded-full font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/40 transition">
                View Emergency
              </button>
            </div>
          </div>
        </div>

        {/* Patient Recovery Analytics - Full Width */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Patient Recovery Analytics</h2>
            <div className="flex space-x-2">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-slate-100 dark:bg-slate-700 border-none text-xs rounded-lg px-3 py-1.5 text-slate-600 dark:text-slate-300 focus:ring-1 focus:ring-[#0EA5E9] cursor-pointer"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="year">Year to Date</option>
              </select>
            </div>
          </div>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="5 5" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif' }}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F8FAFC',
                    fontSize: '12px',
                  }}
                  labelStyle={{ color: '#CBD5E1' }}
                />
                <Line
                  type="monotone"
                  dataKey="discharges"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                  dot={{ fill: '#fff', stroke: '#0EA5E9', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Patient Admissions Table */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 rounded-2xl p-4 sm:p-6 shadow-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Recent Patient Admissions</h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowAddPatientModal(true)}
                className="flex items-center px-3 py-2 bg-[#0EA5E9] text-white text-sm font-medium rounded-lg hover:bg-[#0284C7] transition shadow-lg shadow-blue-500/30"
              >
                <span className="material-symbols-outlined text-sm mr-2">add</span>
                Add Patient
              </button>
              <button 
                onClick={() => setShowFilterModal(true)}
                className="flex items-center px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition"
              >
                <span className="material-symbols-outlined text-sm mr-2">filter_list</span>
                Filter
              </button>
            </div>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                    <th className="pb-3 pl-4 sm:pl-2 font-medium whitespace-nowrap">Patient ID</th>
                    <th className="pb-3 pl-4 font-medium whitespace-nowrap">Name</th>
                    <th className="pb-3 pl-4 font-medium whitespace-nowrap">Admission Date</th>
                    <th className="pb-3 pl-4 font-medium whitespace-nowrap">Department</th>
                    <th className="pb-3 pl-4 font-medium whitespace-nowrap">Doctor</th>
                    <th className="pb-3 pl-4 font-medium whitespace-nowrap">Status</th>
                    <th className="pb-3 pl-4 pr-4 sm:pr-2 text-right font-medium whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 pl-4 sm:pl-2 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {patient.id}
                      </td>
                      <td className="py-4 pl-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {patient.avatar ? (
                            <img
                              alt="Avatar"
                              className="w-8 h-8 rounded-full mr-3 object-cover flex-shrink-0"
                              src={patient.avatar}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-500 flex items-center justify-center mr-3 font-bold text-xs flex-shrink-0">
                              {patient.initials}
                            </div>
                          )}
                          <span className="font-medium text-slate-700 dark:text-slate-200">{patient.name}</span>
                        </div>
                      </td>
                      <td className="py-4 pl-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {patient.admissionDate}
                      </td>
                      <td className="py-4 pl-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {patient.department}
                      </td>
                      <td className="py-4 pl-4 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {patient.doctor}
                      </td>
                      <td className="py-4 pl-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(patient.statusColor)}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="py-4 pl-4 pr-4 sm:pr-2 text-right whitespace-nowrap">
                        <button className="text-slate-400 hover:text-[#0EA5E9] transition">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 text-center text-xs text-slate-400 dark:text-slate-600">
          © 2023 MediPulse Hospital Systems. Secure Portal v4.2\
        </footer>
      </div>

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add New Patient</h3>
              <button
                onClick={() => setShowAddPatientModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Patient Name *
                </label>
                <input
                  type="text"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] outline-none"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Admission Date *
                </label>
                <input
                  type="date"
                  value={newPatient.admissionDate}
                  onChange={(e) => setNewPatient({ ...newPatient, admissionDate: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Department *
                </label>
                <select
                  value={newPatient.department}
                  onChange={(e) => setNewPatient({ ...newPatient, department: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] outline-none"
                >
                  <option value="">Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Emergency">Emergency</option>
                  <option value="ICU">ICU</option>
                  <option value="General Surgery">General Surgery</option>
                  <option value="Maternity">Maternity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Doctor *
                </label>
                <input
                  type="text"
                  value={newPatient.doctor}
                  onChange={(e) => setNewPatient({ ...newPatient, doctor: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] outline-none"
                  placeholder="Enter doctor name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>
                <select
                  value={newPatient.status}
                  onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] outline-none"
                >
                  <option value="stable">Stable</option>
                  <option value="critical">Critical</option>
                  <option value="in-treatment">In Treatment</option>
                  <option value="recovered">Recovered</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddPatientModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                className="flex-1 px-4 py-2 rounded-lg bg-[#0EA5E9] text-white font-medium hover:bg-[#0284C7] transition shadow-lg shadow-blue-500/30"
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}

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
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] outline-none"
                  placeholder="Search by name, ID, or department"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="Stable">Stable</option>
                  <option value="Critical">Critical</option>
                  <option value="In Treatment">In Treatment</option>
                  <option value="Recovered">Recovered</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Department
                </label>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] outline-none"
                >
                  <option value="all">All Departments</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Emergency">Emergency</option>
                  <option value="ICU">ICU</option>
                  <option value="General Surgery">General Surgery</option>
                  <option value="Maternity">Maternity</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={resetFilters}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 px-4 py-2 rounded-lg bg-[#0EA5E9] text-white font-medium hover:bg-[#0284C7] transition shadow-lg shadow-blue-500/30"
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