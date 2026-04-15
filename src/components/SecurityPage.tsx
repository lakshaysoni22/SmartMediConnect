import React, { useState } from 'react';
import { PublicNavigation } from './PublicNavigation';
import { Footer } from './Footer';
import { HelpButton } from './HelpButton';
import { LanguageUtils } from '../utils/language';

interface SecurityFeature {
  icon: string;
  title: string;
  badge: string;
  badgeColor: 'green' | 'blue' | 'gray';
  description: string;
}

interface ProactiveItem {
  icon: string;
  title: string;
  description: string;
}

interface Certification {
  image?: string;
  icon?: string;
  title: string;
}

interface SecurityPageProps {
  onBack?: () => void;
  onHealthInfo?: () => void;
  onViewPlans?: () => void;
  onGetStarted?: () => void;
  onAboutUs?: () => void;
  onSymptomChecker?: () => void;
  onSecurity?: () => void;
  onUpcoming?: () => void;
}

export function SecurityPage({ 
  onBack, 
  onHealthInfo, 
  onGetStarted, 
  onSymptomChecker, 
  onViewPlans, 
  onAboutUs,
  onUpcoming,
  onSecurity 
}: SecurityPageProps) {
  const [language] = useState(() => LanguageUtils.get());
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const getBadgeClasses = (color: 'green' | 'blue' | 'gray') => {
    switch (color) {
      case 'green':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'gray':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const securityFeatures: SecurityFeature[] = [
    {
      icon: 'encrypted',
      title: 'AES-256 Encryption',
      badge: 'Active',
      badgeColor: 'green',
      description: 'All data is encrypted at rest and in transit using **military-grade AES-256** encryption standards.'
    },
    {
      icon: 'shield',
      title: 'HIPAA Compliant',
      badge: 'Certified',
      badgeColor: 'blue',
      description: 'Fully compliant with **HIPAA regulations** to protect patient health information and privacy.'
    },
    {
      icon: 'security',
      title: 'Multi-Factor Authentication',
      badge: 'Required',
      badgeColor: 'green',
      description: 'Enhanced account security with **2FA/MFA** to prevent unauthorized access to sensitive data.'
    },
    {
      icon: 'cloud_sync',
      title: 'Regular Backups',
      badge: 'Automated',
      badgeColor: 'blue',
      description: 'Automated **daily backups** with geo-redundant storage to ensure data availability and disaster recovery.'
    },
    {
      icon: 'verified_user',
      title: 'Access Control',
      badge: 'Role-Based',
      badgeColor: 'gray',
      description: 'Granular **role-based permissions** ensure users only access data necessary for their functions.'
    },
    {
      icon: 'bug_report',
      title: 'Continuous Monitoring',
      badge: '24/7',
      badgeColor: 'green',
      description: '**Real-time threat detection** and automated response systems monitor for suspicious activities around the clock.'
    }
  ];

  const proactiveItems: ProactiveItem[] = [
    {
      icon: 'security',
      title: 'Penetration Testing',
      description: 'Regular **ethical hacking exercises** conducted by certified security professionals to identify and fix vulnerabilities before malicious actors can exploit them.'
    },
    {
      icon: 'policy',
      title: 'Compliance Audits',
      description: 'Quarterly **third-party audits** verify our adherence to HIPAA, GDPR, SOC 2, and other healthcare data protection standards.'
    },
    {
      icon: 'crisis_alert',
      title: 'Incident Response Plan',
      description: 'Comprehensive **emergency protocols** with dedicated security teams ready to respond to any potential breach within minutes.'
    }
  ];

  const certifications: Certification[] = [
    { icon: 'verified', title: 'HIPAA Certified' },
    { icon: 'gpp_good', title: 'SOC 2 Type II' },
    { icon: 'shield', title: 'GDPR Compliant' },
    { icon: 'workspace_premium', title: 'ISO 27001' },
    { icon: 'security', title: 'PCI DSS' }
  ];

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
        currentPage="security"
        onHome={onBack}
        onSymptomChecker={onSymptomChecker}
        onHealthInfo={onHealthInfo}
        onViewPlans={onViewPlans}
        onGetStarted={onGetStarted}
        onAboutUs={onAboutUs}
        onSecurity={onSecurity}
      />

      {/* Main Content */}
      <main className="flex-1 pt-14">
        {/* Hero Section */}
        <section className="w-full pt-16 pb-8">
          <div className="max-w-[960px] mx-auto px-6 lg:px-10">
            <div className="flex flex-wrap justify-between items-end gap-6 p-4">
              <div className="flex max-w-3xl flex-col gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-600 w-fit border border-blue-100 dark:border-blue-800">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span className="text-slate-900 dark:text-white">Military-Grade Infrastructure</span>
                </div>
                <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
                  App Security: <span className="text-blue-600">Ultimate Masterpiece</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-relaxed">
                  A holistic, multi-layered defense strategy safeguarding sensitive healthcare data. From
                  quantum-safe encryption to AI-driven threat neutralization, we set the standard for digital
                  trust.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 h-12 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-bold rounded-lg transition-colors">
                  Live Status
                </button>
                <button className="px-6 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:border-blue-600 dark:hover:border-blue-600 text-sm font-bold rounded-lg transition-all shadow-sm">
                  Download Whitepaper
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Security Features Grid */}
        <section className="w-full py-8">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border border-white/50 dark:border-slate-800 flex flex-col gap-4 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClasses(
                        feature.badgeColor
                      )}`}
                    >
                      {feature.badge}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                      {renderTextWithBold(feature.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proactive Security Ecosystem */}
        <section className="w-full py-12 bg-transparent backdrop-blur-sm border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="text-center mb-10">
              <h2 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight">
                Proactive Security Ecosystem
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
                Our defense strategy goes beyond passive protection. We actively hunt threats, validate our
                security posture, and maintain rigorous global compliance through automated, continuous
                processes.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {proactiveItems.map((item, index) => {
                const isExpanded = expandedItems.includes(index);
                return (
                  <div
                    key={index}
                    className={`bg-white/60 dark:bg-slate-800/60 border rounded-lg transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? 'shadow-lg border-blue-200 dark:border-blue-800'
                        : 'border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <button
                      onClick={() => toggleExpanded(index)}
                      className={`flex justify-between items-center p-5 cursor-pointer w-full text-left group transition-all duration-200 ${
                        isExpanded
                          ? 'bg-blue-50/50 dark:bg-blue-900/10'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isExpanded
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-110'
                              : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
                          }`}
                        >
                          <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                        </div>
                        <h3
                          className={`text-lg font-bold transition-colors duration-200 ${
                            isExpanded
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {isExpanded && (
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full animate-[fadeIn_0.3s_ease-out]">
                            Expanded
                          </span>
                        )}
                        <span
                          className={`material-symbols-outlined transition-all duration-300 ${
                            isExpanded
                              ? 'rotate-180 text-blue-600 dark:text-blue-400'
                              : 'text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                          }`}
                        >
                          expand_more
                        </span>
                      </div>
                    </button>
                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        isExpanded
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-blue-100 dark:border-blue-900/30 pt-4 bg-gradient-to-b from-blue-50/30 to-transparent dark:from-blue-900/5">
                        <div className="animate-[slideDown_0.5s_ease-out]">
                          {renderTextWithBold(item.description)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="w-full py-16 bg-transparent backdrop-blur-sm border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-[1024px] mx-auto px-6 lg:px-10">
            <h2 className="text-slate-900 dark:text-white text-[24px] font-bold leading-tight text-center pb-12 uppercase opacity-90">
              Certified &amp; Trusted By Industry Leaders
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 group cursor-pointer"
                >
                  {cert.image ? (
                    <div
                      className="w-full h-20 bg-contain bg-center bg-no-repeat opacity-90 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundImage: `url("${cert.image}")` }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-20">
                      <span className="material-symbols-outlined text-6xl text-slate-400 group-hover:text-blue-600 transition-colors">
                        {cert.icon}
                      </span>
                    </div>
                  )}
                  <div className="h-px w-12 bg-slate-200 dark:bg-slate-600"></div>
                  <p className="text-xs font-bold text-center text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                    {cert.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onSecurity={onSecurity} onAboutUs={onAboutUs} onUpcoming={onUpcoming} />

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}