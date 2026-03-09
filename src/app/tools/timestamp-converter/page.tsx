'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { timestampToDate, dateToTimestamp } from '@/lib/utils';

export default function TimestampConverterPage() {
  const [mode, setMode] = useState<'toDate' | 'toTimestamp'>('toDate');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    processConversion(value, mode);
  };

  const processConversion = (value: string, currentMode: 'toDate' | 'toTimestamp') => {
    try {
      if (!value.trim()) {
        setResult('');
        return;
      }

      if (currentMode === 'toDate') {
        setResult(timestampToDate(value));
      } else {
        setResult(dateToTimestamp(value).toString());
      }
    } catch (error) {
      setResult('Invalid input');
    }
  };

  const handleModeChange = (newMode: 'toDate' | 'toTimestamp') => {
    setMode(newMode);
    setInput('');
    setResult('');
  };

  const getCurrentTimestamp = () => {
    setInput(Math.floor(Date.now() / 1000).toString());
    setMode('toDate');
  };

  const getCurrentDate = () => {
    setInput(new Date().toISOString());
    setMode('toTimestamp');
  };

  return (
    <>
      <ToolHero
        icon="🕐"
        title="Timestamp Converter"
        description="Convert between Unix timestamps and readable dates. Essential for developers working with APIs and databases."
      />

      <ToolContainer title="Conversion Mode">
        <div className="flex gap-4">
          <button
            onClick={() => handleModeChange('toDate')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mode === 'toDate'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Timestamp → Date
          </button>
          <button
            onClick={() => handleModeChange('toTimestamp')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              mode === 'toTimestamp'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Date → Timestamp
          </button>
        </div>
      </ToolContainer>

      <ToolContainer title={mode === 'toDate' ? 'Enter Timestamp' : 'Enter Date'}>
        <div className="space-y-4">
          <input
            type={mode === 'toDate' ? 'number' : 'datetime-local'}
            value={input}
            onChange={handleInputChange}
            placeholder={mode === 'toDate' ? 'e.g., 1609459200' : 'e.g., 2021-01-01T00:00:00'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-2">
            {mode === 'toDate' ? (
              <button
                onClick={getCurrentTimestamp}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Use Current Time
              </button>
            ) : (
              <button
                onClick={getCurrentDate}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Use Current Date
              </button>
            )}
          </div>
        </div>
      </ToolContainer>

      {result && (
        <ToolContainer title="Result">
          <ResultBox
            title={mode === 'toDate' ? 'Date' : 'Timestamp'}
            copyText={result}
          >
            {result}
          </ResultBox>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Convert Timestamp to Date</h3>
            <p className="text-gray-700 mb-2">Select "Timestamp → Date" mode and enter a Unix timestamp.</p>
            <p className="text-gray-600 text-sm">Example: <code className="bg-gray-100 px-2 py-1 rounded">1609459200</code></p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Convert Date to Timestamp</h3>
            <p className="text-gray-700 mb-2">Select "Date → Timestamp" mode and enter a date.</p>
            <p className="text-gray-600 text-sm">Example: <code className="bg-gray-100 px-2 py-1 rounded">2021-01-01 00:00:00</code></p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="What is Unix Timestamp?">
        <p className="text-gray-700 mb-4">
          A Unix timestamp (also called Epoch time) is the number of seconds that have elapsed since January 1, 1970 at 00:00:00 UTC.
        </p>
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Common Timestamps</h4>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-700">0</td>
                  <td className="py-2 text-gray-600">1970-01-01 00:00:00 UTC (Epoch)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-700">1609459200</td>
                  <td className="py-2 text-gray-600">2021-01-01 00:00:00 UTC</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-700">1640995200</td>
                  <td className="py-2 text-gray-600">2022-01-01 00:00:00 UTC</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Is Unix timestamp timezone-aware?',
            answer: 'Unix timestamps are always in UTC timezone. When converting to date, the result is shown in ISO format (UTC). Your browser may display it in local timezone.'
          },
          {
            question: 'What is the difference between seconds and milliseconds?',
            answer: 'Timestamps can be in seconds (standard Unix time) or milliseconds. This tool auto-detects: timestamps < 10^11 are in seconds, larger values are in milliseconds.'
          },
          {
            question: 'When will Unix timestamp overflow?',
            answer: 'The 32-bit Unix timestamp overflows in 2038 (Year 2038 problem). Most systems now use 64-bit timestamps, good until 292 billion years.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Age Calculator', slug: 'age-calculator', icon: '🎂' },
          { name: 'UUID Generator', slug: 'uuid-generator', icon: '🔢' },
          { name: 'Password Generator', slug: 'password-generator', icon: '🔐' }
        ]}
      />
    </>
  );
}
