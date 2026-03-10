'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function RandomTextGeneratorPage() {
  const [length, setLength] = useState(100);
  const [type, setType] = useState<'words' | 'sentences' | 'paragraphs'>('words');
  const [output, setOutput] = useState('');

  const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

  const generateRandom = () => {
    let result = '';

    switch (type) {
      case 'words':
        const words = [];
        for (let i = 0; i < length; i++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        result = words.join(' ');
        break;

      case 'sentences':
        const sentences = [];
        for (let i = 0; i < length; i++) {
          const sentenceLength = Math.floor(Math.random() * 10) + 5;
          const words = [];
          for (let j = 0; j < sentenceLength; j++) {
            words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
          }
          const sentence = words.join(' ');
          sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
        }
        result = sentences.join(' ');
        break;

      case 'paragraphs':
        const paragraphs = [];
        for (let i = 0; i < length; i++) {
          const sentenceCount = Math.floor(Math.random() * 5) + 3;
          const sentences = [];
          for (let j = 0; j < sentenceCount; j++) {
            const sentenceLength = Math.floor(Math.random() * 10) + 5;
            const words = [];
            for (let k = 0; k < sentenceLength; k++) {
              words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
            }
            const sentence = words.join(' ');
            sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
          }
          paragraphs.push(sentences.join(' '));
        }
        result = paragraphs.join('\n\n');
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
        icon="🎲"
        title="Random Text Generator"
        description="Generate random Lorem Ipsum text for testing and mockups. Choose words, sentences, or paragraphs."
      />

      <ToolContainer title="Generate Random Text">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Number of {type}
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value) || 1)}
                min="1"
                max="100"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Generate
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="words">Words</option>
                <option value="sentences">Sentences</option>
                <option value="paragraphs">Paragraphs</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateRandom}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Generate Text
          </button>

          {output && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Generated Text
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
                  className="w-full h-64 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                />
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🎲 Random</h3>
            <p className="mt-2 text-sm text-slate-600">Generate unique text each time</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚙️ Customizable</h3>
            <p className="mt-2 text-sm text-slate-600">Choose words, sentences, or paragraphs</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">Generate immediately</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Enter the number of words/sentences/paragraphs you need</li>
          <li>Select the type from the dropdown</li>
          <li>Click "Generate Text"</li>
          <li>Copy the generated text</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is Lorem Ipsum?',
            answer: 'Lorem Ipsum is placeholder text used in design and publishing. It\'s based on Latin text and provides realistic word distribution.'
          },
          {
            question: 'Why use placeholder text?',
            answer: 'Placeholder text helps designers and developers focus on layout without being distracted by actual content.'
          },
          {
            question: 'Is the text truly random?',
            answer: 'Yes, words are selected randomly from a Lorem Ipsum word pool to create unique text each time.'
          },
          {
            question: 'Can I use this for commercial projects?',
            answer: 'Yes, Lorem Ipsum text is free to use in any project, commercial or personal.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum-generator', icon: '📄' },
          { name: 'Word Counter', slug: 'word-counter', icon: '📝' },
          { name: 'Text Reverser', slug: 'text-reverser', icon: '🔄' }
        ]}
      />
    </main>
  );
}
