import React, { useState } from 'react';
import { PatientSectionHeader } from '../PatientSectionHeader';
import { insertPatientFeedback } from '../../lib/supabaseWrites';

interface FeedbackPageProps {
  onNavigate?: (page: string) => void;
}

export function FeedbackPage({ onNavigate }: FeedbackPageProps) {
  const [activeTab, setActiveTab] = useState<'doctor' | 'hospital'>('doctor');
  const [selectedAppointment, setSelectedAppointment] = useState(0);
  const [selectedHospitalVisit, setSelectedHospitalVisit] = useState(0);
  
  // Dr. Julian Vane ratings (Cardiology)
  const [julianOverallRating, setJulianOverallRating] = useState(4);
  const [julianBedsideManner, setJulianBedsideManner] = useState(4.8);
  const [julianWaitTime, setJulianWaitTime] = useState(3.2);
  const [julianExpertise, setJulianExpertise] = useState(4.5);
  const [julianCommunication, setJulianCommunication] = useState(4.7);
  
  // Dr. Sarah Chen ratings (General Practice)
  const [sarahOverallRating, setSarahOverallRating] = useState(5);
  const [sarahAttentiveness, setSarahAttentiveness] = useState(4.9);
  const [sarahDiagnosticSkills, setSarahDiagnosticSkills] = useState(4.6);
  const [sarahFollowUpCare, setSarahFollowUpCare] = useState(4.8);
  const [sarahPatientEducation, setSarahPatientEducation] = useState(5.0);
  
  // Hospital ratings
  const [hospitalOverallRating, setHospitalOverallRating] = useState(4);
  const [facilityCleanliness, setFacilityCleanliness] = useState(5.0);
  const [staffProfessionalism, setStaffProfessionalism] = useState(4.5);
  const [amenities, setAmenities] = useState(4.2);
  const [accessibility, setAccessibility] = useState(4.8);
  
  const [feedbackText, setFeedbackText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recentAppointments = [
    {
      id: 1,
      doctorName: 'Dr. Julian Vane',
      specialty: 'Cardiology',
      date: 'Oct 12, 2023',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      doctorName: 'Dr. Sarah Chen',
      specialty: 'General Practice',
      date: 'Sept 28, 2023',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
    },
  ];

  const hospitalVisits = [
    {
      id: 1,
      hospitalName: 'Metro General Hospital',
      department: 'Emergency Department',
      date: 'Nov 5, 2023',
      type: 'Emergency Visit',
    },
    {
      id: 2,
      hospitalName: 'City Medical Center',
      department: 'Radiology',
      date: 'Oct 20, 2023',
      type: 'Diagnostic Imaging',
    },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let payload: Record<string, unknown>;
      let subjectName: string | null;

      if (activeTab === 'doctor') {
        const appt = recentAppointments[selectedAppointment];
        subjectName = appt.doctorName;
        payload = {
          tab: activeTab,
          appointment: appt,
          overallRating: selectedAppointment === 0 ? julianOverallRating : sarahOverallRating,
          ratings:
            selectedAppointment === 0
              ? {
                  bedsideManner: julianBedsideManner,
                  waitTime: julianWaitTime,
                  expertise: julianExpertise,
                  communication: julianCommunication
                }
              : {
                  attentiveness: sarahAttentiveness,
                  diagnosticSkills: sarahDiagnosticSkills,
                  followUpCare: sarahFollowUpCare,
                  patientEducation: sarahPatientEducation
                },
          feedback: feedbackText,
          anonymous: isAnonymous
        };
      } else {
        const visit = hospitalVisits[selectedHospitalVisit];
        subjectName = visit.hospitalName;
        payload = {
          tab: activeTab,
          visit,
          overallRating: hospitalOverallRating,
          ratings: { facilityCleanliness, staffProfessionalism, amenities, accessibility },
          feedback: feedbackText,
          anonymous: isAnonymous
        };
      }

      const result = await insertPatientFeedback({
        feedback_type: activeTab,
        subject_name: subjectName,
        payload,
        comment: feedbackText,
        is_anonymous: isAnonymous
      });

      setFeedbackText('');

      if (result.skipped) {
        alert(
          'Thank you for your feedback! (Saved locally — add VITE_SUPABASE_URL in .env.local to sync with the cloud.)'
        );
      } else if (!result.ok) {
        alert(
          'Thank you — your feedback was noted, but saving to the server failed. Check Supabase tables and RLS policies (see supabase/schema.sql).'
        );
      } else {
        alert('Thank you for your feedback! Your response has been submitted successfully.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, onRate?: (stars: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate?.(star)}
            className={`${onRate ? 'cursor-pointer hover:scale-110' : ''} transition-transform duration-100`}
          >
            <span
              className="material-symbols-outlined text-4xl transition-colors duration-200"
              style={{
                fontVariationSettings: star <= rating ? '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48' : '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48',
                color: star <= rating ? '#fbbf24' : '#94a3b8',
              }}
            >
              star
            </span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 dark:bg-black">
      {/* Header */}
      <PatientSectionHeader
        icon="rate_review"
        title="Feedback"
        subtitle="Share your experience and help us improve our services"
        onNavigate={onNavigate}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Toggle Selector */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-1.5 flex shadow-sm border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('doctor')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTab === 'doctor'
                  ? 'bg-[#137fec] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#137fec] dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeTab === 'doctor' ? '"FILL" 1' : '"FILL" 0' }}>
                medical_services
              </span>
              Rate a Doctor
            </button>
            <button
              onClick={() => setActiveTab('hospital')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTab === 'hospital'
                  ? 'bg-[#137fec] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#137fec] dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeTab === 'hospital' ? '"FILL" 1' : '"FILL" 0' }}>
                local_hospital
              </span>
              Hospital Services
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Column: Recent Visits/Appointments */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#137fec] text-[18px]">
                      history
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                      {activeTab === 'doctor' ? 'Recent Appointments' : 'Recent Hospital Visits'}
                    </h3>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  {activeTab === 'doctor' ? (
                    <>
                      {recentAppointments.map((appointment, index) => (
                        <div
                          key={appointment.id}
                          onClick={() => setSelectedAppointment(index)}
                          className={`p-3 rounded-xl transition-all duration-200 cursor-pointer border ${
                            selectedAppointment === index
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-[#137fec] shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-200 dark:border-slate-700">
                              <img
                                alt={`${appointment.doctorName} Avatar`}
                                src={appointment.avatar}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">
                                {appointment.doctorName}
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">
                                  medical_information
                                </span>
                                {appointment.specialty}
                              </p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                                <span className="material-symbols-outlined text-[9px]">
                                  calendar_today
                                </span>
                                {appointment.date}
                              </p>
                            </div>
                            {selectedAppointment === index && (
                              <span className="material-symbols-outlined text-[#137fec] text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                                check_circle
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {hospitalVisits.map((visit, index) => (
                        <div
                          key={visit.id}
                          onClick={() => setSelectedHospitalVisit(index)}
                          className={`p-3 rounded-xl transition-all duration-200 cursor-pointer border ${
                            selectedHospitalVisit === index
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-[#137fec] shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                              <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                                local_hospital
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">
                                {visit.hospitalName}
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">
                                  apartment
                                </span>
                                {visit.department}
                              </p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                                <span className="material-symbols-outlined text-[9px]">
                                  calendar_today
                                </span>
                                {visit.date}
                              </p>
                            </div>
                            {selectedHospitalVisit === index && (
                              <span className="material-symbols-outlined text-[#137fec] text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                                check_circle
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  <button className="w-full py-2 text-xs text-[#137fec] font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">
                      visibility
                    </span>
                    View All Past {activeTab === 'doctor' ? 'Appointments' : 'Visits'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Feedback Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                {/* Form Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="material-symbols-outlined text-[#137fec] text-[18px]">
                          assessment
                        </span>
                        <span className="text-[10px] font-bold text-[#137fec] bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-lg">
                          Evaluating Excellence
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {activeTab === 'doctor' ? 'Doctor Evaluation' : 'Hospital Services Review'}
                      </h2>
                    </div>
                    {/* Overall Rating Stars */}
                    <div className="flex flex-col items-start md:items-end gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Overall Rating</span>
                      <div className="flex gap-0.5">{renderStars(activeTab === 'doctor' ? (selectedAppointment === 0 ? julianOverallRating : sarahOverallRating) : hospitalOverallRating, activeTab === 'doctor' ? (selectedAppointment === 0 ? setJulianOverallRating : setSarahOverallRating) : setHospitalOverallRating)}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Category Ratings Grid - DOCTOR */}
                  {activeTab === 'doctor' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Bedside Manner */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#137fec] text-[14px]">
                              favorite
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Bedside Manner</span>
                          </div>
                          <span className="text-[#137fec] font-bold">{selectedAppointment === 0 ? julianBedsideManner.toFixed(1) : sarahAttentiveness.toFixed(1)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#137fec] rounded-full transition-all duration-300"
                            style={{ width: `${(selectedAppointment === 0 ? julianBedsideManner : sarahAttentiveness) / 5 * 100}%` }}
                          ></div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={selectedAppointment === 0 ? julianBedsideManner : sarahAttentiveness}
                          onChange={(e) => (selectedAppointment === 0 ? setJulianBedsideManner(parseFloat(e.target.value)) : setSarahAttentiveness(parseFloat(e.target.value)))}
                          className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-[#137fec]"
                        />
                      </div>

                      {/* Wait Time */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#137fec] text-[14px]">
                              schedule
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Wait Time</span>
                          </div>
                          <span className="text-[#137fec] font-bold">{selectedAppointment === 0 ? julianWaitTime.toFixed(1) : sarahDiagnosticSkills.toFixed(1)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#137fec] rounded-full transition-all duration-300"
                            style={{ width: `${(selectedAppointment === 0 ? julianWaitTime : sarahDiagnosticSkills) / 5 * 100}%` }}
                          ></div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={selectedAppointment === 0 ? julianWaitTime : sarahDiagnosticSkills}
                          onChange={(e) => (selectedAppointment === 0 ? setJulianWaitTime(parseFloat(e.target.value)) : setSarahDiagnosticSkills(parseFloat(e.target.value)))}
                          className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-[#137fec]"
                        />
                      </div>

                      {/* Medical Expertise */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#137fec] text-[14px]">
                              psychology
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Medical Expertise</span>
                          </div>
                          <span className="text-[#137fec] font-bold">{selectedAppointment === 0 ? julianExpertise.toFixed(1) : sarahFollowUpCare.toFixed(1)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#137fec] rounded-full transition-all duration-300"
                            style={{ width: `${(selectedAppointment === 0 ? julianExpertise : sarahFollowUpCare) / 5 * 100}%` }}
                          ></div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={selectedAppointment === 0 ? julianExpertise : sarahFollowUpCare}
                          onChange={(e) => (selectedAppointment === 0 ? setJulianExpertise(parseFloat(e.target.value)) : setSarahFollowUpCare(parseFloat(e.target.value)))}
                          className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-[#137fec]"
                        />
                      </div>

                      {/* Communication */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#137fec] text-[14px]">
                              forum
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Communication</span>
                          </div>
                          <span className="text-[#137fec] font-bold">{selectedAppointment === 0 ? julianCommunication.toFixed(1) : sarahPatientEducation.toFixed(1)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#137fec] rounded-full transition-all duration-300"
                            style={{ width: `${(selectedAppointment === 0 ? julianCommunication : sarahPatientEducation) / 5 * 100}%` }}
                          ></div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={selectedAppointment === 0 ? julianCommunication : sarahPatientEducation}
                          onChange={(e) => (selectedAppointment === 0 ? setJulianCommunication(parseFloat(e.target.value)) : setSarahPatientEducation(parseFloat(e.target.value)))}
                          className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-[#137fec]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Category Ratings Grid - HOSPITAL */}
                  {activeTab === 'hospital' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Facility Cleanliness */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#137fec] text-[14px]">
                              cleaning_services
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Facility Cleanliness</span>
                          </div>
                          <span className="text-[#137fec] font-bold">{facilityCleanliness.toFixed(1)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#137fec] rounded-full transition-all duration-300"
                            style={{ width: `${(facilityCleanliness / 5) * 100}%` }}
                          ></div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={facilityCleanliness}
                          onChange={(e) => setFacilityCleanliness(parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-[#137fec]"
                        />
                      </div>

                      {/* Staff Professionalism */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#137fec] text-[14px]">
                              badge
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Staff Professionalism</span>
                          </div>
                          <span className="text-[#137fec] font-bold">{staffProfessionalism.toFixed(1)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#137fec] rounded-full transition-all duration-300"
                            style={{ width: `${(staffProfessionalism / 5) * 100}%` }}
                          ></div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={staffProfessionalism}
                          onChange={(e) => setStaffProfessionalism(parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-[#137fec]"
                        />
                      </div>

                      {/* Amenities & Comfort */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#137fec] text-[14px]">
                              chair
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Amenities & Comfort</span>
                          </div>
                          <span className="text-[#137fec] font-bold">{amenities.toFixed(1)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#137fec] rounded-full transition-all duration-300"
                            style={{ width: `${(amenities / 5) * 100}%` }}
                          ></div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={amenities}
                          onChange={(e) => setAmenities(parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-[#137fec]"
                        />
                      </div>

                      {/* Accessibility */}
                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[#137fec] text-[14px]">
                              accessible
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">Accessibility</span>
                          </div>
                          <span className="text-[#137fec] font-bold">{accessibility.toFixed(1)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#137fec] rounded-full transition-all duration-300"
                            style={{ width: `${(accessibility / 5) * 100}%` }}
                          ></div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={accessibility}
                          onChange={(e) => setAccessibility(parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-[#137fec]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Detailed Observations */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      <span className="material-symbols-outlined text-[#137fec] text-[16px]">
                        edit_note
                      </span>
                      Detailed Observations
                    </label>
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#137fec] dark:focus:border-[#137fec] focus:outline-none focus:ring-2 focus:ring-blue-500/20 p-3 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all duration-200 text-xs"
                      placeholder={activeTab === 'doctor' ? 'Tell us about your doctor visit. What impressed you? What could be improved?' : 'Share your hospital experience. What stood out? Any suggestions for improvement?'}
                      rows={3}
                    ></textarea>
                  </div>

                  {/* Submit Options */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    {/* Anonymous Toggle */}
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <div
                        className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
                          isAnonymous
                            ? 'bg-[#137fec]'
                            : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200 flex items-center justify-center ${
                            isAnonymous ? 'left-5' : 'left-0.5'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[9px] text-slate-600" style={{ fontVariationSettings: '"FILL" 1' }}>
                            {isAnonymous ? 'visibility_off' : 'visibility'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[14px]">
                          lock
                        </span>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Submit Anonymously
                        </span>
                      </div>
                    </label>

                    {/* Submit Button */}
                    <button
                      type="button"
                      onClick={() => void handleSubmit()}
                      disabled={isSubmitting}
                      className="px-5 py-2 bg-[#137fec] hover:bg-blue-600 text-white font-semibold text-xs rounded-lg shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        send
                      </span>
                      {isSubmitting ? 'Submitting…' : 'Submit Feedback'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Information Banner */}
              <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#137fec] text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    verified_user
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 mb-0.5">Protected by Clinical Integrity Policy</h4>
                  <p className="text-[11px] text-blue-800 dark:text-blue-300/80 leading-relaxed">
                    {activeTab === 'doctor' 
                      ? 'Your honest feedback is confidential and helps us award internal quality commendations to exceptional healthcare providers.'
                      : 'Your candid assessment helps us maintain world-class facility standards and operational excellence.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}