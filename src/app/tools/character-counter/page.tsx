'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function CharacterCounterPage() {
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text.split('\n').length,
    sentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
    paragraphs: text.split(/\n\s*\n/).filter(p => p.trim()).length
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🔢"
        title="Character Counter"
        description="Count characters, words, lines, sentences, and paragraphs in real-time. Perfect for writers and content creators."
      />

      <ToolContainer title="Text Statistics">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Enter Your Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing to see statistics..."
              className="w-full h-64 rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Characters</p>
              <p className="text-3xl font-bold text-blue-900">{stats.characters}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4">
              <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">No Spaces</p>
              <p className="text-3xl font-bold text-purple-900">{stats.charactersNoSpaces}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-green-50 to-green-100 p-4">
              <p className="text-xs font-medium text-green-600 uppercase tracking-wide">Words</p>
              <p className="text-3xl font-bold text-green-900">{stats.words}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-orange-50 to-orange-100 p-4">
              <p className="text-xs font-medium text-orange-600 uppercase tracking-wide">Lines</p>
              <p className="text-3xl font-bold text-orange-900">{stats.lines}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-pink-50 to-pink-100 p-4">
              <p className="text-xs font-medium text-pink-600 uppercase tracking-wide">Sentences</p>
              <p className="text-3xl font-bold text-pink-900">{stats.sentences}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
              <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Paragraphs</p>
              <p className="text-3xl font-bold text-indigo-900">{stats.paragraphs}</p>
            </div>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📊 Comprehensive Stats</h3>
            <p className="mt-2 text-sm text-slate-600">Count everything in your text</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Real-Time</h3>
            <p className="mt-2 text-sm text-slate-600">Updates as you type</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📝 Writer-Friendly</h3>
            <p className="mt-2 text-sm text-slate-600">Perfect for content limits</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Type or paste your text in the text area</li>
          <li>Statistics update automatically in real-time</li>
          <li>View character count, word count, and more</li>
          <li>Track your writing progress</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'How are words counted?',
            answer: 'Words are counted by splitting text on whitespace. Multiple spaces are treated as one separator.'
          },
          {
            question: 'What counts as a sentence?',
            answer: 'Sentences are counted by splitting on periods, exclamation marks, and question marks.'
          },
          {
            question: 'How are paragraphs counted?',
            answer: 'Paragraphs are separated by one or more blank lines (double line breaks).'
          },
          {
            question: 'Is my text stored anywhere?',
            answer: 'No, all counting happens in your browser. Your text never leaves your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Word Counter', slug: 'word-counter', icon: '📝' },
          { name: 'Text Sorter', slug: 'text-sorter', icon: '🔀' },
          { name: 'Remove Duplicate Lines', slug: 'remove-duplicate-lines', icon: '🗑️' }
        ]}
      />
    </main>
  );
}
