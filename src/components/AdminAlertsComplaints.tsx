import React, { useState, useMemo } from 'react';
import { NotificationIcon } from './NotificationIcon';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  status: 'excellent' | 'good' | 'monitoring' | 'review-needed';
  avatar: string;
  department: string;
}

interface Feedback {
  id: string;
  patientInitials: string;
  patientName: string;
  timeAgo: string;
  ticketNumber: string;
  rating: number;
  comment: string;
  doctorName: string;
  flagged?: boolean;
  department: string;
  period: '30-days' | '3-months' | 'ytd';
}

export function AdminAlertsComplaints() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30-days');
  const [selectedRating, setSelectedRating] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Comprehensive doctors data with departments
  const allDoctors: Doctor[] = [
    // Cardiology
    {
      id: 'DOC-8921',
      name: 'Dr. Sarah Jenning',
      specialty: 'Cardiology',
      rating: 4.9,
      reviews: 124,
      status: 'excellent',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
      department: 'cardiology',
    },
    {
      id: 'DOC-7823',
      name: 'Dr. Michael Roberts',
      specialty: 'Cardiology',
      rating: 4.7,
      reviews: 98,
      status: 'excellent',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&h=100&fit=crop',
      department: 'cardiology',
    },
    // Pediatrics
    {
      id: 'DOC-4412',
      name: 'Dr. Mark Doe',
      specialty: 'Pediatrics',
      rating: 2.1,
      reviews: 8,
      status: 'review-needed',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
      department: 'pediatrics',
    },
    {
      id: 'DOC-6721',
      name: 'Dr. Lisa Anderson',
      specialty: 'Pediatrics',
      rating: 4.8,
      reviews: 156,
      status: 'excellent',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop',
      department: 'pediatrics',
    },
    // Neurology
    {
      id: 'DOC-1120',
      name: 'Dr. James Smith',
      specialty: 'Neurology',
      rating: 4.5,
      reviews: 56,
      status: 'good',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop',
      department: 'neurology',
    },
    {
      id: 'DOC-9012',
      name: 'Dr. Rachel Kim',
      specialty: 'Neurology',
      rating: 3.9,
      reviews: 42,
      status: 'monitoring',
      avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop',
      department: 'neurology',
    },
    // Emergency
    {
      id: 'DOC-3321',
      name: 'Dr. Emily Chen',
      specialty: 'Emergency',
      rating: 3.8,
      reviews: 210,
      status: 'monitoring',
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop',
      department: 'emergency',
    },
    {
      id: 'DOC-5534',
      name: 'Dr. David Martinez',
      specialty: 'Emergency',
      rating: 4.6,
      reviews: 187,
      status: 'good',
      avatar: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=100&h=100&fit=crop',
      department: 'emergency',
    },
  ];

  // Comprehensive feedbacks data with departments and periods
  const allFeedbacks: Feedback[] = [
    // Recent - Last 30 Days - Critical Ratings
    {
      id: '4023',
      patientInitials: 'JP',
      patientName: 'J. Peterson',
      timeAgo: '2 hours ago',
      ticketNumber: '#4023',
      rating: 1,
      comment: '"Dr. Doe was late to the appointment and dismissed my concerns about the side effects completely. I felt unheard..."',
      doctorName: 'Dr. Mark Doe',
      flagged: true,
      department: 'pediatrics',
      period: '30-days',
    },
    {
      id: '4021',
      patientInitials: 'RB',
      patientName: 'R. Brown',
      timeAgo: '4 hours ago',
      ticketNumber: '#4021',
      rating: 2,
      comment: '"Long wait time in the ER. Staff seemed overwhelmed and communication was poor."',
      doctorName: 'Dr. Emily Chen',
      flagged: true,
      department: 'emergency',
      period: '30-days',
    },
    // Recent - Last 30 Days - Excellent Ratings
    {
      id: '4019',
      patientInitials: 'AM',
      patientName: 'A. Miller',
      timeAgo: '5 hours ago',
      ticketNumber: '#4019',
      rating: 5,
      comment: '"Dr. Jenning was incredibly patient and explained the procedure in a way I could understand. Excellent care!"',
      doctorName: 'Dr. Sarah Jenning',
      department: 'cardiology',
      period: '30-days',
    },
    {
      id: '4018',
      patientInitials: 'SC',
      patientName: 'S. Cooper',
      timeAgo: '8 hours ago',
      ticketNumber: '#4018',
      rating: 5,
      comment: '"Dr. Anderson is amazing with kids! My daughter felt so comfortable during the entire visit."',
      doctorName: 'Dr. Lisa Anderson',
      department: 'pediatrics',
      period: '30-days',
    },
    {
      id: '4015',
      patientInitials: 'KW',
      patientName: 'K. Wilson',
      timeAgo: '12 hours ago',
      ticketNumber: '#4015',
      rating: 5,
      comment: '"Outstanding care from Dr. Roberts. He took time to answer all my questions about my heart condition."',
      doctorName: 'Dr. Michael Roberts',
      department: 'cardiology',
      period: '30-days',
    },
    // Recent - Last 30 Days - Good Ratings
    {
      id: '4002',
      patientInitials: 'TK',
      patientName: 'T. Klein',
      timeAgo: 'Yesterday',
      ticketNumber: '#4002',
      rating: 3,
      comment: '"Wait times were a bit long in the ER, but Dr. Chen did a good job once we were seen."',
      doctorName: 'Dr. Emily Chen',
      department: 'emergency',
      period: '30-days',
    },
    {
      id: '4008',
      patientInitials: 'MJ',
      patientName: 'M. Johnson',
      timeAgo: '2 days ago',
      ticketNumber: '#4008',
      rating: 4,
      comment: '"Dr. Smith was professional and thorough. The diagnosis was accurate and treatment plan is working well."',
      doctorName: 'Dr. James Smith',
      department: 'neurology',
      period: '30-days',
    },
    {
      id: '4005',
      patientInitials: 'LT',
      patientName: 'L. Thompson',
      timeAgo: '3 days ago',
      ticketNumber: '#4005',
      rating: 4,
      comment: '"Good experience overall. Dr. Martinez was knowledgeable and the emergency team was efficient."',
      doctorName: 'Dr. David Martinez',
      department: 'emergency',
      period: '30-days',
    },
    
    // Older - Last 3 Months - Critical Ratings
    {
      id: '3876',
      patientInitials: 'DH',
      patientName: 'D. Harris',
      timeAgo: '6 weeks ago',
      ticketNumber: '#3876',
      rating: 2,
      comment: '"Felt rushed during my appointment. Dr. Kim didn\'t seem to listen to my symptoms carefully."',
      doctorName: 'Dr. Rachel Kim',
      department: 'neurology',
      period: '3-months',
    },
    {
      id: '3654',
      patientInitials: 'NG',
      patientName: 'N. Garcia',
      timeAgo: '8 weeks ago',
      ticketNumber: '#3654',
      rating: 1,
      comment: '"Very disappointed with the care received. Multiple medication errors and poor follow-up."',
      doctorName: 'Dr. Mark Doe',
      flagged: true,
      department: 'pediatrics',
      period: '3-months',
    },
    
    // Older - Last 3 Months - Excellent Ratings
    {
      id: '3921',
      patientInitials: 'PL',
      patientName: 'P. Lewis',
      timeAgo: '5 weeks ago',
      ticketNumber: '#3921',
      rating: 5,
      comment: '"Dr. Jenning saved my life! Her quick diagnosis and treatment plan were exceptional."',
      doctorName: 'Dr. Sarah Jenning',
      department: 'cardiology',
      period: '3-months',
    },
    {
      id: '3789',
      patientInitials: 'VR',
      patientName: 'V. Rodriguez',
      timeAgo: '7 weeks ago',
      ticketNumber: '#3789',
      rating: 5,
      comment: '"Fantastic pediatrician! Dr. Anderson went above and beyond for my child\'s care."',
      doctorName: 'Dr. Lisa Anderson',
      department: 'pediatrics',
      period: '3-months',
    },
    
    // Older - Last 3 Months - Good Ratings
    {
      id: '3567',
      patientInitials: 'BW',
      patientName: 'B. White',
      timeAgo: '10 weeks ago',
      ticketNumber: '#3567',
      rating: 4,
      comment: '"Solid experience. Dr. Smith provided clear explanations and effective treatment."',
      doctorName: 'Dr. James Smith',
      department: 'neurology',
      period: '3-months',
    },
    {
      id: '3445',
      patientInitials: 'EM',
      patientName: 'E. Martin',
      timeAgo: '11 weeks ago',
      ticketNumber: '#3445',
      rating: 3,
      comment: '"Average visit. Dr. Martinez was competent but communication could have been better."',
      doctorName: 'Dr. David Martinez',
      department: 'emergency',
      period: '3-months',
    },
    
    // Year to Date - Critical Ratings
    {
      id: '2134',
      patientInitials: 'HB',
      patientName: 'H. Baker',
      timeAgo: '5 months ago',
      ticketNumber: '#2134',
      rating: 2,
      comment: '"Concerned about the approach taken. Second opinion revealed a different diagnosis."',
      doctorName: 'Dr. Rachel Kim',
      department: 'neurology',
      period: 'ytd',
    },
    
    // Year to Date - Excellent Ratings
    {
      id: '2789',
      patientInitials: 'JD',
      patientName: 'J. Davis',
      timeAgo: '4 months ago',
      ticketNumber: '#2789',
      rating: 5,
      comment: '"Dr. Roberts is the best cardiologist I\'ve ever seen. Highly recommend!"',
      doctorName: 'Dr. Michael Roberts',
      department: 'cardiology',
      period: 'ytd',
    },
    {
      id: '2456',
      patientInitials: 'CT',
      patientName: 'C. Taylor',
      timeAgo: '6 months ago',
      ticketNumber: '#2456',
      rating: 5,
      comment: '"Outstanding emergency care from Dr. Martinez. Professional and compassionate."',
      doctorName: 'Dr. David Martinez',
      department: 'emergency',
      period: 'ytd',
    },
    
    // Year to Date - Good Ratings
    {
      id: '2678',
      patientInitials: 'OS',
      patientName: 'O. Scott',
      timeAgo: '5 months ago',
      ticketNumber: '#2678',
      rating: 4,
      comment: '"Good neurologist. Dr. Smith helped manage my chronic condition effectively."',
      doctorName: 'Dr. James Smith',
      department: 'neurology',
      period: 'ytd',
    },
  ];

  // Filter doctors based on selected filters
  const filteredDoctors = useMemo(() => {
    let filtered = allDoctors;

    // Filter by department
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(doc => doc.department === selectedDepartment);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        doc =>
          doc.name.toLowerCase().includes(query) ||
          doc.id.toLowerCase().includes(query) ||
          doc.specialty.toLowerCase().includes(query)
      );
    }

    // Sort by rating (optional enhancement)
    return filtered.sort((a, b) => {
      if (a.status === 'review-needed' && b.status !== 'review-needed') return -1;
      if (a.status !== 'review-needed' && b.status === 'review-needed') return 1;
      return b.rating - a.rating;
    });
  }, [selectedDepartment, searchQuery, allDoctors]);

  // Filter feedbacks based on selected filters
  const filteredFeedbacks = useMemo(() => {
    let filtered = allFeedbacks;

    // Filter by department
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(fb => fb.department === selectedDepartment);
    }

    // Filter by period
    if (selectedPeriod === '30-days') {
      filtered = filtered.filter(fb => fb.period === '30-days');
    } else if (selectedPeriod === '3-months') {
      filtered = filtered.filter(fb => fb.period === '30-days' || fb.period === '3-months');
    }
    // 'ytd' shows all feedbacks

    // Filter by rating
    if (selectedRating === 'critical') {
      filtered = filtered.filter(fb => fb.rating >= 1 && fb.rating <= 2);
    } else if (selectedRating === 'good') {
      filtered = filtered.filter(fb => fb.rating >= 3 && fb.rating <= 4);
    } else if (selectedRating === 'excellent') {
      filtered = filtered.filter(fb => fb.rating === 5);
    }

    // Sort by most recent first
    return filtered;
  }, [selectedDepartment, selectedPeriod, selectedRating, allFeedbacks]);

  // Calculate dynamic statistics based on filtered data
  const stats = useMemo(() => {
    const feedbacksInPeriod = selectedPeriod === '30-days' 
      ? allFeedbacks.filter(fb => fb.period === '30-days')
      : selectedPeriod === '3-months'
      ? allFeedbacks.filter(fb => fb.period === '30-days' || fb.period === '3-months')
      : allFeedbacks;

    const avgRating = feedbacksInPeriod.length > 0
      ? (feedbacksInPeriod.reduce((sum, fb) => sum + fb.rating, 0) / feedbacksInPeriod.length).toFixed(1)
      : '4.8';

    const openComplaints = feedbacksInPeriod.filter(fb => fb.flagged).length;
    const pendingReviews = feedbacksInPeriod.filter(fb => fb.rating <= 3).length;
    const retentionRiskDoctors = filteredDoctors.filter(d => d.status === 'review-needed' || d.status === 'monitoring').length;

    return {
      avgRating,
      openComplaints,
      pendingReviews,
      retentionRiskDoctors,
    };
  }, [selectedPeriod, allFeedbacks, filteredDoctors]);

  // Calculate chart data based on selected period
  const chartData = useMemo(() => {
    if (selectedPeriod === '30-days') {
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        values: [85, 88, 92, 95],
      };
    } else if (selectedPeriod === '3-months') {
      return {
        labels: ['Month 1', 'Month 2', 'Month 3'],
        values: [82, 88, 94],
      };
    } else {
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [65, 72, 68, 78, 85, 82, 88, 92, 95, 94, 96, 98],
      };
    }
  }, [selectedPeriod]);

  const getStatusBadge = (status: Doctor['status']) => {
    const styles = {
      'excellent': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'good': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'monitoring': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      'review-needed': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900/50',
    };

    const labels = {
      'excellent': 'Excellent',
      'good': 'Good',
      'monitoring': 'Monitoring',
      'review-needed': 'Review Needed',
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {status === 'review-needed' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
        {labels[status]}
      </span>
    );
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const stars = [];
    const textSize = size === 'sm' ? 'text-[16px]' : 'text-[18px]';
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className={`material-symbols-outlined text-yellow-400 ${textSize} fill-current`}>
            star
          </span>
        );
      } else if (i - 0.5 === rating) {
        stars.push(
          <span key={i} className={`material-symbols-outlined text-yellow-400 ${textSize}`}>
            star_half
          </span>
        );
      } else {
        stars.push(
          <span key={i} className={`material-symbols-outlined text-slate-200 dark:text-slate-700 ${textSize}`}>
            star
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative h-full overflow-hidden dark:bg-black">
      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0077b6] rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">star</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Doctor Feedback & Performance</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Centralized dashboard for monitoring physician quality metrics</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationIcon 
              showDot={true}
              onClick={() => window.dispatchEvent(new CustomEvent('openNotificationCenter'))}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-5">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Avg Satisfaction Score */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. Satisfaction Score</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                    {stats.avgRating} <span className="text-lg text-slate-400">/ 5.0</span>
                  </h3>
                </div>
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                  <span className="material-symbols-outlined text-xl">thumb_up</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-teal-600 font-medium flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                  +0.2%
                </span>
                <span className="text-slate-400 ml-2">from last month</span>
              </div>
            </div>

            {/* Total Open Complaints */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Open Complaints</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.openComplaints}</h3>
                </div>
                <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg text-rose-600">
                  <span className="material-symbols-outlined text-xl">report_problem</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Action Required
                </span>
              </div>
            </div>

            {/* Pending Reviews */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Reviews</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{stats.pendingReviews}</h3>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600">
                  <span className="material-symbols-outlined text-xl">pending_actions</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-red-500 font-medium flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">trending_down</span>
                  -12%
                </span>
                <span className="text-slate-400 ml-2">vs last month</span>
              </div>
            </div>

            {/* Retention Risk */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Retention Risk</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                    {stats.retentionRiskDoctors} <span className="text-base font-normal text-slate-500 dark:text-slate-400">Doctors</span>
                  </h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                  <span className="material-symbols-outlined text-xl">person_remove</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Low Risk
                </span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-3 text-slate-400">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-shadow"
                placeholder="Search by doctor name, ID, or specialty..."
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-primary cursor-pointer min-w-[140px]"
              >
                <option value="all">All Departments</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="emergency">Emergency</option>
              </select>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-primary cursor-pointer min-w-[140px]"
              >
                <option value="30-days">Last 30 Days</option>
                <option value="3-months">Last 3 Months</option>
                <option value="ytd">Year to Date</option>
              </select>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 outline-none focus:border-primary cursor-pointer min-w-[140px]"
              >
                <option value="all">All Ratings</option>
                <option value="critical">Critical (1-2 Stars)</option>
                <option value="good">Good (3-4 Stars)</option>
                <option value="excellent">Excellent (5 Stars)</option>
              </select>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Chart and Table */}
            <div className="xl:col-span-2 flex flex-col gap-6">
              {/* Chart */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Patient Satisfaction Trends</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#0EA5E9]"></span>
                      <span className="text-xs text-slate-500">Overall</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                      <span className="text-xs text-slate-500">Emergency Dept</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-64 flex items-end justify-between gap-2 px-2 pb-4 border-b border-l border-slate-200 dark:border-slate-700 relative">
                  <div className="absolute top-0 w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                  <div className="absolute top-1/4 w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                  <div className="absolute top-2/4 w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                  <div className="absolute top-3/4 w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                  
                  {chartData.values.map((height, i) => (
                    <div
                      key={i}
                      className="relative w-full bg-[#0EA5E9]/70 hover:bg-[#0EA5E9] transition-all rounded-t-sm group flex flex-col justify-end items-center cursor-pointer"
                      style={{ height: `${height}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded transition-opacity">
                        {(height / 20).toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-2 px-2">
                  {chartData.labels.map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>

              {/* Doctor Performance Table */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-visible">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center overflow-visible">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Doctor Performance</h3>
                  <button className="relative text-primary text-sm font-bold px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 transition-all duration-300 shadow-[0_0_20px_rgba(19,127,236,0.3)] hover:shadow-[0_0_35px_rgba(19,127,236,0.7),0_0_50px_rgba(19,127,236,0.4)] hover:-translate-y-1 hover:scale-105">
                    View All Doctors
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">
                        <th className="p-4 font-semibold">Doctor</th>
                        <th className="p-4 font-semibold">Specialty</th>
                        <th className="p-4 font-semibold">Rating</th>
                        <th className="p-4 font-semibold hidden md:table-cell">Status</th>
                        <th className="p-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                      {filteredDoctors.map((doctor) => (
                        <tr key={doctor.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="size-10 rounded-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${doctor.avatar})` }}
                              ></div>
                              <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{doctor.name}</p>
                                <p className="text-xs text-slate-500">ID: #{doctor.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-300">{doctor.specialty}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-yellow-400 text-[18px] fill-current">
                                {doctor.rating >= 4.5 ? 'star' : 'star_half'}
                              </span>
                              <span className="font-bold text-slate-900 dark:text-white">{doctor.rating}</span>
                              <span className="text-slate-400 text-xs"> ({doctor.reviews} reviews)</span>
                            </div>
                          </td>
                          <td className="p-4 hidden md:table-cell">{getStatusBadge(doctor.status)}</td>
                          <td className="p-4 text-right">
                            {doctor.status === 'review-needed' ? (
                              <button className="relative bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.7),0_0_45px_rgba(239,68,68,0.4)] hover:-translate-y-1 hover:scale-105">
                                Review
                              </button>
                            ) : (
                              <button className="text-slate-400 hover:text-primary p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                                <span className="material-symbols-outlined">more_vert</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column - Recent Feedback */}
            <div className="xl:col-span-1 flex flex-col gap-4 h-full">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white px-1">Recent Patient Feedback</h3>
              <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
                {filteredFeedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className={`bg-white dark:bg-slate-900 ${
                      feedback.flagged
                        ? 'border-l-4 border-l-red-500 border-y border-r border-slate-200 dark:border-slate-800 rounded-r-lg'
                        : 'border border-slate-200 dark:border-slate-800 rounded-lg'
                    } p-4 shadow-sm hover:shadow-md transition-shadow relative`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`size-8 rounded-full ${
                          feedback.flagged ? 'bg-slate-100 dark:bg-slate-800' : 'bg-blue-100 dark:bg-blue-900/30'
                        } flex items-center justify-center ${
                          feedback.flagged ? 'text-slate-500' : 'text-blue-600 dark:text-blue-400'
                        } font-bold text-xs`}>
                          {feedback.patientInitials}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{feedback.patientName}</p>
                          <p className="text-[10px] text-slate-500">
                            {feedback.timeAgo} • Ticket {feedback.ticketNumber}
                          </p>
                        </div>
                      </div>
                      {feedback.flagged && (
                        <span className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                          Flagged
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1 mb-2">{renderStars(feedback.rating)}</div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      {feedback.comment}
                    </p>
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">Re: {feedback.doctorName}</p>
                      <button 
                        onClick={() => {
                          setSelectedFeedback(feedback);
                          setShowDetailsModal(true);
                        }}
                        className="ml-auto text-primary text-xs font-semibold hover:underline"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
                <button className="relative w-full py-3 text-sm text-slate-700 dark:text-slate-200 font-bold bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(148,163,184,0.3)] hover:shadow-[0_0_30px_rgba(148,163,184,0.6),0_0_45px_rgba(148,163,184,0.3)] hover:-translate-y-1 hover:scale-[1.02]">
                  Load More Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Details Modal */}
      {showDetailsModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDetailsModal(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`size-12 rounded-full ${
                  selectedFeedback.flagged ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                } flex items-center justify-center ${
                  selectedFeedback.flagged ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
                } font-bold text-lg`}>
                  {selectedFeedback.patientInitials}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedFeedback.patientName}</h3>
                  <p className="text-sm text-slate-500">Ticket {selectedFeedback.ticketNumber} • {selectedFeedback.timeAgo}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {/* Rating */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Patient Rating</p>
                <div className="flex gap-1">
                  {renderStars(selectedFeedback.rating, 'md')}
                  <span className="ml-2 text-slate-600 dark:text-slate-300 font-bold">{selectedFeedback.rating}.0 / 5.0</span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Regarding</p>
                <p className="text-slate-900 dark:text-white font-semibold">{selectedFeedback.doctorName}</p>
              </div>

              {/* Feedback Comment */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Feedback Details</p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedFeedback.comment}</p>
              </div>

              {/* Status */}
              {selectedFeedback.flagged && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400">flag</span>
                    <p className="text-red-900 dark:text-red-100 font-semibold">Flagged for Review</p>
                  </div>
                  <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                    This complaint has been flagged for immediate review by the hospital administration team.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex gap-3 justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 rounded-lg bg-[#0EA5E9] text-white font-semibold hover:bg-[#0284C7] transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5">
                Take Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}