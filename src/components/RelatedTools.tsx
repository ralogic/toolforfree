import Link from 'next/link';

interface RelatedTool {
  name: string;
  slug: string;
  icon?: string;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
}

export default function RelatedTools({ tools }: RelatedToolsProps) {
  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-900 md:text-4xl">
          Related Tools
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              {tool.icon ? <div className="mb-3 text-3xl">{tool.icon}</div> : null}
              <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm text-slate-500">Open tool →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
