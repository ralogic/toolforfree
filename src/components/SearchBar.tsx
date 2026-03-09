'use client';

import { useRef, useEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchResultItem {
  slug: string;
  icon: string;
  name: string;
  description: string;
  category: string;
}

interface SearchCategory {
  key: string;
  label: string;
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyDown?: (e: ReactKeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  results?: SearchResultItem[];
  isLoading?: boolean;
  categories?: SearchCategory[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  onSelectResult?: (slug: string) => void;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search tools like PDF Merge, JSON Format...',
  onKeyDown,
  autoFocus = false,
  results = [],
  isLoading = false,
  categories = [],
  activeCategory,
  onCategoryChange,
  onSelectResult,
  className = ''
}: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [openResults, setOpenResults] = useState(false);

  const hasResults = results.length > 0;
  const quickSuggestions = useMemo(
    () => ['PDF Merge', 'Image Compressor', 'JSON Formatter', 'Base64 Encode'],
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpenResults(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [results, value]);

  const handleSelect = (slug: string) => {
    setOpenResults(false);
    if (onSelectResult) {
      onSelectResult(slug);
      return;
    }
    router.push(`/tools/${slug}`);
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && hasResults) {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    }

    if (event.key === 'ArrowUp' && hasResults) {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
    }

    if (event.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      event.preventDefault();
      handleSelect(results[activeIndex].slug);
    }

    if (event.key === 'Escape') {
      setOpenResults(false);
      inputRef.current?.blur();
    }

    onKeyDown?.(event);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="gradient-border relative rounded-2xl p-[1px]">
        <div className="flex items-center gap-3 rounded-2xl bg-[var(--bg-elevated)] px-3 py-2 shadow-[var(--shadow-soft)]">
          <Search className="h-5 w-5 text-[var(--text-muted)]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onFocus={() => setOpenResults(true)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="h-12 w-full border-0 bg-transparent text-base text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            aria-label="Search tools"
          />
          <kbd className="hidden rounded-lg border border-[var(--border-soft)] px-2 py-1 text-xs text-[var(--text-muted)] sm:inline-block">
            Ctrl K
          </kbd>
        </div>
      </div>

      {categories.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => onCategoryChange?.(category.key)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                activeCategory === category.key
                  ? 'border-[var(--brand)] bg-[var(--brand)] text-white'
                  : 'border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--brand-soft)] hover:text-[var(--brand-strong)]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      ) : null}

      {openResults ? (
        <div className="surface-card absolute left-0 right-0 top-[calc(100%+12px)] z-30 max-h-[26rem] overflow-y-auto p-2">
          {isLoading ? (
            <div className="space-y-2 p-2">
              <div className="skeleton-block h-12 rounded-xl" />
              <div className="skeleton-block h-12 rounded-xl" />
              <div className="skeleton-block h-12 rounded-xl" />
            </div>
          ) : null}

          {!isLoading && hasResults ? (
            <ul className="space-y-1" role="listbox" aria-label="Search suggestions">
              {results.map((result, index) => (
                <li key={result.slug}>
                  <button
                    type="button"
                    onClick={() => handleSelect(result.slug)}
                    className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                      index === activeIndex
                        ? 'border-[var(--brand-soft)] bg-[var(--bg-muted)]'
                        : 'border-transparent hover:border-[var(--border-soft)] hover:bg-[var(--bg-page)]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                        {result.icon} {result.name}
                      </p>
                      <span className="rounded-full border border-[var(--border-soft)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]">
                        {result.category}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-[var(--text-muted)]">{result.description}</p>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          {!isLoading && !hasResults ? (
            <div className="rounded-xl border border-dashed border-[var(--border-soft)] bg-[var(--bg-page)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Suggestions</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => onChange(suggestion)}
                    className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-1 text-xs text-[var(--text-secondary)] hover:border-[var(--brand-soft)]"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <Link href="/tools" className="mt-3 inline-flex text-xs font-semibold text-[var(--brand-strong)]">
                Browse all tools
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
