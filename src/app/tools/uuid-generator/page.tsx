'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { generateUUID } from '@/lib/utils';

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generateUUIDs = (quantity: number) => {
    const generated: string[] = [];
    for (let i = 0; i < quantity; i++) {
      generated.push(generateUUID());
    }
    setUuids(generated);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(100, parseInt(e.target.value) || 1));
    setCount(value);
  };

  const generateNew = () => {
    generateUUIDs(count);
  };

  return (
    <>
      <ToolHero
        icon="🔢"
        title="UUID Generator"
        description="Generate unique identifiers (UUIDs) for your database records, APIs, and applications."
      />

      <ToolContainer title="UUID Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of UUIDs: {count}
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={count}
                onChange={handleCountChange}
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

      {uuids.length > 0 && (
        <ToolContainer title={`Generated UUIDs (${uuids.length})`}>
          <ResultBox
            title="UUIDs"
            copyText={uuids.join('\n')}
          >
            {uuids.join('\n')}
          </ResultBox>
        </ToolContainer>
      )}

      <ToolContainer title="What is UUID?">
        <div className="space-y-3">
          <p className="text-gray-700">
            A UUID (Universally Unique Identifier) is a 128-bit unique identifier that can be generated independently without a central database.
          </p>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Format</h4>
            <code className="bg-gray-100 block p-3 rounded text-sm">550e8400-e29b-41d4-a716-446655440000</code>
            <p className="text-gray-700 text-sm mt-2">8-4-4-4-12 hexadecimal digits</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Use Cases">
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Database IDs:</strong> Primary keys for records</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>API tokens:</strong> Unique request identifiers</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Session IDs:</strong> User session tracking</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>File names:</strong> Unique file identifiers</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Device IDs:</strong> Mobile & hardware identification</span>
          </li>
        </ul>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Are UUIDs truly unique?',
            answer: 'For all practical purposes, yes. The chance of collision is astronomically small (1 in 5.3 × 10^36). UUIDs v4 use random generation making duplicates virtually impossible.'
          },
          {
            question: 'What is the difference between UUID versions?',
            answer: 'This tool generates UUID v4 (random). Other versions use time (v1), namespace + name (v3/v5), etc. v4 is most common for general use.'
          },
          {
            question: 'Can UUIDs be guessed?',
            answer: 'UUID v4 uses cryptographic randomness, making them impossible to guess. However, they should not be used as secrets or passwords.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Password Generator', slug: 'password-generator', icon: '🔐' },
          { name: 'QR Code Generator', slug: 'qr-code-generator', icon: '📱' },
          { name: 'Timestamp Converter', slug: 'timestamp-converter', icon: '🕐' }
        ]}
      />
    </>
  );
}
