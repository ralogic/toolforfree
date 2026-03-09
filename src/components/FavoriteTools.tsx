'use client';

import Link from 'next/link';
import { useFavorites } from '@/lib/favorites';
import { Star, X } from 'lucide-react';

export default function FavoriteTools() {
  const { favorites, removeFavorite, clearFavorites, mounted } = useFavorites();

  if (!mounted || favorites.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-500" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Favorite Tools
          </h2>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {favorites.length}
          </span>
        </div>
        <button
          onClick={clearFavorites}
          className="text-sm text-slate-600 transition-colors hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
          title="Clear all favorites"
        >
          Clear all
        </button>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item) => (
          <div
            key={item.slug}
            className="group relative flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600 dark:hover:bg-slate-700"
          >
            <Link href={`/tools/${item.slug}`} className="flex flex-1 items-center gap-3">
              {item.icon && (
                <span className="text-2xl" role="img" aria-label={item.name}>
                  {item.icon}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                  {item.name}
                </h3>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {item.category}
                </p>
              </div>
            </Link>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                removeFavorite(item.slug);
              }}
              className="opacity-0 transition-opacity group-hover:opacity-100"
              title="Remove from favorites"
              aria-label={`Remove ${item.name} from favorites`}
            >
              <X className="h-4 w-4 text-slate-400 hover:text-red-600 dark:text-slate-500 dark:hover:text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
