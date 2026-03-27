import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { generateWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy - ToolForFree Data and Cookie Practices',
  description: 'Read how ToolForFree protects your data with browser-based processing, limited analytics, essential cookies, and transparent third-party service policies.',
  alternates: {
    canonical: 'https://toolforfree.in/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  const pageSchema = generateWebPageSchema({
    name: 'Privacy Policy - ToolForFree',
    description: 'Read how ToolForFree protects your data with browser-based processing, limited analytics, essential cookies, and transparent third-party service policies.',
    url: 'https://toolforfree.in/privacy-policy',
  });

  return (
    <>
      <Script
        id="privacy-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div className="tools-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="page-header">
          <h1>Privacy Policy</h1>
          <p className="subtitle">Last updated: March 9, 2026</p>
        </div>

        <section className="seo-content">
          <h2>Our Commitment to Privacy</h2>
          <p>
            At ToolForFree, we respect your privacy. This Privacy Policy explains how we handle
            your data when you use our services.
          </p>

          <h2>Data Collection</h2>
          <p>
            We do not collect, store, or process any files you upload to our tools. All file
            processing happens directly in your browser using client-side JavaScript.
          </p>

          <h2>Analytics</h2>
          <p>
            We use Google Analytics to understand how our website is used. This helps us improve
            our services. Analytics data is anonymized and does not identify individual users.
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies for essential functionality like remembering your theme preference (dark/light mode).
            These cookies do not track your activity across other websites.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We use Google AdSense to display ads. These services may collect data according to
            their own privacy policies.
          </p>

          <h2>Your Rights</h2>
          <p>
            Since we do not collect personal data, there is no data to delete or export. You can
            clear your browser cookies at any time to remove any stored preferences.
          </p>

          <h2>Contact and Related Pages</h2>
          <p>
            If you have questions about this policy, contact privacy@toolforfree.in or visit{' '}
            <Link href="/contact">contact</Link>. You can also review <Link href="/terms">terms</Link> and browse{' '}
            <Link href="/tools">all tools</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
