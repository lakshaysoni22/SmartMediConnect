import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';

interface Event {
  id: number;
  title: string;
  type: 'Workshop' | 'Meeting' | 'Lecture' | 'Training' | 'Social' | 'Past Event';
  location: string;
  locationType: 'physical' | 'virtual' | 'computer';
  date: string;
  month: string;
  day: string;
  time: string;
  duration: string;
  attendees?: number;
  cmeCredits?: number;
  isMandatory?: boolean;
  isPast?: boolean;
  hasRecording?: boolean;
  rsvpDeadline?: string;
  highlighted?: boolean;
}

export function AdminEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const events: Event[] = [
    {
      id: 1,
      title: 'Pediatric Emergency Response Training',
      type: 'Workshop',
      location: 'Simulation Lab, Wing B',
      locationType: 'physical',
      date: 'Oct 24',
      month: 'Oct',
      day: '24',
      time: '02:00 PM',
      duration: '3h',
      attendees: 14,
    },
    {
      id: 2,
      title: 'Quarterly Staff Alignment',
      type: 'Meeting',
      location: 'Virtual (Zoom Link)',
      locationType: 'virtual',
      date: 'Oct 28',
      month: 'Oct',
      day: '28',
      time: '09:00 AM',
      duration: '1.5h',
      isMandatory: true,
      highlighted: true,
    },
    {
      id: 3,
      title: 'Guest Speaker: Neurology Advances',
      type: 'Lecture',
      location: 'Main Auditorium',
      locationType: 'physical',
      date: 'Nov 02',
      month: 'Nov',
      day: '02',
      time: '11:00 AM',
      duration: '1h',
      cmeCredits: 1.0,
    },
    {
      id: 4,
      title: 'New EHR System Onboarding',
      type: 'Training',
      location: 'Computer Lab 3',
      locationType: 'computer',
      date: 'Nov 05',
      month: 'Nov',
      day: '05',
      time: '01:00 PM',
      duration: '2h',
      attendees: 5,
    },
    {
      id: 5,
      title: 'Hospital Charity Gala',
      type: 'Social',
      location: 'Grand Ballroom, City Hotel',
      locationType: 'physical',
      date: 'Nov 10',
      month: 'Nov',
      day: '10',
      time: '07:00 PM',
      duration: 'Black Tie',
      rsvpDeadline: 'RSVP by Nov 1st',
    },
    {
      id: 6,
      title: 'Ethics in Modern Medicine',
      type: 'Past Event',
      location: 'Room 404',
      locationType: 'physical',
      date: 'Oct 10',
      month: 'Oct',
      day: '10',
      time: '10:00 AM',
      duration: 'Ended',
      isPast: true,
      hasRecording: true,
    },
  ];

  const getTypeColor = (type: Event['type']) => {
    const colors = {
      Workshop: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      Meeting: 'bg-green-50 text-green-600 border-green-100',
      Lecture: 'bg-blue-50 text-blue-600 border-blue-100',
      Training: 'bg-purple-50 text-purple-600 border-purple-100',
      Social: 'bg-orange-50 text-orange-600 border-orange-100',
      'Past Event': 'bg-slate-100 text-slate-500 border-slate-200',
    };
    return colors[type];
  };

  const getLocationIcon = (locationType: Event['locationType']) => {
    const icons = {
      physical: 'location_on',
      virtual: 'videocam',
      computer: 'computer',
    };
    return icons[locationType];
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 relative h-full overflow-hidden">
      {/* Top Header - Matching Payment Management Style */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              event
            </span>
          </div>
          {/* Title & Subtitle */}
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Events Management</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage hospital events, meetings, and training sessions</p>
          </div>
        </div>
        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <NotificationIcon 
            showDot={true}
            onClick={() => window.dispatchEvent(new CustomEvent('openNotificationCenter'))}
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Events Overview</h2>
              <p className="text-slate-500 mt-1">
                Stay updated with upcoming conferences, workshops, and hospital meetings.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-sky-200 transition-all active:scale-95 w-fit">
              <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
              Sync to Calendar
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-white/70 backdrop-blur-[12px] border border-white/50 p-4 rounded-2xl shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-white/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder-slate-400"
                  placeholder="Search events..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative w-full sm:w-48">
                <select
                  className="w-full pl-3 pr-8 py-2 bg-white/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-600 appearance-none cursor-pointer"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option>All Types</option>
                  <option>Conferences</option>
                  <option>Workshops</option>
                  <option>Department Meetings</option>
                  <option>Training</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">
                  expand_more
                </span>
              </div>
              <div className="relative w-full sm:w-48">
                <select
                  className="w-full pl-3 pr-8 py-2 bg-white/50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-600 appearance-none cursor-pointer"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option>This Month</option>
                  <option>Next Month</option>
                  <option>Next 3 Months</option>
                  <option>Past Events</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
            <div className="flex gap-2 w-full lg:w-auto justify-end">
              <button
                className={`p-2 border rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'text-sky-500 bg-sky-50 border-sky-100'
                    : 'text-slate-400 hover:text-sky-500 bg-white/50 border-slate-200'
                }`}
                title="List View"
                onClick={() => setViewMode('list')}
              >
                <span className="material-symbols-outlined">view_list</span>
              </button>
              <button
                className={`p-2 border rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'text-sky-500 bg-sky-50 border-sky-100 shadow-sm'
                    : 'text-slate-400 hover:text-sky-500 bg-white/50 border-slate-200'
                }`}
                title="Grid View"
                onClick={() => setViewMode('grid')}
              >
                <span className="material-symbols-outlined">grid_view</span>
              </button>
            </div>
          </div>

          {/* Featured Event */}
          <div>
            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-500">star</span>
              Featured Event
            </h3>
            <div className="bg-white/70 backdrop-blur-[12px] border border-white/50 rounded-2xl overflow-hidden shadow-md flex flex-col md:flex-row relative group">
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 shadow-sm">
                  Upcoming Highlight
                </span>
              </div>
              <div className="md:w-1/3 relative h-64 md:h-auto overflow-hidden">
                <img
                  alt="Conference"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent md:bg-gradient-to-r"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-bold text-lg">Annual Cardiology Summit 2024</p>
                  <p className="text-sm text-slate-200">New York Medical Center</p>
                </div>
              </div>
              <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>{' '}
                    Nov 15-17, 2024
                  </span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> 09:00
                    AM - 05:00 PM
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-sky-500 transition-colors">
                  Advanced Innovations in Heart Surgery
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Join top specialists from around the globe to discuss the latest minimally
                  invasive techniques, robotic surgery advancements, and patient post-op care
                  strategies. Earn up to 20 CME credits.
                </p>
                <div className="flex items-center gap-4">
                  <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md shadow-sky-100 transition-colors">
                    Register Now
                  </button>
                  <button className="text-slate-600 hover:text-sky-500 font-medium px-4 py-2 transition-colors">
                    View Agenda
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-500">event_upcoming</span>
              Upcoming Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`bg-white/70 backdrop-blur-[12px] border border-white/50 rounded-2xl p-5 shadow-sm hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300 flex flex-col h-full ${
                    event.highlighted ? 'border-l-4 border-l-green-500' : ''
                  } ${event.isPast ? 'opacity-70 grayscale hover:grayscale-0 hover:opacity-100' : ''}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(event.type)}`}
                    >
                      {event.type}
                    </div>
                    <button className="text-slate-400 hover:text-red-400 transition-colors">
                      <span className="material-symbols-outlined">favorite</span>
                    </button>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2 leading-tight">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <span className="material-symbols-outlined text-[18px]">
                      {getLocationIcon(event.locationType)}
                    </span>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-6 border-t border-b border-slate-100 py-3">
                    <div className="text-center px-2">
                      <p className="text-xs text-slate-400 uppercase font-bold">{event.month}</p>
                      <p className="text-xl font-bold text-slate-700">{event.day}</p>
                    </div>
                    <div className="h-8 w-px bg-slate-200"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{event.time}</p>
                      <p className="text-xs text-slate-500">
                        {event.isPast ? event.duration : `Duration: ${event.duration}`}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    {event.attendees ? (
                      <div className="flex -space-x-2">
                        <img
                          alt="Avatar"
                          className="w-8 h-8 rounded-full border-2 border-white"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                        />
                        <img
                          alt="Avatar"
                          className="w-8 h-8 rounded-full border-2 border-white"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                        />
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-500">
                          +{event.attendees}
                        </div>
                      </div>
                    ) : event.cmeCredits ? (
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded border border-slate-200">
                          CME
                        </span>
                        <span className="text-xs text-slate-500">{event.cmeCredits} Credit</span>
                      </div>
                    ) : event.isMandatory ? (
                      <span className="text-xs text-slate-400 italic">Mandatory for Dept Heads</span>
                    ) : event.rsvpDeadline ? (
                      <span className="text-xs text-slate-400">{event.rsvpDeadline}</span>
                    ) : event.hasRecording ? (
                      <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded border border-slate-200">
                        Recording Available
                      </span>
                    ) : null}
                    {event.isPast && event.hasRecording ? (
                      <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">play_circle</span>{' '}
                        Watch
                      </button>
                    ) : event.isMandatory ? (
                      <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm shadow-sky-100 transition-all active:scale-95">
                        Join Meeting
                      </button>
                    ) : event.type === 'Social' ? (
                      <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm shadow-sky-100 transition-all active:scale-95">
                        RSVP Now
                      </button>
                    ) : event.cmeCredits || event.attendees || event.type === 'Workshop' ? (
                      <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm shadow-sky-100 transition-all active:scale-95">
                        {event.type === 'Training' ? 'Sign Up' : 'Register Now'}
                      </button>
                    ) : (
                      <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm shadow-sky-100 transition-all active:scale-95">
                        Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-sky-500 transition-colors disabled:opacity-50">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-500 text-white shadow-md shadow-sky-200 font-medium">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-500 transition-colors font-medium">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-500 transition-colors font-medium">
              3
            </button>
            <span className="text-slate-400 px-1">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-sky-500 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}