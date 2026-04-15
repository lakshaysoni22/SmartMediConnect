import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TestResult {
  id: string;
  testName: string;
  category: 'Blood' | 'Urine' | 'Imaging' | 'Other';
  date: string;
  status: 'Normal' | 'Abnormal' | 'Pending';
  doctor: string;
  parameters: {
    name: string;
    value: string;
    normalRange: string;
    unit: string;
    status: 'Normal' | 'High' | 'Low';
  }[];
  notes?: string;
  pdfAvailable: boolean;
}

export function PatientTestResultsAdvanced() {
  const [selectedTest, setSelectedTest] = useState<TestResult | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [testResults] = useState<TestResult[]>([
    {
      id: 'TEST-2026-001',
      testName: 'Complete Blood Count (CBC)',
      category: 'Blood',
      date: 'Jan 15, 2026',
      status: 'Normal',
      doctor: 'Dr. Sarah Mitchell',
      parameters: [
        { name: 'White Blood Cells', value: '7.2', normalRange: '4.5-11.0', unit: 'K/μL', status: 'Normal' },
        { name: 'Red Blood Cells', value: '5.1', normalRange: '4.5-5.5', unit: 'M/μL', status: 'Normal' },
        { name: 'Hemoglobin', value: '14.5', normalRange: '13.5-17.5', unit: 'g/dL', status: 'Normal' },
        { name: 'Hematocrit', value: '42', normalRange: '40-50', unit: '%', status: 'Normal' },
        { name: 'Platelets', value: '250', normalRange: '150-400', unit: 'K/μL', status: 'Normal' }
      ],
      notes: 'All blood parameters within normal limits. Continue current regimen.',
      pdfAvailable: true
    },
    {
      id: 'TEST-2026-002',
      testName: 'Lipid Panel',
      category: 'Blood',
      date: 'Jan 10, 2026',
      status: 'Abnormal',
      doctor: 'Dr. James Wilson',
      parameters: [
        { name: 'Total Cholesterol', value: '240', normalRange: '<200', unit: 'mg/dL', status: 'High' },
        { name: 'LDL Cholesterol', value: '160', normalRange: '<100', unit: 'mg/dL', status: 'High' },
        { name: 'HDL Cholesterol', value: '45', normalRange: '>40', unit: 'mg/dL', status: 'Normal' },
        { name: 'Triglycerides', value: '180', normalRange: '<150', unit: 'mg/dL', status: 'High' }
      ],
      notes: 'Elevated cholesterol and triglycerides. Recommend dietary modifications and statin therapy.',
      pdfAvailable: true
    },
    {
      id: 'TEST-2026-003',
      testName: 'Thyroid Function Test',
      category: 'Blood',
      date: 'Jan 5, 2026',
      status: 'Normal',
      doctor: 'Dr. Emily Chen',
      parameters: [
        { name: 'TSH', value: '2.1', normalRange: '0.4-4.0', unit: 'mIU/L', status: 'Normal' },
        { name: 'Free T4', value: '1.3', normalRange: '0.8-1.8', unit: 'ng/dL', status: 'Normal' },
        { name: 'Free T3', value: '3.2', normalRange: '2.3-4.2', unit: 'pg/mL', status: 'Normal' }
      ],
      notes: 'Thyroid function is normal.',
      pdfAvailable: true
    },
    {
      id: 'TEST-2026-004',
      testName: 'Urinalysis',
      category: 'Urine',
      date: 'Dec 28, 2025',
      status: 'Normal',
      doctor: 'Dr. Michael Brown',
      parameters: [
        { name: 'Color', value: 'Yellow', normalRange: 'Yellow', unit: '', status: 'Normal' },
        { name: 'pH', value: '6.0', normalRange: '4.5-8.0', unit: '', status: 'Normal' },
        { name: 'Protein', value: 'Negative', normalRange: 'Negative', unit: '', status: 'Normal' },
        { name: 'Glucose', value: 'Negative', normalRange: 'Negative', unit: '', status: 'Normal' },
        { name: 'Blood', value: 'Negative', normalRange: 'Negative', unit: '', status: 'Normal' }
      ],
      notes: 'No abnormalities detected.',
      pdfAvailable: true
    },
    {
      id: 'TEST-2026-005',
      testName: 'Chest X-Ray',
      category: 'Imaging',
      date: 'Dec 20, 2025',
      status: 'Normal',
      doctor: 'Dr. Lisa Anderson',
      parameters: [
        { name: 'Heart Size', value: 'Normal', normalRange: 'Normal', unit: '', status: 'Normal' },
        { name: 'Lung Fields', value: 'Clear', normalRange: 'Clear', unit: '', status: 'Normal' },
        { name: 'Mediastinum', value: 'Normal', normalRange: 'Normal', unit: '', status: 'Normal' }
      ],
      notes: 'No acute cardiopulmonary disease. Heart and lungs appear normal.',
      pdfAvailable: true
    },
    {
      id: 'TEST-2026-006',
      testName: 'HbA1c (Diabetes Check)',
      category: 'Blood',
      date: 'Dec 15, 2025',
      status: 'Abnormal',
      doctor: 'Dr. David Martinez',
      parameters: [
        { name: 'HbA1c', value: '7.8', normalRange: '<5.7', unit: '%', status: 'High' },
        { name: 'Fasting Glucose', value: '145', normalRange: '70-100', unit: 'mg/dL', status: 'High' }
      ],
      notes: 'Elevated HbA1c indicates poor glucose control. Medication adjustment needed.',
      pdfAvailable: true
    }
  ]);

  // Historical data for trend chart (Glucose over time)
  const glucoseTrendData = [
    { date: 'Oct', value: 110 },
    { date: 'Nov', value: 125 },
    { date: 'Dec', value: 145 },
    { date: 'Jan', value: 135 }
  ];

  // Historical data for cholesterol trend
  const cholesterolTrendData = [
    { date: 'Jul', total: 220, ldl: 140, hdl: 50 },
    { date: 'Oct', total: 235, ldl: 155, hdl: 48 },
    { date: 'Jan', total: 240, ldl: 160, hdl: 45 }
  ];

  const filteredTests = useMemo(() => {
    return testResults.filter(test => {
      const matchesCategory = filterCategory === 'all' || test.category.toLowerCase() === filterCategory.toLowerCase();
      const matchesStatus = filterStatus === 'all' || test.status.toLowerCase() === filterStatus.toLowerCase();
      return matchesCategory && matchesStatus;
    });
  }, [testResults, filterCategory, filterStatus]);

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Abnormal':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'Pending':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
    }
  };

  const getParameterStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'text-green-600 dark:text-green-400';
      case 'High':
      case 'Low':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  };

  const getCategoryIcon = (category: TestResult['category']) => {
    switch (category) {
      case 'Blood': return 'bloodtype';
      case 'Urine': return 'water_drop';
      case 'Imaging': return 'radiology';
      case 'Other': return 'lab_profile';
    }
  };

  return (
    <div className="h-full bg-slate-50 dark:bg-black flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-4xl">
                lab_profile
              </span>
              Test Results
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              View and track your medical test results
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Categories</option>
            <option value="blood">Blood Tests</option>
            <option value="urine">Urine Tests</option>
            <option value="imaging">Imaging</option>
            <option value="other">Other</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Results</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Tests List */}
        <div className={`${selectedTest ? 'hidden lg:block lg:w-1/2' : 'flex-1'} overflow-y-auto p-4 md:p-8 space-y-4`}>
          {/* Trends Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Health Trends</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Glucose Trend */}
              <div>
                <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Blood Glucose (mg/dL)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={glucoseTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Cholesterol Trend */}
              <div>
                <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Cholesterol (mg/dL)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={cholesterolTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} name="Total" />
                    <Line type="monotone" dataKey="ldl" stroke="#ef4444" strokeWidth={2} name="LDL" />
                    <Line type="monotone" dataKey="hdl" stroke="#10b981" strokeWidth={2} name="HDL" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Test Results */}
          {filteredTests.map((test) => (
            <div
              key={test.id}
              onClick={() => setSelectedTest(test)}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border transition-all cursor-pointer ${
                selectedTest?.id === test.id
                  ? 'border-green-500 dark:border-green-400 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-600'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-white text-2xl">{getCategoryIcon(test.category)}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{test.testName}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{test.category} Test</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span>{test.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-[16px]">person</span>
                      <span className="truncate">{test.doctor}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {test.pdfAvailable && (
                      <button className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-all text-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">download</span>
                        PDF
                      </button>
                    )}
                    <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredTests.length === 0 && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-8xl mb-4">
                lab_profile
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No test results found</h3>
              <p className="text-slate-600 dark:text-slate-400">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Test Detail */}
        {selectedTest && (
          <div className="flex-1 lg:w-1/2 overflow-y-auto bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800">
            <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedTest(null)}
                className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to results
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-white text-4xl">{getCategoryIcon(selectedTest.category)}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedTest.testName}</h2>
                <p className="text-lg text-green-600 dark:text-green-400 font-medium mt-1">{selectedTest.category} Test</p>
                <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-full border mt-3 ${getStatusColor(selectedTest.status)}`}>
                  {selectedTest.status}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Test Information</h3>
                
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400">calendar_today</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Test Date</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedTest.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400">person</span>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Ordered By</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{selectedTest.doctor}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Test Parameters</h3>
                <div className="space-y-3">
                  {selectedTest.parameters.map((param, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900 dark:text-white">{param.name}</h4>
                        <span className={`text-sm font-bold ${getParameterStatusColor(param.status)}`}>
                          {param.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Value</div>
                          <div className="font-semibold text-slate-900 dark:text-white">{param.value} {param.unit}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs text-slate-500 dark:text-slate-400">Normal Range</div>
                          <div className="font-semibold text-slate-900 dark:text-white">{param.normalRange} {param.unit}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTest.notes && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                  <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined">note</span>
                    Doctor's Notes
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200">{selectedTest.notes}</p>
                </div>
              )}

              <div className="flex gap-3">
                {selectedTest.pdfAvailable && (
                  <button className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">download</span>
                    Download PDF Report
                  </button>
                )}
                <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">share</span>
                  Share Results
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
