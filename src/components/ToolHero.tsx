interface ToolHeroProps {
  title: string;
  description: string;
  icon?: string;
}

export default function ToolHero({ title, description, icon }: ToolHeroProps) {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-6 py-12 text-center shadow-sm md:px-10">
        {icon ? <div className="mb-4 text-4xl">{icon}</div> : null}
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 md:text-lg">{description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">100% Free</span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">No signup</span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">Browser-based</span>
        </div>
      </div>
    </section>
  );
}
