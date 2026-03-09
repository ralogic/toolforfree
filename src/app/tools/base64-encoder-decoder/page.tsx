'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { encodeBase64, decodeBase64 } from '@/lib/utils';

export default function Base64Page() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInput(text);
    processBase64(text, mode);
  };

  const processBase64 = (text: string, currentMode: 'encode' | 'decode') => {
    try {
      setError('');
      if (!text.trim()) {
        setOutput('');
        return;
      }
      const result = currentMode === 'encode' ? encodeBase64(text) : decodeBase64(text);
      if (!result) {
        setError('Failed to process. Please check your input.');
        setOutput('');
      } else {
        setOutput(result);
      }
    } catch (err) {
      setError('Error: ' + (err instanceof Error ? err.message : 'Unknown error'));
      setOutput('');
    }
  };

  const handleModeChange = (newMode: 'encode' | 'decode') => {
    setMode(newMode);
    processBase64(input, newMode);
  };

  return (
    <>
      <ToolHero
        icon="🔐"
        title="Base64 Encoder / Decoder"
        description="Convert text to Base64 encoding and decode Base64 strings. Essential for data transmission and security."
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
            Encode to Base64
          </button>
          <button
            onClick={() => handleModeChange('decode')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mode === 'decode'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Decode from Base64
          </button>
        </div>
      </ToolContainer>

      <ToolContainer title={mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 string...'}
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
            title={mode === 'encode' ? 'Encoded Base64' : 'Decoded Text'}
            copyText={output}
          >
            {output}
          </ResultBox>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Encoding (Text → Base64)</h3>
            <p className="text-gray-700">Select "Encode to Base64" mode, paste your text, and get the Base64 result instantly.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Decoding (Base64 → Text)</h3>
            <p className="text-gray-700">Select "Decode from Base64" mode, paste the encoded string to get original text.</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="What is Base64?">
        <p className="text-gray-700 mb-4">
          Base64 is an encoding scheme that converts binary data into printable ASCII characters. It uses 64 characters (A-Z, a-z, 0-9, +, /) to represent data.
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Encoding:</strong> Converts any text/binary data into Base64 format</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Decoding:</strong> Converts Base64 back to original text</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Use cases:</strong> Email attachments, data URLs, APIs</span>
          </li>
        </ul>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Is Base64 encryption?',
            answer: 'No. Base64 is encoding, not encryption. It is easily reversible and should not be used for security. Use proper encryption for sensitive data.'
          },
          {
            question: 'Why would I use Base64?',
            answer: 'Base64 makes binary data portable as text. It is used for email attachments, data URLs in HTML/CSS, and API authentication headers.'
          },
          {
            question: 'Can I decode any string?',
            answer: 'Only valid Base64 strings can be decoded. Invalid inputs will show an error.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'URL Encoder', slug: 'url-encoder-decoder', icon: '🌐' },
          { name: 'JWT Decoder', slug: 'jwt-decoder', icon: '🔑' },
          { name: 'JSON Formatter', slug: 'json-formatter', icon: '{ }' }
        ]}
      />
    </>
  );
}
