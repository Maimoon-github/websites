'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import Link from 'next/link';

interface CartContextType {
  bagCount: number;
  addToBag: (name: string) => void;
  toastText: string;
  isToastVisible: boolean;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [bagCount, setBagCount] = useState(0);
  const [toastText, setToastText] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const dismissToast = useCallback(() => {
    setIsToastVisible(false);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  }, []);

  const addToBag = useCallback((name: string) => {
    setBagCount((prev) => prev + 1);
    setToastText(`${name} added to your bag`);
    setIsToastVisible(true);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setIsToastVisible(false);
      toastTimerRef.current = null;
    }, 4000);
  }, []);

  return (
    <CartContext.Provider
      value={{
        bagCount,
        addToBag,
        toastText,
        isToastVisible,
        dismissToast,
      }}
    >
      {children}

      {/* Cart Notification Toast — The single permitted dark Ink surface */}
      {isToastVisible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 bottom-6 -translate-x-1/2 z-50 flex items-center gap-3 bg-raka-ink text-raka-paper rounded-card px-4 py-3.5 shadow-e3 max-w-[92vw] transition-all duration-base"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#CF8F63"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="flex-none"
          >
            <path d="M5 12l5 5 9-10" />
          </svg>
          <span className="text-[14px] text-raka-paper font-normal whitespace-nowrap">
            {toastText}
          </span>
          <Link
            href="/cart"
            className="text-[14px] font-bold text-raka-alpenglow hover:text-raka-copper no-underline transition-colors ml-1"
          >
            View bag
          </Link>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
