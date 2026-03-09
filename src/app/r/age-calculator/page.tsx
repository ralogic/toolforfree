'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState({ years: 0, months: 0, days: 0 });

  const calculateAge = () => {
    if (!birthDate) {
      alert('Please select your birth date');
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  return (
    <div className="tool-wrapper">
      <div className="page-header">
        <h1>Age Calculator</h1>
        <p className="subtitle">
          Calculate your exact age in years, months and days instantly.
        </p>
      </div>

      <main>
        <section className="tool-container">
          <label>Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '20px', fontSize: '1rem' }}
          />

          <button className="btn" onClick={calculateAge}>Calculate Age</button>

          {(result.years > 0 || result.months > 0 || result.days > 0) && (
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--bg-card)', borderRadius: '8px' }}>
              <h3>Your Age:</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {result.years} Years, {result.months} Months, {result.days} Days
              </p>
            </div>
          )}
        </section>

        {/* SEO CONTENT */}
        <section className="tool-container" style={{ marginTop: '40px' }}>
          <h2>Free Online Age Calculator</h2>
          <p>
            Calculate your exact age in years, months, and days from your date of birth.
            This free age calculator tool is perfect for checking eligibility, planning
            events, or simply calculating how old you are.
          </p>
        </section>

        {/* RELATED TOOLS */}
        <section>
          <h2>Related Tools</h2>
          <div className="related-tools">
            <Link href="/r/word-counter">Word Counter</Link>
            <Link href="/r/password-generator">Password Generator</Link>
            <Link href="/r/json-formatter">JSON Formatter</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
