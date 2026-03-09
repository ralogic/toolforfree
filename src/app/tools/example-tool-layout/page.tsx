import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function ExampleToolLayoutPage() {
  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🧪"
        title="Example Tool Layout"
        description="A production-ready structure for every ToolForFree tool page: clear hero, interface card, features, how-to, FAQs, and related tools."
      />

      <ToolContainer title="Tool Interface Card">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <p className="text-sm text-slate-700">
            Place your tool controls here: file uploader, text fields, sliders, and action buttons.
          </p>
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {['Client-side processing', 'Fast and secure', 'No signup required'].map((feature) => (
            <div key={feature} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-slate-900">{feature}</h3>
            </div>
          ))}
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Upload or enter your input in the interface card.</li>
          <li>Adjust options as needed and click the main action button.</li>
          <li>Preview and download or copy your result.</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Does this tool upload my files to a server?',
            answer: 'No. ToolForFree tools are designed to process data in your browser whenever possible.'
          },
          {
            question: 'Can I use this on mobile devices?',
            answer: 'Yes. The UI is responsive and optimized for phones, tablets, and desktops.'
          },
          {
            question: 'Is this tool free?',
            answer: 'Yes, ToolForFree provides free tools with a fast and clean interface.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'PDF Merger', slug: 'pdf-merge', icon: '📄' },
          { name: 'Image Compressor', slug: 'image-compressor', icon: '📸' },
          { name: 'JSON Formatter', slug: 'json-formatter', icon: '{ }' }
        ]}
      />
    </main>
  );
}
