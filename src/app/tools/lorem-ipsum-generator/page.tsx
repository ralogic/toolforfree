'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { generateLoremIpsum } from '@/lib/utils';

export default function LoremIpsumGeneratorPage() {
  const [paragraphs, setParagraphs] = useState(3);
  const [result, setResult] = useState(generateLoremIpsum(3));

  const handleParagraphsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setParagraphs(Math.max(1, value));
    setResult(generateLoremIpsum(Math.max(1, value)));
  };

  const generateNew = () => {
    setResult(generateLoremIpsum(paragraphs));
  };

  return (
    <>
      <ToolHero
        icon="📄"
        title="Lorem Ipsum Generator"
        description="Generate placeholder Lorem Ipsum text for your designs and prototypes. Perfect for mockups and wireframes."
      />

      <ToolContainer title="Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Paragraphs
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={paragraphs}
                onChange={handleParagraphsChange}
                min="1"
                max="100"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={generateNew}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Generated Lorem Ipsum">
        <ResultBox
          title={`${paragraphs} Paragraph${paragraphs > 1 ? 's' : ''}`}
          copyText={result}
        >
          {result}
        </ResultBox>
      </ToolContainer>

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Choose Paragraph Count</h3>
            <p className="text-gray-700">Enter the number of paragraphs you want to generate (1-100).</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Generate Text</h3>
            <p className="text-gray-700">Click the Generate button to create Lorem Ipsum text.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Copy & Use</h3>
            <p className="text-gray-700">Copy the generated text and paste it into your design or prototype.</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Why Use Lorem Ipsum?">
        <div className="space-y-3">
          <p className="text-gray-700">
            Lorem Ipsum is dummy text used in design and publishing. It allows designers to focus on visual layout without content distractions.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span className="text-gray-700"><strong>Placeholder content:</strong> Use while waiting for real content</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span className="text-gray-700"><strong>Focus on design:</strong> Helps clients see layout before content</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span className="text-gray-700"><strong>Professional mockups:</strong> Standard in design industry</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">•</span>
              <span className="text-gray-700"><strong>Multiple formats:</strong> Generate as many paragraphs as needed</span>
            </li>
          </ul>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is Lorem Ipsum?',
            answer: 'Lorem Ipsum is dummy text derived from Latin. It is used as placeholder text in design and publishing to show layout and typography without real content.'
          },
          {
            question: 'Can I use it in production?',
            answer: 'No, Lorem Ipsum is only for mockups and prototypes. Always replace it with actual content before publishing.'
          },
          {
            question: 'Is it always the same?',
            answer: 'This generator produces the same text each time to ensure consistency in designs. The traditional Lorem Ipsum text starts with "Lorem ipsum dolor sit amet..."'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Word Counter', slug: 'word-counter', icon: '📝' },
          { name: 'Password Generator', slug: 'password-generator', icon: '🔐' },
          { name: 'UUID Generator', slug: 'uuid-generator', icon: '🔢' }
        ]}
      />
    </>
  );
}
