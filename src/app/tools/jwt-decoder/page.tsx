'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import ResultBox from '@/components/ResultBox';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { decodeJWT } from '@/lib/utils';

export default function JWTDecoderPage() {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'header' | 'payload' | 'signature'>('payload');

  const handleTokenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newToken = e.target.value;
    setToken(newToken);
    decodeToken(newToken);
  };

  const decodeToken = (tokenStr: string) => {
    try {
      setError('');
      if (!tokenStr.trim()) {
        setDecoded(null);
        return;
      }

      const parts = tokenStr.split('.');
      if (parts.length !== 3) {
        setError('Invalid JWT format. JWT must have 3 parts separated by dots.');
        setDecoded(null);
        return;
      }

      const result = decodeJWT(tokenStr);
      if (!result) {
        setError('Failed to decode JWT. Please check the token format.');
        setDecoded(null);
      } else {
        setDecoded(result);
      }
    } catch (err) {
      setError('Error: ' + (err instanceof Error ? err.message : 'Unknown error'));
      setDecoded(null);
    }
  };

  return (
    <>
      <ToolHero
        icon="🔑"
        title="JWT Decoder"
        description="Decode JWT tokens to view claims and payload. Perfect for debugging authentication and API tokens."
      />

      <ToolContainer title="Paste your JWT Token">
        <textarea
          value={token}
          onChange={handleTokenChange}
          placeholder="Paste your JWT token here (eyJhbGc...)..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-vertical"
        />
      </ToolContainer>

      {error && (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              <strong>❌ Error:</strong> {error}
            </div>
          </div>
        </div>
      )}

      {decoded && (
        <ToolContainer title="Decoded Token">
          <div className="space-y-4">
            <div className="flex gap-2 border-b border-gray-200">
              <button
                onClick={() => setTab('payload')}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  tab === 'payload'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Payload
              </button>
            </div>

            {tab === 'payload' && (
              <ResultBox
                title="Payload"
                copyText={JSON.stringify(decoded, null, 2)}
              >
                {JSON.stringify(decoded, null, 2)}
              </ResultBox>
            )}
          </div>

          {decoded.exp && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Expiration:</strong> {new Date(decoded.exp * 1000).toLocaleString()}
              </p>
            </div>
          )}
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Get Your Token</h3>
            <p className="text-gray-700">Copy a JWT token from your authentication response or browser storage.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Paste Token</h3>
            <p className="text-gray-700">Paste the full token in the textarea above.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: View Contents</h3>
            <p className="text-gray-700">The payload will be automatically decoded and displayed as JSON.</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="What is JWT?">
        <div className="space-y-3">
          <p className="text-gray-700">
            JWT (JSON Web Token) is a compact token format for securely transmitting information. It consists of three parts: header, payload, and signature.
          </p>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Token Structure</h4>
            <code className="bg-gray-100 block p-3 rounded mb-3 text-sm overflow-x-auto">
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
            </code>
            <p className="text-gray-700 text-sm">Header.Payload.Signature</p>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Is JWT decoding the same as validation?',
            answer: 'No. Decoding just reads the content. Validation checks the signature to ensure the token is authentic and hasn\\'t been tampered with.'
          },
          {
            question: 'Can I see the signature?',
            answer: 'The signature part is encoded and cannot be displayed as plain text. It requires the secret key to verify.'
          },
          {
            question: 'Is my token stored?',
            answer: 'No. All processing happens in your browser. Your token is never sent anywhere.'
          },
          {
            question: 'Can I modify the token?',
            answer: 'You can view the content, but modifying it will invalidate the signature. Servers will reject tampered tokens.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Base64 Encoder', slug: 'base64-encoder-decoder', icon: '🔐' },
          { name: 'JSON Formatter', slug: 'json-formatter', icon: '{ }' },
          { name: 'URL Encoder', slug: 'url-encoder-decoder', icon: '🌐' }
        ]}
      />
    </>
  );
}
