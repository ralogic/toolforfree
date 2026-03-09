'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import ToolHero from '@/components/ToolHero';
import ToolContainer from '@/components/ToolContainer';
import FileUploader from '@/components/FileUploader';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import { downloadFile } from '@/lib/utils';

export default function ImageToPDFPage() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const handleFileSelect = (files: File[]) => {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    if (imageFiles.length !== files.length) {
      setError('Only image files are supported');
    }
    setImages([...images, ...imageFiles]);
    setError('');
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const convertToPDF = async () => {
    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setLoading(true);
    try {
      const pdf = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: orientation === 'portrait' ? 'a4' : [297, 210]
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();

        const img = images[i];
        const reader = new FileReader();

        await new Promise<void>((resolve) => {
          reader.onload = (e) => {
            const imgData = e.target?.result as string;
            const imgWidth = pageWidth - 10;
            const imgHeight = (imgWidth * img.height) / img.width;

            let y = 5;
            if (imgHeight > pageHeight - 10) {
              // Scale down if too tall
              const scaledHeight = pageHeight - 10;
              const scaledWidth = (scaledHeight * img.width) / img.height;
              const x = (pageWidth - scaledWidth) / 2;
              pdf.addImage(imgData, 'JPEG', x, y, scaledWidth, scaledHeight);
            } else {
              const x = (pageWidth - imgWidth) / 2;
              pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
            }
            resolve();
          };
          reader.readAsDataURL(img);
        });
      }

      const pdfBytes = pdf.output('blob');
      downloadFile(pdfBytes, 'images.pdf');
      setError('');
    } catch (err) {
      setError('Error creating PDF: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
    setLoading(false);
  };

  return (
    <>
      <ToolHero
        icon="📄"
        title="Image to PDF Converter"
        description="Convert images (PNG, JPG, etc.) into a single PDF file or one per page."
      />

      <ToolContainer title="Upload Images">
        <FileUploader
          onFileSelect={handleFileSelect}
          accept="image/*"
          multiple={true}
          label="Upload Images"
          description="Drag and drop images here or click to select"
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

      {images.length > 0 && (
        <ToolContainer title={`Selected Images (${images.length})`}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Orientation
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="orientation"
                    value="portrait"
                    checked={orientation === 'portrait'}
                    onChange={() => setOrientation('portrait')}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">Portrait</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="orientation"
                    value="landscape"
                    checked={orientation === 'landscape'}
                    onChange={() => setOrientation('landscape')}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">Landscape</span>
                </label>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {images.map((img, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={img.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{img.name}</p>
                      <p className="text-sm text-gray-600">{(img.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeImage(idx)}
                    className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={convertToPDF}
            disabled={loading || images.length === 0}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating PDF...' : 'Convert to PDF'}
          </button>
        </ToolContainer>
      )}

      <ToolContainer title="How to Use">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 1: Upload Images</h3>
            <p className="text-gray-700">Select one or more image files (PNG, JPG, WebP, etc.).</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 2: Choose Orientation</h3>
            <p className="text-gray-700">Select portrait or landscape based on your images.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Step 3: Convert</h3>
            <p className="text-gray-700">Click "Convert to PDF" to create your PDF file.</p>
          </div>
        </div>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'Can I arrange images in different order?',
            answer: 'Currently images are combined in upload order. To reorder, remove and re-upload in desired order, or use PDF editor after creation.'
          },
          {
            question: 'What image formats are supported?',
            answer: 'PNG, JPG, WebP, and most common image formats are supported.'
          },
          {
            question: 'Is there a limit on number of images?',
            answer: 'No strict limit, but browser performance may degrade with very large numbers (100+). One image per page is recommended.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'PDF to Image', slug: 'pdf-to-image', icon: '🖼️' },
          { name: 'Image Converter', slug: 'image-converter', icon: '🔄' },
          { name: 'PDF Merge', slug: 'pdf-merge', icon: '📄' }
        ]}
      />
    </>
  );
}
