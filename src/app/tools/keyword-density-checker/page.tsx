'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

interface KeywordData {
  keyword: string;
  count: number;
  density: string;
}

export default function KeywordDensityCheckerPage() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<KeywordData[]>([]);
  const [totalWords, setTotalWords] = useState(0);

  const analyzeText = () => {
    if (!text.trim()) return;

    // Remove punctuation and convert to lowercase
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
    const words = cleanText.split(/\s+/).filter((word) => word.length > 2);
    const total = words.length;

    // Count word frequency
    const frequency: Record<string, number> = {};
    words.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    // Convert to array and calculate density
    const keywordArray: KeywordData[] = Object.entries(frequency)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: ((count / total) * 100).toFixed(2)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30); // Top 30 keywords

    setResults(keywordArray);
    setTotalWords(total);
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🔍"
        title="Keyword Density Checker"
        description="Analyze keyword frequency and density in your content. Optimize your text for better SEO performance."
      />

      <ToolContainer title="Analyze Content">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Enter Your Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your content here..."
              className="w-full h-64 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={analyzeText}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Analyze Keyword Density
          </button>

          {results.length > 0 && (
            <>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Statistics</h3>
                <p className="text-sm text-slate-700">
                  Total Words: <span className="font-semibold">{totalWords}</span>
                </p>
                <p className="text-sm text-slate-700">
                  Unique Keywords: <span className="font-semibold">{results.length}</span>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Top Keywords (excluding words with less than 3 characters)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                          Keyword
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                          Count
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                          Density
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((item, index) => (
                        <tr key={index} className="border-b border-slate-100">
                          <td className="px-4 py-3 text-sm text-slate-700">{item.keyword}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">{item.count}</td>
                          <td className="px-4 py-3 text-sm text-slate-700">{item.density}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📊 Detailed Analysis</h3>
            <p className="mt-2 text-sm text-slate-600">Count and density metrics</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🎯 SEO Insights</h3>
            <p className="mt-2 text-sm text-slate-600">Optimize keyword usage</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant Results</h3>
            <p className="mt-2 text-sm text-slate-600">Real-time analysis</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Paste your content into the text area</li>
          <li>Click "Analyze Keyword Density"</li>
          <li>Review the top keywords and their frequency</li>
          <li>Check density percentages</li>
          <li>Optimize your content based on results</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is keyword density?',
            answer: 'Keyword density is the percentage of times a keyword appears in your content compared to the total word count.'
          },
          {
            question: 'What is a good keyword density?',
            answer: 'Generally, 1-3% is considered optimal. Higher densities may be seen as keyword stuffing by search engines.'
          },
          {
            question: 'Why are short words excluded?',
            answer: 'Words with less than 3 characters (like "is", "a", "on") are usually stop words that don\'t add SEO value.'
          },
          {
            question: 'How can I improve my content?',
            answer: 'Use your target keywords naturally, avoid over-repetition, and focus on providing valuable content.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Meta Tag Generator', slug: 'meta-tag-generator', icon: '🏷️' },
          { name: 'Word Counter', slug: 'word-counter', icon: '📝' },
          { name: 'Character Counter', slug: 'character-counter', icon: '🔤' }
        ]}
      />
    </main>
  );
}
