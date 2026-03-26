'use client';

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Script from 'next/script';
import SearchBar from '@/components/SearchBar';
import AnimatedSection from '@/components/AnimatedSection';
import { TOOLS_CATALOG, searchTools } from '@/lib/tools-catalog';
import { 
  generateOrganizationSchema, 
  generateWebSiteSchema, 
  generateFAQSchema,
  generateItemListSchema 
} from '@/lib/seo';

const ToolGrid = dynamic(() => import('@/components/ToolGrid'), {
  loading: () => (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={`home-skeleton-${index}`} className="surface-card skeleton-block h-56 rounded-2xl" />
      ))}
    </div>
  ),
});

function LazyRenderSection({
  children,
  fallbackClassName,
}: {
  children: ReactNode;
  fallbackClassName: string;
}) {
  const [isReady, setIsReady] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReady) {
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsReady(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '220px 0px',
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [isReady]);

  return (
    <div ref={sectionRef}>
      {isReady ? children : <div className={fallbackClassName} aria-hidden="true" />}
    </div>
  );
}

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
        <div className="hero-enter">
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
        </div>

        <div className="relative">
          <div className="surface-card relative overflow-hidden rounded-3xl p-6">
            <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
              {floatingPreviewTools.map((tool) => (
                <article
                  key={tool.title}
                  className="glass-card grid-float preview-enter rounded-2xl p-4"
                  style={{ animationDelay: `${tool.delay}s` }}
                >
                  <p className="text-2xl">{tool.icon}</p>
                  <h3 className="mt-3 text-sm font-semibold text-[var(--text-primary)]">{tool.title}</h3>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">Fast processing with privacy-first workflow</p>
                </article>
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

      <AnimatedSection delay={0.05} className="content-visibility-auto mx-auto mt-16 w-full max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Popular Tools</h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Fastest way to get things done across PDF, image, and developer workflows.</p>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-[var(--brand-strong)]">View all tools →</Link>
        </div>
        <ToolGrid tools={popularTools} />
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="content-visibility-auto mx-auto mt-18 w-full max-w-7xl">
        <LazyRenderSection fallbackClassName="surface-card skeleton-block h-72 rounded-2xl">
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
        </LazyRenderSection>
      </AnimatedSection>

      {/* FAQ Section for SEO */}
      <AnimatedSection delay={0.15} className="content-visibility-auto mx-auto mt-20 w-full max-w-4xl">
        <LazyRenderSection fallbackClassName="surface-card skeleton-block h-80 rounded-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-[var(--text-primary)]">Frequently Asked Questions</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Everything you need to know about ToolForFree</p>
          </div>

          <div className="grid gap-4">
            {[
              {
                q: 'Are all tools completely free to use?',
                a: 'Yes! All tools on ToolForFree are 100% free with no hidden charges, signup requirements, or usage limits. We believe in providing accessible tools for everyone.',
              },
              {
                q: 'Do I need to create an account to use the tools?',
                a: 'No account needed! All tools work instantly in your browser without any registration or login. Just visit the tool page and start using it right away.',
              },
              {
                q: 'Is my data secure and private?',
                a: 'Absolutely! All processing happens directly in your browser. Files never leave your device, and we do not store, transmit, or have access to your data. Your privacy is our top priority.',
              },
              {
                q: 'What types of tools are available?',
                a: 'We offer PDF tools (merge, split, compress), image tools (compress, resize, convert), text tools (word counter, case converter), and developer tools (JSON formatter, Base64 encoder, hash generator).',
              },
              {
                q: 'Can I use these tools on mobile devices?',
                a: 'Yes! All tools are fully responsive and work seamlessly on desktop, tablet, and mobile devices. Access them from any device with a modern web browser.',
              },
              {
                q: 'Are there any file size limitations?',
                a: 'Most tools can handle files up to 100MB. Processing happens in your browser, so performance may vary based on your device capabilities and file size.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="glass-card group rounded-xl p-5 transition-all hover:border-[var(--brand-soft)]"
              >
                <summary className="cursor-pointer text-base font-semibold text-[var(--text-primary)] list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-[var(--text-muted)] transition-transform group-open:rotate-180">v</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </LazyRenderSection>
      </AnimatedSection>

      {/* SEO Content Section */}
      <AnimatedSection delay={0.2} className="content-visibility-auto mx-auto mt-20 w-full max-w-5xl">
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">Why Choose ToolForFree?</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Fast and Efficient</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                All tools process files instantly in your browser. No server uploads, no waiting times, no queues.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">100% Private</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Your files never leave your device. All processing happens locally in your browser for maximum privacy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Completely Free</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                No subscriptions, no trials, no hidden fees. Every tool is free to use without limitations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">No Signup Required</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Start using tools immediately. No registration, no email verification, no unnecessary steps.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Popular Use Cases</h3>
            <ul className="mt-3 grid gap-2 text-sm text-[var(--text-secondary)] md:grid-cols-2">
              <li>Merge multiple PDF documents online</li>
              <li>Compress images without quality loss</li>
              <li>Format and validate JSON data</li>
              <li>Convert text case for content writing</li>
              <li>Generate secure passwords instantly</li>
              <li>Encode and decode Base64 strings</li>
              <li>Count words and characters for SEO</li>
              <li>Calculate age, EMI, and GST easily</li>
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* Structured Data for SEO */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema()),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebSiteSchema()),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateFAQSchema([
              {
                question: 'Are all tools completely free to use?',
                answer: 'Yes! All tools on ToolForFree are 100% free with no hidden charges, signup requirements, or usage limits.',
              },
              {
                question: 'Do I need to create an account to use the tools?',
                answer: 'No account needed! All tools work instantly in your browser without any registration or login.',
              },
              {
                question: 'Is my data secure and private?',
                answer: 'Absolutely! All processing happens directly in your browser. Files never leave your device.',
              },
              {
                question: 'What types of tools are available?',
                answer: 'We offer PDF tools, image tools, text tools, and developer tools including JSON formatter, Base64 encoder, and more.',
              },
              {
                question: 'Can I use these tools on mobile devices?',
                answer: 'Yes! All tools are fully responsive and work seamlessly on desktop, tablet, and mobile devices.',
              },
            ])
          ),
        }}
      />
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateItemListSchema(
              popularTools.slice(0, 8).map((tool) => ({
                name: tool.name,
                url: `https://toolforfree.in/tools/${tool.slug}`,
                description: tool.description,
              }))
            )
          ),
        }}
      />
    </main>
  );
}
