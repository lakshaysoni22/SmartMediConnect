import React from 'react';
import { createPortal } from 'react-dom';

export function TestModal({ onClose }: { onClose: () => void }) {
  console.log('🔵 TestModal RENDERING!');
  
  const content = (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-red-500/50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          TEST MODAL - CAN YOU SEE THIS?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          If you can see this, React Portal is working!
        </p>
        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold"
        >
          CLOSE TEST MODAL
        </button>
      </div>
    </div>
  );
  
  return createPortal(content, document.body);
}
