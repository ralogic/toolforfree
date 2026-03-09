'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { countWords, countCharacters, countLines } from '@/lib/utils';

export default function WordCounterPage() {
  const [text, setText] = useState('');
  const [results, setResults] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    lines: 0,
    paragraphs: 0
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    setResults({
      words: countWords(newText),
      characters: countCharacters(newText, true),
      charactersNoSpaces: countCharacters(newText, false),
      lines: newText.split('\n').length,
      paragraphs: newText.split('\n\n').filter(p => p.trim().length > 0).length
    });
  };

  const handleClear = () => {
    setText('');
    setResults({ words: 0, characters: 0, charactersNoSpaces: 0, lines: 0, paragraphs: 0 });
  };

  return (
    <>
      <ToolHero
        icon="📝"
        title="Word Counter"
        description="Count words, characters, lines and more in your text instantly. Perfect for writers, students and professionals."
      />

      <ToolContainer title="Paste or type your text">
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your text here... or start typing..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
          />
          
          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Statistics">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600 font-medium mb-2">Words</div>
            <div className="text-3xl font-bold text-blue-900">{results.words}</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-600 font-medium mb-2">Characters</div>
            <div className="text-3xl font-bold text-purple-900">{results.characters}</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-600 font-medium mb-2">No Spaces</div>
            <div className="text-3xl font-bold text-green-900">{results.charactersNoSpaces}</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
            <div className="text-sm text-yellow-600 font-medium mb-2">Lines</div>
            <div className="text-3xl font-bold text-yellow-900">{results.lines}</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
            <div className="text-sm text-red-600 font-medium mb-2">Paragraphs</div>
            <div className="text-3xl font-bold text-red-900">{results.paragraphs}</div>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Paste Your Text</h3>
            <p className="text-gray-700">Copy and paste your text into the textarea above, or start typing directly.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: View Results</h3>
            <p className="text-gray-700">Statistics update in real-time as you type. See word count, character count, lines and paragraphs.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Clear & Start Over</h3>
            <p className="text-gray-700">Click the Clear button to reset the textarea and start fresh with new text.</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Real-time counting:</strong> Stats update as you type or paste</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Multiple metrics:</strong> Words, characters, lines, and paragraphs</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>No spaces count:</strong> View character count without spaces</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>100% offline:</strong> Works entirely in your browser</span>
          </li>
        </ul>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'How is word count calculated?',
            answer: 'Words are counted by splitting text on whitespace. Consecutive spaces are treated as a single word separator.'
          },
          {
            question: 'What is the difference between characters and characters without spaces?',
            answer: 'Characters includes all characters including spaces. Characters without spaces excludes all whitespace characters from the count.'
          },
          {
            question: 'Is my text stored anywhere?',
            answer: 'No. All processing happens in your browser. Your text is never sent to any server.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Case Converter', slug: 'case-converter', icon: '🔤' },
          { name: 'Remove Duplicate Lines', slug: 'remove-duplicate-lines', icon: '🗑️' },
          { name: 'Text Sorter', slug: 'text-sorter', icon: '🔀' }
        ]}
      />
    </>
  );
}
