import React, { useState } from 'react';
import { PatientSectionHeader } from './PatientSectionHeader';

interface AccessRequest {
  id: string;
  providerName: string;
  providerType: string;
  hospital: string;
  requestedDate: string;
  requestedPermissions: string[];
  status: 'pending' | 'approved' | 'rejected';
  providerImage: string;
}

interface AuthorizedProvider {
  id: string;
  providerName: string;
  providerType: string;
  hospital: string;
  grantedPermissions: string[];
  lastAccessed: string;
  providerImage: string;
}

interface AccessHistory {
  id: string;
  provider: string;
  dataAccessed: string;
  action: 'viewed' | 'downloaded' | 'synced';
  timestamp: string;
}

export function PatientDataAccess() {
  const [pendingRequests, setPendingRequests] = useState<AccessRequest[]>([
    {
      id: '1',
      providerName: 'Dr. Rajesh Kumar',
      providerType: 'Cardiologist',
      hospital: 'Apollo Hospital',
      requestedDate: 'Dec 10, 2024',
      requestedPermissions: ['Lab Results', 'Imaging', 'Prescriptions', 'Clinical Notes'],
      status: 'pending',
      providerImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400'
    },
    {
      id: '2',
      providerName: 'Dr. Priya Sharma',
      providerType: 'General Physician',
      hospital: 'Max Healthcare',
      requestedDate: 'Dec 12, 2024',
      requestedPermissions: ['Lab Results', 'Prescriptions'],
      status: 'pending',
      providerImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400'
    }
  ]);

  const [authorizedProviders, setAuthorizedProviders] = useState<AuthorizedProvider[]>([
    {
      id: '1',
      providerName: 'Dr. Sarah Jenkins',
      providerType: 'Cardiology Specialist',
      hospital: "St. Luke's Medical Center",
      grantedPermissions: ['Lab Results', 'Imaging'],
      lastAccessed: 'Oct 24, 2024 • 09:12 AM',
      providerImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'
    },
    {
      id: '2',
      providerName: 'Metro General Hospital',
      providerType: 'Multi-specialty Institutional Access',
      hospital: 'Metro General Hospital',
      grantedPermissions: ['Lab Results', 'Imaging', 'Prescriptions', 'Clinical Notes'],
      lastAccessed: 'Oct 21, 2024 • 02:45 PM',
      providerImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400'
    }
  ]);

  const [accessHistory] = useState<AccessHistory[]>([
    {
      id: '1',
      provider: "St. Luke's Medical",
      dataAccessed: 'Chest X-Ray (DICOM)',
      action: 'downloaded',
      timestamp: 'Oct 24, 2024 • 09:14:22'
    },
    {
      id: '2',
      provider: 'Dr. Jenkins Office',
      dataAccessed: 'Blood Panels (Oct 22)',
      action: 'viewed',
      timestamp: 'Oct 24, 2024 • 09:12:05'
    },
    {
      id: '3',
      provider: 'Metro General',
      dataAccessed: 'Patient Demographics',
      action: 'synced',
      timestamp: 'Oct 21, 2024 • 14:45:12'
    }
  ]);

  const handleApprove = (requestId: string) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      // Move to authorized providers
      setAuthorizedProviders([...authorizedProviders, {
        id: Date.now().toString(),
        providerName: request.providerName,
        providerType: request.providerType,
        hospital: request.hospital,
        grantedPermissions: request.requestedPermissions,
        lastAccessed: 'Never',
        providerImage: request.providerImage
      }]);
      
      // Remove from pending
      setPendingRequests(pendingRequests.filter(r => r.id !== requestId));
      
      alert(`✅ Access approved for ${request.providerName}`);
    }
  };

  const handleReject = (requestId: string) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (request) {
      setPendingRequests(pendingRequests.filter(r => r.id !== requestId));
      alert(`❌ Access request rejected for ${request.providerName}`);
    }
  };

  const handleRevoke = (providerId: string) => {
    const provider = authorizedProviders.find(p => p.id === providerId);
    if (provider && window.confirm(`Are you sure you want to revoke access for ${provider.providerName}?`)) {
      setAuthorizedProviders(authorizedProviders.filter(p => p.id !== providerId));
      alert(`🔒 Access revoked for ${provider.providerName}`);
    }
  };

  const getActionIcon = (action: string) => {
    switch(action) {
      case 'downloaded': return 'download';
      case 'viewed': return 'visibility';
      case 'synced': return 'sync';
      default: return 'info';
    }
  };

  const getActionColor = (action: string) => {
    switch(action) {
      case 'downloaded': return 'text-green-600 dark:text-green-400';
      case 'viewed': return 'text-blue-600 dark:text-blue-400';
      case 'synced': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <div className="h-full overflow-y-auto flex flex-col bg-slate-50/50 dark:bg-black">
      {/* Header */}
      <PatientSectionHeader
        icon="verified_user"
        title="Data Access Management"
        subtitle="Control who can access your health records and review access history"
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:px-8 md:pt-2 md:pb-8 space-y-8 pb-20">
        
        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-6 rounded-2xl text-center hover:shadow-xl transition-all">
            <div className="flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[#137fec] text-5xl">group</span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{authorizedProviders.length}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mt-1">Authorized Providers</p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl text-center hover:shadow-xl transition-all">
            <div className="flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-amber-500 text-5xl">pending_actions</span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{pendingRequests.length}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mt-1">Pending Requests</p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl text-center hover:shadow-xl transition-all">
            <div className="flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-green-500 text-5xl">history</span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{accessHistory.length}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mt-1">Recent Activities</p>
          </div>
        </div>

        {/* Pending Approval Requests */}
        {pendingRequests.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Pending Approval Requests</h2>
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-bold">
                {pendingRequests.length} Pending
              </span>
            </div>
            
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="glass-card p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-800/30 hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Provider Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/50 dark:ring-slate-800/50 shrink-0">
                        <img src={request.providerImage} alt={request.providerName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{request.providerName}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{request.providerType} • {request.hospital}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-500">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          <span>Requested: {request.requestedDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Requested Permissions */}
                    <div className="flex flex-wrap gap-2 items-start">
                      {request.requestedPermissions.map((permission, index) => (
                        <span key={index} className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wide">
                          {permission}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col gap-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">cancel</span>
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Authorized Providers */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Authorized Providers</h2>
            <button className="text-[#137fec] hover:text-[#0b5cb5] font-bold text-sm transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {authorizedProviders.map((provider) => (
              <div key={provider.id} className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all group">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  {/* Provider Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/50 dark:ring-slate-800/50 shrink-0">
                      <img src={provider.providerImage} alt={provider.providerName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{provider.providerName}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{provider.providerType} • {provider.hospital}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-500">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span>Last Accessed: {provider.lastAccessed}</span>
                      </div>
                    </div>
                  </div>

                  {/* Granted Permissions */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {provider.grantedPermissions.map((permission, index) => (
                      <span key={index} className="px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold uppercase tracking-wide">
                        {permission}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#137fec] hover:text-white font-bold text-sm transition-all">
                      Edit
                    </button>
                    <button
                      onClick={() => handleRevoke(provider.id)}
                      className="px-5 py-2.5 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white font-bold text-sm transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-lg">block</span>
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Access History */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Access History</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Review how and when your medical data was retrieved</p>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Data Accessed</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {accessHistory.map((history) => (
                  <tr key={history.id} className="hover:bg-white/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{history.provider}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium">
                        {history.dataAccessed}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 font-bold text-xs uppercase ${getActionColor(history.action)}`}>
                        <span className="material-symbols-outlined text-sm">{getActionIcon(history.action)}</span>
                        <span>{history.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{history.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Privacy Notice */}
        <div className="glass-card p-6 rounded-2xl border-2 border-blue-200 dark:border-blue-800/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">security</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Privacy Checkpoint</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You have {authorizedProviders.length} providers with access to your health records. 
                We recommend reviewing access permissions every 90 days to ensure your data privacy.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
