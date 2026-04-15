import React, { useState } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { PatientSectionHeader } from './PatientSectionHeader';
import { toast } from 'sonner@2.0.3';

interface Event {
  id: number;
  title: string;
  category: string;
  description: string;
  date: string;
  time: string;
  location: string;
  locationType: 'physical' | 'virtual';
  imageUrl: string;
  categoryBadge: string;
}

export function PatientEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Events');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(6);

  const featuredEvent = {
    title: 'Annual Hospital Wellness Fair',
    description: 'Join us for our biggest health event of the year featuring expert speakers, free health screenings, and interactive wellness workshops for the whole family.',
    date: 'October 25, 2024',
    location: 'Main Hospital Atrium',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop',
  };

  const events: Event[] = [
    {
      id: 1,
      title: 'Yoga for Seniors',
      category: 'Wellness',
      categoryBadge: 'Wellness',
      description: 'Gentle mobility and breathing exercises designed specifically for active seniors. All levels welcome.',
      date: 'Sep 12',
      time: 'Tue, Sep 12 • 10:00 AM',
      location: 'Hospital Gym, Level 2',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    },
    {
      id: 2,
      title: 'Diabetes Management',
      category: 'Workshop',
      categoryBadge: 'Workshop',
      description: 'Comprehensive guide to nutritional choices and blood sugar monitoring for newly diagnosed patients.',
      date: 'Sep 14',
      time: 'Thu, Sep 14 • 2:00 PM',
      location: 'Online Webinar (Zoom)',
      locationType: 'virtual',
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop',
    },
    {
      id: 3,
      title: 'Heart Health Awareness',
      category: 'Webinar',
      categoryBadge: 'Webinar',
      description: 'Listen to our lead cardiologist discuss preventative measures and lifestyle habits for a stronger heart.',
      date: 'Sep 15',
      time: 'Fri, Sep 15 • 5:00 PM',
      location: 'Online Webinar (Live)',
      locationType: 'virtual',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop',
    },
    {
      id: 4,
      title: 'Cancer Survivors Circle',
      category: 'Support',
      categoryBadge: 'Support',
      description: 'A safe space for sharing experiences, hope, and resources for patients in recovery.',
      date: 'Sep 18',
      time: 'Mon, Sep 18 • 6:30 PM',
      location: 'Community Room A',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop',
    },
    {
      id: 5,
      title: 'Plant-Based Cooking',
      category: 'Nutrition',
      categoryBadge: 'Nutrition',
      description: 'Discover delicious and easy plant-based recipes to boost your immune system and overall energy.',
      date: 'Sep 20',
      time: 'Wed, Sep 20 • 11:00 AM',
      location: 'Hospital Cafeteria Kitchen',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    },
    {
      id: 6,
      title: 'Post-Surgery Recovery',
      category: 'Wellness',
      categoryBadge: 'Wellness',
      description: 'Tips and movements to safely regain strength and mobility after orthopedic procedures.',
      date: 'Sep 23',
      time: 'Sat, Sep 23 • 9:00 AM',
      location: 'Physiotherapy Wing',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=600&h=400&fit=crop',
    },
    {
      id: 7,
      title: 'Stress Management Workshop',
      category: 'Workshop',
      categoryBadge: 'Workshop',
      description: 'Learn proven techniques to reduce stress and improve mental clarity through mindfulness practices.',
      date: 'Sep 25',
      time: 'Mon, Sep 25 • 3:00 PM',
      location: 'Meditation Room',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
    },
    {
      id: 8,
      title: 'Pediatric Health Webinar',
      category: 'Webinar',
      categoryBadge: 'Webinar',
      description: 'Essential tips for parents on childhood nutrition, vaccinations, and developmental milestones.',
      date: 'Sep 27',
      time: 'Wed, Sep 27 • 6:00 PM',
      location: 'Online Webinar (Teams)',
      locationType: 'virtual',
      imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
    },
    {
      id: 9,
      title: 'Arthritis Support Group',
      category: 'Support',
      categoryBadge: 'Support',
      description: 'Connect with others managing arthritis and learn about pain management strategies.',
      date: 'Sep 29',
      time: 'Fri, Sep 29 • 4:00 PM',
      location: 'Community Room B',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
    },
    {
      id: 10,
      title: 'Healthy Meal Prep Class',
      category: 'Nutrition',
      categoryBadge: 'Nutrition',
      description: 'Master the art of preparing nutritious meals in advance for busy weekdays.',
      date: 'Oct 2',
      time: 'Mon, Oct 2 • 10:00 AM',
      location: 'Hospital Cafeteria Kitchen',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop',
    },
    {
      id: 11,
      title: 'Sleep Health Seminar',
      category: 'Wellness',
      categoryBadge: 'Wellness',
      description: 'Discover how quality sleep impacts your overall health and learn techniques for better rest.',
      date: 'Oct 4',
      time: 'Wed, Oct 4 • 7:00 PM',
      location: 'Main Auditorium',
      locationType: 'physical',
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=400&fit=crop',
    },
    {
      id: 12,
      title: 'Women\'s Health Forum',
      category: 'Webinar',
      categoryBadge: 'Webinar',
      description: 'Comprehensive discussion on women\'s health issues including reproductive health and menopause.',
      date: 'Oct 6',
      time: 'Fri, Oct 6 • 5:30 PM',
      location: 'Online Webinar (Zoom)',
      locationType: 'virtual',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
    },
  ];

  const filters = ['All Events', 'Wellness', 'Workshops', 'Webinars', 'Senior Care', 'Nutrition'];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All Events' || event.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const loadMoreEvents = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleEvents(visibleEvents + 6);
      setIsLoadingMore(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 dark:bg-black relative h-full overflow-hidden">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <button 
          className="p-2 text-slate-600 dark:text-slate-300" 
          onClick={() => window.dispatchEvent(new CustomEvent('toggleSidebar'))}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Section Header */}
      <PatientSectionHeader
        icon="event"
        title="Events Hub"
        subtitle="Discover wellness events, workshops & community activities"
        onNotificationClick={() => window.dispatchEvent(new CustomEvent('openNotificationCenter'))}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Featured Section */}
          <section className="relative group mt-6">
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url("${featuredEvent.imageUrl}")` }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-16 max-w-2xl text-white">
                <span className="bg-[#137fec] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                  Featured Event
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight">
                  {featuredEvent.title}
                </h2>
                <p className="text-slate-200 text-lg mb-8 line-clamp-2">
                  {featuredEvent.description}
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#137fec]">calendar_today</span>
                    <span className="text-sm font-medium">{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#137fec]">location_on</span>
                    <span className="text-sm font-medium">{featuredEvent.location}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowFeaturedModal(true)}
                    className="btn-press bg-[#137fec] hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-base transition-all transform active:scale-95 shadow-lg shadow-blue-500/20"
                  >
                    Register Now
                  </button>
                  <button 
                    onClick={() => setShowFeaturedModal(true)}
                    className="btn-press glass text-white px-8 py-3 rounded-xl font-bold text-base transition-all hover:bg-white/20 border border-white/30"
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Search Bar */}
          <div className="relative w-full max-w-xl">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#137fec]/50 focus:outline-none transition-all"
              placeholder="Search events, webinars, or workshops..."
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`btn-press whitespace-nowrap px-6 py-2 rounded-full shadow-md text-sm font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-[#137fec] text-white'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#137fec] text-slate-600 dark:text-slate-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Event Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Upcoming Activities
              </h3>
              <div className="flex items-center gap-2 text-[#137fec] font-semibold text-sm cursor-pointer hover:underline">
                View Calendar
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.slice(0, visibleEvents).map((event) => (
                <div
                  key={event.id}
                  className="group glass-card bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:shadow-[#137fec]/5 transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 glass px-3 py-1 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-slate-800/80">
                      {event.categoryBadge}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-[#137fec] dark:group-hover:text-[#137fec] transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-lg text-[#137fec]">schedule</span>
                        <span className="text-xs">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined text-lg text-[#137fec]">
                          {event.locationType === 'virtual' ? 'videocam' : 'location_on'}
                        </span>
                        <span className="text-xs">{event.location}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowEventModal(true);
                      }}
                      className="btn-press w-full py-2.5 rounded-xl border-2 border-[#137fec] text-[#137fec] font-bold hover:bg-[#137fec] hover:text-white transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">event_busy</span>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                  No events found
                </p>
              </div>
            )}

            <div className="mt-12 flex justify-center">
              {visibleEvents < filteredEvents.length && (
                <button 
                  className="btn-press bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-10 py-3 rounded-xl font-bold transition-transform active:scale-95 hover:shadow-lg"
                  onClick={loadMoreEvents}
                >
                  {isLoadingMore ? 'Loading...' : 'Load More Events'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Event Detail Modal (for 6 cards) */}
      {showEventModal && selectedEvent && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowEventModal(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
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
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined text-slate-900 dark:text-white">close</span>
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="bg-[#137fec] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {selectedEvent.categoryBadge}
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
                  This event is perfect for anyone looking to improve their health and wellness. Our expert facilitators will guide you through practical techniques and provide personalized recommendations. Space is limited, so register early to secure your spot!
                </p>
              </div>

              {/* What to Expect */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">What to Expect</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#137fec] text-xl mt-0.5">check_circle</span>
                    <span className="text-slate-600 dark:text-slate-300">Interactive session with Q&A opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#137fec] text-xl mt-0.5">check_circle</span>
                    <span className="text-slate-600 dark:text-slate-300">Take-home resources and materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#137fec] text-xl mt-0.5">check_circle</span>
                    <span className="text-slate-600 dark:text-slate-300">Connect with healthcare professionals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#137fec] text-xl mt-0.5">check_circle</span>
                    <span className="text-slate-600 dark:text-slate-300">Complimentary refreshments provided</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 btn-press bg-[#137fec] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">
                  Register Now
                </button>
                <button className="btn-press px-6 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Event Modal */}
      {showFeaturedModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={() => setShowFeaturedModal(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image - SMALLER */}
            <div className="relative h-52 w-full flex-shrink-0 bg-slate-900">
              <img 
                src={featuredEvent.imageUrl} 
                alt={featuredEvent.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              <button
                onClick={() => setShowFeaturedModal(false)}
                className="absolute top-3 right-3 w-9 h-9 bg-white/95 dark:bg-slate-800/95 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 transition-colors shadow-lg z-10"
              >
                <span className="material-symbols-outlined text-slate-900 dark:text-white text-lg">close</span>
              </button>
              <div className="absolute bottom-3 left-5 z-10">
                <span className="bg-[#137fec] text-white px-2.5 py-1 rounded-full text-xs font-bold uppercase mb-1.5 inline-block">
                  Featured Event
                </span>
                <h2 className="text-xl lg:text-2xl font-bold text-white leading-tight">
                  {featuredEvent.title}
                </h2>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              {/* Event Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="material-symbols-outlined text-[#137fec] text-2xl">calendar_today</span>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Event Date</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{featuredEvent.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="material-symbols-outlined text-[#137fec] text-2xl">location_on</span>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Location</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{featuredEvent.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="material-symbols-outlined text-[#137fec] text-2xl">schedule</span>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Duration</p>
                    <p className="font-semibold text-slate-900 dark:text-white">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="material-symbols-outlined text-[#137fec] text-2xl">confirmation_number</span>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Registration</p>
                    <p className="font-semibold text-slate-900 dark:text-white">Free Entry</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Event Overview</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {featuredEvent.description}
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our annual Wellness Fair brings together leading healthcare professionals, nutritionists, fitness experts, and mental health specialists under one roof. Experience live demonstrations, participate in free health screenings, and discover the latest innovations in preventive healthcare.
                </p>
              </div>

              {/* Event Highlights */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Event Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="material-symbols-outlined text-[#137fec] text-2xl">health_and_safety</span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Free Health Screenings</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Blood pressure, glucose, cholesterol & BMI checks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="material-symbols-outlined text-[#137fec] text-2xl">school</span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Expert Workshops</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Nutrition, fitness, mental wellness & more</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="material-symbols-outlined text-[#137fec] text-2xl">family_restroom</span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Family Activities</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Interactive games and activities for all ages</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="material-symbols-outlined text-[#137fec] text-2xl">local_dining</span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Healthy Food Demos</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Live cooking demonstrations & tastings</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Preview */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Schedule Preview</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 border-l-4 border-[#137fec] bg-slate-50 dark:bg-slate-800 rounded-r-xl">
                    <span className="font-bold text-[#137fec] min-w-[80px]">9:00 AM</span>
                    <span className="text-slate-900 dark:text-white font-medium">Opening Ceremony & Welcome</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 border-l-4 border-[#137fec] bg-slate-50 dark:bg-slate-800 rounded-r-xl">
                    <span className="font-bold text-[#137fec] min-w-[80px]">10:00 AM</span>
                    <span className="text-slate-900 dark:text-white font-medium">Free Health Screenings Begin</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 border-l-4 border-[#137fec] bg-slate-50 dark:bg-slate-800 rounded-r-xl">
                    <span className="font-bold text-[#137fec] min-w-[80px]">12:00 PM</span>
                    <span className="text-slate-900 dark:text-white font-medium">Keynote: The Future of Preventive Care</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 border-l-4 border-[#137fec] bg-slate-50 dark:bg-slate-800 rounded-r-xl">
                    <span className="font-bold text-[#137fec] min-w-[80px]">2:00 PM</span>
                    <span className="text-slate-900 dark:text-white font-medium">Wellness Workshops & Demonstrations</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 btn-press bg-[#137fec] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
                  Register for Free
                </button>
                <button className="btn-press px-8 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Download Brochure
                </button>
                <button className="btn-press px-8 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Share Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}