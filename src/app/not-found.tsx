import Link from 'next/link';
import { TOOLS_CATALOG } from '@/lib/tools-catalog';

export default function NotFound() {
  const popularTools = TOOLS_CATALOG.allTools.slice(0, 4);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 text-8xl font-bold text-slate-200">404</div>
        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          Page Not Found
        </h1>
        <p className="mb-8 text-lg text-slate-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go Home
          </Link>
          <Link
            href="/tools"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Browse Tools
          </Link>
        </div>

        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Try these popular tools instead:
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {popularTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-200 hover:bg-white"
              >
                <div className="mb-1 text-2xl">{tool.icon}</div>
                <div className="font-semibold text-slate-900">{tool.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
