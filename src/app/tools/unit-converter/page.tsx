'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function UnitConverterPage() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const units: Record<string, Record<string, { name: string; ratio: number }>> = {
    length: {
      meter: { name: 'Meter', ratio: 1 },
      kilometer: { name: 'Kilometer', ratio: 0.001 },
      centimeter: { name: 'Centimeter', ratio: 100 },
      millimeter: { name: 'Millimeter', ratio: 1000 },
      mile: { name: 'Mile', ratio: 0.000621371 },
      yard: { name: 'Yard', ratio: 1.09361 },
      foot: { name: 'Foot', ratio: 3.28084 },
      inch: { name: 'Inch', ratio: 39.3701 }
    },
    weight: {
      kilogram: { name: 'Kilogram', ratio: 1 },
      gram: { name: 'Gram', ratio: 1000 },
      milligram: { name: 'Milligram', ratio: 1000000 },
      ton: { name: 'Metric Ton', ratio: 0.001 },
      pound: { name: 'Pound', ratio: 2.20462 },
      ounce: { name: 'Ounce', ratio: 35.274 }
    },
    temperature: {
      celsius: { name: 'Celsius', ratio: 1 },
      fahrenheit: { name: 'Fahrenheit', ratio: 1 },
      kelvin: { name: 'Kelvin', ratio: 1 }
    },
    volume: {
      liter: { name: 'Liter', ratio: 1 },
      milliliter: { name: 'Milliliter', ratio: 1000 },
      gallon: { name: 'Gallon (US)', ratio: 0.264172 },
      quart: { name: 'Quart', ratio: 1.05669 },
      pint: { name: 'Pint', ratio: 2.11338 },
      cup: { name: 'Cup', ratio: 4.22675 }
    },
    area: {
      squareMeter: { name: 'Square Meter', ratio: 1 },
      squareKilometer: { name: 'Square Kilometer', ratio: 0.000001 },
      squareFoot: { name: 'Square Foot', ratio: 10.7639 },
      squareYard: { name: 'Square Yard', ratio: 1.19599 },
      acre: { name: 'Acre', ratio: 0.000247105 },
      hectare: { name: 'Hectare', ratio: 0.0001 }
    }
  };

  const convert = () => {
    if (!inputValue) return;

    const value = parseFloat(inputValue);
    let output: number;

    if (category === 'temperature') {
      // Special handling for temperature
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        output = (value * 9) / 5 + 32;
      } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        output = value + 273.15;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        output = ((value - 32) * 5) / 9;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        output = ((value - 32) * 5) / 9 + 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        output = value - 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        output = ((value - 273.15) * 9) / 5 + 32;
      } else {
        output = value;
      }
    } else {
      // Standard conversion: convert to base unit, then to target
      const baseValue = value / units[category][fromUnit].ratio;
      output = baseValue * units[category][toUnit].ratio;
    }

    setResult(output.toFixed(6).replace(/\.?0+$/, ''));
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const firstUnit = Object.keys(units[newCategory])[0];
    const secondUnit = Object.keys(units[newCategory])[1];
    setFromUnit(firstUnit);
    setToUnit(secondUnit);
    setResult('');
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="📏"
        title="Unit Converter"
        description="Convert between different units of measurement. Supports length, weight, temperature, volume, and area conversions."
      />

      <ToolContainer title="Convert Units">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="length">Length</option>
              <option value="weight">Weight</option>
              <option value="temperature">Temperature</option>
              <option value="volume">Volume</option>
              <option value="area">Area</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Value</label>
            <input
              type="number"
              step="any"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {Object.entries(units[category]).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {Object.entries(units[category]).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={convert}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Convert
          </button>

          {result && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
              <p className="text-sm text-slate-700 mb-1">Result</p>
              <p className="text-3xl font-bold text-green-900">
                {result} {units[category][toUnit].name}
              </p>
            </div>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📏 Multiple Units</h3>
            <p className="mt-2 text-sm text-slate-600">5 categories supported</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🎯 Accurate</h3>
            <p className="mt-2 text-sm text-slate-600">Precise conversions</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">Real-time results</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Select measurement category</li>
          <li>Enter the value to convert</li>
          <li>Choose "From" unit</li>
          <li>Choose "To" unit</li>
          <li>Click "Convert" to see result</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What units are supported?',
            answer: 'We support 5 categories: Length (meter, km, mile, etc.), Weight (kg, gram, pound, etc.), Temperature (°C, °F, K), Volume (liter, gallon, etc.), and Area (sq meter, acre, etc.).'
          },
          {
            question: 'How accurate are the conversions?',
            answer: 'All conversions use standard conversion ratios and are accurate to 6 decimal places.'
          },
          {
            question: 'Can I convert temperature?',
            answer: 'Yes, you can convert between Celsius, Fahrenheit, and Kelvin using proper temperature conversion formulas.'
          },
          {
            question: 'Are imperial and metric units both supported?',
            answer: 'Yes, we support both imperial (miles, pounds, gallons) and metric (meters, kilograms, liters) systems.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Binary Converter', slug: 'binary-converter', icon: '🔢' },
          { name: 'Percentage Calculator', slug: 'percentage-calculator', icon: '📊' },
          { name: 'GST Calculator', slug: 'gst-calculator', icon: '🧾' }
        ]}
      />
    </main>
  );
}
