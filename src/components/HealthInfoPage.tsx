import React, { useState } from 'react';
import { PublicNavigation } from './PublicNavigation';
import { Footer } from './Footer';
import { HelpButton } from './HelpButton';

interface HealthInfoPageProps {
  onBack?: () => void;
  onSymptomChecker?: () => void;
  onViewPlans?: () => void;
  onGetStarted?: () => void;
  onAboutUs?: () => void;
  onSecurity?: () => void;
  onUpcoming?: () => void;
}

interface HealthTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  readTime: string;
}

export function HealthInfoPage({ onBack, onSymptomChecker, onViewPlans, onGetStarted, onAboutUs, onSecurity, onUpcoming }: HealthInfoPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredTopics: HealthTopic[] = [
    {
      id: '1',
      title: 'Heart Health',
      category: 'cardiovascular',
      description: 'Learn about maintaining a healthy heart and preventing cardiovascular diseases.',
      icon: 'cardiology',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Mental Wellness',
      category: 'mental-health',
      description: 'Understanding mental health and strategies for emotional well-being.',
      icon: 'psychology',
      readTime: '7 min read'
    },
    {
      id: '3',
      title: 'Nutrition Guide',
      category: 'nutrition',
      description: 'Essential nutrition information for a balanced and healthy diet.',
      icon: 'restaurant',
      readTime: '6 min read'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: 'grid_view' },
    { id: 'cardiovascular', name: 'Heart Health', icon: 'cardiology' },
    { id: 'mental-health', name: 'Mental Health', icon: 'psychology' },
    { id: 'nutrition', name: 'Nutrition', icon: 'restaurant' },
    { id: 'fitness', name: 'Fitness', icon: 'fitness_center' },
    { id: 'preventive', name: 'Preventive Care', icon: 'health_and_safety' }
  ];

  const allTopics: HealthTopic[] = [
    ...featuredTopics,
    {
      id: '4',
      title: 'Diabetes Management',
      category: 'preventive',
      description: 'Comprehensive guide to managing and preventing diabetes.',
      icon: 'glucose',
      readTime: '8 min read'
    },
    {
      id: '5',
      title: 'Exercise & Fitness',
      category: 'fitness',
      description: 'Tips and routines for staying active and healthy.',
      icon: 'fitness_center',
      readTime: '5 min read'
    },
    {
      id: '6',
      title: 'Sleep Health',
      category: 'mental-health',
      description: 'Importance of quality sleep and tips for better rest.',
      icon: 'bedtime',
      readTime: '6 min read'
    }
  ];

  const filteredTopics = allTopics.filter(topic => {
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        currentPage="health-info"
        onHome={onBack}
        onSymptomChecker={onSymptomChecker}
        onHealthInfo={onBack}
        onViewPlans={onViewPlans}
        onGetStarted={onGetStarted}
        onAboutUs={onAboutUs}
        onSecurity={onSecurity}
        onUpcoming={onUpcoming}
      />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4 border border-blue-200 dark:border-blue-800">
              <span className="material-symbols-outlined text-[18px]">local_library</span>
              Medically Reviewed Content
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Health Encyclopedia</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Evidence-based health information to help you make informed decisions about your well-being
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-2xl">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search health topics, conditions, treatments..."
                className="w-full pl-14 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 dark:text-white shadow-lg"
              />
            </div>
          </div>

          {/* Featured Topics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">star</span>
              Featured Topics
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">
                      {topic.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {topic.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {topic.readTime}
                    </span>
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">
                      {topic.icon}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                    {categories.find(c => c.id === topic.category)?.name}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {topic.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {topic.readTime}
                  </span>
                  <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTopics.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-slate-400 text-4xl">search_off</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No topics found</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Try adjusting your search or browse a different category
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Quick Access Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <span className="material-symbols-outlined text-5xl mb-3 opacity-90">healing</span>
              <h3 className="text-xl font-bold mb-2">Symptom Checker</h3>
              <p className="text-blue-100 text-sm mb-4">
                Get personalized health assessments based on your symptoms
              </p>
              <button
                onClick={onSymptomChecker}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Start Now →
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
              <span className="material-symbols-outlined text-5xl mb-3 opacity-90">calendar_month</span>
              <h3 className="text-xl font-bold mb-2">Book Appointment</h3>
              <p className="text-purple-100 text-sm mb-4">
                Schedule a consultation with our healthcare professionals
              </p>
              <button
                onClick={onGetStarted}
                className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Get Started →
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <span className="material-symbols-outlined text-5xl mb-3 opacity-90">shield</span>
              <h3 className="text-xl font-bold mb-2">Preventive Care</h3>
              <p className="text-green-100 text-sm mb-4">
                Learn about screenings and vaccinations to stay healthy
              </p>
              <button className="px-4 py-2 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Learn More →
              </button>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-900/30">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-2xl">info</span>
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-1">Medical Disclaimer</h3>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  The information provided in this health encyclopedia is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </div>
            </div>
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