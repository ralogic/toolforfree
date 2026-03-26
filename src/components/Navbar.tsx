'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Search } from 'lucide-react';

const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), {
  loading: () => (
    <span
      className="inline-block h-10 w-10 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)]"
      aria-hidden="true"
    />
  ),
});

const NAV_ITEMS = [
  { href: '/tools', label: 'Tools' },
  { href: '/tools#categories', label: 'Categories' },
  { href: '/about', label: 'About' }
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
      return;
    }
    router.push('/tools');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[color-mix(in_oklab,var(--bg-page)_82%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
          ToolForFree
        </Link>

        <form onSubmit={handleSearchSubmit} className="hidden max-w-xl flex-1 md:block" role="search" aria-label="Site search">
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-2 shadow-[var(--shadow-soft)]">
            <Search className="h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
            <input
              ref={inputRef}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search tools like PDF Merge, JSON Format..."
              className="h-8 w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              aria-label="Search tools"
            />
            <kbd className="rounded-lg border border-[var(--border-soft)] px-2 py-1 text-xs text-[var(--text-muted)]">Ctrl K</kbd>
          </div>
        </form>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-strong)]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://devprayog.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--brand-soft)] hover:text-[var(--brand-strong)]"
          >
            devprayog.tech
          </a>
          <ThemeToggle />
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-lg border border-[var(--border-soft)] p-2 text-[var(--text-secondary)] md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-5 bg-current" />
          <span className="mt-1.5 block h-0.5 w-5 bg-current" />
          <span className="mt-1.5 block h-0.5 w-5 bg-current" />
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-4 md:hidden">
          <form onSubmit={handleSearchSubmit} className="mb-4" role="search" aria-label="Mobile search">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-page)] px-3 py-2">
              <Search className="h-4 w-4 text-[var(--text-muted)]" aria-hidden="true" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search tools"
                className="h-8 w-full bg-transparent text-sm text-[var(--text-primary)] outline-none"
              />
            </div>
          </form>
          <nav className="flex flex-col gap-3" aria-label="Mobile primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-page)]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://devprayog.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[var(--border-soft)] bg-[var(--bg-page)] px-2 py-2 text-sm font-semibold text-[var(--text-secondary)]"
            >
              Visit devprayog.tech
            </a>
            <ThemeToggle />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
