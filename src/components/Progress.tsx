'use client';

import { useState } from 'react';

interface ProgressBarProps {
  isActive: boolean;
  label?: string;
}

export function ProgressBar({ isActive, label = 'Processing...' }: ProgressBarProps) {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-4 flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
        </div>
        <p className="text-center text-sm font-medium text-slate-700">{label}</p>
      </div>
    </div>
  );
}

interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({ 
  progress, 
  size = 120, 
  strokeWidth = 8 
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2563eb"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <span className="absolute text-xl font-bold text-slate-900">
        {Math.round(progress)}%
      </span>
    </div>
  );
}

interface LinearProgressProps {
  progress: number; // 0-100
  showLabel?: boolean;
}

export function LinearProgress({ progress, showLabel = true }: LinearProgressProps) {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">Processing</span>
          <span className="font-medium text-slate-900">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Indeterminate progress bar for unknown duration tasks
export function IndeterminateProgress({ label }: { label?: string }) {
  return (
    <div className="w-full">
      {label && (
        <p className="mb-2 text-sm font-medium text-slate-700">{label}</p>
      )}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="absolute h-full w-1/3 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full bg-blue-600" />
      </div>
    </div>
  );
}
