import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface AdminSettingsTabHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function AdminSettingsTabHeader({ activeTab, onTabChange }: AdminSettingsTabHeaderProps) {
  const tabs: Tab[] = [
    { id: 'profile', label: 'My Profile', icon: 'person' },
    { id: 'security', label: 'Security', icon: 'lock' },
    { id: 'hospital', label: 'Hospital Config', icon: 'domain' }
  ];

  return (
    <div className="border-b border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-[#137fec] text-[#137fec] dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                : 'border-transparent text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {tab.icon}
            </span>
            <span className="text-sm font-semibold whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
