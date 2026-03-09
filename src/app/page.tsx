'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import AnimatedSection from '@/components/AnimatedSection';
import { TOOLS_CATALOG, searchTools } from '@/lib/tools-catalog';

const ToolGrid = dynamic(() => import('@/components/ToolGrid'), {
  loading: () => (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={`home-skeleton-${index}`} className="surface-card skeleton-block h-56 rounded-2xl" />
      ))}
    </div>
  ),
});

const categories = [
  {
    key: 'all',
    label: 'All',
    title: 'All Tools',
    description: 'Everything in one place for developer and creator workflows.',
    icon: '🚀',
  },
  {
    key: 'PDF Tools',
    label: 'PDF',
    title: 'PDF Tools',
    description: 'Merge, split, compress, and convert PDFs in seconds.',
    icon: '📄',
  },
  {
    key: 'Image Tools',
    label: 'Image',
    title: 'Image Tools',
    description: 'Compress, resize, crop, and transform image assets quickly.',
    icon: '🖼️',
  },
  {
    key: 'Developer Tools',
    label: 'Developer',
    title: 'Developer Tools',
    description: 'JSON, Base64, URL, JWT, and regex utilities for shipping faster.',
    icon: '⌨️',
  },
  {
    key: 'Text Tools',
    label: 'Text',
    title: 'Text Tools',
    description: 'Format, clean, and process text for daily content tasks.',
    icon: '📝',
  },
  {
    key: 'Utility Tools',
    label: 'Utility',
    title: 'Utility Tools',
    description: 'Practical helpers for productivity and quick everyday tasks.',
    icon: '🧰',
  },
] as const;

const floatingPreviewTools = [
  { title: 'PDF Merger', icon: '📄', delay: 0 },
  { title: 'Image Compressor', icon: '📸', delay: 0.08 },
  { title: 'JSON Formatter', icon: '{ }', delay: 0.16 },
  { title: 'Base64 Encoder', icon: '🔐', delay: 0.24 },
] as const;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeout = window.setTimeout(() => setIsSearching(false), 140);
    return () => window.clearTimeout(timeout);
  }, [searchQuery]);

  const allTools = TOOLS_CATALOG.allTools;

  const liveResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    return searchTools(searchQuery).slice(0, 8);
  }, [searchQuery]);

  const popularTools = useMemo(() => {
    const source = activeCategory === 'all'
      ? allTools
      : allTools.filter((tool) => tool.category === activeCategory);
    return source.slice(0, 8);
  }, [activeCategory, allTools]);

  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
      <section className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="inline-flex rounded-full border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Developer Platform
          </span>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            All Developer Tools. One Place.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
            Free online tools for PDFs, images, text processing and developer utilities. Fast, secure and privacy-friendly.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="ripple rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]"
            >
              Explore Tools
            </Link>
            <Link
              href="/tools/json-formatter"
              className="ripple rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--brand-soft)] hover:text-[var(--brand-strong)]"
            >
              Open JSON Formatter
            </Link>
          </div>
        </motion.div>

        <div className="relative">
          <div className="surface-card relative overflow-hidden rounded-3xl p-6">
            <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
              {floatingPreviewTools.map((tool) => (
                <motion.article
                  key={tool.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: tool.delay, duration: 0.4 }}
                  className="glass-card grid-float rounded-2xl p-4"
                >
                  <p className="text-2xl">{tool.icon}</p>
                  <h3 className="mt-3 text-sm font-semibold text-[var(--text-primary)]">{tool.title}</h3>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">Fast processing with privacy-first workflow</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="mx-auto mt-12 w-full max-w-5xl">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search tools like PDF Merge, JSON Format..."
          results={liveResults}
          isLoading={isSearching}
          categories={categories.map((category) => ({ key: category.key, label: category.label }))}
          activeCategory={activeCategory}
          onCategoryChange={(category) => {
            setActiveCategory(category);
            if (category === 'all') {
              return;
            }
            setSearchQuery(category.replace(' Tools', ''));
          }}
        />
      </AnimatedSection>

      <AnimatedSection delay={0.05} className="mx-auto mt-16 w-full max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Popular Tools</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Fastest way to get things done across PDF, image, and developer workflows.</p>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-[var(--brand-strong)]">View all tools →</Link>
        </div>
        <ToolGrid tools={popularTools} />
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mx-auto mt-18 w-full max-w-7xl">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Categories</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Jump to your workflow in a single click.</p>
        </div>

        <div id="categories" className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.filter((category) => category.key !== 'all').map((category) => {
            const count = allTools.filter((tool) => tool.category === category.key).length;
            return (
              <Link
                key={category.key}
                href={`/tools?category=${category.key.replace(' Tools', '').toLowerCase()}`}
                className="gradient-border hover-lift block rounded-2xl p-[1px]"
              >
                <article className="glass-card rounded-2xl p-6">
                  <p className="text-3xl">{category.icon}</p>
                  <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">{category.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{category.description}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{count} Tools</p>
                </article>
              </Link>
            );
          })}
        </div>
      </AnimatedSection>
    </main>
  );
}
