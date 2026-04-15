import React, { useState } from 'react';
import { PublicNavigation } from './PublicNavigation';
import { Footer } from './Footer';
import { HelpButton } from './HelpButton';

interface SymptomCheckerPageProps {
  onBack?: () => void;
  onHealthInfo?: () => void;
  onViewPlans?: () => void;
  onGetStarted?: () => void;
  onAboutUs?: () => void;
  onSecurity?: () => void;
  onUpcoming?: () => void;
}

type TabType = 'info' | 'symptoms' | 'conditions' | 'details' | 'treatment';

export function SymptomCheckerPage({ onBack, onHealthInfo, onViewPlans, onGetStarted, onAboutUs, onSecurity, onUpcoming }: SymptomCheckerPageProps) {
  const [currentTab, setCurrentTab] = useState<TabType>('info');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const increaseAge = () => setAge(prev => Math.min(prev + 1, 120));
  const decreaseAge = () => setAge(prev => Math.max(prev - 1, 0));

  const commonSymptoms = ['Headache', 'Nausea', 'Fatigue', 'Fever', 'Cough'];

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const tabs = [
    { id: 'info' as const, label: 'Info', number: 1 },
    { id: 'symptoms' as const, label: 'Symptoms', number: 2 },
    { id: 'conditions' as const, label: 'Conditions', number: 3 },
    { id: 'details' as const, label: 'Details', number: 4, hideOnMobile: true },
    { id: 'treatment' as const, label: 'Treatment', number: 5, hideOnMobile: true },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased selection:bg-primary/30 selection:text-primary-dark transition-colors duration-300 page-transition overflow-x-hidden">
      {/* 🎨 Floating Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 dark:opacity-50 blob-float"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 dark:opacity-50 blob-float-delay-2"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-500/20 dark:bg-pink-500/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-70 dark:opacity-50 blob-float-delay-4"></div>
      </div>

      {/* Navigation */}
      <PublicNavigation
        currentPage="symptom-checker"
        onHome={onBack}
        onSymptomChecker={onBack}
        onHealthInfo={onHealthInfo}
        onViewPlans={onViewPlans}
        onGetStarted={onGetStarted}
        onAboutUs={onAboutUs}
        onSecurity={onSecurity}
        onUpcoming={onUpcoming}
      />

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-20 px-4 relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold uppercase tracking-wider mb-5 border border-blue-200 dark:border-blue-800">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            AI-Assisted Triage Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Symptom Checker</h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Tell us about yourself and your symptoms. Our advanced clinical algorithm will help you identify potential conditions and guide you to the appropriate level of care.
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-5xl bg-white dark:bg-gray-900 backdrop-blur-xl border border-slate-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl min-h-[600px] flex flex-col mb-16">
          {/* Tab Navigation */}
          <div className="bg-slate-50 dark:bg-black/50 border-b border-slate-200 dark:border-gray-800">
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar py-4 px-4 sm:px-8 gap-2 sm:justify-center">
              {tabs.map((tab, index) => (
                <div key={tab.id} className="contents">
                  <button
                    onClick={() => setCurrentTab(tab.id)}
                    className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full border whitespace-nowrap transition-all ${
                      currentTab === tab.id
                        ? 'text-slate-900 dark:text-white bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 font-semibold shadow-sm'
                        : 'text-slate-400 dark:text-slate-500 border-transparent hover:text-slate-600 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    } ${tab.hideOnMobile ? 'hidden sm:flex' : 'flex'}`}
                  >
                    <div className={`w-6 h-6 rounded-full ${currentTab === tab.id ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'border-2 border-current'} flex items-center justify-center text-xs font-bold`}>
                      {tab.number}
                    </div>
                    {tab.label}
                  </button>
                  {index < tabs.length - 1 && (
                    <div className={`w-8 h-px bg-slate-300 dark:bg-slate-700 my-auto shrink-0 ${tabs[index + 1].hideOnMobile ? 'hidden sm:block' : ''}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-12 flex-grow flex flex-col">
            {/* Medical Disclaimer */}
            <div className="mb-8 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg flex gap-3 items-start">
              <span className="material-symbols-outlined text-amber-500 text-xl mt-0.5">warning</span>
              <div>
                <p className="text-sm text-amber-900 dark:text-amber-200 font-semibold">Medical Disclaimer</p>
                <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">This tool does not provide medical advice. If you have a medical emergency, call 911 immediately.</p>
              </div>
            </div>

            {/* Tab Content */}
            {/* Step 1: Info */}
            {currentTab === 'info' && (
              <div className="w-full h-full flex flex-col step-enter">
                <div className="max-w-2xl mx-auto w-full">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center scroll-reveal">Let's start with the basics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
                    {/* Age Input */}
                    <div className="relative group scroll-reveal-delay-1">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 text-center">Patient Age</label>
                      <div className="relative flex items-center justify-center">
                        <button
                          onClick={decreaseAge}
                          aria-label="Decrease age"
                          className="btn-press absolute left-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined">remove</span>
                        </button>
                        <input
                          className="input-focus-glow block w-24 text-center text-3xl font-bold border-0 border-b-2 border-slate-200 dark:border-slate-700 bg-transparent focus:ring-0 text-slate-900 dark:text-white transition-all duration-300 py-2"
                          type="number"
                          value={age}
                          onChange={(e) => setAge(Math.max(0, Math.min(120, parseInt(e.target.value) || 0)))}
                        />
                        <span className="text-slate-400 font-medium ml-2">yrs</span>
                        <button
                          onClick={increaseAge}
                          aria-label="Increase age"
                          className="btn-press absolute right-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200 flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                      <p className="text-center text-xs text-slate-400 mt-2">Enter age in years</p>
                    </div>

                    {/* Gender Selection */}
                    <div className="flex flex-col items-center scroll-reveal-delay-2">
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 text-center">Biological Sex</label>
                      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-full max-w-[240px]">
                        <button
                          onClick={() => setGender('male')}
                          className={`btn-press flex-1 flex flex-col items-center gap-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                            gender === 'male'
                              ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-white ring-1 ring-black/5 dark:ring-white/10'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                          }`}
                          type="button"
                        >
                          <span className="material-symbols-outlined">male</span>
                          <span>Male</span>
                        </button>
                        <button
                          onClick={() => setGender('female')}
                          className={`btn-press flex-1 flex flex-col items-center gap-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                            gender === 'female'
                              ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600 dark:text-white ring-1 ring-black/5 dark:ring-white/10'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                          }`}
                          type="button"
                        >
                          <span className="material-symbols-outlined">female</span>
                          <span>Female</span>
                        </button>
                      </div>
                      <p className="text-center text-xs text-slate-400 mt-2">Required for clinical accuracy</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 mt-8">
                    <button
                      onClick={() => setCurrentTab('symptoms')}
                      className="group w-full max-w-sm bg-gradient-to-r from-[#137fec] to-blue-500 hover:from-blue-500 hover:to-[#137fec] text-white text-lg font-semibold py-4 px-8 rounded-xl shadow-lg shadow-[#137fec]/30 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <span>Continue to Symptoms</span>
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                    <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 underline decoration-slate-300 dark:decoration-slate-600 underline-offset-4 transition-colors">
                      Use Body Map instead
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Symptoms */}
            {currentTab === 'symptoms' && (
              <div className="w-full h-full flex flex-col">
                <div className="max-w-3xl mx-auto w-full animate-slideUp">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">What are your symptoms?</h2>
                  
                  {/* Search */}
                  <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-slate-400">search</span>
                    </div>
                    <input
                      className="block w-full pl-10 pr-3 py-4 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-lg shadow-sm"
                      placeholder="Search symptoms (e.g., headache, fever)..."
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Common Symptoms */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Common Symptoms</h3>
                    <div className="flex flex-wrap gap-3">
                      {commonSymptoms.map((symptom) => (
                        <button
                          key={symptom}
                          onClick={() => toggleSymptom(symptom)}
                          className={`px-4 py-2 rounded-full transition-all text-sm font-medium ${
                            selectedSymptoms.includes(symptom)
                              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                              : 'bg-slate-100 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 text-slate-700 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-300 border border-transparent hover:border-primary-200 dark:hover:border-primary-800'
                          }`}
                        >
                          {symptom}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Symptoms */}
                  <div className="bg-blue-50 dark:bg-slate-800/50 rounded-xl p-6 border border-blue-100 dark:border-slate-700 mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">Selected Symptoms</h3>
                      <span className="text-xs text-slate-500 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                        {selectedSymptoms.length} selected
                      </span>
                    </div>
                    {selectedSymptoms.length === 0 ? (
                      <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm italic">
                        No symptoms selected yet. Start searching above.
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {selectedSymptoms.map((symptom) => (
                          <div key={symptom} className="flex items-center gap-2 bg-white dark:bg-slate-700 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{symptom}</span>
                            <button
                              onClick={() => toggleSymptom(symptom)}
                              className="text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-700 mt-4">
                    <button
                      onClick={() => setCurrentTab('info')}
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-3 px-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined">arrow_back</span>
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentTab('conditions')}
                      disabled={selectedSymptoms.length === 0}
                      className="bg-[#137fec] hover:bg-blue-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      Check Conditions
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Conditions */}
            {currentTab === 'conditions' && (
              <div className="w-full h-full flex flex-col">
                <div className="max-w-4xl mx-auto w-full animate-slideUp">
                  <div className="flex justify-between items-end mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Possible Conditions</h2>
                    <button
                      onClick={() => setCurrentTab('symptoms')}
                      className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline"
                    >
                      Edit Symptoms
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Condition 1 */}
                    <div
                      onClick={() => setCurrentTab('details')}
                      className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors shadow-sm cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Migraine</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 border border-orange-200 uppercase tracking-wide">High Match</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Severe recurring headache, usually affecting one side of the head.</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">neurology</span>
                              Neurological
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">person</span>
                              Common in ages 20-40
                            </span>
                          </div>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors ml-4">
                          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary-600 transition-colors">chevron_right</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    {/* Condition 2 */}
                    <div
                      onClick={() => setCurrentTab('details')}
                      className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors shadow-sm cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Tension Headache</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700 border border-yellow-200 uppercase tracking-wide">Moderate Match</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">A mild to moderate pain often described as feeling like a tight band around the head.</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">stress_management</span>
                              Stress-related
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">group</span>
                              Very Common
                            </span>
                          </div>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors ml-4">
                          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary-600 transition-colors">chevron_right</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>

                    {/* Condition 3 */}
                    <div
                      onClick={() => setCurrentTab('details')}
                      className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors shadow-sm cursor-pointer group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Sinusitis</h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">Low Match</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Inflammation or swelling of the tissue lining the sinuses.</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors ml-4">
                          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary-600 transition-colors">chevron_right</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                        <div className="bg-slate-400 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Details */}
            {currentTab === 'details' && (
              <div className="w-full h-full flex flex-col">
                <div className="max-w-4xl mx-auto w-full animate-slideUp">
                  <button
                    onClick={() => setCurrentTab('conditions')}
                    className="text-sm text-slate-500 hover:text-primary-600 mb-4 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back to Conditions
                  </button>

                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                    <div className="bg-primary-50 dark:bg-slate-800/80 p-6 border-b border-slate-200 dark:border-slate-700">
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Migraine</h2>
                      <p className="text-slate-600 dark:text-slate-400 text-lg">A neurological condition that can cause multiple symptoms.</p>
                    </div>

                    <div className="p-6 space-y-8">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary-500">info</span>
                          Overview
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          A migraine is a headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and extreme sensitivity to light and sound. Migraine attacks can last for hours to days, and the pain can be so severe that it interferes with your daily activities.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary-500">check_circle</span>
                            Common Symptoms
                          </h3>
                          <ul className="space-y-2">
                            {[
                              'Pain usually on one side of your head',
                              'Pain that throbs or pulses',
                              'Sensitivity to light, sound, and sometimes smell',
                              'Nausea and vomiting'
                            ].map((symptom, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary-500">warning</span>
                            Risk Factors
                          </h3>
                          <ul className="space-y-2">
                            {[
                              'Family history of migraines',
                              'Hormonal changes (in women)',
                              'Stress'
                            ].map((factor, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></div>
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                      <button
                        onClick={() => setCurrentTab('treatment')}
                        className="bg-[#137fec] hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all flex items-center gap-2"
                      >
                        View Treatment Options
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Treatment */}
            {currentTab === 'treatment' && (
              <div className="w-full h-full flex flex-col">
                <div className="max-w-4xl mx-auto w-full animate-slideUp">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Recommended Next Steps</h2>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Self Care */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                      <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-3xl">self_care</span>
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Self-Care</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Rest in a quiet, dark room. Apply hot or cold compresses to your head or neck.</p>
                      <button className="mt-auto w-full py-2 px-4 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm transition-colors">
                        Read Guidelines
                      </button>
                    </div>

                    {/* Consult Doctor - Recommended */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-primary-500 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
                      <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-3xl">stethoscope</span>
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Consult a Doctor</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Based on your symptoms, a professional evaluation is recommended.</p>
                      <button
                        onClick={onGetStarted}
                        className="mt-auto w-full py-2 px-4 rounded-lg bg-primary-600 text-white hover:bg-primary-700 font-medium text-sm transition-colors"
                      >
                        Find a Doctor
                      </button>
                    </div>

                    {/* Urgent Care */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center relative overflow-hidden opacity-75">
                      <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-3xl">emergency</span>
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Urgent Care</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">If you experience sudden severe headache or vision loss, seek help immediately.</p>
                      <button className="mt-auto w-full py-2 px-4 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm transition-colors">
                        Locate Clinic
                      </button>
                    </div>
                  </div>

                  {/* Save Results */}
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">print</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Save Results</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Download a summary for your visit</p>
                      </div>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm">
                      Download PDF
                    </button>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => {
                        setCurrentTab('info');
                        setSelectedSymptoms([]);
                        setAge(25);
                        setGender('male');
                      }}
                      className="text-primary-600 hover:underline text-sm font-medium"
                    >
                      Start New Check
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 p-4 text-center mt-auto">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Powered by <span className="font-bold text-slate-600 dark:text-slate-400">Medicare Clinical AI™</span> • v2.4.0
            </p>
          </div>
        </div>
      </main>

      <Footer onNavigate={(page) => {
        if (page === 'patient') onGetStarted?.();
        else if (page === 'doctor') onGetStarted?.();
        else if (page === 'admin') onGetStarted?.();
      }} onSecurity={onSecurity} onAboutUs={onAboutUs} onUpcoming={onUpcoming} />
      <HelpButton />
    </div>
  );
}