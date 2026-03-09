import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-extrabold text-slate-900">ToolForFree</h3>
          <p className="mt-3 max-w-xl text-sm text-slate-600">
            A clean collection of free online tools for PDF, image, text, and developer workflows. Fast results, no signup, and a trustworthy interface.
          </p>
          <a
            href="https://devprayog.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
          >
            Explore more developer experiments at devprayog.tech
          </a>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Quick Links</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>
              <Link href="/tools" className="transition-colors hover:text-blue-600">All Tools</Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-blue-600">About</Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-blue-600">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Legal</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li>
              <Link href="/privacy-policy" className="transition-colors hover:text-blue-600">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-blue-600">Terms and Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 py-5">
        <p className="text-center text-xs text-slate-500">
          Copyright © {new Date().getFullYear()} ToolForFree. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
