'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JSONFormatter() {
  const [inputJSON, setInputJSON] = useState('');
  const [outputJSON, setOutputJSON] = useState('');
  const [error, setError] = useState('');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(inputJSON);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJSON(formatted);
      setError('');
    } catch (e: any) {
      setError('Invalid JSON: ' + e.message);
      setOutputJSON('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(inputJSON);
      const minified = JSON.stringify(parsed);
      setOutputJSON(minified);
      setError('');
    } catch (e: any) {
      setError('Invalid JSON: ' + e.message);
      setOutputJSON('');
    }
  };

  const clearAll = () => {
    setInputJSON('');
    setOutputJSON('');
    setError('');
  };

  const copyOutput = () => {
    if (outputJSON) {
      navigator.clipboard.writeText(outputJSON);
      alert('JSON copied to clipboard!');
    }
  };

  return (
    <div className="tool-wrapper">
      <div className="page-header">
        <h1>JSON Formatter</h1>
        <p className="subtitle">
          Format, validate and minify JSON data online
        </p>
      </div>

      <main>
        <div className="grid-container">
          {/* INPUT */}
          <div className="tool-col">
            <div className="col-header">
              <span>Input JSON</span>
              <button className="copy-btn-small" onClick={clearAll}>Clear</button>
            </div>
            <textarea
              id="input"
              value={inputJSON}
              onChange={(e) => setInputJSON(e.target.value)}
              placeholder='Paste your JSON here... e.g. {"name":"John","age":30}'
              style={{ minHeight: '300px', fontFamily: 'monospace' }}
            />
          </div>

          {/* CONTROLS */}
          <div className="controls-col">
            <button className="icon-btn" onClick={formatJSON} title="Format">
              ▶
            </button>
            <button className="icon-btn" onClick={minifyJSON} title="Minify">
              🗜️
            </button>
          </div>

          {/* OUTPUT */}
          <div className="tool-col">
            <div className="col-header">
              <span>Output JSON</span>
              <button className="copy-btn-small" onClick={copyOutput}>Copy</button>
            </div>
            <textarea
              id="output"
              value={outputJSON}
              readOnly
              placeholder="Formatted JSON will appear here..."
              style={{ minHeight: '300px', fontFamily: 'monospace' }}
            />
            {error && (
              <div style={{ color: 'red', marginTop: '10px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
                {error}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
          <button className="btn" onClick={formatJSON}>Format JSON</button>
          <button className="btn btn-outline" onClick={minifyJSON}>Minify JSON</button>
        </div>
      </main>

      {/* RELATED TOOLS */}
      <section>
        <h2>Related Tools</h2>
        <div className="related-tools">
          <Link href="/r/base64-encoder-decoder">Base64 Encoder</Link>
          <Link href="/r/word-counter">Word Counter</Link>
          <Link href="/r/case-converter">Case Converter</Link>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="linearcolorchange">
        <h2>What Is JSON Formatter?</h2>
        <p>
          JSON Formatter is a free online tool to format, validate, and minify JSON data.
          Perfect for developers working with APIs, configuration files, or debugging JSON.
          Format messy JSON into readable code or minify it for production use.
        </p>
      </section>
    </div>
  );
}
