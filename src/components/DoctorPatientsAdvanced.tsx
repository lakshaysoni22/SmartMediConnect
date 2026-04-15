import React, { useState, useMemo } from 'react';

interface Patient {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: string;
  condition: string;
  lastVisit: string;
  nextAppointment?: string;
  status: 'Stable' | 'Critical' | 'Observation' | 'Recovering';
  gradient: string;
  bloodType: string;
  allergies: string;
  heartRate: number;
  bloodPressure: string;
  oxygen: string;
  temperature: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  medications: string[];
  recentTests: { test: string; date: string; result: string }[];
  medicalHistory: string[];
  notes: string;
}

export function DoctorPatientsAdvanced() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'vitals' | 'history' | 'prescriptions'>('overview');
  const [newNote, setNewNote] = useState('');

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 'P-2026-001',
      name: 'Sarah Jenkins',
      initials: 'SJ',
      age: 34,
      gender: 'Female',
      condition: 'Cardiac Arrhythmia',
      lastVisit: 'Jan 15, 2026',
      nextAppointment: 'Jan 22, 2026',
      status: 'Stable',
      gradient: 'from-blue-500 to-blue-600',
      bloodType: 'O+',
      allergies: 'None Known',
      heartRate: 72,
      bloodPressure: '120/80',
      oxygen: '98%',
      temperature: '98.6°F',
      phone: '+1 (555) 123-4567',
      email: 'sarah.jenkins@email.com',
      address: '123 Main St, New York, NY 10001',
      emergencyContact: 'John Jenkins (Husband) - +1 (555) 123-4568',
      medications: ['Metoprolol 50mg - Twice daily', 'Aspirin 81mg - Once daily'],
      recentTests: [
        { test: 'ECG', date: 'Jan 15, 2026', result: 'Slight irregularity detected' },
        { test: 'Blood Panel', date: 'Jan 10, 2026', result: 'Normal' },
      ],
      medicalHistory: ['Diagnosed with arrhythmia in 2024', 'Family history of heart disease'],
      notes: 'Patient responding well to current medication. Continue monitoring heart rhythm.'
    },
    {
      id: 'P-2026-002',
      name: 'Marcus Wright',
      initials: 'MW',
      age: 45,
      gender: 'Male',
      condition: 'Hypertension',
      lastVisit: 'Jan 14, 2026',
      nextAppointment: 'Jan 28, 2026',
      status: 'Critical',
      gradient: 'from-red-500 to-red-600',
      bloodType: 'A+',
      allergies: 'Penicillin',
      heartRate: 88,
      bloodPressure: '145/95',
      oxygen: '96%',
      temperature: '99.1°F',
      phone: '+1 (555) 234-5678',
      email: 'marcus.wright@email.com',
      address: '456 Oak Ave, Brooklyn, NY 11201',
      emergencyContact: 'Lisa Wright (Wife) - +1 (555) 234-5679',
      medications: ['Lisinopril 10mg - Once daily', 'Amlodipine 5mg - Once daily'],
      recentTests: [
        { test: 'Blood Pressure Monitor', date: 'Jan 14, 2026', result: 'Elevated - 145/95' },
        { test: 'Cholesterol', date: 'Jan 8, 2026', result: 'High LDL' },
      ],
      medicalHistory: ['Hypertension since 2020', 'Pre-diabetic', 'Smoker (quit 2023)'],
      notes: 'Blood pressure still elevated. Consider adjusting medication dosage. Advised lifestyle modifications.'
    },
    {
      id: 'P-2026-003',
      name: 'Emily Chen',
      initials: 'EC',
      age: 29,
      gender: 'Female',
      condition: 'Post-Operative Recovery',
      lastVisit: 'Jan 16, 2026',
      nextAppointment: 'Jan 20, 2026',
      status: 'Recovering',
      gradient: 'from-green-500 to-green-600',
      bloodType: 'B+',
      allergies: 'None Known',
      heartRate: 76,
      bloodPressure: '118/75',
      oxygen: '99%',
      temperature: '98.4°F',
      phone: '+1 (555) 345-6789',
      email: 'emily.chen@email.com',
      address: '789 Pine Rd, Queens, NY 11375',
      emergencyContact: 'David Chen (Brother) - +1 (555) 345-6790',
      medications: ['Ibuprofen 400mg - As needed', 'Antibiotics - Twice daily for 7 days'],
      recentTests: [
        { test: 'Post-op X-Ray', date: 'Jan 16, 2026', result: 'Healing well' },
        { test: 'Blood Work', date: 'Jan 12, 2026', result: 'Normal' },
      ],
      medicalHistory: ['Appendectomy - Jan 10, 2026', 'No chronic conditions'],
      notes: 'Recovery progressing as expected. Incision healing well. Follow-up in 4 days.'
    },
    {
      id: 'P-2026-004',
      name: 'David Miller',
      initials: 'DM',
      age: 62,
      gender: 'Male',
      condition: 'Type 2 Diabetes',
      lastVisit: 'Jan 12, 2026',
      nextAppointment: 'Feb 12, 2026',
      status: 'Stable',
      gradient: 'from-purple-500 to-purple-600',
      bloodType: 'AB+',
      allergies: 'Latex',
      heartRate: 68,
      bloodPressure: '125/82',
      oxygen: '97%',
      temperature: '98.7°F',
      phone: '+1 (555) 456-7890',
      email: 'david.miller@email.com',
      address: '321 Elm St, Manhattan, NY 10002',
      emergencyContact: 'Mary Miller (Wife) - +1 (555) 456-7891',
      medications: ['Metformin 1000mg - Twice daily', 'Insulin (long-acting) - Once daily'],
      recentTests: [
        { test: 'HbA1c', date: 'Jan 12, 2026', result: '7.2% (Improved)' },
        { test: 'Glucose Fasting', date: 'Jan 12, 2026', result: '135 mg/dL' },
      ],
      medicalHistory: ['Type 2 Diabetes since 2015', 'Mild neuropathy', 'Controlled with medication'],
      notes: 'Glucose levels improving. Continue current medication regimen. Encourage regular exercise.'
    },
    {
      id: 'P-2026-005',
      name: 'Jennifer Lopez',
      initials: 'JL',
      age: 38,
      gender: 'Female',
      condition: 'Migraine Management',
      lastVisit: 'Jan 13, 2026',
      nextAppointment: 'Feb 13, 2026',
      status: 'Observation',
      gradient: 'from-orange-500 to-orange-600',
      bloodType: 'O-',
      allergies: 'Sulfa drugs',
      heartRate: 74,
      bloodPressure: '122/78',
      oxygen: '98%',
      temperature: '98.5°F',
      phone: '+1 (555) 567-8901',
      email: 'jennifer.lopez@email.com',
      address: '654 Maple Dr, Bronx, NY 10451',
      emergencyContact: 'Carlos Lopez (Husband) - +1 (555) 567-8902',
      medications: ['Sumatriptan 50mg - As needed for migraines', 'Propranolol 40mg - Daily preventive'],
      recentTests: [
        { test: 'MRI Brain', date: 'Dec 20, 2025', result: 'No abnormalities' },
        { test: 'Blood Work', date: 'Jan 13, 2026', result: 'Normal' },
      ],
      medicalHistory: ['Chronic migraines since 2018', 'Triggers: stress, bright lights'],
      notes: 'Migraine frequency reduced with preventive medication. Patient keeping headache diary.'
    },
    {
      id: 'P-2026-006',
      name: 'Robert Johnson',
      initials: 'RJ',
      age: 55,
      gender: 'Male',
      condition: 'COPD',
      lastVisit: 'Jan 11, 2026',
      nextAppointment: 'Jan 25, 2026',
      status: 'Critical',
      gradient: 'from-yellow-500 to-yellow-600',
      bloodType: 'A-',
      allergies: 'Codeine',
      heartRate: 82,
      bloodPressure: '138/88',
      oxygen: '92%',
      temperature: '98.9°F',
      phone: '+1 (555) 678-9012',
      email: 'robert.johnson@email.com',
      address: '987 Cedar Ln, Staten Island, NY 10301',
      emergencyContact: 'Susan Johnson (Daughter) - +1 (555) 678-9013',
      medications: ['Albuterol Inhaler - As needed', 'Tiotropium - Once daily', 'Prednisone 10mg - Daily'],
      recentTests: [
        { test: 'Pulmonary Function', date: 'Jan 11, 2026', result: 'Reduced capacity - 58%' },
        { test: 'Chest X-Ray', date: 'Jan 11, 2026', result: 'Chronic changes' },
      ],
      medicalHistory: ['COPD since 2019', 'Former smoker (30 years)', 'Recurrent respiratory infections'],
      notes: 'Oxygen saturation concerning. Consider oxygen therapy. Pulmonary rehab recommended.'
    }
  ]);

  // Filter patients
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || patient.status.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [patients, searchQuery, filterStatus]);

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Observation':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Recovering':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Stable':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800';
    }
  };

  const handleAddNote = () => {
    if (newNote.trim() && selectedPatient) {
      // In real app, save to database
      console.log('Adding note:', newNote);
      setNewNote('');
      alert('Note added successfully!');
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-4xl">
                groups
              </span>
              My Patients
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage and monitor your patient records
            </p>
          </div>
          <button
            onClick={() => setShowAddPatient(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-500/30"
          >
            <span className="material-symbols-outlined">add</span>
            Add New Patient
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          {/* Search */}
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search patients by name, ID, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="all">All Status</option>
            <option value="stable">Stable</option>
            <option value="critical">Critical</option>
            <option value="observation">Observation</option>
            <option value="recovering">Recovering</option>
          </select>

          {/* View Mode */}
          <div className="flex gap-2 bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined">list</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined">grid_view</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{patients.length}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">Total Patients</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {patients.filter(p => p.status === 'Critical').length}
            </div>
            <div className="text-sm text-red-700 dark:text-red-300 mt-1">Critical</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {patients.filter(p => p.status === 'Stable').length}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300 mt-1">Stable</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {patients.filter(p => p.status === 'Observation' || p.status === 'Recovering').length}
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300 mt-1">Under Care</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Patient List */}
        <div className={`${selectedPatient ? 'hidden lg:block lg:w-96' : 'flex-1'} border-r border-slate-200 dark:border-slate-800 overflow-y-auto`}>
          <div className="p-4 space-y-3">
            {filteredPatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`w-full text-left p-4 rounded-xl transition-all hover:scale-[1.02] ${
                  selectedPatient?.id === patient.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 dark:border-blue-400'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${patient.gradient} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                    {patient.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white truncate">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {patient.age} yrs • {patient.gender}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 font-medium truncate">
                      {patient.condition}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        {patient.lastVisit}
                      </span>
                      <span>{patient.id}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Patient Details */}
        {selectedPatient && (
          <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
            {/* Back button for mobile */}
            <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedPatient(null)}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to list
              </button>
            </div>

            {/* Patient Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 p-8 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedPatient.gradient} flex items-center justify-center text-white text-2xl font-bold border-4 border-white/30`}>
                  {selectedPatient.initials}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{selectedPatient.name}</h2>
                  <div className="flex flex-wrap gap-4 text-blue-100">
                    <span>{selectedPatient.age} years • {selectedPatient.gender}</span>
                    <span>ID: {selectedPatient.id}</span>
                    <span>Blood Type: {selectedPatient.bloodType}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(selectedPatient.status)} bg-white/90`}>
                      {selectedPatient.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all">
                    <span className="material-symbols-outlined">call</span>
                  </button>
                  <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all">
                    <span className="material-symbols-outlined">mail</span>
                  </button>
                  <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all">
                    <span className="material-symbols-outlined">videocam</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 dark:border-slate-800 px-8">
              <div className="flex gap-6 overflow-x-auto">
                {['overview', 'vitals', 'history', 'prescriptions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-3 font-semibold capitalize whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8 space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* Vitals Quick View */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
                        <span className="material-symbols-outlined">favorite</span>
                        <span className="text-sm font-semibold">Heart Rate</span>
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedPatient.heartRate}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">bpm</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                        <span className="material-symbols-outlined">bloodtype</span>
                        <span className="text-sm font-semibold">Blood Pressure</span>
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedPatient.bloodPressure}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">mmHg</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                        <span className="material-symbols-outlined">air</span>
                        <span className="text-sm font-semibold">Oxygen</span>
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedPatient.oxygen}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">saturation</div>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
                        <span className="material-symbols-outlined">thermostat</span>
                        <span className="text-sm font-semibold">Temperature</span>
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedPatient.temperature}</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">call</span>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Phone</div>
                          <div className="font-semibold text-slate-900 dark:text-white">{selectedPatient.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">mail</span>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Email</div>
                          <div className="font-semibold text-slate-900 dark:text-white">{selectedPatient.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 md:col-span-2">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">location_on</span>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Address</div>
                          <div className="font-semibold text-slate-900 dark:text-white">{selectedPatient.address}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 md:col-span-2">
                        <span className="material-symbols-outlined text-red-600 dark:text-red-400">emergency</span>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Emergency Contact</div>
                          <div className="font-semibold text-slate-900 dark:text-white">{selectedPatient.emergencyContact}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Allergies */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                    <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-300 mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined">warning</span>
                      Allergies
                    </h3>
                    <p className="text-yellow-800 dark:text-yellow-200 font-semibold">{selectedPatient.allergies}</p>
                  </div>

                  {/* Current Medications */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Current Medications</h3>
                    <div className="space-y-3">
                      {selectedPatient.medications.map((med, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">medication</span>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 dark:text-white">{med}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Notes */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Clinical Notes</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{selectedPatient.notes}</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a new note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddNote}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
                      >
                        Add Note
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'vitals' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Vital Signs History</h3>
                  {/* Vitals would go here with charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4">Heart Rate Trend</h4>
                      <div className="h-48 flex items-end justify-around gap-2">
                        {[65, 70, 68, 72, 74, 72, 71].map((val, idx) => (
                          <div key={idx} className="flex-1 bg-red-500 rounded-t" style={{height: `${(val/100)*100}%`}} />
                        ))}
                      </div>
                      <div className="text-center mt-2 text-sm text-slate-600 dark:text-slate-400">Last 7 days</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4">Blood Pressure Trend</h4>
                      <div className="h-48 flex items-end justify-around gap-2">
                        {[115, 118, 120, 122, 120, 119, 120].map((val, idx) => (
                          <div key={idx} className="flex-1 bg-blue-500 rounded-t" style={{height: `${(val/150)*100}%`}} />
                        ))}
                      </div>
                      <div className="text-center mt-2 text-sm text-slate-600 dark:text-slate-400">Last 7 days</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Medical History</h3>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="space-y-4">
                      {selectedPatient.medicalHistory.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-0">
                          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">history</span>
                          <p className="text-slate-900 dark:text-white">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">Recent Tests</h3>
                  <div className="space-y-3">
                    {selectedPatient.recentTests.map((test, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">{test.test}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{test.date}</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-semibold">
                              {test.result}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'prescriptions' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Prescriptions</h3>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2">
                      <span className="material-symbols-outlined">add</span>
                      New Prescription
                    </button>
                  </div>
                  <div className="space-y-4">
                    {selectedPatient.medications.map((med, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">medication</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-900 dark:text-white">{med.split(' - ')[0]}</h4>
                              <p className="text-slate-600 dark:text-slate-400 mt-1">{med.split(' - ')[1]}</p>
                              <div className="flex gap-4 mt-3 text-sm text-slate-500 dark:text-slate-400">
                                <span>Prescribed: Jan 10, 2026</span>
                                <span>Duration: 30 days</span>
                              </div>
                            </div>
                          </div>
                          <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedPatient && filteredPatients.length === 0 && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-8xl mb-4">person_search</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No patients found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}