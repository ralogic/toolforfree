import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { generateWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About ToolForFree - Free Tools Mission, Privacy and Trust',
  description: 'Learn how ToolForFree delivers free online PDF, image, text, and developer tools with a privacy-first browser workflow, zero signup, and fast mobile access.',
  alternates: {
    canonical: 'https://toolforfree.in/about',
  },
};

export default function AboutPage() {
  const pageSchema = generateWebPageSchema({
    name: 'About ToolForFree',
    description: 'Learn how ToolForFree delivers free online PDF, image, text, and developer tools with a privacy-first browser workflow, zero signup, and fast mobile access.',
    url: 'https://toolforfree.in/about',
  });

  return (
    <>
      <Script
        id="about-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div className="tools-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="page-header">
          <h1>About ToolForFree</h1>
        </div>

        <section className="seo-content">
          <p>
            ToolForFree is a free online platform that provides powerful tools for PDF editing,
            image processing, text manipulation, and developer utilities. Our mission is to make
            professional-grade tools accessible to everyone without any cost or registration.
          </p>

          <h2>Our Mission</h2>
          <p>
            We believe that everyone should have access to high-quality tools without barriers.
            That is why all our tools are completely free, require no signup, and work directly
            in your browser.
          </p>

          <h2>Privacy and Security</h2>
          <p>
            Your privacy is our top priority. All file processing happens directly in your browser,
            meaning your files never leave your device. We do not store, analyze, or share any of
            your data.
          </p>

          <h2>Explore and Contact</h2>
          <p>
            Browse the full collection in <Link href="/tools">our tools catalog</Link> or reach out via the{' '}
            <Link href="/contact">contact page</Link>. You can also review our{' '}
            <Link href="/privacy-policy">privacy policy</Link> and <Link href="/terms">terms</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
