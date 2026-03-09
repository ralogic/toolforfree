import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us – ToolForFree',
  description: 'Learn more about ToolForFree and our mission to provide free online tools.',
};

export default function AboutPage() {
  return (
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
          That's why all our tools are completely free, require no signup, and work directly
          in your browser.
        </p>

        <h2>Privacy & Security</h2>
        <p>
          Your privacy is our top priority. All file processing happens directly in your browser,
          meaning your files never leave your device. We don't store, analyze, or share any of
          your data.
        </p>

        <h2>Contact Us</h2>
        <p>
          Have questions or suggestions? Feel free to reach out to us through our contact page.
        </p>
      </section>
    </div>
  );
}
