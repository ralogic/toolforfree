'use client';

import { useState } from 'react';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import FileUploader from '@/components/FileUploader';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { downloadFile } from '@/lib/utils';

export default function ImageCropperPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [cropWidth, setCropWidth] = useState(300);
  const [cropHeight, setCropHeight] = useState(300);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
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
        setImageWidth(img.width);
        setImageHeight(img.height);
        setCropWidth(Math.min(300, img.width));
        setCropHeight(Math.min(300, img.height));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  };

  const handleCrop = async () => {
    if (!file) {
      setError('Please upload an image');
      return;
    }

    setLoading(true);
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = cropWidth;
        canvas.height = cropHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setError('Failed to get canvas context');
          setLoading(false);
          return;
        }

        ctx.drawImage(
          img,
          startX,
          startY,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        );

        canvas.toBlob((blob) => {
          if (blob) {
            downloadFile(blob, `cropped-${file.name}`);
          }
          setLoading(false);
        }, file.type || 'image/jpeg');
      };

      img.src = preview;
    } catch (err) {
      setError('Error cropping image: ' + (err instanceof Error ? err.message : 'Unknown error'));
      setLoading(false);
    }
  };

  return (
    <>
      <ToolHero
        icon="✂️"
        title="Image Cropper"
        description="Crop and zoom images to exact dimensions. Perfect for thumbnails, profile pictures, and social media."
      />

      <ToolContainer title="Upload Image">
        <FileUploader
          onFileSelect={handleFileSelect}
          accept="image/*"
          multiple={false}
          label="Upload Image"
          description="Select an image to crop"
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
          <ToolContainer title="Crop Settings">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start X
                  </label>
                  <input
                    type="number"
                    value={startX}
                    onChange={(e) => setStartX(Math.max(0, parseInt(e.target.value) || 0))}
                    max={imageWidth - cropWidth}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Y
                  </label>
                  <input
                    type="number"
                    value={startY}
                    onChange={(e) => setStartY(Math.max(0, parseInt(e.target.value) || 0))}
                    max={imageHeight - cropHeight}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width: {cropWidth}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max={imageWidth}
                    value={cropWidth}
                    onChange={(e) => setCropWidth(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height: {cropHeight}px
                  </label>
                  <input
                    type="range"
                    min="50"
                    max={imageHeight}
                    value={cropHeight}
                    onChange={(e) => setCropHeight(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Image Size:</strong> {imageWidth} × {imageHeight} px
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Crop Area:</strong> {cropWidth} × {cropHeight} px
                </p>
              </div>

              <button
                onClick={handleCrop}
                disabled={loading || !file}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Cropping...' : 'Crop Image'}
              </button>
            </div>
          </ToolContainer>

          <ToolContainer title="Preview">
            {preview && (
              <div className="relative overflow-auto bg-gray-100 rounded-lg p-4 flex justify-center">
                <div
                  style={{
                    position: 'relative',
                    width: `${Math.min(500, imageWidth)}px`,
                    height: `50vh`,
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      position: 'absolute',
                      left: `${-startX * (Math.min(500, imageWidth) / imageWidth)}px`,
                      top: `0`,
                      width: `${Math.min(500, imageWidth) * (imageWidth / imageWidth)}px`,
                      borderStyle: 'dashed',
                      borderColor: '#3b82f6',
                      borderWidth: '2px'
                    }}
                  />
                </div>
              </div>
            )}
          </ToolContainer>
        </>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Upload Image</h3>
            <p className="text-gray-700">Select any image file.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Adjust Crop Area</h3>
            <p className="text-gray-700">Use sliders or number inputs to define the crop area (position and size).</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Download</h3>
            <p className="text-gray-700">Click "Crop Image" to save your cropped image.</p>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'How do I center a crop?',
            answer: 'Calculate: Start X = (Image Width - Crop Width) / 2 and Start Y = (Image Height - Crop Height) / 2'
          },
          {
            question: 'Can I crop to a specific aspect ratio?',
            answer: 'Yes! Set width and height to maintain your desired ratio. For 16:9, use 1600×900, 1200×675, etc.'
          },
          {
            question: 'What happens to image quality?',
            answer: 'Cropping doesn\'t affect quality. You\'re just removing parts of the original image.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Image Compressor', slug: 'image-compressor', icon: '📸' },
          { name: 'Image Resizer', slug: 'image-resizer', icon: '📐' },
          { name: 'Image Converter', slug: 'image-converter', icon: '🔄' }
        ]}
      />
    </>
  );
}
