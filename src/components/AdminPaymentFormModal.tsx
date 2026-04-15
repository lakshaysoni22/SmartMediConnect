import React from 'react';

interface PaymentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentType: string;
  setPaymentType: (value: string) => void;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  originatingBank: string;
  setOriginatingBank: (value: string) => void;
  targetBank: string;
  setTargetBank: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  urgentProcessing: boolean;
  setUrgentProcessing: (value: boolean) => void;
  payeeSearch: string;
  setPayeeSearch: (value: string) => void;
}

export function AdminPaymentFormModal({
  isOpen,
  onClose,
  paymentType,
  setPaymentType,
  paymentMethod,
  setPaymentMethod,
  currency,
  setCurrency,
  amount,
  setAmount,
  dueDate,
  setDueDate,
  originatingBank,
  setOriginatingBank,
  targetBank,
  setTargetBank,
  description,
  setDescription,
  urgentProcessing,
  setUrgentProcessing,
  payeeSearch,
  setPayeeSearch
}: PaymentFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-start justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-5xl my-8" onClick={(e) => e.stopPropagation()}>
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5">
          <div className="bg-[#137fec] h-1.5 w-1/3 rounded-r-full"></div>
        </div>

        {/* Form Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Initiate Outgoing Payment</h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">Process salaries, vendor invoices, and operational expenses securely.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700">
              <span className="material-symbols-outlined text-[18px]">help</span>
              Help Guide
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form className="p-6 md:p-8 flex flex-col gap-10 max-h-[calc(100vh-300px)] overflow-y-auto">
          {/* Payment Classification */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-2">
              <div className="flex items-center justify-center size-8 rounded-full bg-blue-50 text-[#137fec] dark:bg-blue-900/30">
                <span className="material-symbols-outlined text-sm">category</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payment Classification</h3>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Transaction Type</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { value: 'salary', icon: 'stethoscope', label: 'Doctor Salary' },
                  { value: 'vendor', icon: 'inventory_2', label: 'Vendor Invoice' },
                  { value: 'utility', icon: 'electric_bolt', label: 'Utility' },
                  { value: 'refund', icon: 'currency_exchange', label: 'Patient Refund' },
                  { value: 'other', icon: 'pending', label: 'Other' }
                ].map((type) => (
                  <label key={type.value} className="cursor-pointer group">
                    <input 
                      type="radio" 
                      name="payment_type" 
                      value={type.value}
                      checked={paymentType === type.value}
                      onChange={(e) => setPaymentType(e.target.value)}
                      className="peer sr-only" 
                    />
                    <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:border-[#137fec]/50 transition-all peer-checked:border-[#137fec] peer-checked:bg-[#137fec]/5 peer-checked:ring-1 peer-checked:ring-[#137fec]">
                      <span className="material-symbols-outlined text-slate-400 peer-checked:text-[#137fec] group-hover:text-[#137fec] transition-colors">{type.icon}</span>
                      <span className="text-sm font-medium text-slate-600 peer-checked:text-[#137fec] dark:text-slate-300">{type.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Beneficiary Details */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-2">
              <div className="flex items-center justify-center size-8 rounded-full bg-blue-50 text-[#137fec] dark:bg-blue-900/30">
                <span className="material-symbols-outlined text-sm">person_search</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Beneficiary Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Payee Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input 
                    className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 py-3 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm" 
                    placeholder="Search by name, ID number, or department..." 
                    type="text"
                    value={payeeSearch}
                    onChange={(e) => setPayeeSearch(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button className="text-[#137fec] text-xs font-semibold hover:text-blue-700" type="button">ADVANCED SEARCH</button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Recently selected: <span className="cursor-pointer hover:text-[#137fec] hover:underline">Dr. Sarah Jenning</span>, <span className="cursor-pointer hover:text-[#137fec] hover:underline">Apex Medical Supplies</span></p>
              </div>
            </div>
          </section>

          {/* Financial Details */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-2">
              <div className="flex items-center justify-center size-8 rounded-full bg-blue-50 text-[#137fec] dark:bg-blue-900/30">
                <span className="material-symbols-outlined text-sm">payments</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Financial Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Payment Amount</label>
                <div className="flex rounded-lg shadow-sm">
                  <div className="relative">
                    <select 
                      className="h-full rounded-l-lg border-slate-300 border-r-0 bg-slate-50 py-3 pl-3 pr-8 text-slate-500 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm dark:bg-slate-900 dark:border-slate-600"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </div>
                  <div className="relative flex-grow focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-slate-500 sm:text-sm">$</span>
                    </div>
                    <input 
                      className="block w-full rounded-none rounded-r-lg border-slate-300 bg-white py-3 pl-7 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-lg font-semibold dark:bg-slate-900 dark:border-slate-600 dark:text-white" 
                      placeholder="0.00" 
                      step="0.01" 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="md:col-span-5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Due Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  </div>
                  <input 
                    className="block w-full rounded-lg border-slate-300 bg-white py-3 pl-10 pr-3 text-slate-900 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white" 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="md:col-span-12 pt-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Payment Method</label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: 'bank_transfer', icon: 'account_balance', label: 'Bank Transfer', subtitle: 'Processing: 1-3 Business Days' },
                    { value: 'cheque', icon: 'payments', label: 'Cheque', subtitle: 'Printed & Mailed' }
                  ].map((method) => (
                    <label key={method.value} className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none dark:bg-slate-800 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 flex-1">
                      <input 
                        type="radio" 
                        name="payment_method" 
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="peer sr-only" 
                      />
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <span className="block text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-slate-500 peer-checked:text-[#137fec]">{method.icon}</span>
                            {method.label}
                          </span>
                          <span className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">{method.subtitle}</span>
                        </span>
                      </span>
                      <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-[#137fec]"></span>
                      <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 rounded-full border border-slate-300 bg-white ring-1 ring-slate-300 peer-checked:border-[#137fec] peer-checked:bg-[#137fec] peer-checked:ring-0"></span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-12 pt-4 border-t border-slate-100 dark:border-slate-700 mt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Originating Bank Account <span className="text-red-500" title="Required for Bank Transfer">*</span>
                  </label>
                  <span className="text-xs font-medium text-[#137fec] cursor-pointer hover:underline">View Balance Details</span>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-hover:text-[#137fec] transition-colors">
                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                  </div>
                  <select 
                    className="block w-full rounded-lg border-slate-300 bg-white py-3 pl-10 pr-10 text-slate-900 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm appearance-none dark:bg-slate-900 dark:border-slate-600 dark:text-white shadow-sm transition-all hover:border-slate-400 cursor-pointer"
                    value={originatingBank}
                    onChange={(e) => setOriginatingBank(e.target.value)}
                  >
                    <option value="">Select hospital bank account...</option>
                    <option value="operating">St. Mary's General - Operating Fund (****8842)</option>
                    <option value="payroll">St. Mary's General - Payroll Account (****9931)</option>
                    <option value="capital">St. Mary's General - Capital Expenditure (****2219)</option>
                    <option value="research">St. Mary's General - Research Grants (****4550)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[14px] text-green-600">check_circle</span>
                  <span>Account verified. Sufficient funds available for this transaction.</span>
                </div>
              </div>

              <div className="md:col-span-12 pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Target Bank Selection <span className="text-red-500" title="Required">*</span>
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-hover:text-[#137fec] transition-colors">
                    <span className="material-symbols-outlined text-[20px]">account_balance</span>
                  </div>
                  <select 
                    className="block w-full rounded-lg border-slate-300 bg-white py-3 pl-10 pr-10 text-slate-900 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm appearance-none dark:bg-slate-900 dark:border-slate-600 dark:text-white shadow-sm transition-all hover:border-slate-400 cursor-pointer"
                    value={targetBank}
                    onChange={(e) => setTargetBank(e.target.value)}
                  >
                    <option value="">Select originating bank...</option>
                    <option value="chase">JPMorgan Chase - Operating (****1234)</option>
                    <option value="bofa">Bank of America - Payroll (****5678)</option>
                    <option value="citi">Citibank - Capital (****9012)</option>
                    <option value="wf">Wells Fargo - Emergency Fund (****3456)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Please ensure the selected bank has sufficient funds for the transaction.
                </p>
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 dark:border-slate-700 pb-2">
              <div className="flex items-center justify-center size-8 rounded-full bg-blue-50 text-[#137fec] dark:bg-blue-900/30">
                <span className="material-symbols-outlined text-sm">description</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Additional Information</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description / Purpose</label>
                <textarea 
                  className="block w-full rounded-lg border-slate-300 bg-slate-50 py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:border-[#137fec] focus:ring-[#137fec] sm:text-sm dark:bg-slate-900 dark:border-slate-600 dark:text-white resize-none" 
                  placeholder="Enter payment justification, reference numbers, or internal notes here..." 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-4 dark:bg-red-900/20 dark:border-red-900/30">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-red-600 dark:text-red-400">priority_high</span>
                  <div>
                    <h4 className="text-sm font-bold text-red-900 dark:text-red-100">Urgent Processing</h4>
                    <p className="text-xs text-red-700 dark:text-red-300 mt-1">Flag this payment for immediate review by the finance director.</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={urgentProcessing}
                    onChange={(e) => setUrgentProcessing(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </section>
        </form>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 z-40 rounded-b-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg border-t border-slate-200 dark:border-slate-700 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Secure TLS Encryption. Action will be logged.</span>
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <button 
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#137fec] dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700 transition-all" 
              type="button"
            >
              Cancel
            </button>
            <button 
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-[#137fec] bg-blue-50 border border-transparent rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#137fec] dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-all" 
              type="button"
            >
              Save Draft
            </button>
            <button 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#137fec] rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#137fec] transition-all" 
              type="button"
            >
              <span>Submit Payment</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
