'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export default function WordCounter() {
  const [inputText, setInputText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
  });

  const analyze = () => {
    const text = inputText;
    
    // Count words
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    // Count characters
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    
    // Count sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    // Count paragraphs
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
    
    // Count lines
    const lines = text.split('\n').length;

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      lines,
    });
  };

  const clearText = () => {
    setInputText('');
    setStats({
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
    });
  };

  const copyStats = () => {
    const statsText = `Words: ${stats.words}\nCharacters: ${stats.characters}\nCharacters (no spaces): ${stats.charactersNoSpaces}\nSentences: ${stats.sentences}\nParagraphs: ${stats.paragraphs}\nLines: ${stats.lines}`;
    navigator.clipboard.writeText(statsText);
    alert('Statistics copied to clipboard!');
  };

  return (
    <div className="tool-wrapper">
      <div className="page-header">
        <h1>Word Counter</h1>
        <p className="subtitle">
          Count words, characters, sentences and paragraphs instantly.
        </p>
      </div>

      <main>
        <div className="grid-container">
          {/* INPUT */}
          <div className="tool-col">
            <div className="col-header">
              <span>Input Text</span>
              <button className="copy-btn-small" onClick={clearText}>Clear</button>
            </div>
            <textarea
              id="input"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                analyze();
              }}
              placeholder="Paste or type your text here..."
              style={{ minHeight: '300px' }}
            />
          </div>

          {/* CONTROLS */}
          <div className="controls-col">
            <button className="icon-btn" onClick={analyze} title="Analyze">
              ▶
            </button>
          </div>

          {/* OUTPUT */}
          <div className="tool-col">
            <div className="col-header">
              <span>Statistics</span>
              <button className="copy-btn-small" onClick={copyStats}>Copy</button>
            </div>
            <div style={{ padding: '20px', backgroundColor: 'var(--bg-card)', borderRadius: '8px' }}>
              <p><strong>Words:</strong> {stats.words}</p>
              <p><strong>Characters:</strong> {stats.characters}</p>
              <p><strong>Characters (no spaces):</strong> {stats.charactersNoSpaces}</p>
              <p><strong>Sentences:</strong> {stats.sentences}</p>
              <p><strong>Paragraphs:</strong> {stats.paragraphs}</p>
              <p><strong>Lines:</strong> {stats.lines}</p>
            </div>
          </div>
        </div>
      </main>

      {/* RELATED TOOLS */}
      <section>
        <h2>Related Tools</h2>
        <div className="related-tools">
          <Link href="/r/case-converter">Case Converter</Link>
          <Link href="/r/remove-extra-spaces">Remove Extra Spaces</Link>
          <Link href="/r/json-formatter">JSON Formatter</Link>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="linearcolorchange">
        <h2>What Is Word Counter?</h2>
        <p>
          Word Counter is a free online tool that helps you count words, characters,
          sentences, paragraphs and lines in any text. Perfect for writers, students,
          and content creators who need to track word counts and character limits.
        </p>
      </section>
    </div>
  );
}
