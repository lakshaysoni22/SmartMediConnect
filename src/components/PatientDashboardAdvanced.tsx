import React, { useState, useMemo } from 'react';

interface HealthMetric {
  label: string;
  value: string;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  icon: string;
  color: string;
  trend: string;
}

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Video Call';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  remaining: number;
}

export function PatientDashboardAdvanced() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 17)); // Jan 17, 2026

  // Health metrics
  const healthMetrics: HealthMetric[] = [
    {
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'good',
      icon: 'favorite',
      color: 'from-red-500 to-pink-500',
      trend: 'Normal range'
    },
    {
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'good',
      icon: 'bloodtype',
      color: 'from-blue-500 to-cyan-500',
      trend: 'Optimal'
    },
    {
      label: 'Blood Sugar',
      value: '95',
      unit: 'mg/dL',
      status: 'good',
      icon: 'water_drop',
      color: 'from-purple-500 to-violet-500',
      trend: 'Normal'
    },
    {
      label: 'Weight',
      value: '68.5',
      unit: 'kg',
      status: 'good',
      icon: 'monitor_weight',
      color: 'from-green-500 to-emerald-500',
      trend: 'Stable'
    }
  ];

  // Upcoming appointments
  const upcomingAppointments: Appointment[] = [
    {
      id: 'APT-001',
      doctor: 'Dr. Sarah Mitchell',
      specialty: 'Cardiologist',
      date: 'Jan 20, 2026',
      time: '10:30 AM',
      type: 'In-Person',
      status: 'Upcoming'
    },
    {
      id: 'APT-002',
      doctor: 'Dr. James Wilson',
      specialty: 'General Physician',
      date: 'Jan 24, 2026',
      time: '2:00 PM',
      type: 'Video Call',
      status: 'Upcoming'
    }
  ];

  // Medications
  const medications: Medication[] = [
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      nextDose: 'Today, 8:00 PM',
      remaining: 15
    },
    {
      name: 'Aspirin',
      dosage: '75mg',
      frequency: 'Once daily',
      nextDose: 'Tomorrow, 9:00 AM',
      remaining: 28
    },
    {
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      nextDose: 'Today, 9:00 PM',
      remaining: 20
    }
  ];

  // Recent activity
  const recentActivity = [
    { icon: 'lab_profile', text: 'Blood test results available', time: '2 hours ago', color: 'text-blue-600 dark:text-blue-400' },
    { icon: 'prescription', text: 'New prescription added', time: '1 day ago', color: 'text-green-600 dark:text-green-400' },
    { icon: 'event_available', text: 'Appointment confirmed with Dr. Mitchell', time: '2 days ago', color: 'text-purple-600 dark:text-purple-400' },
    { icon: 'favorite', text: 'Health metrics updated', time: '3 days ago', color: 'text-red-600 dark:text-red-400' }
  ];

  const getStatusColor = (status: HealthMetric['status']) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'warning':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
      case 'critical':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
    }
  };

  return (
    <div className="h-full bg-slate-50 dark:bg-black overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-4 md:px-8 py-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
            <p className="text-blue-100 text-lg">Here's your health summary for today</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">emergency</span>
              Emergency
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-semibold transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 space-y-6 pb-20">
        {/* Health Metrics */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Health Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {healthMetrics.map((metric, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-white text-2xl">{metric.icon}</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{metric.label}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">{metric.value}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{metric.unit}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{metric.trend}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upcoming Appointments</h2>
              <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {apt.doctor.split(' ')[1][0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white">{apt.doctor}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{apt.specialty}</p>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                            {apt.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            {apt.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">
                              {apt.type === 'Video Call' ? 'videocam' : 'local_hospital'}
                            </span>
                            {apt.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all">
                        <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
                      </button>
                      <button className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all">
                        <span className="material-symbols-outlined text-[20px]">cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all">
              Schedule New Appointment
            </button>
          </div>

          {/* Medications */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Medications</h2>
              <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {medications.map((med, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-white text-[20px]">medication</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">{med.name}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{med.dosage} • {med.frequency}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[16px]">schedule</span>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{med.nextDose}</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                          <span>Pills remaining</span>
                          <span className="font-semibold">{med.remaining}</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full"
                            style={{ width: `${(med.remaining / 30) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-all text-left">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-white">person_search</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Find Doctor</h3>
              </button>
              <button className="p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-all text-left">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-white">lab_profile</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Test Results</h3>
              </button>
              <button className="p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-all text-left">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-white">smart_toy</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Health Bot</h3>
              </button>
              <button className="p-4 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-xl transition-all text-left">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-white">prescription</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Prescriptions</h3>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className={`material-symbols-outlined ${activity.color} text-[20px]`}>{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.text}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Tips */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">tips_and_updates</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Health Tip of the Day</h3>
              <p className="text-green-50 leading-relaxed">
                Stay hydrated! Drinking 8 glasses of water daily helps maintain healthy blood pressure and supports overall cardiovascular health. 
                Set reminders throughout the day to ensure you're meeting your hydration goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
