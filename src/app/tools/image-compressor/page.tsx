'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import FileUploader from '@/components/FileUploader';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { compressImage } from '@/lib/utils';
import { downloadFile } from '@/lib/utils';

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [quality, setQuality] = useState(0.8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [originalSize, setOriginalSize] = useState(0);

  const handleFileSelect = (files: File[]) => {
    if (files.length === 0) return;
    const imageFile = files[0];
    if (!imageFile.type.startsWith('image/')) {
      setError('Only image files are supported');
      return;
    }

    setFile(imageFile);
    setOriginalSize(imageFile.size);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleCompress = async () => {
    if (!file) {
      setError('Please upload an image');
      return;
    }

    setLoading(true);
    try {
      const compressed = await compressImage(file, quality);
      downloadFile(compressed, `compressed-${file.name}`);
      setError('');
    } catch (err) {
      setError('Error compressing image: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
    setLoading(false);
  };

  const formatBytes = (bytes: number) => {
    return (bytes / 1024).toFixed(2) + ' KB';
  };

  const estimatedSize = Math.floor(originalSize * (quality / 100));

  return (
    <>
      <ToolHero
        icon="📸"
        title="Image Compressor"
        description="Reduce image file size without losing quality. Perfect for web optimization and faster loading."
      />

      <ToolContainer title="Upload Image">
        <FileUploader
          onFileSelect={handleFileSelect}
          accept="image/*"
          multiple={false}
          label="Upload Image"
          description="Select an image to compress"
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
                <img src={preview} alt="Preview" className="max-h-96 rounded-lg border border-gray-200" />
              </div>
            )}
          </ToolContainer>

          <ToolContainer title="Compression Settings">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality: {Math.round(quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 mt-2">
                  Lower = smaller file, Higher = better quality
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 font-medium mb-1">Original Size</p>
                  <p className="text-2xl font-bold text-blue-900">{formatBytes(originalSize)}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-600 font-medium mb-1">Estimated Size</p>
                  <p className="text-2xl font-bold text-green-900">{formatBytes(estimatedSize)}</p>
                </div>
              </div>

              <button
                onClick={handleCompress}
                disabled={loading || !file}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Compressing...' : 'Compress Image'}
              </button>
            </div>
          </ToolContainer>
        </>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Upload Image</h3>
            <p className="text-gray-700">Select any image file (PNG, JPG, WebP, etc.).</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Adjust Quality</h3>
            <p className="text-gray-700">Move the slider to balance between file size and quality.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Download</h3>
            <p className="text-gray-700">Click "Compress Image" to download your optimized image.</p>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'How much can I compress an image?',
            answer: 'Typically 30-70% depending on the original format and quality level. JPGs compress more than PNGs.'
          },
          {
            question: 'Will compression affect image quality?',
            answer: 'At high quality (80-100%), compression is barely noticeable. Lower quality (50-70%) shows some artifacts but is often acceptable.'
          },
          {
            question: 'What format should I use?',
            answer: 'JPG for photos, PNG for graphics with text or transparency. WebP offers best compression.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Image Resizer', slug: 'image-resizer', icon: '📐' },
          { name: 'Image Converter', slug: 'image-converter', icon: '🔄' },
          { name: 'Image Cropper', slug: 'image-cropper', icon: '✂️' }
        ]}
      />
    </>
  );
}
