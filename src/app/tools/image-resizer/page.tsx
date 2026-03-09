'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import FileUploader from '@/components/FileUploader';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { resizeImage } from '@/lib/utils';
import { downloadFile } from '@/lib/utils';

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
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
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainAspect && originalDimensions.width > 0) {
      const newHeight = Math.round((newWidth / originalDimensions.width) * originalDimensions.height);
      setHeight(newHeight);
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainAspect && originalDimensions.height > 0) {
      const newWidth = Math.round((newHeight / originalDimensions.height) * originalDimensions.width);
      setWidth(newWidth);
    }
  };

  const handleResize = async () => {
    if (!file) {
      setError('Please upload an image');
      return;
    }

    setLoading(true);
    try {
      const resized = await resizeImage(file, width, height);
      downloadFile(resized, `resized-${file.name}`);
      setError('');
    } catch (err) {
      setError('Error resizing image: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
    setLoading(false);
  };

  return (
    <>
      <ToolHero
        icon="📐"
        title="Image Resizer"
        description="Resize images to specific dimensions. Scale up or down while maintaining or changing aspect ratio."
      />

      <ToolContainer title="Upload Image">
        <FileUploader
          onFileSelect={handleFileSelect}
          accept="image/*"
          multiple={false}
          label="Upload Image"
          description="Select an image to resize"
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

          <ToolContainer title="Resize Settings">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Original Size:</strong> {originalDimensions.width} × {originalDimensions.height} px
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintainAspect}
                    onChange={(e) => setMaintainAspect(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 font-medium">Maintain aspect ratio</span>
                </label>
              </div>

              <button
                onClick={handleResize}
                disabled={loading || !file}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Resizing...' : 'Resize Image'}
              </button>
            </div>
          </ToolContainer>
        </>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Upload Image</h3>
            <p className="text-gray-700">Select any image file to resize.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Set Dimensions</h3>
            <p className="text-gray-700">Enter new width and height in pixels. Check "Maintain aspect ratio" to keep proportions.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Download</h3>
            <p className="text-gray-700">Click "Resize Image" to download your resized image.</p>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is aspect ratio?',
            answer: 'Aspect ratio is the relationship between width and height (e.g., 16:9 is common for widescreen). Maintaining ratio keeps proportions correct.'
          },
          {
            question: 'Can I enlarge an image?',
            answer: 'Yes, but quality will decrease. Enlarging uses interpolation which can blur the image. Keep enlargement below 150%.'
          },
          {
            question: 'What does maintaining aspect ratio do?',
            answer: 'When checked, changing width automatically adjusts height (or vice versa) to keep the image proportions correct.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Image Compressor', slug: 'image-compressor', icon: '📸' },
          { name: 'Image Converter', slug: 'image-converter', icon: '🔄' },
          { name: 'Image Cropper', slug: 'image-cropper', icon: '✂️' }
        ]}
      />
    </>
  );
}
