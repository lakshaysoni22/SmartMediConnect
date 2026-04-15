import React from 'react';
import { NotificationIcon } from './NotificationIcon';

interface PatientSectionHeaderProps {
  icon: string;
  title: string;
  subtitle: string;
  onNotificationClick?: () => void;
}

export function PatientSectionHeader({ 
  icon,
  title,
  subtitle,
  onNotificationClick
}: PatientSectionHeaderProps) {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Left: Icon + Title + Subtitle */}
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="w-10 h-10 bg-[#137fec] rounded-lg flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-white text-[22px]">{icon}</span>
          </div>
          
          {/* Title + Subtitle */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right: Notification Icon */}
        <NotificationIcon 
          onClick={onNotificationClick || (() => window.dispatchEvent(new CustomEvent('openNotificationCenter')))}
        />
      </div>
    </header>
  );
}