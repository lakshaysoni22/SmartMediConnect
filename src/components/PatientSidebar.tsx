import React from 'react';

interface PatientSidebarProps {
  activeNav: string;
  onNavigate: (nav: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function PatientSidebar({ activeNav, onNavigate, isCollapsed, onToggleCollapse }: PatientSidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'finddoctor', label: 'Find a Doctor', icon: 'person_search' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar_month' },
    { id: 'events', label: 'Events Hub', icon: 'event' },
    { id: 'healthbot', label: 'Health Bot', icon: 'smart_toy' },
    { id: 'messages', label: 'Messages', icon: 'chat_bubble', badge: 2 },
    { id: 'results', label: 'Test Results', icon: 'description' },
    { id: 'prescriptions', label: 'Prescriptions', icon: 'medication' },
    { id: 'feedback', label: 'Feedback', icon: 'rate_review' },
    { id: 'dataaccess', label: 'Data Access', icon: 'verified_user' },
    { id: 'settings', label: 'Profile', icon: 'person' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111418] relative z-10 shrink-0 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        {/* Hamburger Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-md z-30 group"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-[16px] group-hover:text-[#137fec] transition-colors">
            {isCollapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>

        <div className="flex flex-col h-full p-4 justify-between overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* User Profile */}
            {!isCollapsed ? (
              <div className="flex items-center gap-3 px-2">
                <div className="bg-gradient-to-br from-[#137fec] to-blue-600 rounded-full h-12 w-12 shadow-sm ring-2 ring-[#137fec]/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[24px]">person</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <h1 className="text-slate-900 dark:text-white font-bold leading-tight truncate">Lakshay Soni</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider truncate">Patient ID: 89204</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-[#137fec] to-blue-600 rounded-full h-12 w-12 shadow-sm ring-2 ring-[#137fec]/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[24px]">person</span>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative group ${
                    activeNav === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-[#137fec] border border-blue-100 dark:border-blue-800'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.label : ''}
                >
                  <span className="material-symbols-outlined text-[22px] shrink-0">{item.icon}</span>
                  {!isCollapsed && (
                    <>
                      <span className="text-sm font-medium truncate flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {isCollapsed && item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                      {item.label}
                    </div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            {/* Emergency Button */}
            <button 
              onClick={() => onNavigate('emergency')}
              className={`flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-12 bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-md hover:shadow-lg shrink-0 ${
                isCollapsed ? 'px-3' : 'px-4'
              }`}
              title={isCollapsed ? 'Emergency Support' : ''}
            >
              <span className="material-symbols-outlined text-[22px] shrink-0">emergency</span>
              {!isCollapsed && <span className="truncate">Emergency Support</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity ${
        isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`} onClick={onToggleCollapse}></div>

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 flex-col h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111418] z-50 transition-transform ${
        isCollapsed ? '-translate-x-full' : 'translate-x-0'
      }`}>
        <div className="flex flex-col h-full p-4 justify-between overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* Close Button */}
            <button
              onClick={onToggleCollapse}
              className="self-end p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 px-2">
              <div className="bg-gradient-to-br from-[#137fec] to-blue-600 rounded-full h-12 w-12 shadow-sm ring-2 ring-[#137fec]/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[24px]">person</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h1 className="text-slate-900 dark:text-white font-bold leading-tight truncate">Lakshay Soni</h1>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider truncate">Patient ID: 89204</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onToggleCollapse();
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    activeNav === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-[#137fec] border border-blue-100 dark:border-blue-800'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px] shrink-0">{item.icon}</span>
                  <span className="text-sm font-medium truncate flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            {/* Emergency Button */}
            <button 
              onClick={() => {
                onNavigate('emergency');
                onToggleCollapse();
              }}
              className="flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl h-12 px-4 bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-md hover:shadow-lg shrink-0"
            >
              <span className="material-symbols-outlined text-[22px] shrink-0">emergency</span>
              <span className="truncate">Emergency Support</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}