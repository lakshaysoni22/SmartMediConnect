import React, { useState, useRef, useEffect } from 'react';
import { NotificationIcon } from './NotificationIcon';
import { AdminPaymentFormModal } from './AdminPaymentFormModal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Legend, Cell } from 'recharts';

type TimePeriod = 'This Month' | 'Last 30 Days' | 'Last Quarter' | 'This Year';

interface Transaction {
  id: number;
  date: string;
  patientName: string;
  patientImage: string;
  service: string;
  amount: number;
  status: 'Paid' | 'Pending';
}

interface Payout {
  id: number;
  date: string;
  reference: string;
  amount: number;
}

interface PeriodData {
  totalEarnings: number;
  earningsTrend: string;
  pendingPayments: number;
  deductions: number;
  deductionsTrend: string;
  avgPerPatient: number;
  consultations: number;
  surgeries: number;
  onCall: number;
  chartData: Array<{ label: string; value: number }>;
  transactions: Transaction[];
  payouts: Payout[];
  bonusProgress: number;
  revenueBySource: Array<{
    id: number;
    source: string;
    icon: string;
    amount: number;
    percentage: number;
    trend: string;
    color: string;
  }>;
}

export function AdminEarnings() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('This Month');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartView, setChartView] = useState<'weekly' | 'monthly'>('weekly');
  const [activeBar, setActiveBar] = useState<number | null>(null);
  
  // Payment form state
  const [paymentType, setPaymentType] = useState('salary');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [originatingBank, setOriginatingBank] = useState('operating');
  const [targetBank, setTargetBank] = useState('');
  const [description, setDescription] = useState('');
  const [urgentProcessing, setUrgentProcessing] = useState(false);
  const [payeeSearch, setPayeeSearch] = useState('');

  // Transaction table state
  const [activeTab, setActiveTab] = useState<'all' | 'hospital' | 'vendor' | 'utilities'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openActionMenu, setOpenActionMenu] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showActionResponse, setShowActionResponse] = useState(false);
  const [actionResponseMessage, setActionResponseMessage] = useState('');
  
  // Modal states
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Ref to store timeout IDs for cleanup
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, []);

  // Check dark mode on mount
  React.useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = localStorage.getItem('medicareAppDarkMode') === 'true';
      setIsDarkMode(darkMode);
    };
    
    checkDarkMode();
    
    // Listen for dark mode changes
    window.addEventListener('storage', checkDarkMode);
    return () => window.removeEventListener('storage', checkDarkMode);
  }, []);

  // Enhanced chart data with previous period comparison
  const weeklyChartData = [
    { name: 'Week 1', income: 4200, lastPeriod: 3800, target: 5000 },
    { name: 'Week 2', income: 6100, lastPeriod: 5500, target: 5000 },
    { name: 'Week 3', income: 4800, lastPeriod: 4200, target: 5000 },
    { name: 'Week 4', income: 7900, lastPeriod: 6800, target: 5000 },
    { name: 'Week 5', income: 5200, lastPeriod: 4900, target: 5000 },
    { name: 'Week 6', income: 6800, lastPeriod: 6200, target: 5000 },
    { name: 'Current', income: 12450, lastPeriod: 11200, target: 5000 }
  ];

  const monthlyChartData = [
    { name: 'Jan', income: 18200, lastPeriod: 16800, target: 20000 },
    { name: 'Feb', income: 22100, lastPeriod: 19500, target: 20000 },
    { name: 'Mar', income: 19800, lastPeriod: 18200, target: 20000 },
    { name: 'Apr', income: 25900, lastPeriod: 22800, target: 20000 },
    { name: 'May', income: 21200, lastPeriod: 19900, target: 20000 },
    { name: 'Jun', income: 24800, lastPeriod: 22200, target: 20000 },
    { name: 'Jul', income: 28450, lastPeriod: 25200, target: 20000 }
  ];

  const enhancedChartData = chartView === 'weekly' ? weeklyChartData : monthlyChartData;
  const avgIncome = enhancedChartData.reduce((sum, item) => sum + item.income, 0) / enhancedChartData.length;

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const current = payload[0].value;
      const previous = payload[1]?.value || 0;
      const change = ((current - previous) / previous * 100).toFixed(1);
      const isPositive = parseFloat(change) > 0;

      return (
        <div className={`${isDarkMode ? 'bg-slate-900/95 border-slate-700' : 'bg-white/95 border-slate-200'} border rounded-xl p-4 shadow-xl backdrop-blur-sm`}>
          <p className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{label}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Current:</span>
              <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                ${current.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
              <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Previous:</span>
              <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                ${previous.toLocaleString()}
              </span>
            </div>
            <div className={`flex items-center gap-1 pt-1 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <span className={`material-symbols-outlined text-[16px] ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {isPositive ? 'trending_up' : 'trending_down'}
              </span>
              <span className={`text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>vs previous</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // All transactions data
  const allTransactions = [
    { id: 1, payeeName: 'City General Hospital', payeeId: 'PAY-00245', category: 'Earnings', categoryType: 'hospital', date: 'Oct 24, 2023', amount: 5200, status: 'Completed', icon: 'domain', color: 'blue' },
    { id: 2, payeeName: 'MedTech Supplies Inc.', payeeId: 'INV-88921', category: 'Vendor', categoryType: 'vendor', date: 'Oct 23, 2023', amount: 4230.50, status: 'Pending Approval', icon: 'biotech', color: 'indigo' },
    { id: 3, payeeName: 'City Power & Light', payeeId: 'UTL-2023-10', category: 'Utility', categoryType: 'utilities', date: 'Oct 22, 2023', amount: 1200, status: 'Scheduled', icon: 'bolt', color: 'amber' },
    { id: 4, payeeName: 'St. Mary\'s Clinic', payeeId: 'PAY-00249', category: 'Earnings', categoryType: 'hospital', date: 'Oct 20, 2023', amount: 2620, status: 'Failed', icon: 'domain', color: 'blue' },
    { id: 5, payeeName: 'Apex Pharma Co.', payeeId: 'INV-88920', category: 'Vendor', categoryType: 'vendor', date: 'Oct 19, 2023', amount: 8450, status: 'Completed', icon: 'medication', color: 'emerald' },
    { id: 6, payeeName: 'Memorial Hospital', payeeId: 'PAY-00250', category: 'Earnings', categoryType: 'hospital', date: 'Oct 18, 2023', amount: 3850, status: 'Completed', icon: 'domain', color: 'blue' },
    { id: 7, payeeName: 'BioLab Services', payeeId: 'INV-88922', category: 'Vendor', categoryType: 'vendor', date: 'Oct 17, 2023', amount: 2100, status: 'Pending Approval', icon: 'science', color: 'purple' },
    { id: 8, payeeName: 'Water & Sewage Dept', payeeId: 'UTL-2023-11', category: 'Utility', categoryType: 'utilities', date: 'Oct 16, 2023', amount: 850, status: 'Completed', icon: 'water_drop', color: 'cyan' },
  ];

  // Filter transactions based on active tab
  const getFilteredByTab = () => {
    if (activeTab === 'all') return allTransactions;
    return allTransactions.filter(t => t.categoryType === activeTab);
  };

  // Filter by search query
  const getFilteredBySearch = (transactions: typeof allTransactions) => {
    if (!searchQuery.trim()) return transactions;
    const query = searchQuery.toLowerCase();
    return transactions.filter(t => 
      t.payeeName.toLowerCase().includes(query) ||
      t.payeeId.toLowerCase().includes(query)
    );
  };

  // Filter by status
  const getFilteredByStatus = (transactions: typeof allTransactions) => {
    if (statusFilter === 'all') return transactions;
    return transactions.filter(t => t.status === statusFilter);
  };

  // Apply all filters
  const filteredTransactions = getFilteredByStatus(
    getFilteredBySearch(
      getFilteredByTab()
    )
  );

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Handle action menu
  const handleAction = (action: string, transaction: any) => {
    setOpenActionMenu(null);
    setActionResponseMessage(`${action} action performed on ${transaction.payeeName} (${transaction.payeeId})`);
    setShowActionResponse(true);
    const timeout = setTimeout(() => setShowActionResponse(false), 3000);
    timeoutRefs.current.push(timeout);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'Pending Approval': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400';
      case 'Scheduled': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400';
      case 'Failed': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400';
    }
  };

  // Handle download report
  const handleDownloadReport = () => {
    setIsDownloading(true);
    setShowDownloadModal(true);
    
    // Simulate download process
    const timeout1 = setTimeout(() => {
      setIsDownloading(false);
      setDownloadSuccess(true);
      
      // Close modal after success
      const timeout2 = setTimeout(() => {
        setShowDownloadModal(false);
        setDownloadSuccess(false);
      }, 2000);
      timeoutRefs.current.push(timeout2);
    }, 2000);
    timeoutRefs.current.push(timeout1);
  };

  // Handle compare periods
  const handleComparePeriods = () => {
    setShowCompareModal(true);
  };

  const periodData: Record<TimePeriod, PeriodData> = {
    'This Month': {
      totalEarnings: 12450,
      earningsTrend: '+12.5%',
      pendingPayments: 3200,
      deductions: 1150,
      deductionsTrend: '-2%',
      avgPerPatient: 185,
      consultations: 8092,
      surgeries: 3112,
      onCall: 1245,
      chartData: [
        { label: 'Week 1', value: 4200 },
        { label: 'Week 2', value: 6100 },
        { label: 'Week 3', value: 4800 },
        { label: 'Week 4', value: 7900 },
        { label: 'Week 5', value: 5200 },
        { label: 'Week 6', value: 6800 },
        { label: 'Current', value: 12450 },
      ],
      transactions: [
        {
          id: 1,
          date: 'Oct 24, 2023',
          patientName: 'James Wilson',
          patientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          service: 'Cardiac Consultation',
          amount: 150,
          status: 'Paid',
        },
        {
          id: 2,
          date: 'Oct 23, 2023',
          patientName: 'Linda Martinez',
          patientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          service: 'Echocardiogram',
          amount: 450,
          status: 'Pending',
        },
        {
          id: 3,
          date: 'Oct 22, 2023',
          patientName: 'Robert Fox',
          patientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          service: 'Stress Test',
          amount: 300,
          status: 'Paid',
        },
        {
          id: 4,
          date: 'Oct 21, 2023',
          patientName: 'Emily Davis',
          patientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
          service: 'Routine Checkup',
          amount: 120,
          status: 'Paid',
        },
      ],
      payouts: [
        { id: 1, date: 'Oct 15, 2023', reference: '#TRX-9821', amount: 4250 },
        { id: 2, date: 'Sep 30, 2023', reference: '#TRX-8102', amount: 3890 },
        { id: 3, date: 'Sep 15, 2023', reference: '#TRX-7654', amount: 4120 },
      ],
      bonusProgress: 80,
      revenueBySource: [
        {
          id: 1,
          source: 'Insurance',
          icon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          amount: 8000,
          percentage: 64,
          trend: '+5%',
          color: '#0EA5E9',
        },
        {
          id: 2,
          source: 'Self-Pay',
          icon: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          amount: 3000,
          percentage: 24,
          trend: '+3%',
          color: '#FBBF24',
        },
        {
          id: 3,
          source: 'Government Grants',
          icon: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          amount: 1000,
          percentage: 8,
          trend: '+2%',
          color: '#10B981',
        },
      ],
    },
    'Last 30 Days': {
      totalEarnings: 11800,
      earningsTrend: '+10.2%',
      pendingPayments: 2850,
      deductions: 980,
      deductionsTrend: '-3%',
      avgPerPatient: 172,
      consultations: 7670,
      surgeries: 2950,
      onCall: 1180,
      chartData: [
        { label: 'Week 1', value: 3800 },
        { label: 'Week 2', value: 5600 },
        { label: 'Week 3', value: 4500 },
        { label: 'Week 4', value: 7200 },
        { label: 'Week 5', value: 4900 },
        { label: 'Week 6', value: 6300 },
        { label: 'Current', value: 11800 },
      ],
      transactions: [
        {
          id: 1,
          date: 'Oct 20, 2023',
          patientName: 'Michael Chen',
          patientImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
          service: 'Surgery Consultation',
          amount: 280,
          status: 'Paid',
        },
        {
          id: 2,
          date: 'Oct 18, 2023',
          patientName: 'Sarah Johnson',
          patientImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
          service: 'Follow-up Visit',
          amount: 120,
          status: 'Paid',
        },
        {
          id: 3,
          date: 'Oct 15, 2023',
          patientName: 'David Lee',
          patientImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
          service: 'Lab Tests',
          amount: 220,
          status: 'Pending',
        },
        {
          id: 4,
          date: 'Oct 12, 2023',
          patientName: 'Emma Watson',
          patientImage: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop',
          service: 'Physical Exam',
          amount: 95,
          status: 'Paid',
        },
      ],
      payouts: [
        { id: 1, date: 'Oct 10, 2023', reference: '#TRX-9805', amount: 3950 },
        { id: 2, date: 'Sep 25, 2023', reference: '#TRX-8095', amount: 3720 },
        { id: 3, date: 'Sep 10, 2023', reference: '#TRX-7642', amount: 4020 },
      ],
      bonusProgress: 75,
      revenueBySource: [
        {
          id: 1,
          source: 'Insurance',
          icon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          amount: 7500,
          percentage: 64,
          trend: '+5%',
          color: '#0EA5E9',
        },
        {
          id: 2,
          source: 'Self-Pay',
          icon: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          amount: 3500,
          percentage: 24,
          trend: '+3%',
          color: '#FBBF24',
        },
        {
          id: 3,
          source: 'Government Grants',
          icon: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          amount: 800,
          percentage: 8,
          trend: '+2%',
          color: '#10B981',
        },
      ],
    },
    'Last Quarter': {
      totalEarnings: 35600,
      earningsTrend: '+15.8%',
      pendingPayments: 8900,
      deductions: 3200,
      deductionsTrend: '-1.5%',
      avgPerPatient: 195,
      consultations: 23140,
      surgeries: 8904,
      onCall: 3556,
      chartData: [
        { label: 'Jul', value: 8200 },
        { label: 'Aug', value: 9500 },
        { label: 'Sep', value: 8800 },
        { label: 'Oct', value: 11200 },
        { label: 'Nov', value: 9600 },
        { label: 'Dec', value: 10400 },
        { label: 'Current', value: 35600 },
      ],
      transactions: [
        {
          id: 1,
          date: 'Dec 15, 2023',
          patientName: 'Alex Thompson',
          patientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          service: 'Major Surgery',
          amount: 2500,
          status: 'Paid',
        },
        {
          id: 2,
          date: 'Nov 28, 2023',
          patientName: 'Jessica Brown',
          patientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          service: 'ICU Care',
          amount: 1800,
          status: 'Pending',
        },
        {
          id: 3,
          date: 'Oct 30, 2023',
          patientName: 'Chris Evans',
          patientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          service: 'Emergency Care',
          amount: 950,
          status: 'Paid',
        },
        {
          id: 4,
          date: 'Oct 05, 2023',
          patientName: 'Olivia Miller',
          patientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
          service: 'Consultation',
          amount: 180,
          status: 'Paid',
        },
      ],
      payouts: [
        { id: 1, date: 'Dec 15, 2023', reference: '#TRX-9950', amount: 11850 },
        { id: 2, date: 'Nov 15, 2023', reference: '#TRX-9825', amount: 11200 },
        { id: 3, date: 'Oct 15, 2023', reference: '#TRX-9721', amount: 12550 },
      ],
      bonusProgress: 92,
      revenueBySource: [
        {
          id: 1,
          source: 'Insurance',
          icon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          amount: 25000,
          percentage: 64,
          trend: '+5%',
          color: '#0EA5E9',
        },
        {
          id: 2,
          source: 'Self-Pay',
          icon: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          amount: 8000,
          percentage: 24,
          trend: '+3%',
          color: '#FBBF24',
        },
        {
          id: 3,
          source: 'Government Grants',
          icon: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          amount: 2600,
          percentage: 8,
          trend: '+2%',
          color: '#10B981',
        },
      ],
    },
    'This Year': {
      totalEarnings: 148500,
      earningsTrend: '+22.3%',
      pendingPayments: 18400,
      deductions: 12800,
      deductionsTrend: '-2.8%',
      avgPerPatient: 205,
      consultations: 96525,
      surgeries: 37125,
      onCall: 14850,
      chartData: [
        { label: 'Jan', value: 9800 },
        { label: 'Feb', value: 10500 },
        { label: 'Mar', value: 11200 },
        { label: 'Apr', value: 12800 },
        { label: 'May', value: 11900 },
        { label: 'Jun', value: 13500 },
        { label: 'Current', value: 148500 },
      ],
      transactions: [
        {
          id: 1,
          date: 'Dec 28, 2023',
          patientName: 'William Davis',
          patientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          service: 'Comprehensive Surgery',
          amount: 4500,
          status: 'Paid',
        },
        {
          id: 2,
          date: 'Dec 20, 2023',
          patientName: 'Sophia Garcia',
          patientImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          service: 'Extended Care',
          amount: 3200,
          status: 'Pending',
        },
        {
          id: 3,
          date: 'Dec 10, 2023',
          patientName: 'James Rodriguez',
          patientImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          service: 'Critical Care',
          amount: 2800,
          status: 'Paid',
        },
        {
          id: 4,
          date: 'Nov 25, 2023',
          patientName: 'Isabella Martinez',
          patientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
          service: 'Specialist Consultation',
          amount: 420,
          status: 'Paid',
        },
      ],
      payouts: [
        { id: 1, date: 'Dec 15, 2023', reference: '#TRX-9999', amount: 49500 },
        { id: 2, date: 'Sep 15, 2023', reference: '#TRX-9875', amount: 48200 },
        { id: 3, date: 'Jun 15, 2023', reference: '#TRX-9652', amount: 50800 },
      ],
      bonusProgress: 95,
      revenueBySource: [
        {
          id: 1,
          source: 'Insurance',
          icon: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          amount: 100000,
          percentage: 64,
          trend: '+5%',
          color: '#0EA5E9',
        },
        {
          id: 2,
          source: 'Self-Pay',
          icon: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          amount: 35000,
          percentage: 24,
          trend: '+3%',
          color: '#FBBF24',
        },
        {
          id: 3,
          source: 'Government Grants',
          icon: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          amount: 13500,
          percentage: 8,
          trend: '+2%',
          color: '#10B981',
        },
      ],
    },
  };

  const currentData = periodData[selectedPeriod];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-black overflow-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0077b6] rounded-lg flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[22px]">payments</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Earning & Payment</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Track hospital income, payments, and manage all transactions</p>
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

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-5 custom-scrollbar">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-2">
          {/* Page Title & Actions */}
          <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-3 mb-1">
            {/* Title section removed */}
            <div className="flex flex-wrap items-center gap-3 ml-auto">
              {/* Download Button - FIRST */}
              <button className="flex items-center justify-center w-10 h-10 bg-[#136dec] hover:bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                <span className="material-symbols-outlined text-[20px]">download</span>
              </button>
              
              {/* This Month Dropdown - SECOND */}
              <div className="relative">
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as TimePeriod)}
                  className="h-10 pl-3 pr-10 bg-white dark:bg-[#1f2937] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-[#111418] dark:text-white focus:ring-[#136dec] focus:border-[#136dec] cursor-pointer shadow-sm outline-none appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23617289' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option>This Month</option>
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>This Year</option>
                </select>
              </div>

              {/* Payment Button - THIRD */}
              <button className="h-10 px-4 bg-[#136dec] hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2" onClick={() => setShowPaymentForm(true)}>
                <span className="material-symbols-outlined text-[20px]">payments</span>
                <span>Payment</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Total Earnings */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Earnings</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">${currentData.totalEarnings.toLocaleString()}.00</h3>
                </div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-[#0EA5E9]">
                  <span className="material-symbols-outlined text-xl">attach_money</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-teal-600 font-medium flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                  {currentData.earningsTrend}
                </span>
                <span className="text-slate-400 ml-2">from last month</span>
              </div>
            </div>

            {/* Pending Payments */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Payments</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">${currentData.pendingPayments.toLocaleString()}.00</h3>
                </div>
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600">
                  <span className="material-symbols-outlined text-xl">pending_actions</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  In Review
                </span>
              </div>
            </div>

            {/* Deductions */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Deductions</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">${currentData.deductions.toLocaleString()}.00</h3>
                </div>
                <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-lg text-rose-600">
                  <span className="material-symbols-outlined text-xl">remove_circle_outline</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-red-500 font-medium flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">trending_down</span>
                  {currentData.deductionsTrend}
                </span>
                <span className="text-slate-400 ml-2">this month</span>
              </div>
            </div>

            {/* Avg per Patient */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-white/5 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg. per Patient</p>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">${currentData.avgPerPatient}.00</h3>
                </div>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                  <span className="material-symbols-outlined text-xl">person_outline</span>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Average
                </span>
              </div>
            </div>
          </div>

          {/* Quick Pay Shortcuts */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Pay Shortcuts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Pay MedTech */}
              <button 
                onClick={() => setShowPaymentForm(true)}
                className="flex gap-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-4 items-center hover:shadow-md hover:border-[#137fec] transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <span className="material-symbols-outlined">biotech</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#137fec] transition-colors">Pay MedTech</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Vendor • Monthly</p>
                </div>
              </button>

              {/* Pay City Power */}
              <button 
                onClick={() => setShowPaymentForm(true)}
                className="flex gap-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-4 items-center hover:shadow-md hover:border-[#137fec] transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#137fec] transition-colors">Pay City Power</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Utility • Due in 2d</p>
                </div>
              </button>

              {/* Pay BioLab */}
              <button 
                onClick={() => setShowPaymentForm(true)}
                className="flex gap-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-4 items-center hover:shadow-md hover:border-[#137fec] transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <span className="material-symbols-outlined">science</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#137fec] transition-colors">Pay BioLab</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Services • Recurring</p>
                </div>
              </button>

              {/* Pay Apex Pharma */}
              <button 
                onClick={() => setShowPaymentForm(true)}
                className="flex gap-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-4 items-center hover:shadow-md hover:border-[#137fec] transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <span className="material-symbols-outlined">medication</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#137fec] transition-colors">Pay Apex Pharma</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Vendor • Supplies</p>
                </div>
              </button>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6">
            {/* Income Analysis Chart - Enhanced */}
            <div className="bg-white/95 dark:bg-[#101822]/80 backdrop-blur-[10px] rounded-xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-none border border-white/60 dark:border-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#111418] dark:text-white mb-1">Income Analysis</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Compare current vs previous period performance</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* View Toggle */}
                  <div className="flex bg-slate-100 dark:bg-slate-900 rounded-lg p-1">
                    <button
                      onClick={() => setChartView('weekly')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        chartView === 'weekly'
                          ? 'bg-white dark:bg-slate-700 text-[#136dec] dark:text-blue-400 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => setChartView('monthly')}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        chartView === 'monthly'
                          ? 'bg-white dark:bg-slate-700 text-[#136dec] dark:text-blue-400 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                  <button className="text-[#136dec] dark:text-blue-400 text-sm font-medium hover:underline whitespace-nowrap">
                    View Full Report
                  </button>
                </div>
              </div>

              {/* Stats Summary Row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl p-3 border border-blue-200/50 dark:border-blue-800/50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[#136dec] dark:text-blue-400 text-[18px]">trending_up</span>
                    <p className="text-xs font-medium text-[#136dec] dark:text-blue-400">Average</p>
                  </div>
                  <p className="text-lg font-bold text-[#111418] dark:text-white">
                    ${Math.round(avgIncome).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-xl p-3 border border-emerald-200/50 dark:border-emerald-800/50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px]">star</span>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Peak</p>
                  </div>
                  <p className="text-lg font-bold text-[#111418] dark:text-white">
                    ${Math.max(...enhancedChartData.map(d => d.income)).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 rounded-xl p-3 border border-purple-200/50 dark:border-purple-800/50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[18px]">percent</span>
                    <p className="text-xs font-medium text-purple-600 dark:text-purple-400">Growth</p>
                  </div>
                  <p className="text-lg font-bold text-[#111418] dark:text-white">+18.4%</p>
                </div>
              </div>
              
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={enhancedChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    onMouseMove={(state) => {
                      if (state.isTooltipActive) {
                        setActiveBar(state.activeTooltipIndex ?? null);
                      } else {
                        setActiveBar(null);
                      }
                    }}
                    onMouseLeave={() => setActiveBar(null)}
                  >
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.95}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.7}/>
                      </linearGradient>
                      <linearGradient id="colorIncomeLast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={isDarkMode ? '#334155' : '#e2e8f0'} 
                      opacity={isDarkMode ? 0.3 : 1}
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12, fontWeight: 500 }}
                      axisLine={{ stroke: isDarkMode ? '#475569' : '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12, fontWeight: 500 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      content={<CustomTooltip />}
                      cursor={{ fill: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)', radius: 8 }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="circle"
                      formatter={(value) => {
                        const labels: Record<string, string> = {
                          income: 'Current Period',
                          lastPeriod: 'Previous Period',
                          target: 'Target'
                        };
                        return <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{labels[value]}</span>;
                      }}
                    />
                    
                    {/* Previous Period Bars */}
                    <Bar 
                      dataKey="lastPeriod" 
                      fill="url(#colorIncomeLast)"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={50}
                      animationDuration={800}
                      animationBegin={0}
                    />
                    
                    {/* Current Period Bars */}
                    <Bar 
                      dataKey="income" 
                      fill="url(#colorIncome)"
                      radius={[8, 8, 0, 0]}
                      maxBarSize={50}
                      animationDuration={1000}
                      animationBegin={200}
                    >
                      {enhancedChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          fill={activeBar === index ? '#2563eb' : 'url(#colorIncome)'}
                          style={{ 
                            filter: activeBar === index ? 'drop-shadow(0 4px 6px rgba(59, 130, 246, 0.4))' : 'none',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      ))}
                    </Bar>

                    {/* Target Line */}
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke={isDarkMode ? '#f59e0b' : '#f97316'}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      animationDuration={1200}
                      animationBegin={400}
                    />

                    {/* Average Line */}
                    <Line 
                      type="monotone" 
                      dataKey={() => avgIncome}
                      stroke={isDarkMode ? '#10b981' : '#059669'}
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      dot={false}
                      name="Average"
                      animationDuration={1200}
                      animationBegin={600}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Chart Legend Info */}
              <div className="mt-4 flex flex-wrap gap-4 items-center justify-center text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-gray-600 dark:text-gray-400">Current Period</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-indigo-400 opacity-60"></div>
                  <span className="text-gray-600 dark:text-gray-400">Previous Period</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-0.5 bg-orange-500" style={{ clipPath: 'polygon(0 0, 33% 0, 33% 100%, 0 100%, 0 0, 66% 0, 66% 100%, 33% 100%)' }}></div>
                  <span className="text-gray-600 dark:text-gray-400">Target</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-0.5 bg-emerald-500" style={{ clipPath: 'polygon(0 0, 25% 0, 25% 100%, 0 100%, 0 0, 50% 0, 50% 100%, 25% 100%, 25% 0, 75% 0, 75% 100%, 50% 100%)' }}></div>
                  <span className="text-gray-600 dark:text-gray-400">Average</span>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Breakdown by Source */}
          <div className="bg-white/95 dark:bg-[#101822]/80 backdrop-blur-[10px] rounded-xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-none border border-white/60 dark:border-white/5">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#111418] dark:text-white">Revenue Breakdown by Source</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Detailed earnings from different payment channels</p>
              </div>
              <button className="text-[#136dec] text-sm font-medium hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">analytics</span>
                View Details
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentData.revenueBySource.map((source) => (
                <div key={source.id} className="relative group">
                  {/* Card */}
                  <div className="bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    {/* Header with Icon and Trend */}
                    <div className="flex justify-between items-start mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                        style={{ backgroundColor: source.color }}
                      >
                        <span className="material-symbols-outlined text-[28px]">
                          {source.source === 'Insurance' ? 'health_and_safety' : 
                           source.source === 'Self-Pay' ? 'payments' : 
                           'account_balance'}
                        </span>
                      </div>
                      <span 
                        className="flex items-center text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ 
                          backgroundColor: `${source.color}15`,
                          color: source.color
                        }}
                      >
                        <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
                        {source.trend}
                      </span>
                    </div>

                    {/* Source Name */}
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      {source.source}
                    </h4>

                    {/* Amount */}
                    <div className="mb-4">
                      <p className="text-3xl font-bold text-[#111418] dark:text-white">
                        ${source.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {source.percentage}% of total revenue
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-2 rounded-full transition-all duration-700 ease-out"
                        style={{ 
                          width: `${source.percentage}%`,
                          backgroundColor: source.color
                        }}
                      ></div>
                    </div>

                    {/* Percentage Badge */}
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Contribution
                      </span>
                      <span 
                        className="text-sm font-bold"
                        style={{ color: source.color }}
                      >
                        {source.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect Glow */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl -z-10"
                    style={{ backgroundColor: source.color }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Summary Footer */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-[#136dec]">
                    <span className="material-symbols-outlined text-[24px]">info</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Revenue from All Sources
                    </p>
                    <p className="text-xl font-bold text-[#111418] dark:text-white">
                      ${currentData.totalEarnings.toLocaleString()}.00
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleDownloadReport}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    Download Report
                  </button>
                  <button 
                    onClick={handleComparePeriods}
                    className="px-4 py-2 bg-[#136dec] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
                    Compare Periods
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Transactions Table */}
          <div className="bg-white/95 dark:bg-[#101822]/80 backdrop-blur-[10px] rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-none border border-white/60 dark:border-white/5 overflow-hidden relative">
            {/* Action Response Toast */}
            {showActionResponse && (
              <div className="absolute top-4 right-4 z-50 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideIn">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span className="text-sm font-medium">{actionResponseMessage}</span>
              </div>
            )}

            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#111418] dark:text-white">Payment Transactions</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredTransactions.length} {filteredTransactions.length === 1 ? 'result' : 'results'}
                </span>
              </div>
              
              {/* Tab Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button 
                  onClick={() => { setActiveTab('all'); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'all'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-[#136dec] dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  All Transactions
                </button>
                <button 
                  onClick={() => { setActiveTab('hospital'); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'hospital'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-[#136dec] dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  Hospital Payments
                </button>
                <button 
                  onClick={() => { setActiveTab('vendor'); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'vendor'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-[#136dec] dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  Vendor Invoices
                </button>
                <button 
                  onClick={() => { setActiveTab('utilities'); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'utilities'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-[#136dec] dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  Utilities
                </button>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="Search payee, ID..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-[#111418] dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#136dec] focus:border-transparent"
                  />
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-[#111418] dark:text-white"
                >
                  <option value="all">Status: All</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Failed">Failed</option>
                </select>
                <button 
                  onClick={() => { setSearchQuery(''); setStatusFilter('all'); setActiveTab('all'); setCurrentPage(1); }}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  title="Clear filters"
                >
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-400 text-[20px]">tune</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payee Details</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-${transaction.color}-100 dark:bg-${transaction.color}-900/30 flex items-center justify-center flex-shrink-0`}>
                              <span className={`material-symbols-outlined text-${transaction.color}-600 dark:text-${transaction.color}-400 text-[20px]`}>
                                {transaction.icon}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#111418] dark:text-white">{transaction.payeeName}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">ID: {transaction.payeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-${transaction.color}-50 dark:bg-${transaction.color}-900/30 text-${transaction.color}-700 dark:text-${transaction.color}-400`}>
                            {transaction.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{transaction.date}</td>
                        <td className="px-6 py-4 text-sm font-bold text-[#111418] dark:text-white">
                          ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center relative">
                          <button 
                            onClick={() => setOpenActionMenu(openActionMenu === transaction.id ? null : transaction.id)}
                            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                          </button>
                          
                          {/* Action Menu Dropdown */}
                          {openActionMenu === transaction.id && (
                            <div className="absolute right-0 top-full mt-1 z-50 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-[160px] py-1">
                              <button
                                onClick={() => handleAction('View', transaction)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                                View Details
                              </button>
                              <button
                                onClick={() => handleAction('Download', transaction)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Download
                              </button>
                              <button
                                onClick={() => handleAction('Retry', transaction)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined text-[18px]">refresh</span>
                                Retry Payment
                              </button>
                              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                              <button
                                onClick={() => handleAction('Delete', transaction)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="material-symbols-outlined text-gray-400 text-[48px]">search_off</span>
                          <p className="text-gray-500 dark:text-gray-400 font-medium">No transactions found</p>
                          <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredTransactions.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-semibold">{startIndex + 1}</span> to <span className="font-semibold">{Math.min(startIndex + itemsPerPage, filteredTransactions.length)}</span> of <span className="font-semibold">{filteredTransactions.length}</span> results
                </p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-400 text-[18px]">chevron_left</span>
                  </button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                            currentPage === page
                              ? 'bg-[#136dec] text-white'
                              : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                  
                  <button 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-400 text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #334155;
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

      {/* Payment Form Modal */}
      <AdminPaymentFormModal
        isOpen={showPaymentForm}
        onClose={() => setShowPaymentForm(false)}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        currency={currency}
        setCurrency={setCurrency}
        amount={amount}
        setAmount={setAmount}
        dueDate={dueDate}
        setDueDate={setDueDate}
        originatingBank={originatingBank}
        setOriginatingBank={setOriginatingBank}
        targetBank={targetBank}
        setTargetBank={setTargetBank}
        description={description}
        setDescription={setDescription}
        urgentProcessing={urgentProcessing}
        setUrgentProcessing={setUrgentProcessing}
        payeeSearch={payeeSearch}
        setPayeeSearch={setPayeeSearch}
      />

      {/* Download Report Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all">
            <div className="text-center">
              {isDownloading ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#136dec] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Preparing Report</h3>
                  <p className="text-slate-600 dark:text-slate-400">Generating your earnings report...</p>
                </>
              ) : downloadSuccess ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[40px]">check_circle</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Download Complete!</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Report saved: <span className="font-semibold">earnings_report_{selectedPeriod.toLowerCase().replace(/\s+/g, '_')}.pdf</span>
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Compare Periods Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowCompareModal(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Compare Periods</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Analyze revenue trends across different time periods</p>
              </div>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Period Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Period 1</label>
                  <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last Quarter</option>
                    <option>This Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Period 2</label>
                  <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white">
                    <option>Last Month</option>
                    <option>This Month</option>
                    <option>Last Quarter</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>

              {/* Comparison Results */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#136dec] dark:text-blue-400 text-[20px]">trending_up</span>
                    <p className="text-xs font-medium text-[#136dec] dark:text-blue-400">Revenue Change</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">+18.5%</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">$2,200 increase</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[20px]">payments</span>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Transactions</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">+24</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">More payments</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/10 rounded-xl p-4 border border-purple-200/50 dark:border-purple-800/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[20px]">analytics</span>
                    <p className="text-xs font-medium text-purple-600 dark:text-purple-400">Avg Transaction</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">$185</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">+$12 per transaction</p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Detailed Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Hospital Payments</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">$8,200</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+15%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Vendor Invoices</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">$3,500</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+22%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Utilities</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">$750</span>
                      <span className="text-xs font-bold text-red-600 dark:text-red-400">-5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-[#136dec] text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}