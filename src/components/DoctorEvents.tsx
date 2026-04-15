import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { DoctorNotificationCenter } from './DoctorNotificationCenter';
import { useLanguage } from '../hooks/useLanguage';
import { DateUtils } from '../utils/dateUtils';

interface Event {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  month: string;
  day: string;
  time: string;
  location: string;
  locationType: 'physical' | 'virtual';
  imageUrl: string;
  status: 'open' | 'filling' | 'full' | 'past';
  statusLabel: string;
  statusColor: string;
  requiresRegistration: boolean;
}

export function DoctorEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Events');
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Generate dynamic dates
  const featuredEventDate = DateUtils.daysFromNow(29); // 29 days from today
  const featuredEvent: Event = {
    id: 0,
    title: 'Annual Medical Conference 2026',
    category: 'Medical Conference',
    description: 'Join leading healthcare professionals for a comprehensive day of medical advancements, research presentations, and networking opportunities focused on innovative treatment methodologies.',
    date: DateUtils.formatDate(featuredEventDate),
    month: DateUtils.formatMonth(featuredEventDate),
    day: DateUtils.formatDay(featuredEventDate),
    time: '09:00 AM - 04:00 PM',
    location: 'Main Convention Center',
    locationType: 'physical',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    status: 'open',
    statusLabel: 'Featured',
    statusColor: 'blue',
    requiresRegistration: true,
  };

  const event1Date = DateUtils.daysFromNow(8);
  const event2Date = DateUtils.daysFromNow(12);
  const event3Date = DateUtils.daysFromNow(14);
  const event4Date = DateUtils.daysFromNow(19);
  const event5Date = DateUtils.daysFromNow(24);
  const pastEventDate = DateUtils.daysAgo(20);

  const events: Event[] = [
    {
      id: 1,
      title: 'Advanced Cardiac Care Workshop',
      category: 'Medical Training',
      description: 'Learn cutting-edge techniques in cardiovascular treatment and patient management from leading cardiologists.',
      date: DateUtils.formatDate(event1Date),
      month: DateUtils.formatMonth(event1Date),
      day: DateUtils.formatDay(event1Date),
      time: '10:00 AM - 11:30 AM',
      location: 'Medical Conference Hall A',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
      status: 'open',
      statusLabel: 'Open Spots',
      statusColor: 'green',
      requiresRegistration: true,
    },
    {
      id: 2,
      title: 'Telemedicine Best Practices',
      category: 'Webinar',
      description: 'Virtual session exploring digital health platforms, remote patient monitoring, and telehealth regulations.',
      date: DateUtils.formatDate(event2Date),
      month: DateUtils.formatMonth(event2Date),
      day: DateUtils.formatDay(event2Date),
      time: '06:00 PM - 07:30 PM',
      location: 'Zoom Meeting',
      locationType: 'virtual',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop',
      status: 'open',
      statusLabel: 'Online',
      statusColor: 'blue',
      requiresRegistration: true,
    },
    {
      id: 3,
      title: 'Pediatric Emergency Protocols',
      category: 'CME Course',
      description: 'Continuing medical education focused on pediatric emergencies, rapid assessment, and critical interventions.',
      date: DateUtils.formatDate(event3Date),
      month: DateUtils.formatMonth(event3Date),
      day: DateUtils.formatDay(event3Date),
      time: '09:00 AM - 10:00 AM',
      location: 'Training Center, Room 3',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop',
      status: 'filling',
      statusLabel: 'Filling Fast',
      statusColor: 'orange',
      requiresRegistration: true,
    },
    {
      id: 4,
      title: 'Free Health Screening Day',
      category: 'Community Service',
      description: 'Volunteer opportunity for doctors to provide free health screenings and consultations to the community.',
      date: DateUtils.formatDate(event4Date),
      month: DateUtils.formatMonth(event4Date),
      day: DateUtils.formatDay(event4Date),
      time: '08:00 AM - 02:00 PM',
      location: 'Main Lobby',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop',
      status: 'open',
      statusLabel: '',
      statusColor: '',
      requiresRegistration: false,
    },
    {
      id: 5,
      title: 'Surgical Innovation Symposium',
      category: 'Medical Seminar',
      description: 'Explore the latest surgical techniques, robotic-assisted procedures, and minimally invasive approaches.',
      date: DateUtils.formatDate(event5Date),
      month: DateUtils.formatMonth(event5Date),
      day: DateUtils.formatDay(event5Date),
      time: '05:00 PM - 07:00 PM',
      location: 'Grand Auditorium',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&h=400&fit=crop',
      status: 'open',
      statusLabel: 'CME Credits',
      statusColor: 'purple',
      requiresRegistration: true,
    },
    {
      id: 6,
      title: 'Medical Ethics & Law Summit',
      category: 'Professional Development',
      description: 'Comprehensive discussion on medical ethics, legal responsibilities, and best practices in patient care.',
      date: DateUtils.formatDate(pastEventDate),
      month: DateUtils.formatMonth(pastEventDate),
      day: DateUtils.formatDay(pastEventDate),
      time: '10:00 AM - 01:00 PM',
      location: 'Conference Center',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
      status: 'past',
      statusLabel: 'Past Event',
      statusColor: 'slate',
      requiresRegistration: false,
    },
  ];

  const getStatusBadgeClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      green: 'bg-green-100 text-green-700 border-green-200/50',
      blue: 'bg-blue-100 text-blue-700 border-blue-200/50',
      orange: 'bg-orange-100 text-orange-700 border-orange-200/50',
      purple: 'bg-purple-100 text-purple-700 border-purple-200/50',
      slate: 'bg-slate-200 text-slate-600 border-slate-300',
    };
    return colors[color] || 'bg-slate-100 text-slate-600';
  };

  const filteredEvents = events.filter((event) => {
    const haystack = `${event.title} ${event.category} ${event.description} ${event.location}`.toLowerCase();
    const matchesSearch = searchQuery.trim() ? haystack.includes(searchQuery.trim().toLowerCase()) : true;

    const matchesFilter =
      selectedFilter === 'All Events'
        ? true
        : selectedFilter === 'Webinars'
        ? event.locationType === 'virtual' || event.category.toLowerCase().includes('webinar')
        : selectedFilter === 'In-Person'
        ? event.locationType === 'physical'
        : selectedFilter === 'CME Credits'
        ? event.statusLabel.toLowerCase().includes('cme') || event.category.toLowerCase().includes('cme')
        : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 dark:bg-slate-950 relative h-full overflow-hidden">
      {/* Header - Consistent Style */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              event
            </span>
          </div>
          {/* Title & Subtitle */}
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Events Overview</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Medical conferences, workshops and CME opportunities</p>
          </div>
        </div>
        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <NotificationIcon 
            showDot={true}
            onClick={() => setShowNotifications(!showNotifications)}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-6 bg-slate-50/50 dark:bg-slate-950">
        <div className="mx-auto max-w-[1200px]">
          {/* Featured Event */}
          <div className="mb-6">
            <div className="flex flex-col gap-6 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden relative md:flex-row">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#137fec]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div
                className="w-full md:w-1/2 bg-center bg-no-repeat aspect-video bg-cover rounded-xl shadow-inner relative group overflow-hidden"
                style={{ backgroundImage: `url("${featuredEvent.imageUrl}")` }}
              >
                <div className="h-full w-full flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent rounded-xl md:hidden">
                  <span className="bg-[#137fec] text-white text-xs font-bold px-2 py-1 rounded">Featured Event</span>
                </div>
              </div>
              <div className="flex flex-col gap-6 justify-center relative z-10 md:w-1/2">
                <div className="hidden md:flex">
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">Featured Event</span>
                </div>
                <div className="flex flex-col gap-3 text-left">
                  <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em] lg:text-4xl">
                    {featuredEvent.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-slate-500 dark:text-slate-400 text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base text-slate-400 dark:text-slate-500">event</span>
                      {featuredEvent.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base text-slate-400 dark:text-slate-500">schedule</span>
                      {featuredEvent.time}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-base">{featuredEvent.description}</p>
                  <div className="flex gap-4 mt-2">
                    <button className="px-6 py-2.5 bg-[#137fec] hover:bg-blue-600 text-white rounded-lg font-bold shadow-md shadow-blue-500/20 transition-all">
                      Register Now
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedEvent(featuredEvent);
                        setShowEventModal(true);
                      }}
                      className="px-6 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="mb-4">
            <h1 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight mb-2">Upcoming Medical Events & Workshops</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-3xl">Stay updated with the latest medical conferences, CME courses, and professional development opportunities.</p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-2 pl-4 mb-5 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="w-full lg:max-w-sm relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-lg">search</span>
              </div>
              <input
                className="block w-full pl-9 pr-3 py-2 border-none rounded-lg leading-5 bg-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Search events, topics, or keywords..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 no-scrollbar pr-2">
              {['All Events', 'Webinars', 'In-Person', 'CME Credits'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedFilter === filter
                      ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-md'
                      : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-[#137fec] hover:text-[#137fec] dark:hover:border-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  {filter}
                </button>
              ))}
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden lg:block self-center"></div>
              <button className="whitespace-nowrap flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 text-xs font-medium transition-colors">
                <span className="material-symbols-outlined text-base">calendar_month</span> Date
              </button>
              <button className="whitespace-nowrap flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 text-xs font-medium transition-colors">
                <span className="material-symbols-outlined text-base">filter_list</span> Filters
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {filteredEvents.length === 0 ? (
              <div className="col-span-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-sm text-slate-500 dark:text-slate-400">
                No events found for this filter. Try another option or search keyword.
              </div>
            ) : null}
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={`group flex flex-col bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1 transition-all duration-300 ${
                  event.status === 'past' ? 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100' : ''
                }`}
              >
                {/* Event Image */}
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url("${event.imageUrl}")` }}
                  ></div>
                  {/* Date Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg shadow-sm flex flex-col items-center min-w-[56px] ${
                    event.status === 'past' ? 'bg-slate-100 border border-slate-200' : 'bg-white/95 backdrop-blur-sm'
                  }`}>
                    <span className={`text-[10px] font-bold uppercase ${event.status === 'past' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {event.month}
                    </span>
                    <span className={`text-xl font-black leading-none ${event.status === 'past' ? 'text-slate-500' : 'text-slate-900'}`}>
                      {event.day}
                    </span>
                  </div>
                  {/* Status Badge */}
                  {event.statusLabel && (
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${getStatusBadgeClasses(event.statusColor)}`}>
                        {event.statusLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div className="flex flex-col flex-1 p-5">
                  <div className={`mb-1 text-[10px] font-bold uppercase tracking-wider ${
                    event.status === 'past' ? 'text-slate-400' : 'text-[#137fec] dark:text-blue-400'
                  }`}>
                    {event.category}
                  </div>
                  <h3 className={`text-base font-bold mb-2 transition-colors ${
                    event.status === 'past' ? 'text-slate-700 dark:text-slate-500' : 'text-slate-900 dark:text-white group-hover:text-[#137fec] dark:group-hover:text-blue-400'
                  }`}>
                    {event.title}
                  </h3>
                  <p className={`text-sm mb-4 line-clamp-2 leading-relaxed ${
                    event.status === 'past' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {event.description}
                  </p>

                  {/* Time and Location */}
                  <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-slate-50 dark:border-slate-700">
                    <div className={`flex items-center text-xs font-medium ${event.status === 'past' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>
                      <span className={`material-symbols-outlined text-base mr-2 ${event.status === 'past' ? 'text-slate-300 dark:text-slate-600' : 'text-slate-400 dark:text-slate-500'}`}>
                        schedule
                      </span>
                      {event.time}
                    </div>
                    <div className={`flex items-center text-xs font-medium ${event.status === 'past' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>
                      <span className={`material-symbols-outlined text-base mr-2 ${event.status === 'past' ? 'text-slate-300 dark:text-slate-600' : 'text-slate-400 dark:text-slate-500'}`}>
                        {event.locationType === 'virtual' ? 'videocam' : 'location_on'}
                      </span>
                      {event.location}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-5">
                    {event.status === 'past' ? (
                      <>
                        <button className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 text-xs font-bold py-2.5 rounded-lg cursor-not-allowed">
                          Event Ended
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowEventModal(true);
                          }}
                          className="px-3 py-2.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 text-xs font-medium transition-colors"
                        >
                          View Recap
                        </button>
                      </>
                    ) : event.requiresRegistration ? (
                      <>
                        <button className="flex-1 bg-[#137fec] hover:bg-blue-600 text-white text-xs font-bold py-2.5 rounded-lg transition-colors">
                          Register
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowEventModal(true);
                          }}
                          className="px-3 py-2.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors"
                        >
                          Details
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventModal(true);
                        }}
                        className="flex-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold py-2.5 rounded-lg transition-colors"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mb-8">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-300 text-sm font-bold shadow-sm hover:shadow-md hover:border-[#137fec]/50 hover:text-[#137fec] dark:hover:text-blue-400 dark:hover:border-blue-500 transition-all">
              <span>Load More Events</span>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </button>
          </div>
        </div>
      </main>

      {/* Notification Center */}
      <DoctorNotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* Event Detail Modal */}
      {showEventModal && selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setShowEventModal(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-64 w-full">
              <img 
                src={selectedEvent.imageUrl} 
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button
                onClick={() => setShowEventModal(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-lg"
              >
                <span className="material-symbols-outlined text-slate-900 dark:text-white">close</span>
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="bg-[#137fec] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {selectedEvent.category}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {selectedEvent.title}
              </h2>

              {/* Event Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="material-symbols-outlined text-[#137fec]">schedule</span>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Date & Time</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{selectedEvent.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="material-symbols-outlined text-[#137fec]">
                    {selectedEvent.locationType === 'virtual' ? 'videocam' : 'location_on'}
                  </span>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Location</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{selectedEvent.location}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">About This Event</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {selectedEvent.description}
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  This professional medical event brings together healthcare providers, medical professionals, and industry experts to share knowledge, discuss best practices, and explore innovative approaches in modern healthcare delivery. Participants will gain valuable insights into the latest medical techniques, treatment protocols, and evidence-based practices.
                </p>
              </div>

              {/* Event Highlights */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Event Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#137fec] mt-0.5">check_circle</span>
                    <span className="text-slate-600 dark:text-slate-300">Expert speakers and panel discussions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#137fec] mt-0.5">check_circle</span>
                    <span className="text-slate-600 dark:text-slate-300">Hands-on training and interactive sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#137fec] mt-0.5">check_circle</span>
                    <span className="text-slate-600 dark:text-slate-300">Networking opportunities with peers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#137fec] mt-0.5">check_circle</span>
                    <span className="text-slate-600 dark:text-slate-300">CME credits available for participants</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                {selectedEvent.status === 'past' ? (
                  <button className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-xl font-bold cursor-not-allowed">
                    Event Has Ended
                  </button>
                ) : selectedEvent.requiresRegistration ? (
                  <>
                    <button className="flex-1 py-3 bg-[#137fec] hover:bg-blue-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/30">
                      Register for Event
                    </button>
                    <button className="px-6 py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors">
                      Add to Calendar
                    </button>
                  </>
                ) : (
                  <button className="flex-1 py-3 border-2 border-[#137fec] text-[#137fec] hover:bg-[#137fec] hover:text-white rounded-xl font-bold transition-colors">
                    No Registration Required
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}