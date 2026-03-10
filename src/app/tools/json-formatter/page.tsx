'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolSEO from '@/components/ToolSEO';
import { formatJSON, minifyJSON } from '@/lib/utils';
import { getToolBySlug, getRelatedTools } from '@/lib/tool-seo';

export default function JSONFormatterPage() {
  const tool = getToolBySlug('json-formatter');
  const relatedTools = getRelatedTools(tool || {} as any, 3);
  
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

  const toolFAQs = [
    {
      question: 'What is JSON formatting?',
      answer: 'JSON formatting adds indentation, line breaks, and proper spacing to make JSON data readable. It transforms minified JSON into a structured, easy-to-read format.',
    },
    {
      question: 'When should I minify JSON?',
      answer: 'Minify JSON for production APIs, configuration files, or when transmitting data over networks. Minified JSON is smaller and faster to transfer but harder to read.',
    },
    {
      question: 'Can this tool validate JSON syntax?',
      answer: 'Yes! The tool automatically detects and reports JSON syntax errors, helping you identify issues like missing commas, unclosed brackets, or invalid characters.',
    },
  ];

  return (
    <>
      {/* SEO Structured Data */}
      {tool && <ToolSEO tool={tool} additionalFAQs={toolFAQs} />}
      
      <ToolHero
        icon="{ }"
        title="JSON Formatter & Validator"
        description="Format, validate, and minify JSON online. Free JSON formatter with syntax highlighting and error detection. No signup required."
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

      {/* SEO Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Use JSON Formatter</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-blue-600 text-lg">1.</span>
              <div>
                <h3 className="font-semibold mb-1">Paste Your JSON</h3>
                <p>Copy your JSON code and paste it into the input textarea above.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-blue-600 text-lg">2.</span>
              <div>
                <h3 className="font-semibold mb-1">Choose Format or Minify</h3>
                <p>Select "Format" for readable output with indentation, or "Minify" to compress.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold text-blue-600 text-lg">3.</span>
              <div>
                <h3 className="font-semibold mb-1">Copy the Result</h3>
                <p>Click the copy button to save the processed JSON to your clipboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToolContainer title="Key Features">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl mt-0.5">✓</span>
            <div>
              <strong className="text-gray-900">Format & Beautify:</strong>
              <span className="text-gray-700 ml-1">Transform minified JSON into readable format with proper indentation</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl mt-0.5">✓</span>
            <div>
              <strong className="text-gray-900">Minify & Compress:</strong>
              <span className="text-gray-700 ml-1">Remove all whitespace to reduce file size for production</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl mt-0.5">✓</span>
            <div>
              <strong className="text-gray-900">Syntax Validation:</strong>
              <span className="text-gray-700 ml-1">Automatically detect and report JSON errors with helpful messages</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl mt-0.5">✓</span>
            <div>
              <strong className="text-gray-900">Real-time Processing:</strong>
              <span className="text-gray-700 ml-1">Instant results as you type, no manual trigger needed</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 text-xl mt-0.5">✓</span>
            <div>
              <strong className="text-gray-900">100% Private:</strong>
              <span className="text-gray-700 ml-1">All processing happens in your browser, data never leaves your device</span>
            </div>
          </li>
        </ul>
      </ToolContainer>

      {/* Why Use Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Use This JSON Formatter?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🚀 Fast & Efficient</h3>
              <p className="text-gray-700">Process JSON instantly without server delays. Works completely offline in your browser.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🔒 Secure & Private</h3>
              <p className="text-gray-700">Your JSON data never leaves your computer. Perfect for sensitive configuration files.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">💰 Completely Free</h3>
              <p className="text-gray-700">No subscriptions, no limits, no watermarks. Use as much as you need.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Developer Friendly</h3>
              <p className="text-gray-700">Built for developers with real-time validation and clear error messages.</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={toolFAQs} />

      {relatedTools.length > 0 && <RelatedTools tools={relatedTools} />}
    </>
  );
}
