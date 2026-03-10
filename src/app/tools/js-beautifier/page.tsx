'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function JsBeautifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentSize, setIndentSize] = useState(2);

  const beautifyJs = () => {
    if (!input.trim()) {
      alert('Please enter JavaScript code');
      return;
    }

    try {
      // Simple JS beautifier
      let code = input.trim();
      let indent = 0;
      let result = '';
      const spaces = ' '.repeat(indentSize);
      
      for (let i = 0; i < code.length; i++) {
        const char = code[i];
        const nextChar = code[i + 1];
        
        if (char === '{') {
          result += char + '\n';
          indent++;
          result += spaces.repeat(indent);
        } else if (char === '}') {
          indent = Math.max(0, indent - 1);
          result = result.trimEnd() + '\n' + spaces.repeat(indent) + char;
          if (nextChar && nextChar !== ',' && nextChar !== ';' && nextChar !== ')') {
            result += '\n' + spaces.repeat(indent);
          }
        } else if (char === ';') {
          result += char;
          if (nextChar && nextChar !== '\n' && nextChar !== '}') {
            result += '\n' + spaces.repeat(indent);
          }
        } else {
          result += char;
        }
      }
      
      setOutput(result);
    } catch (error) {
      alert('Error beautifying JavaScript. Please check your code.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="✨"
        title="JavaScript Beautifier"
        description="Format and beautify JavaScript code with proper indentation. Make your JS clean, readable, and well-structured."
      />

      <ToolContainer title="Beautify JavaScript Code">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              JavaScript Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your minified or unformatted JavaScript here..."
              className="w-full h-48 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-slate-900">
              Indent Size:
            </label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(parseInt(e.target.value))}
              className="rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="8">8 spaces</option>
            </select>
          </div>

          <button
            onClick={beautifyJs}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Beautify JavaScript
          </button>

          {output && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-900">
                    Beautified Output
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
                  className="w-full h-48 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-mono text-sm"
                />
              </div>
            </>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">✨ Clean Formatting</h3>
            <p className="mt-2 text-sm text-slate-600">Proper indentation and structure</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📖 Readable Code</h3>
            <p className="mt-2 text-sm text-slate-600">Easy to read and maintain</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚙️ Customizable</h3>
            <p className="mt-2 text-sm text-slate-600">Choose indent size</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Paste your minified or unformatted JavaScript code</li>
          <li>Select your preferred indent size</li>
          <li>Click "Beautify JavaScript"</li>
          <li>Copy the formatted code</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What does beautification do?',
            answer: 'It adds proper indentation, line breaks, and spacing to make code more readable without changing functionality.'
          },
          {
            question: 'Can it format minified code?',
            answer: 'Yes, this tool can beautify minified JavaScript to make it readable again.'
          },
          {
            question: 'Will it fix syntax errors?',
            answer: 'No, this tool only formats code. It won\'t fix syntax errors or bugs in your JavaScript.'
          },
          {
            question: 'Is my code uploaded anywhere?',
            answer: 'No, all beautification happens in your browser. Your code never leaves your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'JS Minifier', slug: 'js-minifier', icon: '⚡' },
          { name: 'JSON Formatter', slug: 'json-formatter', icon: '{ }' },
          { name: 'HTML Formatter', slug: 'html-formatter', icon: '📝' }
        ]}
      />
    </main>
  );
}
