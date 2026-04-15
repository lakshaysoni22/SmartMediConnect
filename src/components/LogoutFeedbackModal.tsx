import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FeedbackSuccessModal } from './FeedbackSuccessModal';

interface LogoutFeedbackModalProps {
  onSubmit: () => void;
  onSkip: () => void;
  portalType: 'patient' | 'doctor' | 'admin';
}

export function LogoutFeedbackModal({ onSubmit, onSkip, portalType }: LogoutFeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [additionalThoughts, setAdditionalThoughts] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // DEBUG: Log when modal renders
  if (process.env.NODE_ENV === 'development') {
    console.log('🟢 LogoutFeedbackModal RENDERED - portalType:', portalType, 'showSuccessModal:', showSuccessModal);
  }

  const issueOptions = [
    'Ease of use',
    'App Performance',
    'Patient Data Access',
    'Lab Results Sync',
    'Stability'
  ];

  const toggleIssue = (issue: string) => {
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter(i => i !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  // Count words in additional thoughts
  const getWordCount = () => {
    const trimmedText = additionalThoughts.trim();
    if (!trimmedText) return 0;
    return trimmedText.split(/\s+/).length;
  };

  const wordCount = getWordCount();
  const minWords = 10;
  const isFormValid = wordCount >= minWords;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Collect feedback locally (no external API needed)
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 FEEDBACK COLLECTED:');
      console.log('Portal:', portalType.toUpperCase());
      console.log('Rating:', `${rating}/5 stars`);
      console.log('Issues:', selectedIssues.length > 0 ? selectedIssues.join(', ') : 'None');
      console.log('Thoughts:', additionalThoughts || 'No comments');
      console.log('Timestamp:', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
    }
    
    // Simulate API delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Show success modal
    setShowSuccessModal(true);
    setIsSubmitting(false);
  };

  const getTitle = () => {
    switch (portalType) {
      case 'patient':
        return 'Help us improve your healthcare experience';
      case 'doctor':
        return 'Help us improve your workspace';
      case 'admin':
        return 'Help us improve your administrative platform';
      default:
        return 'Help us improve your workspace';
    }
  };

  const getSubtitle = () => {
    switch (portalType) {
      case 'patient':
        return 'Your feedback helps us build a better platform for patient care.';
      case 'doctor':
        return 'Your feedback helps us build a better platform for clinical excellence.';
      case 'admin':
        return 'Your feedback helps us build a better platform for hospital management.';
      default:
        return 'Your feedback helps us build a better platform for clinical excellence.';
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Success Modal */}
      {showSuccessModal && (
        <FeedbackSuccessModal 
          onClose={onSubmit} 
          portalType={portalType === 'doctor' ? 'provider' : portalType}
        />
      )}

      {/* Feedback Form Modal */}
      {!showSuccessModal && (
        <div 
          className="relative w-full max-w-[540px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Icon */}
          <div className="pt-10 pb-6 px-8 text-center bg-gradient-to-b from-slate-50/50 dark:from-slate-800/50">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 mb-6">
              <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                volunteer_activism
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {getTitle()}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
              {getSubtitle()}
            </p>
          </div>

          {/* Content */}
          <div className="px-8 pb-8 space-y-6">
            {/* Star Rating */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 text-center">
                How was your {portalType === 'patient' ? 'experience' : 'shift'} today?
              </h3>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-all hover:scale-110 focus:outline-none"
                  >
                    <span 
                      className={`material-symbols-outlined text-[44px] transition-all ${
                        star <= (hoveredRating || rating)
                          ? 'text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' 
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                      style={{ 
                        fontVariationSettings: star <= (hoveredRating || rating) ? '"FILL" 1' : '"FILL" 0'
                      }}
                    >
                      star
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Issues Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-500">
                  tune
                </span>
                What could we improve?
              </h3>
              <div className="flex flex-wrap gap-2">
                {issueOptions.map((issue) => (
                  <button
                    key={issue}
                    type="button"
                    onClick={() => toggleIssue(issue)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border-2 ${
                      selectedIssues.includes(issue)
                        ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Thoughts */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-blue-500">
                    edit_note
                  </span>
                  Any additional thoughts? <span className="text-red-500">*</span>
                </h3>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  wordCount >= minWords 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700' 
                    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-300 dark:border-orange-700'
                }`}>
                  <span className="material-symbols-outlined text-[16px]">
                    {wordCount >= minWords ? 'check_circle' : 'edit_note'}
                  </span>
                  <span>{wordCount}/{minWords} words</span>
                </div>
              </div>
              <textarea
                value={additionalThoughts}
                onChange={(e) => setAdditionalThoughts(e.target.value)}
                placeholder="Please share your detailed feedback with us (minimum 10 words required)..."
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-sm ${
                  wordCount > 0 && wordCount < minWords
                    ? 'border-orange-300 dark:border-orange-700 focus:border-orange-500 dark:focus:border-orange-500'
                    : wordCount >= minWords
                    ? 'border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-500'
                    : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500'
                }`}
              />
              {wordCount > 0 && wordCount < minWords && (
                <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Please write at least {minWords - wordCount} more word{minWords - wordCount !== 1 ? 's' : ''} to submit your feedback
                </p>
              )}
              {wordCount >= minWords && (
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Great! Your feedback is ready to submit
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all text-white ${
                !isFormValid && !isSubmitting
                  ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed opacity-60'
                  : isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">
                    progress_activity
                  </span>
                  <span>Sending Feedback...</span>
                </>
              ) : !isFormValid ? (
                <>
                  <span className="material-symbols-outlined text-[20px]">
                    lock
                  </span>
                  <span>Write {minWords} words to unlock</span>
                </>
              ) : (
                <>
                  <span>Submit & Logout</span>
                  <span className="material-symbols-outlined text-[20px]">
                    logout
                  </span>
                </>
              )}
            </button>

            {/* Skip Link */}
            <button
              onClick={onSkip}
              className="w-full text-center text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium hover:underline"
            >
              Logout without feedback
            </button>

            {/* Footer Badge */}
            <div className="flex items-center justify-center gap-2 pt-2 pb-1">
              <span className="material-symbols-outlined text-blue-500/60 text-[16px]">
                lock
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
                Secure HIPAA Compliant Logout
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render using Portal to escape parent container
  return createPortal(modalContent, document.body);
}