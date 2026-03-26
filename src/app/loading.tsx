export default function Loading() {
  return (
    <main className="route-loader-wrap" aria-busy="true" aria-live="polite">
      <div className="route-loader-card">
        <p className="route-loader-icon" aria-hidden="true">🏆</p>
        <h2 className="route-loader-quote">
          I&apos;m obsessed with perfection. I want to work. I don&apos;t want to take this for granted. - Drake
        </h2>
        <p className="route-loader-author">- peter</p>
        <div className="route-loader-spinner" aria-label="Loading" />
      </div>
    </main>
  );
}
