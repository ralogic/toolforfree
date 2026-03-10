'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function GSTCalculatorPage() {
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [result, setResult] = useState({
    original: '',
    gstAmount: '',
    final: '',
    cgst: '',
    sgst: ''
  });

  const calculate = () => {
    if (!amount || !gstRate) return;

    const originalAmount = parseFloat(amount);
    const rate = parseFloat(gstRate);

    if (mode === 'add') {
      // Add GST to amount
      const gstAmount = (originalAmount * rate) / 100;
      const finalAmount = originalAmount + gstAmount;
      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;

      setResult({
        original: originalAmount.toFixed(2),
        gstAmount: gstAmount.toFixed(2),
        final: finalAmount.toFixed(2),
        cgst: cgst.toFixed(2),
        sgst: sgst.toFixed(2)
      });
    } else {
      // Remove GST from amount
      const baseAmount = (originalAmount * 100) / (100 + rate);
      const gstAmount = originalAmount - baseAmount;
      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;

      setResult({
        original: baseAmount.toFixed(2),
        gstAmount: gstAmount.toFixed(2),
        final: originalAmount.toFixed(2),
        cgst: cgst.toFixed(2),
        sgst: sgst.toFixed(2)
      });
    }
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🧾"
        title="GST Calculator"
        description="Calculate GST (Goods and Services Tax) quickly. Add or remove GST from amounts with automatic CGST/SGST breakdown."
      />

      <ToolContainer title="Calculate GST">
        <div className="space-y-6">
          <div className="flex gap-2">
            <button
              onClick={() => setMode('add')}
              className={`flex-1 rounded-xl px-6 py-3 font-semibold transition-colors ${
                mode === 'add'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Add GST
            </button>
            <button
              onClick={() => setMode('remove')}
              className={`flex-1 rounded-xl px-6 py-3 font-semibold transition-colors ${
                mode === 'remove'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Remove GST
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              {mode === 'add' ? 'Amount (Excluding GST)' : 'Amount (Including GST)'}
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">GST Rate (%)</label>
            <select
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>

          <button
            onClick={calculate}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Calculate
          </button>

          {result.gstAmount && (
            <div className="space-y-4">
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                <p className="text-sm text-slate-700 mb-1">
                  {mode === 'add' ? 'Total Amount (Inc. GST)' : 'Base Amount (Exc. GST)'}
                </p>
                <p className="text-3xl font-bold text-green-900">
                  ₹{mode === 'add' ? result.final : result.original}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-semibold text-slate-900 mb-3">Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">
                      {mode === 'add' ? 'Original Amount:' : 'Base Amount:'}
                    </span>
                    <span className="font-semibold text-slate-900">₹{result.original}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">GST ({gstRate}%):</span>
                    <span className="font-semibold text-slate-900">₹{result.gstAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 pl-4">• CGST ({parseFloat(gstRate) / 2}%):</span>
                    <span className="text-slate-700">₹{result.cgst}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 pl-4">• SGST ({parseFloat(gstRate) / 2}%):</span>
                    <span className="text-slate-700">₹{result.sgst}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2">
                    <span className="text-slate-900 font-semibold">
                      {mode === 'add' ? 'Final Amount:' : 'Total (Inc. GST):'}
                    </span>
                    <span className="font-bold text-slate-900">₹{result.final}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🧾 Dual Mode</h3>
            <p className="mt-2 text-sm text-slate-600">Add or remove GST</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📊 Complete</h3>
            <p className="mt-2 text-sm text-slate-600">CGST/SGST breakdown</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Fast</h3>
            <p className="mt-2 text-sm text-slate-600">Instant calculations</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Choose "Add GST" or "Remove GST"</li>
          <li>Enter the amount</li>
          <li>Select GST rate (5%, 12%, 18%, or 28%)</li>
          <li>Click "Calculate"</li>
          <li>View breakdown with CGST and SGST</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is GST?',
            answer: 'GST (Goods and Services Tax) is an indirect tax levied on the supply of goods and services in India.'
          },
          {
            question: 'What are CGST and SGST?',
            answer: 'CGST (Central GST) and SGST (State GST) are two components of GST. Each is half of the total GST rate.'
          },
          {
            question: 'Which GST rate should I use?',
            answer: 'GST rates vary by product/service: 5% (essentials), 12% (standard), 18% (most goods/services), 28% (luxury items).'
          },
          {
            question: 'How to calculate GST?',
            answer: 'To add: Amount × (GST% / 100). To remove: Amount / (1 + GST% / 100).'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Percentage Calculator', slug: 'percentage-calculator', icon: '📊' },
          { name: 'EMI Calculator', slug: 'emi-calculator', icon: '💰' },
          { name: 'Unit Converter', slug: 'unit-converter', icon: '📏' }
        ]}
      />
    </main>
  );
}
