'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function HtmlToMarkdownPage() {
  const [html, setHtml] = useState('');
  const [markdown, setMarkdown] = useState('');

  const convertToMarkdown = () => {
    if (!html.trim()) {
      alert('Please enter HTML code');
      return;
    }

    try {
      // Simple HTML to Markdown converter
      let result = html
        // Headers
        .replace(/<h1[^>]*>(.+?)<\/h1>/gi, '# $1\n\n')
        .replace(/<h2[^>]*>(.+?)<\/h2>/gi, '## $1\n\n')
        .replace(/<h3[^>]*>(.+?)<\/h3>/gi, '### $1\n\n')
        .replace(/<h4[^>]*>(.+?)<\/h4>/gi, '#### $1\n\n')
        .replace(/<h5[^>]*>(.+?)<\/h5>/gi, '##### $1\n\n')
        .replace(/<h6[^>]*>(.+?)<\/h6>/gi, '###### $1\n\n')
        // Bold
        .replace(/<(strong|b)[^>]*>(.+?)<\/(strong|b)>/gi, '**$2**')
        // Italic
        .replace(/<(em|i)[^>]*>(.+?)<\/(em|i)>/gi, '*$2*')
        // Links
        .replace(/<a[^>]+href="([^"]+)"[^>]*>(.+?)<\/a>/gi, '[$2]($1)')
        // Code
        .replace(/<code[^>]*>(.+?)<\/code>/gi, '`$1`')
        // Paragraphs
        .replace(/<p[^>]*>(.+?)<\/p>/gi, '$1\n\n')
        // Line breaks
        .replace(/<br\s*\/?>/gi, '\n')
        // Remove remaining tags
        .replace(/<[^>]+>/g, '')
        // Clean up
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      setMarkdown(result);
    } catch (error) {
      alert('Error converting HTML. Please check your code.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🔄"
        title="HTML to Markdown Converter"
        description="Convert HTML code to Markdown syntax instantly. Perfect for content migration and documentation."
      />

      <ToolContainer title="Convert HTML to Markdown">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              HTML Input
            </label>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder='<h1>Heading</h1>&#10;<p><strong>Bold</strong> and <em>italic</em> text</p>&#10;<a href="https://example.com">Link</a>'
              className="w-full h-48 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={convertToMarkdown}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Convert to Markdown
          </button>

          {markdown && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Markdown Output
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Copy Markdown
                  </button>
                </div>
                <textarea
                  value={markdown}
                  readOnly
                  className="w-full h-48 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm"
                />
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔄 Quick Convert</h3>
            <p className="mt-2 text-sm text-slate-600">HTML to Markdown instantly</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📝 Clean Output</h3>
            <p className="mt-2 text-sm text-slate-600">Readable Markdown format</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Fast</h3>
            <p className="mt-2 text-sm text-slate-600">Process in milliseconds</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Paste your HTML code in the input area</li>
          <li>Click "Convert to Markdown"</li>
          <li>View the Markdown output</li>
          <li>Copy the Markdown text</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What HTML elements are supported?',
            answer: 'Headers, bold, italic, links, code, paragraphs, and line breaks are converted. Complex HTML may require manual adjustment.'
          },
          {
            question: 'Will CSS styles be preserved?',
            answer: 'No, Markdown doesn\'t support CSS. Only basic formatting is converted.'
          },
          {
            question: 'Can I convert Markdown back to HTML?',
            answer: 'Yes, use the Markdown to HTML tool for reverse conversion.'
          },
          {
            question: 'Is my HTML uploaded anywhere?',
            answer: 'No, all conversion happens in your browser. Your code never leaves your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Markdown to HTML', slug: 'markdown-to-html', icon: '📝' },
          { name: 'HTML Formatter', slug: 'html-formatter', icon: '📝' },
          { name: 'XML Formatter', slug: 'xml-formatter', icon: '📄' }
        ]}
      />
    </main>
  );
}
