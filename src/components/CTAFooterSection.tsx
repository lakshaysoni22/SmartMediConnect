import React, { useState } from 'react';

interface CTAFooterSectionProps {
  onGetStarted?: () => void;
}

export function CTAFooterSection({ onGetStarted }: CTAFooterSectionProps) {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      {/* CTA Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to Transform Healthcare?
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join the network of modern hospitals using Mediconnect to save lives and improve efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setShowContactModal(true)}
                className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                Request a Demo
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <button 
                onClick={() => setShowContactModal(true)}
                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold text-base hover:bg-white/10 hover:border-white/50 transition-all duration-200"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Request Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowContactModal(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 border border-slate-200 dark:border-gray-800 relative" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-[#137fec] to-[#0d5ab8] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>contact_support</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Request a Demo</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">We'll get back to you soon</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-100 dark:border-purple-800">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-[24px]">mail</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-purple-900 dark:text-purple-300 uppercase tracking-wider mb-1">Email</p>
                  <a 
                    href="mailto:sales@mediconnect.health" 
                    className="text-sm font-bold text-purple-900 dark:text-purple-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    sales@mediconnect.health
                  </a>
                  <p className="text-xs text-purple-700 dark:text-purple-400 mt-1">Sales Team Available</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-100 dark:border-green-800">
                <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-[24px]">call</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-green-900 dark:text-green-300 uppercase tracking-wider mb-1">Phone</p>
                  <a 
                    href="tel:+18005551234" 
                    className="text-sm font-bold text-green-900 dark:text-green-100 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    +1 (800) 555-1234
                  </a>
                  <p className="text-xs text-green-700 dark:text-green-400 mt-1">Mon-Fri, 9AM - 6PM EST</p>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
              <p className="text-xs text-blue-900 dark:text-blue-300 text-center leading-relaxed">
                <span className="font-bold">Demo includes:</span> Full platform tour, custom integration discussion, and pricing details
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}