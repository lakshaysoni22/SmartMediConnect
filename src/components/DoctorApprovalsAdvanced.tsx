import React, { useState } from 'react';

interface ApprovalRequest {
  id: string;
  type: 'Leave Request' | 'Prescription Renewal' | 'Surgery Authorization' | 'Test Order' | 'Referral' | 'Treatment Plan';
  patient: string;
  patientId: string;
  requestedBy: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Review';
  details: string;
  attachments?: number;
  dueDate?: string;
}

export function DoctorApprovalsAdvanced() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [filterPriority, setFilterPriority] = useState('all');

  const [requests] = useState<ApprovalRequest[]>([
    {
      id: 'APR-2026-001',
      type: 'Procedure Approval',
      patient: 'Sarah Jenkins',
      patientId: 'P-12345',
      requestedBy: 'Dr. Robert Chen',
      date: 'Feb 17, 2026',
      priority: 'High',
      status: 'Pending',
      details: 'Request for approval of elective cardiac catheterization procedure. Patient has stable angina with recent positive stress test. All pre-op workup completed.',
      attachments: 3,
      dueDate: 'Feb 19, 2026'
    },
    {
      id: 'APR-2026-002',
      type: 'Prescription Refill',
      patient: 'Marcus Wright',
      patientId: 'P-23456',
      requestedBy: 'Pharmacy - CVS',
      date: 'Feb 17, 2026',
      priority: 'Medium',
      status: 'Pending',
      details: 'Refill request for Lisinopril 20mg, 90-day supply. Patient adherent to medication, last BP reading 138/88 mmHg.',
      attachments: 1,
      dueDate: 'Feb 18, 2026'
    },
    {
      id: 'APR-2026-003',
      type: 'Imaging Authorization',
      patient: 'Emily Chen',
      patientId: 'P-34567',
      requestedBy: 'Dr. Lisa Martinez',
      date: 'Feb 16, 2026',
      priority: 'High',
      status: 'Pending',
      details: 'Authorization for CT scan with contrast to evaluate post-operative recovery. Concern for possible fluid collection at surgical site.',
      attachments: 2,
      dueDate: 'Feb 17, 2026'
    },
    {
      id: 'APR-2026-004',
      type: 'Specialist Referral',
      patient: 'David Miller',
      patientId: 'P-45678',
      requestedBy: 'Dr. Sarah Mitchell',
      date: 'Feb 15, 2026',
      priority: 'Low',
      status: 'Pending',
      details: 'Referral to endocrinologist for complex diabetes management. HbA1c 8.2% despite current regimen. Patient needs insulin therapy evaluation.',
      attachments: 0
    },
    {
      id: 'APR-2026-005',
      type: 'Leave Request',
      patient: 'N/A',
      patientId: 'N/A',
      requestedBy: 'Dr. James Wilson',
      date: 'Feb 15, 2026',
      priority: 'Low',
      status: 'Pending',
      details: 'Medical leave request for 5 days (Feb 25-29) for CME conference attendance. Coverage arranged with Dr. Anderson.',
      attachments: 1
    },
    {
      id: 'APR-2026-006',
      type: 'Surgery Authorization',
      patient: 'Jennifer Lopez',
      patientId: 'P-56789',
      requestedBy: 'Dr. Michael Brown',
      date: 'Feb 14, 2026',
      priority: 'High',
      status: 'Approved',
      details: 'Arthroscopic knee surgery approved. Patient has failed conservative therapy for 6 months. MRI shows meniscal tear.',
      attachments: 4
    },
    {
      id: 'APR-2026-007',
      type: 'Treatment Plan',
      patient: 'Robert Johnson',
      patientId: 'P-67890',
      requestedBy: 'Dr. Emily Chen',
      date: 'Feb 13, 2026',
      priority: 'Medium',
      status: 'Approved',
      details: 'Chemotherapy protocol approved for lung cancer patient. Stage IIIA NSCLC, post-surgical. Starting carboplatin/pemetrexed regimen.',
      attachments: 5
    },
    {
      id: 'APR-2026-008',
      type: 'Prescription Renewal',
      patient: 'Maria Garcia',
      patientId: 'P-78901',
      requestedBy: 'Pharmacy - Walgreens',
      date: 'Feb 12, 2026',
      priority: 'Low',
      status: 'Rejected',
      details: 'Refill request for opioid medication denied. Patient not due for refill for another 10 days. Potential early refill abuse concern.',
      attachments: 1
    }
  ]);

  const filteredRequests = requests.filter(req => {
    const matchesTab = (
      (activeTab === 'pending' && req.status === 'Pending') ||
      (activeTab === 'approved' && req.status === 'Approved') ||
      (activeTab === 'rejected' && req.status === 'Rejected')
    );
    const matchesPriority = filterPriority === 'all' || req.priority.toLowerCase() === filterPriority.toLowerCase();
    return matchesTab && matchesPriority;
  });

  const handleApprove = (request: ApprovalRequest) => {
    setRequests(prev => prev.map(req =>
      req.id === request.id ? { ...req, status: 'Approved' as const } : req
    ));
    alert(`Approved: ${request.type} for ${request.patient}`);
    setSelectedRequest(null);
  };

  const handleReject = (request: ApprovalRequest) => {
    const reason = prompt('Reason for rejection:');
    if (reason) {
      setRequests(prev => prev.map(req =>
        req.id === request.id ? { ...req, status: 'Rejected' as const } : req
      ));
      alert(`Rejected: ${request.type}`);
      setSelectedRequest(null);
    }
  };

  const getPriorityColor = (priority: ApprovalRequest['priority']) => {
    switch (priority) {
      case 'High': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Medium': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Low': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
    }
  };

  const getTypeIcon = (type: ApprovalRequest['type']) => {
    switch (type) {
      case 'Surgery Authorization': return 'surgical';
      case 'Prescription Renewal': return 'prescription';
      case 'Test Order': return 'lab_profile';
      case 'Referral': return 'person_search';
      case 'Leave Request': return 'event_busy';
      case 'Treatment Plan': return 'medical_services';
    }
  };

  return (
    <div className="h-full bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-4xl">
                task_alt
              </span>
              Approvals & Requests
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Review and manage approval requests
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {requests.filter(r => r.status === 'Pending').length} pending
            </span>
          </div>
        </div>

        {/* Tabs & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 flex-1">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'pending'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Pending ({requests.filter(r => r.status === 'Pending').length})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'approved'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Approved ({requests.filter(r => r.status === 'Approved').length})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'rejected'
                  ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Rejected ({requests.filter(r => r.status === 'Rejected').length})
            </button>
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Requests List */}
        <div className={`${selectedRequest ? 'hidden lg:block lg:w-1/2' : 'flex-1'} overflow-y-auto p-4 md:p-8 space-y-4`}>
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              onClick={() => setSelectedRequest(request)}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border transition-all cursor-pointer ${
                selectedRequest?.id === request.id
                  ? 'border-amber-500 dark:border-amber-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-white text-2xl">{getTypeIcon(request.type)}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{request.type}</h3>
                      {request.patient !== 'N/A' && (
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Patient: <span className="font-semibold">{request.patient}</span> ({request.patientId})
                        </p>
                      )}
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getPriorityColor(request.priority)}`}>
                      {request.priority} Priority
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{request.details}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">person</span>
                      <span className="truncate">{request.requestedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span>{request.date}</span>
                    </div>
                    {request.attachments && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-[16px]">attach_file</span>
                        <span>{request.attachments} files</span>
                      </div>
                    )}
                  </div>

                  {request.dueDate && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400 mb-3">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      Due: {request.dueDate}
                    </div>
                  )}

                  {request.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(request);
                        }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(request);
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all text-sm"
                      >
                        Reject
                      </button>
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all text-sm">
                        Request Info
                      </button>
                    </div>
                  )}

                  {request.status === 'Approved' && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Approved
                    </div>
                  )}

                  {request.status === 'Rejected' && (
                    <div className="flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-400">
                      <span className="material-symbols-outlined text-[16px]">cancel</span>
                      Rejected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-8xl mb-4">
                task_alt
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No requests found</h3>
              <p className="text-slate-600 dark:text-slate-400">All clear! No {activeTab} requests.</p>
            </div>
          )}
        </div>

        {/* Request Detail */}
        {selectedRequest && (
          <div className="flex-1 lg:w-1/2 overflow-y-auto bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
            <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedRequest(null)}
                className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to list
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-white text-4xl">{getTypeIcon(selectedRequest.type)}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedRequest.type}</h2>
                <p className="text-lg text-amber-600 dark:text-amber-400 font-medium mt-1">Request ID: {selectedRequest.id}</p>
                <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-full border mt-3 ${getPriorityColor(selectedRequest.priority)}`}>
                  {selectedRequest.priority} Priority
                </span>
              </div>

              {selectedRequest.patient !== 'N/A' && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Patient Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">person</span>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Patient Name</div>
                        <div className="font-semibold text-slate-900 dark:text-white">{selectedRequest.patient}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">badge</span>
                      <div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Patient ID</div>
                        <div className="font-semibold text-slate-900 dark:text-white">{selectedRequest.patientId}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Request Details</h3>
                
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">person</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Requested By</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedRequest.requestedBy}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">calendar_today</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Request Date</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedRequest.date}</div>
                  </div>
                </div>

                {selectedRequest.dueDate && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400">schedule</span>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Due Date</div>
                      <div className="font-semibold text-red-600 dark:text-red-400">{selectedRequest.dueDate}</div>
                    </div>
                  </div>
                )}

                {selectedRequest.attachments && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">attach_file</span>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Attachments</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{selectedRequest.attachments} files</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-3">Description</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedRequest.details}</p>
              </div>

              {selectedRequest.attachments && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Attachments ({selectedRequest.attachments})</h3>
                  <div className="space-y-2">
                    {Array.from({ length: selectedRequest.attachments || 0 }).map((_, idx) => (
                      <button key={idx} className="w-full p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-all flex items-center gap-3 text-left">
                        <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">description</span>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 dark:text-white">Document_{idx + 1}.pdf</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">1.2 MB</div>
                        </div>
                        <span className="material-symbols-outlined text-slate-400">download</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedRequest.status === 'Pending' && (
                <div className="space-y-3">
                  <button
                    onClick={() => handleApprove(selectedRequest)}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">check_circle</span>
                    Approve Request
                  </button>
                  <button
                    onClick={() => handleReject(selectedRequest)}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">cancel</span>
                    Reject Request
                  </button>
                  <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">mail</span>
                    Request More Information
                  </button>
                </div>
              )}

              {selectedRequest.status === 'Approved' && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">check_circle</span>
                  <div>
                    <h4 className="font-bold text-green-900 dark:text-green-300">Request Approved</h4>
                    <p className="text-sm text-green-700 dark:text-green-200">This request has been approved and processed.</p>
                  </div>
                </div>
              )}

              {selectedRequest.status === 'Rejected' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-3xl">cancel</span>
                  <div>
                    <h4 className="font-bold text-red-900 dark:text-red-300">Request Rejected</h4>
                    <p className="text-sm text-red-700 dark:text-red-200">This request has been rejected.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}