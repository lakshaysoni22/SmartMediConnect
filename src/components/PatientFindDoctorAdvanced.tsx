import React, { useState, useMemo } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  availability: string;
  location: string;
  hospital: string;
  consultationFee: number;
  languages: string[];
  education: string;
  about: string;
  image: string;
  isAvailableToday: boolean;
  nextAvailable: string;
}

export function PatientFindDoctorAdvanced() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee'>('rating');
  const [showBooking, setShowBooking] = useState(false);

  const specialties = [
    'All Specialties',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Orthopedic',
    'Neurologist',
    'General Physician',
    'Gynecologist',
    'Dentist'
  ];

  const [doctors] = useState<Doctor[]>([
    {
      id: 'DR-001',
      name: 'Dr. Sarah Mitchell',
      specialty: 'Cardiologist',
      experience: 15,
      rating: 4.9,
      reviews: 342,
      availability: 'Mon-Fri, 9AM-5PM',
      location: 'New York, NY',
      hospital: 'Manhattan Medical Center',
      consultationFee: 250,
      languages: ['English', 'Spanish'],
      education: 'MD, Harvard Medical School',
      about: 'Specialized in preventive cardiology and heart disease management. Over 15 years of experience treating complex cardiac conditions.',
      image: 'SM',
      isAvailableToday: true,
      nextAvailable: 'Today, 2:00 PM'
    },
    {
      id: 'DR-002',
      name: 'Dr. James Wilson',
      specialty: 'General Physician',
      experience: 12,
      rating: 4.8,
      reviews: 289,
      availability: 'Mon-Sat, 10AM-6PM',
      location: 'Brooklyn, NY',
      hospital: 'Brooklyn Health Clinic',
      consultationFee: 150,
      languages: ['English'],
      education: 'MD, Johns Hopkins University',
      about: 'Experienced general practitioner focusing on family medicine and preventive care.',
      image: 'JW',
      isAvailableToday: true,
      nextAvailable: 'Today, 4:30 PM'
    },
    {
      id: 'DR-003',
      name: 'Dr. Emily Chen',
      specialty: 'Dermatologist',
      experience: 10,
      rating: 4.7,
      reviews: 215,
      availability: 'Tue-Sat, 11AM-7PM',
      location: 'Queens, NY',
      hospital: 'Queens Skin Care Center',
      consultationFee: 200,
      languages: ['English', 'Mandarin'],
      education: 'MD, Stanford University',
      about: 'Expert in cosmetic and medical dermatology with focus on skin cancer prevention and treatment.',
      image: 'EC',
      isAvailableToday: false,
      nextAvailable: 'Tomorrow, 11:00 AM'
    },
    {
      id: 'DR-004',
      name: 'Dr. Michael Brown',
      specialty: 'Orthopedic',
      experience: 18,
      rating: 4.9,
      reviews: 456,
      availability: 'Mon-Fri, 8AM-4PM',
      location: 'Manhattan, NY',
      hospital: 'Sports Medicine Institute',
      consultationFee: 300,
      languages: ['English', 'French'],
      education: 'MD, Yale School of Medicine',
      about: 'Specialized in sports injuries and joint replacement surgery. Team physician for professional athletes.',
      image: 'MB',
      isAvailableToday: true,
      nextAvailable: 'Today, 3:00 PM'
    },
    {
      id: 'DR-005',
      name: 'Dr. Lisa Anderson',
      specialty: 'Pediatrician',
      experience: 14,
      rating: 4.8,
      reviews: 378,
      availability: 'Mon-Fri, 9AM-5PM',
      location: 'Bronx, NY',
      hospital: "Children's Health Center",
      consultationFee: 180,
      languages: ['English', 'Spanish'],
      education: 'MD, Columbia University',
      about: 'Dedicated pediatrician with expertise in child development and preventive pediatric care.',
      image: 'LA',
      isAvailableToday: true,
      nextAvailable: 'Today, 1:00 PM'
    },
    {
      id: 'DR-006',
      name: 'Dr. David Martinez',
      specialty: 'Neurologist',
      experience: 16,
      rating: 4.9,
      reviews: 412,
      availability: 'Mon-Thu, 10AM-6PM',
      location: 'Manhattan, NY',
      hospital: 'Neurology Specialists Group',
      consultationFee: 350,
      languages: ['English', 'Spanish', 'Portuguese'],
      education: 'MD, PhD, Mayo Clinic',
      about: 'Leading neurologist specializing in migraine treatment, epilepsy, and neurodegenerative diseases.',
      image: 'DM',
      isAvailableToday: false,
      nextAvailable: 'Monday, 10:00 AM'
    }
  ]);

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    let filtered = doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'all' || 
                              doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
      return matchesSearch && matchesSpecialty;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'fee':
          return a.consultationFee - b.consultationFee;
        default:
          return 0;
      }
    });

    return filtered;
  }, [doctors, searchQuery, selectedSpecialty, sortBy]);

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  return (
    <div className="h-full bg-slate-50 dark:bg-black flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-4xl">
                person_search
              </span>
              Find a Doctor
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Search and book appointments with top specialists
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {filteredDoctors.length} doctors found
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Specialty Filter */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {specialties.map((spec, idx) => (
              <option key={idx} value={idx === 0 ? 'all' : spec.toLowerCase()}>
                {spec}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rating">Highest Rated</option>
            <option value="experience">Most Experienced</option>
            <option value="fee">Lowest Fee</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Doctor List */}
        <div className={`${selectedDoctor ? 'hidden lg:block lg:w-1/2' : 'flex-1'} overflow-y-auto p-4 md:p-8 space-y-4`}>
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => setSelectedDoctor(doctor)}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border transition-all cursor-pointer ${
                selectedDoctor?.id === doctor.id
                  ? 'border-blue-500 dark:border-blue-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {doctor.image}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{doctor.name}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{doctor.specialty}</p>
                    </div>
                    {doctor.isAvailableToday && (
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                        Available Today
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-yellow-500 text-[20px]">star</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {doctor.rating} ({doctor.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]">work</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {doctor.experience} years
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[20px]">payments</span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        ${doctor.consultationFee}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[20px]">location_on</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {doctor.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                    <span className="material-symbols-outlined text-[16px]">local_hospital</span>
                    <span>{doctor.hospital}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {doctor.languages.map((lang, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookAppointment(doctor);
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
                    >
                      Book Appointment
                    </button>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-8xl mb-4">
                person_off
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No doctors found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Doctor Detail */}
        {selectedDoctor && (
          <div className="flex-1 lg:w-1/2 overflow-y-auto bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
            {/* Back button for mobile */}
            <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to list
              </button>
            </div>

            {/* Doctor Profile */}
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {selectedDoctor.image}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedDoctor.name}</h2>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mt-1">{selectedDoctor.specialty}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="material-symbols-outlined text-yellow-500 text-[20px]">
                        {star <= Math.floor(selectedDoctor.rating) ? 'star' : 'star_border'}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {selectedDoctor.rating} ({selectedDoctor.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-center">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl mb-2">work</span>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{selectedDoctor.experience}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Years Experience</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-center">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl mb-2">payments</span>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">${selectedDoctor.consultationFee}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Consultation Fee</div>
                </div>
              </div>

              {/* About */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">About</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedDoctor.about}</p>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Education</h3>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">school</span>
                  <span className="text-slate-900 dark:text-white font-medium">{selectedDoctor.education}</span>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Location</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">local_hospital</span>
                    <span className="text-slate-900 dark:text-white font-medium">{selectedDoctor.hospital}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">location_on</span>
                    <span className="text-slate-900 dark:text-white font-medium">{selectedDoctor.location}</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">schedule</span>
                    <span className="text-slate-900 dark:text-white font-medium">{selectedDoctor.availability}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400">event_available</span>
                    <div>
                      <div className="text-sm text-green-700 dark:text-green-300 font-semibold">Next Available</div>
                      <div className="text-green-900 dark:text-green-200 font-bold">{selectedDoctor.nextAvailable}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Languages Spoken</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.languages.map((lang, idx) => (
                    <span key={idx} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-medium">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Appointment Button */}
              <button
                onClick={() => handleBookAppointment(selectedDoctor)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
              >
                <span className="material-symbols-outlined">event</span>
                Book Appointment with {selectedDoctor.name.split(' ')[1]}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBooking && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Book Appointment</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Booking with {selectedDoctor.name}
            </p>
            <div className="space-y-4 mb-6">
              <input
                type="date"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select Time Slot</option>
                <option>9:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>2:00 PM</option>
                <option>3:00 PM</option>
                <option>4:00 PM</option>
              </select>
              <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>In-Person Visit</option>
                <option>Video Consultation</option>
              </select>
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
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
