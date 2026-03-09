import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border-soft)] bg-[color-mix(in_oklab,var(--bg-page)_92%,white)]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-semibold text-[var(--text-primary)]">ToolForFree</h3>
          <p className="mt-3 max-w-lg text-sm text-[var(--text-secondary)]">
            Free online tools for PDFs, images, text processing, and developer workflows. Fast, secure, and privacy-friendly.
          </p>
          <a
            href="https://devprayog.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-[var(--brand-soft)] hover:text-[var(--brand-strong)]"
          >
            Visit devprayog.tech
          </a>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Tools</h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
            <li><Link href="/tools?category=pdf" className="hover:text-[var(--brand-strong)]">PDF Tools</Link></li>
            <li><Link href="/tools?category=image" className="hover:text-[var(--brand-strong)]">Image Tools</Link></li>
            <li><Link href="/tools?category=developer" className="hover:text-[var(--brand-strong)]">Developer Tools</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Categories</h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
            <li><Link href="/tools?category=text" className="hover:text-[var(--brand-strong)]">Text Tools</Link></li>
            <li><Link href="/tools?category=utility" className="hover:text-[var(--brand-strong)]">Utility Tools</Link></li>
            <li><Link href="/tools#categories" className="hover:text-[var(--brand-strong)]">All Categories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Resources</h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
            <li><Link href="/tools" className="hover:text-[var(--brand-strong)]">Browse Tools</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--brand-strong)]">Suggest a Tool</Link></li>
            <li><Link href="/about" className="hover:text-[var(--brand-strong)]">About ToolForFree</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border-soft)] py-5">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 text-xs text-[var(--text-muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} ToolForFree</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[var(--brand-strong)]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--brand-strong)]">Terms</Link>
            <Link href="/contact" className="hover:text-[var(--brand-strong)]">Contact</Link>
            <a href="https://devprayog.tech" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-strong)]">Company</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
