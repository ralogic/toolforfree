'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function BinaryConverterPage() {
  const [mode, setMode] = useState<'text-to-binary' | 'binary-to-text' | 'decimal-to-binary' | 'binary-to-decimal'>('text-to-binary');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const textToBinary = (text: string) => {
    return text
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const binaryToText = (binary: string) => {
    try {
      return binary
        .split(' ')
        .map((bin) => String.fromCharCode(parseInt(bin, 2)))
        .join('');
    } catch {
      return 'Invalid binary input';
    }
  };

  const decimalToBinary = (decimal: string) => {
    const num = parseInt(decimal);
    if (isNaN(num)) return 'Invalid number';
    return num.toString(2);
  };

  const binaryToDecimal = (binary: string) => {
    const num = parseInt(binary, 2);
    if (isNaN(num)) return 'Invalid binary';
    return num.toString();
  };

  const convert = () => {
    if (!input) return;

    let result = '';
    switch (mode) {
      case 'text-to-binary':
        result = textToBinary(input);
        break;
      case 'binary-to-text':
        result = binaryToText(input);
        break;
      case 'decimal-to-binary':
        result = decimalToBinary(input);
        break;
      case 'binary-to-decimal':
        result = binaryToDecimal(input);
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
        icon="🔢"
        title="Binary Converter"
        description="Convert between binary, decimal, and text. Perfect for programmers and students learning binary systems."
      />

      <ToolContainer title="Binary Conversion">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Conversion Type</label>
            <select
              value={mode}
              onChange={(e) => {
                setMode(e.target.value as any);
                setOutput('');
              }}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="text-to-binary">Text to Binary</option>
              <option value="binary-to-text">Binary to Text</option>
              <option value="decimal-to-binary">Decimal to Binary</option>
              <option value="binary-to-decimal">Binary to Decimal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === 'text-to-binary'
                  ? 'Enter text...'
                  : mode === 'binary-to-text'
                  ? 'Enter binary (space-separated 8-bit chunks)...'
                  : mode === 'decimal-to-binary'
                  ? 'Enter decimal number...'
                  : 'Enter binary number...'
              }
              className="w-full h-32 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={convert}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Convert
          </button>

          {output && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">Output</label>
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
                  className="w-full h-32 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm"
                />
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔄 4 Modes</h3>
            <p className="mt-2 text-sm text-slate-600">Multiple conversion types</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">Real-time conversion</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📋 Copy Ready</h3>
            <p className="mt-2 text-sm text-slate-600">One-click copy</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Select conversion type</li>
          <li>Enter your input text or number</li>
          <li>Click "Convert"</li>
          <li>View and copy the result</li>
        </ol>
      </ToolContainer>

      <ToolContainer title="Conversion Examples">
        <div className="space-y-3 text-sm">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="font-semibold text-slate-900">Text to Binary:</p>
            <p className="text-slate-700 mt-1">"Hello" → 01001000 01100101 01101100 01101100 01101111</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="font-semibold text-slate-900">Binary to Text:</p>
            <p className="text-slate-700 mt-1">01001000 01101001 → "Hi"</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="font-semibold text-slate-900">Decimal to Binary:</p>
            <p className="text-slate-700 mt-1">10 → 1010</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="font-semibold text-slate-900">Binary to Decimal:</p>
            <p className="text-slate-700 mt-1">1010 → 10</p>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is binary?',
            answer: 'Binary is a base-2 number system using only 0 and 1. Computers use binary to store and process all data.'
          },
          {
            question: 'How does text to binary work?',
            answer: 'Each character is converted to its ASCII code, then represented in binary. For example, "A" is ASCII 65, which is 01000001 in binary.'
          },
          {
            question: 'What format for binary to text conversion?',
            answer: 'Enter binary in 8-bit chunks separated by spaces. Each 8-bit chunk represents one character.'
          },
          {
            question: 'Can I convert large numbers?',
            answer: 'Yes, you can convert any decimal number to binary and vice versa. The tool handles both small and large numbers.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Hash Generator', slug: 'hash-generator', icon: '🔐' },
          { name: 'Base64 Encoder/Decoder', slug: 'base64-encoder-decoder', icon: '🔤' },
          { name: 'Unit Converter', slug: 'unit-converter', icon: '📏' }
        ]}
      />
    </main>
  );
}
