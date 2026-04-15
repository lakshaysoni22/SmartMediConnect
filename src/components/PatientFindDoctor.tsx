import React, { useState } from 'react';
import { PatientSectionHeader } from './PatientSectionHeader';
import { NotificationIcon } from './NotificationIcon';
import { PaymentModal } from './PaymentModal';

interface PatientFindDoctorProps {
  onNavigate?: (page: string) => void;
}

export function PatientFindDoctor({ onNavigate }: PatientFindDoctorProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Cardiology');
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(1);
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow' | 'wed'>('today');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [consultMode, setConsultMode] = useState<'online' | 'offline'>('online');
  const [showFilters, setShowFilters] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentBookingDetails, setCurrentBookingDetails] = useState<{
    doctorName: string;
    date: string;
    time: string;
    fee: number;
  } | null>(null);

  const specialties = [
    { name: 'Cardiology', icon: 'cardiology' },
    { name: 'Dentistry', icon: 'dentistry' },
    { name: 'Neurology', icon: 'neurology' },
    { name: 'Orthopedics', icon: 'orthopedics' },
    { name: 'Pediatrics', icon: 'pediatrics' },
  ];

  // Different doctors for each specialty
  const allDoctors = {
    'Cardiology': [
      {
        id: 1,
        name: 'Dr. Sarah Jenkins',
        specialty: 'Cardiology Specialist',
        experience: '12 Years Experience',
        location: 'Heart Center',
        rating: 4.9,
        reviews: 128,
        verified: true,
        languages: ['English', 'Spanish'],
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
        availableSlots: {
          today: ['09:00 AM', '10:30 AM', '11:15 AM', '02:00 PM'],
          tomorrow: ['09:00 AM', '10:00 AM'],
          wed: []
        },
        todaySlots: 4,
        onlineMode: true,
        fee: 120
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        specialty: 'Interventional Cardiologist',
        experience: '15 Years Experience',
        location: 'Cardiac Institute',
        rating: 4.8,
        reviews: 156,
        verified: true,
        languages: ['English', 'Mandarin'],
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
        availableSlots: {
          today: [],
          tomorrow: ['02:00 PM', '03:30 PM', '04:00 PM'],
          wed: ['10:00 AM', '11:00 AM']
        },
        todaySlots: 0,
        tomorrowSlots: 3,
        onlineMode: false,
        fee: 150
      }
    ],
    'Dentistry': [
      {
        id: 11,
        name: 'Dr. Emily Rodriguez',
        specialty: 'Cosmetic Dentistry',
        experience: '10 Years Experience',
        location: 'Smile Dental Clinic',
        rating: 4.9,
        reviews: 245,
        verified: true,
        languages: ['English', 'Spanish'],
        photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop',
        availableSlots: {
          today: ['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM'],
          tomorrow: ['09:00 AM', '10:30 AM'],
          wed: []
        },
        todaySlots: 4,
        onlineMode: false,
        fee: 100
      },
      {
        id: 12,
        name: 'Dr. James Wilson',
        specialty: 'Orthodontist',
        experience: '8 Years Experience',
        location: 'Perfect Teeth Center',
        rating: 4.7,
        reviews: 189,
        verified: true,
        languages: ['English'],
        photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop',
        availableSlots: {
          today: ['01:00 PM', '03:00 PM'],
          tomorrow: ['09:30 AM', '11:00 AM', '02:00 PM'],
          wed: ['10:00 AM']
        },
        todaySlots: 2,
        onlineMode: true,
        fee: 90
      },
      {
        id: 13,
        name: 'Dr. Priya Sharma',
        specialty: 'Endodontist',
        experience: '12 Years Experience',
        location: 'Advanced Dental Care',
        rating: 5.0,
        reviews: 312,
        verified: true,
        languages: ['English', 'Hindi'],
        photo: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=200&h=200&fit=crop',
        availableSlots: {
          today: [],
          tomorrow: ['10:00 AM', '01:30 PM', '03:00 PM'],
          wed: ['09:00 AM', '11:00 AM', '02:00 PM']
        },
        todaySlots: 0,
        tomorrowSlots: 3,
        onlineMode: false,
        fee: 110
      }
    ],
    'Neurology': [
      {
        id: 21,
        name: 'Dr. Alex Miller',
        specialty: 'Neurology Consultant',
        experience: '8 Years Experience',
        location: 'Neuroscience Institute',
        rating: 4.8,
        reviews: 84,
        verified: true,
        languages: ['English'],
        photo: null,
        initials: 'AM',
        availableSlots: {
          today: [],
          tomorrow: ['04:30 PM', '05:15 PM'],
          wed: ['09:00 AM', '10:30 AM']
        },
        todaySlots: 0,
        tomorrowSlots: 2,
        onlineMode: false,
        fee: 100
      },
      {
        id: 22,
        name: 'Dr. Rachel Thompson',
        specialty: 'Pediatric Neurologist',
        experience: '14 Years Experience',
        location: 'Brain Health Center',
        rating: 4.9,
        reviews: 167,
        verified: true,
        languages: ['English', 'French'],
        photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop',
        availableSlots: {
          today: ['11:00 AM', '01:00 PM'],
          tomorrow: [],
          wed: ['09:30 AM', '10:30 AM', '02:00 PM']
        },
        todaySlots: 2,
        onlineMode: true,
        fee: 130
      }
    ],
    'Orthopedics': [
      {
        id: 31,
        name: 'Dr. Robert Anderson',
        specialty: 'Orthopedic Surgeon',
        experience: '18 Years Experience',
        location: 'Joint & Spine Clinic',
        rating: 4.9,
        reviews: 298,
        verified: true,
        languages: ['English'],
        photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop',
        availableSlots: {
          today: ['08:30 AM', '09:30 AM', '11:00 AM'],
          tomorrow: ['08:00 AM', '10:00 AM'],
          wed: []
        },
        todaySlots: 3,
        onlineMode: false,
        fee: 140
      },
      {
        id: 32,
        name: 'Dr. Lisa Park',
        specialty: 'Sports Medicine Specialist',
        experience: '9 Years Experience',
        location: 'Sports Injury Center',
        rating: 4.7,
        reviews: 143,
        verified: true,
        languages: ['English', 'Korean'],
        photo: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&h=200&fit=crop',
        availableSlots: {
          today: [],
          tomorrow: ['03:00 PM', '04:30 PM'],
          wed: ['10:00 AM', '11:30 AM', '01:00 PM']
        },
        todaySlots: 0,
        tomorrowSlots: 2,
        onlineMode: true,
        fee: 110
      }
    ],
    'Pediatrics': [
      {
        id: 41,
        name: 'Dr. Emily Parker',
        specialty: 'Pediatrician',
        experience: '15 Years Experience',
        location: "Children's Hospital",
        rating: 5.0,
        reviews: 210,
        verified: true,
        languages: ['English', 'French'],
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
        availableSlots: {
          today: [],
          tomorrow: [],
          wed: ['08:00 AM', '08:45 AM', '09:30 AM', '11:00 AM']
        },
        todaySlots: 0,
        onlineMode: false,
        fee: 90
      },
      {
        id: 42,
        name: 'Dr. David Kumar',
        specialty: 'Pediatric Allergist',
        experience: '11 Years Experience',
        location: 'Kids Care Medical',
        rating: 4.8,
        reviews: 176,
        verified: true,
        languages: ['English', 'Hindi', 'Tamil'],
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
        availableSlots: {
          today: ['10:00 AM', '02:00 PM', '03:30 PM'],
          tomorrow: ['09:00 AM', '11:00 AM'],
          wed: []
        },
        todaySlots: 3,
        onlineMode: true,
        fee: 95
      }
    ]
  };

  // Get doctors based on selected specialty
  const doctors = allDoctors[selectedSpecialty as keyof typeof allDoctors] || [];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 dark:bg-black relative h-full overflow-hidden">
      {/* Header */}
      <PatientSectionHeader
        icon="person_search"
        title="Find a Doctor"
        subtitle="Search and book appointments with our network of specialists"
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col gap-6">
          {/* Search Bar and Filters Row */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
              <input
                type="text"
                placeholder="Search doctors by name, specialty, or location..."
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              <span className="hidden sm:inline">Filters</span>
            </button>

            {/* Map View Toggle */}
            <button
              onClick={() => onNavigate?.('map-view')}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">map</span>
              <span className="hidden sm:inline">Map View</span>
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="glass-panel p-5 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 dark:text-white">Advanced Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>All Locations</option>
                    <option>Downtown</option>
                    <option>North District</option>
                    <option>South District</option>
                  </select>
                </div>

                {/* Gender Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Gender</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Any</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Experience</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>All</option>
                    <option>5+ Years</option>
                    <option>10+ Years</option>
                    <option>15+ Years</option>
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Availability</label>
                  <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Any Time</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
              </div>

              {/* Additional Checkboxes */}
              <div className="flex flex-wrap gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Verified Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Online Consultation</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Accepts Insurance</span>
                </label>
              </div>
            </div>
          )}

          {/* Specialty Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {specialties.map((specialty) => (
              <button
                key={specialty.name}
                onClick={() => setSelectedSpecialty(specialty.name)}
                className={`whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedSpecialty === specialty.name
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{specialty.icon}</span>
                {specialty.name}
              </button>
            ))}
            <button className="whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 hover:border-slate-400 transition-all">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              View All Specialties
            </button>
          </div>

          {/* Results Count and Sort */}
          <div className="flex items-center justify-between mt-2">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              14 Doctors Available
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span>Sort by:</span>
              <select className="bg-transparent border-none text-slate-900 dark:text-white font-semibold focus:ring-0 cursor-pointer p-0 pr-6">
                <option>Availability</option>
                <option>Rating</option>
                <option>Experience</option>
              </select>
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 gap-6 pb-10">
            {doctors.map((doctor) => (
              <div 
                key={doctor.id}
                className={`glass-panel p-6 rounded-2xl transition-all hover:shadow-xl hover:shadow-blue-500/5 group ${
                  selectedDoctorId === doctor.id ? 'ring-2 ring-primary/10' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                  {/* Doctor Info Section */}
                  <div className="flex flex-col sm:flex-row gap-5 lg:w-4/12 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700 pb-6 lg:pb-0 lg:pr-6">
                    {/* Doctor Photo */}
                    <div className="relative shrink-0 mx-auto sm:mx-0">
                      {doctor.photo ? (
                        <div 
                          className="w-24 h-24 rounded-2xl bg-cover bg-center shadow-md"
                          style={{ backgroundImage: `url(${doctor.photo})` }}
                        ></div>
                      ) : (
                        <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 shadow-inner">
                          <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{doctor.initials}</span>
                        </div>
                      )}
                      <div className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-800 p-1.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className={`${doctor.onlineMode ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'} p-1 rounded-lg`}>
                          <span className="material-symbols-outlined text-[16px] block">
                            {doctor.onlineMode ? 'videocam' : 'apartment'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Doctor Details */}
                    <div className="flex flex-col gap-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{doctor.name}</h3>
                        {doctor.verified && (
                          <span className="material-symbols-outlined text-blue-500 text-[18px]" title="Verified">verified</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{doctor.specialty}</p>
                      <p className="text-xs text-slate-400 mb-2">{doctor.experience} • {doctor.location}</p>
                      <div className="flex items-center justify-center sm:justify-start gap-1">
                        <span className="material-symbols-outlined text-yellow-400 text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{doctor.rating}</span>
                        <span className="text-xs text-slate-400">({doctor.reviews} Reviews)</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                        {doctor.languages.map((lang) => (
                          <span key={lang} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Section */}
                  <div className="flex-1 flex flex-col gap-4">
                    {/* Available Slots Header */}
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">Available Slots</h4>
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                      </div>
                    </div>

                    {/* Mode Toggle */}
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-1">
                      <button 
                        onClick={() => setConsultMode('offline')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                          consultMode === 'offline' && selectedDoctorId === doctor.id
                            ? 'bg-white dark:bg-slate-700 text-primary shadow-sm font-bold'
                            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">apartment</span>
                        Offline Mode
                      </button>
                      <button 
                        onClick={() => setConsultMode('online')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                          consultMode === 'online' && selectedDoctorId === doctor.id
                            ? 'bg-white dark:bg-slate-700 text-primary shadow-sm font-bold'
                            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">videocam</span>
                        Online Mode
                      </button>
                    </div>

                    {/* Date Selection */}
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => {
                          setSelectedDate('today');
                          setSelectedDoctorId(doctor.id);
                        }}
                        disabled={doctor.availableSlots.today.length === 0}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                          selectedDate === 'today' && selectedDoctorId === doctor.id
                            ? 'border-primary/20 bg-primary/5 active'
                            : doctor.availableSlots.today.length === 0
                            ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 opacity-50 cursor-not-allowed'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 hover:border-primary/50 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span className="text-xs font-medium opacity-80">Today</span>
                        <span className="text-sm font-bold">26 Oct</span>
                        {doctor.todaySlots > 0 ? (
                          <span className="mt-1 text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-1.5 rounded-full">
                            {doctor.todaySlots} slots
                          </span>
                        ) : (
                          <span className="mt-1 text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-1.5 rounded-full">
                            Full
                          </span>
                        )}
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedDate('tomorrow');
                          setSelectedDoctorId(doctor.id);
                        }}
                        disabled={doctor.availableSlots.tomorrow.length === 0}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                          selectedDate === 'tomorrow' && selectedDoctorId === doctor.id
                            ? 'border-primary/20 bg-primary/5 active'
                            : doctor.availableSlots.tomorrow.length === 0
                            ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 opacity-50 cursor-not-allowed'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 hover:border-primary/50 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span className="text-xs font-medium opacity-60">Tomorrow</span>
                        <span className="text-sm font-bold">27 Oct</span>
                        {doctor.tomorrowSlots > 0 && (
                          <span className="mt-1 text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-1.5 rounded-full">
                            {doctor.tomorrowSlots} slots
                          </span>
                        )}
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedDate('wed');
                          setSelectedDoctorId(doctor.id);
                        }}
                        disabled={doctor.availableSlots.wed.length === 0}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                          selectedDate === 'wed' && selectedDoctorId === doctor.id
                            ? 'border-primary/20 bg-primary/5 active'
                            : doctor.availableSlots.wed.length === 0
                            ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 opacity-50 cursor-not-allowed'
                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-white/5 hover:border-primary/50 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span className="text-xs font-medium opacity-60">Wed</span>
                        <span className="text-sm font-bold">28 Oct</span>
                        {doctor.availableSlots.wed.length > 0 && (
                          <span className="mt-1 text-[10px] font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-1.5 rounded-full">
                            Available
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Time Slots */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-2">
                      {selectedDoctorId === doctor.id && doctor.availableSlots[selectedDate].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                            selectedTime === time && selectedDoctorId === doctor.id
                              ? 'border-primary bg-primary text-white shadow-md shadow-primary/20'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                      {selectedDoctorId === doctor.id && doctor.availableSlots[selectedDate].length === 0 && (
                        <button className="px-3 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-400 cursor-not-allowed col-span-2">
                          No slots
                        </button>
                      )}
                    </div>

                    {/* Warning for Limited Slots */}
                    {doctor.id === 2 && selectedDate === 'tomorrow' && selectedDoctorId === doctor.id && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 text-xs">
                        <span className="material-symbols-outlined text-[16px]">info</span>
                        Only 2 slots remaining for tomorrow.
                      </div>
                    )}

                    {/* Confirmation Panel */}
                    {selectedDoctorId === doctor.id && doctor.availableSlots[selectedDate].length > 0 && (
                      <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 animate-fade-in relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              <span className="material-symbols-outlined text-[18px] text-primary">event_available</span>
                              Confirm Appointment
                            </h5>
                            <p className="text-xs text-slate-500 mt-1 pl-6">
                              Oct {selectedDate === 'today' ? '26' : selectedDate === 'tomorrow' ? '27' : '28'}, 2023 at {selectedTime}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2 pl-6">
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1 w-fit">
                                <span className="material-symbols-outlined text-[14px]">
                                  {consultMode === 'online' ? 'videocam' : 'apartment'}
                                </span>
                                {consultMode === 'online' ? 'Online Mode' : 'Offline Mode'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="block text-lg font-bold text-slate-900 dark:text-white">${doctor.fee}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Consultation Fee</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-3 pl-6">
                          <button
                            onClick={() => {
                              setCurrentBookingDetails({
                                doctorName: doctor.name,
                                date: `Oct ${selectedDate === 'today' ? '26' : selectedDate === 'tomorrow' ? '27' : '28'}, 2023`,
                                time: selectedTime,
                                fee: doctor.fee
                              });
                              setShowPaymentModal(true);
                            }}
                            className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                          >
                            Confirm Booking
                          </button>
                          <button 
                            onClick={() => setSelectedDoctorId(null)}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Default Buttons when not selected */}
                    {selectedDoctorId !== doctor.id && (
                      <div className="mt-auto pt-2 flex gap-3">
                        <button 
                          onClick={() => setSelectedDoctorId(doctor.id)}
                          className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg shadow-md shadow-blue-500/20 transition-all"
                        >
                          Book Appointment
                        </button>
                        <button className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          View Profile
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .dark .glass-panel {
          background: rgba(16, 25, 34, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        bookingDetails={currentBookingDetails}
      />
    </div>
  );
}