import React, { useState, useCallback, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DarkModeUtils } from './utils/darkMode';

// ✅ PRODUCTION BULLETPROOF - NO LAZY LOADING = ZERO SUSPENSION ERRORS
// All components eagerly loaded for maximum stability and zero errors
import { LandingPage } from './components/LandingPage';
import { PortalSelection } from './components/PortalSelection';
import { PatientPortal } from './components/PatientPortal';
import { ProviderPortal } from './components/ProviderPortal';
import { AdminPortal } from './components/AdminPortal';
import { PatientDashboard } from './components/PatientDashboard';
import { PlansPage } from './components/PlansPage';
import { SymptomCheckerPage } from './components/SymptomCheckerPage';
import { HealthInfoPage } from './components/HealthInfoPage';
import { SecurityPage } from './components/SecurityPage';
import { AboutUs } from './components/AboutUs';
import { UpcomingPage } from './components/UpcomingPage';

type View = 'landing' | 'portal-selection' | 'patient-portal' | 'provider-portal' | 'admin-portal' | 'patient-dashboard' | 'plans' | 'symptom-checker' | 'health-info' | 'security' | 'about-us' | 'upcoming';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');

  // Initialize dark mode on mount
  useEffect(() => {
    DarkModeUtils.init();
  }, []);

  // ✅ OPTIMIZED - Memoized navigation handlers prevent unnecessary re-renders
  const handleGetStarted = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('portal-selection');
  }, []);

  const handleViewPlans = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('plans');
  }, []);

  const handleSymptomChecker = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('symptom-checker');
  }, []);

  const handleHealthInfo = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('health-info');
  }, []);

  const handleSecurity = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('security');
  }, []);

  const handleAboutUs = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('about-us');
  }, []);

  const handleUpcoming = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('upcoming');
  }, []);

  const handleBackToLanding = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('landing');
  }, []);

  const handleBackToPortalSelection = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('portal-selection');
  }, []);

  const handlePatientLogin = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('patient-dashboard');
  }, []);

  const handlePatientLogout = useCallback(() => {
    // Clear dark mode on logout
    document.documentElement.classList.remove('dark');
    localStorage.setItem('mediconnectAppDarkMode', 'false');
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCurrentView('portal-selection');
  }, []);

  const handleSelectPortal = useCallback((portal: 'patient' | 'provider' | 'admin') => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    switch (portal) {
      case 'patient':
        setCurrentView('patient-portal');
        break;
      case 'provider':
        setCurrentView('provider-portal');
        break;
      case 'admin':
        setCurrentView('admin-portal');
        break;
    }
  }, []);

  const handleFooterNavigate = useCallback((page: 'patient' | 'doctor' | 'admin') => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    switch (page) {
      case 'patient':
        setCurrentView('patient-portal');
        break;
      case 'doctor':
        setCurrentView('provider-portal');
        break;
      case 'admin':
        setCurrentView('admin-portal');
        break;
    }
  }, []);

  // ✅ PRODUCTION OPTIMIZED - Direct render without lazy loading
  // No Suspense needed = No suspension errors = 100% stable
  const renderView = () => {
    switch (currentView) {
      case 'patient-dashboard':
        return (
          <PatientDashboard 
            onLogout={handlePatientLogout}
            onSwitchRole={handleBackToPortalSelection}
          />
        );
      
      case 'patient-portal':
        return (
          <PatientPortal 
            onBack={handleBackToPortalSelection}
            onLogin={handlePatientLogin}
          />
        );
      
      case 'provider-portal':
        return <ProviderPortal onBack={handleBackToPortalSelection} />;
      
      case 'admin-portal':
        return <AdminPortal onBack={handleBackToPortalSelection} />;
      
      case 'portal-selection':
        return (
          <PortalSelection 
            onBack={handleBackToLanding}
            onSelectPortal={handleSelectPortal}
            onViewPlans={handleViewPlans}
            onSymptomChecker={handleSymptomChecker}
            onHealthInfo={handleHealthInfo}
            onSecurity={handleSecurity}
          />
        );
      
      case 'plans':
        return (
          <PlansPage 
            onBack={handleBackToLanding}
            onSymptomChecker={handleSymptomChecker}
            onHealthInfo={handleHealthInfo}
            onGetStarted={handleGetStarted}
            onAboutUs={handleAboutUs}
            onSecurity={handleSecurity}
            onUpcoming={handleUpcoming}
          />
        );
      
      case 'symptom-checker':
        return (
          <SymptomCheckerPage 
            onBack={handleBackToLanding}
            onHealthInfo={handleHealthInfo}
            onViewPlans={handleViewPlans}
            onGetStarted={handleGetStarted}
            onAboutUs={handleAboutUs}
            onSecurity={handleSecurity}
            onUpcoming={handleUpcoming}
          />
        );
      
      case 'health-info':
        return (
          <HealthInfoPage 
            onBack={handleBackToLanding}
            onSymptomChecker={handleSymptomChecker}
            onViewPlans={handleViewPlans}
            onGetStarted={handleGetStarted}
            onAboutUs={handleAboutUs}
            onSecurity={handleSecurity}
            onUpcoming={handleUpcoming}
          />
        );
      
      case 'security':
        return (
          <SecurityPage 
            onBack={handleBackToLanding}
            onGetStarted={handleGetStarted}
            onViewPlans={handleViewPlans}
            onSymptomChecker={handleSymptomChecker}
            onHealthInfo={handleHealthInfo}
            onAboutUs={handleAboutUs}
            onSecurity={handleSecurity}
            onUpcoming={handleUpcoming}
          />
        );
      
      case 'about-us':
        return (
          <AboutUs 
            onBack={handleBackToLanding}
            onGetStarted={handleGetStarted}
            onViewPlans={handleViewPlans}
            onSymptomChecker={handleSymptomChecker}
            onHealthInfo={handleHealthInfo}
            onSecurity={handleSecurity}
            onUpcoming={handleUpcoming}
          />
        );
      
      case 'upcoming':
        return (
          <UpcomingPage 
            onBack={handleBackToLanding}
            onSecurity={handleSecurity}
            onAboutUs={handleAboutUs}
            onSymptomChecker={handleSymptomChecker}
            onHealthInfo={handleHealthInfo}
            onViewPlans={handleViewPlans}
            onGetStarted={handleGetStarted}
            onUpcoming={handleUpcoming}
          />
        );
      
      case 'landing':
      default:
        return (
          <LandingPage 
            onGetStarted={handleGetStarted}
            onViewPlans={handleViewPlans}
            onSymptomChecker={handleSymptomChecker}
            onHealthInfo={handleHealthInfo}
            onSecurity={handleSecurity}
            onAboutUs={handleAboutUs}
            onNavigate={handleFooterNavigate}
            onUpcoming={handleUpcoming}
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      {renderView()}
    </ErrorBoundary>
  );
}
