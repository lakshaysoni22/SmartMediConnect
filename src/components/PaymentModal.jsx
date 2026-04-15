import React, { useState } from 'react';

const paymentOptions = [
  { id: 'paypal', title: 'PayPal', icon: 'account_balance_wallet' },
  { id: 'visa', title: 'Visa Card', icon: 'credit_card' },
  { id: 'upi', title: 'UPI', icon: 'payments' }
];

export function PaymentModal({ isOpen, onClose, bookingDetails }) {
  const [selectedMethod, setSelectedMethod] = useState('paypal');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handlePayNow = () => {
    setSuccessMessage('Payment Successful & Appointment Confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Complete Payment</h3>
          <button
            onClick={() => {
              setSuccessMessage('');
              onClose();
            }}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Close payment modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Booking Summary</p>
            <div className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <p>Doctor: {bookingDetails?.doctorName || 'Dr. Sarah Jenkins'}</p>
              <p>Date: {bookingDetails?.date || 'Oct 26, 2023'} at {bookingDetails?.time || '10:30 AM'}</p>
              <p>Fee: ${bookingDetails?.fee || 120}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Payment Method</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {paymentOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedMethod(option.id)}
                  className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all flex flex-col items-center gap-1 ${
                    selectedMethod === option.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{option.icon}</span>
                  {option.title}
                </button>
              ))}
            </div>
          </div>

          {successMessage ? (
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {successMessage}
            </div>
          ) : null}

          <button
            onClick={handlePayNow}
            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg shadow-md transition-all"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
