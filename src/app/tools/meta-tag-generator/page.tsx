'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tags);
    alert('Copied to clipboard!');
  };

  const generateTags = () => {
    const metaTags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">
<meta name="robots" content="index, follow">
<meta name="viewport" content="width=device-width, initial-scale=1.0">`;

    setTags(metaTags);
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🏷️"
        title="Meta Tag Generator"
        description="Generate essential SEO meta tags for your website. Improve search engine visibility and rankings."
      />

      <ToolContainer title="Generate Meta Tags">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Website"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of your page..."
              className="w-full h-24 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Keywords</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="web, development, tools"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name or company"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={generateTags}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Generate Meta Tags
          </button>

          {tags && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">Generated Meta Tags</label>
                  <button
                    onClick={copyToClipboard}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Copy
                  </button>
                </div>
                <textarea
                  value={tags}
                  readOnly
                  className="w-full h-64 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-xs"
                />
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🏷️ Complete Tags</h3>
            <p className="mt-2 text-sm text-slate-600">All essential SEO meta tags</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">Generate immediately</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📋 Ready to Use</h3>
            <p className="mt-2 text-sm text-slate-600">Copy and paste into HTML</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Enter your page title</li>
          <li>Add a description (150-160 characters recommended)</li>
          <li>Add relevant keywords</li>
          <li>Enter author information</li>
          <li>Click "Generate Meta Tags"</li>
          <li>Copy and paste into your HTML {"<head>"} section</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Why are meta tags important?',
            answer: 'Meta tags help search engines understand your content, improving SEO and click-through rates from search results.'
          },
          {
            question: 'What is the ideal description length?',
            answer: 'Keep descriptions between 150-160 characters for optimal display in search results.'
          },
          {
            question: 'Are keywords still important?',
            answer: 'While less critical than before, keywords still help search engines understand your content topic.'
          },
          {
            question: 'Where do I add these tags?',
            answer: 'Add meta tags inside the <head> section of your HTML document.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Open Graph Generator', slug: 'open-graph-generator', icon: '📱' },
          { name: 'Robots.txt Generator', slug: 'robots-txt-generator', icon: '🤖' },
          { name: 'Sitemap Generator', slug: 'sitemap-generator', icon: '🗺️' }
        ]}
      />
    </main>
  );
}
