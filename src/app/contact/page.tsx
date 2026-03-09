import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us – ToolForFree',
  description: 'Get in touch with ToolForFree team.',
};

export default function ContactPage() {
  return (
    <div className="tools-container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="page-header">
        <h1>Contact Us</h1>
      </div>

      <section className="seo-content">
        <p>
          We'd love to hear from you! Whether you have questions, suggestions, or feedback,
          feel free to reach out to us.
        </p>

        <h2>Email</h2>
        <p>
          For general inquiries: <strong>support@toolforfree.in</strong>
        </p>

        <h2>Business Inquiries</h2>
        <p>
          For partnerships and business: <strong>business@toolforfree.in</strong>
        </p>

        <h2>Social Media</h2>
        <p>
          Follow us on social media for updates and new tools.
        </p>
      </section>
    </div>
  );
}
