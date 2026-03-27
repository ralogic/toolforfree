import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { generateWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms and Conditions - ToolForFree Service Usage Rules',
  description: 'Review ToolForFree terms for acceptable use, disclaimers, liability limits, and service updates when using our free online PDF, image, text, and developer tools.',
  alternates: {
    canonical: 'https://toolforfree.in/terms',
  },
};

export default function TermsPage() {
  const pageSchema = generateWebPageSchema({
    name: 'Terms and Conditions - ToolForFree',
    description: 'Review ToolForFree terms for acceptable use, disclaimers, liability limits, and service updates when using our free online PDF, image, text, and developer tools.',
    url: 'https://toolforfree.in/terms',
  });

  return (
    <>
      <Script
        id="terms-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div className="tools-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="page-header">
          <h1>Terms & Conditions</h1>
          <p className="subtitle">Last updated: March 9, 2026</p>
        </div>

        <section className="seo-content">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using ToolForFree, you accept and agree to be bound by these
            Terms and Conditions.
          </p>

          <h2>Use of Services</h2>
          <p>
            Our services are provided free of charge for personal and commercial use. You may
            use our tools as long as you comply with applicable laws and these terms.
          </p>

          <h2>Acceptable Use</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use our services for illegal purposes</li>
            <li>Attempt to harm, exploit, or reverse-engineer our services</li>
            <li>Upload malicious files or content</li>
            <li>Abuse our services through excessive automated requests</li>
          </ul>

          <h2>Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" without warranties of any kind. We do not guarantee
            that our services will be error-free or uninterrupted.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            ToolForFree shall not be liable for any damages arising from the use or inability
            to use our services.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of our services
            constitutes acceptance of modified terms.
          </p>

          <h2>Contact and Related Pages</h2>
          <p>
            For questions about these terms, contact legal@toolforfree.in or visit <Link href="/contact">contact</Link>.
            You can also review <Link href="/privacy-policy">privacy policy</Link> and browse{' '}
            <Link href="/tools">all tools</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
