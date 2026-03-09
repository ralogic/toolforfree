'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { calculateAge } from '@/lib/utils';

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    isAdult: boolean;
  } | null>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setBirthDate(date);

    if (!date) {
      setAge(null);
      return;
    }

    try {
      const birthDateObj = new Date(date);
      const today = new Date();

      if (birthDateObj > today) {
        setAge(null);
        return;
      }

      // Calculate age in years
      let years = today.getFullYear() - birthDateObj.getFullYear();
      let months = today.getMonth() - birthDateObj.getMonth();
      let days = today.getDate() - birthDateObj.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      // Calculate total days
      const totalDays = Math.floor((today.getTime() - birthDateObj.getTime()) / (1000 * 60 * 60 * 24));

      setAge({
        years,
        months,
        days,
        totalDays,
        isAdult: years >= 18
      });
    } catch (error) {
      setAge(null);
    }
  };

  return (
    <>
      <ToolHero
        icon="🎂"
        title="Age Calculator"
        description="Calculate your exact age in years, months, and days. Find out how many days you've lived!"
      />

      <ToolContainer title="Enter Your Birth Date">
        <input
          type="date"
          value={birthDate}
          onChange={handleDateChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </ToolContainer>

      {age && (
        <ToolContainer title="Your Age">
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-600 font-medium mb-2">Years</div>
                <div className="text-4xl font-bold text-blue-900">{age.years}</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-600 font-medium mb-2">Months</div>
                <div className="text-4xl font-bold text-purple-900">{age.months}</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <div className="text-sm text-green-600 font-medium mb-2">Days</div>
                <div className="text-4xl font-bold text-green-900">{age.days}</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                <div className="text-sm text-yellow-600 font-medium mb-2">Total Days</div>
                <div className="text-3xl font-bold text-yellow-900">{age.totalDays.toLocaleString()}</div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${
              age.isAdult
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <strong>{age.isAdult ? '✓ You are legally an adult (18+)' : '⏳ You are not yet 18 years old'}</strong>
            </div>

            <ResultBox
              title="Summary"
              copyText={`I am ${age.years} years, ${age.months} months, and ${age.days} days old. Total: ${age.totalDays} days lived.`}
            >
              I am <strong>{age.years}</strong> years, <strong>{age.months}</strong> months, and <strong>{age.days}</strong> days old.
              <br />
              Total: <strong>{age.totalDays.toLocaleString()}</strong> days lived.
            </ResultBox>
          </div>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Select Your Birth Date</h3>
            <p className="text-gray-700">Click on the date input field and select your birth date from the calendar.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: View Results</h3>
            <p className="text-gray-700">Your age is calculated automatically in years, months, days, and total days.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Copy Summary</h3>
            <p className="text-gray-700">Copy the summary text to share with others (optional).</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Fun Facts">
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700">The average human lives about <strong>29,200 days</strong> (80 years)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700">You have about <strong>10,000 days</strong> in your first 27 years</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700">The oldest person ever lived <strong>122 years and 164 days</strong></span>
          </li>
        </ul>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'How accurate is the age calculation?',
            answer: 'Very accurate! It calculates based on actual calendar dates. The calculation accounts for leap years and different month lengths.'
          },
          {
            question: 'Does the calculator account for time of birth?',
            answer: 'No, this calculator only uses the date, not the exact time. For precise age to the second, you would need to include birth time.'
          },
          {
            question: 'Can I calculate age for someone else?',
            answer: 'Yes! Simply enter their birth date to calculate their age. This tool doesn\'t store any personal information.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Timestamp Converter', slug: 'timestamp-converter', icon: '🕐' },
          { name: 'Password Generator', slug: 'password-generator', icon: '🔐' },
          { name: 'UUID Generator', slug: 'uuid-generator', icon: '🔢' }
        ]}
      />
    </>
  );
}
