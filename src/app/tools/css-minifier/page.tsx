'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function CssMinifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });

  const minifyCss = () => {
    if (!input.trim()) {
      alert('Please enter CSS code');
      return;
    }

    try {
      // Simple CSS minification
      let minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around special chars
        .replace(/;}/g, '}') // Remove last semicolon
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
      alert('Error minifying CSS. Please check your code.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🎨"
        title="CSS Minifier"
        description="Minify CSS code to reduce file size. Remove whitespace, comments, and optimize your stylesheets for production."
      />

      <ToolContainer title="Minify CSS Code">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              CSS Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your CSS code here..."
              className="w-full h-48 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={minifyCss}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Minify CSS
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
            <h3 className="font-semibold text-slate-900">📦 Smaller Files</h3>
            <p className="mt-2 text-sm text-slate-600">Reduce CSS file size significantly</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Faster Loading</h3>
            <p className="mt-2 text-sm text-slate-600">Improve page load times</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📊 Size Stats</h3>
            <p className="mt-2 text-sm text-slate-600">See how much you saved</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Paste your CSS code in the input area</li>
          <li>Click "Minify CSS"</li>
          <li>View size reduction statistics</li>
          <li>Copy the minified CSS for production use</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What does CSS minification do?',
            answer: 'It removes whitespace, comments, and unnecessary characters to reduce file size without changing functionality.'
          },
          {
            question: 'Should I minify CSS for production?',
            answer: 'Yes, minified CSS loads faster and uses less bandwidth, improving user experience and SEO.'
          },
          {
            question: 'Can I reverse minification?',
            answer: 'Minification removes formatting but not functionality. Keep original files for development.'
          },
          {
            question: 'Is my code uploaded anywhere?',
            answer: 'No, all minification happens in your browser. Your code never leaves your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'JS Minifier', slug: 'js-minifier', icon: '⚡' },
          { name: 'HTML Formatter', slug: 'html-formatter', icon: '📝' },
          { name: 'JS Beautifier', slug: 'js-beautifier', icon: '✨' }
        ]}
      />
    </main>
  );
}
