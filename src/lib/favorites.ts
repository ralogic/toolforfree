'use client';

import { useEffect, useState } from 'react';

export interface FavoriteTool {
  slug: string;
  name: string;
  category: string;
  icon?: string;
  timestamp: number; // When it was favorited
}

const STORAGE_KEY = 'tool_favorites';

/**
 * Favorites Management Hook
 * Manages user's favorite tools with localStorage persistence
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteTool[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    setMounted(true);
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FavoriteTool[];
        setFavorites(parsed);
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
      setFavorites([]);
    }
  };

  const addFavorite = (tool: Omit<FavoriteTool, 'timestamp'>) => {
    const newFavorite: FavoriteTool = {
      ...tool,
      timestamp: Date.now(),
    };

    setFavorites((prev) => {
      // Check if already favorited
      if (prev.some(fav => fav.slug === tool.slug)) {
        return prev;
      }

      const updated = [...prev, newFavorite];
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save favorite:', error);
      }
      
      return updated;
    });
  };

  const removeFavorite = (slug: string) => {
    setFavorites((prev) => {
      const filtered = prev.filter(fav => fav.slug !== slug);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      } catch (error) {
        console.error('Failed to remove favorite:', error);
      }
      
      return filtered;
    });
  };

  const toggleFavorite = (tool: Omit<FavoriteTool, 'timestamp'>) => {
    if (isFavorite(tool.slug)) {
      removeFavorite(tool.slug);
    } else {
      addFavorite(tool);
    }
  };

  const isFavorite = (slug: string): boolean => {
    return favorites.some(fav => fav.slug === slug);
  };

  const clearFavorites = () => {
    setFavorites([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear favorites:', error);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    mounted,
  };
}

/**
 * Standalone function to check if a tool is favorited
 */
export function isToolFavorite(slug: string): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const favorites = JSON.parse(stored) as FavoriteTool[];
      return favorites.some(fav => fav.slug === slug);
    }
  } catch (error) {
    console.error('Failed to check favorite status:', error);
  }
  return false;
}

/**
 * Get all favorites as a simple array
 */
export function getFavoriteTools(): FavoriteTool[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as FavoriteTool[];
    }
  } catch (error) {
    console.error('Failed to get favorites:', error);
  }
  return [];
}
