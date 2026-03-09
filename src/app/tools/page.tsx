'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import { TOOLS_CATALOG, searchTools } from '@/lib/tools-catalog';

const ToolGrid = dynamic(() => import('@/components/ToolGrid'), {
  loading: () => (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={`tools-skeleton-${index}`} className="surface-card skeleton-block h-56 rounded-2xl" />
      ))}
    </div>
  ),
});

const categoryMap = {
  pdf: 'PDF Tools',
  image: 'Image Tools',
  text: 'Text Tools',
  developer: 'Developer Tools',
  utility: 'Utility Tools',
} as const;

const searchCategories = [
  { key: 'all', label: 'All' },
  { key: 'pdf', label: 'PDF' },
  { key: 'image', label: 'Image' },
  { key: 'developer', label: 'Developer' },
  { key: 'text', label: 'Text' },
  { key: 'utility', label: 'Utility' },
];

export default function ToolsCatalogPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoryMap | 'all'>('all');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') as keyof typeof categoryMap | null;
    const queryFromUrl = searchParams.get('q');

    if (categoryFromUrl && categoryMap[categoryFromUrl]) {
      setActiveCategory(categoryFromUrl);
    }

    if (queryFromUrl) {
      setQuery(queryFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!query.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = window.setTimeout(() => setIsSearching(false), 130);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const tools = TOOLS_CATALOG.allTools;

  const liveResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    return searchTools(query).slice(0, 8);
  }, [query]);

  const displayedTools = useMemo(() => {
    let base = tools;

    if (activeCategory !== 'all') {
      base = base.filter((tool) => tool.category === categoryMap[activeCategory]);
    }

    if (query.trim()) {
      const found = searchTools(query);
      if (activeCategory === 'all') {
        return found;
      }
      return found.filter((tool) => tool.category === categoryMap[activeCategory]);
    }

    return base;
  }, [activeCategory, query, tools]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24">
      <section className="mb-12">
        <span className="inline-flex rounded-full border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Tool Library
        </span>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--text-primary)] sm:text-5xl">Find The Right Tool Faster</h1>
        <p className="mt-3 max-w-2xl text-base text-[var(--text-secondary)]">
          Explore modern, privacy-friendly utilities for PDF processing, image workflows, and developer productivity.
        </p>
      </section>

      <section className="mb-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          results={liveResults}
          isLoading={isSearching}
          categories={searchCategories}
          activeCategory={activeCategory}
          onCategoryChange={(category) => setActiveCategory(category as keyof typeof categoryMap | 'all')}
          placeholder="Search tools like PDF Merge, JSON Format..."
        />
      </section>

      <section className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-[var(--text-secondary)]">
          Showing <span className="font-semibold text-[var(--text-primary)]">{displayedTools.length}</span> result{displayedTools.length !== 1 ? 's' : ''}
          {query.trim() ? ` for "${query}"` : ''}
        </p>
        {(query.trim() || activeCategory !== 'all') ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveCategory('all');
            }}
            className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--brand-soft)] hover:text-[var(--brand-strong)]"
          >
            Clear Filters
          </button>
        ) : null}
      </section>

      <section>
        {displayedTools.length > 0 ? (
          <ToolGrid tools={displayedTools} />
        ) : (
          <div className="surface-card rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">No tools found</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Try another keyword or switch categories to discover more tools.</p>
          </div>
        )}
      </section>

      <section className="surface-card mt-14 rounded-3xl p-8 sm:p-10">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Need a New Tool?</h2>
        <p className="mt-3 max-w-2xl text-sm text-[var(--text-secondary)]">
          ToolForFree is continuously evolving. Share your request and we will prioritize tools that help developer workflows most.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/contact" className="ripple rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]">
            Suggest a Tool
          </Link>
          <Link href="/" className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--brand-soft)] hover:text-[var(--brand-strong)]">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
