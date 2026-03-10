'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function OpenGraphGeneratorPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('website');
  const [tags, setTags] = useState('');

  const generateTags = () => {
    const ogTags = `<!-- Open Graph / Facebook -->
<meta property="og:type" content="${type}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${image}">`;

    setTags(ogTags);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tags);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="📱"
       title="Open Graph Meta Tag Generator"
        description="Generate Open Graph tags for social media sharing. Control how your content appears on Facebook, Twitter, and LinkedIn."
      />

      <ToolContainer title="Generate Open Graph Tags">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your Page Title"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description..."
              className="w-full h-24 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Page URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="website">Website</option>
              <option value="article">Article</option>
              <option value="product">Product</option>
              <option value="video">Video</option>
            </select>
          </div>

          <button
            onClick={generateTags}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Generate Open Graph Tags
          </button>

          {tags && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">Generated Tags</label>
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
            <h3 className="font-semibold text-slate-900">📱 Social Ready</h3>
            <p className="mt-2 text-sm text-slate-600">Optimized for all platforms</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Quick Setup</h3>
            <p className="mt-2 text-sm text-slate-600">Generate in seconds</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🎯 Complete</h3>
            <p className="mt-2 text-sm text-slate-600">Facebook & Twitter tags</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Enter your page title</li>
          <li>Add description and image URL</li>
          <li>Enter page URL and select type</li>
          <li>Click "Generate"</li>
          <li>Copy and paste into {"<head>"}</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What are Open Graph tags?',
            answer: 'Open Graph tags control how URLs are displayed when shared on social media platforms like Facebook, Twitter, and LinkedIn.'
          },
          {
            question: 'What image size should I use?',
            answer: 'Use images at least 1200x630 pixels for best results across all platforms.'
          },
          {
            question: 'Do I need both OG and Twitter tags?',
            answer: 'Twitter falls back to OG tags, but including both ensures optimal display on all platforms.'
          },
          {
            question: 'Where do I add these tags?',
            answer: 'Add them inside the <head> section of your HTML, preferably near the top.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Meta Tag Generator', slug: 'meta-tag-generator', icon: '🏷️' },
          { name: 'Robots.txt Generator', slug: 'robots-txt-generator', icon: '🤖' },
          { name: 'Sitemap Generator', slug: 'sitemap-generator', icon: '🗺️' }
        ]}
      />
    </main>
  );
}
