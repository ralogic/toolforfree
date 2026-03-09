'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import FileUploader from '@/components/FileUploader';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';

export default function BackgroundRemoverPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
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

  const handleRemoveBackground = async () => {
    if (!file) {
      setError('Please upload an image');
      return;
    }

    setLoading(true);
    setError('To remove backgrounds, please use our API-based tool or external services listed below.');

    // This would require an API like remove.bg, which requires a paid subscription
    // For now, we show a guide for users
    setLoading(false);
  };

  return (
    <>
      <ToolHero
        icon="✨"
        title="Background Remover"
        description="Remove image backgrounds automatically. Perfect for product photos, portraits, and graphic design."
      />

      <ToolContainer title="Upload Image">
        <FileUploader
          onFileSelect={handleFileSelect}
          accept="image/*"
          multiple={false}
          label="Upload Image"
          description="Select an image to remove background"
        />
      </ToolContainer>

      {file && (
        <>
          <ToolContainer title="Preview">
            {preview && (
              <div className="flex justify-center">
                <img src={preview} alt="Preview" className="max-h-80 rounded-lg border border-gray-200" />
              </div>
            )}
          </ToolContainer>

          <ToolContainer title="Remove Background">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-700">
                  <strong>💡 Note:</strong> Advanced background removal requires API integration. Use one of these services:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-gray-900 mb-1">🎯 Remove.bg</h4>
                  <p className="text-sm text-gray-600 mb-2">AI-powered background removal. Free tier: 50 images/month</p>
                  <a href="https://www.remove.bg" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Visit remove.bg →
                  </a>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-gray-900 mb-1">🖼️ PhotoScape</h4>
                  <p className="text-sm text-gray-600 mb-2">Free download app for removing backgrounds. No API required</p>
                  <a href="https://www.photoscape.org" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Get PhotoScape →
                  </a>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all">
                  <h4 className="font-semibold text-gray-900 mb-1">🎨 Pixlr</h4>
                  <p className="text-sm text-gray-600 mb-2">Online editor with built-in background removal with AI</p>
                  <a href="https://pixlr.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Open Pixlr →
                  </a>
                </div>
              </div>
            </div>
          </ToolContainer>
        </>
      )}

      <ToolContainer title="How It Works">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Manual Method (Photoshop/GIMP)</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Open image in editor</li>
              <li>Use selection tools (magic wand, lasso)</li>
              <li>Select background area</li>
              <li>Press Delete to remove background</li>
              <li>Add transparency or new background</li>
            </ol>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Method (Remove.bg)</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Visit remove.bg website</li>
              <li>Upload your image</li>
              <li>AI automatically detects foreground and background</li>
              <li>Download PNG with transparent background</li>
            </ol>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="Best Practices">
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>High contrast:</strong> Images with clear subject/background work best</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Good lighting:</strong> Well-lit images produce better results</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>PNG format:</strong> Export as PNG to preserve transparency</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700"><strong>Edge refinement:</strong> Use feathering for smooth edges</span>
          </li>
        </ul>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is the best tool for background removal?',
            answer: 'Remove.bg is the easiest for quick removal. For professional work, Photoshop or GIMP offer more control.'
          },
          {
            question: 'Can I remove backgrounds from videos?',
            answer: 'Yes, but it requires more processing. Use specialized tools like Adobe Premiere or CapCut.'
          },
          {
            question: 'What file format should I use after removal?',
            answer: 'PNG format preserves transparency. Use PNG for graphics, JPEG for photos on solid backgrounds.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Image Converter', slug: 'image-converter', icon: '🔄' },
          { name: 'Image Cropper', slug: 'image-cropper', icon: '✂️' },
          { name: 'Image Compressor', slug: 'image-compressor', icon: '📸' }
        ]}
      />
    </>
  );
}
