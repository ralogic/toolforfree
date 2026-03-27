'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const FloatingShapes = dynamic(() => import('@/components/FloatingShapes'), {
  ssr: false,
});

const GradientOrbs = dynamic(() => import('@/components/GradientOrbs'), {
  ssr: false,
});

const ToastContainer = dynamic(
  () => import('@/components/Toast').then((module) => ({ default: module.ToastContainer })),
  { ssr: false }
);

type IdleTaskHandle = number | ReturnType<typeof setTimeout>;

type IdleCapableRuntime = typeof globalThis & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

export default function DeferredGlobalUI() {
  const [showEffects, setShowEffects] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const runtime = globalThis as IdleCapableRuntime;

    const scheduleIdleTask = (callback: () => void): IdleTaskHandle => {
      if (typeof runtime.requestIdleCallback === 'function') {
        return runtime.requestIdleCallback(callback, { timeout: 1200 });
      }

      return runtime.setTimeout(callback, 300);
    };

    const cancelIdleTask = (handle: IdleTaskHandle) => {
      if (typeof runtime.cancelIdleCallback === 'function') {
        runtime.cancelIdleCallback(handle as number);
        return;
      }

      runtime.clearTimeout(handle);
    };

    const navigatorWithConnection = navigator as NavigatorWithConnection;
    const saveData = navigatorWithConnection.connection?.saveData === true;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;

    const toastHandle = scheduleIdleTask(() => setShowToast(true));
    const effectsHandle = !saveData && !prefersReducedMotion && !isMobileViewport
      ? scheduleIdleTask(() => setShowEffects(true))
      : null;

    return () => {
      cancelIdleTask(toastHandle);
      if (effectsHandle !== null) {
        cancelIdleTask(effectsHandle);
      }
    };
  }, []);

  return (
    <>
      {showEffects ? (
        <>
          <FloatingShapes />
          <GradientOrbs />
        </>
      ) : null}
      {showToast ? <ToastContainer /> : null}
    </>
  );
}