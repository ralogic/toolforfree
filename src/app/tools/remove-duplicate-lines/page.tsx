'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { removeDuplicateLines } from '@/lib/utils';

export default function RemoveDuplicateLinesPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setResult(removeDuplicateLines(newText));
  };

  const stats = {
    original: text.split('\n').filter(line => line.trim().length > 0).length,
    result: result.split('\n').filter(line => line.trim().length > 0).length,
    removed: text.split('\n').filter(line => line.trim().length > 0).length - result.split('\n').filter(line => line.trim().length > 0).length
  };

  return (
    <>
      <ToolHero
        icon="🗑️"
        title="Remove Duplicate Lines"
        description="Remove duplicate lines from text instantly. Keep only unique lines while preserving, order."
      />

      <ToolContainer title="Paste your text">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Paste text with duplicate lines..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
        />
      </ToolContainer>

      <div className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-600 font-medium mb-2">Original Lines</div>
              <div className="text-3xl font-bold text-blue-900">{stats.original}</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="text-sm text-green-600 font-medium mb-2">Unique Lines</div>
              <div className="text-3xl font-bold text-green-900">{stats.result}</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
              <div className="text-sm text-red-600 font-medium mb-2">Duplicates Removed</div>
              <div className="text-3xl font-bold text-red-900">{stats.removed}</div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <ToolContainer title="Result">
          <ResultBox
            title="Unique Lines"
            copyText={result}
          >
            {result}
          </ResultBox>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Paste Text</h3>
            <p className="text-gray-700">Paste text with duplicate lines into the textarea.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: View Results</h3>
            <p className="text-gray-700">The tool automatically removes duplicate lines and shows the result.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Copy Result</h3>
            <p className="text-gray-700">Copy the cleaned text to your clipboard with one click.</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Preserves order:</strong> Unique lines appear in original order</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Handles empty lines:</strong> Works with texts containing empty lines</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Case-sensitive:</strong> Same text in different cases counts as unique</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Real-time:</strong> Results update as you type</span>
          </li>
        </ul>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is considered a duplicate line?',
            answer: 'Two lines are exact duplicates if they contain the same text, character for character. The comparison is case-sensitive.'
          },
          {
            question: 'Are empty lines removed?',
            answer: 'No. Empty lines are preserved as unique lines. Only actual duplicates are removed.'
          },
          {
            question: 'Does it preserve line order?',
            answer: 'Yes! The first occurrence of each unique line is kept in its original position.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Text Sorter', slug: 'text-sorter', icon: '🔀' },
          { name: 'Word Counter', slug: 'word-counter', icon: '📝' },
          { name: 'Case Converter', slug: 'case-converter', icon: '🔤' }
        ]}
      />
    </>
  );
}
