import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';

interface EventData {
  id: number;
  title: string;
  date: string;
  location: string;
  status: 'ACTIVE' | 'DRAFT' | 'COMPLETED';
  registrations: number;
  capacity: number;
  budget: number;
  budgetStatus: 'On Track' | 'Pending Approval' | 'Over Budget';
  image: string;
}

export function AdminEventsHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'all' | 'archive'>('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('mediconnectAppLanguage') || 'en');

  const events: EventData[] = [
    {
      id: 1,
      title: 'Annual Cardiology Conference 2024',
      date: 'Oct 12-14, 2024 • Main Auditorium',
      location: 'Main Auditorium',
      status: 'ACTIVE',
      registrations: 342,
      capacity: 500,
      budget: 8200,
      budgetStatus: 'On Track',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Pediatric Nurse Training Workshop',
      date: 'Nov 05, 2024 • Training Wing B',
      location: 'Training Wing B',
      status: 'DRAFT',
      registrations: 0,
      capacity: 40,
      budget: 1500,
      budgetStatus: 'Pending Approval',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Community Health Drive: North District',
      date: 'Sep 28, 2024 • North Park Pavilion',
      location: 'North Park Pavilion',
      status: 'COMPLETED',
      registrations: 812,
      capacity: 800,
      budget: 5400,
      budgetStatus: 'Over Budget',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Emergency Medicine Symposium',
      date: 'Oct 28, 2024 • Conference Hall A',
      location: 'Conference Hall A',
      status: 'ACTIVE',
      registrations: 156,
      capacity: 200,
      budget: 4500,
      budgetStatus: 'On Track',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Mental Health Awareness Week',
      date: 'Nov 10-15, 2024 • Multiple Venues',
      location: 'Multiple Venues',
      status: 'ACTIVE',
      registrations: 289,
      capacity: 350,
      budget: 6800,
      budgetStatus: 'On Track',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Diabetes Management Seminar',
      date: 'Nov 20, 2024 • Auditorium B',
      location: 'Auditorium B',
      status: 'DRAFT',
      registrations: 12,
      capacity: 150,
      budget: 2200,
      budgetStatus: 'Pending Approval',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      title: 'Summer Health Camp 2024',
      date: 'Aug 15-20, 2024 • City Park',
      location: 'City Park',
      status: 'COMPLETED',
      registrations: 445,
      capacity: 400,
      budget: 7500,
      budgetStatus: 'Over Budget',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      title: 'Surgical Techniques Workshop',
      date: 'Oct 22, 2024 • Surgery Training Center',
      location: 'Surgery Training Center',
      status: 'ACTIVE',
      registrations: 28,
      capacity: 30,
      budget: 9500,
      budgetStatus: 'On Track',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=300&fit=crop'
    },
    {
      id: 9,
      title: 'Vaccination Drive - Phase 2',
      date: 'Jul 10-25, 2024 • Mobile Clinics',
      location: 'Mobile Clinics',
      status: 'COMPLETED',
      registrations: 1205,
      capacity: 1000,
      budget: 12500,
      budgetStatus: 'On Track',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
    },
    {
      id: 10,
      title: 'Radiology Updates Conference',
      date: 'Nov 18, 2024 • Radiology Department',
      location: 'Radiology Department',
      status: 'DRAFT',
      registrations: 0,
      capacity: 80,
      budget: 3200,
      budgetStatus: 'Pending Approval',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop'
    },
    {
      id: 11,
      title: 'Patient Safety & Quality Care',
      date: 'Oct 30, 2024 • Main Hall',
      location: 'Main Hall',
      status: 'ACTIVE',
      registrations: 198,
      capacity: 250,
      budget: 4100,
      budgetStatus: 'On Track',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop'
    },
    {
      id: 12,
      title: 'Cancer Awareness Campaign',
      date: 'Sep 05-10, 2024 • Community Centers',
      location: 'Community Centers',
      status: 'COMPLETED',
      registrations: 678,
      capacity: 600,
      budget: 8900,
      budgetStatus: 'Over Budget',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop'
    },
    {
      id: 13,
      title: 'Orthopedic Surgery Masterclass',
      date: 'Nov 25, 2024 • OR Training Suite',
      location: 'OR Training Suite',
      status: 'DRAFT',
      registrations: 8,
      capacity: 25,
      budget: 11000,
      budgetStatus: 'Pending Approval',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=300&fit=crop'
    },
    {
      id: 14,
      title: 'Women\'s Health Symposium',
      date: 'Oct 25, 2024 • Women\'s Center',
      location: 'Women\'s Center',
      status: 'ACTIVE',
      registrations: 234,
      capacity: 300,
      budget: 5600,
      budgetStatus: 'On Track',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
    },
    {
      id: 15,
      title: 'Blood Donation Drive - Spring',
      date: 'Jun 15-18, 2024 • Hospital Grounds',
      location: 'Hospital Grounds',
      status: 'COMPLETED',
      registrations: 523,
      capacity: 500,
      budget: 3800,
      budgetStatus: 'On Track',
      image: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=400&h=300&fit=crop'
    },
    {
      id: 16,
      title: 'Telemedicine Innovation Summit',
      date: 'Nov 12, 2024 • Virtual & Hybrid',
      location: 'Virtual & Hybrid',
      status: 'ACTIVE',
      registrations: 412,
      capacity: 500,
      budget: 7200,
      budgetStatus: 'On Track',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop'
    },
    {
      id: 17,
      title: 'Pharmacy Management Workshop',
      date: 'Dec 02, 2024 • Pharmacy Wing',
      location: 'Pharmacy Wing',
      status: 'DRAFT',
      registrations: 15,
      capacity: 60,
      budget: 2800,
      budgetStatus: 'Pending Approval',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop'
    },
    {
      id: 18,
      title: 'Hospital Staff Wellness Day',
      date: 'Aug 28, 2024 • Recreation Center',
      location: 'Recreation Center',
      status: 'COMPLETED',
      registrations: 892,
      capacity: 800,
      budget: 9200,
      budgetStatus: 'Over Budget',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    }
  ];

  const staffContributions = [
    { name: 'Jane Doe', initials: 'JD', events: 12, percentage: 85 },
    { name: 'Mark Kilgore', initials: 'MK', events: 8, percentage: 60 },
    { name: 'Alice Ho', initials: 'AH', events: 5, percentage: 40 }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      ACTIVE: 'bg-[#13ec5b]/10 text-[#13ec5b] border-[#13ec5b]/20',
      DRAFT: 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600',
      COMPLETED: 'bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 border-blue-200 dark:border-blue-800'
    };
    return styles[status as keyof typeof styles] || styles.DRAFT;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return '#13ec5b';
    if (percentage >= 50) return '#3b82f6';
    return '#94a3b8';
  };

  // Filter events based on active tab
  const filteredEvents = events.filter(event => {
    if (activeTab === 'upcoming') {
      return event.status === 'ACTIVE' || event.status === 'DRAFT';
    } else if (activeTab === 'archive') {
      return event.status === 'COMPLETED';
    }
    return true; // 'all' shows everything
  });

  // Further filter by search query
  const displayedEvents = filteredEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-black">
      {/* Header - Consistent with other admin pages */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0077b6] rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">calendar_today</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Events Management</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage hospital conferences, training sessions, and health campaigns</p>
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
      <div className="flex-1 overflow-y-auto p-4 lg:p-5">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-4">
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar - Left */}
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-[#136dec] focus:border-[#136dec] transition-all"
                placeholder="Search events..."
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowCreateModal(true)}
                className="h-10 px-4 bg-[#136dec] hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Create Event</span>
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Active Events */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 border-l-4 border-l-[#13ec5b]">
              <div className="flex justify-between items-start mb-3">
                <span className="material-symbols-outlined text-[#13ec5b] bg-[#13ec5b]/10 p-2 rounded-lg">event</span>
                <span className="text-[10px] font-bold text-[#13ec5b] px-2 py-0.5 bg-[#13ec5b]/10 rounded-full">ACTIVE</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Active Events</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">24</h3>
              <p className="text-xs text-[#13ec5b] font-semibold mt-1">↑ 12% from last month</p>
            </div>

            {/* Registrations */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 border-l-4 border-l-blue-400">
              <div className="flex justify-between items-start mb-3">
                <span className="material-symbols-outlined text-blue-500 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg">how_to_reg</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Registrations</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">842 <span className="text-slate-400 text-lg font-normal">/ 1,200</span></h3>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-blue-400 h-full w-[70%]"></div>
              </div>
            </div>

            {/* Budget */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 border-l-4 border-l-amber-400">
              <div className="flex justify-between items-start mb-3">
                <span className="material-symbols-outlined text-amber-500 bg-amber-50 dark:bg-amber-900/30 p-2 rounded-lg">payments</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Remaining Budget</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">$12,450.00</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">45% of Q3 allocation</p>
            </div>

            {/* Engagement */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 border-l-4 border-l-purple-400">
              <div className="flex justify-between items-start mb-3">
                <span className="material-symbols-outlined text-purple-500 bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg">trending_up</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Engagement Rate</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">88.4%</h3>
              <p className="text-xs text-[#13ec5b] font-semibold mt-1">↑ 2.4% vs last event</p>
            </div>
          </div>

          {/* Event List Table */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-white/50 dark:bg-slate-900/50">
              <h4 className="font-bold text-slate-800 dark:text-white">Scheduled Events</h4>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                    activeTab === 'all' 
                      ? 'bg-slate-900 dark:bg-[#13ec5b] text-white dark:text-slate-900 shadow-md' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  All Events
                </button>
                <button 
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                    activeTab === 'upcoming' 
                      ? 'bg-slate-900 dark:bg-[#13ec5b] text-white dark:text-slate-900 shadow-md' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Upcoming
                </button>
                <button 
                  onClick={() => setActiveTab('archive')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                    activeTab === 'archive' 
                      ? 'bg-slate-900 dark:bg-[#13ec5b] text-white dark:text-slate-900 shadow-md' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  Archive
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Event Details</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Registrations</th>
                    <th className="px-6 py-4">Budget Usage</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {displayedEvents.map((event) => {
                    const registrationPercentage = Math.round((event.registrations / event.capacity) * 100);
                    return (
                      <tr key={event.id} className="hover:bg-[#13ec5b]/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={event.image} 
                                alt={event.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">{event.title}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{event.date}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadge(event.status)}`}>
                            {event.status === 'ACTIVE' && <span className="w-1.5 h-1.5 rounded-full bg-[#13ec5b] animate-pulse"></span>}
                            {event.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-32">
                            <div className="flex justify-between mb-1">
                              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{event.registrations} / {event.capacity}</span>
                              <span className="text-[11px] font-bold" style={{ color: getProgressColor(registrationPercentage) }}>{registrationPercentage}%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full transition-all duration-300" 
                                style={{ 
                                  width: `${Math.min(registrationPercentage, 100)}%`,
                                  backgroundColor: getProgressColor(registrationPercentage)
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">${event.budget.toLocaleString()}</span>
                            <span className="material-symbols-outlined text-sm" style={{
                              color: event.budgetStatus === 'Over Budget' ? '#ef4444' : event.budgetStatus === 'Pending Approval' ? '#64748b' : '#13ec5b'
                            }}>
                              {event.budgetStatus === 'Over Budget' ? 'trending_up' : 'trending_flat'}
                            </span>
                          </div>
                          <p className={`text-[10px] font-medium ${
                            event.budgetStatus === 'Over Budget' ? 'text-red-500 font-bold' : 
                            event.budgetStatus === 'Pending Approval' ? 'text-slate-400' : 
                            'text-slate-400'
                          }`}>
                            {event.budgetStatus}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowEditModal(true);
                              }}
                              className="p-2 text-slate-400 hover:text-[#13ec5b] transition-colors" 
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowPromoteModal(true);
                              }}
                              className="p-2 text-slate-400 hover:text-blue-500 transition-colors" 
                              title="Promote"
                            >
                              <span className="material-symbols-outlined text-lg">campaign</span>
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowAnalyticsModal(true);
                              }}
                              className="p-2 text-slate-400 hover:text-purple-500 transition-colors" 
                              title="Analytics"
                            >
                              <span className="material-symbols-outlined text-lg">bar_chart</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between bg-white/50 dark:bg-slate-900/50">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Showing {displayedEvents.length} of {events.length} scheduled events
                {activeTab === 'upcoming' && ' (Upcoming)'}
                {activeTab === 'archive' && ' (Archived)'}
              </p>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#13ec5b] text-slate-900 font-bold text-xs">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Secondary Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Promotion Strategy */}
            <div className="lg:col-span-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-slate-800 dark:text-white">Event Promotion Strategy</h4>
                <button className="text-[#13ec5b] text-xs font-bold hover:underline">View All Tasks</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 hover:border-[#13ec5b] dark:hover:border-[#13ec5b] transition-colors cursor-pointer group">
                  <div className="w-5 h-5 border-2 border-slate-200 dark:border-slate-700 rounded-md group-hover:border-[#13ec5b]"></div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">Send invite to North District medical board</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Pediatric Workshop • Due in 2 days</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-[#13ec5b]">arrow_forward</span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 hover:border-[#13ec5b] dark:hover:border-[#13ec5b] transition-colors cursor-pointer group">
                  <div className="w-5 h-5 border-2 border-slate-200 dark:border-slate-700 rounded-md group-hover:border-[#13ec5b]"></div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">Design digital flyers for Cardio-Conference</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Marketing Assets • Overdue</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-[#13ec5b]">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Staff Contribution */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-slate-800 dark:text-white mb-6">Staff Contribution</h4>
              <div className="space-y-4">
                {staffContributions.map((staff, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-[10px] text-slate-600 dark:text-slate-300">
                      {staff.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-xs font-bold text-slate-800 dark:text-white">{staff.name}</p>
                        <p className="text-[10px] text-[#13ec5b] font-bold">{staff.events} Events</p>
                      </div>
                      <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                        <div 
                          className="bg-[#13ec5b] h-full transition-all duration-300" 
                          style={{ width: `${staff.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Manage Committee
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#136dec]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[#136dec] text-3xl">event</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Create New Event</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Event creation form would open here</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>✨ Feature Preview:</strong> This would open a comprehensive form to create a new hospital event with fields for title, date, location, budget, capacity, and description.
              </p>
            </div>

            <button 
              onClick={() => {
                setShowCreateModal(false);
                setSuccessMessage('Event creation form opened successfully!');
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000);
              }}
              className="w-full bg-[#136dec] hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-all"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-[#13ec5b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[#13ec5b] text-3xl">edit</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Edit Event</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{selectedEvent.title}</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800 dark:text-green-300 mb-2">
                <strong>📝 Editing:</strong>
              </p>
              <ul className="text-sm text-green-700 dark:text-green-400 space-y-1 list-disc list-inside">
                <li>Date: {selectedEvent.date}</li>
                <li>Location: {selectedEvent.location}</li>
                <li>Capacity: {selectedEvent.capacity} attendees</li>
                <li>Budget: ${selectedEvent.budget.toLocaleString()}</li>
              </ul>
            </div>

            <button 
              onClick={() => {
                setShowEditModal(false);
                setSuccessMessage(`${selectedEvent.title} updated successfully!`);
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000);
              }}
              className="w-full bg-[#13ec5b] hover:bg-green-600 text-slate-900 font-medium py-3 rounded-lg transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Promote Modal */}
      {showPromoteModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowPromoteModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-blue-500 text-3xl">campaign</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Promote Event</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{selectedEvent.title}</p>
            </div>

            <div className="space-y-3 mb-6">
              <button className="w-full bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 p-4 rounded-lg text-left transition-all border border-slate-200 dark:border-slate-600 group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-blue-500">mail</span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Email Campaign</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Send to all registered users</p>
                  </div>
                </div>
              </button>

              <button className="w-full bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 p-4 rounded-lg text-left transition-all border border-slate-200 dark:border-slate-600 group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-500">share</span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Social Media</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Share on hospital platforms</p>
                  </div>
                </div>
              </button>

              <button className="w-full bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 p-4 rounded-lg text-left transition-all border border-slate-200 dark:border-slate-600 group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-500">notifications</span>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">Push Notifications</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Notify mobile app users</p>
                  </div>
                </div>
              </button>
            </div>

            <button 
              onClick={() => {
                setShowPromoteModal(false);
                setSuccessMessage(`Promotion campaign started for ${selectedEvent.title}!`);
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000);
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-all"
            >
              Start Campaign
            </button>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalyticsModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowAnalyticsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-purple-500 text-3xl">bar_chart</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Event Analytics</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{selectedEvent.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Total Registrations</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{selectedEvent.registrations}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">of {selectedEvent.capacity} capacity</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">Engagement Rate</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">87.3%</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">↑ 5.2% from avg</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-lg">
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-1">Budget Status</p>
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-300">${selectedEvent.budget}</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">{selectedEvent.budgetStatus}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Satisfaction Score</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-300">4.8/5.0</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">Based on feedback</p>
              </div>
            </div>

            <button 
              onClick={() => setShowAnalyticsModal(false)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg transition-all"
            >
              View Detailed Report
            </button>
          </div>
        </div>
      )}

      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className="fixed bottom-8 right-8 bg-[#13ec5b] text-slate-900 px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <span className="material-symbols-outlined text-2xl">check_circle</span>
          <p className="font-medium">{successMessage}</p>
        </div>
      )}
    </div>
  );
}