'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { formatJSON, minifyJSON } from '@/lib/utils';

export default function JSONFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'format' | 'minify'>('format');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInput(text);
    processJSON(text, mode);
  };

  const processJSON = (text: string, currentMode: 'format' | 'minify') => {
    try {
      setError('');
      if (!text.trim()) {
        setOutput('');
        return;
      }
      if (currentMode === 'format') {
        setOutput(formatJSON(text, 2));
      } else {
        setOutput(minifyJSON(text));
      }
    } catch (err) {
      setError('Invalid JSON: ' + (err instanceof Error ? err.message : 'Unknown error'));
      setOutput('');
    }
  };

  const handleModeChange = (newMode: 'format' | 'minify') => {
    setMode(newMode);
    processJSON(input, newMode);
  };

  return (
    <>
      <ToolHero
        icon="{ }"
        title="JSON Formatter"
        description="Format, validate, and minify JSON with one click. Perfect for debugging and code review."
      />

      <ToolContainer title="Mode">
        <div className="flex gap-4">
          <button
            onClick={() => handleModeChange('format')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mode === 'format'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Format & Beautify
          </button>
          <button
            onClick={() => handleModeChange('minify')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mode === 'minify'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Minify
          </button>
        </div>
      </ToolContainer>

      <ToolContainer title="Input JSON">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder='{"key": "value"}'
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-vertical"
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

      {output && (
        <ToolContainer title="Output">
          <ResultBox
            title={mode === 'format' ? 'Formatted JSON' : 'Minified JSON'}
            copyText={output}
          >
            {output}
          </ResultBox>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Paste JSON</h3>
            <p className="text-gray-700">Paste your JSON code into the input textarea.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Choose Mode</h3>
            <p className="text-gray-700">Select Format for readable output or Minify to reduce file size.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Copy Result</h3>
            <p className="text-gray-700">Copy the processed JSON and use it in your project.</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Format & beautify:</strong> Add proper indentation and line breaks</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Minify:</strong> Remove whitespace to reduce file size</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Validation:</strong> Detects invalid JSON automatically</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Real-time:</strong> Instant processing as you type</span>
          </li>
        </ul>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is JSON formatting?',
            answer: 'Formatting adds indentation and line breaks to make JSON readable for humans. Minifying removes all whitespace to reduce file size.'
          },
          {
            question: 'How do I use minified JSON?',
            answer: 'Minified JSON is smaller and faster to transmit over networks. Use it for production APIs and data files.'
          },
          {
            question: 'Is my data stored?',
            answer: 'No. All processing happens in your browser. Your data is never sent to any server.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Base64 Encoder', slug: 'base64-encoder-decoder', icon: '🔐' },
          { name: 'JWT Decoder', slug: 'jwt-decoder', icon: '🔑' },
          { name: 'URL Encoder', slug: 'url-encoder-decoder', icon: '🌐' }
        ]}
      />
    </>
  );
}
