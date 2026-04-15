import React from 'react';
import { PublicNavigation } from './PublicNavigation';
import { Footer } from './Footer';

interface UpcomingPageProps {
  onBack?: () => void;
  onSecurity?: () => void;
  onAboutUs?: () => void;
  onSymptomChecker?: () => void;
  onHealthInfo?: () => void;
  onViewPlans?: () => void;
  onGetStarted?: () => void;
  onUpcoming?: () => void;
}

export function UpcomingPage({ onBack, onSecurity, onAboutUs, onSymptomChecker, onHealthInfo, onViewPlans, onGetStarted, onUpcoming }: UpcomingPageProps) {
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
        currentPage="upcoming"
        onHome={onBack}
        onSymptomChecker={onSymptomChecker}
        onHealthInfo={onHealthInfo}
        onViewPlans={onViewPlans}
        onGetStarted={onGetStarted}
        onSecurity={onSecurity}
        onAboutUs={onAboutUs}
        onUpcoming={onUpcoming}
        homeLabel="Home"
      />

      {/* Header */}
      <header className="relative overflow-hidden pt-32 pb-16 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(19,127,236,0.05)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(19,127,236,0.05)_0px,transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-10 text-sm font-bold tracking-widest uppercase text-[#137fec] bg-blue-100 dark:bg-blue-900/30 rounded-full">
            Vision 2027
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
            Upcoming Future of Healthcare <br/>
            <span className="bg-gradient-to-r from-[#137fec] to-blue-700 bg-clip-text text-transparent">
              is Here.
            </span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            We are expanding beyond the screen into a complete ecosystem that empowers doctors, educates students, and monitors health in real-time through seamless wearable integration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-6 py-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="material-symbols-outlined text-[#137fec]">school</span>
              <span className="font-semibold">Medical Academy</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-6 py-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="material-symbols-outlined text-[#137fec]">watch</span>
              <span className="font-semibold">Medicare Wearable</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-6 py-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="material-symbols-outlined text-[#137fec]">diversity_3</span>
              <span className="font-semibold">Career Network</span>
            </div>
          </div>
        </div>
      </header>

      {/* Medical Academy Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-4xl font-extrabold mb-6 leading-tight text-slate-900 dark:text-white">
              The Medical Academy <br /> &amp; Career Network
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              A professional network designed exclusively for medical practitioners. Connect with peers, access global learning content, and step into your career with direct hiring from top hospitals.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#137fec] mt-1" style={{ fontVariationSettings: '"FILL" 1' }}>
                  check_circle
                </span>
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">Interactive Learning Hub</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Access CME-certified courses and interactive medical 3D modules.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#137fec] mt-1" style={{ fontVariationSettings: '"FILL" 1' }}>
                  check_circle
                </span>
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">Direct Internship Portal</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Hospitals can review verified portfolios and hire directly.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#137fec] mt-1" style={{ fontVariationSettings: '"FILL" 1' }}>
                  check_circle
                </span>
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">Exclusive Medical Feed</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Stay updated with research papers and global medical news.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-xl shadow-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Academy.Medicare.io</div>
              </div>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm mb-4 border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                        SJ
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Dr. Sarah Jenkins</div>
                        <div className="text-[10px] text-slate-400 uppercase">Cardiology Fellow • 2h ago</div>
                      </div>
                    </div>
                    <p className="text-sm mb-4 text-slate-700 dark:text-slate-300">Just published my latest research on AI-driven ECG interpretation in the Academy hub. Check it out!</p>
                    <div className="w-full h-40 bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#137fec] text-4xl">biotech</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4 space-y-4">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-100 dark:border-slate-700">
                    <h4 className="text-xs font-bold mb-3 uppercase tracking-wider text-slate-400">Hiring Now</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded cursor-pointer transition-colors">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                          <span className="material-symbols-outlined text-xs text-blue-600 dark:text-blue-400">local_hospital</span>
                        </div>
                        <div className="text-[10px] font-bold text-slate-900 dark:text-white">Mayo Clinic</div>
                      </div>
                      <div className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded cursor-pointer transition-colors">
                        <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center">
                          <span className="material-symbols-outlined text-xs text-red-600 dark:text-red-400">local_hospital</span>
                        </div>
                        <div className="text-[10px] font-bold text-slate-900 dark:text-white">Cleveland Clinic</div>
                      </div>
                      <div className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded cursor-pointer transition-colors">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center">
                          <span className="material-symbols-outlined text-xs text-green-600 dark:text-green-400">local_hospital</span>
                        </div>
                        <div className="text-[10px] font-bold text-slate-900 dark:text-white">Johns Hopkins</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 shadow-sm border border-blue-200 dark:border-blue-800">
                    <h4 className="text-xs font-bold mb-2 text-slate-900 dark:text-white">My Learning</h4>
                    <div className="w-full bg-white/50 dark:bg-black/20 h-1.5 rounded-full mb-1">
                      <div className="bg-[#137fec] h-full w-[70%] rounded-full"></div>
                    </div>
                    <div className="text-[9px] font-medium text-slate-600 dark:text-slate-400">Neuroanatomy: 70%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wearables Section */}
      <section className="py-24 bg-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 rounded-l-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">Medicare for Wearables</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Advanced monitoring and emergency response, refined for your wrist.</p>
          </div>
          <div className="relative flex flex-col items-center">
            <div className="relative z-10 w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl opacity-50"></div>
              <div className="relative flex items-center justify-center h-full">
                {/* Smartwatch */}
                <div className="w-72 h-72 rounded-[4rem] border-[12px] border-slate-900 dark:border-slate-800 bg-black relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent"></div>
                  <div className="p-8 h-full flex flex-col items-center justify-center">
                    <div className="text-[#137fec] text-xs font-bold mb-1 tracking-widest uppercase">Live ECG</div>
                    <div className="w-full h-12 flex items-center gap-0.5 overflow-hidden mb-4 justify-center">
                      <div className="w-1 h-4 bg-blue-400/40 rounded-full"></div>
                      <div className="w-1 h-6 bg-blue-400/60 rounded-full"></div>
                      <div className="w-1 h-10 bg-blue-400 rounded-full"></div>
                      <div className="w-1 h-4 bg-blue-400/40 rounded-full"></div>
                      <div className="w-1 h-8 bg-blue-400/80 rounded-full"></div>
                      <div className="w-1 h-5 bg-blue-400/50 rounded-full"></div>
                      <div className="w-1 h-12 bg-blue-400 rounded-full"></div>
                      <div className="w-1 h-4 bg-blue-400/40 rounded-full"></div>
                      <div className="w-1 h-8 bg-blue-400/70 rounded-full"></div>
                      <div className="w-1 h-3 bg-blue-400/30 rounded-full"></div>
                    </div>
                    <div className="text-4xl font-extrabold text-white mb-1">
                      72 <span className="text-sm font-medium text-slate-400 uppercase tracking-tighter">BPM</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Normal Rhythm</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-white"></div>
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                    <div className="w-1 h-1 rounded-full bg-white/30"></div>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="hidden lg:block absolute top-0 -left-16 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-4 rounded-xl shadow-xl w-48 transition-transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-sm">sos</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">SOS Trigger</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Automatic emergency alert with real-time location sharing.</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-24 -translate-y-1/2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-4 rounded-xl shadow-xl w-52 transition-transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#137fec] flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                        favorite
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Advanced ECG</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Medical-grade pulse and rhythm monitoring on the go.</p>
                </div>
                <div className="hidden lg:block absolute -bottom-8 -left-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-4 rounded-xl shadow-xl w-48 transition-transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-sm">location_on</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">GPS Sync</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Directly syncs coordinates with local emergency hubs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 dark:bg-slate-950 rounded-[2rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05))] bg-[length:20px_20px]"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-extrabold mb-6">Join the Medical <br/> Revolution</h2>
              <p className="text-slate-400 text-lg mb-8">Be the first to experience the Academy and Medicare Wearable software. Choose your path and stay notified.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#137fec] px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                  <span>Register for Academy</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <button className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-2">
                  <span>Beta Test Wearable</span>
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-[#137fec] text-2xl font-bold">12k+</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Waitlisted Doctors</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-[#137fec] text-2xl font-bold">450+</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Partner Hospitals</div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-[#137fec] text-2xl font-bold">1.2M</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Medical Resources</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-[#137fec] text-2xl font-bold">99.9%</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Uptime Accuracy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onSecurity={onSecurity} onAboutUs={onAboutUs} onUpcoming={onBack} />
    </div>
  );
}