import React, { useState, useMemo } from 'react';
import { DateUtils } from '../utils/dateUtils';

interface Appointment {
  id: string;
  doctor: string;
  doctorInitials: string;
  specialty: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Video Call' | 'Phone Call';
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'Rescheduled';
  location: string;
  reason: string;
  notes?: string;
  prescriptionAttached?: boolean;
  testResultsAttached?: boolean;
  cancelReason?: string;
}

export function PatientAppointmentsAdvanced() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const [appointments] = useState<Appointment[]>([
    {
      id: 'APT-2026-001',
      doctor: 'Dr. Sarah Mitchell',
      doctorInitials: 'SM',
      specialty: 'Cardiologist',
      date: 'Feb 20, 2026',
      time: '10:30 AM',
      type: 'In-Person',
      status: 'Upcoming',
      location: 'Main Building, Room 305',
      reason: 'Routine cardiac checkup',
      notes: 'Bring previous ECG reports if available.'
    },
    {
      id: 'APT-2026-002',
      doctor: 'Dr. James Wilson',
      doctorInitials: 'JW',
      specialty: 'General Physician',
      date: 'Feb 24, 2026',
      time: '2:00 PM',
      type: 'Video Call',
      status: 'Upcoming',
      location: 'Online',
      reason: 'Follow-up consultation',
      notes: 'Discuss recent lab results and medication adjustment.'
    },
    {
      id: 'APT-2026-003',
      doctor: 'Dr. Emily Chen',
      doctorInitials: 'EC',
      specialty: 'Dermatologist',
      date: 'Mar 5, 2026',
      time: '11:00 AM',
      type: 'In-Person',
      status: 'Upcoming',
      location: 'Dermatology Clinic, Floor 2',
      reason: 'Skin checkup and mole examination'
    },
    {
      id: 'APT-2026-101',
      doctor: 'Dr. Michael Brown',
      doctorInitials: 'MB',
      specialty: 'Orthopedic',
      date: 'Jan 10, 2026',
      time: '9:00 AM',
      type: 'In-Person',
      status: 'Completed',
      location: 'Orthopedic Wing, Room 201',
      reason: 'Knee pain evaluation',
      notes: 'Patient showed improvement. Continue physiotherapy.',
      testResultsAttached: true,
      prescriptionAttached: true
    },
    {
      id: 'APT-2026-102',
      doctor: 'Dr. Lisa Anderson',
      doctorInitials: 'LA',
      specialty: 'Pediatrician',
      date: 'Jan 5, 2026',
      time: '3:30 PM',
      type: 'Video Call',
      status: 'Completed',
      location: 'Online',
      reason: 'Child wellness checkup',
      notes: 'All vitals normal. Schedule next checkup in 6 months.',
      testResultsAttached: false,
      prescriptionAttached: false
    },
    {
      id: 'APT-2025-103',
      doctor: 'Dr. David Martinez',
      doctorInitials: 'DM',
      specialty: 'Neurologist',
      date: 'Dec 28, 2025',
      time: '4:00 PM',
      type: 'In-Person',
      status: 'Completed',
      location: 'Neurology Department, Room 404',
      reason: 'Headache consultation',
      notes: 'Prescribed medication for migraine. Follow up if symptoms persist.',
      testResultsAttached: true,
      prescriptionAttached: true,
      testResultsAttached: true
    },
    {
      id: 'APT-2026-201',
      doctor: 'Dr. Robert Taylor',
      doctorInitials: 'RT',
      specialty: 'Dentist',
      date: 'Jan 12, 2026',
      time: '1:00 PM',
      type: 'In-Person',
      status: 'Cancelled',
      location: 'Dental Clinic, Building C',
      reason: 'Teeth cleaning and checkup',
      notes: 'Cancelled due to scheduling conflict.',
      cancelReason: 'Patient requested reschedule'
    }
  ]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(apt => {
      if (activeTab === 'upcoming') return apt.status === 'Upcoming';
      if (activeTab === 'past') return apt.status === 'Completed';
      if (activeTab === 'cancelled') return apt.status === 'Cancelled' || apt.status === 'Rescheduled';
      return true;
    });
  }, [appointments, activeTab]);

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Rescheduled':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
    }
  };

  const getTypeIcon = (type: Appointment['type']) => {
    switch (type) {
      case 'Video Call':
        return 'videocam';
      case 'Phone Call':
        return 'call';
      case 'In-Person':
        return 'local_hospital';
    }
  };

  const handleCancelAppointment = (apt: Appointment) => {
    if (confirm(`Are you sure you want to cancel your appointment with ${apt.doctor}?`)) {
      alert('Appointment cancelled successfully');
    }
  };

  const handleReschedule = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setShowReschedule(true);
  };

  return (
    <div className="h-full bg-slate-50 dark:bg-black flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-4xl">
                event
              </span>
              My Appointments
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage and track your medical appointments
            </p>
          </div>
          <button
            onClick={() => setShowBooking(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-500/30"
          >
            <span className="material-symbols-outlined">add</span>
            Book New Appointment
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'upcoming'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Upcoming ({appointments.filter(a => a.status === 'Upcoming').length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'past'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Past ({appointments.filter(a => a.status === 'Completed').length})
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'cancelled'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Cancelled ({appointments.filter(a => a.status === 'Cancelled' || a.status === 'Rescheduled').length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Appointments List */}
        <div className={`${selectedAppointment ? 'hidden lg:block lg:w-1/2' : 'flex-1'} overflow-y-auto p-4 md:p-8 space-y-4`}>
          {filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              onClick={() => setSelectedAppointment(apt)}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border transition-all cursor-pointer ${
                selectedAppointment?.id === apt.id
                  ? 'border-blue-500 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Doctor Avatar */}
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {apt.doctorInitials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{apt.doctor}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{apt.specialty}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{apt.reason}</p>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>{apt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">{getTypeIcon(apt.type)}</span>
                      <span>{apt.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      <span className="truncate">{apt.location}</span>
                    </div>
                  </div>

                  {/* Attachments */}
                  {(apt.prescriptionAttached || apt.testResultsAttached) && (
                    <div className="flex gap-2 mb-3">
                      {apt.prescriptionAttached && (
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-full flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">prescription</span>
                          Prescription
                        </span>
                      )}
                      {apt.testResultsAttached && (
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">lab_profile</span>
                          Test Results
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  {apt.status === 'Upcoming' && (
                    <div className="flex gap-2">
                      {apt.type === 'Video Call' && (
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center gap-1 text-sm">
                          <span className="material-symbols-outlined text-[16px]">videocam</span>
                          Join Call
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReschedule(apt);
                        }}
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all text-sm"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelAppointment(apt);
                        }}
                        className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {apt.status === 'Completed' && (
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all text-sm">
                        Book Follow-up
                      </button>
                      <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all text-sm">
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-8xl mb-4">
                event_busy
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No appointments found</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">You don't have any {activeTab} appointments</p>
              <button
                onClick={() => setShowBooking(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
              >
                Book Your First Appointment
              </button>
            </div>
          )}
        </div>

        {/* Appointment Detail */}
        {selectedAppointment && (
          <div className="flex-1 lg:w-1/2 overflow-y-auto bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
            {/* Back button for mobile */}
            <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to list
              </button>
            </div>

            {/* Detail Content */}
            <div className="p-8 space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {selectedAppointment.doctorInitials}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedAppointment.doctor}</h2>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mt-1">{selectedAppointment.specialty}</p>
                <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-full border mt-3 ${getStatusColor(selectedAppointment.status)}`}>
                  {selectedAppointment.status}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Appointment Details</h3>
                
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">calendar_today</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Date</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedAppointment.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">schedule</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Time</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedAppointment.time}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">{getTypeIcon(selectedAppointment.type)}</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Type</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedAppointment.type}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">location_on</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Location</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedAppointment.location}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Reason for Visit</h3>
                <p className="text-slate-600 dark:text-slate-400">{selectedAppointment.reason}</p>
              </div>

              {selectedAppointment.notes && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined">note</span>
                    Doctor's Notes
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200">{selectedAppointment.notes}</p>
                </div>
              )}

              {(selectedAppointment.prescriptionAttached || selectedAppointment.testResultsAttached) && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Attachments</h3>
                  <div className="space-y-2">
                    {selectedAppointment.prescriptionAttached && (
                      <button className="w-full p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-all flex items-center gap-3">
                        <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">prescription</span>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-slate-900 dark:text-white">Prescription</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">View and download prescription</div>
                        </div>
                        <span className="material-symbols-outlined text-slate-400">download</span>
                      </button>
                    )}
                    {selectedAppointment.testResultsAttached && (
                      <button className="w-full p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-all flex items-center gap-3">
                        <span className="material-symbols-outlined text-green-600 dark:text-green-400">lab_profile</span>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-slate-900 dark:text-white">Test Results</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">View lab test results</div>
                        </div>
                        <span className="material-symbols-outlined text-slate-400">download</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {selectedAppointment.status === 'Upcoming' && (
                <div className="space-y-3">
                  {selectedAppointment.type === 'Video Call' && (
                    <button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">videocam</span>
                      Join Video Call
                    </button>
                  )}
                  <button
                    onClick={() => handleReschedule(selectedAppointment)}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
                  >
                    Reschedule Appointment
                  </button>
                  <button
                    onClick={() => handleCancelAppointment(selectedAppointment)}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all"
                  >
                    Cancel Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Book Appointment Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Book New Appointment</h3>
            <div className="space-y-4 mb-6">
              <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Doctor</option>
                <option>Dr. Sarah Mitchell - Cardiologist</option>
                <option>Dr. James Wilson - General Physician</option>
                <option>Dr. Emily Chen - Dermatologist</option>
              </select>
              <input
                type="date"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Time</option>
                <option>9:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>2:00 PM</option>
              </select>
              <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>In-Person Visit</option>
                <option>Video Call</option>
                <option>Phone Call</option>
              </select>
              <textarea
                placeholder="Reason for appointment..."
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBooking(false)}
                className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowBooking(false);
                  alert('Appointment booked successfully!');
                }}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showReschedule && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Reschedule Appointment</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Current: {selectedAppointment.date} at {selectedAppointment.time}
            </p>
            <div className="space-y-4 mb-6">
              <input
                type="date"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select New Time</option>
                <option>9:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>2:00 PM</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReschedule(false)}
                className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowReschedule(false);
                  alert('Appointment rescheduled successfully!');
                }}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}