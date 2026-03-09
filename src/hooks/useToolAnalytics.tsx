'use client';

import { useEffect, useCallback } from 'react';
import { trackToolUsage, trackFileOperation } from '@/lib/analytics';
import { trackToolUsage as trackHistory } from '@/lib/tool-history';

interface UseToolAnalyticsProps {
  toolSlug: string;
  toolName: string;
  toolCategory: string;
  toolIcon?: string;
}

/**
 * Hook for tracking tool usage and operations
 */
export function useToolAnalytics({
  toolSlug,
  toolName,
  toolCategory,
  toolIcon,
}: UseToolAnalyticsProps) {
  // Track initial tool view
  useEffect(() => {
    trackToolUsage(toolSlug, toolName, toolCategory);
    
    // Also add to tool history
    trackHistory({
      slug: toolSlug,
      name: toolName,
      category: toolCategory,
      icon: toolIcon,
    });
  }, [toolSlug, toolName, toolCategory, toolIcon]);

  // Track file operations
  const trackOperation = useCallback(
    (operation: string, fileType: string, fileSize?: number) => {
      trackFileOperation(operation, fileType, fileSize);
    },
    []
  );

  // Track conversion/processing success
  const trackSuccess = useCallback(
    (metadata?: Record<string, string | number>) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'tool_success', {
          tool_name: toolName,
          tool_category: toolCategory,
          ...metadata,
        });
      }
    },
    [toolName, toolCategory]
  );

  // Track errors
  const trackError = useCallback(
    (errorMessage: string, errorType?: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'tool_error', {
          tool_name: toolName,
          tool_category: toolCategory,
          error_message: errorMessage,
          error_type: errorType || 'unknown',
        });
      }
    },
    [toolName, toolCategory]
  );

  // Track download
  const trackDownloadEvent = useCallback(
    (fileType: string, fileSize?: number) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'tool_download', {
          tool_name: toolName,
          file_type: fileType,
          file_size: fileSize,
        });
      }
    },
    [toolName]
  );

  return {
    trackOperation,
    trackSuccess,
    trackError,
    trackDownload: trackDownloadEvent,
  };
}

interface ToolAnalyticsWrapperProps {
  toolSlug: string;
  toolName: string;
  toolCategory: string;
  toolIcon?: string;
  children: (analytics: ReturnType<typeof useToolAnalytics>) => React.ReactNode;
}

/**
 * Wrapper component that provides analytics tracking functions to children
 */
export function ToolAnalyticsWrapper({
  toolSlug,
  toolName,
  toolCategory,
  toolIcon,
  children,
}: ToolAnalyticsWrapperProps) {
  const analytics = useToolAnalytics({ toolSlug, toolName, toolCategory, toolIcon });
  
  return <>{children(analytics)}</>;
}
