'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function MarkdownToHtmlPage() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

  const convertToHtml = () => {
    if (!markdown.trim()) {
      alert('Please enter Markdown text');
      return;
    }

    try {
      // Simple Markdown to HTML converter
      let result = markdown
        // Headers
        .replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
        .replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
        .replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
        .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
        .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
        .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.+?)__/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/_(.+?)_/g, '<em>$1</em>')
        // Links
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
        // Code
        .replace(/`(.+?)`/g, '<code>$1</code>')
        // Paragraphs
        .replace(/^\s*\n/gm, '<br>\n')
        .replace(/^(?!<[h|u|o|b|p])(.+)$/gm, '<p>$1</p>');

      setHtml(result);
    } catch (error) {
      alert('Error converting Markdown. Please check your syntax.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="📝"
        title="Markdown to HTML Converter"
        description="Convert Markdown syntax to HTML code instantly. Perfect for content creators and developers."
      />

      <ToolContainer title="Convert Markdown to HTML">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Markdown Input
            </label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="# Heading&#10;## Subheading&#10;&#10;**Bold text** and *italic text*&#10;&#10;[Link](https://example.com)"
              className="w-full h-48 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={convertToHtml}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Convert to HTML
          </button>

          {html && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">
                    HTML Output
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Copy HTML
                  </button>
                </div>
                <textarea
                  value={html}
                  readOnly
                  className="w-full h-32 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm"
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Preview</h3>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant Convert</h3>
            <p className="mt-2 text-sm text-slate-600">Convert Markdown to HTML fast</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">👁️ Live Preview</h3>
            <p className="mt-2 text-sm text-slate-600">See rendered HTML</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📋 Easy Copy</h3>
            <p className="mt-2 text-sm text-slate-600">Copy HTML with one click</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Enter or paste your Markdown text</li>
          <li>Click "Convert to HTML"</li>
          <li>View the HTML output and preview</li>
          <li>Copy the HTML code</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What Markdown features are supported?',
            answer: 'Headers, bold, italic, links, code, and basic formatting are supported. Advanced features like tables may require specialized converters.'
          },
          {
            question: 'Can I convert HTML back to Markdown?',
            answer: 'Yes, use the HTML to Markdown tool for reverse conversion.'
          },
          {
            question: 'Is the HTML safe to use?',
            answer: 'The tool performs basic conversion. Always sanitize user-generated content before displaying on websites.'
          },
          {
            question: 'Is my content uploaded anywhere?',
            answer: 'No, all conversion happens in your browser. Your content never leaves your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'HTML to Markdown', slug: 'html-to-markdown', icon: '🔄' },
          { name: 'HTML Formatter', slug: 'html-formatter', icon: '📝' },
          { name: 'JSON Formatter', slug: 'json-formatter', icon: '{ }' }
        ]}
      />
    </main>
  );
}
