import React, { useState } from 'react';

interface PatientInsuranceProps {
  onNavigate?: (page: string) => void;
}

export function PatientInsurance({ onNavigate }: PatientInsuranceProps) {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showClaimsModal, setShowClaimsModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);

  const handleDownloadCard = () => {
    setShowDownloadModal(true);
  };

  const handleUpdateDetails = () => {
    setShowUpdateModal(true);
  };

  const handleManageSubscription = () => {
    setShowSubscriptionModal(true);
  };

  const handleViewClaims = () => {
    setShowClaimsModal(true);
  };

  const handleContactBilling = () => {
    alert('📞 Contact Billing\n\nPhone: 1-800-BILLING (1-800-245-5464)\nEmail: billing@mediconnect.com\n\nOur billing specialists are available:\nMonday - Friday: 8:00 AM - 8:00 PM EST\nSaturday: 9:00 AM - 5:00 PM EST\n\nWe\'ll help you understand your EOB and resolve any claim issues.');
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-50/50 dark:bg-black">
      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Main Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Insurance Card */}
            <div className="lg:col-span-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-2xl p-8 border-t-4 border-t-[#137fec] shadow-lg relative overflow-hidden">
              {/* Background Icon */}
              <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[120px] text-[#137fec]">health_and_safety</span>
              </div>

              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 relative z-10">
                <div>
                  <h3 className="text-slate-900 dark:text-white text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#137fec]">verified_user</span>
                    Active Insurance
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Policy active until Dec 31, 2024</p>
                </div>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-bold uppercase tracking-wide border border-green-200 dark:border-green-800">
                  Active Coverage
                </span>
              </div>

              {/* Insurance Details */}
              <div className="bg-white/50 dark:bg-slate-700/50 rounded-xl p-6 border border-slate-100 dark:border-slate-600 shadow-sm mb-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Provider</p>
                    <p className="text-lg font-bold text-slate-800 dark:text-white">BlueCross Plan</p>
                    <p className="text-sm text-[#137fec] font-semibold">Premium Coverage</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Member ID</p>
                    <p className="text-lg font-mono font-medium text-slate-800 dark:text-white">XZY-8922-001</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Group No</p>
                    <p className="text-lg font-mono font-medium text-slate-800 dark:text-white">GRP-4421</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                <button 
                  onClick={handleDownloadCard}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  Download Digital Card
                </button>
                <button 
                  onClick={handleUpdateDetails}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">edit_document</span>
                  Update Details
                </button>
              </div>
            </div>

            {/* Premium Membership Card */}
            <div className="bg-white/85 dark:bg-slate-800/85 backdrop-blur-xl border border-orange-200/60 dark:border-orange-700/40 rounded-2xl p-8 border-t-4 border-t-orange-500 shadow-xl flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold">App Membership</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Your portal access level</p>
                  </div>
                  <div className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  </div>
                </div>

                {/* Premium Badge */}
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-black text-orange-600 dark:text-orange-400">Premium</span>
                  <span className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Auto-renewing monthly
                  </span>
                </div>

                {/* Benefits List */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-orange-500 text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                    Zero Co-pay on Telehealth
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-orange-500 text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                    Priority Lab Results
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <span className="material-symbols-outlined text-orange-500 text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                    24/7 Concierge Support
                  </li>
                </ul>
              </div>

              {/* Manage Button */}
              <button 
                onClick={handleManageSubscription}
                className="w-full py-2.5 rounded-lg bg-orange-600 text-white font-bold hover:bg-orange-700 transition-all shadow-md shadow-orange-500/20"
              >
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* YTD Deductible */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 shadow-lg">
              <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">receipt_long</span>
              </div>
              <h4 className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">YTD Deductible</h4>
              <div className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                $1,250 <span className="text-sm font-normal text-slate-400">/ $2,000</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">62% Met</p>
            </div>

            {/* Out-of-Pocket Max */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 shadow-lg">
              <div className="size-12 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">savings</span>
              </div>
              <h4 className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Out-of-Pocket Max</h4>
              <div className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                $2,100 <span className="text-sm font-normal text-slate-400">/ $5,000</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">42% Reached</p>
            </div>

            {/* Pending Claims */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 shadow-lg">
              <div className="size-12 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">pending_actions</span>
              </div>
              <h4 className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Pending Claims</h4>
              <div className="text-2xl font-black text-slate-900 dark:text-white mb-2">3</div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-tight">Recent visit to Dermatology requires additional info.</p>
              <button 
                onClick={handleViewClaims}
                className="mt-3 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline"
              >
                View Claims
              </button>
            </div>

            {/* Premium Savings */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 shadow-lg">
              <div className="size-12 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">loyalty</span>
              </div>
              <h4 className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Premium Savings</h4>
              <div className="text-2xl font-black text-slate-900 dark:text-white mb-2">$420</div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-tight">Saved this year through your Premium membership discounts.</p>
            </div>
          </div>

          {/* Coverage & Premium Benefits Table */}
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold">Coverage & Premium Benefits</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                Understand what is covered by your insurance vs. what is enhanced by your HealthPortal Premium subscription.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                      <th className="p-5 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider w-[40%]">
                        Service / Feature
                      </th>
                      <th className="p-5 text-slate-800 dark:text-white font-bold text-center w-[30%]">
                        Insurance Coverage
                        <span className="block text-[10px] font-normal text-slate-400 mt-1">Based on your PPO Plan</span>
                      </th>
                      <th className="p-5 text-orange-700 dark:text-orange-400 font-bold text-center w-[30%] bg-orange-50/30 dark:bg-orange-900/20">
                        Premium App Benefits
                        <span className="block text-[10px] font-normal text-orange-400 mt-1">Your current subscription</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-700/50">
                    <tr className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                      <td className="p-4 pl-8 font-medium text-slate-700 dark:text-slate-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-400">videocam</span>
                          General Telehealth Consult
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold">
                          100% Covered
                        </span>
                      </td>
                      <td className="p-4 text-center bg-orange-50/30 dark:bg-orange-900/10">
                        <span className="font-bold text-orange-600 dark:text-orange-400">Zero Wait Time</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                      <td className="p-4 pl-8 font-medium text-slate-700 dark:text-slate-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-400">prescriptions</span>
                          Prescription Delivery
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-semibold">
                          $15 Co-pay
                        </span>
                      </td>
                      <td className="p-4 text-center bg-orange-50/30 dark:bg-orange-900/10">
                        <span className="font-bold text-orange-600 dark:text-orange-400">Free Same-Day Delivery</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                      <td className="p-4 pl-8 font-medium text-slate-700 dark:text-slate-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-400">psychology</span>
                          Mental Health Therapy
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold">
                          80% Covered
                        </span>
                      </td>
                      <td className="p-4 text-center bg-orange-50/30 dark:bg-orange-900/10">
                        <span className="font-bold text-orange-600 dark:text-orange-400">Unlimited Messaging</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                      <td className="p-4 pl-8 font-medium text-slate-700 dark:text-slate-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-400">emergency</span>
                          Emergency Room Visit
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                          $250 Deductible
                        </span>
                      </td>
                      <td className="p-4 text-center bg-orange-50/30 dark:bg-orange-900/10">
                        <span className="text-slate-400">-</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                      <td className="p-4 pl-8 font-medium text-slate-700 dark:text-slate-200">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-slate-400">medical_information</span>
                          Specialist Referral
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold">
                          Requires Pre-auth
                        </span>
                      </td>
                      <td className="p-4 text-center bg-orange-50/30 dark:bg-orange-900/10">
                        <span className="font-bold text-orange-600 dark:text-orange-400">Expedited Processing</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="py-10 border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 rounded-xl px-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-[#137fec] shrink-0">
                <span className="material-symbols-outlined text-2xl">support_agent</span>
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-lg">Need help with insurance?</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-lg">
                  Our dedicated billing specialists can help you understand your Explanation of Benefits (EOB) or resolve claim issues.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowFAQModal(true)}
                className="px-5 py-2.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
              >
                View FAQs
              </button>
              <button 
                onClick={handleContactBilling}
                className="px-5 py-2.5 rounded-lg bg-[#137fec] text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
              >
                Contact Billing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Download Card Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#137fec] to-blue-600 px-8 py-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-white text-3xl">download</span>
                  <h3 className="text-2xl font-bold text-white">Download Insurance Card</h3>
                </div>
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-5xl" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Card Ready for Download</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Your digital insurance card has been prepared and is ready to download.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#137fec] text-3xl">picture_as_pdf</span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 dark:text-white">BlueCross_Insurance_Card.pdf</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">185 KB • Wallet Size</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="flex-1 px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('✅ Insurance card downloaded successfully!\n\nThe card has been saved to your downloads folder.\n\nYou can print it or save it to your mobile wallet.');
                    setShowDownloadModal(false);
                  }}
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#137fec] to-blue-600 text-white font-bold hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 transition-all"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Details Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#137fec] to-blue-600 px-8 py-6 border-b border-blue-700/20 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-white text-3xl">edit_document</span>
                  <h3 className="text-2xl font-bold text-white">Update Insurance Details</h3>
                </div>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Insurance Provider
                    </label>
                    <input
                      type="text"
                      defaultValue="BlueCross Health Shield"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Plan Type
                    </label>
                    <input
                      type="text"
                      defaultValue="PPO Platinum Plan"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Member ID
                    </label>
                    <input
                      type="text"
                      defaultValue="XZY-8922-001"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Group Number
                    </label>
                    <input
                      type="text"
                      defaultValue="GRP-4421"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all font-mono"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Policy Expiration Date
                    </label>
                    <input
                      type="date"
                      defaultValue="2024-12-31"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 flex gap-3">
                  <span className="material-symbols-outlined text-[#137fec] shrink-0">info</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Changes to your insurance information may require verification. You'll receive a confirmation email once the update is processed.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="flex-1 px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert('✅ Insurance details updated successfully!\n\nYour insurance information has been updated and will be verified within 24-48 hours.\n\nYou will receive a confirmation email shortly.');
                      setShowUpdateModal(false);
                    }}
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#137fec] to-blue-600 text-white font-bold hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Manage Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                  <h3 className="text-2xl font-bold text-white">Premium Subscription</h3>
                </div>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your Premium Membership</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage your subscription settings and billing information
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 mb-6 border border-purple-200 dark:border-purple-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Monthly Plan</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">$29.99/mo</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Active • Next billing: Jan 15, 2024
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Auto-renewal enabled</p>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-left flex items-center justify-between">
                  <span>Update Payment Method</span>
                  <span className="material-symbols-outlined text-[#137fec]">credit_card</span>
                </button>
                <button className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-left flex items-center justify-between">
                  <span>View Billing History</span>
                  <span className="material-symbols-outlined text-[#137fec]">receipt</span>
                </button>
                <button className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-left flex items-center justify-between">
                  <span>Upgrade to Annual (Save 20%)</span>
                  <span className="material-symbols-outlined text-green-600">trending_up</span>
                </button>
              </div>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to cancel your Premium subscription?\n\nYou will lose access to:\n• Zero Co-pay on Telehealth\n• Priority Lab Results\n• 24/7 Concierge Support\n\nYour subscription will remain active until the end of your current billing period.')) {
                    alert('❌ Subscription Cancelled\n\nYour Premium subscription has been cancelled and will remain active until Jan 15, 2024.\n\nYou can reactivate anytime from your settings.');
                    setShowSubscriptionModal(false);
                  }
                }}
                className="w-full px-6 py-3 rounded-lg border-2 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Claims Modal */}
      {showClaimsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-6 border-b border-orange-700/20 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-white text-3xl">pending_actions</span>
                  <h3 className="text-2xl font-bold text-white">Pending Claims</h3>
                </div>
                <button
                  onClick={() => setShowClaimsModal(false)}
                  className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="space-y-4">
                {/* Claim 1 */}
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Dermatology Consultation</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Dr. Sarah Johnson • Oct 18, 2023</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-bold">Action Required</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                    Additional medical records needed to process this claim. Please upload visit summary from your dermatologist.
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors">
                      Upload Documents
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-400 font-bold hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Claim 2 */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Laboratory Test - Blood Panel</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Quest Diagnostics • Oct 20, 2023</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-bold">Under Review</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                    Claim is being processed. Expected completion: 5-7 business days.
                  </p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                {/* Claim 3 */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">Cardiology Follow-up</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Dr. James Wilson • Oct 22, 2023</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold">Processing</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                    Pre-authorization approved. Claim submitted to insurance for payment.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                    Pre-auth Approved
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 flex gap-3">
                <span className="material-symbols-outlined text-[#137fec] shrink-0">info</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Need help with a claim? Contact our billing specialists at <strong>1-800-BILLING</strong> or email <strong>claims@medicare.com</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFAQModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#137fec] to-blue-600 px-8 py-6 border-b border-blue-700/20 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-white text-3xl">help</span>
                  <h3 className="text-2xl font-bold text-white">Insurance FAQs</h3>
                </div>
                <button
                  onClick={() => setShowFAQModal(false)}
                  className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="space-y-6">
                <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">How do I file a claim?</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Most claims are filed automatically by your healthcare provider. If you need to file manually, use the "Submit Claim" button in your dashboard and upload the required documentation.
                  </p>
                </div>
                <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">What is an Explanation of Benefits (EOB)?</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    An EOB is a statement from your insurance company explaining what costs they will cover for medical care or products you've received. It shows what was billed, what your insurance paid, and what you owe.
                  </p>
                </div>
                <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">How long does claim processing take?</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Standard claims are typically processed within 30 days. Premium members receive expedited processing within 7-10 business days. You'll receive email notifications about your claim status.
                  </p>
                </div>
                <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Can I use my insurance for telehealth visits?</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Yes! Your PPO Platinum Plan covers telehealth consultations at 100%. Premium members also get zero wait time for appointments.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">What's the difference between insurance coverage and Premium benefits?</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Your insurance coverage is provided by BlueCross and covers medical services. Premium benefits are additional perks from Medicare Systems that enhance your experience, like priority scheduling, faster results, and concierge support.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Still have questions?</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  Our support team is here to help 24/7
                </p>
                <button 
                  onClick={handleContactBilling}
                  className="px-6 py-3 rounded-lg bg-[#137fec] text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}