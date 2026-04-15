import React, { useState, useEffect } from 'react';
import { PublicNavigation } from './PublicNavigation';
import { Footer } from './Footer';
import { HelpButton } from './HelpButton';

interface PlansPageProps {
  onBack?: () => void;
  onSymptomChecker?: () => void;
  onHealthInfo?: () => void;
  onGetStarted?: () => void;
  onAboutUs?: () => void;
  onSecurity?: () => void;
  onUpcoming?: () => void;
}

export function PlansPage({ 
  onBack, 
  onSymptomChecker, 
  onHealthInfo, 
  onGetStarted, 
  onAboutUs, 
  onSecurity, 
  onUpcoming 
}: PlansPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showCards, setShowCards] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    // Trigger card animations after page load
    const timer = setTimeout(() => setShowCards(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const plans = [
    {
      name: 'Basic',
      tagline: 'Essential Care',
      description: 'Perfect for individuals starting their health journey',
      monthlyPrice: 0,
      yearlyPrice: 0,
      priceLabel: 'Free',
      isPremium: false,
      isEnterprise: false,
      color: 'slate',
      features: [
        { text: 'Basic health records access', included: true },
        { text: 'Schedule appointments', included: true },
        { text: 'Symptom checker tool', included: true },
        { text: 'Email support', included: true },
        { text: 'Health tips & articles', included: true },
        { text: 'Priority support', included: false },
        { text: 'AI health assistant', included: false },
        { text: 'Specialist consultations', included: false },
      ],
      cta: 'Get Started Free',
    },
    {
      name: 'Standard',
      tagline: 'Most Popular',
      description: 'Comprehensive care for active health management',
      monthlyPrice: 18,
      yearlyPrice: 179,
      priceLabel: billingCycle === 'monthly' ? '$18' : '$179',
      isPremium: false,
      isEnterprise: false,
      color: 'blue',
      features: [
        { text: 'Everything in Basic', included: true },
        { text: 'Advanced health analytics', included: true },
        { text: 'Unlimited appointments', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Prescription management', included: true },
        { text: 'Lab results tracking', included: true },
        { text: 'AI health assistant', included: false },
        { text: 'Family account (up to 4)', included: false },
      ],
      cta: 'Upgrade to Standard',
    },
    {
      name: 'Premium',
      tagline: 'Complete Healthcare',
      description: 'Full-featured access with premium support',
      monthlyPrice: 28,
      yearlyPrice: 279,
      priceLabel: billingCycle === 'monthly' ? '$28' : '$279',
      isPremium: true,
      isEnterprise: false,
      color: 'purple',
      features: [
        { text: 'Everything in Standard', included: true },
        { text: '24/7 AI health assistant', included: true },
        { text: 'Unlimited specialist consultations', included: true },
        { text: 'Family account (unlimited)', included: true },
        { text: 'Priority phone & chat support', included: true },
        { text: 'Personalized health plans', included: true },
        { text: 'Annual health screening', included: true },
        { text: 'Dedicated care coordinator', included: true },
      ],
      cta: 'Get Premium Access',
    },
    {
      name: 'Enterprise',
      tagline: 'Custom Solutions',
      description: 'Tailored healthcare solutions for organizations',
      monthlyPrice: 0,
      yearlyPrice: 0,
      priceLabel: 'Custom',
      isPremium: false,
      isEnterprise: true,
      color: 'gradient',
      features: [
        { text: 'Everything in Premium', included: true },
        { text: 'Unlimited employee accounts', included: true },
        { text: 'Custom integrations & API access', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'On-premise deployment option', included: true },
        { text: '99.9% SLA guarantee', included: true },
        { text: 'Custom branding & white-label', included: true },
        { text: 'Advanced security & compliance', included: true },
      ],
      cta: 'Contact Sales',
    },
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
        currentPage="premium"
        onHome={onBack}
        onSymptomChecker={onSymptomChecker}
        onHealthInfo={onHealthInfo}
        onViewPlans={onBack}
        onGetStarted={onGetStarted}
        onAboutUs={onAboutUs}
        onSecurity={onSecurity}
        onUpcoming={onUpcoming}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center pt-32 pb-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl w-full flex flex-col gap-16">
          {/* Hero Section */}
          <section className="flex flex-col items-center text-center gap-6 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 uppercase tracking-wider">
                Premium Healthcare Plans
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight scroll-reveal-delay-1">
              Choose Your <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400">
                Perfect Plan
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed scroll-reveal-delay-2">
              Transparent pricing for comprehensive healthcare. All plans include HIPAA-compliant security, 
              secure data storage, and the ability to cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="mt-4 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl inline-flex items-center scroll-reveal-delay-3">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`btn-press px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`btn-press px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Annually
                <span className="text-[10px] bg-emerald-500 text-white px-2 py-1 rounded-full font-black">
                  SAVE 20%
                </span>
              </button>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-start max-w-7xl mx-auto w-full">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`
                  relative rounded-3xl transition-all duration-300
                  ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                  ${plan.isPremium ? 'md:scale-105 md:-mt-4 md:mb-4' : ''}
                  ${plan.isEnterprise ? 'md:scale-110 md:-mt-6 md:mb-6' : ''}
                `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Premium Glow Effect */}
                {plan.isPremium && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-blue-500 opacity-20 blur-xl animate-pulse"></div>
                )}

                {/* Enterprise Glow Effect */}
                {plan.isEnterprise && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-500 opacity-20 blur-xl animate-pulse"></div>
                )}

                {/* Card */}
                <div
                  className={`
                    relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden
                    border-2 transition-all duration-300 h-full flex flex-col
                    ${
                      plan.isPremium
                        ? 'premium-glow border-transparent shadow-2xl'
                        : plan.isEnterprise
                        ? 'border-amber-300 dark:border-amber-700 shadow-2xl shadow-amber-500/20 hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-[0_0_50px_rgba(251,146,60,0.5)] hover:scale-[1.03] hover:-translate-y-1'
                        : 'border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1'
                    }
                  `}
                >
                  {/* Popular Badge */}
                  {plan.tagline === 'Most Popular' && (
                    <div className="absolute top-0 right-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-black px-4 py-2 rounded-b-xl shadow-lg">
                      MOST POPULAR
                    </div>
                  )}

                  {/* Premium Badge */}
                  {plan.isPremium && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white text-center text-xs font-black py-3 uppercase tracking-wider">
                      ⭐ Recommended for Families
                    </div>
                  )}

                  {/* Enterprise Badge */}
                  {plan.isEnterprise && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white text-center text-xs font-black py-3 uppercase tracking-wider">
                      🏢 Best for Organizations
                    </div>
                  )}

                  {/* Content */}
                  <div className={`p-8 flex flex-col flex-grow ${plan.isPremium || plan.isEnterprise ? 'pt-16' : ''}`}>
                    {/* Header */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[48px] font-black text-slate-900 dark:text-white">
                          {plan.priceLabel}
                        </span>
                        {plan.monthlyPrice > 0 && (
                          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        )}
                      </div>
                      {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
                          Billed annually • Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice).toFixed(0)}
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => {
                        if (plan.isEnterprise) {
                          setShowContactModal(true);
                        }
                      }}
                      className={`
                        btn-press w-full py-4 rounded-xl font-bold text-base transition-all duration-300 mb-8
                        ${
                          plan.isPremium
                            ? 'btn-gradient-pulse bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-1'
                            : plan.isEnterprise
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-1'
                            : plan.color === 'blue'
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
                        }
                      `}
                    >
                      {plan.cta}
                    </button>

                    {/* Features List */}
                    <div className="space-y-4 flex-grow">
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                        What's Included:
                      </p>
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className={`
                            flex items-start gap-3 transition-all duration-300
                            ${showCards ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                          `}
                          style={{
                            transitionDelay: `${index * 100 + idx * 50}ms`,
                          }}
                        >
                          {feature.included ? (
                            <span className="tick-pop-in flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          ) : (
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 flex items-center justify-center">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </span>
                          )}
                          <span
                            className={`text-sm ${
                              feature.included
                                ? 'text-slate-700 dark:text-slate-300 font-medium'
                                : 'text-slate-400 dark:text-slate-600 line-through'
                            }`}
                          >
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Microcopy */}
                    <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 fade-in-on-scroll visible">
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                        Cancel anytime • No hidden charges
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Trust Badges */}
          <section className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto scroll-reveal">
            <div className="breathing-animation flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
              <span className="icon-pulse material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">
                verified_user
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">HIPAA Compliant</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your data is secure</p>
              </div>
            </div>

            <div className="breathing-animation flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
              <span className="icon-pulse material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-3xl">
                lock
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Secure Payments</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Bank-grade encryption</p>
              </div>
            </div>

            <div className="breathing-animation flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
              <span className="icon-pulse material-symbols-outlined text-purple-600 dark:text-purple-400 text-3xl">
                support_agent
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">24/7 Support</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Always here to help</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-3xl mx-auto w-full scroll-reveal">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-center mb-12">
              Have questions? We're here to help.
            </p>

            <div className="space-y-4">
              {[
                {
                  q: 'Can I change my plan later?',
                  a: 'Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately, and we will prorate any charges.',
                },
                {
                  q: 'Is my health data secure?',
                  a: 'Absolutely. We use bank-grade encryption and are fully HIPAA compliant. Your data is stored securely and never shared without your explicit consent.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, debit cards, and PayPal. All transactions are processed through secure, encrypted connections.',
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'Yes. If you are not satisfied within the first 30 days, we offer a full refund—no questions asked.',
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <summary className="cursor-pointer font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    {faq.q}
                    <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform duration-300">
                      expand_more
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center max-w-2xl mx-auto scroll-reveal">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Join thousands of patients managing their health with confidence.
            </p>
            <button
              onClick={onGetStarted}
              className="btn-ripple btn-press inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-3xl hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              <span>Start Your Free Trial</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              No credit card required • Start with our free Basic plan
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer 
        onSecurity={onSecurity}
        onAboutUs={onAboutUs}
        onUpcoming={onUpcoming}
      />
      <HelpButton />

      {/* Contact Sales Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 group"
            >
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                close
              </span>
            </button>

            {/* Modal Content */}
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <span className="material-symbols-outlined text-white text-3xl">
                    business
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                    Contact Sales
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Let's discuss your enterprise needs
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:sales@smartmediconnect.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 border-2 border-transparent hover:border-orange-500 transition-all duration-200 hover:scale-110"
                    title="Email us"
                  >
                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 text-2xl">
                      mail
                    </span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 border-2 border-transparent hover:border-blue-500 transition-all duration-200 hover:scale-110"
                    title="Connect on LinkedIn"
                  >
                    <svg className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowContactModal(false); }}>
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Company & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Company"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Company Size */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Company Size *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                  >
                    <option value="">Select company size</option>
                    <option value="1-50">1-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Tell us about your needs
                  </label>
                  <textarea
                    rows={4}
                    placeholder="What are your organization's healthcare management requirements?"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-base bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <span className="material-symbols-outlined">send</span>
                </button>

                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  Our sales team will contact you within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}