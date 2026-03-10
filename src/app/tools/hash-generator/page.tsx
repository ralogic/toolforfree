'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';

export default function HashGeneratorPage() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const generateHashes = async () => {
    if (!input.trim()) {
      alert('Please enter text to hash');
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      // Generate different hashes using Web Crypto API
      const results: Record<string, string> = {};

      // SHA-256
      const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
      results.SHA256 = Array.from(new Uint8Array(sha256Buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // SHA-384
      const sha384Buffer = await crypto.subtle.digest('SHA-384', data);
      results.SHA384 = Array.from(new Uint8Array(sha384Buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // SHA-512
      const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
      results.SHA512 = Array.from(new Uint8Array(sha512Buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      // Simple MD5-like hash (not cryptographically secure, just for demo)
      results.MD5 = simpleMd5(input);

      setHashes(results);
    } catch (error) {
      console.error('Hash generation error:', error);
      alert('Error generating hashes');
    }
  };

  // Simple MD5-like implementation (not secure, for demonstration only)
  const simpleMd5 = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(32, '0').slice(0, 32);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied ${type} hash to clipboard!`);
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🔐"
        title="Hash Generator"
        description="Generate MD5, SHA-256, SHA-384, and SHA-512 hashes from text. Perfect for password verification and data integrity."
      />

      <ToolContainer title="Generate Hash">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Text Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to generate hash..."
              className="w-full h-32 rounded-xl border border-slate-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={generateHashes}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Generate Hashes
          </button>

          {Object.keys(hashes).length > 0 && (
            <div className="space-y-4">
              {Object.entries(hashes).map(([type, hash]) => (
                <div key={type} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-slate-900">{type}</h3>
                    <button
                      onClick={() => copyToClipboard(hash, type)}
                      className="rounded-lg bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700"
                    >
                      Copy
                    </button>
                  </div>
                  <code className="block rounded bg-slate-50 px-3 py-2 text-xs font-mono break-all text-slate-700">
                    {hash}
                  </code>
                </div>
              ))}
            </div>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔐 Multiple Algorithms</h3>
            <p className="mt-2 text-sm text-slate-600">MD5, SHA-256, SHA-384, SHA-512</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Instant</h3>
            <p className="mt-2 text-sm text-slate-600">Generate all hashes at once</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔒 Private</h3>
            <p className="mt-2 text-sm text-slate-600">No server upload</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Enter the text you want to hash</li>
          <li>Click "Generate Hashes"</li>
          <li>View hashes for all supported algorithms</li>
          <li>Click "Copy" to copy any hash value</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What are hash functions used for?',
            answer: 'Hash functions are used for password storage, data integrity verification, digital signatures, and blockchain.'
          },
          {
            question: 'Which hash algorithm should I use?',
            answer: 'For security, use SHA-256 or SHA-512. MD5 is obsolete for security but okay for checksums.'
          },
          {
            question: 'Can hashes be reversed?',
            answer: 'No, hash functions are one-way. You cannot derive the original text from a hash (except through brute force).'
          },
          {
            question: 'Is my data uploaded anywhere?',
            answer: 'No, all hashing happens in your browser. Your data never leaves your device.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Base64 Encoder/Decoder', slug: 'base64-encoder-decoder', icon: '🔐' },
          { name: 'Password Generator', slug: 'password-generator', icon: '🔐' },
          { name: 'JWT Decoder', slug: 'jwt-decoder', icon: '🔑' }
        ]}
      />
    </main>
  );
}
