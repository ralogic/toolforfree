interface ToolContainerProps {
  children: React.ReactNode;
  title?: string;
}

export default function ToolContainer({ children, title }: ToolContainerProps) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        {title ? <h2 className="mb-5 text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2> : null}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {children}
        </div>
      </div>
    </section>
  );
}
