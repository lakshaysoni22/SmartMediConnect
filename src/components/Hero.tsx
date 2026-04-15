import React from 'react';

export function Hero({ onGetStarted, onNavigate }: { onGetStarted: () => void; onNavigate?: () => void }) {
  const handleQuickAction = () => {
    if (onNavigate) {
      onNavigate();
    } else {
      onGetStarted();
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-hospital-corridor-with-people-walking-4836-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 hero-video-overlay z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8 max-w-2xl">
            {/* Status Badge */}
            <div className="glass w-fit px-4 py-2 rounded-full flex items-center gap-3 border-[#137fec]/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">System Operational</span>
            </div>

            {/* Hero Title */}
            <h1 className="font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] text-5xl sm:text-6xl lg:text-7xl">
              Healthcare <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#137fec] to-blue-400">
                Reimagined
              </span>
            </h1>

            {/* Description */}
            <p className="font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg text-xl">
              Experience the future of medical management with our AI-driven, unified portal for patients, doctors, and administrators.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={handleQuickAction}
                className="group flex items-center justify-center gap-3 h-14 px-8 rounded-2xl bg-[#137fec] text-white font-bold transition-all shadow-[0_0_25px_-5px_rgba(19,127,236,0.5)] hover:shadow-lg hover:-translate-y-1 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative">Access Portal</span>
                <span className="material-symbols-outlined relative text-[20px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              <button className="group flex items-center justify-center gap-3 h-14 px-8 rounded-2xl glass hover:bg-white/80 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-bold transition-all border border-slate-200 dark:border-slate-600">
                <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform text-[#137fec]">
                  <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-4">
                <div className="relative w-12 h-12 rounded-full border-4 border-white dark:border-[#101922] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 z-30">
                  <img
                    alt="Doctor"
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop"
                  />
                </div>
                <div className="relative w-12 h-12 rounded-full border-4 border-white dark:border-[#101922] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 z-20">
                  <img
                    alt="Patient"
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
                  />
                </div>
                <div className="relative w-12 h-12 rounded-full border-4 border-white dark:border-[#101922] overflow-hidden shadow-lg transition-transform hover:-translate-y-2 z-10">
                  <img
                    alt="Admin"
                    className="object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  />
                </div>
                <div className="relative w-12 h-12 rounded-full border-4 border-white dark:border-[#101922] bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 shadow-lg z-0 text-xs">
                  10k+
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex text-yellow-400 text-[14px]">
                  <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                  <span className="material-symbols-outlined fill-current text-[18px]">star</span>
                </div>
                <span className="font-semibold text-slate-500 dark:text-slate-400 text-sm">
                  Trusted Professionals
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="relative h-[500px] w-full hidden lg:block">
            {/* Doctor Card */}
            <div className="absolute right-0 top-10 w-4/5 h-80 glass-card rounded-3xl p-6 z-20 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-[#137fec]">
                    <span className="material-symbols-outlined">medical_services</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Dr. Sarah Smith</h3>
                    <p className="text-slate-500 text-xs">Cardiologist • Available</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold text-xs">
                  Online
                </span>
              </div>
              <div className="space-y-3 mt-4">
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-[#137fec] w-3/4 rounded-full"></div>
                </div>
                <div className="flex justify-between text-slate-500 text-xs">
                  <span>Patient Load</span>
                  <span>75%</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <div onClick={handleQuickAction} className="h-24 flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 flex flex-col justify-center items-center gap-1 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-purple-500">calendar_month</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300 text-xs">Schedule</span>
                </div>
                <div onClick={handleQuickAction} className="h-24 flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 flex flex-col justify-center items-center gap-1 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-orange-500">event_note</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300 text-xs">Appointment</span>
                </div>
                <div onClick={handleQuickAction} className="h-24 flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 flex flex-col justify-center items-center gap-1 hover:bg-white hover:shadow-md transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-blue-500">video_call</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300 text-xs">Call</span>
                </div>
              </div>
            </div>

            {/* Heart Rate Card */}
            <div className="absolute bottom-20 left-10 w-48 glass rounded-2xl p-4 flex items-center gap-3 z-30 shadow-xl border-l-4 border-l-red-500">
              <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 animate-pulse">
                <span className="material-symbols-outlined">favorite</span>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Heart Rate</p>
                <p className="font-bold text-slate-900 dark:text-white text-lg">
                  72 <span className="font-normal text-slate-400 text-xs">bpm</span>
                </p>
              </div>
            </div>

            {/* Security Badge */}
            <div className="absolute top-0 right-10 w-40 glass rounded-2xl p-3 flex items-center gap-3 z-10 opacity-80 scale-90">
              <div className="size-8 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-600">
                <span className="material-symbols-outlined text-sm">shield</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-xs">HIPAA Secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}