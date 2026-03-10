'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function TextReverserPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [reverseType, setReverseType] = useState<'characters' | 'words' | 'lines'>('characters');

  const reverseText = () => {
    if (!input.trim()) {
      alert('Please enter text to reverse');
      return;
    }

    let result = '';
    
    switch (reverseType) {
      case 'characters':
        result = input.split('').reverse().join('');
        break;
      case 'words':
        result = input.split(' ').reverse().join(' ');
        break;
      case 'lines':
        result = input.split('\n').reverse().join('\n');
        break;
    }

    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🔄"
        title="Text Reverser"
        description="Reverse text characters, words, or lines instantly. Fun tool for creating mirror text and more."
      />

      <ToolContainer title="Reverse Text">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Input Text
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to reverse..."
              className="w-full h-32 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Reverse By:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'characters', label: 'Characters' },
                { value: 'words', label: 'Words' },
                { value: 'lines', label: 'Lines' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setReverseType(option.value as any)}
                  className={`rounded-lg border-2 p-3 font-semibold transition-colors ${
                    reverseType === option.value
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={reverseText}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Reverse Text
          </button>

          {output && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Reversed Output
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
                  className="w-full h-32 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                />
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔄 Multiple Modes</h3>
            <p className="mt-2 text-sm text-slate-600">Reverse by characters, words, or lines</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">Reverse text immediately</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📋 Easy Copy</h3>
            <p className="mt-2 text-sm text-slate-600">Copy result with one click</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Enter your text in the input area</li>
          <li>Select reverse mode (characters, words, or lines)</li>
          <li>Click "Reverse Text"</li>
          <li>Copy the reversed text</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is the difference between reverse modes?',
            answer: 'Characters reverses each letter, Words reverses word order, Lines reverses line order.'
          },
          {
            question: 'What can I use reversed text for?',
            answer: 'Fun messages, mirror effects, palindrome checking, or creative content.'
          },
          {
            question: 'Does it work with emojis?',
            answer: 'Yes, the tool handles emojis and special characters.'
          },
          {
            question: 'Is my text uploaded anywhere?',
            answer: 'No, all processing happens in your browser. Your text never leaves your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Case Converter', slug: 'case-converter', icon: '🔤' },
          { name: 'Word Counter', slug: 'word-counter', icon: '📝' },
          { name: 'Text Sorter', slug: 'text-sorter', icon: '🔀' }
        ]}
      />
    </main>
  );
}
