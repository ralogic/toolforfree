import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { generateWebPageSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact ToolForFree - Support, Feedback and Partnerships',
  description: 'Contact the ToolForFree team for support, business partnerships, and feature suggestions for our free online PDF, image, text, and developer tools.',
  alternates: {
    canonical: 'https://toolforfree.in/contact',
  },
};

export default function ContactPage() {
  const pageSchema = generateWebPageSchema({
    name: 'Contact ToolForFree',
    description: 'Contact the ToolForFree team for support, business partnerships, and feature suggestions for our free online PDF, image, text, and developer tools.',
    url: 'https://toolforfree.in/contact',
  });

  return (
    <>
      <Script
        id="contact-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div className="tools-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="page-header">
          <h1>Contact Us</h1>
        </div>

        <section className="seo-content">
          <p>
            We would love to hear from you. Whether you have questions, suggestions, or feedback,
            feel free to contact us.
          </p>

          <h2>Email</h2>
          <p>
            For general inquiries: <strong>support@toolforfree.in</strong>
          </p>

          <h2>Business Inquiries</h2>
          <p>
            For partnerships and business: <strong>business@toolforfree.in</strong>
          </p>

          <h2>Useful Links</h2>
          <p>
            Start with <Link href="/tools">all tools</Link>, learn more on <Link href="/about">about</Link>, or review{' '}
            <Link href="/privacy-policy">privacy policy</Link> and <Link href="/terms">terms and conditions</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
