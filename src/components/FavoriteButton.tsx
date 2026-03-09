'use client';

import { useFavorites } from '@/lib/favorites';
import { Star } from 'lucide-react';
import { toast } from './Toast';

interface FavoriteButtonProps {
  toolSlug: string;
  toolName: string;
  toolCategory: string;
  toolIcon?: string;
  className?: string;
  showLabel?: boolean;
}

export default function FavoriteButton({
  toolSlug,
  toolName,
  toolCategory,
  toolIcon,
  className = '',
  showLabel = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, mounted } = useFavorites();
  
  if (!mounted) {
    return null;
  }

  const favorited = isFavorite(toolSlug);

  const handleToggle = () => {
    toggleFavorite({
      slug: toolSlug,
      name: toolName,
      category: toolCategory,
      icon: toolIcon,
    });
    
    if (favorited) {
      toast.info('Removed from favorites');
    } else {
      toast.success('Added to favorites');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`group inline-flex items-center gap-2 rounded-lg border px-3 py-2 transition-all ${
        favorited
          ? 'border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50'
          : 'border-slate-200 bg-white text-slate-600 hover:border-yellow-300 hover:bg-yellow-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-yellow-600 dark:hover:bg-yellow-900/30'
      } ${className}`}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star
        className={`h-5 w-5 transition-all ${
          favorited
            ? 'fill-yellow-400 text-yellow-500 dark:fill-yellow-500 dark:text-yellow-600'
            : 'group-hover:fill-yellow-200 group-hover:text-yellow-500'
        }`}
      />
      {showLabel && (
        <span className="text-sm font-medium">
          {favorited ? 'Favorited' : 'Add to favorites'}
        </span>
      )}
    </button>
  );
}
