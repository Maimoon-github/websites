'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = usePortfolio();

  if (toasts.length === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="p-4 bg-[#141414] border border-[#3c3c3c] border-l-4 border-l-[#e22718] text-white text-xs sm:text-sm shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200 pointer-events-auto"
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-[#ff6a55] shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="w-4 h-4 text-[#f4b400] shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#3ec46d] shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
