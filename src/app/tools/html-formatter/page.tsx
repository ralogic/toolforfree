'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function HtmlFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const formatHtml = () => {
    if (!input.trim()) {
      alert('Please enter HTML code');
      return;
    }

    try {
      // Simple HTML formatter
      let formatted = input.trim();
      let indent = 0;
      let result = '';
      const lines = formatted.split(/>\s*</);
      
      lines.forEach((line, index) => {
        if (line.match(/^\/\w/)) indent = Math.max(0, indent - 1);
        
        result += ' '.repeat(indent * indentSize);
        result += (index > 0 ? '<' : '') + line + (index < lines.length - 1 ? '>\n' : '');
        
        if (line.match(/<\w[^>]*[^\/]$/) && !line.match(/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/)) {
          indent++;
        }
      });
      
      setOutput(result);
    } catch (error) {
      alert('Error formatting HTML. Please check your code.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="📝"
        title="HTML Formatter"
        description="Format and beautify HTML code with proper indentation. Make your HTML clean and readable instantly."
      />

      <ToolContainer title="Format HTML Code">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              HTML Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your HTML code here..."
              className="w-full h-48 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-slate-900">
              Indent Size:
            </label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(parseInt(e.target.value))}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="8">8 spaces</option>
            </select>
          </div>

          <button
            onClick={formatHtml}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Format HTML
          </button>

          {output && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Formatted Output
                  </label>
                  <button
                    onClick={copyToClipboard}
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Copy
                  </button>
                </div>
                <textarea
                  value={output}
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
            <h3 className="font-semibold text-slate-900">✨ Clean Formatting</h3>
            <p className="mt-2 text-sm text-slate-600">Proper indentation and structure</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant Results</h3>
            <p className="mt-2 text-sm text-slate-600">Format HTML in milliseconds</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🎨 Customizable</h3>
            <p className="mt-2 text-sm text-slate-600">Choose your indent size</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Paste your unformatted HTML code in the input area</li>
          <li>Select your preferred indent size</li>
          <li>Click "Format HTML" to beautify your code</li>
          <li>Copy the formatted code to your clipboard</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Does this validate HTML?',
            answer: 'This tool formats HTML code but doesn\'t validate it. For validation, use an HTML validator.'
          },
          {
            question: 'Can it handle large HTML files?',
            answer: 'Yes, the tool can handle moderately large files. Very large files may slow down browser performance.'
          },
          {
            question: 'Will it fix broken HTML?',
            answer: 'No, this tool only formats existing HTML. It won\'t fix syntax errors or missing tags.'
          },
          {
            question: 'Is my code uploaded anywhere?',
            answer: 'No, all formatting happens in your browser. Your code never leaves your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'CSS Minifier', slug: 'css-minifier', icon: '🎨' },
          { name: 'JS Beautifier', slug: 'js-beautifier', icon: '✨' },
          { name: 'XML Formatter', slug: 'xml-formatter', icon: '📄' }
        ]}
      />
    </main>
  );
}
