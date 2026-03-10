'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function ExtraSpaceRemoverPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const removeExtraSpaces = () => {
    if (!input.trim()) {
      alert('Please enter text');
      return;
    }

    // Remove extra spaces
    const result = input
      .replace(/  +/g, ' ') // Multiple spaces to single space
      .replace(/\n\s*\n/g, '\n') // Multiple blank lines to single
      .replace(/^\s+/gm, '') // Leading spaces on each line
      .replace(/\s+$/gm, '') // Trailing spaces on each line
      .trim();

    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🧹"
        title="Extra Space Remover"
        description="Remove extra spaces, tabs, and blank lines from text. Clean up messy text formatting instantly."
      />

      <ToolContainer title="Remove Extra Spaces">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Input Text
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste text with extra spaces..."
              className="w-full h-48 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={removeExtraSpaces}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Remove Extra Spaces
          </button>

          {output && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Cleaned Output
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
                  className="w-full h-48 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                />
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🧹 Complete Cleanup</h3>
            <p className="mt-2 text-sm text-slate-600">Remove all extra spaces</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">Clean text immediately</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📝 Smart Cleaning</h3>
            <p className="mt-2 text-sm text-slate-600">Preserves single spaces</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Paste your text with extra spaces</li>
          <li>Click "Remove Extra Spaces"</li>
          <li>View the cleaned text</li>
          <li>Copy the result</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What spaces does this remove?',
            answer: 'It removes multiple consecutive spaces, leading/trailing spaces on lines, and extra blank lines.'
          },
          {
            question: 'Will it remove all spaces?',
            answer: 'No, only extra spaces. Single spaces between words are preserved.'
          },
          {
            question: 'Does it work with tabs?',
            answer: 'Yes, tabs and other whitespace characters are normalized to single spaces.'
          },
          {
            question: 'Is my text uploaded anywhere?',
            answer: 'No, all processing happens in your browser. Your text never leaves your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Word Counter', slug: 'word-counter', icon: '📝' },
          { name: 'Remove Duplicate Lines', slug: 'remove-duplicate-lines', icon: '🗑️' },
          { name: 'Text Sorter', slug: 'text-sorter', icon: '🔀' }
        ]}
      />
    </main>
  );
}
