'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toCamelCase,
  toSnakeCase,
  toKebabCase
} from '@/lib/utils';

export default function CaseConverterPage() {
  const [text, setText] = useState('');
  const [results, setResults] = useState({
    uppercase: '',
    lowercase: '',
    titlecase: '',
    camelcase: '',
    snakecase: '',
    kebabcase: ''
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    setResults({
      uppercase: toUpperCase(newText),
      lowercase: toLowerCase(newText),
      titlecase: toTitleCase(newText),
      camelcase: toCamelCase(newText),
      snakecase: toSnakeCase(newText),
      kebabcase: toKebabCase(newText)
    });
  };

  const CaseResult = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>
      <div className="bg-white p-3 rounded border border-gray-100 font-mono text-sm break-all">
        {value || '(empty)'}
      </div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(value);
          alert('Copied!');
        }}
        className="mt-2 px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
      >
        Copy
      </button>
    </div>
  );

  return (
    <>
      <ToolHero
        icon="🔤"
        title="Case Converter"
        description="Convert text between different case formats: uppercase, lowercase, title case, camelCase, snake_case and more."
      />

      <ToolContainer title="Enter your text">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Type or paste text here..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </ToolContainer>

      <ToolContainer title="Case Conversions">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CaseResult label="UPPERCASE" value={results.uppercase} />
          <CaseResult label="lowercase" value={results.lowercase} />
          <CaseResult label="Title Case" value={results.titlecase} />
          <CaseResult label="camelCase" value={results.camelcase} />
          <CaseResult label="snake_case" value={results.snakecase} />
          <CaseResult label="kebab-case" value={results.kebabcase} />
        </div>
      </ToolContainer>

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Enter Text</h3>
            <p className="text-gray-700">Type or paste your text into the textarea.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: View Conversions</h3>
            <p className="text-gray-700">All case formats appear in real-time below your input.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Copy Result</h3>
            <p className="text-gray-700">Click the Copy button under any conversion to copy it to your clipboard.</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Case Types Explained">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">UPPERCASE</h4>
            <p className="text-gray-700">All letters converted to capital letters: HELLO WORLD</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">lowercase</h4>
            <p className="text-gray-700">All letters converted to small letters: hello world</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Title Case</h4>
            <p className="text-gray-700">First letter of each word capitalized: Hello World</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">camelCase</h4>
            <p className="text-gray-700">First word lowercase, rest capitalized, no spaces: helloWorld</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">snake_case</h4>
            <p className="text-gray-700">Words separated by underscores: hello_world</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">kebab-case</h4>
            <p className="text-gray-700">Words separated by hyphens: hello-world</p>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Which case format is best for variable names?',
            answer: 'camelCase is standard in JavaScript and most programming languages. snake_case is common in Python and databases.'
          },
          {
            question: 'Can I convert text with special characters?',
            answer: 'Yes! The converter handles special characters, numbers, and symbols. Only letters are affected by case changes.'
          },
          {
            question: 'Is there a limit to text length?',
            answer: 'No limit. The tool can handle texts of any length as long as your browser has memory available.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Word Counter', slug: 'word-counter', icon: '📝' },
          { name: 'Text Sorter', slug: 'text-sorter', icon: '🔀' },
          { name: 'JSON Formatter', slug: 'json-formatter', icon: '{ }' }
        ]}
      />
    </>
  );
}
