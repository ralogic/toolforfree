'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function SlugGeneratorPage() {
  const [input, setInput] = useState('');
  const [slug, setSlug] = useState('');

  const generateSlug = () => {
    if (!input.trim()) {
      alert('Please enter text');
      return;
    }

    // Convert to slug format
    const result = input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    setSlug(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🔗"
        title="Slug Generator"
        description="Convert text to URL-friendly slugs. Perfect for creating clean URLs for blog posts, pages, and products."
      />

      <ToolContainer title="Generate Slug">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Input Text
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter title or text..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={generateSlug}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Generate Slug
          </button>

          {slug && (
            <>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Generated Slug
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Copy
                  </button>
                </div>
                <code className="block rounded bg-white px-4 py-3 text-sm font-mono text-blue-600 border border-slate-200">
                  {slug}
                </code>
              </div>

              <div className="rounded-xl border border-slate-200 bg-blue-50 p-4">
                <p className="text-sm text-slate-700">
                  <strong>Example URL:</strong> https://example.com/{slug}
                </p>
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔗 URL-Friendly</h3>
            <p className="mt-2 text-sm text-slate-600">Clean, SEO-optimized slugs</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">Generate slugs immediately</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📋 Easy Copy</h3>
            <p className="mt-2 text-sm text-slate-600">Copy with one click</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Enter your title or text</li>
          <li>Click "Generate Slug"</li>
          <li>View the URL-friendly slug</li>
          <li>Copy and use in your URLs</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is a slug?',
            answer: 'A slug is a URL-friendly version of text, typically used in web addresses. It contains only lowercase letters, numbers, and hyphens.'
          },
          {
            question: 'Why are slugs important?',
            answer: 'Slugs make URLs readable, SEO-friendly, and easy to share. They improve user experience and search engine rankings.'
          },
          {
            question: 'What characters are allowed in slugs?',
            answer: 'Only lowercase letters (a-z), numbers (0-9), and hyphens (-) are used. Special characters and spaces are converted or removed.'
          },
          {
            question: 'Can I customize the slug?',
            answer: 'Yes, you can edit the input text and regenerate, or manually edit the slug after generating.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Case Converter', slug: 'case-converter', icon: '🔤' },
          { name: 'URL Encoder/Decoder', slug: 'url-encoder-decoder', icon: '🌐' },
          { name: 'Meta Tag Generator', slug: 'meta-tag-generator', icon: '🏷️' }
        ]}
      />
    </main>
  );
}
