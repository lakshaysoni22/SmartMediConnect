import React, { useState } from 'react';

interface Event {
  id: string;
  title: string;
  type: 'Conference' | 'Workshop' | 'Webinar' | 'Meeting' | 'Seminar';
  date: string;
  time: string;
  duration: string;
  location: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  description: string;
  status: 'Registered' | 'Available' | 'Full' | 'Past';
  category: string;
  cmeCredits?: number;
  isVirtual: boolean;
}

export function DoctorEventsAdvanced() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'registered' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Advanced Cardiology Techniques 2026',
      type: 'Conference',
      date: 'Feb 15-17, 2026',
      time: '9:00 AM',
      duration: '3 days',
      location: 'New York Convention Center',
      organizer: 'American Heart Association',
      attendees: 450,
      maxAttendees: 500,
      description: 'Join leading cardiologists for cutting-edge insights into cardiovascular care, including AI-driven diagnostics, minimally invasive procedures, and personalized medicine approaches.',
      status: 'Available',
      category: 'Cardiology',
      cmeCredits: 24,
      isVirtual: false
    },
    {
      id: '2',
      title: 'AI in Healthcare: Practical Applications',
      type: 'Webinar',
      date: 'Jan 25, 2026',
      time: '2:00 PM',
      duration: '2 hours',
      location: 'Virtual (Zoom)',
      organizer: 'Healthcare Innovation Summit',
      attendees: 1200,
      maxAttendees: 2000,
      description: 'Explore how artificial intelligence is transforming patient care, from predictive analytics to automated diagnostics. Interactive Q&A session included.',
      status: 'Registered',
      category: 'Technology',
      cmeCredits: 2,
      isVirtual: true
    },
    {
      id: '3',
      title: 'Diabetes Management Workshop',
      type: 'Workshop',
      date: 'Feb 5, 2026',
      time: '10:00 AM',
      duration: '4 hours',
      location: 'Manhattan Medical Center, Room 405',
      organizer: 'Endocrinology Society',
      attendees: 45,
      maxAttendees: 50,
      description: 'Hands-on workshop covering latest treatment protocols, continuous glucose monitoring, and patient education strategies for Type 2 diabetes.',
      status: 'Registered',
      category: 'Endocrinology',
      cmeCredits: 4,
      isVirtual: false
    },
    {
      id: '4',
      title: 'Mental Health in Primary Care',
      type: 'Seminar',
      date: 'Feb 10, 2026',
      time: '1:00 PM',
      duration: '3 hours',
      location: 'Virtual (Teams)',
      organizer: 'Psychiatry Institute',
      attendees: 320,
      maxAttendees: 500,
      description: 'Learn to identify and manage common mental health conditions in primary care settings. Includes case studies and treatment protocols.',
      status: 'Available',
      category: 'Mental Health',
      cmeCredits: 3,
      isVirtual: true
    },
    {
      id: '5',
      title: 'Pediatric Emergency Medicine Update',
      type: 'Conference',
      date: 'Mar 1-2, 2026',
      time: '8:00 AM',
      duration: '2 days',
      location: 'Boston Medical Conference Hall',
      organizer: 'Pediatric Emergency Care',
      attendees: 280,
      maxAttendees: 300,
      description: 'Comprehensive update on pediatric emergency protocols, trauma management, and critical care advances.',
      status: 'Available',
      category: 'Pediatrics',
      cmeCredits: 16,
      isVirtual: false
    },
    {
      id: '6',
      title: 'Hospital Staff Meeting - January',
      type: 'Meeting',
      date: 'Jan 22, 2026',
      time: '5:00 PM',
      duration: '1 hour',
      location: 'Manhattan Medical Center, Auditorium',
      organizer: 'Hospital Administration',
      attendees: 120,
      maxAttendees: 150,
      description: 'Monthly staff meeting to discuss hospital updates, new policies, and departmental news.',
      status: 'Registered',
      category: 'Administration',
      isVirtual: false
    },
    {
      id: '7',
      title: 'Telemedicine Best Practices',
      type: 'Webinar',
      date: 'Jan 12, 2026',
      time: '3:00 PM',
      duration: '90 min',
      location: 'Virtual (Webex)',
      organizer: 'Digital Health Alliance',
      attendees: 850,
      maxAttendees: 850,
      description: 'Completed webinar on virtual care delivery, patient engagement, and regulatory compliance.',
      status: 'Past',
      category: 'Technology',
      cmeCredits: 1.5,
      isVirtual: true
    },
    {
      id: '8',
      title: 'Cancer Screening Guidelines 2026',
      type: 'Seminar',
      date: 'Dec 18, 2025',
      time: '11:00 AM',
      duration: '2 hours',
      location: 'Virtual (Zoom)',
      organizer: 'Oncology Association',
      attendees: 560,
      maxAttendees: 600,
      description: 'Review of updated cancer screening recommendations and early detection strategies.',
      status: 'Past',
      category: 'Oncology',
      cmeCredits: 2,
      isVirtual: true
    }
  ]);

  const filteredEvents = events.filter(event => {
    const matchesTab = (
      (activeTab === 'upcoming' && event.status === 'Available') ||
      (activeTab === 'registered' && event.status === 'Registered') ||
      (activeTab === 'past' && event.status === 'Past')
    );
    const matchesCategory = filterCategory === 'all' || event.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesTab && matchesCategory;
  });

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'Registered':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Available':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Full':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Past':
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800';
    }
  };

  const getTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'Conference': return 'groups';
      case 'Workshop': return 'build';
      case 'Webinar': return 'video_call';
      case 'Meeting': return 'business_center';
      case 'Seminar': return 'school';
    }
  };

  const handleRegister = (event: Event) => {
    alert(`Successfully registered for: ${event.title}`);
  };

  const handleCancel = (event: Event) => {
    if (confirm(`Cancel registration for: ${event.title}?`)) {
      alert('Registration cancelled successfully');
    }
  };

  return (
    <div className="h-full bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-4xl">
                event
              </span>
              Medical Events & CME
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Conferences, workshops, and continuing education
            </p>
          </div>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">add</span>
            Create Event
          </button>
        </div>

        {/* Tabs & Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 flex-1">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Upcoming ({events.filter(e => e.status === 'Available').length})
            </button>
            <button
              onClick={() => setActiveTab('registered')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'registered'
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Registered ({events.filter(e => e.status === 'Registered').length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'past'
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Past ({events.filter(e => e.status === 'Past').length})
            </button>
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Categories</option>
            <option value="cardiology">Cardiology</option>
            <option value="technology">Technology</option>
            <option value="endocrinology">Endocrinology</option>
            <option value="mental health">Mental Health</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="oncology">Oncology</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Events List */}
        <div className={`${selectedEvent ? 'hidden lg:block lg:w-1/2' : 'flex-1'} overflow-y-auto p-4 md:p-8 space-y-4`}>
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border transition-all cursor-pointer ${
                selectedEvent?.id === event.id
                  ? 'border-purple-500 dark:border-purple-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0`}>
                  <span className="material-symbols-outlined text-white text-2xl">{getTypeIcon(event.type)}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{event.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{event.type}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">•</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{event.category}</span>
                        {event.cmeCredits && (
                          <>
                            <span className="text-sm text-slate-500 dark:text-slate-400">•</span>
                            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                              {event.cmeCredits} CME Credits
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{event.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">
                        {event.isVirtual ? 'desktop_windows' : 'location_on'}
                      </span>
                      <span className="truncate">{event.isVirtual ? 'Virtual' : event.location.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">groups</span>
                      <span>{event.attendees}/{event.maxAttendees}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>Attendance</span>
                      <span>{Math.round((event.attendees / event.maxAttendees) * 100)}% Full</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full"
                        style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {event.status === 'Available' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRegister(event);
                        }}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all text-sm"
                      >
                        Register Now
                      </button>
                    )}
                    {event.status === 'Registered' && (
                      <>
                        {event.isVirtual && (
                          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all text-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">video_call</span>
                            Join Event
                          </button>
                        )}
                        <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all text-sm">
                          Add to Calendar
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancel(event);
                          }}
                          className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {event.status === 'Past' && event.cmeCredits && (
                      <button className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-all text-sm">
                        Download Certificate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-8xl mb-4">
                event_busy
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No events found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Event Detail */}
        {selectedEvent && (
          <div className="flex-1 lg:w-1/2 overflow-y-auto bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
            <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to list
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-white text-4xl">{getTypeIcon(selectedEvent.type)}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedEvent.title}</h2>
                <p className="text-lg text-purple-600 dark:text-purple-400 font-medium mt-1">{selectedEvent.type}</p>
                <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-full border mt-3 ${getStatusColor(selectedEvent.status)}`}>
                  {selectedEvent.status}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Event Details</h3>
                
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">calendar_today</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Date</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedEvent.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">schedule</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Time & Duration</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedEvent.time} • {selectedEvent.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">
                    {selectedEvent.isVirtual ? 'desktop_windows' : 'location_on'}
                  </span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Location</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedEvent.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">business</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Organizer</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedEvent.organizer}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">groups</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Attendees</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedEvent.attendees} / {selectedEvent.maxAttendees}</div>
                  </div>
                </div>

                {selectedEvent.cmeCredits && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400">school</span>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">CME Credits</div>
                      <div className="font-semibold text-green-600 dark:text-green-400">{selectedEvent.cmeCredits} Credits</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Description</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="space-y-3">
                {selectedEvent.status === 'Available' && (
                  <button
                    onClick={() => handleRegister(selectedEvent)}
                    className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all"
                  >
                    Register for Event
                  </button>
                )}
                {selectedEvent.status === 'Registered' && (
                  <>
                    {selectedEvent.isVirtual && (
                      <button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">video_call</span>
                        Join Virtual Event
                      </button>
                    )}
                    <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all">
                      Add to Calendar
                    </button>
                    <button
                      onClick={() => handleCancel(selectedEvent)}
                      className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all"
                    >
                      Cancel Registration
                    </button>
                  </>
                )}
                {selectedEvent.status === 'Past' && selectedEvent.cmeCredits && (
                  <button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">download</span>
                    Download CME Certificate
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}