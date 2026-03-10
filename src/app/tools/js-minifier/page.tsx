'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function JsMinifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });

  const minifyJs = () => {
    if (!input.trim()) {
      alert('Please enter JavaScript code');
      return;
    }

    try {
      // Simple JS minification
      let minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\/\/.*/g, '') // Remove single-line comments
        .replace(/\s+/g, ' ') // Replace multiple spaces
        .replace(/\s*([{}()[\];,:<>+\-*/%&|^!~?])\s*/g, '$1') // Remove spaces around operators
        .trim();

      setOutput(minified);

      const originalSize = new Blob([input]).size;
      const minifiedSize = new Blob([minified]).size;
      const savedPercent = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);

      setStats({
        original: originalSize,
        minified: minifiedSize,
        saved: parseFloat(savedPercent)
      });
    } catch (error) {
      alert('Error minifying JavaScript. Please check your code.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="⚡"
        title="JavaScript Minifier"
        description="Minify JavaScript code to reduce file size. Remove whitespace, comments, and optimize your JS for production."
      />

      <ToolContainer title="Minify JavaScript Code">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              JavaScript Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JavaScript code here..."
              className="w-full h-48 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={minifyJs}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Minify JavaScript
          </button>

          {output && (
            <>
              <div className="rounded-xl border border-slate-200 bg-blue-50 p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-slate-600">Original</p>
                    <p className="text-lg font-bold text-slate-900">{stats.original}B</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Minified</p>
                    <p className="text-lg font-bold text-blue-600">{stats.minified}B</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Saved</p>
                    <p className="text-lg font-bold text-green-600">{stats.saved}%</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Minified Output
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
            <h3 className="font-semibold text-slate-900">📦 Reduced Size</h3>
            <p className="mt-2 text-sm text-slate-600">Significantly smaller file size</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Better Performance</h3>
            <p className="mt-2 text-sm text-slate-600">Faster page load times</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📊 Statistics</h3>
            <p className="mt-2 text-sm text-slate-600">Track size reduction</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Paste your JavaScript code in the input area</li>
          <li>Click "Minify JavaScript"</li>
          <li>Review the size reduction statistics</li>
          <li>Copy the minified code for production use</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is JavaScript minification?',
            answer: 'Minification removes whitespace, comments, and shortens variable names to reduce file size without changing functionality.'
          },
          {
            question: 'Will minification break my code?',
            answer: 'This basic minifier is safe for most code. For complex projects, use advanced tools like Terser or UglifyJS.'
          },
          {
            question: 'Should I minify for production?',
            answer: 'Yes, minified JavaScript loads faster, uses less bandwidth, and improves overall site performance.'
          },
          {
            question: 'Is my code uploaded anywhere?',
            answer: 'No, all minification happens in your browser. Your code never leaves your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'JS Beautifier', slug: 'js-beautifier', icon: '✨' },
          { name: 'CSS Minifier', slug: 'css-minifier', icon: '🎨' },
          { name: 'JSON Formatter', slug: 'json-formatter', icon: '{ }' }
        ]}
      />
    </main>
  );
}
