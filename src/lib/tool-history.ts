'use client';

import { useEffect, useState } from 'react';

export interface ToolHistoryItem {
  slug: string;
  name: string;
  category: string;
  timestamp: number;
  icon?: string;
}

const MAX_HISTORY_ITEMS = 10;
const STORAGE_KEY = 'tool_history';

/**
 * Tool History Management Hook
 * Tracks recently used tools with localStorage persistence
 */
export function useToolHistory() {
  const [history, setHistory] = useState<ToolHistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    setMounted(true);
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ToolHistoryItem[];
        // Filter out entries older than 30 days
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const filtered = parsed.filter(item => item.timestamp > thirtyDaysAgo);
        setHistory(filtered);
        
        // Update localStorage if items were filtered out
        if (filtered.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        }
      }
    } catch (error) {
      console.error('Failed to load tool history:', error);
      setHistory([]);
    }
  };

  const addToHistory = (tool: Omit<ToolHistoryItem, 'timestamp'>) => {
    const newItem: ToolHistoryItem = {
      ...tool,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      // Remove existing entry if present
      const filtered = prev.filter(item => item.slug !== tool.slug);
      
      // Add new entry at the beginning
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save tool history:', error);
      }
      
      return updated;
    });
  };

  const removeFromHistory = (slug: string) => {
    setHistory((prev) => {
      const filtered = prev.filter(item => item.slug !== slug);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      } catch (error) {
        console.error('Failed to remove from history:', error);
      }
      
      return filtered;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    mounted,
  };
}

/**
 * Standalone function to track tool usage
 * Use this in tool pages to add to history
 */
export function trackToolUsage(tool: Omit<ToolHistoryItem, 'timestamp'>) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const history: ToolHistoryItem[] = stored ? JSON.parse(stored) : [];
    
    const newItem: ToolHistoryItem = {
      ...tool,
      timestamp: Date.now(),
    };
    
    // Remove existing entry if present
    const filtered = history.filter(item => item.slug !== tool.slug);
    
    // Add new entry at the beginning
    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to track tool usage:', error);
  }
}

/**
 * Get tool history as a simple array
 */
export function getToolHistory(): ToolHistoryItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ToolHistoryItem[];
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      return parsed.filter(item => item.timestamp > thirtyDaysAgo);
    }
  } catch (error) {
    console.error('Failed to get tool history:', error);
  }
  return [];
}
