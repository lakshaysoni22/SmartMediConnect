import React, { useState } from 'react';

export function DailyHealthSchedule({ onBack }: { onBack: () => void }) {
  const [darkMode] = useState(() => {
    const saved = localStorage.getItem('medicareAppDarkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const scheduleItems = [
    {
      time: '6:00 AM',
      icon: 'wb_twilight',
      title: 'Wake Up & Hydrate',
      description: 'Start your day with 1-2 glasses of water to rehydrate after sleep.',
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      time: '6:30 AM',
      icon: 'self_improvement',
      title: 'Morning Exercise',
      description: '30 minutes of yoga, stretching, or light cardio to energize your body.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      time: '7:30 AM',
      icon: 'restaurant',
      title: 'Healthy Breakfast',
      description: 'Include protein, whole grains, and fruits. Avoid processed foods.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      time: '8:30 AM',
      icon: 'medication',
      title: 'Take Medications',
      description: 'If prescribed, take your morning medications with food.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      time: '10:00 AM',
      icon: 'water_drop',
      title: 'Mid-Morning Hydration',
      description: 'Drink water or herbal tea. Stay hydrated throughout the day.',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      textColor: 'text-cyan-600 dark:text-cyan-400'
    },
    {
      time: '12:00 PM',
      icon: 'lunch_dining',
      title: 'Nutritious Lunch',
      description: 'Balanced meal with vegetables, lean protein, and complex carbs.',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      textColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      time: '2:00 PM',
      icon: 'directions_walk',
      title: 'Afternoon Walk',
      description: '10-15 minute walk to boost circulation and mental clarity.',
      color: 'from-teal-500 to-green-500',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      textColor: 'text-teal-600 dark:text-teal-400'
    },
    {
      time: '4:00 PM',
      icon: 'nutrition',
      title: 'Healthy Snack',
      description: 'Nuts, fruits, or yogurt. Avoid sugary snacks and sodas.',
      color: 'from-lime-500 to-green-500',
      bgColor: 'bg-lime-50 dark:bg-lime-900/20',
      textColor: 'text-lime-600 dark:text-lime-400'
    },
    {
      time: '6:00 PM',
      icon: 'fitness_center',
      title: 'Evening Exercise',
      description: 'Light workout, swimming, or sports activity for 30-45 minutes.',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      time: '7:30 PM',
      icon: 'dinner_dining',
      title: 'Light Dinner',
      description: 'Eat at least 2-3 hours before bed. Keep it light and healthy.',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20',
      textColor: 'text-rose-600 dark:text-rose-400'
    },
    {
      time: '9:00 PM',
      icon: 'family_star',
      title: 'Family Time',
      description: 'Spend quality time with loved ones. Disconnect from work.',
      color: 'from-pink-500 to-purple-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      textColor: 'text-pink-600 dark:text-pink-400'
    },
    {
      time: '10:00 PM',
      icon: 'nightlight',
      title: 'Wind Down Routine',
      description: 'Dim lights, read a book, or practice meditation. Avoid screens.',
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20',
      textColor: 'text-violet-600 dark:text-violet-400'
    },
    {
      time: '10:30 PM',
      icon: 'bedtime',
      title: 'Sleep Time',
      description: 'Aim for 7-8 hours of quality sleep. Maintain consistent sleep schedule.',
      color: 'from-slate-600 to-blue-900',
      bgColor: 'bg-slate-50 dark:bg-slate-900/20',
      textColor: 'text-slate-600 dark:text-slate-400'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-200">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors group"
                >
                  <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
                    arrow_back
                  </span>
                  <span className="font-medium text-sm">Back to Dashboard</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[18px]">schedule</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Daily Schedule</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 mb-4">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                event_available
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Your Daily Health Schedule
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Follow this recommended daily routine for optimal health and wellness. Consistency is key to building healthy habits.
            </p>
          </div>

          {/* Health Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    favorite
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Daily Benefit</p>
                  <p className="font-bold text-slate-900 dark:text-white">Better Health</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    psychology
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Mental Boost</p>
                  <p className="font-bold text-slate-900 dark:text-white">More Energy</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                    stacked_bar_chart
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Long Term</p>
                  <p className="font-bold text-slate-900 dark:text-white">Life Quality</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {scheduleItems.map((item, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  {/* Time Badge */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center text-white shadow-lg`}>
                      <span className="text-xs font-bold opacity-90">
                        {item.time.split(' ')[1]}
                      </span>
                      <span className="text-xl font-bold">
                        {item.time.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                          <span className={`material-symbols-outlined ${item.textColor} text-[24px]`} style={{ fontVariationSettings: '"FILL" 1' }}>
                            {item.icon}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          <span className="material-symbols-outlined text-[12px]">notifications_active</span>
                          Reminder
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < scheduleItems.length - 1 && (
                  <div className="absolute left-[54px] top-[88px] w-0.5 h-4 bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-700" />
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Set Daily Reminders</h3>
                <p className="text-sm text-blue-100">
                  Get notifications for each activity to stay on track with your health goals.
                </p>
              </div>
              <button className="flex-shrink-0 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl">
                Enable Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
