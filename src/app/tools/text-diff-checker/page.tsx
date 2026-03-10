'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function TextDiffCheckerPage() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [differences, setDifferences] = useState<string[]>([]);

  const checkDifference = () => {
    if (!text1.trim() || !text2.trim()) {
      alert('Please enter both texts to compare');
      return;
    }

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const diffs: string[] = [];

    const maxLines = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 !== line2) {
        diffs.push(`Line ${i + 1}:`);
        diffs.push(`< ${line1}`);
        diffs.push(`> ${line2}`);
        diffs.push('---');
      }
    }

    if (diffs.length === 0) {
      diffs.push('No differences found. Texts are identical.');
    }

    setDifferences(diffs);
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🔍"
        title="Text Diff Checker"
        description="Compare two texts and find differences. Perfect for comparing code, documents, or any text content."
      />

      <ToolContainer title="Compare Texts">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Text 1
              </label>
              <textarea
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                placeholder="Enter first text..."
                className="w-full h-48 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Text 2
              </label>
              <textarea
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder="Enter second text..."
                className="w-full h-48 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <button
            onClick={checkDifference}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Compare Texts
          </button>

          {differences.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Differences</h3>
              <pre className="text-xs font-mono text-slate-700 whitespace-pre-wrap">
                {differences.join('\n')}
              </pre>
            </div>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔍 Line by Line</h3>
            <p className="mt-2 text-sm text-slate-600">Compare texts line by line</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant Results</h3>
            <p className="mt-2 text-sm text-slate-600">See differences immediately</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📋 Clear Output</h3>
            <p className="mt-2 text-sm text-slate-600">Easy to read format</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Paste first text in the left box</li>
          <li>Paste second text in the right box</li>
          <li>Click "Compare Texts"</li>
          <li>View the differences highlighted below</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'How are differences shown?',
            answer: 'Lines starting with "<" are from Text 1, lines with ">" are from Text 2. Line numbers show where differences occur.'
          },
          {
            question: 'Can I compare large files?',
            answer: 'Yes, but very large texts may slow down the browser. For huge files, consider desktop diff tools.'
          },
          {
            question: 'Is whitespace considered?',
            answer: 'Yes, the tool compares texts exactly, including spaces and formatting.'
          },
          {
            question: 'Is my text uploaded anywhere?',
            answer: 'No, all comparison happens in your browser. Your texts never leave your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Text Sorter', slug: 'text-sorter', icon: '🔀' },
          { name: 'Remove Duplicate Lines', slug: 'remove-duplicate-lines', icon: '🗑️' },
          { name: 'Word Counter', slug: 'word-counter', icon: '📝' }
        ]}
      />
    </main>
  );
}
