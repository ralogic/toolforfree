'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Base64EncoderDecoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');

  const encodeBase64 = () => {
    try {
      const utf8Bytes = new TextEncoder().encode(inputText);
      let binary = '';
      utf8Bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });
      setOutputText(btoa(binary));
      setError('');
    } catch (e: any) {
      setOutputText('');
      setError('Unable to encode text: ' + e.message);
    }
  };

  const decodeBase64 = () => {
    try {
      const binary = atob(inputText.trim());
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      setOutputText(new TextDecoder().decode(bytes));
      setError('');
    } catch (e: any) {
      setOutputText('');
      setError('Invalid Base64 input: ' + e.message);
    }
  };

  const swapInputOutput = () => {
    setInputText(outputText);
    setOutputText(inputText);
    setError('');
  };

  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setError('');
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
        <h1>Base64 Encoder / Decoder</h1>
        <p className="subtitle">Encode text to Base64 and decode Base64 back to text instantly.</p>
      </div>

      <main>
        <div className="grid-container">
          <div className="tool-col">
            <div className="col-header">
              <span>Input</span>
              <button className="copy-btn-small" onClick={clearAll}>Clear</button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter plain text to encode, or Base64 to decode..."
              style={{ minHeight: '300px', fontFamily: 'monospace' }}
            />
          </div>

          <div className="controls-col">
            <button className="icon-btn" onClick={encodeBase64} title="Encode to Base64">▶</button>
            <button className="icon-btn" onClick={decodeBase64} title="Decode Base64">◀</button>
            <button className="icon-btn" onClick={swapInputOutput} title="Swap input and output">⇄</button>
          </div>

          <div className="tool-col">
            <div className="col-header">
              <span>Output</span>
              <button className="copy-btn-small" onClick={copyOutput}>Copy</button>
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Result will appear here..."
              style={{ minHeight: '300px', fontFamily: 'monospace' }}
            />
            {error && (
              <div style={{ color: 'red', marginTop: '10px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
                {error}
              </div>
            )}
          </div>
        </div>
      </main>

      <section>
        <h2>Related Tools</h2>
        <div className="related-tools">
          <Link href="/r/json-formatter">JSON Formatter</Link>
          <Link href="/r/case-converter">Case Converter</Link>
          <Link href="/r/remove-extra-spaces">Remove Extra Spaces</Link>
        </div>
      </section>

      <section className="linearcolorchange">
        <h2>What Is Base64 Encoder / Decoder?</h2>
        <p>
          This free online Base64 tool helps developers and users quickly convert text to Base64 and decode
          Base64 back to readable text. All processing is done directly in your browser for speed and privacy.
        </p>
      </section>
    </div>
  );
}
