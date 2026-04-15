import React, { useState } from 'react';

export function HelpButton() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-slate-900 dark:bg-slate-800 hover:bg-[#137fec] dark:hover:bg-[#137fec] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        aria-label="Help"
      >
        <span className="material-symbols-outlined text-[28px]">help</span>
      </button>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 border border-slate-200 dark:border-gray-800 relative" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setShowHelp(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-[#137fec] to-[#0d5ab8] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Need Help?</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">We're here for you</p>
              </div>
            </div>

            {/* Help Options */}
            <div className="space-y-4">
              {/* Support Email */}
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[24px]">mail</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-1">Email Support</p>
                  <a 
                    href="mailto:support@mediconnect.health" 
                    className="text-sm font-bold text-blue-900 dark:text-blue-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    support@mediconnect.health
                  </a>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">24/7 Support Available</p>
                </div>
              </div>

              {/* Live Chat */}
              <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-100 dark:border-purple-800">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[24px]">chat</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-purple-900 dark:text-purple-300 uppercase tracking-wider mb-1">Live Chat</p>
                  <button className="text-sm font-bold text-purple-900 dark:text-purple-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    Start Chat
                  </button>
                  <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">Average response: 2 minutes</p>
                </div>
              </div>

              {/* Phone Support */}
              <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-100 dark:border-green-800">
                <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[24px]">call</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-green-900 dark:text-green-300 uppercase tracking-wider mb-1">Phone Support</p>
                  <a 
                    href="tel:+18005551234" 
                    className="text-sm font-bold text-green-900 dark:text-green-100 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    +1 (800) 555-1234
                  </a>
                  <p className="text-xs text-green-700 dark:text-green-400 mt-1">Mon-Fri, 8AM - 8PM EST</p>
                </div>
              </div>

              {/* Documentation */}
              <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-xl border border-amber-100 dark:border-amber-800">
                <div className="p-2 bg-amber-100 dark:bg-amber-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-[24px]">menu_book</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-1">Documentation</p>
                  <button className="text-sm font-bold text-amber-900 dark:text-amber-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    Browse Help Center
                  </button>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">FAQs, Guides & Tutorials</p>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
              <p className="text-xs text-red-900 dark:text-red-300 text-center leading-relaxed">
                <span className="font-bold">Medical Emergency?</span> Call <span className="font-bold">911</span> immediately
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}