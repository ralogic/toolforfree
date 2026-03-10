'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<'percentage-of' | 'percentage-change' | 'reverse'>('percentage-of');
  
  // Percentage of
  const [number, setNumber] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result1, setResult1] = useState('');

  // Percentage change
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [result2, setResult2] = useState('');

  // Reverse percentage
  const [total, setTotal] = useState('');
  const [part, setPart] = useState('');
  const [result3, setResult3] = useState('');

  const calculatePercentageOf = () => {
    if (!number || !percentage) return;
    const result = (parseFloat(number) * parseFloat(percentage)) / 100;
    setResult1(`${percentage}% of ${number} = ${result.toFixed(2)}`);
  };

  const calculatePercentageChange = () => {
    if (!oldValue || !newValue) return;
    const change = ((parseFloat(newValue) - parseFloat(oldValue)) / parseFloat(oldValue)) * 100;
    const type = change >= 0 ? 'increase' : 'decrease';
    setResult2(`Percentage ${type}: ${Math.abs(change).toFixed(2)}%`);
  };

  const calculateReversePercentage = () => {
    if (!total || !part) return;
    const percent = (parseFloat(part) / parseFloat(total)) * 100;
    setResult3(`${part} is ${percent.toFixed(2)}% of ${total}`);
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="📊"
        title="Percentage Calculator"
        description="Calculate percentages quickly. Find percentage of number, percentage change, or what percent one number is of another."
      />

      <ToolContainer title="Select Calculation Type">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setMode('percentage-of')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                mode === 'percentage-of'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Percentage Of
            </button>
            <button
              onClick={() => setMode('percentage-change')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                mode === 'percentage-change'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Percentage Change
            </button>
            <button
              onClick={() => setMode('reverse')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                mode === 'reverse'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Reverse Percentage
            </button>
          </div>

          {mode === 'percentage-of' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">What is X% of Y?</h3>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Percentage (%)</label>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  placeholder="25"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Of Number</label>
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="200"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <button
                onClick={calculatePercentageOf}
                className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Calculate
              </button>
              {result1 && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <p className="text-lg font-semibold text-green-900">{result1}</p>
                </div>
              )}
            </div>
          )}

          {mode === 'percentage-change' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Percentage Increase/Decrease</h3>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Old Value</label>
                <input
                  type="number"
                  value={oldValue}
                  onChange={(e) => setOldValue(e.target.value)}
                  placeholder="100"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">New Value</label>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="150"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <button
                onClick={calculatePercentageChange}
                className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Calculate
              </button>
              {result2 && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <p className="text-lg font-semibold text-green-900">{result2}</p>
                </div>
              )}
            </div>
          )}

          {mode === 'reverse' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">X is what % of Y?</h3>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Part (X)</label>
                <input
                  type="number"
                  value={part}
                  onChange={(e) => setPart(e.target.value)}
                  placeholder="50"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Total (Y)</label>
                <input
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="200"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <button
                onClick={calculateReversePercentage}
                className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Calculate
              </button>
              {result3 && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                  <p className="text-lg font-semibold text-green-900">{result3}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🎯 3 Modes</h3>
            <p className="mt-2 text-sm text-slate-600">Multiple calculation types</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">Real-time calculations</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📊 Accurate</h3>
            <p className="mt-2 text-sm text-slate-600">Precise results</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Select calculation type</li>
          <li>Enter the required values</li>
          <li>Click "Calculate"</li>
          <li>View your result instantly</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'How do I calculate percentage of a number?',
            answer: 'Multiply the number by the percentage and divide by 100. For example, 25% of 200 = (200 × 25) ÷ 100 = 50.'
          },
          {
            question: 'What is percentage change?',
            answer: 'Percentage change = ((New Value - Old Value) / Old Value) × 100. It shows increase or decrease as a percentage.'
          },
          {
            question: 'How do I find what percentage one number is of another?',
            answer: 'Divide the part by the total and multiply by 100. For example, 50 is what % of 200? = (50 / 200) × 100 = 25%.'
          },
          {
            question: 'Can I use decimal numbers?',
            answer: 'Yes, you can use decimal numbers in all calculations for precise results.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'EMI Calculator', slug: 'emi-calculator', icon: '💰' },
          { name: 'GST Calculator', slug: 'gst-calculator', icon: '🧾' },
          { name: 'Unit Converter', slug: 'unit-converter', icon: '📏' }
        ]}
      />
    </main>
  );
}
