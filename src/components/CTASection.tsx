import React, { useState } from 'react';

export function CTASection({ onGetStarted, onContactSales }: { onGetStarted: () => void; onContactSales?: () => void }) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });

  const handleRequestDemo = () => {
    setShowDemoModal(true);
  };

  const handleSubmitDemo = (e: React.FormEvent) => {
    e.preventDefault();
    // Show success message
    alert(`✅ Demo Request Submitted Successfully!\n\nThank you, ${formData.name}!\n\nOur sales team will contact you at ${formData.email} within 24 hours to schedule your personalized demo.\n\nYou will receive a confirmation email shortly.`);
    setShowDemoModal(false);
    setFormData({ name: '', email: '', phone: '', organization: '', message: '' });
  };

  const handleContactSales = () => {
    if (onContactSales) {
      onContactSales();
    } else {
      alert('📧 Contact Sales\n\nEmail: sales@mediconnect.com\nPhone: 1-800-MEDICONNECT\n\nOr fill out the contact form and we\'ll reach out to you within 24 hours.');
    }
  };

  return (
    <>
      <section id="contact" className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden relative group">
            {/* Background Blurs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#137fec] opacity-30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:opacity-40 transition-opacity duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 opacity-20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 group-hover:opacity-30 transition-opacity duration-1000"></div>

            <div className="relative z-10 px-8 py-20 text-center">
              <h2 className="font-bold text-white mb-6 text-3xl md:text-5xl">
                Ready to Transform Healthcare?
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
                Join the network of modern hospitals using Mediconnect to save lives and improve efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleRequestDemo}
                  className="bg-white text-[#137fec] hover:bg-slate-100 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-white/20 hover:-translate-y-1"
                >
                  Request a Demo
                </button>
                <button 
                  onClick={handleContactSales}
                  className="bg-transparent border-2 border-white/30 hover:bg-white/10 hover:border-white/50 text-white px-8 py-4 rounded-xl font-bold transition-all"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#137fec] to-blue-600 px-8 py-6 border-b border-blue-700/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Request a Demo</h3>
                  <p className="text-blue-100 text-sm">Schedule your personalized SmartMediConnect demo</p>
                </div>
                <button
                  onClick={() => setShowDemoModal(false)}
                  className="size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmitDemo} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                    placeholder="john@hospital.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all"
                    placeholder="General Hospital"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your healthcare needs and what you'd like to see in the demo..."
                />
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-4 mb-6 flex gap-3">
                <span className="material-symbols-outlined text-[#137fec] shrink-0">info</span>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Our team typically responds within <strong>24 hours</strong>. You'll receive a confirmation email immediately after submitting this form.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(false)}
                  className="flex-1 px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#137fec] to-blue-600 text-white font-bold hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}