'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { encodeURL, decodeURL } from '@/lib/utils';

export default function URLEncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInput(text);
    processURL(text, mode);
  };

  const processURL = (text: string, currentMode: 'encode' | 'decode') => {
    try {
      setError('');
      if (!text.trim()) {
        setOutput('');
        return;
      }
      const result = currentMode === 'encode' ? encodeURL(text) : decodeURL(text);
      setOutput(result);
    } catch (err) {
      setError('Error: ' + (err instanceof Error ? err.message : 'Unknown error'));
      setOutput('');
    }
  };

  const handleModeChange = (newMode: 'encode' | 'decode') => {
    setMode(newMode);
    processURL(input, newMode);
  };

  return (
    <>
      <ToolHero
        icon="🌐"
        title="URL Encoder / Decoder"
        description="Encode and decode URL-safe strings. Essential for query parameters, form data, and web development."
      />

      <ToolContainer title="Mode">
        <div className="flex gap-4">
          <button
            onClick={() => handleModeChange('encode')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mode === 'encode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => handleModeChange('decode')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mode === 'decode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Decode
          </button>
        </div>
      </ToolContainer>

      <ToolContainer title={mode === 'encode' ? 'Text to Encode' : 'URL to Decode'}>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste encoded URL...'}
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
        <ToolContainer title="Result">
          <ResultBox
            title={mode === 'encode' ? 'Encoded URL' : 'Decoded Text'}
            copyText={output}
          >
            {output}
          </ResultBox>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Encoding</h3>
            <p className="text-gray-700">Input: <code className="bg-gray-100 px-2 py-1 rounded">hello world!</code></p>
            <p className="text-gray-700 mt-2">Output: <code className="bg-gray-100 px-2 py-1 rounded">hello%20world%21</code></p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Decoding</h3>
            <p className="text-gray-700">Input: <code className="bg-gray-100 px-2 py-1 rounded">hello%20world%21</code></p>
            <p className="text-gray-700 mt-2">Output: <code className="bg-gray-100 px-2 py-1 rounded">hello world!</code></p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Use Cases">
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Query parameters:</strong> URL encode form data</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Search terms:</strong> Encode user search queries</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>API calls:</strong> Prepare data for API endpoints</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Special characters:</strong> Handle spaces, symbols, etc.</span>
          </li>
        </ul>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Why do URLs need encoding?',
            answer: 'URLs can only contain certain characters. Special characters like spaces, &, ?, # need encoding to be safely transmitted.'
          },
          {
            question: 'What does %20 mean?',
            answer: '%20 is the URL-encoded representation of a space character. Each encoded character uses % followed by its hex value.'
          },
          {
            question: 'When should I use URL encoding?',
            answer: 'Use URL encoding when including user input in URLs, query parameters, or form data.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Base64 Encoder', slug: 'base64-encoder-decoder', icon: '🔐' },
          { name: 'JWT Decoder', slug: 'jwt-decoder', icon: '🔑' },
          { name: 'JSON Formatter', slug: 'json-formatter', icon: '{ }' }
        ]}
      />
    </>
  );
}
