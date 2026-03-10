'use client';

import { useState } from 'react';
import FAQSection from '@/components/FAQSection';
import RelatedTools from '@/components/RelatedTools';
import ToolContainer from '@/components/ToolContainer';
import ToolHero from '@/components/ToolHero';
import FileUploader from '@/components/FileUploader';

export default function ImageExifRemoverPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setImageFile(file);
    setDownloadUrl(null);
    
    // Create preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const removeExif = async () => {
    if (!imageFile) return;

    setProcessing(true);
    try {
      // Create canvas and draw image
      const img = new Image();
      const url = URL.createObjectURL(imageFile);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          // Convert to blob (this removes EXIF data)
          canvas.toBlob((blob) => {
            if (blob) {
              const newUrl = URL.createObjectURL(blob);
              setDownloadUrl(newUrl);
              setProcessing(false);
            }
          }, imageFile.type);
        }
      };
      
      img.src = url;
    } catch (error) {
      console.error('EXIF removal error:', error);
      setProcessing(false);
      alert('Error removing EXIF data');
    }
  };

  return (
    <main className="bg-white pb-16">
      <ToolHero
        icon="🗑️"
        title="Image EXIF Remover"
        description="Remove EXIF metadata from your images to protect your privacy. Strips location, camera, and other sensitive data from photos."
      />

      <ToolContainer title="Remove EXIF Data">
        <div className="space-y-6">
          <FileUploader
            accept="image/*"
            onFileSelect={handleFileSelect}
            maxSize={10}
            label="Upload Image"
          />

          {previewUrl && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto max-h-64 rounded-lg"
              />
            </div>
          )}

          <button
            onClick={removeExif}
            disabled={!imageFile || processing}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {processing ? 'Removing EXIF...' : 'Remove EXIF Data'}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`no-exif-${imageFile?.name}`}
              className="block w-full rounded-xl bg-green-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-green-700"
            >
              Download Clean Image
            </a>
          )}
        </div>
      </ToolContainer>

      <ToolContainer title="Features">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">🔒 Privacy Protection</h3>
            <p className="mt-2 text-sm text-slate-600">Remove location and camera data</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">⚡ Fast Processing</h3>
            <p className="mt-2 text-sm text-slate-600">Clean images in seconds</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-slate-900">📱 No Upload</h3>
            <p className="mt-2 text-sm text-slate-600">Everything happens locally</p>
          </div>
        </div>
      </ToolContainer>

      <ToolContainer title="How To Use">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Upload your image file</li>
          <li>Click "Remove EXIF Data"</li>
          <li>Download your cleaned image without metadata</li>
        </ol>
      </ToolContainer>

      <FAQSection
        items={[
          {
            question: 'What is EXIF data?',
            answer: 'EXIF data is metadata stored in images, including GPS location, camera model, date taken, and camera settings.'
          },
          {
            question: 'Why should I remove EXIF data?',
            answer: 'Removing EXIF data protects your privacy by preventing others from seeing where and when photos were taken.'
          },
          {
            question: 'Will image quality be affected?',
            answer: 'No, only metadata is removed. The visual quality of your image remains unchanged.'
          },
          {
            question: 'Is my image uploaded to a server?',
            answer: 'No, all processing happens in your browser for complete privacy.'
          }
        ]}
      />

      <RelatedTools
        tools={[
          { name: 'Metadata Viewer', slug: 'image-metadata-viewer', icon: '📋' },
          { name: 'Image Compressor', slug: 'image-compressor', icon: '📸' },
          { name: 'Image Format Converter', slug: 'image-converter', icon: '🔄' }
        ]}
      />
    </main>
  );
}
