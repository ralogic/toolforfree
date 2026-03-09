'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

let toastCounter = 0;

// Toast manager singleton
class ToastManager {
  private listeners: Set<(toasts: Toast[]) => void> = new Set();
  private toasts: Toast[] = [];

  subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  addToast(message: string, type: Toast['type'] = 'info', duration = 3000) {
    const toast: Toast = {
      id: `toast-${toastCounter++}-${Date.now()}`,
      message,
      type,
      duration,
    };

    this.toasts = [...this.toasts, toast];
    this.notify();

    if (duration > 0) {
      setTimeout(() => this.removeToast(toast.id), duration);
    }

    return toast.id;
  }

  removeToast(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.toasts));
  }
}

const toastManager = new ToastManager();

// Toast notification component
export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = toastManager.subscribe(setToasts);
    return () => {
      unsubscribe();
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 sm:bottom-4 sm:right-4"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const handleClose = useCallback(() => {
    toastManager.removeToast(toast.id);
  }, [toast.id]);

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-orange-600',
    info: 'bg-blue-600',
  }[toast.type];

  const icon = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }[toast.type];

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex min-w-[300px] max-w-md items-center gap-3 rounded-xl ${bgColor} px-4 py-3 text-white shadow-lg transition-all duration-300 animate-in slide-in-from-right`}
    >
      <span className="text-xl" aria-hidden="true">
        {icon}
      </span>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={handleClose}
        className="rounded-lg p-1 transition-colors hover:bg-white/20"
        aria-label="Close notification"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

// Utility functions to show toasts
export const toast = {
  success: (message: string, duration?: number) =>
    toastManager.addToast(message, 'success', duration),
  error: (message: string, duration?: number) =>
    toastManager.addToast(message, 'error', duration),
  warning: (message: string, duration?: number) =>
    toastManager.addToast(message, 'warning', duration),
  info: (message: string, duration?: number) =>
    toastManager.addToast(message, 'info', duration),
};
