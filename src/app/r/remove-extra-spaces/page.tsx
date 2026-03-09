'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RemoveExtraSpaces() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const normalizeSpaces = () => {
    // Replace repeated spaces/tabs/newlines with single spaces and trim edges.
    const normalized = inputText.replace(/\s+/g, ' ').trim();
    setOutputText(normalized);
  };

  const normalizeLinesOnly = () => {
    const normalized = inputText
      .split('\n')
      .map((line) => line.replace(/[ \t]+/g, ' ').trim())
      .filter((line) => line.length > 0)
      .join('\n');
    setOutputText(normalized);
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
  };

  const copyOutput = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      alert('Output copied to clipboard!');
    }
  };

  return (
    <div className="tool-wrapper">
      <div className="page-header">
        <h1>Remove Extra Spaces</h1>
        <p className="subtitle">Clean unnecessary spaces and tidy up text instantly.</p>
      </div>

      <main>
        <div className="grid-container">
          <div className="tool-col">
            <div className="col-header">
              <span>Input Text</span>
              <button className="copy-btn-small" onClick={clearAll}>Clear</button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste text with irregular spacing..."
              style={{ minHeight: '300px' }}
            />
          </div>

          <div className="controls-col">
            <button className="icon-btn" onClick={normalizeSpaces} title="Single-space text">▶</button>
            <button className="icon-btn" onClick={normalizeLinesOnly} title="Clean each line">≡</button>
          </div>

          <div className="tool-col">
            <div className="col-header">
              <span>Cleaned Text</span>
              <button className="copy-btn-small" onClick={copyOutput}>Copy</button>
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Cleaned result will appear here..."
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn" onClick={normalizeSpaces}>Remove Extra Spaces</button>
          <button className="btn btn-outline" onClick={normalizeLinesOnly}>Clean Line by Line</button>
        </div>
      </main>

      <section>
        <h2>Related Tools</h2>
        <div className="related-tools">
          <Link href="/r/case-converter">Case Converter</Link>
          <Link href="/r/word-counter">Word Counter</Link>
          <Link href="/r/json-formatter">JSON Formatter</Link>
        </div>
      </section>

      <section className="linearcolorchange">
        <h2>Why Use Remove Extra Spaces?</h2>
        <p>
          Remove Extra Spaces helps clean messy text copied from websites, PDFs, or editors by removing repeated
          spaces and improving readability. Everything runs in your browser with no uploads.
        </p>
      </section>
    </div>
  );
}
