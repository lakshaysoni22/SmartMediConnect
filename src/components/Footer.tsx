import React, { useState, useEffect } from 'react';

interface FooterProps {
  onSecurity?: () => void;
  onNavigate?: (page: 'patient' | 'doctor' | 'admin') => void;
  onAboutUs?: () => void;
  onUpcoming?: () => void;
  showContactModal?: boolean;
  onContactModalChange?: (show: boolean) => void;
}

export function Footer({ onSecurity, onNavigate, onAboutUs, onUpcoming, showContactModal: externalShowModal, onContactModalChange }: FooterProps) {
  const [internalShowModal, setInternalShowModal] = useState(false);
  
  // Use external control if provided, otherwise use internal state
  const showContactModal = externalShowModal !== undefined ? externalShowModal : internalShowModal;
  const setShowContactModal = (show: boolean) => {
    if (onContactModalChange) {
      onContactModalChange(show);
    } else {
      setInternalShowModal(show);
    }
  };

  const handlePortalNavigation = (portal: 'patient' | 'doctor' | 'admin') => {
    if (onNavigate) {
      onNavigate(portal);
    }
  };

  return (
    <>
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-6">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg" 
                  style={{ 
                    width: '40px', 
                    height: '40px',
                    minWidth: '40px',
                    minHeight: '40px'
                  }}
                >
                  <span 
                    className="material-symbols-outlined" 
                    style={{ 
                      fontSize: '24px !important',
                      lineHeight: '24px !important',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    local_hospital
                  </span>
                </div>
                <span className="text-[22px] font-bold text-slate-900 dark:text-white tracking-tight">SmartMediConnect</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-xs leading-relaxed">
                Advancing healthcare through technology. Connecting patients, providers, and payers in a unified platform.
              </p>
              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.linkedin.com/in/lakshaysoni22" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="size-10 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-[#0077b5] dark:hover:bg-[#0077b5] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="size-10 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-[#ff0000] dark:hover:bg-[#ff0000] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
                  aria-label="YouTube"
                >
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <button
                  onClick={() => {
                    window.open('mailto:lakshaysoni012794@gmail.com', '_blank');
                  }}
                  className="size-10 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-[#137fec] dark:hover:bg-[#137fec] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer"
                  aria-label="Email"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 500" }}>mail</span>
                </button>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Platform</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => handlePortalNavigation('patient')}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Patient Portal
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handlePortalNavigation('doctor')}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Doctor Portal
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handlePortalNavigation('admin')}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Admin Portal
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onUpcoming}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    Upcoming
                    <span className="material-symbols-outlined text-[16px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={onAboutUs}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <button 
                    onClick={onSecurity}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
                  >
                    HIPAA Compliance
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onSecurity}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Security
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © 2026 SmartMediConnect. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-green-500">lock</span>
                256-bit Encrypted
              </span>
              <span className="hidden sm:block">•</span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-blue-500">verified_user</span>
                ISO 27001 Certified
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowContactModal(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 dark:border-gray-800 relative" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Header */}
            <div className="flex items-start gap-3 mb-6">
              <div className="size-12 rounded-xl bg-gradient-to-br from-[#137fec] to-[#0d5ab8] flex items-center justify-center text-white shadow-lg shadow-blue-500/30 flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>business</span>
              </div>
              <div className="pt-0.5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Connect with Our Sales Team</h3>
                <p className="text-sm text-slate-600 dark:text-gray-400">Let's discuss how SmartMediConnect can transform your healthcare operations</p>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Email Card */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]">mail</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">EMAIL</p>
                  </div>
                </div>
                <a 
                  href="mailto:lakshaysoni012794@gmail.com" 
                  className="text-sm font-bold text-blue-900 dark:text-blue-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block mb-1"
                >
                  Send us an email
                </a>
                <p className="text-[10px] text-blue-700 dark:text-blue-400">Click to compose message • Response within 24 hours</p>
              </div>

              {/* LinkedIn Card */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">LINKEDIN</p>
                  </div>
                </div>
                <a 
                  href="https://www.linkedin.com/in/lakshaysoni22" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-blue-900 dark:text-blue-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block mb-1"
                >
                  Visit our LinkedIn profile
                </a>
                <p className="text-[10px] text-blue-700 dark:text-blue-400">Follow for updates & insights</p>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-slate-700 dark:text-slate-300 text-[18px]">send</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Quick Contact Form</h4>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Work Email"
                    className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Organization Name"
                    className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <textarea
                  placeholder="How can we help you? (Optional)"
                  rows={3}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                ></textarea>
                
                <button
                  onClick={() => {
                    alert('Thank you! Our sales team will reach out within 1 business day.');
                    setShowContactModal(false);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#137fec] to-[#0d5ab8] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  Send Inquiry
                </button>
              </div>
            </div>

            {/* Footer Info */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/50">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[18px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <p className="text-xs text-blue-900 dark:text-blue-100 leading-relaxed">
                  Our enterprise sales team will reach out within <span className="font-bold">1 business day</span> to discuss pricing, implementation, and custom requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}