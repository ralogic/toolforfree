'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function EMICalculatorPage() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const calculateEMI = () => {
    if (!principal || !rate || !tenure) return;

    const P = parseFloat(principal);
    const r = parseFloat(rate) / (12 * 100); // Monthly interest rate
    const n = parseFloat(tenure); // Months

    // EMI Formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emiValue * n;
    const interest = totalPayment - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(interest.toFixed(2));
    setTotalAmount(totalPayment.toFixed(2));
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="💰"
        title="EMI Calculator"
        description="Calculate your Equated Monthly Installment (EMI) for loans. Get instant breakdown of principal and interest."
      />

      <ToolContainer title="Calculate EMI">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Loan Amount (Principal)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="100000"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="10.5"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Loan Tenure (Months)
            </label>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="24"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={calculateEMI}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Calculate EMI
          </button>

          {emi && (
            <div className="space-y-4">
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
                <p className="text-sm text-slate-700 mb-1">Monthly EMI</p>
                <p className="text-3xl font-bold text-green-900">₹{emi}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-600">Total Interest</p>
                  <p className="text-xl font-semibold text-slate-900 mt-1">₹{totalInterest}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm text-slate-600">Total Payment</p>
                  <p className="text-xl font-semibold text-slate-900 mt-1">₹{totalAmount}</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="font-semibold text-slate-900 mb-3">Loan Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Principal Amount:</span>
                    <span className="font-semibold text-slate-900">₹{principal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Interest:</span>
                    <span className="font-semibold text-slate-900">₹{totalInterest}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2">
                    <span className="text-slate-900 font-semibold">Total Amount:</span>
                    <span className="font-bold text-slate-900">₹{totalAmount}</span>
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
            <h3 className="font-semibold text-slate-900">💰 Accurate</h3>
            <p className="mt-2 text-sm text-slate-600">Precise EMI calculations</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📊 Detailed</h3>
            <p className="mt-2 text-sm text-slate-600">Complete breakdown</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">Real-time results</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Enter the loan amount (principal)</li>
          <li>Input the annual interest rate</li>
          <li>Specify loan tenure in months</li>
          <li>Click "Calculate EMI"</li>
          <li>View your monthly payment and breakdown</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is EMI?',
            answer: 'EMI (Equated Monthly Installment) is the fixed amount you pay every month to repay your loan, including principal and interest.'
          },
          {
            question: 'How is EMI calculated?',
            answer: 'EMI = [P × r × (1+r)^n] / [(1+r)^n-1], where P is principal, r is monthly interest rate, and n is tenure in months.'
          },
          {
            question: 'Can I reduce my EMI?',
            answer: 'Yes, by increasing tenure (more months), taking a lower loan amount, or negotiating a lower interest rate.'
          },
          {
            question: 'What affects EMI amount?',
            answer: 'Three factors: loan amount (higher = more EMI), interest rate (higher = more EMI), and tenure (longer = less EMI).'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Percentage Calculator', slug: 'percentage-calculator', icon: '📊' },
          { name: 'GST Calculator', slug: 'gst-calculator', icon: '🧾' },
          { name: 'Unit Converter', slug: 'unit-converter', icon: '📏' }
        ]}
      />
    </main>
  );
}
