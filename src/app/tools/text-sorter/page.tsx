'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { sortLines } from '@/lib/utils';

export default function TextSorterPage() {
  const [text, setText] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [result, setResult] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    updateResult(newText, sortOrder);
  };

  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    updateResult(text, order);
  };

  const updateResult = (inputText: string, order: 'asc' | 'desc') => {
    setResult(sortLines(inputText, order === 'desc'));
  };

  return (
    <>
      <ToolHero
        icon="🔀"
        title="Text Sorter"
        description="Sort text lines alphabetically in ascending or descending order. Great for organizing lists."
      />

      <ToolContainer title="Paste your text">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Paste your list here (one item per line)..."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
        />
      </ToolContainer>

      <ToolContainer title="Sort Order">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sortOrder"
              value="asc"
              checked={sortOrder === 'asc'}
              onChange={() => handleSortChange('asc')}
              className="w-4 h-4"
            />
            <span className="text-gray-700 font-medium">A → Z (Ascending)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              checked={sortOrder === 'desc'}
              onChange={() => handleSortChange('desc')}
              className="w-4 h-4"
            />
            <span className="text-gray-700 font-medium">Z → A (Descending)</span>
          </label>
        </div>
      </ToolContainer>

      {result && (
        <ToolContainer title="Sorted Result">
          <ResultBox
            title="Sorted Lines"
            copyText={result}
          >
            {result}
          </ResultBox>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Enter Your List</h3>
            <p className="text-gray-700">Paste or type your list with one item per line in the textarea.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Choose Sort Order</h3>
            <p className="text-gray-700">Select whether you want to sort A→Z (ascending) or Z→A (descending).</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Copy Result</h3>
            <p className="text-gray-700">Copy the sorted list to your clipboard immediately.</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>A-Z sorting:</strong> Standard alphabetical sorting</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Reverse sorting:</strong> Sort Z-A in descending order</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Case-insensitive:</strong> Sorting ignores uppercase/lowercase</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Real-time:</strong> Results update as you change sort order</span>
          </li>
        </ul>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Is sorting case-sensitive?',
            answer: 'Sorting is case-insensitive for the primary sort, but uppercase letters are typically sorted before lowercase when cases match. For standard alphabetical sorting, this is usually unnoticeable.'
          },
          {
            question: 'How does it handle numbers?',
            answer: 'Numbers are sorted lexicographically (as text), not numerically. So "10" comes before "2". Use a numeric sorting tool if you need true number sorting.'
          },
          {
            question: 'Can it sort by second column?',
            answer: 'This tool sorts by the entire line. For multi-column sorting, you might need CSV sorting tools or spreadsheet software.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Remove Duplicate Lines', slug: 'remove-duplicate-lines', icon: '🗑️' },
          { name: 'Word Counter', slug: 'word-counter', icon: '📝' },
          { name: 'Case Converter', slug: 'case-converter', icon: '🔤' }
        ]}
      />
    </>
  );
}
