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
      <div className="gradient-border hover-lift h-full rounded-2xl p-[1px]">
        <article className="glass-card flex h-full flex-col rounded-2xl p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] text-2xl">
              {icon}
            </div>
            <span className="rounded-full border border-[var(--border-soft)] bg-[var(--bg-page)] px-3 py-1 text-xs font-semibold text-[var(--text-muted)]">
            {category}
          </span>
        </div>

          <h3 className="mb-2 text-xl font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--brand-strong)]">
          {name}
        </h3>
          <p className="line-clamp-2 text-sm text-[var(--text-secondary)]">{description}</p>

          <div className="mt-6">
            <span className="ripple inline-flex items-center gap-2 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-elevated)] px-3 py-2 text-sm font-semibold text-[var(--brand-strong)] transition group-hover:border-[var(--brand-soft)]">
              Open Tool
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </article>
      </div>
    </Link>
  );
}
