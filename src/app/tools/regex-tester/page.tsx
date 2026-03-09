'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [allMatches, setAllMatches] = useState<any[]>([]);

  const testRegex = (pat: string, testStr: string, testFlags: string) => {
    try {
      setError('');
      if (!pat) {
        setMatches([]);
        setAllMatches([]);
        return;
      }

      const regex = new RegExp(pat, testFlags);
      const found: string[] = [];
      const fullMatches: any[] = [];

      if (testFlags.includes('g')) {
        let match;
        while ((match = regex.exec(testStr)) !== null) {
          found.push(match[0]);
          fullMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      } else {
        const match = testStr.match(regex);
        if (match) {
          found.push(match[0]);
          fullMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }

      setMatches(found);
      setAllMatches(fullMatches);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex');
      setMatches([]);
      setAllMatches([]);
    }
  };

  const handlePatternChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPattern = e.target.value;
    setPattern(newPattern);
    testRegex(newPattern, testString, flags);
  };

  const handleFlagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFlags = e.target.value;
    setFlags(newFlags);
    testRegex(pattern, testString, newFlags);
  };

  const handleTestStringChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newString = e.target.value;
    setTestString(newString);
    testRegex(pattern, newString, flags);
  };

  return (
    <>
      <ToolHero
        icon="🔍"
        title="Regex Tester"
        description="Test and debug regular expressions with real-time matching. Perfect for developers and data validation."
      />

      <ToolContainer title="Pattern & Flags">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regular Expression Pattern
            </label>
            <input
              type="text"
              value={pattern}
              onChange={handlePatternChange}
              placeholder="e.g., \\d{3}-\\d{3}-\\d{4}"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flags
            </label>
            <input
              type="text"
              value={flags}
              onChange={handleFlagsChange}
              placeholder="g, i, m, s"
              maxLength={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
            <p className="text-xs text-gray-600 mt-2">
              <strong>g:</strong> global, <strong>i:</strong> case-insensitive, <strong>m:</strong> multiline, <strong>s:</strong> dotAll
            </p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Test String">
        <textarea
          value={testString}
          onChange={handleTestStringChange}
          placeholder="Enter text to test against the pattern..."
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
        />
      </ToolContainer>

      {error && (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <strong>❌ Error:</strong> {error}
            </div>
          </div>
        </div>
      )}

      {matches.length > 0 && (
        <ToolContainer title="Results">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">✓ Found {matches.length} match{matches.length !== 1 ? 'es' : ''}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Matches</h3>
              <div className="space-y-2">
                {allMatches.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-200">
                    <code className="font-mono text-sm break-all">{item.match}</code>
                    <p className="text-xs text-gray-600 mt-1">Position: {item.index}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ToolContainer>
      )}

      {pattern && testString && matches.length === 0 && !error && (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
              No matches found
            </div>
          </div>
        </div>
      )}

      <ToolContainer title="Common Patterns">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
            <code className="text-xs text-gray-700 block break-all">{'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'}</code>
          </div>
          <div className="p-4 bg-gray-50 rounded border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">URL</h4>
            <code className="text-xs text-gray-700 block break-all">{'https?://[^\\s]+'}</code>
          </div>
          <div className="p-4 bg-gray-50 rounded border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Phone (US)</h4>
            <code className="text-xs text-gray-700 block break-all">{'\\d{3}-\\d{3}-\\d{4}'}</code>
          </div>
          <div className="p-4 bg-gray-50 rounded border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Hex Color</h4>
            <code className="text-xs text-gray-700 block break-all">{'#([a-f0-9]{6}|[a-f0-9]{3})'}</code>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What do regex flags do?',
            answer: 'Flags modify how the regex behaves: g (global) finds all matches, i (case-insensitive) ignores case, m (multiline) treats ^ and $ for each line.'
          },
          {
            question: 'What is \\d, \\w, \\s?',
            answer: '\\d matches digits, \\w matches word characters (letters/numbers/_), \\s matches whitespace. Use [^...] to match anything except.'
          },
          {
            question: 'Can I capture groups?',
            answer: 'Yes! Use parentheses () to create capture groups. The captured text is returned separately from the full match.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'JSON Formatter', slug: 'json-formatter', icon: '{ }' },
          { name: 'Text Sorter', slug: 'text-sorter', icon: '🔀' },
          { name: 'Base64 Encoder', slug: 'base64-encoder-decoder', icon: '🔐' }
        ]}
      />
    </>
  );
}
