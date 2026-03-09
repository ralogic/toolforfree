'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      alert('Please select at least one character type');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      alert('Password copied to clipboard!');
    }
  };

  const clearPassword = () => {
    setPassword('');
  };

  return (
    <div className="tool-wrapper">
      {/* TOOL HERO */}
      <section className="tool-hero">
        <h1>Password Generator</h1>
        <p>Create strong, secure and random passwords instantly</p>
      </section>

      {/* TOOL CONTAINER */}
      <section className="tool-container">
        <label>Password Length</label>
        <input
          type="number"
          id="length"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min="6"
          max="32"
          style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
        />

        <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
          <label>
            <input type="checkbox" checked={includeUpper} onChange={(e) => setIncludeUpper(e.target.checked)} />
            {' '}Include Uppercase Letters
          </label>
          <label>
            <input type="checkbox" checked={includeLower} onChange={(e) => setIncludeLower(e.target.checked)} />
            {' '}Include Lowercase Letters
          </label>
          <label>
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
            {' '}Include Numbers
          </label>
          <label>
            <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
            {' '}Include Symbols
          </label>
        </div>

        <button className="btn" onClick={generatePassword}>Generate Password</button>

        <input
          type="text"
          id="password"
          value={password}
          readOnly
          style={{ marginTop: '15px', width: '100%', padding: '12px', fontSize: '1rem' }}
        />

        <div style={{ display: 'flex', gap: '12px', marginTop: '15px' }}>
          <button className="btn btn-outline" onClick={copyPassword}>Copy</button>
          <button className="btn btn-outline" onClick={clearPassword}>Clear</button>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="tool-container" style={{ marginTop: '40px' }}>
        <h2>Free Online Password Generator</h2>
        <p>
          ToolForFree Password Generator helps you create strong and secure passwords
          to protect your online accounts. You can customize password length and
          include uppercase letters, lowercase letters, numbers and symbols.
        </p>
        <p>
          All passwords are generated locally in your browser, ensuring complete
          privacy and security.
        </p>
      </section>

      {/* FEATURES */}
      <section className="tool-container" style={{ marginTop: '40px' }}>
        <h2>Key Features</h2>
        <ul>
          <li>Generate strong random passwords</li>
          <li>Custom password length (6–32 characters)</li>
          <li>Include symbols, numbers and letters</li>
          <li>One-click copy to clipboard</li>
          <li>100% free and private</li>
          <li>No signup required</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="tool-container" style={{ marginTop: '40px' }}>
        <h2>Frequently Asked Questions</h2>
        <h3>Is this password generator safe?</h3>
        <p>Yes, all passwords are generated locally in your browser and never stored.</p>
        <h3>Can I customize the password?</h3>
        <p>Yes, you can choose length and character types like symbols and numbers.</p>
        <h3>Is this tool free?</h3>
        <p>Yes, completely free to use with no limitations.</p>
      </section>
    </div>
  );
}
