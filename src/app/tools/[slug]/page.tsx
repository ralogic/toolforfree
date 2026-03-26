import { TOOLS_CATALOG } from '@/lib/tools-catalog';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Breadcrumbs from '@/components/Breadcrumbs';
import ToolHero from '@/components/ToolHero';
import { ToolAnalyticsWrapper } from '@/hooks/useToolAnalytics';

const FAQSection = dynamic(() => import('@/components/FAQSection'), {
  loading: () => <div className="surface-card h-64 rounded-2xl" aria-hidden="true" />,
});

const RelatedTools = dynamic(() => import('@/components/RelatedTools'), {
  loading: () => <div className="surface-card h-72 rounded-2xl" aria-hidden="true" />,
});

const FavoriteButton = dynamic(() => import('@/components/FavoriteButton'), {
  loading: () => <div className="h-10 w-10 rounded-xl border border-slate-200 bg-white" aria-hidden="true" />,
});

// This would be dynamically imported/loaded based on the tool
export default async function ToolPageTemplate({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS_CATALOG.allTools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  // Get related tools from same category
  const relatedTools = TOOLS_CATALOG.allTools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 4);

  return (
    <ToolAnalyticsWrapper
      toolSlug={tool.slug}
      toolName={tool.name}
      toolCategory={tool.category}
      toolIcon={tool.icon}
    >
      {(analytics) => (
        <div className="min-h-screen bg-white transition-colors dark:bg-slate-950">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Breadcrumbs />
            
            <div className="mt-4 flex items-start justify-between gap-4">
              <ToolHero
                title={tool.name}
                description={tool.description}
                icon={tool.icon}
              />
              <FavoriteButton
                toolSlug={tool.slug}
                toolName={tool.name}
                toolCategory={tool.category}
                toolIcon={tool.icon}
                showLabel={false}
              />
            </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Tool Interface</h2>
          <p className="text-slate-600">
            This is a template. The actual tool implementation should be loaded here.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Tool: <code className="rounded bg-slate-100 px-2 py-1">{tool.slug}</code>
          </p>
        </div>

        {/* SEO Content */}
        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            About {tool.name}
          </h2>
          <p className="mb-4 leading-relaxed text-slate-700">
            {tool.name} is a free online tool that helps you {tool.description.toLowerCase()}. 
            No registration required, completely free to use, and works directly in your browser 
            for maximum privacy and security.
          </p>
          <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-900">Key Features</h3>
          <ul className="list-inside list-disc space-y-2 text-slate-700">
            <li>100% free to use with no limitations</li>
            <li>No registration or signup required</li>
            <li>All processing happens in your browser (privacy-first)</li>
            <li>Fast and responsive user interface</li>
            <li>Mobile-friendly design</li>
          </ul>
        </section>

        {/* FAQ Section */}
        <FAQSection
          items={[
            {
              question: `How do I use ${tool.name}?`,
              answer: `Simply input your data into the tool interface above, and the results will be displayed instantly. No signup or installation required.`,
            },
            {
              question: 'Is this tool free?',
              answer: 'Yes, absolutely! All our tools are completely free to use with no hidden costs or limitations.',
            },
            {
              question: 'Is my data safe?',
              answer: 'Yes, all processing happens directly in your browser. Your data never leaves your device and is not stored on our servers.',
            },
            {
              question: 'Do I need to create an account?',
              answer: 'No account needed! You can use all our tools immediately without any registration.',
            },
          ]}
        />

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <RelatedTools tools={relatedTools} />
        )}
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: tool.name,
            description: tool.description,
            applicationCategory: 'Utility',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Free to use',
              'No registration required',
              'Browser-based processing',
              'Privacy-focused',
            ],
          }),
        }}
      />
    </div>
      )}
    </ToolAnalyticsWrapper>
  );
}

// Generate static params for all tools
export async function generateStaticParams() {
  return TOOLS_CATALOG.allTools.map((tool) => ({
    slug: tool.slug,
  }));
}
