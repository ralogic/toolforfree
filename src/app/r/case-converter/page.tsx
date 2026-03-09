'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CaseConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const toUpperCase = () => {
    setOutputText(inputText.toUpperCase());
  };

  const toLowerCase = () => {
    setOutputText(inputText.toLowerCase());
  };

  const toTitleCase = () => {
    const converted = inputText
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setOutputText(converted);
  };

  const toSentenceCase = () => {
    const converted = inputText
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    setOutputText(converted);
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
        <h1>Case Converter</h1>
        <p className="subtitle">Convert text between upper, lower, title and sentence case.</p>
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
              placeholder="Type or paste text here..."
              style={{ minHeight: '300px' }}
            />
          </div>

          <div className="controls-col">
            <button className="icon-btn" onClick={toUpperCase} title="UPPERCASE">U</button>
            <button className="icon-btn" onClick={toLowerCase} title="lowercase">l</button>
            <button className="icon-btn" onClick={toTitleCase} title="Title Case">T</button>
            <button className="icon-btn" onClick={toSentenceCase} title="Sentence case">S</button>
          </div>

          <div className="tool-col">
            <div className="col-header">
              <span>Output Text</span>
              <button className="copy-btn-small" onClick={copyOutput}>Copy</button>
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Converted text will appear here..."
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn" onClick={toUpperCase}>UPPERCASE</button>
          <button className="btn btn-outline" onClick={toLowerCase}>lowercase</button>
          <button className="btn btn-outline" onClick={toTitleCase}>Title Case</button>
          <button className="btn btn-outline" onClick={toSentenceCase}>Sentence case</button>
        </div>
      </main>

      <section>
        <h2>Related Tools</h2>
        <div className="related-tools">
          <Link href="/r/remove-extra-spaces">Remove Extra Spaces</Link>
          <Link href="/r/word-counter">Word Counter</Link>
          <Link href="/r/base64-encoder-decoder">Base64 Encoder / Decoder</Link>
        </div>
      </section>

      <section className="linearcolorchange">
        <h2>What Is Case Converter?</h2>
        <p>
          Case Converter is a free text tool to quickly transform any text into uppercase, lowercase,
          title case, or sentence case. It is useful for content writing, coding, and formatting tasks.
        </p>
      </section>
    </div>
  );
}
