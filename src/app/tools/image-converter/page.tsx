'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import FileUploader from '@/components/FileUploader';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { convertImageFormat } from '@/lib/utils';
import { downloadFile } from '@/lib/utils';

export default function ImageConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (files: File[]) => {
    if (files.length === 0) return;
    const imageFile = files[0];
    if (!imageFile.type.startsWith('image/')) {
      setError('Only image files are supported');
      return;
    }

    setFile(imageFile);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please upload an image');
      return;
    }

    setLoading(true);
    try {
      const converted = await convertImageFormat(file, format);
      const ext = format === 'jpeg' ? 'jpg' : format;
      downloadFile(converted, `converted.${ext}`);
      setError('');
    } catch (err) {
      setError('Error converting image: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
    setLoading(false);
  };

  const getFormatInfo = (fmt: 'jpeg' | 'png' | 'webp') => {
    switch (fmt) {
      case 'jpeg':
        return 'Compressed format, smaller file size, best for photos';
      case 'png':
        return 'Lossless format, supports transparency, larger files';
      case 'webp':
        return 'Modern format, best compression, smaller than JPEG/PNG';
    }
  };

  return (
    <>
      <ToolHero
        icon="🔄"
        title="Image Format Converter"
        description="Convert images between PNG, JPG, and WebP formats instantly. Choose the best format for your needs."
      />

      <ToolContainer title="Upload Image">
        <FileUploader
          onFileSelect={handleFileSelect}
          accept="image/*"
          multiple={false}
          label="Upload Image"
          description="Select an image to convert"
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

      {file && (
        <>
          <ToolContainer title="Preview">
            {preview && (
              <div className="flex justify-center">
                <img src={preview} alt="Preview" className="max-h-80 rounded-lg border border-gray-200" />
              </div>
            )}
          </ToolContainer>

          <ToolContainer title="Output Format">
            <div className="space-y-4">
              <div className="space-y-3">
                {(['jpeg', 'png', 'webp'] as const).map(fmt => (
                  <label key={fmt} className="p-4 border-2 rounded-lg cursor-pointer transition-all" style={{
                    borderColor: format === fmt ? '#3b82f6' : '#e5e7eb',
                    backgroundColor: format === fmt ? '#eff6ff' : '#fafafa'
                  }}>
                    <input
                      type="radio"
                      name="format"
                      value={fmt}
                      checked={format === fmt}
                      onChange={() => setFormat(fmt)}
                      className="mr-3"
                    />
                    <span className="font-semibold text-gray-900 uppercase">{fmt}</span>
                    <p className="text-sm text-gray-600 mt-1">{getFormatInfo(fmt)}</p>
                  </label>
                ))}
              </div>

              <button
                onClick={handleConvert}
                disabled={loading || !file}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Converting...' : `Convert to ${format.toUpperCase()}`}
              </button>
            </div>
          </ToolContainer>
        </>
      )}

      <ToolContainer title="Format Comparison">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-3 text-left font-semibold text-gray-900">Format</th>
                <th className="py-2 px-3 text-left font-semibold text-gray-900">Best For</th>
                <th className="py-2 px-3 text-left font-semibold text-gray-900">File Size</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-3 font-medium">JPEG</td>
                <td className="py-2 px-3 text-gray-700">Photos & realistic images</td>
                <td className="py-2 px-3 text-gray-700">Small</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3 font-medium">PNG</td>
                <td className="py-2 px-3 text-gray-700">Graphics, icons, transparency</td>
                <td className="py-2 px-3 text-gray-700">Large</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">WebP</td>
                <td className="py-2 px-3 text-gray-700">Modern web (best compression)</td>
                <td className="py-2 px-3 text-gray-700">Smallest</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Which format should I use?',
            answer: 'Use JPEG for photos, PNG for graphics/icons with transparency, WebP for modern web with best compression.'
          },
          {
            question: 'Does converting affect quality?',
            answer: 'Converting between formats may cause some quality loss, especially if converting PNG with transparency to JPEG (which doesn\'t support transparency).'
          },
          {
            question: 'Is WebP supported everywhere?',
            answer: 'WebP is supported in modern browsers (Chrome, Edge, Firefox, Safari 16+). Older browsers may not support it.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Image Compressor', slug: 'image-compressor', icon: '📸' },
          { name: 'Image Resizer', slug: 'image-resizer', icon: '📐' },
          { name: 'Image Cropper', slug: 'image-cropper', icon: '✂️' }
        ]}
      />
    </>
  );
}
