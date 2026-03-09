// Analytics and tracking utilities

/**
 * Track page view in Google Analytics
 */
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    });
  }
};

/**
 * Track custom event
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track tool usage
 */
export const trackToolUsage = (
  toolSlug: string,
  toolName: string,
  category: string
) => {
  trackEvent('tool_view', 'Tool', `${toolName} (${toolSlug})`, undefined);
  
  // Track separate event for category
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tool_usage', {
      tool_name: toolName,
      tool_slug: toolSlug,
      tool_category: category,
    });
  }
};

/**
 * Track file operations
 */
export const trackFileOperation = (
  operation: string,
  fileType: string,
  fileSize?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_operation', {
      operation: operation,
      file_type: fileType,
      file_size: fileSize,
    });
  }
};

/**
 * Track search
 */
export const trackSearch = (searchQuery: string, resultsCount: number) => {
  trackEvent('search', 'Search', searchQuery, resultsCount);
};

/**
 * Track download
 */
export const trackDownload = (fileName: string) => {
  trackEvent('download', 'Download', fileName);
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
