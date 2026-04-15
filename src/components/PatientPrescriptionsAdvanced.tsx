import React, { useState } from 'react';

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  startDate: string;
  endDate: string;
  doctor: string;
  pharmacy: string;
  refillsRemaining: number;
  instructions: string;
  sideEffects: string[];
  status: 'Active' | 'Expired' | 'Completed';
  nextDose?: string;
  pillsRemaining?: number;
  totalPills?: number;
}

export function PatientPrescriptionsAdvanced() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [showRefillModal, setShowRefillModal] = useState(false);

  const [prescriptions] = useState<Prescription[]>([
    {
      id: 'RX-2026-001',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '90 days',
      startDate: 'Jan 1, 2026',
      endDate: 'Apr 1, 2026',
      doctor: 'Dr. David Martinez',
      pharmacy: 'CVS Pharmacy #4523',
      refillsRemaining: 2,
      instructions: 'Take with meals to reduce stomach upset. Monitor blood sugar levels regularly.',
      sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset', 'Metallic taste'],
      status: 'Active',
      nextDose: 'Today, 8:00 PM',
      pillsRemaining: 15,
      totalPills: 180
    },
    {
      id: 'RX-2026-002',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '90 days',
      startDate: 'Dec 15, 2025',
      endDate: 'Mar 15, 2026',
      doctor: 'Dr. Sarah Mitchell',
      pharmacy: 'Walgreens #8847',
      refillsRemaining: 3,
      instructions: 'Take in the morning. Avoid potassium supplements. Monitor blood pressure.',
      sideEffects: ['Dizziness', 'Dry cough', 'Fatigue', 'Headache'],
      status: 'Active',
      nextDose: 'Tomorrow, 9:00 AM',
      pillsRemaining: 45,
      totalPills: 90
    },
    {
      id: 'RX-2026-003',
      medication: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      duration: '90 days',
      startDate: 'Jan 10, 2026',
      endDate: 'Apr 10, 2026',
      doctor: 'Dr. James Wilson',
      pharmacy: 'CVS Pharmacy #4523',
      refillsRemaining: 2,
      instructions: 'Take at bedtime. Avoid grapefruit juice. Regular liver function tests required.',
      sideEffects: ['Muscle pain', 'Weakness', 'Liver enzyme elevation'],
      status: 'Active',
      nextDose: 'Today, 10:00 PM',
      pillsRemaining: 75,
      totalPills: 90
    },
    {
      id: 'RX-2026-004',
      medication: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      duration: '90 days',
      startDate: 'Jan 5, 2026',
      endDate: 'Apr 5, 2026',
      doctor: 'Dr. Emily Chen',
      pharmacy: 'Target Pharmacy',
      refillsRemaining: 5,
      instructions: 'Take with food for better absorption.',
      sideEffects: ['Minimal - well tolerated'],
      status: 'Active',
      nextDose: 'Today, 9:00 PM',
      pillsRemaining: 20,
      totalPills: 90
    },
    {
      id: 'RX-2025-101',
      medication: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      duration: '10 days',
      startDate: 'Dec 1, 2025',
      endDate: 'Dec 11, 2025',
      doctor: 'Dr. Lisa Anderson',
      pharmacy: 'CVS Pharmacy #4523',
      refillsRemaining: 0,
      instructions: 'Complete entire course. Take with food.',
      sideEffects: ['Diarrhea', 'Nausea', 'Rash'],
      status: 'Completed'
    },
    {
      id: 'RX-2025-102',
      medication: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed for pain',
      duration: '30 days',
      startDate: 'Nov 15, 2025',
      endDate: 'Dec 15, 2025',
      doctor: 'Dr. Michael Brown',
      pharmacy: 'Walgreens #8847',
      refillsRemaining: 0,
      instructions: 'Take with food. Do not exceed 6 tablets per day.',
      sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness'],
      status: 'Expired'
    }
  ]);

  const filteredPrescriptions = prescriptions.filter(rx =>
    activeTab === 'active' ? rx.status === 'Active' : rx.status !== 'Active'
  );

  const getStatusColor = (status: Prescription['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Expired':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Completed':
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800';
    }
  };

  const handleRefillRequest = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowRefillModal(true);
  };

  const submitRefillRequest = () => {
    alert(`Refill request submitted for ${selectedPrescription?.medication}`);
    setShowRefillModal(false);
  };

  return (
    <div className="h-full bg-slate-50 dark:bg-black flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-4xl">
                prescription
              </span>
              My Prescriptions
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage your medications and refills
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'active'
                ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Active ({prescriptions.filter(r => r.status === 'Active').length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            History ({prescriptions.filter(r => r.status !== 'Active').length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Prescriptions List */}
        <div className={`${selectedPrescription ? 'hidden lg:block lg:w-1/2' : 'flex-1'} overflow-y-auto p-4 md:p-8 space-y-4`}>
          {filteredPrescriptions.map((rx) => (
            <div
              key={rx.id}
              onClick={() => setSelectedPrescription(rx)}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border transition-all cursor-pointer ${
                selectedPrescription?.id === rx.id
                  ? 'border-purple-500 dark:border-purple-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-white text-2xl">medication</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{rx.medication}</h3>
                      <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">{rx.dosage} • {rx.frequency}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(rx.status)}`}>
                      {rx.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">person</span>
                      <span className="truncate">{rx.doctor}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">local_pharmacy</span>
                      <span className="truncate">{rx.pharmacy.split('#')[0]}</span>
                    </div>
                  </div>

                  {rx.status === 'Active' && (
                    <>
                      {rx.nextDose && (
                        <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          Next dose: {rx.nextDose}
                        </div>
                      )}

                      {rx.pillsRemaining !== undefined && rx.totalPills && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                            <span>Pills remaining</span>
                            <span className="font-semibold">{rx.pillsRemaining}/{rx.totalPills}</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full"
                              style={{ width: `${(rx.pillsRemaining / rx.totalPills) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {rx.refillsRemaining > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRefillRequest(rx);
                            }}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all text-sm"
                          >
                            Request Refill ({rx.refillsRemaining} left)
                          </button>
                        )}
                        <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all text-sm">
                          Set Reminder
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredPrescriptions.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-8xl mb-4">
                prescription
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No prescriptions found</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {activeTab === 'active' ? 'You have no active prescriptions' : 'No prescription history available'}
              </p>
            </div>
          )}
        </div>

        {/* Prescription Detail */}
        {selectedPrescription && (
          <div className="flex-1 lg:w-1/2 overflow-y-auto bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
            <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedPrescription(null)}
                className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to list
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-white text-4xl">medication</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedPrescription.medication}</h2>
                <p className="text-lg text-purple-600 dark:text-purple-400 font-medium mt-1">{selectedPrescription.dosage}</p>
                <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-full border mt-3 ${getStatusColor(selectedPrescription.status)}`}>
                  {selectedPrescription.status}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Prescription Details</h3>
                
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">schedule</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Frequency</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedPrescription.frequency}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">calendar_today</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Duration</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedPrescription.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">event</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Period</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedPrescription.startDate} - {selectedPrescription.endDate}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">person</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Prescribed By</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedPrescription.doctor}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">local_pharmacy</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Pharmacy</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedPrescription.pharmacy}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">autorenew</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Refills Remaining</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedPrescription.refillsRemaining}</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined">info</span>
                  Instructions
                </h3>
                <p className="text-blue-800 dark:text-blue-200">{selectedPrescription.instructions}</p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                <h3 className="font-bold text-orange-900 dark:text-orange-300 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined">warning</span>
                  Possible Side Effects
                </h3>
                <ul className="space-y-1 text-orange-800 dark:text-orange-200">
                  {selectedPrescription.sideEffects.map((effect, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-600 dark:bg-orange-400 rounded-full"></span>
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedPrescription.status === 'Active' && (
                <div className="space-y-3">
                  {selectedPrescription.refillsRemaining > 0 && (
                    <button
                      onClick={() => handleRefillRequest(selectedPrescription)}
                      className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">autorenew</span>
                      Request Refill ({selectedPrescription.refillsRemaining} remaining)
                    </button>
                  )}
                  <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">notifications</span>
                    Set Medication Reminder
                  </button>
                  <button className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">download</span>
                    Download Prescription
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Refill Request Modal */}
      {showRefillModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Request Refill</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Request refill for <strong>{selectedPrescription.medication}</strong>
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Medication</div>
                <div className="font-semibold text-slate-900 dark:text-white">{selectedPrescription.medication} {selectedPrescription.dosage}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Pharmacy</div>
                <div className="font-semibold text-slate-900 dark:text-white">{selectedPrescription.pharmacy}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Refills Available</div>
                <div className="font-semibold text-slate-900 dark:text-white">{selectedPrescription.refillsRemaining}</div>
              </div>
              <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Pick up in store</option>
                <option>Home delivery</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRefillModal(false)}
                className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={submitRefillRequest}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
