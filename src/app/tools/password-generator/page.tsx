'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { generatePassword } from '@/lib/utils';

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);

  const generatePasswords = () => {
    const generated: string[] = [];
    for (let i = 0; i < 5; i++) {
      generated.push(generatePassword(length, {
        uppercase: useUppercase,
        lowercase: useLowercase,
        numbers: useNumbers,
        symbols: useSymbols
      }));
    }
    setPasswords(generated);
  };

  React.useEffect(() => {
    generatePasswords();
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);

  const copyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    alert('Password copied!');
  };

  const getStrength = (pwd: string): { label: string; color: string } => {
    let strength = 0;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    if (pwd.length >= 16) strength++;

    if (strength <= 2) return { label: 'Weak', color: 'bg-red-500' };
    if (strength <= 3) return { label: 'Fair', color: 'bg-yellow-500' };
    if (strength <= 4) return { label: 'Good', color: 'bg-blue-500' };
    return { label: 'Strong', color: 'bg-green-500' };
  };

  return (
    <>
      <ToolHero
        icon="🔐"
        title="Password Generator"
        description="Generate strong, random passwords instantly. Customize length, character types, and more."
      />

      <ToolContainer title="Password Settings">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length: {length}
            </label>
            <input
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useUppercase}
                onChange={(e) => setUseUppercase(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700 font-medium">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useLowercase}
                onChange={(e) => setUseLowercase(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700 font-medium">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700 font-medium">Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-gray-700 font-medium">Symbols (!@#$%^&*)</span>
            </label>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Generated Passwords">
        <div className="space-y-3">
          {passwords.map((pwd, idx) => {
            const strength = getStrength(pwd);
            return (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <code className="font-mono text-sm break-all flex-1">{pwd}</code>
                  <button
                    onClick={() => copyPassword(pwd)}
                    className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors whitespace-nowrap"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color}`}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600">{strength.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </ToolContainer>

      <ToolContainer title="Password Tips">
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Length matters:</strong> Use at least 12 characters, 16+ is better</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Mix character types:</strong> Combine uppercase, lowercase, numbers, symbols</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Use a password manager:</strong> Store generated passwords securely</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Unique passwords:</strong> Use different passwords for different accounts</span>
          </li>
        </ul>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'How secure are the generated passwords?',
            answer: 'Very secure! Passwords are generated using JavaScript\'s Math.random() which provides good randomness for passwords. They\'re never stored or transmitted.'
          },
          {
            question: 'Can I customize the character set?',
            answer: 'Yes! Use the checkboxes to include/exclude uppercase, lowercase, numbers, and symbols for your specific needs.'
          },
          {
            question: 'What is password strength?',
            answer: 'Strength depends on length, character variety, and entropy. 12+ characters with mixed types is considered good. 16+ is excellent.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'UUID Generator', slug: 'uuid-generator', icon: '🔢' },
          { name: 'QR Code Generator', slug: 'qr-code-generator', icon: '📱' },
          { name: 'Base64 Encoder', slug: 'base64-encoder-decoder', icon: '🔐' }
        ]}
      />
    </>
  );
}
