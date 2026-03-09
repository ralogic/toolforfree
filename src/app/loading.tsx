export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="skeleton-block h-12 w-72 rounded-xl" />
      <div className="mt-4 skeleton-block h-5 w-full max-w-2xl rounded-lg" />
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={`loader-${index}`} className="surface-card skeleton-block h-56 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
