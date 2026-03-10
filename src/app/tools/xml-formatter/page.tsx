'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function XmlFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const formatXml = () => {
    if (!input.trim()) {
      alert('Please enter XML code');
      return;
    }

    try {
      // Simple XML formatter
      let formatted = input.trim();
      let indent = 0;
      let result = '';
      const spaces = ' '.repeat(indentSize);
      const lines = formatted.split(/>\s*</);
      
      lines.forEach((line, index) => {
        if (line.match(/^\/\w/)) indent = Math.max(0, indent - 1);
        
        result += spaces.repeat(indent);
        result += (index > 0 ? '<' : '') + line + (index < lines.length - 1 ? '>\n' : '');
        
        if (line.match(/<\w[^>]*[^\/]$/) && !line.match(/<(area|base|br|col|embed|hr|img|input|link|meta)/)) {
          indent++;
        }
      });
      
      setOutput(result);
    } catch (error) {
      alert('Error formatting XML. Please check your code.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="📄"
        title="XML Formatter"
        description="Format and beautify XML code with proper indentation. Make your XML clean, readable, and well-structured."
      />

      <ToolContainer title="Format XML Code">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              XML Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your XML code here..."
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
            onClick={formatXml}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Format XML
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
            <h3 className="font-semibold text-slate-900">✨ Clean Format</h3>
            <p className="mt-2 text-sm text-slate-600">Proper indentation and structure</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📖 Readable</h3>
            <p className="mt-2 text-sm text-slate-600">Easy to read and maintain</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚙️ Customizable</h3>
            <p className="mt-2 text-sm text-slate-600">Choose indent size</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Paste your XML code in the input area</li>
          <li>Select your preferred indent size</li>
          <li>Click "Format XML"</li>
          <li>Copy the formatted XML code</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Does this validate XML?',
            answer: 'No, this tool formats XML but doesn\'t validate it. For validation, use an XML validator.'
          },
          {
            question: 'Can it handle large XML files?',
            answer: 'Yes, but very large files may slow down browser performance. For huge files, consider desktop tools.'
          },
          {
            question: 'Will it fix broken XML?',
            answer: 'No, this tool only formats existing XML. It won\'t fix syntax errors or missing tags.'
          },
          {
            question: 'Is my XML uploaded anywhere?',
            answer: 'No, all formatting happens in your browser. Your data never leaves your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'JSON Formatter', slug: 'json-formatter', icon: '{ }' },
          { name: 'HTML Formatter', slug: 'html-formatter', icon: '📝' },
          { name: 'SQL Formatter', slug: 'sql-formatter', icon: '🗄️' }
        ]}
      />
    </main>
  );
}
