import Link from 'next/link';

interface ToolCardProps {
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: string;
}

export default function ToolCard({
  name,
  slug,
  description,
  icon,
  category
}: ToolCardProps) {
  return (
    <Link href={`/tools/${slug}`} className="group block h-full">
      <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">{icon}</div>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {category}
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
          {name}
        </h3>
        <p className="line-clamp-2 text-sm text-slate-600">{description}</p>

        <div className="mt-5 flex items-center text-sm font-semibold text-blue-600">
          Open tool <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
