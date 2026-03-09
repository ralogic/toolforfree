'use client';

import { useState, useEffect } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';

export default function QRCodeGeneratorPage() {
  const [text, setText] = useState('https://toolforfree.in');
  const [qrCode, setQrCode] = useState('');
  const [size, setSize] = useState(200);

  useEffect(() => {
    generateQR(text, size);
  }, [text, size]);

  const generateQR = async (value: string, sizeValue: number) => {
    if (!value.trim()) {
      setQrCode('');
      return;
    }

    try {
      // Dynamic import of qrcode library
      const QRCode = (await import('qrcode')).default;
      const dataUrl = await QRCode.toDataURL(value, {
        width: sizeValue,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCode(dataUrl);
    } catch (error) {
      console.error('QR Code generation error:', error);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <ToolHero
        icon="📱"
        title="QR Code Generator"
        description="Generate QR codes from any text or URL. Perfect for marketing, business cards, and product packaging."
      />

      <ToolContainer title="QR Code Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text or URL
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size: {size}px
            </label>
            <input
              type="range"
              min="100"
              max="500"
              step="10"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </ToolContainer>

      {qrCode && (
        <ToolContainer title="Your QR Code">
          <div className="flex flex-col items-center gap-4">
            <img src={qrCode} alt="QR Code" className="border border-gray-200 rounded-lg p-4 bg-white" />
            <button
              onClick={downloadQR}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              ⬇️ Download QR Code
            </button>
          </div>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Enter Text/URL</h3>
            <p className="text-gray-700">Type any text, URL, or data you want to encode in the QR code.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Adjust Size</h3>
            <p className="text-gray-700">Use the slider to change the QR code size (100-500px).</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Download</h3>
            <p className="text-gray-700">Click Download to save the QR code as PNG image.</p>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What can I encode in a QR code?',
            answer: 'URLs, text, email addresses, phone numbers, WiFi credentials, vCard data, and more. QR codes can store up to 4,296 characters.'
          },
          {
            question: 'What size should I use?',
            answer: 'Use larger sizes (300-500px) for print materials. Smaller sizes (100-200px) are fine for digital use. The exact size depends on scanning distance.'
          },
          {
            question: 'Can I scan the generated QR code?',
            answer: 'Yes! Most smartphones with cameras and QR code readers can scan the generated codes. You can also use online QR scanners.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Password Generator', slug: 'password-generator', icon: '🔐' },
          { name: 'UUID Generator', slug: 'uuid-generator', icon: '🔢' },
          { name: 'Base64 Encoder', slug: 'base64-encoder-decoder', icon: '🔐' }
        ]}
      />
    </>
  );
}
