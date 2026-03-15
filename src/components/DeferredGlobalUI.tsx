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

type IdleCallbackHandle = number;

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

export default function DeferredGlobalUI() {
  const [showEffects, setShowEffects] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const scheduleIdleTask = (callback: () => void): IdleCallbackHandle => {
      if ('requestIdleCallback' in window) {
        return window.requestIdleCallback(callback, { timeout: 1200 });
      }

      return window.setTimeout(callback, 300);
    };

    const cancelIdleTask = (handle: IdleCallbackHandle) => {
      if ('cancelIdleCallback' in window) {
        window.cancelIdleCallback(handle);
        return;
      }

      window.clearTimeout(handle);
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